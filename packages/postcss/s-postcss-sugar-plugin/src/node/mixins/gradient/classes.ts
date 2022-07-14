// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

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
        angles: [0, 45, 90, 135, 180, 225, 270],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.types.indexOf('linear') !== -1) {
        vars.comment(
            `/**
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
       `,
        ).code(
            `
    .s-gradient--linear {
        --s-gradient-type-inline: linear;
    }`,
            { type: 'CssClass' },
        );
    }

    if (finalParams.types.indexOf('radial') !== -1) {
        vars.comment(
            `/**
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
       `,
        ).code(
            `
    .s-gradient--radial {
        --s-gradient-type-inline: radial;
    }`,
            { type: 'CssClass' },
        );
    }

    if (finalParams.angles) {
        finalParams.angles.forEach((angle) => {
            vars.comment(
                `
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
        `,
            ).code(
                `
        .s-gradient--${angle}deg {
            --s-gradient-angle-inline: ${angle}deg;
        }
    `,
                { type: 'CssClass' },
            );
        });
    }

    let currentName;
    __STheme.getTheme().loopOnColors(({ name, variant, value }) => {
        if (currentName !== name) {
            // default gradients
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
           * <div class="s-ratio\:16-9 s-gradient\:${name}">
           *     <div class="s-center-abs">I'm a cool depth button</div>
           * </div>
           *
           * @since       2.0.0
           * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
           */
          `,
            ).code(
                `
          .s-gradient--${name} {
              @sugar.gradient(
                  $start: ${name},
                  $end: ${name}--${__STheme.get('gradient.defaultVariant')},
                  $type: ${__STheme.get('gradient.defaultType')},
                  $angle: ${__STheme.get('gradient.defaultAngle')}
              );
          }
      `,
                { type: 'CssClass' },
            );
        }
        currentName = name;

        const startColorClassName = `s-gradient:start-${name}${
            variant === 'default' ? '' : `-${variant}`
        }`;
        vars.comment(
            `/**
        * @name          ${startColorClassName}
        * @namespace          sugar.style.gradient
        * @type               CssClass
        * @platform           css
        * @status           beta
        *
        * This class allows you to apply a "<yellow>${name}</yellow>" gradient start color to any HTMLElement
        *
        * @example        html
        * <div class="s-ratio\:16-9 ${startColorClassName.replace(
            ':',
            ':',
        )}\:end-${name}${next.variant === 'default' ? '' : `-${next.variant}`}">
        *     <div class="s-center-abs">I'm a cool depth button</div>
        * </div>
        *
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
      .${startColorClassName.replace(':', '--')} {
          --s-gradient-start-color-inline: sugar.color(${name}, ${variant});
      }`,
            { type: 'CssClass' },
        );

        const endColorClassName = `s-gradient:end-${name}${
            variant === 'default' ? '' : `-${variant}`
        }`;
        vars.comment(
            `/**
      * @name          ${endColorClassName}
      * @namespace          sugar.style.gradient
      * @type               CssClass
      * @platform         css
      * @status           beta
      *
      * This class allows you to apply a "<yellow>${name}${
                variant === 'default' ? '' : `-${variant}`
            }</yellow>" gradient end color to any HTMLElement
      *
      * @example        html
      * <div class="s-ratio\:16-9 ${endColorClassName.replace(
          ':',
          ':',
      )}\:start-${name}${
                previous.variant === 'default' ? '' : `-${previous.variant}`
            } ${endColorClassName}">
      *     <div class="s-center-abs">I'm a cool depth button</div>
      * </div>
      *
      * @since            2.0.0
      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `,
        ).code(
            `
    .${endColorClassName.replace(':', '--')} {
        --s-gradient-end-color-inline: sugar.color(${name}, ${variant});
    }`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
