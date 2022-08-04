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
export { postcssSugarPluginGradientClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
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
    __STheme.getTheme().loopOnColors(({ name, schema, value }) => {
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
                  $end: ${name}--${__STheme.get('gradient.defaultVariant')},
                  $type: ${__STheme.get('gradient.defaultType')},
                  $angle: ${__STheme.get('gradient.defaultAngle')}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0sMENBQTJDLFNBQVEsWUFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO2dCQUM1QixPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO2dCQUM3QixLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7Z0JBQ3hDLEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT0QsT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRW5FLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFDM0IsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQ3BDLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUs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