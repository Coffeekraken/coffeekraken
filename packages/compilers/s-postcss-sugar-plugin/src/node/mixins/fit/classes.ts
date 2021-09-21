import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

/**
 * @name           classes
 * @namespace      node.mixins.clearfix
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to generate all the clearfix helper classes like s-clearfix:micro, etc...
 *
 * @return        {Css}        The generated css
 *
 * @example         postcss
 * \@sugar.clearfix.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginFixClassesInterface extends __SInterface {
    static definition = {
        defaultFitSize: {
            type: 'String',
            default: 'fill',
        },
    };
}

export interface IPostcssSugarPluginFitClassesParams {
    defaultFitSize;
}

export { postcssSugarPluginFixClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginFitClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginFitClassesParams = {
        defaultFitSize: 'fill',
        ...params,
    };

    const vars: string[] = [];
    const fitSizes = ['fill', 'cover', 'contain', 'none'];

    vars.push(`
      /**
        * @name          Fit Sizes
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/fit-sizes
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a fit size on any HTMLElement.
        * On image and video, uses \`object-fit\` property, on all others,
        * simply fill the element using an absolute position, top: 0, left: 0 and width/height: 100%.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${fitSizes
            .map((fitSizeName) => {
                return ` * @cssClass     s-fit:${fitSizeName}       Apply the ${fitSizeName} fit size`;
            })
            .join('\n')}
        * 
        * @example        html
        ${fitSizes
            .map((fitSizeName) => {
                return ` * <!-- ${fitSizeName} style -->
            * <div class="s-mbe:50">
            *   <h3 class="s-color:accent s-font:30 s-mbe:30">${fitSizeName} fit size</h3>
            *   <div class="s-ratio\:16-9 s-bg:ui">
            *       <img class="s-fit\:${fitSizeName}" src="https://picsum.photos/1000/1000" />
            *   </div>
            * </div>
            * `;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    fitSizes.forEach((fitSizeName) => {
        vars.push(`/**
                * @name          s-fit:${fitSizeName}
                * @namespace          sugar.css.fit
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${fitSizeName}</yellow>" fit size to any HTMLElement. Work best on images and videos
                * 
                * @example        html
                * <div class="s-ratio\:16-9 s-bg:ui">
                *       <img class="s-fit\:${fitSizeName} src="https://picsum.photos/200/200" />
                *   </div>
                * 
                * @since        2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                */
                .s-fit--${fitSizeName} {
                    @sugar.fit(${fitSizeName});
                }`);
    });

    replaceWith(vars);
}
