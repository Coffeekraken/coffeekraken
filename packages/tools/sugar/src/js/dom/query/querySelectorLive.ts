// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import uniqid from '../../../shared/string/uniqid';

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
 * @setting         {HTMLElement}           [rootNode=document]         The root node from where to observe childs
 * @setting         {Boolean}              [once=true]                If true, each observed nodes will be handled only once even if they are removed and reinjected in the dom
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

export interface IQuerySelectorLiveSettings {
    rootNode: HTMLElement;
    once: boolean;
}

let _observer,
    _stack = new Map();

function querySelectorLive(
    selector: string,
    cb: Function<HTMLElement> = null,
    settings: Partial<IQuerySelectorLiveSettings> = {},
): __SPromise<HTMLElement> {
    let _emit;

    const observerId = `s-query-selector-live-${uniqid()}`;

    // extend settings
    settings = Object.assign(
        {},
        {
            rootNode: document,
            once: true,
        },
        settings,
    );

    function _isNodeAlreadyHandledWhenSettingsOnceIsSet($node) {
        if (settings.once) {
            if (!$node._querySelectorLiveOverversIds) {
                $node._querySelectorLiveOverversIds = {};
            }

            if ($node._querySelectorLiveOverversIds[observerId]) {
                return true;
            }
            $node._querySelectorLiveOverversIds[observerId] = true;
        }
        return false;
    }

    // listen for updates in document
    if (!_observer) {
        _observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes && mutation.addedNodes.length) {
                    [].forEach.call(mutation.addedNodes, (node) => {
                        if (!node.matches) return;
                        for (let [cb, stackItem] of _stack) {
                            if (
                                !node.matches(stackItem.selector) ||
                                _isNodeAlreadyHandledWhenSettingsOnceIsSet(node)
                            ) {
                                continue;
                            }
                            cb(node);
                            _emit?.('node', node);
                            if (stackItem.settings.once) {
                                _stack.delete(cb);
                            }
                        }
                        const nestedNodes = node.querySelectorAll(selector);
                        [].forEach.call(nestedNodes, (nestedNode) => {
                            for (let [cb, stackItem] of _stack) {
                                if (
                                    !nestedNode.matches(stackItem.selector) ||
                                    _isNodeAlreadyHandledWhenSettingsOnceIsSet(
                                        nestedNode,
                                    )
                                ) {
                                    continue;
                                }
                                cb(nestedNode);
                                _emit?.('node', nestedNode);
                                if (stackItem.settings.once) {
                                    _stack.delete(cb);
                                }
                            }
                        });
                    });
                } else if (mutation.attributeName) {
                    if (!mutation.target.matches) return;
                    for (let [cb, stackItem] of _stack) {
                        if (
                            !mutation.target.matches(stackItem.selector) ||
                            _isNodeAlreadyHandledWhenSettingsOnceIsSet(
                                mutation.target,
                            )
                        ) {
                            continue;
                        }
                        cb(mutation.target);
                        _emit?.('node', mutation.target);
                        if (stackItem.settings.once) {
                            _stack.delete(cb);
                        }
                    }
                }
            });
        });
        _observer.observe(document, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'id'],
        });
    }

    const mapItem = {
        selector,
        cb,
        settings,
    };
    if (!_stack.has(cb)) {
        _stack.set(cb, mapItem);
    }

    // first search
    [].forEach.call(settings.rootNode.querySelectorAll(selector), (node) => {
        if (!node.matches) return;
        if (_isNodeAlreadyHandledWhenSettingsOnceIsSet(node)) {
            return;
        }
        cb(node);
        _emit?.('node', node);
    });

    return new __SPromise(({ resolve, reject, emit }) => {
        _emit = emit;
    });
}

export default querySelectorLive;
