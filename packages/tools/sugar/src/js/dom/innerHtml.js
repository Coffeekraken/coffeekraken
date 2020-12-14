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
//# sourceMappingURL=module.js.map