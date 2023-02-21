
export interface IOnDragTrackItem {
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
    speedX: number;
    speedY: number;
}
export interface IOnDragSettings {
    maxSpeed: number;
}
export default function __onDrag($elm: HTMLElement, cb: Function, settings?: Partial<IOnDragSettings>): void;
