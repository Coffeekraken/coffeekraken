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
        querySelectorLive('[s-scope]', ($scope) => __awaiter(this, void 0, void 0, function* () {
            // get or generate a new id
            const scopeId = $scope.id || `s-scope-${(0, uniqid_1.default)()}`;
            if ($scope.id !== scopeId) {
                $scope.setAttribute('id', scopeId);
            }
            yield (0, whenNearViewport_1.default)($scope);
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
exports.default = querySelectorLive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCwwR0FBb0Y7QUFDcEYsc0ZBQWdFO0FBNkNoRSxJQUFJLFNBQVMsRUFDVCxJQUFJLEdBQUcsQ0FBQyxFQUNSLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRXZCLFNBQVMsaUJBQWlCLENBQ3RCLFFBQWdCLEVBQ2hCLEtBQTRCLElBQUksRUFDaEMsV0FBZ0QsRUFBRTs7SUFFbEQsSUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxRQUFRLENBQUM7SUFFNUMsTUFBTSxhQUFhLEdBQWdCLEVBQUUsQ0FBQztJQUV0QyxrQkFBa0I7SUFDbEIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQ3BCLEVBQUUsRUFDRjtRQUNJLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLElBQUksRUFBRSxJQUFJO1FBQ1YsVUFBVSxFQUFFLElBQUk7UUFDaEIsTUFBTSxFQUFFLElBQUk7S0FDZixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYseUNBQXlDO0lBQ3pDLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUNqQixlQUFlLEdBQUcsUUFBUTthQUNyQixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDVCxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxrQkFBa0IsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7UUFDeEQsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO0lBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxtQkFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzNELEtBQUss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