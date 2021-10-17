// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SColor from '@coffeekraken/s-color';
import __theme from '../../utils/theme';
import __isColor from '@coffeekraken/sugar/shared/is/color';
import __themeVar from '../../utils/themeVar';

class postcssSugarPluginThemeInterface extends __SInterface {
    static definition = {
        dotPath: {
            type: 'String',
            required: true,
        },
        scalable: {
            type: 'Boolean',
            default: false,
        },
        return: {
            type: 'String',
            values: ['var', 'value'],
            default: 'var',
        },
        fallback: {
            type: 'Boolean',
            default: true,
        },
    };
}
export { postcssSugarPluginThemeInterface as interface };

export interface IPostcssSugarPluginThemeParams {
    dotPath: string;
    scalable: boolean;
    return: 'var' | 'value';
    fallback: boolean;
}

export default function theme({
    params,
}: {
    params: Partial<IPostcssSugarPluginThemeParams>;
}) {
    const finalParams: IPostcssSugarPluginThemeParams = {
        ...params,
    };
    if (finalParams.return === 'var') {
        if (finalParams.scalable) {
            return `sugar.scalable(${__themeVar(
                finalParams.dotPath,
                finalParams.fallback,
            )})`;
        } else {
            return __themeVar(finalParams.dotPath, finalParams.fallback);
        }
    } else {
        if (finalParams.scalable) {
            return `sugar.scalable(${__theme().config(finalParams.dotPath)})`;
        } else {
            return __theme().config(finalParams.dotPath);
        }
    }
}
