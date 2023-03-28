import type { ISSpec } from './specTypes';

export interface ISVideo {
    url: string;
    source: Record<string, string>; // 'video/mp4': 'movie.mp4'
    controls: boolean;
    autoplay: boolean;
    muted: boolean;
}

export interface ISVideoSpec extends ISSpec {
    controls: boolean;
    autoplay: boolean;
    muted: boolean;
}
