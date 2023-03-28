import type { ISSpec } from './specTypes';

export interface ISImage {
    url: string;
    alt?: string;
    title?: string;
    media: Record<string, string>; // '(max-width: 799px)': '/my/cool/image.jpg'
}

export interface ISImageSpec extends ISSpec {}
