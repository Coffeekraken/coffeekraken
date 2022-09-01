"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
let _observer, _idx = 0, _stack = new Map();
function querySelectorLive(selector, cb = null, settings = {}) {
    let _emit;
    const selectedNodes = [];
    // extend settings
    settings = Object.assign({}, {
        rootNode: document,
        once: true,
        afterFirst: null,
    }, settings);
    const pro = new s_promise_1.default(({ resolve, reject, emit }) => {
        _emit = emit;
    });
    function processNode(node) {
        if (!node.querySelectorAll) {
            return;
        }
        // if the node match and has not already been emitted
        if (node.matches(selector) &&
            (!settings.once || !selectedNodes.includes(node))) {
            // emit our node
            _emit === null || _emit === void 0 ? void 0 : _emit('node', node);
            // callback with our node
            cb === null || cb === void 0 ? void 0 : cb(node);
            // mark our node as selected at least 1 time
            if (!selectedNodes.includes(node)) {
                selectedNodes.push(node);
            }
        }
        // search inside our node
        findAndProcess(node);
    }
    function findAndProcess($root) {
        const nodes = Array.from($root === null || $root === void 0 ? void 0 : $root.querySelectorAll(selector));
        nodes.forEach((node) => {
            processNode(node);
        });
    }
    const observer = new MutationObserver((mutations, obs) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName) {
                processNode(node);
            }
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach((node) => {
                    processNode(node);
                });
            }
        });
    });
    observer.observe(settings.rootNode, {
        childList: true,
        subtree: true,
    });
    // first query
    setTimeout(() => {
        var _a;
        findAndProcess(settings.rootNode);
        // after first callback
        (_a = settings.afterFirst) === null || _a === void 0 ? void 0 : _a.call(settings);
    });
    // function _isNodeAlreadyHandledWhenSettingsOnceIsSet(node, stackItem) {
    //     if (stackItem.settings.once) {
    //         if (
    //             node.hasAttribute('s-qsl') &&
    //             node.getAttribute('s-qsl').includes(stackItem.observerId)
    //         ) {
    //             return true;
    //         }
    //         const currentIds = `${node.getAttribute('s-qsl') ?? ''}`
    //             .split(',')
    //             .filter((l) => l !== '');
    //         currentIds.push(stackItem.observerId);
    //         node.setAttribute('s-qsl', currentIds.join(','));
    //     }
    //     return false;
    // }
    // function _nodeMatches(node, stackItem) {
    //     const isAlreadyGetted = _isNodeAlreadyHandledWhenSettingsOnceIsSet(
    //             node,
    //             stackItem,
    //         ),
    //         matchSelector = node.matches(stackItem.selector);
    //     return !isAlreadyGetted && matchSelector;
    // }
    // function _processNode(node, mutation, stackItem) {
    //     if (!node.matches) return;
    //     // prevent from attributes that does not have really changed
    //     if (
    //         mutation &&
    //         mutation.attribute &&
    //         node.getAttribute(mutation.attributeName) === mutation.oldValue
    //     ) {
    //         return;
    //     }
    //     if (!_nodeMatches(node, stackItem)) {
    //         return;
    //     }
    //     stackItem.cb(node);
    //     _emit?.('node', node);
    // }
    // function _findAndProcessNodes(stackItem) {
    //     const finalSelector = stackItem.selector
    //         .split(',')
    //         .map((sel) => {
    //             if (stackItem.settings.once) {
    //                 return `${sel}:not([s-qsl*="${stackItem.observerId}"])`;
    //             }
    //             return sel;
    //         })
    //         .join(',');
    //     [].forEach.call(
    //         stackItem.settings.rootNode.querySelectorAll(finalSelector),
    //         (node) => {
    //             _processNode(node, null, stackItem);
    //         },
    //     );
    // }
    // // listen for updates in document
    // if (!_observer) {
    //     let newSeachTimeout;
    //     _observer = new MutationObserver((mutations) => {
    //         let needNewSearch = false;
    //         mutations.forEach((mutation) => {
    //             if (mutation.addedNodes && mutation.addedNodes.length) {
    //                 needNewSearch = true;
    //             } else if (mutation.attributeName) {
    //                 needNewSearch = true;
    //             }
    //         });
    //         if (needNewSearch) {
    //             clearTimeout(newSeachTimeout);
    //             // newSeachTimeout = setTimeout(() => {
    //             for (let [cb, stackItem] of _stack) {
    //                 _findAndProcessNodes(stackItem);
    //             }
    //             // });
    //         }
    //     });
    //     _observer.observe(document, {
    //         childList: true,
    //         subtree: true,
    //         attributes: true,
    //         attributeOldValue: true,
    //         attributeFilter: ['class', 'id'],
    //     });
    // }
    // const mapItem = {
    //     observerId,
    //     selector,
    //     cb,
    //     settings,
    // };
    // if (!_stack.has(cb)) {
    //     _stack.set(cb, mapItem);
    // }
    // // first query
    // _findAndProcessNodes(mapItem);
    // // after first callback
    // settings.afterFirst?.();
    return pro;
}
exports.default = querySelectorLive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQTRDakQsSUFBSSxTQUFTLEVBQ1QsSUFBSSxHQUFHLENBQUMsRUFDUixNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUV2QixTQUFTLGlCQUFpQixDQUN0QixRQUFnQixFQUNoQixLQUE0QixJQUFJLEVBQ2hDLFdBQWdELEVBQUU7SUFFbEQsSUFBSSxLQUFLLENBQUM7SUFFVixNQUFNLGFBQWEsR0FBZ0IsRUFBRSxDQUFDO0lBRXRDLGtCQUFrQjtJQUNsQixRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDcEIsRUFBRSxFQUNGO1FBQ0ksUUFBUSxFQUFFLFFBQVE7UUFDbEIsSUFBSSxFQUFFLElBQUk7UUFDVixVQUFVLEVBQUUsSUFBSTtLQUNuQixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsTUFBTSxHQUFHLEdBQUcsSUFBSSxtQkFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDckQsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztJQUVILFNBQVMsV0FBVyxDQUFDLElBQWlCO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDeEIsT0FBTztTQUNWO1FBRUQscURBQXFEO1FBQ3JELElBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDdEIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ25EO1lBQ0UsZ0JBQWdCO1lBQ2hCLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFdEIseUJBQXlCO1lBQ3pCLEVB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