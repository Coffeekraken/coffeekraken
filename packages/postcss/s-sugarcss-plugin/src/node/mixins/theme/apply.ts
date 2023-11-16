import __SInterface from '@coffeekraken/s-interface';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           apply
 * @as              @s.theme.apply
 * @namespace      node.mixin.theme
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin simply apply a theme in the desired scope
 *
 * @param       {String}            variant             The theme variant you want
 * @param       {String}            theme               The theme you want
 * @param       {Boolean}           [scope=false]           If you want to scope the theme or not
 * @return        {Css}         The generated css
 *
 * @snippet         @s.theme.apply($1)
 *
 * @example        css
 * @s.theme.apply(light);
 * .my-cool-element {
 *    @s.theme.apply(dark);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginThemeinInterface extends __SInterface {
    static get _definition() {
        return {
            variant: {
                type: 'String',
                default: 'light',
            },
            theme: {
                type: 'String',
                default: 'default',
            },
            scope: {
                type: 'Boolean',
                default: false,
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
        scope: false,
        ...params,
    };

    // setting theme from sugar.json
    const sugarJsonInstance = new __SSugarJson();
    const sugarJson = sugarJsonInstance.current();
    if (!finalParams.theme && sugarJson.theme?.theme) {
        finalParams.theme = sugarJson.theme.theme;
        console.log(
            `<yellow>[@s.theme.apply]</yellow> Theme "<magenta>${sugarJson.theme.theme}</magenta>" applied from the <cyan>sugar.json</cyan> file...`,
        );
    }
    if (!finalParams.variant && sugarJson.theme?.variant) {
        finalParams.variant = sugarJson.theme.variant;
        console.log(
            `<yellow>[@s.theme.apply]</yellow> Theme variant "<magenta>${sugarJson.theme.variant}</magenta>" applied from the <cyan>sugar.json</cyan> file...`,
        );
    }

    console.log(
        `<yellow>[@s.theme.apply]</yellow>  Theme applied  : <magenta>${finalParams.theme}-${finalParams.variant}</magenta>`,
    );

    if (!frontData.theme) {
        frontData.theme = {};
    }
    if (!frontData.theme?.themes) {
        frontData.theme.themes = [];
    }
    frontData.theme.theme = finalParams.theme;
    frontData.theme.variant = finalParams.variant;
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
        if (atRule.parent.type === 'root') {
            frontData.theme.themes.at(-1).default = true;
        }
    }

    const vars = __STheme.current.toCssVars({
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
