import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name            typo
 * @as              @sugar.typo
 * @namespace       node.mixin.typo
 * @type            PostcssMixin
 * @platform        css
 * @status          beta
 *
 * This mixin allows you to apply a typo style to any of your element.
 *
 * @param           {String}            typo            The typo you want like "h1", "p" or all the typo defined in the themeTypo.config.ts config
 * @return          {Css}                                   The generated css
 *
 * @snippet         @sugar.link.stretch
 *
 * @example         css
 * .my-cool-element {
 *      @sugar.typo(h1);
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginTypoInterface extends __SInterface {
    static get _definition() {
        return {
            typo: {
                type: 'String',
                description:
                    'The typo you want. Can be any of the typos defined in the themeTypo config',
                required: true,
            },
        };
    }
}

export interface IPostcssSugarPluginTypoParams {
    typo: string;
}

export { postcssSugarPluginTypoInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginTypoParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    // @ts-ignore
    const finalParams: IPostcssSugarPluginTypoParams = {
        typo: 'h1',
        ...params,
    };

    const vars = new CssVars();

    const typosObj = __STheme.get('typo'),
        typoObj = typosObj[finalParams.typo],
        css = __STheme.jsObjectToCssProperties(typoObj.style ?? {}, {});

    vars.code(
        () => `
        ${css}
    `,
    );

    return vars;
}
