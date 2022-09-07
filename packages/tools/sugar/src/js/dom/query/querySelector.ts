// @ts-nocheck
import {
    __isInViewport,
    __isVisible,
    __closestNotVisible,
} from '@coffeekraken/sugar/dom';

/**
 * @name      querySelector
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Enhanced proxy of the Element.querySelector function that let you specify
 * if you want an element that is visible, or even that is in the viewport
 *
 * @feature       Specify if you want nodes that are only inside or outside the viewport
 * @feature       Specify if you want nodes that are only visible or invisible
 *
 * @setting       {Boolean}       [visible=null]        Specify if you want only the visible nodes
 * @setting       {Boolean}       [inViewport=null]     Specify if you want only the nodes that are in the viewport
 * @setting       {HTMLElement}     [rootNode=document.body]      Specify the root node from where you want to query
 *
 * @param 		{String} 			selector 			The css selector to search
 * @param 		{Object} 			settings	 		The settings of the query
 * @return 		{HTMLElement} 							The founded element
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import { __querySelector } from '@coffeekraken/sugar/dom';
 * // simple query
 * const elm = __querySelector('.a-cool-css-selector');
 *
 * // get an element that is in the viewport
 * const elm = __querySelector('.a-cool-css-selector', {
 * 		inViewport : true
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IQuerySelectorSettings {
    visible: boolean;
    inViewport: boolean;
    rootNode: HTMLElement;
}

export default function __querySelector(
    selector: HTMLElement,
    settings: Partial<IQuerySelectorSettings> = {},
): HTMLElement {
    // extend settings
    settings = {
        visible: null,
        inViewport: null,
        rootNode: document.body,
        ...settings,
    };

    // grab the element into the dom
    const elm = settings.rootNode.querySelector(selector);
    // if no element, stop here
    if (!elm) return null;

    // check settings
    if (settings.visible === false) {
        if (__isVisible(elm) || __closestNotVisible(elm)) return null;
    } else if (settings.visible === true) {
        if (!__isVisible(elm) || !__closestNotVisible(elm)) return null;
    }
    if (settings.inViewport === false) {
        if (__isInViewport(elm)) return null;
    } else if (settings.inViewport === true) {
        if (!__isInViewport(elm)) return null;
    }

    // return the element
    return elm;
}
