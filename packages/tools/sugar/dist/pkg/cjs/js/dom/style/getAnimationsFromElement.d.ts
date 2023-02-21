
export interface IGetAnimationsFromElementAnimationObject {
    name: string;
    duration: number;
    delay: number;
    timingFunction: string;
    iterationCount: number;
    direction: string;
    playState: string;
    fillMode: string;
}
export type IGetAnimationsFromElementResult = IGetAnimationsFromElementAnimationObject[];
export default function __getAnimationsFromElement($elm: HTMLElement): IGetAnimationsFromElementAnimationObject[];
