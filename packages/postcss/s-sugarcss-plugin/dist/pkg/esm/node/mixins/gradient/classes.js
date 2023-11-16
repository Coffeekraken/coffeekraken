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
        ${Object.keys(__STheme.current.get('color'))
        .map((color) => {
        return ` * @cssClass         s-gradient:${color}         Apply the ${color} gradient
                         * @cssClass         s-gradient:text:${color}    Apply the ${color} text gradient`;
    })
        .join('\n')}
        *
        ${Object.keys(__STheme.current.get('color'))
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
        ${Object.keys(__STheme.current.get('color'))
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
    for (let [name, colorObj] of Object.entries(__STheme.current.baseColors())) {
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
                  $start: sugar.color(${name}, ${__argsToString((_a = __STheme.current.get('gradient.defaultModifierStart')) !== null && _a !== void 0 ? _a : {})}),
                  $end: sugar.color(${name}, ${__argsToString((_b = __STheme.current.get('gradient.defaultModifierEnd')) !== null && _b !== void 0 ? _b : {})}),
                  $type: linear,
                  $angle: ${__STheme.current.get('gradient.defaultAngle')}
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
                  $start: sugar.color(${name}, ${__argsToString((_c = __STheme.current.get('gradient.defaultModifierEnd')) !== null && _c !== void 0 ? _c : {})}) ,
                  $end: sugar.color(${name}, ${__argsToString((_d = __STheme.current.get('gradient.defaultModifierStart')) !== null && _d !== void 0 ? _d : {})}),
                  $type: radial,
                  $x: ${__STheme.current.get('gradient.defaultX')},
                  $y: ${__STheme.current.get('gradient.defaultY')}
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
                  $start: sugar.color(${name}, text, ${__argsToString((_e = __STheme.current.get('gradient.defaultTextModifierStart')) !== null && _e !== void 0 ? _e : {})}),
                  $end: sugar.color(${name}, text, ${__argsToString((_f = __STheme.current.get('gradient.defaultTextModifierEnd')) !== null && _f !== void 0 ? _f : {})}),
                  $angle: ${__STheme.current.get('gradient.defaultTextAngle')}
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
                  $start: sugar.color(${name}, text, ${__argsToString((_g = __STheme.current.get('gradient.defaultTextModifierStart')) !== null && _g !== void 0 ? _g : {})}),
                  $end: sugar.color(${name}, text, ${__argsToString((_h = __STheme.current.get('gradient.defaultTextModifierEnd')) !== null && _h !== void 0 ? _h : {})}),
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