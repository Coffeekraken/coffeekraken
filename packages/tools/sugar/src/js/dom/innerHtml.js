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
     * @namespace            js.dom
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5uZXJIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5uZXJIdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsc0VBQWtEO0lBQ2xELG1FQUErQztJQUMvQywwREFBc0M7SUFDdEMsc0VBQWtEO0lBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlDRztJQUNILFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBYTtRQUFiLHlCQUFBLEVBQUEsYUFBYTtRQUM3QyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsdUJBQXVCO1lBQ3ZCLFFBQVEsY0FDTixNQUFNLEVBQUUsU0FBUyxFQUNqQixNQUFNLEVBQUUsTUFBTSxFQUNkLE9BQU8sRUFBRSxNQUFNLEVBQ2YsY0FBYyxFQUFFLEdBQUcsRUFDbkIsZUFBZSxFQUFFLEdBQUcsRUFDcEIsY0FBYyxFQUFFLEVBQUUsRUFDbEIsZUFBZSxFQUFFLEVBQUUsRUFDbkIsWUFBWSxFQUFFLGFBQWEsRUFDM0IsYUFBYSxFQUFFLGFBQWEsSUFDekIsUUFBUSxDQUNaLENBQUM7WUFDRixRQUFRLENBQUMsY0FBYyxHQUFHLGlCQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuRSxRQUFRLENBQUMsZUFBZSxHQUFHLGlCQUFTLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVyRSxxQ0FBcUM7WUFDckMsSUFBTSxPQUFPLEdBQUcsZ0JBQVEsRUFBRSxDQUFDO1lBQzNCLElBQU0sZ0JBQWdCLEdBQUcsd0JBQXNCLE9BQVMsQ0FBQztZQUN6RCxJQUFNLGlCQUFpQixHQUFHLHlCQUF1QixPQUFTLENBQUM7WUFFM0QsZ0NBQWdDO1lBQ2hDLElBQUksWUFBWSxFQUFFLGFBQWEsRUFBRSxJ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