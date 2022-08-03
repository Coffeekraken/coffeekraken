"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name           classes
 * @namespace      node.mixin.gradient
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the gradient helper classes like s-gradient:accent, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.gradient.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginGradientClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            types: {
                type: 'String[]',
                values: ['linear', 'radial'],
                default: ['linear', 'radial'],
                alias: 't',
            },
            angles: {
                type: 'Number[]',
                default: [0, 45, 90, 135, 180, 225, 270],
                alias: 'a',
            },
        };
    }
}
exports.interface = postcssSugarPluginGradientClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ types: ['linear', 'radial'], angles: [0, 45, 90, 135, 180, 225, 270] }, params);
    const vars = new CssVars();
    if (finalParams.types.indexOf('linear') !== -1) {
        vars.comment(`/**
        * @name             s-gradient:linear
        * @namespace          sugar.style.gradient
        * @type                 CssClass
        * @platform         css
        * @status           beta
        *
        * This class allows you to apply a "<yellow>linear</yellow> gradient to any HTMLElement. Note that this will apply a linear gradient using the "<yellow>accent</yellow>" color. If you want
        * apply something different, make use of the "<cyan>s-gradient-start-{colorName}</cyan>" and "<cyan>s-gradient-end-{colorName}</cyan>" classes...
        *
        * @example        html
        * <div class="s-gradient\:linear\:accent">
        *   Hello gradient
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
    .s-gradient--linear {
        --s-gradient-type-inline: linear;
    }`, { type: 'CssClass' });
    }
    if (finalParams.types.indexOf('radial') !== -1) {
        vars.comment(`/**
        * @name             s-gradient:radial
        * @namespace          sugar.style.gradient
        * @type                 CssClass
        * @platform       css
        * @status         beta
        *
        * This class allows you to apply a "<yellow>radial</yellow> gradient to any HTMLElement. Note that this will apply a radial gradient using the "<yellow>accent</yellow>" color. If you want
        * apply something different, make use of the "<cyan>s-gradient-start-{colorName}</cyan>" and "<cyan>s-gradient-end-{colorName}</cyan>" classes...
        *
        * @example        html
        * <div class="s-gradient\:radial\:accent">
        *   Hello gradient
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
    .s-gradient--radial {
        --s-gradient-type-inline: radial;
    }`, { type: 'CssClass' });
    }
    if (finalParams.angles) {
        finalParams.angles.forEach((angle) => {
            vars.comment(`
        /**
         * @name        .s-gradient:${angle}deg
         * @namespace          sugar.style.gradient
         * @type            CssClass
         * @platform        css
         * @status          beta
         * 
         * This class allows you to apply an angle of "<magenta>${angle}</magenta>" you want if your gradient
         * is of type "<yellow>linear</yellow>" of course.
         * 
         * @example             html
         * <div class="s-ratio\:16-9 s-gradient\:linear\:${angle}deg\:start-accent-50\:end-accent-70">
         *     <div class="s-center-abs">I'm a cool depth button</div>
         * </div>
         * 
         * @since            2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `).code(`
        .s-gradient--${angle}deg {
            --s-gradient-angle-inline: ${angle}deg;
        }
    `, { type: 'CssClass' });
        });
    }
    let currentName;
    s_theme_1.default.getTheme().loopOnColors(({ name, schema, value }) => {
        if (currentName !== name) {
            // default gradients
            vars.comment(`
          /**
           * @name        .s-gradient:${name}
           * @namespace          sugar.style.gradient
           * @type            CssClass
           * @platform        css
           * @status          beta
           *
           * This class allows you to apply directly a "<yellow>${name}</yellow>" gradient on any HTMLElement.
           * This gradient uses the "<yellow>gradient.defaultType</yellow>" and "<yellow>gradient.defaultAngle</yellow>" theme config.
           * If you want to apply some different gradient using classes, make use of the others available
           * classes like the "<yellow>s-gradient-type-{type}</yellow>", etc...
           *
           * @example         html
           * <div class="s-ratio\:16-9 s-gradient\:${name}">
           *     <div class="s-center-abs">I'm a cool depth button</div>
           * </div>
           *
           * @since       2.0.0
           * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
           */
          `).code(`
          .s-gradient--${name} {
              @sugar.gradient(
                  $start: ${name},
                  $end: ${name}--${s_theme_1.default.get('gradient.defaultVariant')},
                  $type: ${s_theme_1.default.get('gradient.defaultType')},
                  $angle: ${s_theme_1.default.get('gradient.defaultAngle')}
              );
          }
      `, { type: 'CssClass' });
        }
        currentName = name;
        const startColorClassName = `s-gradient:start-${name}${schema === 'default' ? '' : `-${schema}`}`;
        vars.comment(`/**
        * @name          ${startColorClassName}
        * @namespace          sugar.style.gradient
        * @type               CssClass
        * @platform           css
        * @status           beta
        *
        * This class allows you to apply a "<yellow>${name}</yellow>" gradient start color to any HTMLElement
        *
        * @example        html
        * <div class="s-ratio\:16-9 ${startColorClassName.replace(':', ':')}\:end-${name}${next.schema === 'default' ? '' : `-${next.schema}`}">
        *     <div class="s-center-abs">I'm a cool depth button</div>
        * </div>
        *
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
      .${startColorClassName.replace(':', '--')} {
          --s-gradient-start-color-inline: sugar.color(${name}, ${schema});
      }`, { type: 'CssClass' });
        const endColorClassName = `s-gradient:end-${name}${schema === 'default' ? '' : `-${schema}`}`;
        vars.comment(`/**
      * @name          ${endColorClassName}
      * @namespace          sugar.style.gradient
      * @type               CssClass
      * @platform         css
      * @status           beta
      *
      * This class allows you to apply a "<yellow>${name}${schema === 'default' ? '' : `-${schema}`}</yellow>" gradient end color to any HTMLElement
      *
      * @example        html
      * <div class="s-ratio\:16-9 ${endColorClassName.replace(':', ':')}\:start-${name}${previous.schema === 'default' ? '' : `-${previous.schema}`} ${endColorClassName}">
      *     <div class="s-center-abs">I'm a cool depth button</div>
      * </div>
      *
      * @since            2.0.0
      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
    .${endColorClassName.replace(':', '--')} {
        --s-gradient-end-color-inline: sugar.color(${name}, ${schema});
    }`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCw0RUFBcUQ7QUFDckQsb0VBQTZDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxxQkFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO2dCQUM1QixPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO2dCQUM3QixLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7Z0JBQ3hDLEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT3NELCtEQUFTO0FBRWhFLG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUMzQixNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFDcEMsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7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