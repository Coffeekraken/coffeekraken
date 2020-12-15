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
        define(["require", "exports", "../../string/uniqid", "../../string/parseArgs", "../../dom/querySelectorLive"], factory);
    }
})(function (require, exports) {
    "use strict";
    var uniqid_1 = __importDefault(require("../../string/uniqid"));
    var parseArgs_1 = __importDefault(require("../../string/parseArgs"));
    var querySelectorLive_1 = __importDefault(require("../../dom/querySelectorLive"));
    return (function () {
        querySelectorLive_1.default('[slide-in]', function ($item) {
            // generate a unique id for this node
            var uniqClass = "slide-in-" + uniqid_1.default();
            $item.classList.add(uniqClass);
            // parse the slide-in value
            var slideInValue = $item.getAttribute('slide-in');
            var args = parseArgs_1.default(slideInValue, {
                x: 'Number -x --x "0"',
                y: 'Number -y --y "0"',
                duration: 'Number -d --duration "500"',
                delay: 'Number --delay "0"',
                when: 'String -w --when "inViewport"'
            });
            // generate the animation css
            var css = "\n      [slide-in]." + uniqClass + " {\n        opacity: 0;\n        transform: translate(" + (args.x.value || 0) + "px, " + (args.y.value || 0) + "px);\n\n      }\n    ";
            var cssIn = "\n      [slide-in]." + uniqClass + ".in {\n        transition: all " + (args.duration.value / 1000 || '0.5') + "s;\n        opacity: 1;\n        transform: translate(0, 0);\n      }\n    ";
            // append the css into the section
            document.head.innerHTML += "\n      <style id=\"" + uniqClass + "\">\n        " + css + "\n      </style>\n    ";
            setTimeout(function () {
                document.head.innerHTML += "\n        <style id=\"" + uniqClass + "-in\">\n          " + cssIn + "\n        </style>\n      ";
            }, 100);
            // add the "in" class
            setTimeout(function () {
                $item.classList.add('in');
            }, args.delay.value);
            setTimeout(function () {
                var $style = document.querySelector("style#" + uniqClass);
                if ($style)
                    $style.parentNode.removeChild($style);
                var $styleIn = document.querySelector("style#" + uniqClass + "-in");
                if ($styleIn)
                    $styleIn.parentNode.removeChild($styleIn);
            }, args.delay.value + args.duration.value);
        });
    })();
});
//# sourceMappingURL=slide.js.map