"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const uniqid_1 = __importDefault(require("../../../shared/string/uniqid"));
function querySelectorLive(selector, cb = null, settings = {}) {
    let _emit;
    const observerId = `s-query-selector-live-${(0, uniqid_1.default)()}`;
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
    return new s_promise_1.default(({ resolve, reject, emit }) => {
        _emit = emit;
    });
}
exports.default = querySelectorLive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUNqRCwyRUFBbUQ7QUEyQ25ELFNBQVMsaUJBQWlCLENBQ3RCLFFBQWdCLEVBQ2hCLEtBQTRCLElBQUksRUFDaEMsV0FBZ0QsRUFBRTtJQUVsRCxJQUFJLEtBQUssQ0FBQztJQUVWLE1BQU0sVUFBVSxHQUFHLHlCQUF5QixJQUFBLGdCQUFNLEdBQUUsRUFBRSxDQUFDO0lBRXZELGtCQUFrQjtJQUNsQixRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDcEIsRUFBRSxFQUNGO1FBQ0ksUUFBUSxFQUFFLFFBQVE7UUFDbEIsSUFBSSxFQUFFLElBQUk7S0FDYixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsU0FBUywwQ0FBMEMsQ0FBQyxLQUFLO1FBQ3JELElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUU7Z0JBQ3RDLEtBQUssQ0FBQyw2QkFBNkIsR0FBRyxFQUFFLENBQUM7YUFDNUM7WUFFRCxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDakQsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDMUQ7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsaUNBQWlDO0lBQ2pDLE1BQU0sUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNoRCxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDM0IsSUFBSSxRQUFRLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUNuRCxFQUFFLENBQUMsT0FB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