import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @namespace      node.mixin.fit
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate all the clearfix helper classes like s-clearfix:micro, etc...
 *
 * @return        {Css}        The generated css
 *
 * @snippet         @sugar.fit.classes
 * 
 * @example        css
 * \@sugar.fit.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginFixClassesInterface extends __SInterface {
    static get _definition() {
        return {
            defaultFitSize: {
                type: 'String',
                default: 'fill',
            },
        };
    }
}

export interface IPostcssSugarPluginFitClassesParams {
    defaultFitSize;
}

export { postcssSugarPluginFixClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginFitClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginFitClassesParams = {
        defaultFitSize: 'fill',
        ...params,
    };

    const vars = new CssVars();
    const fitSizes = ['fill', 'cover', 'contain', 'none'];

    vars.comment(
        () => `
      /**
        * @name          Fit Sizes
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/fit-sizes
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a fit size on any HTMLElement.
        * On image and video, uses \`object-fit\` property, on all others,
        * simply fill the element using an absolute position, top: 0, left: 0 and width/height: 100%.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.fit.classes;
        * 
        * .my-element {
        *   \\@sugar.fit(fill);
        * }  
        * 
        ${fitSizes
            .map((fitSizeName) => {
                return ` * @cssClass     s-fit:${fitSizeName}       Apply the ${fitSizeName} fit size`;
            })
            .join('\n')}
        * 
        ${fitSizes
            .map((fitSizeName) => {
                return ` * @example         html        ${fitSizeName}
            *   <div class="s-ratio\:16-9 s-bg:ui">
            *       <img class="s-fit\:${fitSizeName} s-radius" src="https://picsum.photos/1000/1000" />
            *   </div>
            * `;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    fitSizes.forEach((fitSizeName) => {
        vars.comment(
            () => `/**
                * @name          s-fit:${fitSizeName}
                * @namespace          sugar.style.fit
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
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `,
        ).code(
            `
                .s-fit--${fitSizeName} {
                    @sugar.fit(${fitSizeName});
                }`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
