// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __whenNearViewport from '@coffeekraken/sugar/js/dom/detect/whenNearViewport';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';

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
 * import { __querySelectorLive } from '@coffeekraken/sugar/dom'
 * __querySelectorLive('.my-cool-item', (node, api) => {
 * 	    // do something here with the detected node
 *      // call api.cancel if you want to stop listening for this selector
 *      api.cancel();
 * });
 *
 * @since       1.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IQuerySelectorLiveSettings {
    rootNode: HTMLElement;
    once: boolean;
    afterFirst: Function;
    scopes: boolean;
}

let _observer,
    _idx = 0,
    _stack = new Map();

export default function __querySelectorLive(
    selector: string,
    cb: Function<HTMLElement> = null,
    settings: Partial<IQuerySelectorLiveSettings> = {},
): __SPromise<HTMLElement> {
    let _emit, _pipe, noScopeSelector, observer;

    const selectedNodes: HTMLElement = [];

    // extend settings
    settings = Object.assign(
        {},
        {
            rootNode: document,
            once: true,
            afterFirst: null,
            scopes: true,
        },
        settings,
    );

    // process selectors when scopes are true
    if (settings.scopes) {
        noScopeSelector = selector
            .split(',')
            .map((sel) => {
                return `${sel.trim()}:not([s-scope] ${sel.trim()})`;
            })
            .join(',');
    }

    const pro = new __SPromise(({ resolve, reject, emit, pipe }) => {
        _emit = emit;
        _pipe = pipe;
    });

    function processNode(node: HTMLElement, sel: string): void {
        if (!node.matches) {
            return;
        }

        // if the node match and has not already been emitted
        if (
            node.matches(selector) &&
            (!settings.once || !selectedNodes.includes(node))
        ) {
            // emit our node
            _emit?.('node', node);

            // callback with our node
            cb?.(node, {
                cancel: pro.cancel.bind(pro),
            });

            // mark our node as selected at least 1 time
            if (!selectedNodes.includes(node)) {
                selectedNodes.push(node);
            }
        }

        // search inside our node
        findAndProcess(node, sel);
    }

    function findAndProcess($root: HTMLElement, sel: string) {
        if (!$root.querySelectorAll) {
            return;
        }

        const nodes = Array.from($root?.querySelectorAll(sel));

        nodes.forEach((node) => {
            processNode(node, sel);
        });
    }

    if (
        settings.scopes &&
        (settings.rootNode === document ||
            !settings.rootNode?.hasAttribute('s-scope'))
    ) {
        let isAfterCalledByScopeId = {};

        // search for scopes and handle nested nodes
        __querySelectorLive(
            '[s-scope]',
            async ($scope) => {
                // get or generate a new id
                const scopeId = $scope.id || `s-scope-${__uniqid()}`;
                if ($scope.id !== scopeId) {
                    $scope.setAttribute('id', scopeId);
                }

                await __whenNearViewport($scope);
                __querySelectorLive(
                    selector,
                    ($elm) => {
                        // findAndProcess($scope, selector);
                        processNode($elm, selector);
                    },
                    {
                        ...settings,
                        rootNode: $scope,
                        scopes: false,
                        afterFirst() {
                            if (
                                isAfterCalledByScopeId[scopeId] &&
                                $scope._sQuerySelectorLiveScopeDirty
                            ) {
                                return;
                            }
                            $scope._sQuerySelectorLiveScopeDirty = true;
                            isAfterCalledByScopeId[scopeId] = true;
                            $scope.classList.add('ready');
                            $scope.setAttribute('ready', 'true');
                        },
                    },
                );
            },
            {
                ...settings,
                scopes: false,
            },
        );
        // handle things not in a scope
        __querySelectorLive(
            noScopeSelector,
            ($elm) => {
                // findAndProcess($scope, selector);
                processNode($elm, selector);
            },
            {
                ...settings,
                scopes: false,
            },
        );
        // setTimeout(() => {
        // after first callback
        settings.afterFirst?.();
        // });
    } else {
        observer = new MutationObserver((mutations, obs) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName) {
                    processNode(node, selector);
                }
                if (mutation.addedNodes) {
                    mutation.addedNodes.forEach((node) => {
                        processNode(node, selector);
                    });
                }
            });
        });

        observer.observe(settings.rootNode, {
            childList: true,
            subtree: true,
        });

        // first query
        // setTimeout(() => {
        findAndProcess(settings.rootNode, selector);
        // after first callback
        settings.afterFirst?.();
        // });
    }

    // handle cancel
    pro.on('cancel', () => {
        observer?.disconnect();
    });

    return pro;
}
