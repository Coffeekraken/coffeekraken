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
        define(["require", "exports", "../../../shared/string/uniqid", "../../../shared/string/parseArgs", "../../dom/querySelectorLive"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var uniqid_1 = __importDefault(require("../../../shared/string/uniqid"));
    var parseArgs_1 = __importDefault(require("../../../shared/string/parseArgs"));
    var querySelectorLive_1 = __importDefault(require("../../dom/querySelectorLive"));
    /**
     * @todo        documentation
     */
    exports.default = (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hbmltYXRpb24vaW4vc2xpZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQseUVBQXFEO0lBQ3JELCtFQUEyRDtJQUMzRCxrRkFBOEQ7SUFFOUQ7O09BRUc7SUFFSCxrQkFBZSxDQUFDO1FBQ2QsMkJBQW1CLENBQUMsWUFBWSxFQUFFLFVBQUMsS0FBSztZQUN0QyxxQ0FBcUM7WUFDckMsSUFBTSxTQUFTLEdBQUcsY0FBWSxnQkFBUSxFQUFJLENBQUM7WUFDM0MsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFL0IsMkJBQTJCO1lBQzNCLElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEQsSUFBTSxJQUFJLEdBQUcsbUJBQVcsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JDLENBQUMsRUFBRSxtQkFBbUI7Z0JBQ3RCLENBQUMsRUFBRSxtQkFBbUI7Z0JBQ3RCLFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLEtBQUssRUFBRSxvQkFBb0I7Z0JBQzNCLElBQUksRUFBRSwrQkFBK0I7YUFDdEMsQ0FBQyxDQUFDO1lBRUgsNkJBQTZCO1lBQzdCLElBQU0sR0FBRyxHQUFHLHdCQUNHLFNBQVMsK0RBRUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxjQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsMkJBR25FLENBQUM7WUFDRixJQUFNLEtBQUssR0FBRyx3QkFDQyxTQUFTLHdDQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxLQUFLLGlGQUl4RCxDQUFDO1lBRUYsa0NBQWtDO1lBQ2xDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLHlCQUNaLFNBQVMscUJBQ2xCLEdBQUcsMkJBRVIsQ0FBQztZQUNGLFVBQVUsQ0FBQztnQkFDVCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSwyQkFDWixTQUFTLDBCQUNsQixLQUFLLCtCQUVWLENBQUM7WUFDSixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFUixxQkFBcUI7WUFDckIsVUFBVSxDQUFDO2dCQUNULEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXJCLFVBQVUsQ0FBQztnQkFDVCxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVMsU0FBVyxDQUFDLENBQUM7Z0JBQzVELElBQUksTUFBTTtvQkFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEQsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFTLFNBQVMsUUFBSyxDQUFDLENBQUM7Z0JBQ2pFLElBQUksUUFBUTtvQkFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxRCxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxFQUFFLENBQUMifQ==