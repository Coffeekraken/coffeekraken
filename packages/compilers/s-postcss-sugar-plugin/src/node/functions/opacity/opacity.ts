import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginOpacityFunctionInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                opacity: {
                    type: 'String',
                    values: Object.keys(__STheme.config('opacity')),
                    default: '100',
                    required: true,
                },
            })
        );
    }
}
export { postcssSugarPluginOpacityFunctionInterface as interface };

export interface IPostcssSugarPluginOpacityFunctionParams {
    opacity: string;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginOpacityFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginOpacityFunctionParams = {
        opacity: '100',
        ...params,
    };

    const opacity = finalParams.opacity;

    if (__STheme.config('opacity')[opacity] === undefined) return opacity;

    const opacityRes = opacity.split(' ').map((s) => {
        const size = __STheme.config(`opacity.${s}`);
        if (!size) return size;
        return `var(${`--s-theme-opacity-${s}`}, ${size})`;
    });

    return opacityRes.join(' ');
}
