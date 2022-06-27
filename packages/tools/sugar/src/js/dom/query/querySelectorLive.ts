// @ts-nocheck

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
    afterFirst: Function;
}

let _observer,
    _idx = 0,
    _stack = new Map();

function querySelectorLive(
    selector: string,
    cb: Function<HTMLElement> = null,
    settings: Partial<IQuerySelectorLiveSettings> = {},
): __SPromise<HTMLElement> {
    let _emit;

    const observerId = `s${_idx}s`;
    _idx++;

    // extend settings
    settings = Object.assign(
        {},
        {
            rootNode: document,
            once: true,
            afterFirst: null,
        },
        settings,
    );

    function _isNodeAlreadyHandledWhenSettingsOnceIsSet(node, stackItem) {
        if (stackItem.settings.once) {
            if (
                node.hasAttribute('s-qsl') &&
                node.getAttribute('s-qsl').includes(stackItem.observerId)
            ) {
                return true;
            }
            const currentIds = `${node.getAttribute('s-qsl') ?? ''}`
                .split(',')
                .filter((l) => l !== '');
            currentIds.push(stackItem.observerId);
            node.setAttribute('s-qsl', currentIds.join(','));
        }
        return false;
    }

    function _nodeMatches(node, stackItem) {
        const isAlreadyGetted = _isNodeAlreadyHandledWhenSettingsOnceIsSet(
                node,
                stackItem,
            ),
            matchSelector = node.matches(stackItem.selector);
        return !isAlreadyGetted && matchSelector;
    }

    function _processNode(node, mutation, stackItem) {
        if (!node.matches) return;

        // prevent from attributes that does not have really changed
        if (
            mutation &&
            mutation.attribute &&
            node.getAttribute(mutation.attributeName) === mutation.oldValue
        ) {
            return;
        }
        if (!_nodeMatches(node, stackItem)) {
            return;
        }

        stackItem.cb(node);
        _emit?.('node', node);
    }

    function _findAndProcessNodes(stackItem) {
        const finalSelector = stackItem.selector
            .split(',')
            .map((sel) => {
                if (stackItem.settings.once) {
                    return `${sel}:not([s-qsl*="${stackItem.observerId}"])`;
                }
                return sel;
            })
            .join(',');

        [].forEach.call(
            stackItem.settings.rootNode.querySelectorAll(finalSelector),
            (node) => {
                _processNode(node, null, stackItem);
            },
        );
    }

    // listen for updates in document
    if (!_observer) {
        let newSeachTimeout;
        _observer = new MutationObserver((mutations) => {
            let needNewSearch = false;

            mutations.forEach((mutation) => {
                if (mutation.addedNodes && mutation.addedNodes.length) {
                    needNewSearch = true;
                } else if (mutation.attributeName) {
                    needNewSearch = true;
                }
            });

            if (needNewSearch) {
                clearTimeout(newSeachTimeout);
                // newSeachTimeout = setTimeout(() => {
                for (let [cb, stackItem] of _stack) {
                    _findAndProcessNodes(stackItem);
                }
                // });
            }
        });
        _observer.observe(document, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeOldValue: true,
            attributeFilter: ['class', 'id'],
        });
    }

    const mapItem = {
        observerId,
        selector,
        cb,
        settings,
    };
    if (!_stack.has(cb)) {
        _stack.set(cb, mapItem);
    }

    // first query
    _findAndProcessNodes(mapItem);

    // after first callback
    settings.afterFirst?.();

    const pro = new __SPromise(({ resolve, reject, emit }) => {
        _emit = emit;
    });

    return pro;
}

export default querySelectorLive;
