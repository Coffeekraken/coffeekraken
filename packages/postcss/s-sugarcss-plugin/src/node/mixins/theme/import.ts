import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           import
 * @as              @s.theme.import
 * @namespace      node.mixin.theme
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin simply generate all the css needed for a theme to be applied
 * in any scope. It will print all the theme variables like colors, etc, as well
 * as set the correct font style and some other small things...
 * It just import the theme but does not apply directly.
 *
 * @param       {String}            variant             The theme variant you want
 * @param       {String}            theme               The theme you want
 * @param       {Boolean}           [scope=true]           If you want to scope the theme or not
 * @return        {Css}         The generated css
 *
 * @snippet         @s.theme.import($1)
 *
 * @example        css
 * @s.theme.import(dark);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginThemeinInterface extends __SInterface {
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
                default: true,
            },
        };
    }
}

export interface ISSugarcssPluginThemeParams {
    variant: string | undefined;
    theme: string | undefined;
    scope: boolean;
}

export { SSugarcssPluginThemeinInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
    frontData,
}: {
    params: Partial<ISSugarcssPluginThemeParams>;
    atRule: any;
    replaceWith: Function;
    frontData: any;
}) {
    const finalParams: ISSugarcssPluginThemeParams = {
        variant: undefined,
        theme: undefined,
        scope: true,
        ...params,
    };

    if (!finalParams.theme) {
        finalParams.theme = frontData.theme?.theme ?? 'default';
    }
    if (!finalParams.variant) {
        finalParams.variant = frontData.theme?.variant ?? 'light';
    }

    if (!frontData.theme) {
        frontData.theme = {};
    }
    if (!frontData.theme?.themes) {
        frontData.theme.themes = [];
    }
    const currentTheme = frontData.theme.themes.find((t) => {
        return (
            t.theme === finalParams.theme && t.variant === finalParams.variant
        );
    });
    if (!currentTheme) {
        frontData.theme.themes.push({
            theme: finalParams.theme,
            variant: finalParams.variant,
        });
    }

    console.log(
        `<yellow>[@s.theme.import]</yellow> Theme imported : <magenta>${finalParams.theme}-${finalParams.variant}</magenta>`,
    );

    const vars = __STheme
        .getTheme(finalParams.theme, finalParams.variant)
        .toCssVars({
            theme: finalParams.theme,
            variant: finalParams.variant,
        });

    const selectors: string[] = [];
    if (finalParams.theme) selectors.push(`[theme^="${finalParams.theme}"]`);
    if (finalParams.variant)
        selectors.push(`[theme$="${finalParams.variant}"]`);

    if (finalParams.scope) {
        vars.unshift(`${selectors.join('')} body {`);
        vars.push(`@s.lnf.base;`);
        vars.push('}');
    } else if (atRule.parent.type === 'root') {
        vars.unshift('body {');
        vars.push(`@s.lnf.base;`);
        vars.push('}');
    } else {
        vars.push(`@s.lnf.base;`);
    }

    return vars;
}
