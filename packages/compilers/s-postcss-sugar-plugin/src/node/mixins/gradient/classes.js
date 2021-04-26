"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../utils/theme"));
class postcssSugarPluginGradientClassesInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginGradientClassesInterface;
postcssSugarPluginGradientClassesInterface.definition = {
    types: {
        type: 'String[]',
        values: ['linear', 'radial'],
        default: ['linear', 'radial'],
        alias: 't'
    },
    angles: {
        type: 'Number[]',
        default: [0, 45, 90, 135, 180, 225, 270],
        alias: 'a'
    }
};
function default_1(params = {}, atRule, processNested) {
    const finalParams = Object.assign({ types: ['linear', 'radial'], angles: [0, 45, 90, 135, 180, 225, 270] }, params);
    const colorsObj = theme_1.default().config('color');
    const vars = [];
    if (finalParams.types.indexOf('linear') !== -1) {
        vars.push(`/**
        * @name             s-gradient-type-linear
        * @namespace          sugar.css.gradient
        * @type                 CssClass
        *
        * This class allows you to apply a "<yellow>linear</yellow> gradient to any HTMLElement. Note that this will apply a linear gradient using the "<yellow>primary</yellow>" color. If you want
        * apply something different, make use of the "<cyan>s-gradient-start-{colorName}</cyan>" and "<cyan>s-gradient-end-{colorName}</cyan>" classes...
        *
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    .s-gradient-type-linear {
        --s-gradient-type-inline: linear;
    }`);
    }
    if (finalParams.types.indexOf('radial') !== -1) {
        vars.push(`/**
        * @name             s-gradient-type-radial
        * @namespace          sugar.css.gradient
        * @type                 CssClass
        *
        * This class allows you to apply a "<yellow>radial</yellow> gradient to any HTMLElement. Note that this will apply a radial gradient using the "<yellow>primary</yellow>" color. If you want
        * apply something different, make use of the "<cyan>s-gradient-start-{colorName}</cyan>" and "<cyan>s-gradient-end-{colorName}</cyan>" classes...
        *
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    .s-gradient-type-radial {
        --s-gradient-type-inline: radial;
    }`);
    }
    if (finalParams.angles) {
        finalParams.angles.forEach((angle) => {
            vars.push(`
        /**
         * @name        .s-gradient-angle-${angle}
         * @namespace       sugar.css.gradient
         * @type            CssClass
         * 
         * This class allows you to apply an angle of "<magenta>${angle}</magenta>" you want if your gradient
         * is of type "<yellow>linear</yellow>" of course.
         * 
         * @example             html
         * <div class="s-ratio-16-9 s-gradient-linear s-gradient-start-primary-50 s-gradient-end-primary-70">
         *     <div class="s-center-abs">I'm a cool depth button</div>
         * </div>
         * 
         * @since            2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-gradient-angle-${angle} {
            --s-gradient-angle-inline: ${angle}deg;
        }
    `);
        });
    }
    let currentName;
    theme_1.default().loopOnColors(({ name, modifier, value, previous, next }) => {
        if (currentName !== name) {
            // default gradients
            vars.push(`
          /**
           * @name        .s-gradient-${name}
           * @namespace   sugar.css.gradient
           * @type            CssClass
           *
           * This class allows you to apply directly a "<yellow>${name}</yellow>" gradient on any HTMLElement.
           * This gradient uses the "<yellow>gradient.defaultType</yellow>" and "<yellow>gradient.defaultAngle</yellow>" theme config.
           * If you want to apply some different gradient using classes, make use of the others available
           * classes like the "<yellow>s-gradient-type-{type}</yellow>", etc...
           *
           * @example         html
           * <div class="s-ratio-16-9 s-gradient-${name}">
           *     <div class="s-center-abs">I'm a cool depth button</div>
           * </div>
           *
           * @since       2.0.0
           * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
           */
          .s-gradient-${name} {
              @sugar.gradient(
                  $start: ${name},
                  $end: ${name}--${theme_1.default().config('gradient.defaultModifier')},
                  $type: ${theme_1.default().config('gradient.defaultType')},
                  $angle: ${theme_1.default().config('gradient.defaultAngle')}
              );
          }
      `);
        }
        currentName = name;
        const startColorClassName = `s-gradient-start-${name}${modifier === 'default' ? '' : `-${modifier}`}`;
        vars.push(`/**
        * @name          .${startColorClassName}
        * @namespace          sugar.css.gradient
        * @type               CssClass
        *
        * This class allows you to apply a "<yellow>${name}</yellow>" gradient start color to any HTMLElement
        *
        * @example        html
        * <div class="s-ratio-16-9 s-gradient-linear ${startColorClassName} s-gradient-end-${name}${next.modifier === 'default' ? '' : `-${next.modifier}`}">
        *     <div class="s-center-abs">I'm a cool depth button</div>
        * </div>
        *
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
      .${startColorClassName} {
          --s-gradient-start-color-inline: sugar.color(${name}, ${modifier});
      }`);
        const endColorClassName = `s-gradient-end-${name}${modifier === 'default' ? '' : `-${modifier}`}`;
        vars.push(`/**
      * @name          .${endColorClassName}
      * @namespace          sugar.css.gradient
      * @type               CssClass
      *
      * This class allows you to apply a "<yellow>${name}${modifier === 'default' ? '' : `-${modifier}`}</yellow>" gradient end color to any HTMLElement
      *
      * @example        html
      * <div class="s-ratio-16-9 s-gradient-linear s-gradient-start-${name}${previous.modifier === 'default' ? '' : `-${previous.modifier}`} ${endColorClassName}">
      *     <div class="s-center-abs">I'm a cool depth button</div>
      * </div>
      *
      * @since            2.0.0
      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
    .${endColorClassName} {
        --s-gradient-end-color-inline: sugar.color(${name}, ${modifier});
    }`);
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELDhEQUF3QztBQUV4QyxNQUFNLDBDQUEyQyxTQUFRLHFCQUFZOztBQXFCZCwrREFBUztBQXBCdkQscURBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsVUFBVTtRQUNoQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1FBQzVCLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7UUFDN0IsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxVQUFVO1FBQ2hCLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUN4QyxLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQVVKLG1CQUNFLFNBQTRELEVBQUUsRUFDOUQsTUFBTSxFQUNOLGFBQWE7SUFFYixNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUMzQixNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFDcEMsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLFNBQVMsR0FBRyxlQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7OztNQWFSLENBQUMsQ0FBQztLQUNMO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O01BYVIsQ0FBQyxDQUFDO0tBQ0w7SUFFRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUU7UUFDdEIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs0Q0FFNEIsS0FBSzs7OztrRUFJaUIsS0FBSzs7Ozs7Ozs7Ozs7NEJBVzNDLEtBQUs7eUNBQ1EsS0FBSzs7S0FFekMsQ0FBQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUVELElBQUksV0FBVyxDQUFDO0lBQ2hCLGVBQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDbkUsSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFO1lBQ3hCLG9CQUFvQjtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDOzt3Q0FFd0IsSUFBSTs7OztrRUFJc0IsSUFBSTs7Ozs7O21EQU1uQixJQUFJOzs7Ozs7O3dCQU8vQixJQUFJOzs0QkFFQSxJQUFJOzBCQUNOLElBQUksS0FBSyxlQUFPLEVBQUUsQ0FBQyxNQUFNLENBQzNDLDBCQUEwQixDQUMzQjsyQkFDb0IsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDOzRCQUN2QyxlQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUM7OztPQUc5RCxDQUFDLENBQUM7U0FDSjtRQUNELFdBQVcsR0FBRyxJQUFJLENBQUM7UUFFbkIsTUFBTSxtQkFBbUIsR0FBRyxvQkFBb0IsSUFBSSxHQUNsRCxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUM1QyxFQUFFLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDOzRCQUNjLG1CQUFtQjs7OztzREFJTyxJQUFJOzs7dURBR0gsbUJBQW1CLG1CQUFtQixJQUFJLEdBQzNGLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFDdEQ7Ozs7Ozs7U0FPSyxtQkFBbUI7eURBQzZCLElBQUksS0FBSyxRQUFRO1FBQ2xFLENBQUMsQ0FBQztRQUVOLE1BQU0saUJBQWlCLEdBQUcsa0JBQWtCLElBQUksR0FDOUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFDNUMsRUFBRSxDQUFDO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDWSxpQkFBaUI7Ozs7b0RBSVMsSUFBSSxHQUNsRCxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUM1Qzs7O3NFQUdrRSxJQUFJLEdBQ3BFLFFBQVEsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsRUFDOUQsSUFBSSxpQkFBaUI7Ozs7Ozs7T0FPbEIsaUJBQWlCO3FEQUM2QixJQUFJLEtBQUssUUFBUTtNQUNoRSxDQUFDLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBcktELDRCQXFLQyJ9