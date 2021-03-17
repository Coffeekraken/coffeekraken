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
    var uniqid_1 = __importDefault(require("../../shared/string/uniqid"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckxpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9kb20vcXVlcnlTZWxlY3RvckxpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsc0VBQWdEO0lBQ2hELHNEQUFnQztJQUVoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTRCRztJQUVILElBQUksU0FBUyxDQUFDO0lBQ2QsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBRXRCLFNBQVMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQ3BELElBQU0sRUFBRSxHQUFNLFFBQVEsV0FBTSxnQkFBTSxFQUFJLENBQUM7UUFFdkMsa0JBQWtCO1FBQ2xCLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUN0QixFQUFFLEVBQ0Y7WUFDRSxRQUFRLEVBQUUsUUFBUTtZQUNsQixJQUFJLEVBQUUsSUFBSTtTQUNYLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pCLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRztnQkFDckI7b0JBQ0UsRUFBRSxFQUFFLEVBQUU7b0JBQ04sUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLEVBQUUsRUFBRSxFQUFFO29CQUNOLFFBQVEsRUFBRSxRQUFRO2lCQUNuQjthQUNGLENBQUM7U0FDSDthQUFNO1lBQ0wsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDeEIsRUFBRSxFQUFFLEVBQUU7Z0JBQ04sUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLEVBQUUsRUFBRSxFQUFFO2dCQUNOLFFBQVEsRUFBRSxRQUFRO2FBQ25CLENBQUMsQ0FBQztTQUNKO1FBRUQsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUc7WUFDNUIsSUFBTSxJQUFJLEdB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