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
        define(["require", "exports", "../util/uniqid", "./matches"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var uniqid_1 = __importDefault(require("../util/uniqid"));
    var matches_1 = __importDefault(require("./matches"));
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
    var _observer;
    var _selectors = {};
    function querySelectorLive(selector, cb, settings) {
        if (settings === void 0) { settings = {}; }
        var id = selector + " - " + uniqid_1.default();
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
            var objs = _selectors[sel];
            if (!objs)
                return;
            objs.forEach(function (obj) {
                if (obj.settings.once) {
                    if (!node._querySelectorLive) {
                        node._querySelectorLive = {};
                    }
                    if (node._querySelectorLive[obj.id])
                        return;
                    node._querySelectorLive[obj.id] = true;
                }
                obj.cb &&
                    obj.cb(node, function () {
                        delete _selectors[obj.selector];
                    });
            });
        }
        // listen for updates in document
        if (!_observer) {
            _observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.addedNodes) {
                        [].forEach.call(mutation.addedNodes, function (node) {
                            // get all the selectors registered
                            var selectors = Object.keys(_selectors);
                            // loop on each selectors
                            selectors.forEach(function (sel) {
                                if (matches_1.default(node, sel)) {
                                    pushNewNode(node, sel);
                                }
                            });
                            if (!node.querySelectorAll)
                                return;
                            selectors.forEach(function (sel) {
                                var nestedNodes = node.querySelectorAll(sel);
                                [].forEach.call(nestedNodes, function (nestedNode) {
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
        [].forEach.call(settings.rootNode.querySelectorAll(selector), function (node) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckxpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWVyeVNlbGVjdG9yTGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCwwREFBb0M7SUFDcEMsc0RBQWdDO0lBRWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNEJHO0lBRUgsSUFBSSxTQUFTLENBQUM7SUFDZCxJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFFdEIsU0FBUyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDcEQsSUFBTSxFQUFFLEdBQU0sUUFBUSxXQUFNLGdCQUFNLEVBQUksQ0FBQztRQUV2QyxrQkFBa0I7UUFDbEIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQ3RCLEVBQUUsRUFDRjtZQUNFLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLElBQUksRUFBRSxJQUFJO1NBQ1gsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDekIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHO2dCQUNyQjtvQkFDRSxFQUFFLEVBQUUsRUFBRTtvQkFDTixRQUFRLEVBQUUsUUFBUTtvQkFDbEIsRUFBRSxFQUFFLEVBQUU7b0JBQ04sUUFBUSxFQUFFLFFBQVE7aUJBQ25CO2FBQ0YsQ0FBQztTQUNIO2FBQU07WUFDTCxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUN4QixFQUFFLEVBQUUsRUFBRTtnQkFDTixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsRUFBRSxFQUFFLEVBQUU7Z0JBQ04sUUFBUSxFQUFFLFFBQVE7YUFDbkIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsR0FBRztZQUM1QixJQUFNLElBQUksR0FBRyxVQUFVLENBQUMs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