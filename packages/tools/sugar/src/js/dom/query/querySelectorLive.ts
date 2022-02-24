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
}

function querySelectorLive(
    selector: string,
    cb: Function<HTMLElement> = null,
    settings: Partial<IQuerySelectorLiveSettings> = {},
): __SPromise<HTMLElement> {
    const id = `${selector} - ${uniqid()}`;

    // extend settings
    settings = Object.assign(
        {},
        {
            rootNode: document,
            once: true,
        },
        settings,
    );

    if (!_selectors[selector]) {
        _selectors[selector] = [
            {
                id: id,
                selector: selector,
                cb: cb,
                lastMutationId: null,
                settings: settings,
            },
        ];
    } else {
        _selectors[selector].push({
            id: id,
            selector: selector,
            cb: cb,
            lastMutationId: null,
            settings: settings,
        });
    }

    return new __SPromise(({ resolve, reject, emit }) => {
        function pushNewNode(node, sel, mutationId) {
            const objs = _selectors[sel];
            if (!objs) return;

            objs.forEach((obj) => {
                // avoid calling multiple times sams callback for the same mutation process
                if (obj.lastMutationId && obj.lastMutationId === mutationId)
                    return;

                if (obj.settings.once) {
                    if (!node._querySelectorLive) {
                        node._querySelectorLive = {};
                    }
                    if (node._querySelectorLive[obj.id]) return;
                    node._querySelectorLive[obj.id] = true;
                }

                emit('node', node);

                obj.cb &&
                    obj.cb(node, () => {
                        delete _selectors[obj.selector];
                    });
            });
        }

        // listen for updates in document
        if (!_observer) {
            _observer = new MutationObserver((mutations) => {
                const mutationId = `mutation-${uniqid()}`;

                mutations.forEach((mutation) => {
                    if (mutation.addedNodes && mutation.addedNodes.length) {
                        [].forEach.call(mutation.addedNodes, (node) => {
                            // get all the selectors registered
                            const selectors = Object.keys(_selectors);

                            // loop on each selectors
                            selectors.forEach((sel) => {
                                if (matches(node, sel)) {
                                    pushNewNode(node, sel, mutationId);
                                }
                            });
                            if (!node.querySelectorAll) return;
                            selectors.forEach((sel) => {
                                const nestedNodes = node.querySelectorAll(sel);
                                [].forEach.call(nestedNodes, (nestedNode) => {
                                    pushNewNode(nestedNode, sel, mutationId);
                                });
                            });
                        });
                    } else if (mutation.attributeName) {
                        // get all the selectors registered
                        const selectors = Object.keys(_selectors);
                        // loop on each selectors
                        selectors.forEach((sel) => {
                            if (matches(mutation.target, sel)) {
                                pushNewNode(mutation.target, sel, mutationId);
                            }
                        });
                    }
                });
            });
            _observer.observe(settings.rootNode, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class', 'id'],
            });
        }

        // first search
        [].forEach.call(
            settings.rootNode.querySelectorAll(selector),
            (node) => {
                pushNewNode(node, selector, 'init');
            },
        );
    });
}

export default querySelectorLive;
