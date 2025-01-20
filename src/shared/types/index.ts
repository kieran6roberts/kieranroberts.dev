import { Themes } from '@/config/consts';

export type Theme = (typeof Themes)[keyof typeof Themes];
