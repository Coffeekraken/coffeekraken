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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbGlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztJQUVkLCtEQUEyQztJQUMzQyxxRUFBaUQ7SUFDakQsa0ZBQThEO0lBTTlELE9BQVMsQ0FBQztRQUNSLDJCQUFtQixDQUFDLFlBQVksRUFBRSxVQUFDLEtBQUs7WUFDdEMscUNBQXFDO1lBQ3JDLElBQU0sU0FBUyxHQUFHLGNBQVksZ0JBQVEsRUFBSSxDQUFDO1lBQzNDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRS9CLDJCQUEyQjtZQUMzQixJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BELElBQU0sSUFBSSxHQUFHLG1CQUFXLENBQUMsWUFBWSxFQUFFO2dCQUNyQyxDQUFDLEVBQUUsbUJBQW1CO2dCQUN0QixDQUFDLEVBQUUsbUJBQW1CO2dCQUN0QixRQUFRLEVBQUUsNEJBQTRCO2dCQUN0QyxLQUFLLEVBQUUsb0JBQW9CO2dCQUMzQixJQUFJLEVBQUUsK0JBQStCO2FBQ3RDLENBQUMsQ0FBQztZQUVILDZCQUE2QjtZQUM3QixJQUFNLEdBQUcsR0FBRyx3QkFDRyxTQUFTLCtEQUVHLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsY0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLDJCQUduRSxDQUFDO1lBQ0YsSUFBTSxLQUFLLEdBQUcsd0JBQ0MsU0FBUyx3Q0FDRixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksS0FBSyxpRkFJeEQsQ0FBQztZQUVGLGtDQUFrQztZQUNsQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSx5QkFDWixTQUFTLHFCQUNsQixHQUFHLDJCQUVSLENBQUM7WUFDRixVQUFVLENBQUM7Z0JBQ1QsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksMkJBQ1osU0FBUywwQkFDbEIsS0FBSywrQkFFVixDQUFDO1lBQ0osQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRVIscUJBQXFCO1lBQ3JCLFVBQVUsQ0FBQztnQkFDVCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVyQixVQUFVLENBQUM7Z0JBQ1QsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFTLFNBQVcsQ0FBQyxDQUFDO2dCQUM1RCxJQUFJLE1BQU07b0JBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xELElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBUyxTQUFTLFFBQUssQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLFFBQVE7b0JBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUQsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsRUFBRSxDQUFDIn0=