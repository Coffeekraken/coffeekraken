// @ts-nocheck
import __isInViewport from '../is/isInViewport';

/**
 * @name      elementsInViewport
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Get all the elements that are in viewport
 *
 * @setting       {HTMLElement}     [rootNode=document.body]      Specify the root node from where you want to query
 *
 * @param 		{Object} 			settings	 		The settings of the query
 * @return 		{HTMLElement} 							The founded element
 *
 * @snippet         __elementInViewport($1)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import { __elementsInViewport } from '@coffeekraken/sugar/dom';
 * const $elements = __elementsInViewport();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IElementsInViewportSettings {
    rootNode: HTMLElement;
    threshold: number;
}

export default function __elementsInViewport(
    settings: Partial<IElementsInViewportSettings> = {},
): HTMLElement {
    // extend settings
    settings = {
        rootNode: document.body,
        threshold: 10,
        ...settings,
    };

    const $elementsInViewport: HTMLElement = [];

    // get all elements
    const $elms = Array.from(
        settings.rootNode?.querySelectorAll(
            '*:not(html,body,head,script,style,template)',
        ) ?? [],
    );

    // loop on each elements until some are not in the viewport, then stop
    let currentThreshold = 0;
    for (let [i, $elm] of $elms.entries()) {
        if (currentThreshold >= settings.threshold) {
            break;
        }
        if (!__isInViewport($elm)) {
            currentThreshold++;
            continue;
        }
        $elementsInViewport.push($elm);
    }

    // return the elements
    return $elementsInViewport;
}
