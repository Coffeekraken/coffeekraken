
export interface IWhenVisibleSettings {
    whenVisible?: Function;
    whenInvisible?: Function;
    once?: boolean;
}
export default function __whenVisible($elm: HTMLElement, settings?: Partial<IWhenVisibleSettings>): Promise<HTMLElement>;
