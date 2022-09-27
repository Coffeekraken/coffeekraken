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
exports.default = __querySelectorLive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCxpREFBaUQ7QUFDakQsdURBQXlEO0FBQ3pELHVEQUFzRDtBQUN0RCxzREFBZ0M7QUFnRGhDLFNBQXdCLG1CQUFtQixDQUN2QyxRQUFnQixFQUNoQixLQUE0QixJQUFJLEVBQ2hDLFdBQWdELEVBQUUsRUFDbEQsYUFBYSxHQUFHLElBQUk7O0lBRXBCLElBQUksS0FBSyxFQUNMLEtBQUssRUFDTCxlQUFlLEVBQ2YsUUFBUSxFQUNSLGFBQWEsR0FBRyxLQUFLLEVBQ3JCLFFBQVEsR0FBRyxLQUFLLEVBQ2hCLEdBQUcsR0FBRyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUVyQixNQUFNLGFBQWEsR0FBZ0IsRUFBRSxDQUFDO0lBRXRDLGtCQUFrQjtJQUNsQixRQUFRLEdBQUcsSUFBQSxvQkFBVyxFQUNsQjtRQUNJLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLElBQUksRUFBRSxJQUFJO1FBQ1YsVUFBVSxFQUFFLElBQUk7UUFDaEIsTUFBTSxFQUFFLElBQUk7UUFDWixTQUFTLEVBQUUsS0FBSztRQUNoQixJQUFJLEVBQUUsU0FBUztLQUNsQixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsSUFBSSxRQUFRLEtBQUssa0JBQWtCLEVBQUU7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDL0I7SUFFRCxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFFekIseUNBQXlDO0lBQ3pDLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUNqQixlQUFlLEdBQUcsUUFBUTthQUNyQixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDVCxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksRUFB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