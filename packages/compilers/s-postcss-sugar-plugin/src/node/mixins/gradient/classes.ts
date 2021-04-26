import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

class postcssSugarPluginGradientClassesInterface extends __SInterface {
  static definition = {
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
}

export interface IPostcssSugarPluginGradientClassesParams {
  types: string[];
  angles: number[];
}

export { postcssSugarPluginGradientClassesInterface as interface };

export default function (
  params: Partial<IPostcssSugarPluginGradientClassesParams> = {},
  atRule,
  processNested
) {
  const finalParams: IPostcssSugarPluginGradientClassesParams = {
    types: ['linear', 'radial'],
    angles: [0, 45, 90, 135, 180, 225, 270],
    ...params
  };

  const colorsObj = __theme().config('color');

  const vars: string[] = [];

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
  __theme().loopOnColors(({ name, modifier, value, previous, next }) => {
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
                  $end: ${name}--${__theme().config(
        'gradient.defaultModifier'
      )},
                  $type: ${__theme().config('gradient.defaultType')},
                  $angle: ${__theme().config('gradient.defaultAngle')}
              );
          }
      `);
    }
    currentName = name;

    const startColorClassName = `s-gradient-start-${name}${
      modifier === 'default' ? '' : `-${modifier}`
    }`;
    vars.push(`/**
        * @name          .${startColorClassName}
        * @namespace          sugar.css.gradient
        * @type               CssClass
        *
        * This class allows you to apply a "<yellow>${name}</yellow>" gradient start color to any HTMLElement
        *
        * @example        html
        * <div class="s-ratio-16-9 s-gradient-linear ${startColorClassName} s-gradient-end-${name}${
      next.modifier === 'default' ? '' : `-${next.modifier}`
    }">
        *     <div class="s-center-abs">I'm a cool depth button</div>
        * </div>
        *
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
      .${startColorClassName} {
          --s-gradient-start-color-inline: sugar.color(${name}, ${modifier});
      }`);

    const endColorClassName = `s-gradient-end-${name}${
      modifier === 'default' ? '' : `-${modifier}`
    }`;
    vars.push(`/**
      * @name          .${endColorClassName}
      * @namespace          sugar.css.gradient
      * @type               CssClass
      *
      * This class allows you to apply a "<yellow>${name}${
      modifier === 'default' ? '' : `-${modifier}`
    }</yellow>" gradient end color to any HTMLElement
      *
      * @example        html
      * <div class="s-ratio-16-9 s-gradient-linear s-gradient-start-${name}${
      previous.modifier === 'default' ? '' : `-${previous.modifier}`
    } ${endColorClassName}">
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
