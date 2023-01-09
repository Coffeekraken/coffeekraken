
export interface IWhenInteractSettings {
    pointerover: boolean;
    pointerout: boolean;
    pointerdown: boolean;
    touchstart: boolean;
    touchend: boolean;
    focus: boolean;
}
export default function __whenInteract(elm: HTMLElement, settings?: Partial<IWhenInteractSettings>): Promise<any>;
