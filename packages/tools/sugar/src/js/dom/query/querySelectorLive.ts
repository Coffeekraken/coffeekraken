// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import { __when } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __uniqid } from '@coffeekraken/sugar/string';
import __fastdom from 'fastdom';
import type { TWhenTrigger } from '../detect/when';

/**
 * @name            querySelectorLive
 * @namespace       js.dom.query
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
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
 * @snippet         __querySelectorLive($1, $2)
 * __querySelectorLive($1, \$elm => {
 *      $2
 * });
 *
 * @example 	js
 * import { __querySelectorLive } from '@coffeekraken/sugar/dom'
 * __querySelectorLive('.my-cool-item', (node, api) => {
 * 	    // do something here with the detected node
 *      // call api.cancel if you want to stop listening for this selector
 *      api.cancel();
 * });
 *
 * @since           2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IQuerySelectorLiveSettings {
    rootNode: HTMLElement;
    once: boolean;
    afterFirst: Function;
    scopes: boolean;
    firstOnly: boolean;
    when: TWhenTrigger;
    attributes: string[];
}

export default function __querySelectorLive(
    selector: string,
    cb: Function<HTMLElement> = null,
    settings: Partial<IQuerySelectorLiveSettings> = {},
    _isFirstLevel = true,
): __SPromise<HTMLElement> {
    let _emit,
        _pipe,
        noScopeSelector,
        observer,
        firstSelected = false,
        canceled = false,
        uid = __uniqid();

    const selectedNodes: HTMLElement = [];

    // extend settings
    settings = __deepMerge(
        {
            rootNode: document,
            once: true,
            afterFirst: null,
            scopes: true,
            firstOnly: false,
            attributes: [],
            when: undefined,
        },
        settings,
    );

    // settings.scopes = false;

    const innerPromises = [];

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

    function isCanceled() {
        return selectedNodes.length && canceled && _isFirstLevel;
    }

    if (isCanceled()) {
        return;
    }

    function handleNode(node: HTMLElement, sel: string): void {
        if (isCanceled()) {
            return;
        }

        // emit our node
        _emit?.('node', {
            node,
            cancel() {
                pro.cancel();
            },
        });

        // callback with our node
        cb?.(node, {
            cancel() {
                pro.cancel();
            },
        });

        // handle firstOnly setting
        if (settings.firstOnly) {
            pro.cancel();
        }

        // mark our node as selected at least 1 time
        if (!selectedNodes.includes(node)) {
            selectedNodes.push(node);
        }
    }

    async function processNode(node: HTMLElement, sel: string): void {
        if (!node.matches || isCanceled()) {
            return;
        }

        // if the node match and has not already been emitted
        if (
            node.matches(selector) &&
            (!settings.once || !selectedNodes.includes(node))
        ) {
            // handle the "when" setting
            if (settings.when) {
                await __when(node, settings.when);
                if (isCanceled()) {
                    return;
                }
                handleNode(node, sel);
            } else {
                handleNode(node, sel);
            }
        }

        // search inside our node
        findAndProcess(node, sel);
    }

    function findAndProcess($root: HTMLElement, sel: string) {
        if (!$root.querySelectorAll || isCanceled()) {
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
        innerPromises.push(
            __querySelectorLive(
                '[s-scope]',
                async ($scope) => {
                    // get or generate a new id
                    const scopeId = $scope.id || `s-scope-${__uniqid()}`;
                    if ($scope.id !== scopeId) {
                        $scope.setAttribute('id', scopeId);
                    }

                    if (isCanceled()) {
                        return;
                    }

                    await __when($scope, 'nearViewport');

                    if (isCanceled()) {
                        return;
                    }

                    innerPromises.push(
                        __querySelectorLive(
                            selector,
                            ($elm) => {
                                // findAndProcess($scope, selector);
                                processNode($elm, selector);
                            },
                            Object.assign({}, settings, {
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
                                    __fastdom.mutate(() => {
                                        $scope.classList.add('ready');
                                        $scope.setAttribute('ready', 'true');
                                    });
                                },
                            }),
                            true,
                        ),
                    );
                },
                Object.assign({}, settings, {
                    firstOnly: false,
                    scopes: false,
                }),
                false,
            ),
        );
        // handle things not in a scope
        innerPromises.push(
            __querySelectorLive(
                noScopeSelector,
                ($elm) => {
                    // findAndProcess($scope, selector);
                    processNode($elm, selector);
                },
                Object.assign({}, settings, {
                    scopes: false,
                }),
                false,
            ),
        );
        // after first callback
        settings.afterFirst?.();
    } else {
        observer = new MutationObserver((mutations, obs) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName) {
                    processNode(mutation.target, selector);
                }
                if (mutation.addedNodes) {
                    mutation.addedNodes.forEach((node) => {
                        processNode(node, selector);
                    });
                }
            });
        });

        let observeSettings = {
            childList: true,
            subtree: true,
        };

        selector
            .split(',')
            .map((l) => l.trim())
            .forEach((sel) => {
                const attrMatches = sel.match(/\[[^\]]+\]/gm);
                if (attrMatches?.length) {
                    attrMatches.forEach((attrStr) => {
                        const attrName = attrStr
                            .split('=')[0]
                            .replace(/^\[/, '')
                            .replace(/\]$/, '');
                        if (!settings.attributes?.includes(attrName)) {
                            settings.attributes?.push(attrName);
                        }
                    });
                }
            });

        if (settings.attributes?.length) {
            observeSettings = {
                ...observeSettings,
                attributes: settings.attributes?.length,
                attributeFilter: settings.attributes.length
                    ? settings.attributes
                    : null,
            };
        }

        observer.observe(settings.rootNode, observeSettings);

        // first query
        findAndProcess(settings.rootNode, selector);
        // after first callback
        settings.afterFirst?.();
    }

    // handle cancel
    pro.on('cancel', () => {
        canceled = true;
        innerPromises.forEach((promise) => {
            promise.cancel();
        });
        observer?.disconnect();
    });

    return pro;
}
