import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name           classes
 * @namespace      node.mixin.scale
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the scale helper classes like s-scale:01, s-scale:12, etc.
 * The generated scales are specified in the config.theme.scale configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.scale.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginScaleClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginScaleClassesParams {}

export { postcssSugarPluginScaleClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginScaleClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginScaleClassesParams = {
        ...params,
    };

    const scaleObj = __STheme.get('scale');

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Scale
        * @namespace          sugar.style.tools
        * @type               Styleguide
        * @menu           Styleguide / Tools        /styleguide/tools/scale
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply a scale to any supported UI elements.
        * This scale does not use the transform property but increase actual values like \`padding\`,
        * \`margin\`, etc... In fact, all the properties setted with the \`sugar.scallable\` function.
        * It's usually a good practice to set the \`font-size\` of your UI element to \`sugar.scalable(1rem)\`
        * and then to set inner values using \`em\` unit.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Object.keys(scaleObj)
            .map((scaleName) => {
                return ` * @cssClass     s-scale:${scaleName.replace('/', '-')}
                }            Apply the ${scaleName} scale`;
            })
            .join('\n')}
        * 
        * @example        html
        ${Object.keys(scaleObj)
            .map((scaleName) => {
                return ` * <!-- ${scaleName} scale -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Scale ${scaleName}</h3>
            *   <div class="s-scale:${scaleName}">
            *       <a class="s-btn">${__faker.name.findName()}</a>
            *   </div>
            * </div>
            * `;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    Object.keys(scaleObj).forEach((scaleName) => {
        const scaleValue = scaleObj[scaleName];
        vars.comment(
            () => `/**
  * @name          s-scale:${scaleName}
  * @namespace          sugar.style.scale
  * @type               CssClass
  * @platform             css
  * @status             beta
  * 
  * This class allows you to apply a "<yellow>${scaleName}</yellow>" scale style to any HTMLElement.
  * Note that this scale is not applied using the "transform" property but it will scale
  * all the properties that uses the function "sugar.scalable" to set his value.
  * 
  * @example        html
  * <h1 class="s-font:40 s-mbe:30">I'm a cool title</h1>
  * <h1 class="s-font:40 s-scale:15">I'm a cool scaled title</h1>
  * 
  * since           2.0.0
  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
  */
 `,
        ).code(`
.s-scale--${scaleName} {
    --s-scale: ${scaleValue};
}`);
    });

    return vars;
}
