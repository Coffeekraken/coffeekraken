
export interface IViewportEventsSettings {
    offset: string;
    once: boolean;
}
export default function __viewportEvents($elm: HTMLElement, settings?: Partial<IViewportEventsSettings>): HTMLElement;
