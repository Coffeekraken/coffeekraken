// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPromise from '@coffeekraken/s-promise';
import { __when } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __uniqid } from '@coffeekraken/sugar/string';
import __fastdom from 'fastdom';
export default function __querySelectorLive(selector, cb = null, settings = {}, _isFirstLevel = true) {
    var _a, _b, _c;
    let _emit, _pipe, noScopeSelector, observer, firstSelected = false, canceled = false, uid = __uniqid();
    const selectedNodes = [];
    // extend settings
    settings = __deepMerge({
        rootNode: document,
        once: true,
        afterFirst: null,
        scopes: true,
        firstOnly: false,
        when: undefined,
    }, settings);
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
    function handleNode(node, sel) {
        if (isCanceled()) {
            return;
        }
        // emit our node
        _emit === null || _emit === void 0 ? void 0 : _emit('node', {
            node,
            cancel() {
                pro.cancel();
            },
        });
        // callback with our node
        cb === null || cb === void 0 ? void 0 : cb(node, {
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
    function processNode(node, sel) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!node.matches || isCanceled()) {
                return;
            }
            // if the node match and has not already been emitted
            if (node.matches(selector) &&
                (!settings.once || !selectedNodes.includes(node))) {
                // handle the "when" setting
                if (settings.when) {
                    yield __when(node, settings.when);
                    if (isCanceled()) {
                        return;
                    }
                    handleNode(node, sel);
                }
                else {
                    handleNode(node, sel);
                }
            }
            // search inside our node
            findAndProcess(node, sel);
        });
    }
    function findAndProcess($root, sel) {
        if (!$root.querySelectorAll || isCanceled()) {
            return;
        }
        const nodes = Array.from($root === null || $root === void 0 ? void 0 : $root.querySelectorAll(sel));
        nodes.forEach((node) => {
            processNode(node, sel);
        });
    }
    if (settings.scopes &&
        (settings.rootNode === document ||
            !((_a = settings.rootNode) === null || _a === void 0 ? void 0 : _a.hasAttribute('s-scope')))) {
        let isAfterCalledByScopeId = {};
        // search for scopes and handle nested nodes
        innerPromises.push(__querySelectorLive('[s-scope]', ($scope) => __awaiter(this, void 0, void 0, function* () {
            // get or generate a new id
            const scopeId = $scope.id || `s-scope-${__uniqid()}`;
            if ($scope.id !== scopeId) {
                $scope.setAttribute('id', scopeId);
            }
            if (isCanceled()) {
                return;
            }
            yield __when($scope, 'nearViewport');
            if (isCanceled()) {
                return;
            }
            innerPromises.push(__querySelectorLive(selector, ($elm) => {
                // findAndProcess($scope, selector);
                processNode($elm, selector);
            }, Object.assign({}, settings, {
                rootNode: $scope,
                scopes: false,
                afterFirst() {
                    if (isAfterCalledByScopeId[scopeId] &&
                        $scope._sQuerySelectorLiveScopeDirty) {
                        return;
                    }
                    $scope._sQuerySelectorLiveScopeDirty = true;
                    isAfterCalledByScopeId[scopeId] = true;
                    __fastdom.mutate(() => {
                        $scope.classList.add('ready');
                        $scope.setAttribute('ready', 'true');
                    });
                },
            }), true));
        }), Object.assign({}, settings, {
            firstOnly: false,
            scopes: false,
        }), false));
        // handle things not in a scope
        innerPromises.push(__querySelectorLive(noScopeSelector, ($elm) => {
            // findAndProcess($scope, selector);
            processNode($elm, selector);
        }, Object.assign({}, settings, {
            scopes: false,
        }), false));
        // after first callback
        (_b = settings.afterFirst) === null || _b === void 0 ? void 0 : _b.call(settings);
    }
    else {
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
        findAndProcess(settings.rootNode, selector);
        // after first callback
        (_c = settings.afterFirst) === null || _c === void 0 ? void 0 : _c.call(settings);
    }
    // handle cancel
    pro.on('cancel', () => {
        canceled = true;
        innerPromises.forEach((promise) => {
            promise.cancel();
        });
        observer === null || observer === void 0 ? void 0 : observer.disconnect();
    });
    return pro;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFnRGhDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsbUJBQW1CLENBQ3ZDLFFBQWdCLEVBQ2hCLEtBQTRCLElBQUksRUFDaEMsV0FBZ0QsRUFBRSxFQUNsRCxhQUFhLEdBQUcsSUFBSTs7SUFFcEIsSUFBSSxLQUFLLEVBQ0wsS0FBSyxFQUNMLGVBQWUsRUFDZixRQUFRLEVBQ1IsYUFBYSxHQUFHLEtBQUssRUFDckIsUUFBUSxHQUFHLEtBQUssRUFDaEIsR0FBRyxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBRXJCLE1BQU0sYUFBYSxHQUFnQixFQUFFLENBQUM7SUFFdEMsa0JBQWtCO0lBQ2xCLFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksUUFBUSxFQUFFLFFBQVE7UUFDbEIsSUFBSSxFQUFFLElBQUk7UUFDVixVQUFVLEVBQUUsSUFBSTtRQUNoQixNQUFNLEVBQUUsSUFBSTtRQUNaLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLElBQUksRUFBRSxTQUFTO0tBQ2xCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFFekIseUNBQXlDO0lBQ3pDLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUNqQixlQUFlLEdBQUcsUUFBUTthQUNyQixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVB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