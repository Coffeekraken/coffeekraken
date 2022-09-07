"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const whenNearViewport_1 = __importDefault(require("@coffeekraken/sugar/js/dom/detect/whenNearViewport"));
const uniqid_1 = __importDefault(require("@coffeekraken/sugar/shared/string/uniqid"));
let _observer, _idx = 0, _stack = new Map();
function __querySelectorLive(selector, cb = null, settings = {}) {
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
    const pro = new s_promise_1.default(({ resolve, reject, emit, pipe }) => {
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
        __querySelectorLive('[s-scope]', ($scope) => __awaiter(this, void 0, void 0, function* () {
            // get or generate a new id
            const scopeId = $scope.id || `s-scope-${(0, uniqid_1.default)()}`;
            if ($scope.id !== scopeId) {
                $scope.setAttribute('id', scopeId);
            }
            yield (0, whenNearViewport_1.default)($scope);
            __querySelectorLive(selector, ($elm) => {
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
        __querySelectorLive(noScopeSelector, ($elm) => {
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
exports.default = __querySelectorLive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCwwR0FBb0Y7QUFDcEYsc0ZBQWdFO0FBNkNoRSxJQUFJLFNBQVMsRUFDVCxJQUFJLEdBQUcsQ0FBQyxFQUNSLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRXZCLFNBQXdCLG1CQUFtQixDQUN2QyxRQUFnQixFQUNoQixLQUE0QixJQUFJLEVBQ2hDLFdBQWdELEVBQUU7O0lBRWxELElBQUksS0FBSyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsUUFBUSxDQUFDO0lBRTVDLE1BQU0sYUFBYSxHQUFnQixFQUFFLENBQUM7SUFFdEMsa0JBQWtCO0lBQ2xCLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNwQixFQUFFLEVBQ0Y7UUFDSSxRQUFRLEVBQUUsUUFBUTtRQUNsQixJQUFJLEVBQUUsSUFBSTtRQUNWLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLE1BQU0sRUFBRSxJQUFJO0tBQ2YsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLHlDQUF5QztJQUN6QyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7UUFDakIsZUFBZSxHQUFHLFFBQVE7YUFDckIsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1QsT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO1FBQ3hELENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtJQUVELE1BQU0sR0FBRyxHQUFHLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUMzRCxLQUFL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