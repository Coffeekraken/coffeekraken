import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @as          @s.hide.classes
 * @namespace      node.mixin.hide
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the hide helper classes like ```.s-hide```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.hide.classes
 *
 * @example        css
 * @s.hide.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginHideClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface ISSugarcssPluginHideClassesParams {}

export { SSugarcssPluginHideClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginHideClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginHideClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `/**
    * @name          s-hide
    * @namespace          sugar.style.helpers.hide
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to hide any HTMLElement
    * 
    * @example        html
    * <div class="s-hide s-bc:accent">
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
