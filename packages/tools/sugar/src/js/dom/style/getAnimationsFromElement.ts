// @ts-nocheck

import __getAnimationProperties from './getAnimationProperties';

/**
 * @name      getAnimationsFromElement
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status          wip
 *
 * Get the animations applied to the passed element.
 *
 * @param 		{HTMLElement} 					elm  		The element to get the properties from
 * @return 		{Array<Object>} 									The animations applied to the element
 *
 * @todo      refactore
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet     __getAnimationsFromElement($1)
 *
 * @example  	js
 * import { __getAnimationsFromElement } from '@coffeekraken/sugar/dom'
 * const props = __getAnimationsFromElement(myCoolHTMLElement);
 * // output format
 * // [{
 * //   name : 'animation1',
 * // 	duration : 200,
 * // 	delay : 0,
 * // 	timingFunction : 'linear',
 * // 	iterationCount : 1,
 * // 	direction : 'forward',
 * //   playState: 'running',
 * //   fillMode: 'none'
 * // }]
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

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

export type IGetAnimationsFromElementResult =
    IGetAnimationsFromElementAnimationObject[];

export default function __getAnimationsFromElement($elm: HTMLElement) {
    const properties = __getAnimationProperties($elm);
    const animations: IGetAnimationsFromElementAnimationObject[] = [];

    properties.name.forEach((name, i) => {
        animations.push({
            name,
            duration: properties.duration[i],
            delay: properties.delay[i],
            timingFunction: properties.timingFunction[i],
            iterationCount: properties.iterationCount[i],
            direction: properties.direction[i],
            playState: properties.playState[i],
            fillMode: properties.fillMode[i],
        });
    });

    return animations;
}
