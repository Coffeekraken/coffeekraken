import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginBorderWidthFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            width: {
                type: 'String',
                values: Object.keys(__STheme.config('border.width')),
                default: 'default',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginBorderWidthFunctionInterface as interface };

export interface IPostcssSugarPluginBorderWidthFunctionParams {
    width: string;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginBorderWidthFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginBorderWidthFunctionParams = {
        width: '',
        ...params,
    };

    const width = finalParams.width;

    if (__STheme.config('border.width')[width] === undefined) return width;

    const widthes = width.split(' ').map((s) => {
        const width = __STheme.config(`border.width.${s}`);
        if (!width) return width;
        return `var(${`--s-theme-border-width-${s}`}) ${
            finalParams.width !== 'default' ? '!important' : ''
        }`;
    });

    return widthes.join(' ');
}
