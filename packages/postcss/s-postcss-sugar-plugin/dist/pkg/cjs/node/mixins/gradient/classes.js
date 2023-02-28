"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const cli_1 = require("@coffeekraken/sugar/cli");
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
 * @snippet         @sugar.gradient.classes
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
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const finalParams = Object.assign({ types: ['linear', 'radial'], angles: [0, 45, 90, 135, 180, 225, 270, 315], x: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], y: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Gradients
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/gradients
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to compose some gradient on your HTMLElement and on your text
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.gradient.classes;
        * 
        ${Object.keys(s_theme_1.default.get('color'))
        .map((color) => {
        return ` * @cssClass         s-gradient:${color}         Apply the ${color} gradient
                         * @cssClass         s-gradient:text:${color}    Apply the ${color} text gradient`;
    })
        .join('\n')}
        *
        ${Object.keys(s_theme_1.default.get('color'))
        .map((color) => {
        return ` *
                    * @example       html       ${color} gradient
                    * <div class="s-gradient:${color} s-radius" style="height: 100px"></div>
                    *`;
    })
        .join('\n')}
        *
        * @example       html       Mixed accent/complementary gradient
        * <div class="s-gradient:accent:end-complementary s-radius" style="height: 100px"></div>
        * 
        * @example       html       Mixed complementary/error gradient
        * <div class="s-gradient:complementary:end-error s-radius" style="height: 100px"></div>
        *
        * @example       html       Linear gradient with an angle
        * <div class="s-gradient:complementary:end-error:a-0 s-radius" style="height: 100px"></div>
        * 
        * @example       html       Radial gradient
        * <div class="s-gradient:radial:accent s-radius" style="height: 250px"></div>
        * 
        * @example       html       Radial gradient with position
        * <div class="s-gradient:radial:complementary:x-10:y-90 s-radius" style="height: 250px"></div>
        *
        ${Object.keys(s_theme_1.default.get('color'))
        .map((color) => {
        return ` *
                    * @example       html       ${color} text gradient
                    * <div class="s-gradient:text:${color} s-typo:bold s-font:80 s-display:inline-block s-display:inline-block">
                    *   I wish I was a shiny text gradient... But...
                    * </div>
                    *`;
    })
        .join('\n')}
        * 
        * @example       html       Mixed accent/complementary text gradient
        * <div class="s-gradient:text:accent:end-complementary s-typo:bold s-font:80 s-display:inline-block">
        *   I wish I was a shiny text gradient... But...
        * </div>
        * 
        * @example       html       Mixed complementary/error gradient
        * <div class="s-gradient:text:complementary:end-error s-typo:bold s-font:80 s-display:inline-block">
        *   I wish I was a shiny text gradient... But...
        * </div>
        *
        * @example       html       Linear gradient with an angle
        * <div class="s-gradient:text:complementary:end-error:a-0 s-typo:bold s-font:80 s-display:inline-block">
        *   I wish I was a shiny text gradient... But...
        * </div>
        * 
        * @example       html       Radial gradient
        * <div class="s-gradient:text:radial:accent:end-error s-typo:bold s-font:80 s-display:inline-block">
        *   I wish I was a shiny text gradient... But...
        * </div>
        * 
        * @example       html       Radial gradient with position
        * <div class="s-gradient:text:radial:complementary:end-accent:x-30:y-100 s-typo:bold s-font:80 s-display:inline-block">
        *   I wish I was a shiny text gradient... But...
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    for (let [name, colorObj] of Object.entries(s_theme_1.default.getTheme().baseColors())) {
        // linear gradients
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
           * <div class="s-ratio:16-9 s-gradient:${name}">
           *     <div class="s-center-abs">I'm a cool depth button</div>
           * </div>
           *
           * @since       2.0.0
           * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
           */
          `).code(`
          .s-gradient--${name}:not(.s-gradient--text):not(.s-gradient--radial) {
              @sugar.gradient(
                  $start: sugar.color(${name}, ${(0, cli_1.__argsToString)((_a = s_theme_1.default.get('gradient.defaultModifierStart')) !== null && _a !== void 0 ? _a : {})}),
                  $end: sugar.color(${name}, ${(0, cli_1.__argsToString)((_b = s_theme_1.default.get('gradient.defaultModifierEnd')) !== null && _b !== void 0 ? _b : {})}),
                  $type: linear,
                  $angle: ${s_theme_1.default.get('gradient.defaultAngle')}
              );
          }
      `, { type: 'CssClass' });
        // radial gradients
        vars.comment(`
          /**
           * @name        .s-gradient:radial:${name}
           * @namespace          sugar.style.gradient
           * @type            CssClass
           * @platform        css
           * @status          beta
           *
           * This class allows you to apply directly a "<yellow>${name}</yellow>" radial gradient on any HTMLElement.
           * This gradient uses the "<yellow>gradient.defaultType</yellow>" and "<yellow>gradient.defaultAngle</yellow>" theme config.
           * If you want to apply some different gradient using classes, make use of the others available
           * classes like the "<yellow>s-gradient-type-{type}</yellow>", etc...
           *
           * @example         html
           * <div class="s-ratio:16-9 s-gradient:radial:${name}">
           *     <div class="s-center-abs">I'm a cool depth button</div>
           * </div>
           *
           * @since       2.0.0
           * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
           */
          `).code(`
          .s-gradient--${name}.s-gradient--radial:not(.s-gradient--text) {
              @sugar.gradient(
                  $start: sugar.color(${name}, ${(0, cli_1.__argsToString)((_c = s_theme_1.default.get('gradient.defaultModifierEnd')) !== null && _c !== void 0 ? _c : {})}) ,
                  $end: sugar.color(${name}, ${(0, cli_1.__argsToString)((_d = s_theme_1.default.get('gradient.defaultModifierStart')) !== null && _d !== void 0 ? _d : {})}),
                  $type: radial,
                  $x: ${s_theme_1.default.get('gradient.defaultX')},
                  $y: ${s_theme_1.default.get('gradient.defaultY')}
              );
          }
      `, { type: 'CssClass' });
        // text gradient
        vars.comment(`
          /**
           * @name        .s-gradient:text:${name}
           * @namespace          sugar.style.gradient
           * @type            CssClass
           * @platform        css
           * @status          beta
           *
           * This class allows you to apply directly a text "<yellow>${name}</yellow>" gradient on any HTMLElement.
           * This gradient uses the "<yellow>gradient.defaultType</yellow>" and "<yellow>gradient.defaultAngle</yellow>" theme config.
           * If you want to apply some different gradient using classes, make use of the others available
           * classes like the "<yellow>s-gradient-type-{type}</yellow>", etc...
           *
           * @example         html
           * <div class="s-gradient:text:${name}">
           *   I wish I was a shiny ${name} text gradient... But...
           * </div>
           *
           * @since       2.0.0
           * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
           */
          `).code(`
          .s-gradient--${name}.s-gradient--text:not(.s-gradient--radial) {
              @sugar.gradient.text(
                  $start: sugar.color(${name}, text, ${(0, cli_1.__argsToString)((_e = s_theme_1.default.get('gradient.defaultTextModifierStart')) !== null && _e !== void 0 ? _e : {})}),
                  $end: sugar.color(${name}, text, ${(0, cli_1.__argsToString)((_f = s_theme_1.default.get('gradient.defaultTextModifierEnd')) !== null && _f !== void 0 ? _f : {})}),
                  $angle: ${s_theme_1.default.get('gradient.defaultTextAngle')}
              );
          }
      `, { type: 'CssClass' });
        // text radial
        vars.comment(`
          /**
           * @name        .s-gradient:text:radial:${name}
           * @namespace          sugar.style.gradient
           * @type            CssClass
           * @platform        css
           * @status          beta
           *
           * This class allows you to apply directly a text "<yellow>${name}</yellow>" radial gradient on any HTMLElement.
           * This gradient uses the "<yellow>gradient.defaultType</yellow>" and "<yellow>gradient.defaultAngle</yellow>" theme config.
           * If you want to apply some different gradient using classes, make use of the others available
           * classes like the "<yellow>s-gradient-type-{type}</yellow>", etc...
           *
           * @example         html
           * <div class="s-gradient:text:radial:${name}">
           *   I wish I was a shiny ${name} text  radial gradient... But...
           * </div>
           *
           * @since       2.0.0
           * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
           */
          `).code(`
          .s-gradient--${name}.s-gradient--text.s-gradient--radial {
              @sugar.gradient.text(
                  $start: sugar.color(${name}, text, ${(0, cli_1.__argsToString)((_g = s_theme_1.default.get('gradient.defaultTextModifierStart')) !== null && _g !== void 0 ? _g : {})}),
                  $end: sugar.color(${name}, text, ${(0, cli_1.__argsToString)((_h = s_theme_1.default.get('gradient.defaultTextModifierEnd')) !== null && _h !== void 0 ? _h : {})}),
                  $type: radial
              );
          }
      `, { type: 'CssClass' });
        vars.comment(`/**
            * @name          s-gradient:end-${name}
            * @namespace          sugar.style.gradient
            * @type               CssClass
            * @platform         css
            * @status           beta
            *
            * This class allows you to apply the end color to "${name}" on a gradient
            *
            * @example        html
            * <div class="s-ratio:16-9 s-gradient:main:end-${name}">
            *     <div class="s-center-abs">I'm a cool depth button</div>
            * </div>
            *
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
            `).code(`
            .s-gradient--end-${name} {
                --s-gradient-end: sugar.color(${name});
            }`, { type: 'CssClass' });
    }
    if (finalParams.angles) {
        finalParams.angles.forEach((angle) => {
            vars.comment(`
        /**
         * @name        .s-gradient:a-${angle}
         * @namespace          sugar.style.gradient
         * @type            CssClass
         * @platform        css
         * @status          beta
         * 
         * This class allows you to apply an angle of "<magenta>${angle}</magenta>" you want if your gradient
         * is of type "<yellow>linear</yellow>" of course.
         * 
         * @example             html
         * <div class="s-ratio:16-9 s-gradient:linear:accent:a-${angle}">
         *     <div class="s-center-abs">I'm a cool depth button</div>
         * </div>
         * 
         * @since            2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `).code(`
        .s-gradient--a-${angle} {
            --s-gradient-angle: ${angle}deg;
        }
    `, { type: 'CssClass' });
        });
    }
    if (finalParams.y) {
        finalParams.y.forEach((y) => {
            vars.comment(`
        /**
         * @name        .s-gradient:y-${y}
         * @namespace          sugar.style.gradient
         * @type            CssClass
         * @platform        css
         * @status          beta
         * 
         * This class allows you to apply the y position when using a radial gradient
         * 
         * @example             html
         * <div class="s-ratio:16-9 s-gradient:radial:accent:y-${y}" style="height: 100px"></div>
         * 
         * @since            2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `).code(`
        .s-gradient--y-${y} {
            --s-gradient-y: ${y}%;
        }
    `, { type: 'CssClass' });
        });
    }
    if (finalParams.x) {
        finalParams.x.forEach((x) => {
            vars.comment(`
        /**
         * @name        .s-gradient:x-${x}
         * @namespace          sugar.style.gradient
         * @type            CssClass
         * @platform        css
         * @status          beta
         * 
         * This class allows you to apply the x position when using a radial gradient
         * 
         * @example             html
         * <div class="s-ratio:16-9 s-gradient:radial:accent:x-${x}" style="height: 100px"></div>
         * 
         * @since            2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `).code(`
        .s-gradient--x-${x} {
            --s-gradient-x: ${x}%;
        }
    `, { type: 'CssClass' });
        });
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCw0RUFBcUQ7QUFDckQsb0VBQTZDO0FBQzdDLGlEQUF5RDtBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxxQkFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO2dCQUM1QixPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO2dCQUM3QixLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7Z0JBQ3hDLEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT3NELCtEQUFTO0FBRWhFLG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7O0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFDM0IsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUM1QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUs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