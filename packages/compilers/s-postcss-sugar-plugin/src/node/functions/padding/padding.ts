import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginPaddingFunctionInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                padding: {
                    type: 'String',
                    values: Object.keys(__STheme.config('padding')),
                    default: 'default',
                    required: true,
                },
                scalable: {
                    type: 'Boolean',
                    default: __STheme.config('scalable.padding'),
                },
            })
        );
    }
}
export { postcssSugarPluginPaddingFunctionInterface as interface };

export interface IPostcssSugarPluginPaddingFunctionParams {
    padding: string;
    scalable: boolean;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginPaddingFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginPaddingFunctionParams = {
        padding: '',
        scalable: true,
        ...params,
    };

    const padding = finalParams.padding;
    let paddings = padding.split(' ').map((s) => {
        if (s === `${parseInt(s)}`)
            return `sugar.theme(padding.${s}, ${finalParams.scalable})`;
        return s;
    });

    return paddings.join(' ');
}
