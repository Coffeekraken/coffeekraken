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
    const uniqid_1 = __importDefault(require("../../../shared/string/uniqid"));
    const parseArgs_1 = __importDefault(require("../../../shared/string/parseArgs"));
    const querySelectorLive_1 = __importDefault(require("../../dom/querySelectorLive"));
    /**
     * @todo        documentation
     */
    exports.default = (() => {
        querySelectorLive_1.default('[slide-in]', ($item) => {
            // generate a unique id for this node
            const uniqClass = `slide-in-${uniqid_1.default()}`;
            $item.classList.add(uniqClass);
            // parse the slide-in value
            const slideInValue = $item.getAttribute('slide-in');
            const args = parseArgs_1.default(slideInValue, {
                x: 'Number -x --x "0"',
                y: 'Number -y --y "0"',
                duration: 'Number -d --duration "500"',
                delay: 'Number --delay "0"',
                when: 'String -w --when "inViewport"'
            });
            // generate the animation css
            const css = `
      [slide-in].${uniqClass} {
        opacity: 0;
        transform: translate(${args.x.value || 0}px, ${args.y.value || 0}px);

      }
    `;
            const cssIn = `
      [slide-in].${uniqClass}.in {
        transition: all ${args.duration.value / 1000 || '0.5'}s;
        opacity: 1;
        transform: translate(0, 0);
      }
    `;
            // append the css into the section
            document.head.innerHTML += `
      <style id="${uniqClass}">
        ${css}
      </style>
    `;
            setTimeout(() => {
                document.head.innerHTML += `
        <style id="${uniqClass}-in">
          ${cssIn}
        </style>
      `;
            }, 100);
            // add the "in" class
            setTimeout(() => {
                $item.classList.add('in');
            }, args.delay.value);
            setTimeout(() => {
                const $style = document.querySelector(`style#${uniqClass}`);
                if ($style)
                    $style.parentNode.removeChild($style);
                const $styleIn = document.querySelector(`style#${uniqClass}-in`);
                if ($styleIn)
                    $styleIn.parentNode.removeChild($styleIn);
            }, args.delay.value + args.duration.value);
        });
    })();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbGlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCwyRUFBcUQ7SUFDckQsaUZBQTJEO0lBQzNELG9GQUE4RDtJQUU5RDs7T0FFRztJQUVILGtCQUFlLENBQUMsR0FBRyxFQUFFO1FBQ25CLDJCQUFtQixDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzFDLHFDQUFxQztZQUNyQyxNQUFNLFNBQVMsR0FBRyxZQUFZLGdCQUFRLEVBQUUsRUFBRSxDQUFDO1lBQzNDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRS9CLDJCQUEyQjtZQUMzQixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sSUFBSSxHQUFHLG1CQUFXLENBQUMsWUFBWSxFQUFFO2dCQUNyQyxDQUFDLEVBQUUsbUJBQW1CO2dCQUN0QixDQUFDLEVBQUUsbUJBQW1CO2dCQUN0QixRQUFRLEVBQUUsNEJBQTRCO2dCQUN0QyxLQUFLLEVBQUUsb0JBQW9CO2dCQUMzQixJQUFJLEVBQUUsK0JBQStCO2FBQ3RDLENBQUMsQ0FBQztZQUVILDZCQUE2QjtZQUM3QixNQUFNLEdBQUcsR0FBRzttQkFDRyxTQUFTOzsrQkFFRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQzs7O0tBR25FLENBQUM7WUFDRixNQUFNLEtBQUssR0FBRzttQkFDQyxTQUFTOzBCQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxLQUFLOzs7O0tBSXhELENBQUM7WUFFRixrQ0FBa0M7WUFDbEMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUk7bUJBQ1osU0FBUztVQUNsQixHQUFHOztLQUVSLENBQUM7WUFDRixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJO3FCQUNaLFNBQVM7WUFDbEIsS0FBSzs7T0FFVixDQUFDO1lBQ0osQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRVIscUJBQXFCO1lBQ3JCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFckIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsU0FBUyxFQUFFLENBQUMsQ0FBQztnQkFDNUQsSUFBSSxNQUFNO29CQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsRCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsU0FBUyxLQUFLLENBQUMsQ0FBQztnQkFDakUsSUFBSSxRQUFRO29CQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFELENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLEVBQUUsQ0FBQyJ9