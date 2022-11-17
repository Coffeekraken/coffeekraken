import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           classes
 * @namespace      node.mixin.order
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the order helper classes like s-order:1, s-order:2, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.order.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginOrderClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginOrderClassesParams {}

export { postcssSugarPluginOrderClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginOrderClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginOrderClassesParams = {
        ...params,
    };

    const count = __STheme.get('helpers.order.count');
    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Order
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/order
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some order attributes on any HTMLElement.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.order.classes;
        * 
        ${Array.from(Array(count))
            .map(
                (v, i) => `
            * @cssClass             s-order-${i}        Apply the order ${i}
        `,
            )
            .join('\n')}
        * 
        * @example        html          Simple order
        * <div class="s-flex s-gap:40">
        *   <div class="s-order:3 s-p:30 s-ratio:16-9 s-flex-item:grow s-bg:main-surface s-radius">1</div>
        *   <div class="s-order:1 s-p:30 s-ratio:16-9 s-flex-item:grow s-bg:main-surface s-radius">2</div>
        *   <div class="s-order:2 s-p:30 s-ratio:16-9 s-flex-item:grow s-bg:main-surface s-radius">3</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    Array.from(Array(count)).forEach((v, i) => {
        vars.comment(
            () => `/**
                * @name          s-order:${i}
                * @namespace          sugar.style.order
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the order ${i} styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex">
                *   <div class="s-order:${i} s-p:20 s-bg:accent s-radius">World</div>
                *   <div class="s-p:20 s-bg:main s-radius">World</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `,
        ).code(
            `
            .s-order--${i} {
                order: ${i};
            }`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
