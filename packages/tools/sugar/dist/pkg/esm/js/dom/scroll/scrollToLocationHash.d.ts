import type { IScrollToSettings } from './scrollTo';

export interface IScrollToLocationHashSettings {
    scroll: Partial<IScrollToSettings>;
}
export default function __scrollToLocationHash(settings?: Partial<IScrollToLocationHashSettings>): Promise<any>;
