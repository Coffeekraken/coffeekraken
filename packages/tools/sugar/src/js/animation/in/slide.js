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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvYW5pbWF0aW9uL2luL3NsaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDJFQUFxRDtJQUNyRCxpRkFBMkQ7SUFDM0Qsb0ZBQThEO0lBRTlEOztPQUVHO0lBRUgsa0JBQWUsQ0FBQyxHQUFHLEVBQUU7UUFDbkIsMkJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDMUMscUNBQXFDO1lBQ3JDLE1BQU0sU0FBUyxHQUFHLFlBQVksZ0JBQVEsRUFBRSxFQUFFLENBQUM7WUFDM0MsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFL0IsMkJBQTJCO1lBQzNCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEQsTUFBTSxJQUFJLEdBQUcsbUJBQVcsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JDLENBQUMsRUFBRSxtQkFBbUI7Z0JBQ3RCLENBQUMsRUFBRSxtQkFBbUI7Z0JBQ3RCLFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLEtBQUssRUFBRSxvQkFBb0I7Z0JBQzNCLElBQUksRUFBRSwrQkFBK0I7YUFDdEMsQ0FBQyxDQUFDO1lBRUgsNkJBQTZCO1lBQzdCLE1BQU0sR0FBRyxHQUFHO21CQUNHLFNBQVM7OytCQUVHLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDOzs7S0FHbkUsQ0FBQztZQUNGLE1BQU0sS0FBSyxHQUFHO21CQUNDLFNBQVM7MEJBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUs7Ozs7S0FJeEQsQ0FBQztZQUVGLGtDQUFrQztZQUNsQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSTttQkFDWixTQUFTO1VBQ2xCLEdBQUc7O0tBRVIsQ0FBQztZQUNGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUk7cUJBQ1osU0FBUztZQUNsQixLQUFLOztPQUVWLENBQUM7WUFDSixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFUixxQkFBcUI7WUFDckIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVyQixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RCxJQUFJLE1BQU07b0JBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxTQUFTLEtBQUssQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLFFBQVE7b0JBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUQsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsRUFBRSxDQUFDIn0=