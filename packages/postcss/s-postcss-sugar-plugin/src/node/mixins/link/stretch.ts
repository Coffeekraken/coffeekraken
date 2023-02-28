import __SInterface from '@coffeekraken/s-interface';

/**
 * @name            stretch
 * @namespace       node.mixin.link
 * @type            PostcssMixin
 * @platform        css
 * @status          beta
 *
 * This mixin allows you to stretch a link clickable area without having to change the actual link css.
 * It uses the `after` pseudo class to create a new clickable area that will spend until it reach an element that as a position specified.
 *
 * @return          {Css}                                   The generated css
 *
 * @snippet         @sugar.link.stretch
 * 
 * @example         css
 * .my-cool-element {
 *      @sugar.link.stretch;
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginLinkStretchInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginLinkStretchParams {
    dotPath: string;
    exclude: string[];
    only: string[];
}

export { postcssSugarPluginLinkStretchInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginLinkStretchParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    // @ts-ignore
    const finalParams: IPostcssSugarPluginLinkStretchParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
    `,
    ).code(
        () => `
        &:after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
            pointer-events: auto;
            content: '';
            background-color: rgba(0, 0, 0, 0);
        }
    `,
    );

    return vars;
}
