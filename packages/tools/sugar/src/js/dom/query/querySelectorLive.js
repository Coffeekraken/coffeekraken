// @ts-nocheck
import uniqid from '../../../shared/string/uniqid';
import matches from './matches';
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name      querySelectorLive
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @platform          ts
 * @status        beta
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
 * @param	{String} 		selector 		The css selector that we are interested in
 * @param 	{Function} 		cb 				The function to call with the newly added node
 * @param 	{Object} 		[settings={}] 	An optional settings object to specify things like the rootNode to monitor, etc...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import querySelectorLive from '@coffeekraken/sugar/js/dom/querySelectorLive'
 * querySelectorLive('.my-cool-item', (node, clearFn) => {
 * 	// do something here with the detected node
 *  // call clearFn if you want to stop listening for this selector
 *  clearFn();
 * });
 *
 * @since       1.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let _observer;
const _selectors = {};
function querySelectorLive(selector, cb = null, settings = {}) {
    const id = `${selector} - ${uniqid()}`;
    // extend settings
    settings = Object.assign({}, {
        rootNode: document,
        once: true
    }, settings);
    if (!_selectors[selector]) {
        _selectors[selector] = [
            {
                id: id,
                selector: selector,
                cb: cb,
                lastMutationId: null,
                settings: settings
            }
        ];
    }
    else {
        _selectors[selector].push({
            id: id,
            selector: selector,
            cb: cb,
            lastMutationId: null,
            settings: settings
        });
    }
    return new __SPromise(({ resolve, reject, emit }) => {
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
                emit('node', node);
                obj.cb &&
                    obj.cb(node, () => {
                        delete _selectors[obj.selector];
                    });
            });
        }
        // listen for updates in document
        if (!_observer) {
            _observer = new MutationObserver((mutations) => {
                const mutationId = `mutation-${uniqid()}`;
                mutations.forEach((mutation) => {
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
                attributeFilter: ['class', 'id']
            });
        }
        // first search
        [].forEach.call(settings.rootNode.querySelectorAll(selector), (node) => {
            pushNewNode(node, selector, 'init');
        });
    });
}
export default querySelectorLive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckxpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWVyeVNlbGVjdG9yTGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxNQUFNLE1BQU0sK0JBQStCLENBQUM7QUFDbkQsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDO0FBQ2hDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUVILElBQUksU0FBUyxDQUFDO0FBQ2QsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBT3RCLFNBQVMsaUJBQWlCLENBQUMsUUFBZ0IsRUFBRSxLQUE0QixJQUFJLEVBQUUsV0FBZ0QsRUFBRTtJQUMvSCxNQUFNLEVBQUUsR0FBRyxHQUFHLFFBQVEsTUFBTSxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBRXZDLGtCQUFrQjtJQUNsQixRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDdEIsRUFBRSxFQUNGO1FBQ0UsUUFBUSxFQUFFLFFBQVE7UUFDbEIsSUFBSSxFQUFFLElBQUk7S0FDWCxFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN6QixVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUc7WUFDckI7Z0JBQ0UsRUFBRSxFQUFFLEVBQUU7Z0JBQ04sUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLEVBQUUsRUFBRSxFQUFFO2dCQUNOLGNBQWMsRUFBRSxJQUFJO2dCQUNwQixRQUFRLEVBQUUsUUFBUTthQUNuQjtTQUNGLENBQUM7S0FDSDtTQUFNO1FBQ0wsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN4QixFQUFFLEVBQUUsRUFBRTtZQUNOLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLEVBQUUsRUFBRSxFQUFFO1lBQ04sY0FBYyxFQUFFLElBQUk7WUFDcEIs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