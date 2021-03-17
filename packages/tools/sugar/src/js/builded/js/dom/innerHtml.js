// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../shared/string/uniqid", "../css/injectStyle", "./emptyNode", "../../shared/time/convert"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var uniqid_1 = __importDefault(require("../../shared/string/uniqid"));
    var injectStyle_1 = __importDefault(require("../css/injectStyle"));
    var emptyNode_1 = __importDefault(require("./emptyNode"));
    var convert_1 = __importDefault(require("../../shared/time/convert"));
    /**
     * @name            innerHtml
     * @namespace           sugar.js.dom
     * @type            Function
     * @stable
     *
     * Change the content of a Node with the possibility to animate the change using one of these animations:
     * - fade
     * - fadeUp
     * - fadeDown
     * - fadeLeft
     * - fadeRight
     * You can also choose between 3 actions which are: replace, append and prepend
     *
     * @param           {HTMLElement}            node           The node to change to content of
     * @param           {String}                 content        The new content of the node
     * @param           {Object}                 [settings={}]  The settings to change the content like 'animIn', 'animOut', and more...
     * @return          {Promise}                               A promise resolved when the change has been made
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import innerHtml from '@coffeekraken/sugar/js/dom/innerHtml'
     * innerHtml(myCoolNode, 'Hello World', {
     *    action: 'replace', // replace, append, prepend
     *    animIn: 'fade', // fade, fadeUp, fadeDown, fadeLeft, fadeRight
     *    animOut: 'fadeUp', // fade, fadeUp, fadeDown, fadeLeft, fadeRight
     *    animInDuration: 600, // in ms if number, otherwise a string like '1s', '1m', etc...
     *    animOutDuration: 300, // in ms if number, otherwise a string like '1s', '1m', etc...
     *    animInDistance: 25, // in px
     *    animOutDistance: 25, // in px
     *    animInEasing: 'ease-in-out',
     *    animOutEasing: 'ease-in-out'
     * }).then(() => {
     *    // do something when the change has been made...
     * });
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function innerHtml(node, content, settings) {
        if (settings === void 0) { settings = {}; }
        return new Promise(function (resolve, reject) {
            // process the settings
            settings = __assign({ action: 'replace', animIn: 'fade', animOut: 'fade', animInDuration: 300, animOutDuration: 150, animInDistance: 25, animOutDistance: 25, animInEasing: 'ease-in-out', animOutEasing: 'ease-in-out' }, settings);
            settings.animInDuration = convert_1.default(settings.animInDuration, 'ms');
            settings.animOutDuration = convert_1.default(settings.animOutDuration, 'ms');
            // generate a uniqid for this process
            var _uniqid = uniqid_1.default();
            var _animInClassName = "s-innerHtml-animIn-" + _uniqid;
            var _animOutClassName = "s-innerHtml-animOut-" + _uniqid;
            // some html elements references
            var $styleAnimIn, $styleAnimOut, $div;
            // generate the animation styles
            switch (settings.animIn) {
                case 'fade':
                    var sheetAnimIn = "\n          @keyframes animIn-" + _uniqid + " {\n            from {\n              opacity: 0;\n            }\n            to {\n              opacity: 1;\n            }\n          }\n          ." + _animInClassName + " {\n              animation: animIn-" + _uniqid + " " + settings.animInDuration + "ms " + settings.animInEasing + ";\n          }\n        ";
                    $styleAnimIn = injectStyle_1.default(sheetAnimIn);
                    break;
                case 'fadeDown':
                    var sheetAnimInFadeUp = "\n          @keyframes animIn-" + _uniqid + " {\n            from {\n              opacity: 0;\n              transform: translateY(-" + settings.animInDistance + "px);\n            }\n            to {\n              opacity: 1;\n              transform: translateY(0);\n            }\n          }\n          ." + _animInClassName + " {\n              animation: animIn-" + _uniqid + " " + settings.animInDuration + "ms " + settings.animInEasing + ";\n          }\n        ";
                    $styleAnimIn = injectStyle_1.default(sheetAnimInFadeUp);
                    break;
                case 'fadeUp':
                    var sheetAnimInFadeDown = "\n          @keyframes animIn-" + _uniqid + " {\n            from {\n              opacity: 0;\n              transform: translateY(" + settings.animInDistance + "px);\n            }\n            to {\n              opacity: 1;\n              transform: translateY(0);\n            }\n          }\n          ." + _animInClassName + " {\n              animation: animIn-" + _uniqid + " " + settings.animInDuration + "ms " + settings.animInEasing + ";\n          }\n        ";
                    $styleAnimIn = injectStyle_1.default(sheetAnimInFadeDown);
                    break;
                case 'fadeRight':
                    var sheetAnimInFadeLeft = "\n          @keyframes animIn-" + _uniqid + " {\n            from {\n              opacity: 0;\n              transform: translateX(-" + settings.animInDistance + "px);\n            }\n            to {\n              opacity: 1;\n              transform: translateX(0);\n            }\n          }\n          ." + _animInClassName + " {\n              animation: animIn-" + _uniqid + " " + settings.animInDuration + "ms " + settings.animInEasing + ";\n          }\n        ";
                    $styleAnimIn = injectStyle_1.default(sheetAnimInFadeLeft);
                    break;
                case 'fadeLeft':
                    var sheetAnimInFadeRight = "\n          @keyframes animIn-" + _uniqid + " {\n            from {\n              opacity: 0;\n              transform: translateX(" + settings.animInDistance + "px);\n            }\n            to {\n              opacity: 1;\n              transform: translateX(0);\n            }\n          }\n          ." + _animInClassName + " {\n              animation: animIn-" + _uniqid + " " + settings.animInDuration + "ms " + settings.animInEasing + ";\n          }\n        ";
                    $styleAnimIn = injectStyle_1.default(sheetAnimInFadeRight);
                    break;
            }
            switch (settings.animOut) {
                case 'fade':
                    var sheetAnimOutFade = "\n          @keyframes animOut-" + _uniqid + " {\n            0% {\n              opacity: 1;\n            }\n            100% {\n              opacity: 0;\n            }\n          }\n          ." + _animOutClassName + " {\n            animation: animOut-" + _uniqid + " " + settings.animOutDuration + "ms " + settings.animOutEasing + ";\n          }\n        ";
                    $styleAnimOut = injectStyle_1.default(sheetAnimOutFade);
                    break;
                case 'fadeUp':
                    var sheetAnimOutFadeUp = "\n          @keyframes animOut-" + _uniqid + " {\n            from {\n              opacity: 1;\n              transform: translateY(0);\n            }\n            to {\n              opacity: 0;\n              transform: translateY(-" + settings.animOutDistance + "px);\n            }\n          }\n          ." + _animOutClassName + " {\n              animation: animOut-" + _uniqid + " " + settings.animOutDuration + "ms " + settings.animOutEasing + ";\n          }\n        ";
                    $styleAnimOut = injectStyle_1.default(sheetAnimOutFadeUp);
                    break;
                case 'fadeDown':
                    var sheetAnimOutFadeDown = "\n          @keyframes animOut-" + _uniqid + " {\n            from {\n              opacity: 1;\n              transform: translateY(0);\n            }\n            to {\n              opacity: 0;\n              transform: translateY(" + settings.animOutDistance + "px);\n            }\n          }\n          ." + _animOutClassName + " {\n              animation: animOut-" + _uniqid + " " + settings.animOutDuration + "ms " + settings.animOutEasing + ";\n          }\n        ";
                    $styleAnimOut = injectStyle_1.default(sheetAnimOutFadeDown);
                    break;
                case 'fadeLeft':
                    var sheetAnimOutFadeLeft = "\n          @keyframes animOut-" + _uniqid + " {\n            from {\n              opacity: 1;\n              transform: translateX(0);\n            }\n            to {\n              opacity: 0;\n              transform: translateX(-" + settings.animOutDistance + "px);\n            }\n          }\n          ." + _animOutClassName + " {\n              animation: animOut-" + _uniqid + " " + settings.animOutDuration + "ms " + settings.animOutEasing + ";\n          }\n        ";
                    $styleAnimOut = injectStyle_1.default(sheetAnimOutFadeLeft);
                    break;
                case 'fadeRight':
                    var sheetAnimOutFadeRight = "\n          @keyframes animOut-" + _uniqid + " {\n            from {\n              opacity: 1;\n              transform: translateX(0);\n            }\n            to {\n              opacity: 0;\n              transform: translateX(" + settings.animOutDistance + "px);\n            }\n          }\n          ." + _animOutClassName + " {\n              animation: animOut-" + _uniqid + " " + settings.animOutDuration + "ms " + settings.animOutEasing + ";\n          }\n        ";
                    $styleAnimOut = injectStyle_1.default(sheetAnimOutFadeRight);
                    break;
            }
            // switch on the action to execute
            switch (settings.action) {
                case 'replace':
                    // anim out the content by adding the corresponding class
                    node.classList.add(_animOutClassName);
                    // waiting the animation out to be finished
                    setTimeout(function () {
                        // removing the animation out class
                        node.classList.remove(_animOutClassName);
                        // change the content
                        if (typeof content === 'string') {
                            node.innerHTML = content;
                        }
                        else {
                            emptyNode_1.default(node).append(content);
                        }
                        // anim in the content by adding the corresponding class
                        node.classList.add(_animInClassName);
                        // wait until the animation is finished to resolve the promise
                        setTimeout(function () {
                            resolve();
                            // removing the classes
                            node.classList.remove(_animInClassName);
                            // removing the styles elements
                            $styleAnimIn.parentNode.removeChild($styleAnimIn);
                            $styleAnimOut.parentNode.removeChild($styleAnimOut);
                        }, settings.animInDuration);
                    }, settings.animOutDuration);
                    break;
                case 'append':
                    // append the new content inside a simple div to animate it
                    $div = document.createElement('div');
                    $div.classList.add(_animInClassName);
                    if (typeof content === 'string') {
                        $div.innerHTML = content;
                    }
                    else {
                        $div.append(content);
                    }
                    // append the content
                    node.appendChild($div);
                    // wait until the animation is finished to resolve the promise
                    setTimeout(function () {
                        resolve();
                        // removing the classes
                        $div.classList.remove(_animInClassName);
                        // removing the styles elements
                        $styleAnimIn.parentNode.removeChild($styleAnimIn);
                        $styleAnimOut.parentNode.removeChild($styleAnimOut);
                    }, settings.animInDuration);
                    break;
                case 'prepend':
                    // append the new content inside a simple div to animate it
                    $div = document.createElement('div');
                    $div.classList.add(_animInClassName);
                    if (typeof content === 'string') {
                        $div.innerHTML = content;
                    }
                    else {
                        $div.append(content);
                    }
                    // append the content
                    node.insertBefore($div, node.firstChild);
                    // wait until the animation is finished to resolve the promise
                    setTimeout(function () {
                        resolve();
                        // removing the classes
                        $div.classList.remove(_animInClassName);
                        // removing the styles elements
                        $styleAnimIn.parentNode.removeChild($styleAnimIn);
                        $styleAnimOut.parentNode.removeChild($styleAnimOut);
                    }, settings.animInDuration);
                    break;
            }
        });
    }
    exports.default = innerHtml;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5uZXJIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZG9tL2lubmVySHRtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHNFQUFrRDtJQUNsRCxtRUFBK0M7SUFDL0MsMERBQXNDO0lBQ3RDLHNFQUFrRDtJQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Q0c7SUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDN0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLHVCQUF1QjtZQUN2QixRQUFRLGNBQ04sTUFBTSxFQUFFLFNBQVMsRUFDakIsTUFBTSxFQUFFLE1BQU0sRUFDZCxPQUFPLEVBQUUsTUFBTSxFQUNmLGNBQWMsRUFBRSxHQUFHLEVBQ25CLGVBQWUsRUFBRSxHQUFHLEVBQ3BCLGNBQWMsRUFBRSxFQUFFLEVBQ2xCLGVBQWUsRUFBRSxFQUFFLEVBQ25CLFlBQVksRUFBRSxhQUFhLEVBQzNCLGFBQWEsRUFBRSxhQUFhLElBQ3pCLFFBQVEsQ0FDWixDQUFDO1lBQ0YsUUFBUSxDQUFDLGNBQWMsR0FBRyxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbkUsUUFBUSxDQUFDLGVBQWUsR0FBRyxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFckUscUNBQXFDO1lBQ3JDLElBQU0sT0FBTyxHQUFHLGdCQUFRLEVBQUUsQ0FBQztZQUMzQixJQUFNLGdCQUFnQixHQUFHLHdCQUFzQixPQUFTLENBQUM7WUFDekQsSUFBTSxpQkFBaUIsR0FBRyx5QkFBdUIsT0FBUyxDQUFDO1lBRTNELGdDQUFnQztZQUNoQyxJQUFJLFlBQVksRUFB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