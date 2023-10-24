import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           classes
 * @as              @s.opacity.classes
 * @namespace      node.mixin.opacity
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the margin helper classes like s-opacity:10, s-opacity:40, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.opacity.classes
 *
 * @example        css
 * @s.opacity.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginOpacityClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginOpacityClassesParams {}

export { postcssSugarPluginOpacityClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginOpacityClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginOpacityClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    const opacityObj = __STheme.get('opacity');

    Object.keys(opacityObj).forEach((opacity) => {
        const opacityCls = `s-opacity:${opacity}`;
        vars.comment(
            () => `/**
    * @name            ${opacityCls}
    * @namespace          sugar.style.helpers.opacity
    * @type             CssClass
    * @platform             css
    * @status               stable
    * 
    * This class allows you to apply the "<yellow>${opacity}</yellow>" opacity style around any HTMLElement
    * 
    * @example      html
    * <span class="${opacityCls}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `,
        ).code(
            `
   .${opacityCls.replace(':', '-')} {
        opacity: s.opacity(${opacity});
   }`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
