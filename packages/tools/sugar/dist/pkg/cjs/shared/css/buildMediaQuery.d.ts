import type { ISMedia } from '@specimen/types';

export interface IBuildMediaQuerySettings {
    media: ISMedia;
    method?: 'container' | 'media';
    containerName?: string;
}
export default function buildMediaQuery(queryString: string, settings?: Partial<IBuildMediaQuerySettings>): string;
