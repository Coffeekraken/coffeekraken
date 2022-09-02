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
import __whenNearViewport from '@coffeekraken/sugar/js/dom/detect/whenNearViewport';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
let _observer, _idx = 0, _stack = new Map();
function querySelectorLive(selector, cb = null, settings = {}) {
    var _a, _b, _c;
    let _emit, _pipe, noScopeSelector, observer;
    const selectedNodes = [];
    // extend settings
    settings = Object.assign({}, {
        rootNode: document,
        once: true,
        afterFirst: null,
        scopes: true,
    }, settings);
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
    function processNode(node, sel) {
        if (!node.matches) {
            return;
        }
        // if the node match and has not already been emitted
        if (node.matches(selector) &&
            (!settings.once || !selectedNodes.includes(node))) {
            // emit our node
            _emit === null || _emit === void 0 ? void 0 : _emit('node', node);
            // callback with our node
            cb === null || cb === void 0 ? void 0 : cb(node, {
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
    function findAndProcess($root, sel) {
        if (!$root.querySelectorAll) {
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
        querySelectorLive('[s-scope]', ($scope) => __awaiter(this, void 0, void 0, function* () {
            // get or generate a new id
            const scopeId = $scope.id || `s-scope-${__uniqid()}`;
            if ($scope.id !== scopeId) {
                $scope.setAttribute('id', scopeId);
            }
            yield __whenNearViewport($scope);
            querySelectorLive(selector, ($elm) => {
                // findAndProcess($scope, selector);
                processNode($elm, selector);
            }, Object.assign(Object.assign({}, settings), { rootNode: $scope, scopes: false, afterFirst() {
                    if (isAfterCalledByScopeId[scopeId] &&
                        $scope._sQuerySelectorLiveScopeDirty) {
                        return;
                    }
                    $scope._sQuerySelectorLiveScopeDirty = true;
                    isAfterCalledByScopeId[scopeId] = true;
                    $scope.classList.add('ready');
                    $scope.setAttribute('ready', 'true');
                } }));
        }), Object.assign(Object.assign({}, settings), { scopes: false }));
        // handle things not in a scope
        querySelectorLive(noScopeSelector, ($elm) => {
            // findAndProcess($scope, selector);
            processNode($elm, selector);
        }, Object.assign(Object.assign({}, settings), { scopes: false }));
        // setTimeout(() => {
        // after first callback
        (_b = settings.afterFirst) === null || _b === void 0 ? void 0 : _b.call(settings);
        // });
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
        // setTimeout(() => {
        findAndProcess(settings.rootNode, selector);
        // after first callback
        (_c = settings.afterFirst) === null || _c === void 0 ? void 0 : _c.call(settings);
        // });
    }
    // handle cancel
    pro.on('cancel', () => {
        observer === null || observer === void 0 ? void 0 : observer.disconnect();
    });
    return pro;
}
export default querySelectorLive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGtCQUFrQixNQUFNLG9EQUFvRCxDQUFDO0FBQ3BGLE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBNkNoRSxJQUFJLFNBQVMsRUFDVCxJQUFJLEdBQUcsQ0FBQyxFQUNSLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRXZCLFNBQVMsaUJBQWlCLENBQ3RCLFFBQWdCLEVBQ2hCLEtBQTRCLElBQUksRUFDaEMsV0FBZ0QsRUFBRTs7SUFFbEQsSUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxRQUFRLENBQUM7SUFFNUMsTUFBTSxhQUFhLEdBQWdCLEVBQUUsQ0FBQztJQUV0QyxrQkFBa0I7SUFDbEIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQ3BCLEVBQUUsRUFDRjtRQUNJLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLElBQUksRUFBRSxJQUFJO1FBQ1YsVUFBVSxFQUFFLElBQUk7UUFDaEIsTUFBTSxFQUFFLElBQUk7S0FDZixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYseUNBQXlDO0lBQ3pDLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUNqQixlQUFlLEdBQUcsUUFBUTthQUNyQixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDVCxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxrQkFBa0IsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7UUFDeEQsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO0lBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8s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