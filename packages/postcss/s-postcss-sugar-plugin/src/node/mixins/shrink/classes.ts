import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @as              @s.shrink.classes
 * @namespace      node.mixin.shrink
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all shrink helpers like s-shrink, s-shrink:1...10, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.shrink.classes
 *
 * @example        css
 * \@s.shrink.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginGapClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginGapClassesParams {}

export { postcssSugarPluginGapClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginGapClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginGapClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Grow
        * @namespace          sugar.style.helpers.shrink
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/shrink
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply some shrink attributes on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@s.shrink.classes;
        * 
        * @cssClass                 s-shrink             Apply the default shrink to any HTMLElement
        * ${Array.from(Array(10)).map(
            (i) => `
            * @cssClass                s-shrink:${i}          Apply the ${i} shrink to any HTMLElement
        `,
        )}
        * 
        * @example        html          Simple flex grid
        * <div class="s-flex">
        *   <div>I'm not shrinking</div>
        *   <div class="s-shrink">I'm shrinking</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    vars.comment(
        () => `/**
            * @name          s-shrink
            * @namespace          sugar.style.helpers.shrink
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows you to apply the shrink styling to any HTMLElement
            * 
            * @example        html
            * <div class="s-flex">
            *   <div>I'm not shrinking</div>
            *   <div class="s-shrink">I'm shrinking</div>
            * </div>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `,
    ).code(
        `
            .s-shrink {
                flex-shrink: 1;
            }`,
        { type: 'CssClass' },
    );

    Array.from(Array(10)).forEach((i) => {
        vars.comment(
            () => `/**
                * @name          s-shrink${i}
                * @namespace          sugar.style.helpers.shrink
                * @type               CssClass
                * @platform           css
                * @status               stable
                * 
                * This class allows you to apply the shrink "${i}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex">
                *   <div>I'm not shrinking</div>
                *   <div class="s-shrink:${i}">I'm shrinking</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `,
        ).code(
            `
                .s-shrink-${i} {
                    flex-shrink: ${i};
                }`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
