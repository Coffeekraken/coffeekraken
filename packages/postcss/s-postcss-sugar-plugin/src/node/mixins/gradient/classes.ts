// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __argsToString } from '@coffeekraken/sugar/cli';

/**
 * @name           classes
 * @as              @sugar.gradient.classes
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

class postcssSugarPluginGradientClassesInterface extends __SInterface {
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

export interface IPostcssSugarPluginGradientClassesParams {
    types: string[];
    angles: number[];
}

export { postcssSugarPluginGradientClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginGradientClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginGradientClassesParams = {
        types: ['linear', 'radial'],
        angles: [0, 45, 90, 135, 180, 225, 270, 315],
        x: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        y: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
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
    `,
    );

    for (let [name, colorObj] of Object.entries(
        __STheme.getTheme().baseColors(),
    )) {
        // linear gradients
        vars.comment(
            `
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
          `,
        ).code(
            `
          .s-gradient--${name}:not(.s-gradient--text):not(.s-gradient--radial) {
              @sugar.gradient(
                  $start: sugar.color(${name}, ${__argsToString(
                __STheme.get('gradient.defaultModifierStart') ?? {},
            )}),
                  $end: sugar.color(${name}, ${__argsToString(
                __STheme.get('gradient.defaultModifierEnd') ?? {},
            )}),
                  $type: linear,
                  $angle: ${__STheme.get('gradient.defaultAngle')}
              );
          }
      `,
            { type: 'CssClass' },
        );

        // radial gradients
        vars.comment(
            `
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
          `,
        ).code(
            `
          .s-gradient--${name}.s-gradient--radial:not(.s-gradient--text) {
              @sugar.gradient(
                  $start: sugar.color(${name}, ${__argsToString(
                __STheme.get('gradient.defaultModifierEnd') ?? {},
            )}) ,
                  $end: sugar.color(${name}, ${__argsToString(
                __STheme.get('gradient.defaultModifierStart') ?? {},
            )}),
                  $type: radial,
                  $x: ${__STheme.get('gradient.defaultX')},
                  $y: ${__STheme.get('gradient.defaultY')}
              );
          }
      `,
            { type: 'CssClass' },
        );

        // text gradient
        vars.comment(
            `
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
          `,
        ).code(
            `
          .s-gradient--${name}.s-gradient--text:not(.s-gradient--radial) {
              @sugar.gradient.text(
                  $start: sugar.color(${name}, text, ${__argsToString(
                __STheme.get('gradient.defaultTextModifierStart') ?? {},
            )}),
                  $end: sugar.color(${name}, text, ${__argsToString(
                __STheme.get('gradient.defaultTextModifierEnd') ?? {},
            )}),
                  $angle: ${__STheme.get('gradient.defaultTextAngle')}
              );
          }
      `,
            { type: 'CssClass' },
        );

        // text radial
        vars.comment(
            `
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
          `,
        ).code(
            `
          .s-gradient--${name}.s-gradient--text.s-gradient--radial {
              @sugar.gradient.text(
                  $start: sugar.color(${name}, text, ${__argsToString(
                __STheme.get('gradient.defaultTextModifierStart') ?? {},
            )}),
                  $end: sugar.color(${name}, text, ${__argsToString(
                __STheme.get('gradient.defaultTextModifierEnd') ?? {},
            )}),
                  $type: radial
              );
          }
      `,
            { type: 'CssClass' },
        );

        vars.comment(
            `/**
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
            `,
        ).code(
            `
            .s-gradient--end-${name} {
                --s-gradient-end: sugar.color(${name});
            }`,
            { type: 'CssClass' },
        );
    }

    if (finalParams.angles) {
        finalParams.angles.forEach((angle) => {
            vars.comment(
                `
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
        `,
            ).code(
                `
        .s-gradient--a-${angle} {
            --s-gradient-angle: ${angle}deg;
        }
    `,
                { type: 'CssClass' },
            );
        });
    }

    if (finalParams.y) {
        finalParams.y.forEach((y) => {
            vars.comment(
                `
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
        `,
            ).code(
                `
        .s-gradient--y-${y} {
            --s-gradient-y: ${y}%;
        }
    `,
                { type: 'CssClass' },
            );
        });
    }

    if (finalParams.x) {
        finalParams.x.forEach((x) => {
            vars.comment(
                `
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
        `,
            ).code(
                `
        .s-gradient--x-${x} {
            --s-gradient-x: ${x}%;
        }
    `,
                { type: 'CssClass' },
            );
        });
    }

    return vars;
}
