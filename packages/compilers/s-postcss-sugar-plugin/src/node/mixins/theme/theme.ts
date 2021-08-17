import __SInterface from '@coffeekraken/s-interface';
import { themeDefinition } from '../../utils/theme';
import __themeToVars from '../../utils/themeToVars';

/**
 * @name           theme
 * @namespace      node.mixins.theme
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin simply generate all the css needed for a theme to be applied
 * in any scope. It will print all the theme variables like colors, etc, as well
 * as set the correct font style and some other small things...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.theme(light);
 * .my-cool-element {
 *    \@sugar.theme(dark);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginThemeinInterface extends __SInterface {
    static definition = {
        theme: themeDefinition,
        scope: {
            type: 'Boolean',
            default: false,
        },
    };
}

export interface IPostcssSugarPluginThemeParams {
    theme: string;
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
        theme: '',
        scope: false,
        ...params,
    };

    const vars = __themeToVars(finalParams.theme);

    if (finalParams.scope) {
        vars.unshift(`.s-theme--${finalParams.theme} {`);
        vars.push(`@sugar.lnf.base;`);
        vars.push('}');
    } else if (atRule.parent.type === 'root') {
        vars.unshift(':root {');
        vars.push(`@sugar.lnf.base;`);
        vars.push('}');
    } else {
        vars.push(`@sugar.lnf.base;`);
    }

    replaceWith(vars);
}
