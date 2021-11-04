import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginMarginFunctionInterface extends __SInterface {
    static definition = {
        margin: {
            type: 'String',
            values: Object.keys(__STheme.config('margin')),
            default: 'default',
            required: true,
        },
        scalable: {
            type: 'Boolean',
            default: __STheme.config('scalable.margin'),
        },
    };
}
export { postcssSugarPluginMarginFunctionInterface as interface };

export interface IPostcssSugarPluginMarginFunctionParams {
    margin: string;
    scalable: boolean;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginMarginFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginMarginFunctionParams = {
        margin: '',
        scalable: false,
        ...params,
    };

    const margin = finalParams.margin;
    let margins = margin.split(' ').map((s) => {
        if (s === `${parseInt(s)}`)
            return `sugar.theme(margin.${s}, ${finalParams.scalable})`;
        return s;
    });

    return margins.join(' ');
}
