// @ts-nocheck

import uniqid from '../../../shared/string/uniqid';
import matches from './matches';
import __SPromise from '@coffeekraken/s-promise';

/**
 * @name            querySelectorLive
 * @namespace       js.dom.query
 * @type            Function
 * @platform        js
 * @status          beta
 *
 * Observe the dom to get all the elements that matches a passed css selector at any point in time.
 * Be warned that this use the mutation observer API and will monitor all the document for new nodes. Make sure to use it
 * when you don't have the chance to use the custom elements API instead
 *
 * @feature         Specify what you want to select and get notified each time a node like this appears in the dom
 * @feature         Promise based API
 * @feature         Callback support
 * @feature         Monitor added nodes and existing nodes that have class and id attributes updated
 *
 * @param	    {String} 		selector 		The css selector that we are interested in
 * @param 	    {Function} 		cb 				The function to call with the newly added node
 * @param 	    {Object} 		[settings={}] 	An optional settings object to specify things like the rootNode to monitor, etc...
 * @return      {SPromise<HTMLElement>}         An SPromise instance on which to listen for nodes using the "node" event
 *
 * @example 	js
 * import querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive'
 * querySelectorLive('.my-cool-item', (node, clearFn) => {
 * 	    // do something here with the detected node
 *      // call clearFn if you want to stop listening for this selector
 *      clearFn();
 * });
 *
 * @since       1.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

let _observer;
const _selectors = {};

export interface IQuerySelectorLiveSettings {
    rootNode: HTMLElement;
    once: boolean;
    onRemove: Function;
}

function querySelectorLive(
    selector: string,
    cb: Function<HTMLElement> = null,
    settings: Partial<IQuerySelectorLiveSettings> = {},
): __SPromise<HTMLElement> {
    // const id = `${selector} - ${uniqid()}`;

    let _emit;

    // extend settings
    settings = Object.assign(
        {},
        {
            rootNode: document,
            once: true,
            onRemove: null,
        },
        settings,
    );

    // listen for updates in document
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes && mutation.addedNodes.length) {
                [].forEach.call(mutation.addedNodes, (node) => {
                    if (!node.querySelectorAll) return;
                    if (node.matches(selector)) {
                        if (settings.once) observer.disconnect();
                        cb(node);
                        _emit?.('node', node);
                    }
                    const nestedNodes = node.querySelectorAll(selector);
                    [].forEach.call(nestedNodes, (nestedNode) => {
                        cb(nestedNode);
                        _emit?.('node', nestedNode);
                    });
                });
            } else if (mutation.attributeName) {
                if (mutation.target.matches(selector)) {
                    if (settings.once) observer.disconnect();
                    cb(mutation.target);
                    _emit?.('node', mutation.target);
                }
            }
        });
    });
    observer.observe(settings.rootNode, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'id'],
    });

    // first search
    [].forEach.call(settings.rootNode.querySelectorAll(selector), (node) => {
        if (!node.querySelectorAll) return;
        // pushNewNode(node, selector, 'init');
        cb(node);
        _emit?.('node', node);
    });

    return new __SPromise(({ resolve, reject, emit }) => {
        _emit = emit;
    });
}

export default querySelectorLive;
