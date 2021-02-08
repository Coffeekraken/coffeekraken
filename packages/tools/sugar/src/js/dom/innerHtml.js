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
        define(["require", "exports", "../string/uniqid", "../css/injectStyle", "./emptyNode", "../time/convert"], factory);
    }
})(function (require, exports) {
    "use strict";
    var uniqid_1 = __importDefault(require("../string/uniqid"));
    var injectStyle_1 = __importDefault(require("../css/injectStyle"));
    var emptyNode_1 = __importDefault(require("./emptyNode"));
    var convert_1 = __importDefault(require("../time/convert"));
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
    return innerHtml;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5uZXJIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5uZXJIdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZCw0REFBd0M7SUFDeEMsbUVBQStDO0lBQy9DLDBEQUFzQztJQUN0Qyw0REFBd0M7SUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUNHO0lBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQzdDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyx1QkFBdUI7WUFDdkIsUUFBUSxjQUNOLE1BQU0sRUFBRSxTQUFTLEVBQ2pCLE1BQU0sRUFBRSxNQUFNLEVBQ2QsT0FBTyxFQUFFLE1BQU0sRUFDZixjQUFjLEVBQUUsR0FBRyxFQUNuQixlQUFlLEVBQUUsR0FBRyxFQUNwQixjQUFjLEVBQUUsRUFBRSxFQUNsQixlQUFlLEVBQUUsRUFBRSxFQUNuQixZQUFZLEVBQUUsYUFBYSxFQUMzQixhQUFhLEVBQUUsYUFBYSxJQUN6QixRQUFRLENBQ1osQ0FBQztZQUNGLFFBQVEsQ0FBQyxjQUFjLEdBQUcsaUJBQVMsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ25FLFFBQVEsQ0FBQyxlQUFlLEdBQUcsaUJBQVMsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRXJFLHFDQUFxQztZQUNyQyxJQUFNLE9BQU8sR0FBRyxnQkFBUSxFQUFFLENBQUM7WUFDM0IsSUFBTSxnQkFBZ0IsR0FBRyx3QkFBc0IsT0FBUyxDQUFDO1lBQ3pELElBQU0saUJBQWlCLEdBQUcseUJBQXVCLE9BQVMsQ0FBQztZQUUzRCxnQ0FBZ0M7WUFDaEMsSUFBSSxZQUFZLEVBQUUsYUFBYSxFQUFFLElB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