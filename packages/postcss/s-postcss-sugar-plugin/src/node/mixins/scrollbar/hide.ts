import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           hide
 * @as              @sugar.scrollbar.hide
 * @namespace      node.mixin.scrollbar
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to hide your scrollbar
 *
 * @return        {Css}           The generated css
 *
 * @snippet         @sugar.scrollbar.hide
 *
 * @example        css
 * body {
 *    @sugar.scrollbar.hide();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class PostcssSugarPluginScrollbarHideInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginScrollbarHideParams {
    size: string;
    color: string;
    background: string;
}

export { PostcssSugarPluginScrollbarHideInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginScrollbarHideParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginScrollbarHideParams = {
        ...params,
    };

    const vars: string[] = [];

    // lnf
    vars.push(`
        -ms-overflow-style: none;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }
  `);

    return vars;
}
