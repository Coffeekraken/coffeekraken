// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import uniqid from '../../../shared/string/uniqid';
function querySelectorLive(selector, cb = null, settings = {}) {
    let _emit;
    const observerId = `s-query-selector-live-${uniqid()}`;
    // extend settings
    settings = Object.assign({}, {
        rootNode: document,
        once: true,
    }, settings);
    function _isNodeAlreadyHandledWhenSettingsOnceIsSet($node) {
        if (settings.once) {
            if (!$node._querySelectorLiveOverversIds) {
                $node._querySelectorLiveOverversIds = {};
            }
            if ($node._querySelectorLiveOverversIds[observerId]) {
                return true;
            }
            $node._querySelectorLiveOverversIds[observerId] = true;
        }
        return false;
    }
    // listen for updates in document
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes && mutation.addedNodes.length) {
                [].forEach.call(mutation.addedNodes, (node) => {
                    var _a;
                    if (((_a = node.getAttribute) === null || _a === void 0 ? void 0 : _a.call(node, 'class')) ===
                        's-btn s-radius:100 s-align:abs-top-right s-color:accent s-float:right') {
                        console.log('FOUND', node);
                    }
                    if (!node.matches)
                        return;
                    if (node.matches(selector)) {
                        // if (settings.once) observer.disconnect();
                        if (_isNodeAlreadyHandledWhenSettingsOnceIsSet(node)) {
                            return;
                        }
                        cb(node);
                        _emit === null || _emit === void 0 ? void 0 : _emit('node', node);
                    }
                    const nestedNodes = node.querySelectorAll(selector);
                    [].forEach.call(nestedNodes, (nestedNode) => {
                        if (_isNodeAlreadyHandledWhenSettingsOnceIsSet(nestedNode)) {
                            return;
                        }
                        cb(nestedNode);
                        _emit === null || _emit === void 0 ? void 0 : _emit('node', nestedNode);
                    });
                });
            }
            else if (mutation.attributeName) {
                console.log('Miut', mutation.attributeName, mutation.target);
                if (mutation.target.matches(selector)) {
                    if (_isNodeAlreadyHandledWhenSettingsOnceIsSet(mutation.target)) {
                        return;
                    }
                    cb(mutation.target);
                    _emit === null || _emit === void 0 ? void 0 : _emit('node', mutation.target);
                }
            }
        });
    });
    observer.observe(settings.rootNode, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'id'],
    });
    // first search
    [].forEach.call(settings.rootNode.querySelectorAll(selector), (node) => {
        if (!node.matches)
            return;
        if (_isNodeAlreadyHandledWhenSettingsOnceIsSet(node)) {
            return;
        }
        cb(node);
        _emit === null || _emit === void 0 ? void 0 : _emit('node', node);
    });
    return new __SPromise(({ resolve, reject, emit }) => {
        _emit = emit;
    });
}
export default querySelectorLive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLE1BQU0sTUFBTSwrQkFBK0IsQ0FBQztBQTJDbkQsU0FBUyxpQkFBaUIsQ0FDdEIsUUFBZ0IsRUFDaEIsS0FBNEIsSUFBSSxFQUNoQyxXQUFnRCxFQUFFO0lBRWxELElBQUksS0FBSyxDQUFDO0lBRVYsTUFBTSxVQUFVLEdBQUcseUJBQXlCLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFFdkQsa0JBQWtCO0lBQ2xCLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNwQixFQUFFLEVBQ0Y7UUFDSSxRQUFRLEVBQUUsUUFBUTtRQUNsQixJQUFJLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixTQUFTLDBDQUEwQyxDQUFDLEtBQUs7UUFDckQsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsRUFBRTtnQkFDdEMsS0FBSyxDQUFDLDZCQUE2QixHQUFHLEVBQUUsQ0FBQzthQUM1QztZQUVELElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNqRCxPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsS0FBSyxDQUFDLDZCQUE2QixDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUMxRDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxpQ0FBaUM7SUFDakMsTUFBTSxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2hELFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUMzQixJQUFJLFFBQVEsQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxN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