// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../shared/string/uniqid", "./matches"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const uniqid_1 = __importDefault(require("../../shared/string/uniqid"));
    const matches_1 = __importDefault(require("./matches"));
    /**
     * @name      querySelectorLive
     * @namespace            js.dom
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
        const id = `${selector} - ${uniqid_1.default()}`;
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
                                if (matches_1.default(node, sel)) {
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
    exports.default = querySelectorLive;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckxpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWVyeVNlbGVjdG9yTGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3RUFBZ0Q7SUFDaEQsd0RBQWdDO0lBRWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNEJHO0lBRUgsSUFBSSxTQUFTLENBQUM7SUFDZCxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFFdEIsU0FBUyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ3BELE1BQU0sRUFBRSxHQUFHLEdBQUcsUUFBUSxNQUFNLGdCQUFNLEVBQUUsRUFBRSxDQUFDO1FBRXZDLGtCQUFrQjtRQUNsQixRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDdEIsRUFBRSxFQUNGO1lBQ0UsUUFBUSxFQUFFLFFBQVE7WUFDbEIsSUFBSSxFQUFFLElBQUk7U0FDWCxFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN6QixVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUc7Z0JBQ3JCO29CQUNFLEVBQUUsRUFBRSxFQUFFO29CQUNOLFFBQVEsRUFBRSxRQUFRO29CQUNsQixFQUFFLEVBQUUsRUFBRTtvQkFDTixRQUFRLEVBQUUsUUFBUTtpQkFDbkI7YUFDRixDQUFDO1NBQ0g7YUFBTTtZQUNMLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hCLEVBQUUsRUFBRSxFQUFFO2dCQUNOLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixFQUFFLEVBQUUsRUFBRTtnQkFDTixRQUFRLEVBQUUsUUFBUTthQUNuQixDQUFDLENBQUM7U0FDSjtRQUVELFNBQVMsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHO1lBQzVCLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxH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