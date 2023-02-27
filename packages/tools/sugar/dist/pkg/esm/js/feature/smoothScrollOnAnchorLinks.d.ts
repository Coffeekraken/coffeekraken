import type { IScrollToSettings } from '../dom/scroll/scrollTo';

export interface ISmoothScrollOnAnchorLinksSettings {
    scroll: Partial<IScrollToSettings>;
    checkPathNames: boolean;
}
export default function __smoothScrollOnAnchorLinks(settings?: Partial<ISmoothScrollOnAnchorLinksSettings>): void;
