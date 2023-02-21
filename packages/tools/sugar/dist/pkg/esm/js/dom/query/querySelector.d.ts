
export interface IQuerySelectorSettings {
    visible: boolean;
    inViewport: boolean;
    rootNode: HTMLElement;
}
export default function __querySelector(selector: HTMLElement, settings?: Partial<IQuerySelectorSettings>): HTMLElement;
