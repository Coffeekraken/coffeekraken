// @ts-nocheck
import uniqid from '../../../shared/string/uniqid';
import matches from './matches';
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name      querySelectorLive
 * @namespace            js.dom.query
 * @type      Function
 * @platform        js
 * @status        beta
 *
 * Observe the dom to get all the elements that matches a passed css selector at any point in time.
 * Be warned that this use the mutation observer API and will monitor all the document for new nodes. Make sure to use it
 * when you don't have the chance to use the custom elements API instead
 *
 * @feature         Specify what you want to select and get notified each time a node like this appears in the dom
 * @feature         Promise based API
 * @feature         Callback support
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
                settings: settings
            }
        ];
    }
    else {
        _selectors[selector].push({
            id: id,
            selector: selector,
            cb: cb,
            settings: settings
        });
    }
    return new __SPromise(({ resolve, reject, emit }) => {
        function pushNewNode(node, sel) {
            const objs = _selectors[sel];
            if (!objs)
                return;
            objs.forEach((obj) => {
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
                mutations.forEach((mutation) => {
                    if (mutation.addedNodes) {
                        [].forEach.call(mutation.addedNodes, (node) => {
                            // get all the selectors registered
                            const selectors = Object.keys(_selectors);
                            // loop on each selectors
                            selectors.forEach((sel) => {
                                if (matches(node, sel)) {
                                    pushNewNode(node, sel);
                                }
                            });
                            if (!node.querySelectorAll)
                                return;
                            selectors.forEach((sel) => {
                                const nestedNodes = node.querySelectorAll(sel);
                                [].forEach.call(nestedNodes, (nestedNode) => {
                                    pushNewNode(nestedNode, sel);
                                });
                            });
                        });
                    }
                });
            });
            _observer.observe(settings.rootNode, {
                childList: true,
                subtree: true
            });
        }
        // first search
        [].forEach.call(settings.rootNode.querySelectorAll(selector), (node) => {
            pushNewNode(node, selector);
        });
    });
}
export default querySelectorLive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckxpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWVyeVNlbGVjdG9yTGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxNQUFNLE1BQU0sK0JBQStCLENBQUM7QUFDbkQsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDO0FBQ2hDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFFSCxJQUFJLFNBQVMsQ0FBQztBQUNkLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQU90QixTQUFTLGlCQUFpQixDQUFDLFFBQWdCLEVBQUUsS0FBNEIsSUFBSSxFQUFFLFdBQWdELEVBQUU7SUFDL0gsTUFBTSxFQUFFLEdBQUcsR0FBRyxRQUFRLE1BQU0sTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUV2QyxrQkFBa0I7SUFDbEIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQ3RCLEVBQUUsRUFDRjtRQUNFLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLElBQUksRUFBRSxJQUFJO0tBQ1gsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDekIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHO1lBQ3JCO2dCQUNFLEVBQUUsRUFBRSxFQUFFO2dCQUNOLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixFQUFFLEVBQUUsRUFBRTtnQkFDTixRQUFRLEVBQUUsUUFBUTthQUNuQjtTQUNGLENBQUM7S0FDSDtTQUFNO1FBQ0wsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN4QixFQUFFLEVBQUUsRUFBRTtZQUNOLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLEVBQUUsRUFBRSxFQUFFO1lBQ04sUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxPQUFP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