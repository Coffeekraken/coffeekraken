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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckxpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvZG9tL3F1ZXJ5U2VsZWN0b3JMaXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdFQUFnRDtJQUNoRCx3REFBZ0M7SUFFaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E0Qkc7SUFFSCxJQUFJLFNBQVMsQ0FBQztJQUNkLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUV0QixTQUFTLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDcEQsTUFBTSxFQUFFLEdBQUcsR0FBRyxRQUFRLE1BQU0sZ0JBQU0sRUFBRSxFQUFFLENBQUM7UUFFdkMsa0JBQWtCO1FBQ2xCLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUN0QixFQUFFLEVBQ0Y7WUFDRSxRQUFRLEVBQUUsUUFBUTtZQUNsQixJQUFJLEVBQUUsSUFBSTtTQUNYLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pCLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRztnQkFDckI7b0JBQ0UsRUFBRSxFQUFFLEVBQUU7b0JBQ04sUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLEVBQUUsRUFBRSxFQUFFO29CQUNOLFFBQVEsRUFBRSxRQUFRO2lCQUNuQjthQUNGLENBQUM7U0FDSDthQUFNO1lBQ0wsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDeEIsRUFBRSxFQUFFLEVBQUU7Z0JBQ04sUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLEVBQUUsRUFBRSxFQUFFO2dCQUNOLFFBQVEsRUFBRSxRQUFRO2FBQ25CLENBQUMsQ0FBQztTQUNKO1FBRUQs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