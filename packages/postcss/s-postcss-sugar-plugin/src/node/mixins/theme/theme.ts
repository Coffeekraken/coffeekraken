import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           theme
 * @namespace      node.mixin.theme
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin simply generate all the css needed for a theme to be applied
 * in any scope. It will print all the theme variables like colors, etc, as well
 * as set the correct font style and some other small things...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.theme($1)
 * 
 * @example        css
 * \@sugar.theme(light);
 * .my-cool-element {
 *    \@sugar.theme(dark);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginThemeinInterface extends __SInterface {
    static get _definition() {
        return {
            variant: {
                type: 'String',
            },
            theme: {
                type: 'String',
            },
            scope: {
                type: 'Boolean',
                default: false,
            },
        };
    }
}

export interface IPostcssSugarPluginThemeParams {
    variant: string | undefined;
    theme: string | undefined;
    scope: boolean;
}

export { postcssSugarPluginThemeinInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginThemeParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginThemeParams = {
        variant: undefined,
        theme: undefined,
        scope: false,
        ...params,
    };

    const vars = __STheme.toCssVars({
        theme: finalParams.theme,
        variant: finalParams.variant,
    });

    const selectors: string[] = [];
    if (finalParams.theme) selectors.push(`[theme^="${finalParams.theme}"]`);
    if (finalParams.variant)
        selectors.push(`[theme$="${finalParams.variant}"]`);

    if (finalParams.scope) {
        vars.unshift(`${selectors.join('')} body {`);
        vars.push(`@sugar.lnf.base;`);
        vars.push('}');
    } else if (atRule.parent.type === 'root') {
        vars.unshift('body {');
        vars.push(`@sugar.lnf.base;`);
        vars.push('}');
    } else {
        vars.push(`@sugar.lnf.base;`);
    }

    return vars;
}
