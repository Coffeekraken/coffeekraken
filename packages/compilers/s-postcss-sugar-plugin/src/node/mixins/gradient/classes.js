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
function default_1({ params, atRule, processNested }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELDhEQUF3QztBQUV4QyxNQUFNLDBDQUEyQyxTQUFRLHFCQUFZOztBQXFCZCwrREFBUztBQXBCdkQscURBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsVUFBVTtRQUNoQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1FBQzVCLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7UUFDN0IsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxVQUFVO1FBQ2hCLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUN4QyxLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQVVKLG1CQUF5QixFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQzNCLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUNwQyxNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFHLGVBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU1QyxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7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