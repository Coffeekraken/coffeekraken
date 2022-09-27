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
    if (selector === 's-clipboard-copy') {
        console.log('SE', settings);
    }
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
        if (selector === 's-clipboard-copy') {
            console.log('SE', settings);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFnRGhDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsbUJBQW1CLENBQ3ZDLFFBQWdCLEVBQ2hCLEtBQTRCLElBQUksRUFDaEMsV0FBZ0QsRUFBRSxFQUNsRCxhQUFhLEdBQUcsSUFBSTs7SUFFcEIsSUFBSSxLQUFLLEVBQ0wsS0FBSyxFQUNMLGVBQWUsRUFDZixRQUFRLEVBQ1IsYUFBYSxHQUFHLEtBQUssRUFDckIsUUFBUSxHQUFHLEtBQUssRUFDaEIsR0FBRyxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBRXJCLE1BQU0sYUFBYSxHQUFnQixFQUFFLENBQUM7SUFFdEMsa0JBQWtCO0lBQ2xCLFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksUUFBUSxFQUFFLFFBQVE7UUFDbEIsSUFBSSxFQUFFLElBQUk7UUFDVixVQUFVLEVBQUUsSUFBSTtRQUNoQixNQUFNLEVBQUUsSUFBSTtRQUNaLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLElBQUksRUFBRSxTQUFTO0tBQ2xCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixJQUFJLFFBQVEsS0FBSyxrQkFBa0IsRUFBRTtRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztLQUMvQjtJQUVELE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUV6Qix5Q0FBeUM7SUFDekMsSUFBSSxRQUFRLENBQUMs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