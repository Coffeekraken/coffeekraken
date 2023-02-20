
export interface IScrollSpySettings {
    group: string;
    percentY: number;
}
export interface IScrollSpyItem {
    $target: HTMLElement;
    emit: Function;
    percentY: Number;
    lastEmittedEvent: string;
}
export default function __scrollSpy($target: HTMLElement, settings?: Partial<IScrollSpySettings>): Promise<any>;
