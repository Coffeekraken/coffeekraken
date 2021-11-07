// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginThemeInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
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
            })
        );
    }
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
            return `sugar.scalable(${__STheme.cssVar(
                finalParams.dotPath,
                finalParams.fallback,
            )})`;
        } else {
            return __STheme.cssVar(finalParams.dotPath, finalParams.fallback);
        }
    } else {
        if (finalParams.scalable) {
            return `sugar.scalable(${__STheme.config(finalParams.dotPath)})`;
        } else {
            return __STheme.config(finalParams.dotPath);
        }
    }
}
