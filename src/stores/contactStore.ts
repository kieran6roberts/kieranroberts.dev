import { map } from 'nanostores';

import { debounce } from '../utils/debounce';

export type ContactFormFields = {
 email: string;
 message: string;
}

export const contactFormFields = map<ContactFormFields>({
 email: '',
 message: ''
});

export function updateContactFieldValues({ name, value }: { name: keyof ContactFormFields, value: string }) {
 debounce(() => {
  console.log(contactFormFields.value);
  contactFormFields.setKey(name, value);
 }, 1000)();
}