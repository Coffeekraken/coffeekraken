import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @as              @s.grow.classes
 * @namespace      node.mixin.grow
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all grow helpers like s-grow, s-grow:1...10, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.grow.classes
 *
 * @example        css
 * @s.grow.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginGapClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface ISSugarcssPluginGapClassesParams {}

export { SSugarcssPluginGapClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginGapClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginGapClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Grow
        * @namespace          sugar.style.helpers.grow
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/grow
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply some grow attributes on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.grow.classes;
        * 
        * @cssClass                 s-grow             Apply the default grow to any HTMLElement
        * ${Array.from(Array(10)).map(
            (i) => `
            * @cssClass                s-grow:${i}          Apply the ${i} grow to any HTMLElement
        `,
        )}
        * 
        * @example        html          Simple flex grid
        * <div class="s-flex">
        *   <div>I'm not growing</div>
        *   <div class="s-grow">I'm growing</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    vars.comment(
        () => `/**
            * @name          s-grow
            * @namespace          sugar.style.helpers.grow
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows you to apply the grow styling to any HTMLElement
            * 
            * @example        html
            * <div class="s-flex">
            *   <div>I'm not growing</div>
            *   <div class="s-grow">I'm growing</div>
            * </div>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `,
    ).code(
        `
            .s-grow {
                flex-grow: 1;
            }`,
        { type: 'CssClass' },
    );

    Array.from(Array(10)).forEach((i) => {
        vars.comment(
            () => `/**
                * @name          s-grow${i}
                * @namespace          sugar.style.helpers.grow
                * @type               CssClass
                * @platform           css
                * @status               stable
                * 
                * This class allows you to apply the grow "${i}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex">
                *   <div>I'm not growing</div>
                *   <div class="s-grow:${i}">I'm growing</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `,
        ).code(
            `
                .s-grow-${i} {
                    flex-grow: ${i};
                }`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
