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

  const turnstileRef = React.useRef<any>(null);
  const submitFormRef = React.useRef<HTMLFormElement>(null);

  const challengeSolved = status === "solved";

  const { register, formState, handleSubmit } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: $contactFormFields.email,
      message: $contactFormFields.message,
    },
    mode: "onSubmit",
  });

  const { errors } = formState;

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

      toast.promise(responsePromise, {
        loading: "Sending your message...",
        success: "Submission success!",
        error:
          "Sorry, there was a error processing this submission. Kieran has been notified, find me at one of my social links in the meantime.",
      });

      const response = await responsePromise;

      if (response.ok) {
        setEmailSuccess(true);
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
              rows={6}
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
            <button
              type="submit"
              className="flex items-center gap-2 mt-8 font-medium mx-auto px-5 py-2.5 rounded-full border-2 border-l-secondary dark:border-l-secondary focus:outline-none focus:ring-2 focus:ring-l-secondary dark:focus:ring-d-tertiary-2"
            >
              <span className="text-l-secondary">Finish and send</span>
              <span className="text-l-secondary">
                <SendMail width={24} height={24} />
              </span>
            </button>
          ) : (
            <div className="flex items-center mt-8 mx-auto text-green-500 p-2.5 rounded-full border-2 border-green-500">
              <Check width={20} height={20} strokeWidth={2.5} />
            </div>
          )}
        </div>
      </form>
    </>
  );
};
