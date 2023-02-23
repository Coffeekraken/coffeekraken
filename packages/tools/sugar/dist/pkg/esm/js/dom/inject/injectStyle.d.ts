
export interface IInjectStyleSettings {
    id: string;
    rootNode: HTMLElement;
}
export default function __injectStyle(style: string, settings?: Partial<IInjectStyleSettings>): HTMLStyleElement;
