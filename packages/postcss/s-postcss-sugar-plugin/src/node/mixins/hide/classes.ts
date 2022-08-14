import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @namespace      node.mixin.hide
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the hide helper classes like ```.s-hide```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.hide.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginHideClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginHideClassesParams {}

export { postcssSugarPluginHideClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginHideClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginHideClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `/**
    * @name          s-hide
    * @namespace          sugar.style.hide
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to hide any HTMLElement
    * 
    * @example        html
    * <div class="s-hide s-bg:accent">
    *     <p>I'm a cool hide container</p>
    * </div>
    */
    `,
    ).code(
        `
    .s-hide {
        display: none;
    }`,
        { type: 'CssClass' },
    );

    return vars;
}
