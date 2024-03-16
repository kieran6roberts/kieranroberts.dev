import { map } from 'nanostores';

export type ContactFormFields = {
 email: string;
 message: string;
}

export const contactFormFields = map<ContactFormFields>({
 email: '',
 message: ''
});

export function updateContactFieldValues({ name, value }: { name: keyof ContactFormFields, value: string }) {
  contactFormFields.setKey(name, value);
}