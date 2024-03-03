import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendMail } from "iconoir-react";
import { ErrorMessage } from "@hookform/error-message";
import { useStore } from "@nanostores/react";

import { TextInput } from "./TextInput";
import { TextArea } from "./TextArea";
import { FormLabel } from "./FormLabel";

import {
  updateContactFieldValues,
  contactFormFields,
} from "../../stores/contactStore";

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

  const { register, formState, handleSubmit } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: $contactFormFields.email,
      message: $contactFormFields.message,
    },
    mode: "onSubmit",
  });

  const { errors, isSubmitting } = formState;

  const emailError = errors?.email;
  const messageError = errors?.message;

  const submitForm: SubmitHandler<ContactSchema> = (data) => console.log(data);

  const onEmailInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) =>
    updateContactFieldValues({
      name: "email",
      value: (e.target as HTMLInputElement).value || "",
    });

  const onMessageInputKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>
    updateContactFieldValues({
      name: "message",
      value: (e.target as HTMLInputElement).value || "",
    });

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="flex flex-col gap-4">
        <div>
          <FormLabel htmlFor="email">Email address *</FormLabel>
          <TextInput
            error={!!emailError}
            id="email"
            type="text"
            {...register("email")}
            placeholder="name@domain.com"
            onKeyUp={onEmailInputKeyUp}
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
            onKeyUp={onMessageInputKeyUp}
          />
          <ErrorMessage
            errors={errors}
            name="message"
            render={({ message }) => <ErrorMessageP message={message} />}
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 mt-8 font-medium mx-auto px-5 py-2.5 rounded-full border-2 border-l-secondary dark:border-l-secondary focus:outline-none focus:ring-2 focus:ring-l-secondary dark:focus:ring-d-tertiary-2"
        >
          <span className="text-l-secondary">Finish and send</span>
          <span className="text-l-secondary">
            <SendMail width={24} height={24} />
          </span>
        </button>
      </div>
    </form>
  );
};
