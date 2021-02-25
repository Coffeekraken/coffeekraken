// @ts-nocheck
import uniqid from '../util/uniqid';
import matches from './matches';
/**
 * @name      querySelectorLive
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Observe the dom to get all the elements that matches a passed css selector at any point in time.
 * Be warned that this use the mutation observer API and will monitor all the document for new nodes. Make sure to use it
 * when you don't have the chance to use the custom elements API instead
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
function querySelectorLive(selector, cb, settings = {}) {
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
}
/**
 * @name 	settings.rootNode
 * The root node used to detect newly added nodes within
 * @prop
 * @type 		{HTMLElement}
 * @default 	document
 */
/**
 * @name 	settings.once
 * Specify if want to detect the node only once. Mean that if the node is removed from the dom and added again, it will not be detected again.
 * @prop
 * @type 		{Boolean}
 * @default 	true
 */
export default querySelectorLive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckxpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWVyeVNlbGVjdG9yTGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxNQUFNLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEMsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDO0FBRWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBRUgsSUFBSSxTQUFTLENBQUM7QUFDZCxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFFdEIsU0FBUyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3BELE1BQU0sRUFBRSxHQUFHLEdBQUcsUUFBUSxNQUFNLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFFdkMsa0JBQWtCO0lBQ2xCLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUN0QixFQUFFLEVBQ0Y7UUFDRSxRQUFRLEVBQUUsUUFBUTtRQUNsQixJQUFJLEVBQUUsSUFBSTtLQUNYLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3pCLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRztZQUNyQjtnQkFDRSxFQUFFLEVBQUUsRUFBRTtnQkFDTixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsRUFBRSxFQUFFLEVBQUU7Z0JBQ04sUUFBUSxFQUFFLFFBQVE7YUFDbkI7U0FDRixDQUFDO0tBQ0g7U0FBTTtRQUNMLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDeEIsRUFBRSxFQUFFLEVBQUU7WUFDTixRQUFRLEVBQUUsUUFBUTtZQUNsQixFQUFFLEVBQUUsRUFBRTtZQUNOLFFBQVEsRUFBRSxRQUFRO1NBQ25CLENBQUMsQ0FBQztLQUNKO0lBRUQsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUc7UUFDNUIsTUFBTSxJQUFJ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