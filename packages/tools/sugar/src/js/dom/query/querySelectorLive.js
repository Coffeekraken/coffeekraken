// @ts-nocheck
import uniqid from '../../shared/string/uniqid';
import matches from './query/matches';
/**
 * @name      querySelectorLive
 * @namespace            js.dom.query
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckxpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWVyeVNlbGVjdG9yTGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxNQUFNLE1BQU0sNEJBQTRCLENBQUM7QUFDaEQsT0FBTyxPQUFPLE1BQU0saUJBQWlCLENBQUM7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFFSCxJQUFJLFNBQVMsQ0FBQztBQUNkLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUV0QixTQUFTLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDcEQsTUFBTSxFQUFFLEdBQUcsR0FBRyxRQUFRLE1BQU0sTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUV2QyxrQkFBa0I7SUFDbEIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQ3RCLEVBQUUsRUFDRjtRQUNFLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLElBQUksRUFBRSxJQUFJO0tBQ1gsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDekIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHO1lBQ3JCO2dCQUNFLEVBQUUsRUFBRSxFQUFFO2dCQUNOLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixFQUFFLEVBQUUsRUFBRTtnQkFDTixRQUFRLEVBQUUsUUFBUTthQUNuQjtTQUNGLENBQUM7S0FDSDtTQUFNO1FBQ0wsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN4QixFQUFFLEVBQUUsRUFBRTtZQUNOLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLEVBQUUsRUFBRSxFQUFFO1lBQ04sUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsR0FBRztRQUM1QixNQUFNLElB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