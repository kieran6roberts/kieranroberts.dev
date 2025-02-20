import { IMAGE_CDN_URL } from '@config/consts/urls';

export const getImageUrl = (image: string) => {
	return `${IMAGE_CDN_URL}/${image}`;
};
