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
    // extend settings
    settings = Object.assign({}, {
        rootNode: document,
        once: true,
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
                attributeFilter: ['class', 'id'],
            });
        }
        // first search
        [].forEach.call(settings.rootNode.querySelectorAll(selector), (node) => {
            pushNewNode(node, selector, 'init');
        });
    });
}
export default querySelectorLive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckxpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWVyeVNlbGVjdG9yTGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxNQUFNLE1BQU0sK0JBQStCLENBQUM7QUFDbkQsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDO0FBQ2hDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBRUgsSUFBSSxTQUFTLENBQUM7QUFDZCxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFPdEIsU0FBUyxpQkFBaUIsQ0FDdEIsUUFBZ0IsRUFDaEIsS0FBNEIsSUFBSSxFQUNoQyxXQUFnRCxFQUFFO0lBRWxELE1BQU0sRUFBRSxHQUFHLEdBQUcsUUFBUSxNQUFNLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFFdkMsa0JBQWtCO0lBQ2xCLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNwQixFQUFFLEVBQ0Y7UUFDSSxRQUFRLEVBQUUsUUFBUTtRQUNsQixJQUFJLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3ZCLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRztZQUNuQjtnQkFDSSxFQUFFLEVBQUUsRUFBRTtnQkFDTixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsRUFBRSxFQUFFLEVBQUU7Z0JBQ04sY0FBYyxFQUFFLElBQUk7Z0JBQ3BCLFFBQVEsRUFBRSxRQUFRO2FBQ3JCO1NBQ0osQ0FBQztLQUNMO1NBQU07UUFDSCxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3RCLEVBQUUsRUFBRSxFQUFFO1lBQ04sUUFBUSxFQUFFLFFBQVE7WUFDbEIsRUFBRSxFQUFFLEVBQUU7WUFDTixjQUFjLEVBQUUsSUFBSTtZQUNwQixR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