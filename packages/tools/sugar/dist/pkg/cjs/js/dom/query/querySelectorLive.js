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
const dom_1 = require("@coffeekraken/sugar/dom");
const object_1 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
const fastdom_1 = __importDefault(require("fastdom"));
function __querySelectorLive(selector, cb = null, settings = {}, _isFirstLevel = true) {
    var _a, _b, _c;
    let _emit, _pipe, noScopeSelector, observer, firstSelected = false, canceled = false, uid = (0, string_1.__uniqid)();
    const selectedNodes = [];
    // extend settings
    settings = (0, object_1.__deepMerge)({
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
    const pro = new s_promise_1.default(({ resolve, reject, emit, pipe }) => {
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
                    yield (0, dom_1.__when)(node, settings.when);
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
            const scopeId = $scope.id || `s-scope-${(0, string_1.__uniqid)()}`;
            if ($scope.id !== scopeId) {
                $scope.setAttribute('id', scopeId);
            }
            if (isCanceled()) {
                return;
            }
            yield (0, dom_1.__when)($scope, 'nearViewport');
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
                    fastdom_1.default.mutate(() => {
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
exports.default = __querySelectorLive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCxpREFBaUQ7QUFDakQsdURBQXlEO0FBQ3pELHVEQUFzRDtBQUN0RCxzREFBZ0M7QUFnRGhDLFNBQXdCLG1CQUFtQixDQUN2QyxRQUFnQixFQUNoQixLQUE0QixJQUFJLEVBQ2hDLFdBQWdELEVBQUUsRUFDbEQsYUFBYSxHQUFHLElBQUk7O0lBRXBCLElBQUksS0FBSyxFQUNMLEtBQUssRUFDTCxlQUFlLEVBQ2YsUUFBUSxFQUNSLGFBQWEsR0FBRyxLQUFLLEVBQ3JCLFFBQVEsR0FBRyxLQUFLLEVBQ2hCLEdBQUcsR0FBRyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUVyQixNQUFNLGFBQWEsR0FBZ0IsRUFBRSxDQUFDO0lBRXRDLGtCQUFrQjtJQUNsQixRQUFRLEdBQUcsSUFBQSxvQkFBVyxFQUNsQjtRQUNJLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLElBQUksRUFBRSxJQUFJO1FBQ1YsVUFBVSxFQUFFLElBQUk7UUFDaEIsTUFBTSxFQUFFLElBQUk7UUFDWixTQUFTLEVBQUUsS0FBSztRQUNoQixJQUFJLEVBQUUsU0FBUztLQUNsQixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBRXpCLHlDQUF5QztJQUN6QyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7UUFDakIsZUFBZSxHQUFHLFFBQVE7YUFDckIsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1QsT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO1FBQ3hELENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNs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