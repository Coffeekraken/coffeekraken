import type { IScrollToSettings } from '../dom/scroll/scrollTo';

export interface IsmoothScrollSettings {
    scroll: Partial<IScrollToSettings>;
}
export default function __smoothScroll(settings?: Partial<IsmoothScrollSettings>): void;
