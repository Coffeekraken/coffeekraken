// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __argsToString } from '@coffeekraken/sugar/cli';
/**
 * @name           classes
 * @as              @s.gradient.classes
 * @namespace      node.mixin.gradient
 * @type           PostcssMixin
 * @platform      postcss
 * @status        alpha
 *
 * This mixin generate all the gradient helper classes like s-gradient:accent, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.gradient.classes
 *
 * @example        css
 * @s.gradient.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginGradientClassesInterface extends __SInterface {
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
export { SSugarcssPluginGradientClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const finalParams = Object.assign({ types: ['linear', 'radial'], angles: [0, 45, 90, 135, 180, 225, 270, 315], x: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], y: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Gradient
        * @namespace          sugar.style.helpers.gradient
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/gradients
        * @platform       css
        * @status       alpha
        * 
        * These classes allows you to compose some gradient on your HTMLElement and on your text
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.gradient.classes;
        * 
        ${Object.keys(__STheme.get('color'))
        .map((color) => {
        return ` * @cssClass         s-gradient:${color}         Apply the ${color} gradient
                         * @cssClass         s-gradient:text:${color}    Apply the ${color} text gradient`;
    })
        .join('\n')}
        *
        ${Object.keys(__STheme.get('color'))
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
        ${Object.keys(__STheme.get('color'))
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
    for (let [name, colorObj] of Object.entries(__STheme.getTheme().baseColors())) {
        // linear gradients
        vars.comment(`
          /**
           * @name        .s-gradient:${name}
           * @namespace          sugar.style.helpers.gradient
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
          .s-gradient-${name}:not(.s-gradient-text):not(.s-gradient-radial) {
              @s.gradient(
                  $start: sugar.color(${name}, ${__argsToString((_a = __STheme.get('gradient.defaultModifierStart')) !== null && _a !== void 0 ? _a : {})}),
                  $end: sugar.color(${name}, ${__argsToString((_b = __STheme.get('gradient.defaultModifierEnd')) !== null && _b !== void 0 ? _b : {})}),
                  $type: linear,
                  $angle: ${__STheme.get('gradient.defaultAngle')}
              );
          }
      `, { type: 'CssClass' });
        // radial gradients
        vars.comment(`
          /**
           * @name        .s-gradient:radial:${name}
           * @namespace          sugar.style.helpers.gradient
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
          .s-gradient-${name}.s-gradient-radial:not(.s-gradient-text) {
              @s.gradient(
                  $start: sugar.color(${name}, ${__argsToString((_c = __STheme.get('gradient.defaultModifierEnd')) !== null && _c !== void 0 ? _c : {})}) ,
                  $end: sugar.color(${name}, ${__argsToString((_d = __STheme.get('gradient.defaultModifierStart')) !== null && _d !== void 0 ? _d : {})}),
                  $type: radial,
                  $x: ${__STheme.get('gradient.defaultX')},
                  $y: ${__STheme.get('gradient.defaultY')}
              );
          }
      `, { type: 'CssClass' });
        // text gradient
        vars.comment(`
          /**
           * @name        .s-gradient:text:${name}
           * @namespace          sugar.style.helpers.gradient
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
          .s-gradient-${name}.s-gradient-text:not(.s-gradient-radial) {
              @s.gradient.text(
                  $start: sugar.color(${name}, text, ${__argsToString((_e = __STheme.get('gradient.defaultTextModifierStart')) !== null && _e !== void 0 ? _e : {})}),
                  $end: sugar.color(${name}, text, ${__argsToString((_f = __STheme.get('gradient.defaultTextModifierEnd')) !== null && _f !== void 0 ? _f : {})}),
                  $angle: ${__STheme.get('gradient.defaultTextAngle')}
              );
          }
      `, { type: 'CssClass' });
        // text radial
        vars.comment(`
          /**
           * @name        .s-gradient:text:radial:${name}
           * @namespace          sugar.style.helpers.gradient
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
          .s-gradient-${name}.s-gradient-text.s-gradient-radial {
              @s.gradient.text(
                  $start: sugar.color(${name}, text, ${__argsToString((_g = __STheme.get('gradient.defaultTextModifierStart')) !== null && _g !== void 0 ? _g : {})}),
                  $end: sugar.color(${name}, text, ${__argsToString((_h = __STheme.get('gradient.defaultTextModifierEnd')) !== null && _h !== void 0 ? _h : {})}),
                  $type: radial
              );
          }
      `, { type: 'CssClass' });
        vars.comment(`/**
            * @name          s-gradient:end-${name}
            * @namespace          sugar.style.helpers.gradient
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
            .s-gradient-end-${name} {
                --s-gradient-end: s.color(${name});
            }`, { type: 'CssClass' });
    }
    if (finalParams.angles) {
        finalParams.angles.forEach((angle) => {
            vars.comment(`
        /**
         * @name        .s-gradient:a-${angle}
         * @namespace          sugar.style.helpers.gradient
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
        .s-gradient-a-${angle} {
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
         * @namespace          sugar.style.helpers.gradient
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
        .s-gradient-y-${y} {
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
         * @namespace          sugar.style.helpers.gradient
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
        .s-gradient-x-${x} {
            --s-gradient-x: ${x}%;
        }
    `, { type: 'CssClass' });
        });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztnQkFDNUIsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztnQkFDN0IsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO2dCQUN4QyxLQUFLLEVBQUUsR0FBRzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU9ELE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVoRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDs7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUMzQixNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFD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