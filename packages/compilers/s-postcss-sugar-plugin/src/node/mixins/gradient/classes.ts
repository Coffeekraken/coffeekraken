// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

/**
 * @name           classes
 * @namespace      node.mixins.gradient
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the gradient helper classes like s-gradient:accent, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.gradient.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginGradientClassesInterface extends __SInterface {
    static definition = {
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

export interface IPostcssSugarPluginGradientClassesParams {
    types: string[];
    angles: number[];
}

export { postcssSugarPluginGradientClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginGradientClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginGradientClassesParams = {
        types: ['linear', 'radial'],
        angles: [0, 45, 90, 135, 180, 225, 270],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.types.indexOf('linear') !== -1) {
        vars.push(`/**
        * @name             s-gradient:linear
        * @namespace          sugar.css.gradient
        * @type                 CssClass
        * @platform         css
        * @status           beta
        *
        * This class allows you to apply a "<yellow>linear</yellow> gradient to any HTMLElement. Note that this will apply a linear gradient using the "<yellow>primary</yellow>" color. If you want
        * apply something different, make use of the "<cyan>s-gradient-start-{colorName}</cyan>" and "<cyan>s-gradient-end-{colorName}</cyan>" classes...
        *
        * @example        html
        * <div class="s-gradient\:linear\:accent">
        *   Hello gradient
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    .s-gradient--linear {
        --s-gradient-type-inline: linear;
    }`);
    }

    if (finalParams.types.indexOf('radial') !== -1) {
        vars.push(`/**
        * @name             s-gradient:radial
        * @namespace          sugar.css.gradient
        * @type                 CssClass
        * @platform       css
        * @status         beta
        *
        * This class allows you to apply a "<yellow>radial</yellow> gradient to any HTMLElement. Note that this will apply a radial gradient using the "<yellow>primary</yellow>" color. If you want
        * apply something different, make use of the "<cyan>s-gradient-start-{colorName}</cyan>" and "<cyan>s-gradient-end-{colorName}</cyan>" classes...
        *
        * @example        html
        * <div class="s-gradient\:radial\:accent">
        *   Hello gradient
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    .s-gradient--radial {
        --s-gradient-type-inline: radial;
    }`);
    }

    if (finalParams.angles) {
        finalParams.angles.forEach((angle) => {
            vars.push(`
        /**
         * @name        .s-gradient:${angle}deg
         * @namespace       sugar.css.gradient
         * @type            CssClass
         * @platform        css
         * @status          beta
         * 
         * This class allows you to apply an angle of "<magenta>${angle}</magenta>" you want if your gradient
         * is of type "<yellow>linear</yellow>" of course.
         * 
         * @example             html
         * <div class="s-ratio\:16-9 s-gradient\:linear\:${angle}deg\:start-primary-50\:end-primary-70">
         *     <div class="s-center-abs">I'm a cool depth button</div>
         * </div>
         * 
         * @since            2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-gradient--${angle}deg {
            --s-gradient-angle-inline: ${angle}deg;
        }
    `);
        });
    }

    let currentName;
    __theme().loopOnColors(({ name, variant, value }) => {
        if (currentName !== name) {
            // default gradients
            vars.push(`
          /**
           * @name        .s-gradient:${name}
           * @namespace   sugar.css.gradient
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
           * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
           */
          .s-gradient--${name} {
              @sugar.gradient(
                  $start: ${name},
                  $end: ${name}--${__theme().config('gradient.defaultVariant')},
                  $type: ${__theme().config('gradient.defaultType')},
                  $angle: ${__theme().config('gradient.defaultAngle')}
              );
          }
      `);
        }
        currentName = name;

        const startColorClassName = `s-gradient:start-${name}${variant === 'default' ? '' : `-${variant}`}`;
        vars.push(`/**
        * @name          ${startColorClassName}
        * @namespace          sugar.css.gradient
        * @type               CssClass
        * @platform           css
        * @status           beta
        *
        * This class allows you to apply a "<yellow>${name}</yellow>" gradient start color to any HTMLElement
        *
        * @example        html
        * <div class="s-ratio\:16-9 ${startColorClassName.replace(':', ':')}\:end-${name}${
            next.variant === 'default' ? '' : `-${next.variant}`
        }">
        *     <div class="s-center-abs">I'm a cool depth button</div>
        * </div>
        *
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
      .${startColorClassName.replace(':', '--')} {
          --s-gradient-start-color-inline: sugar.color(${name}, ${variant});
      }`);

        const endColorClassName = `s-gradient:end-${name}${variant === 'default' ? '' : `-${variant}`}`;
        vars.push(`/**
      * @name          ${endColorClassName}
      * @namespace          sugar.css.gradient
      * @type               CssClass
      * @platform         css
      * @status           beta
      *
      * This class allows you to apply a "<yellow>${name}${
            variant === 'default' ? '' : `-${variant}`
        }</yellow>" gradient end color to any HTMLElement
      *
      * @example        html
      * <div class="s-ratio\:16-9 ${endColorClassName.replace(':', ':')}\:start-${name}${
            previous.variant === 'default' ? '' : `-${previous.variant}`
        } ${endColorClassName}">
      *     <div class="s-center-abs">I'm a cool depth button</div>
      * </div>
      *
      * @since            2.0.0
      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
    .${endColorClassName.replace(':', '--')} {
        --s-gradient-end-color-inline: sugar.color(${name}, ${variant});
    }`);
    });

    replaceWith(vars);
}
