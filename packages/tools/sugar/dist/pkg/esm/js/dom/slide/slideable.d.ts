import __SPromise from '@coffeekraken/s-promise';

export interface ISlideableSettings {
    direction: 'vertical' | 'horizontal';
    friction: number;
    maxOffset: number;
    maxOffsetX: number;
    maxOffsetY: number;
    onStart: Function;
    onDrag: Function;
    onEnd: Function;
    onRefocusStart: Function;
    onRefocusEnd: Function;
    refocus: number;
}
export default function slideable($elm: HTMLElement, settings?: Partial<ISlideableSettings>): __SPromise;
