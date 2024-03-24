import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendMail } from "iconoir-react";
import { ErrorMessage } from "@hookform/error-message";
import { Turnstile } from "@marsidev/react-turnstile";
import { useStore } from "@nanostores/react";
import toast, { Toaster } from "react-hot-toast";
import { Check } from "iconoir-react";
import { useSpring, animated } from "react-spring";
import { Button } from "@components/Button";

import { TextInput } from "./TextInput";
import { TextArea } from "./TextArea";
import { FormLabel } from "./FormLabel";

import {
  updateContactFieldValues,
  contactFormFields,
} from "../../stores/contactStore";
import { theme } from "../../stores/themeStore";

import { debounce } from "../../utils/debounce";

export type WidgetStatus = "solved" | "error" | "expired" | null;

const CLOUDFLARE_TURNSTILE_SITE_KEY = import.meta.env
  .PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;

const CONTACT_FORM_ENDPOINT = import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT;

const contactSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter and email address, it cannot be empty." })
    .email(
      "Please enter a valid email address in the form name@domain.something"
    ),
  message: z.string().min(15, {
    message: "Message must be at least 15 characters, don't be shy.",
  }),
});

const ErrorMessageP = ({ message }: { message: string }) => (
  <p className="text-sm text-red-500 mt-px ml-2">{message}</p>
);

type ContactSchema = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const $contactFormFields = useStore(contactFormFields);
  const $theme = useStore(theme);
  const isDarkTheme = $theme === "dark";

  const [token, setToken] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<WidgetStatus>(null);
  const [emailSuccess, setEmailSuccess] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const turnstileRef = React.useRef<any>(null);
  const submitFormRef = React.useRef<HTMLFormElement>(null);

  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const submittedSpring = useSpring({
    from: { transform: "scale(1)" },
    to: [{ transform: "scale(1.1)" }, { transform: "scale(1)" }],
    loop: true,
  });

  const submittingSpring = useSpring({
    from: { x: 0 },
    to: [{ x: 15 }, { x: 0 }],
    loop: true,
  });

  const challengeSolved = status === "solved";

  const { register, formState, handleSubmit, reset } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: $contactFormFields.email,
      message: $contactFormFields.message,
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const { errors, isSubmitted } = formState;

  const emailError = errors?.email;
  const messageError = errors?.message;

  const submitForm: SubmitHandler<ContactSchema> = async (data) => {
    if (!challengeSolved || !token) {
      toast.error(
        "Sorry, captcha validation has failed. Please verify you are human.",
        {
          style: {
            borderRadius: "8px",
            background: isDarkTheme ? "#333" : "#FFFFFF",
            color: isDarkTheme ? "#FFFFFF" : "#333333",
          },
        }
      );
      return;
    }
    setIsSubmitting(true);

    const { email, message } = data;

    try {
      const responsePromise = fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
          senderEmail: email,
          message,
          token,
        }),
        // headers: {
        //   Accept: "application/json",
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*",
        // },
      });

      // toast.promise(responsePromise, {
      //   loading: "Sending your message...",
      //   success: "Submission success!",
      //   error:
      //     "Sorry, there was a error processing this submission. Kieran has been notified, find me at one of my social links in the meantime.",
      // });

      const response = await responsePromise;

      if (response.ok) {
        toast.success(
          "Submission success! Kieran will try to respond within 24 hrs."
        );
        setEmailSuccess(true);
        reset({
          email: "",
          message: "",
        });
      }
      updateContactFieldValues({
        name: "email",
        value: "",
      });
      updateContactFieldValues({
        name: "message",
        value: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateField = debounce(() => {
      updateContactFieldValues({
        name: "email",
        value: (e.target as HTMLInputElement).value || "",
      });
    }, 1000);

    updateField();
  };

  const onMessageInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updateField = debounce(() => {
      updateContactFieldValues({
        name: "message",
        value: (e.target as HTMLTextAreaElement).value || "",
      });
    }, 2500);

    updateField();
  };

  React.useEffect(() => {
    if (errors.email?.message || errors.message?.message) {
      toast.error("Form validation errors.");
    }
  }, [errors]);

  return (
    <>
      <Toaster position="top-center" gutter={8} />
      <form ref={submitFormRef} onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col gap-4">
          <div>
            <FormLabel htmlFor="email">Email address *</FormLabel>
            <TextInput
              error={!!emailError}
              id="email"
              type="text"
              {...register("email")}
              placeholder="name@domain.com"
              onChange={onEmailInputChange}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <ErrorMessageP message={message} />}
            />
          </div>

          <div>
            <FormLabel htmlFor="message">Message *</FormLabel>
            <TextArea
              id="message"
              rows={4}
              placeholder="What can I help you with..."
              {...register("message")}
              error={!!messageError}
              onChange={onMessageInputChange}
            />
            <ErrorMessage
              errors={errors}
              name="message"
              render={({ message }) => <ErrorMessageP message={message} />}
            />
          </div>

          <Turnstile
            ref={turnstileRef}
            className="mx-auto bg-white"
            siteKey={CLOUDFLARE_TURNSTILE_SITE_KEY}
            options={{
              action: "submit-form",
              execution: "render",
              // theme: "light",
              size: "normal",
              language: "auto",
              retryInterval: 30000,
              refreshExpired: "manual",
            }}
            onError={() => setStatus("error")}
            onExpire={() => setStatus("expired")}
            onSuccess={(token) => {
              setToken(token);
              setStatus("solved");
            }}
          />
          {!emailSuccess ? (
            <Button
              ref={buttonRef}
              width="full"
              type="submit"
              variant="transparent"
              className="mt-8"
            >
              {isSubmitting ? (
                <animated.span style={{ ...submittingSpring }}>
                  <SendMail width={24} height={24} />
                </animated.span>
              ) : (
                <>
                  <span>Finish and send</span>
                  <span>
                    <SendMail width={24} height={24} />
                  </span>
                </>
              )}
            </Button>
          ) : (
            <div className="flex items-center mt-8 mx-auto bg-[#100114] border-[#100114] dark:border-d-tertiary-2 text-white dark:text-d-tertiary-2 p-2.5 rounded-full border-2">
              <animated.span style={{ ...submittedSpring }}>
                <Check width={20} height={20} strokeWidth={2.5} />
              </animated.span>
            </div>
          )}
        </div>
      </form>
    </>
  );
};
