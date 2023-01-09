
export interface IQuerySelectorAllSettings {
    visible: boolean;
    inViewport: boolean;
    rootNode: HTMLElement;
}
export default function __querySelectorAll(selector: string, settings?: Partial<IQuerySelectorAllSettings>): HTMLElement[];
