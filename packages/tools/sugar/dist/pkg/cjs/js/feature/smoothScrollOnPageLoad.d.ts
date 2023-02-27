import type { IScrollToSettings } from '../dom/scroll/scrollTo';

export interface ISmoothScrollOnPageLoadSettings {
    scroll: Partial<IScrollToSettings>;
}
export default function __smoothScrollOnPageLoad(settings?: Partial<ISmoothScrollOnPageLoadSettings>): void;
