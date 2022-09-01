// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
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
    const pro = new __SPromise(({ resolve, reject, emit }) => {
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
export default querySelectorLive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQTRDakQsSUFBSSxTQUFTLEVBQ1QsSUFBSSxHQUFHLENBQUMsRUFDUixNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUV2QixTQUFTLGlCQUFpQixDQUN0QixRQUFnQixFQUNoQixLQUE0QixJQUFJLEVBQ2hDLFdBQWdELEVBQUU7SUFFbEQsSUFBSSxLQUFLLENBQUM7SUFFVixNQUFNLGFBQWEsR0FBZ0IsRUFBRSxDQUFDO0lBRXRDLGtCQUFrQjtJQUNsQixRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDcEIsRUFBRSxFQUNGO1FBQ0ksUUFBUSxFQUFFLFFBQVE7UUFDbEIsSUFBSSxFQUFFLElBQUk7UUFDVixVQUFVLEVBQUUsSUFBSTtLQUNuQixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNyRCxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBRUgsU0FBUyxXQUFXLENBQUMsSUFBaUI7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN4QixPQUFPO1NBQ1Y7UUFFRCxxREFBcUQ7UUFDckQsSUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUN0QixDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDbkQ7WUFDRSxnQkFBZ0I7WUFDaEIsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFHLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUV0Qix5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