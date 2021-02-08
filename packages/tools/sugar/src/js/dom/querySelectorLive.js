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
    return querySelectorLive;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckxpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWVyeVNlbGVjdG9yTGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztJQUVkLDBEQUFvQztJQUNwQyxzREFBZ0M7SUFFaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E0Qkc7SUFFSCxJQUFJLFNBQVMsQ0FBQztJQUNkLElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUV0QixTQUFTLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBYTtRQUFiLHlCQUFBLEVBQUEsYUFBYTtRQUNwRCxJQUFNLEVBQUUsR0FBTSxRQUFRLFdBQU0sZ0JBQU0sRUFBSSxDQUFDO1FBRXZDLGtCQUFrQjtRQUNsQixRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDdEIsRUFBRSxFQUNGO1lBQ0UsUUFBUSxFQUFFLFFBQVE7WUFDbEIsSUFBSSxFQUFFLElBQUk7U0FDWCxFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN6QixVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUc7Z0JBQ3JCO29CQUNFLEVBQUUsRUFBRSxFQUFFO29CQUNOLFFBQVEsRUFBRSxRQUFRO29CQUNsQixFQUFFLEVBQUUsRUFBRTtvQkFDTixRQUFRLEVBQUUsUUFBUTtpQkFDbkI7YUFDRixDQUFDO1NBQ0g7YUFBTTtZQUNMLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hCLEVBQUUsRUFBRSxFQUFFO2dCQUNOLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixFQUFFLEVBQUUsRUFBRTtnQkFDTixRQUFRLEVBQUUsUUFBUTthQUNuQixDQUFDLENBQUM7U0FDSjtRQUVELFNBQVMsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHO1lBQzVCLElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxH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