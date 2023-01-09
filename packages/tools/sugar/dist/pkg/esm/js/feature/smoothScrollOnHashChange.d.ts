import type { IScrollToSettings } from '../dom/scroll/scrollTo';

export interface ISmoothScrollOnHashChangeSettings {
    scroll: Partial<IScrollToSettings>;
}
export default function __smoothScrollOnHashChange(settings?: Partial<ISmoothScrollOnHashChangeSettings>): void;
