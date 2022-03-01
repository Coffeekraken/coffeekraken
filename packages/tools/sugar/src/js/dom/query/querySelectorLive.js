// @ts-nocheck
import uniqid from '../../../shared/string/uniqid';
import matches from './matches';
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name            querySelectorLive
 * @namespace       js.dom.query
 * @type            Function
 * @platform        js
 * @status          beta
 *
 * Observe the dom to get all the elements that matches a passed css selector at any point in time.
 * Be warned that this use the mutation observer API and will monitor all the document for new nodes. Make sure to use it
 * when you don't have the chance to use the custom elements API instead
 *
 * @feature         Specify what you want to select and get notified each time a node like this appears in the dom
 * @feature         Promise based API
 * @feature         Callback support
 * @feature         Monitor added nodes and existing nodes that have class and id attributes updated
 *
 * @param	    {String} 		selector 		The css selector that we are interested in
 * @param 	    {Function} 		cb 				The function to call with the newly added node
 * @param 	    {Object} 		[settings={}] 	An optional settings object to specify things like the rootNode to monitor, etc...
 * @return      {SPromise<HTMLElement>}         An SPromise instance on which to listen for nodes using the "node" event
 *
 * @example 	js
 * import querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive'
 * querySelectorLive('.my-cool-item', (node, clearFn) => {
 * 	    // do something here with the detected node
 *      // call clearFn if you want to stop listening for this selector
 *      clearFn();
 * });
 *
 * @since       1.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
let _observer;
const _selectors = {};
function querySelectorLive(selector, cb = null, settings = {}) {
    const id = `${selector} - ${uniqid()}`;
    let _emit;
    // extend settings
    settings = Object.assign({}, {
        rootNode: document,
        once: true,
        onRemove: null
    }, settings);
    if (!_selectors[selector]) {
        _selectors[selector] = [
            {
                id: id,
                selector: selector,
                cb: cb,
                lastMutationId: null,
                settings: settings,
            },
        ];
    }
    else {
        _selectors[selector].push({
            id: id,
            selector: selector,
            cb: cb,
            lastMutationId: null,
            settings: settings,
        });
    }
    function pushNewNode(node, sel, mutationId) {
        const objs = _selectors[sel];
        if (!objs)
            return;
        objs.forEach((obj) => {
            // avoid calling multiple times sams callback for the same mutation process
            if (obj.lastMutationId && obj.lastMutationId === mutationId)
                return;
            if (obj.settings.once) {
                if (!node._querySelectorLive) {
                    node._querySelectorLive = {};
                }
                if (node._querySelectorLive[obj.id])
                    return;
                node._querySelectorLive[obj.id] = true;
            }
            _emit === null || _emit === void 0 ? void 0 : _emit('node', node);
            obj.cb &&
                obj.cb(node, () => {
                    delete _selectors[obj.selector];
                });
        });
    }
    function removeNode(node, sel, mutationId) {
        const objs = _selectors[sel];
        if (!objs)
            return;
        objs.forEach((obj) => {
            // avoid calling multiple times sams callback for the same mutation process
            if (obj.lastMutationId && obj.lastMutationId === mutationId)
                return;
            if (obj.settings.once) {
                if (!node._querySelectorLive) {
                    node._querySelectorLive = {};
                }
                if (node._querySelectorLive[obj.id])
                    return;
                node._querySelectorLive[obj.id] = true;
            }
            _emit === null || _emit === void 0 ? void 0 : _emit('removedNode', node);
            obj.settings.onRemove &&
                obj.settings.onRemove(node, () => {
                    delete _selectors[obj.selector];
                });
        });
    }
    // listen for updates in document
    if (!_observer) {
        _observer = new MutationObserver((mutations) => {
            const mutationId = `mutation-${uniqid()}`;
            mutations.forEach((mutation) => {
                if (mutation.removedNodes && mutation.removedNodes.length) {
                    [].forEach.call(mutation.removedNodes, (node) => {
                        // get all the selectors registered
                        const selectors = Object.keys(_selectors);
                        // loop on each selectors
                        selectors.forEach((sel) => {
                            if (matches(node, sel)) {
                                removeNode(node, sel, mutationId);
                            }
                        });
                        if (!node.querySelectorAll)
                            return;
                        selectors.forEach((sel) => {
                            const nestedNodes = node.querySelectorAll(sel);
                            [].forEach.call(nestedNodes, (nestedNode) => {
                                removeNode(nestedNode, sel, mutationId);
                            });
                        });
                    });
                }
                if (mutation.addedNodes && mutation.addedNodes.length) {
                    [].forEach.call(mutation.addedNodes, (node) => {
                        // get all the selectors registered
                        const selectors = Object.keys(_selectors);
                        // loop on each selectors
                        selectors.forEach((sel) => {
                            if (matches(node, sel)) {
                                pushNewNode(node, sel, mutationId);
                            }
                        });
                        if (!node.querySelectorAll)
                            return;
                        selectors.forEach((sel) => {
                            const nestedNodes = node.querySelectorAll(sel);
                            [].forEach.call(nestedNodes, (nestedNode) => {
                                pushNewNode(nestedNode, sel, mutationId);
                            });
                        });
                    });
                }
                else if (mutation.attributeName) {
                    // get all the selectors registered
                    const selectors = Object.keys(_selectors);
                    // loop on each selectors
                    selectors.forEach((sel) => {
                        if (matches(mutation.target, sel)) {
                            pushNewNode(mutation.target, sel, mutationId);
                        }
                    });
                }
            });
        });
        _observer.observe(settings.rootNode, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'id'],
        });
    }
    // first search
    [].forEach.call(settings.rootNode.querySelectorAll(selector), (node) => {
        pushNewNode(node, selector, 'init');
    });
    return new __SPromise(({ resolve, reject, emit }) => {
        _emit = emit;
    });
}
export default querySelectorLive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckxpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWVyeVNlbGVjdG9yTGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxNQUFNLE1BQU0sK0JBQStCLENBQUM7QUFDbkQsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDO0FBQ2hDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBRUgsSUFBSSxTQUFTLENBQUM7QUFDZCxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFRdEIsU0FBUyxpQkFBaUIsQ0FDdEIsUUFBZ0IsRUFDaEIsS0FBNEIsSUFBSSxFQUNoQyxXQUFnRCxFQUFFO0lBRWxELE1BQU0sRUFBRSxHQUFHLEdBQUcsUUFBUSxNQUFNLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFFdkMsSUFBSSxLQUFLLENBQUM7SUFFVixrQkFBa0I7SUFDbEIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQ3BCLEVBQUUsRUFDRjtRQUNJLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLElBQUk7S0FDakIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDdkIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHO1lBQ25CO2dCQUNJLEVBQUUsRUFBRSxFQUFFO2dCQUNOLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixFQUFFLEVBQUUsRUFBRTtnQkFDTixjQUFjLEVBQUUsSUFBSTtnQkFDcEIsUUFBUSxFQUFFLFFBQVE7YUFDckI7U0FDSixDQUFDO0tBQ0w7U0FBTTtRQUNILFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDdEIsRUFBRSxFQUFFLEVBQUU7WUFDTixRQUFRLEVBQUUsUUFBUTtZQUNsQixF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