"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
let _observer, _idx = 0, _stack = new Map();
function querySelectorLive(selector, cb = null, settings = {}) {
    var _a;
    let _emit;
    const observerId = `s${_idx}s`;
    _idx++;
    // extend settings
    settings = Object.assign({}, {
        rootNode: document,
        once: true,
        afterFirst: null,
    }, settings);
    function _isNodeAlreadyHandledWhenSettingsOnceIsSet(node, stackItem) {
        var _a;
        if (stackItem.settings.once) {
            if (node.hasAttribute('s-qsl') &&
                node.getAttribute('s-qsl').includes(stackItem.observerId)) {
                return true;
            }
            const currentIds = `${(_a = node.getAttribute('s-qsl')) !== null && _a !== void 0 ? _a : ''}`
                .split(',')
                .filter((l) => l !== '');
            currentIds.push(stackItem.observerId);
            node.setAttribute('s-qsl', currentIds.join(','));
        }
        return false;
    }
    function _nodeMatches(node, stackItem) {
        const isAlreadyGetted = _isNodeAlreadyHandledWhenSettingsOnceIsSet(node, stackItem), matchSelector = node.matches(stackItem.selector);
        return !isAlreadyGetted && matchSelector;
    }
    function _processNode(node, mutation, stackItem) {
        if (!node.matches)
            return;
        // prevent from attributes that does not have really changed
        if (mutation &&
            mutation.attribute &&
            node.getAttribute(mutation.attributeName) === mutation.oldValue) {
            return;
        }
        if (!_nodeMatches(node, stackItem)) {
            return;
        }
        stackItem.cb(node);
        _emit === null || _emit === void 0 ? void 0 : _emit('node', node);
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
        [].forEach.call(stackItem.settings.rootNode.querySelectorAll(finalSelector), (node) => {
            _processNode(node, null, stackItem);
        });
    }
    // listen for updates in document
    if (!_observer) {
        let newSeachTimeout;
        _observer = new MutationObserver((mutations) => {
            let needNewSearch = false;
            mutations.forEach((mutation) => {
                if (mutation.addedNodes && mutation.addedNodes.length) {
                    needNewSearch = true;
                }
                else if (mutation.attributeName) {
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
    (_a = settings.afterFirst) === null || _a === void 0 ? void 0 : _a.call(settings);
    const pro = new s_promise_1.default(({ resolve, reject, emit }) => {
        _emit = emit;
    });
    return pro;
}
exports.default = querySelectorLive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQTRDakQsSUFBSSxTQUFTLEVBQ1QsSUFBSSxHQUFHLENBQUMsRUFDUixNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUV2QixTQUFTLGlCQUFpQixDQUN0QixRQUFnQixFQUNoQixLQUE0QixJQUFJLEVBQ2hDLFdBQWdELEVBQUU7O0lBRWxELElBQUksS0FBSyxDQUFDO0lBRVYsTUFBTSxVQUFVLEdBQUcsSUFBSSxJQUFJLEdBQUcsQ0FBQztJQUMvQixJQUFJLEVBQUUsQ0FBQztJQUVQLGtCQUFrQjtJQUNsQixRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDcEIsRUFBRSxFQUNGO1FBQ0ksUUFBUSxFQUFFLFFBQVE7UUFDbEIsSUFBSSxFQUFFLElBQUk7UUFDVixVQUFVLEVBQUUsSUFBSTtLQUNuQixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsU0FBUywwQ0FBMEMsQ0FBQyxJQUFJLEVBQUUsU0FBUzs7UUFDL0QsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtZQUN6QixJQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO2dCQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQzNEO2dCQUNFLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxNQUFNLFVBQVUsR0FBRyxHQUFHLE1BQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsbUNBQUksRUFBRSxFQUFFO2lCQUNuRCxLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLFVBQVUsQ0FBQyxJQUFJ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