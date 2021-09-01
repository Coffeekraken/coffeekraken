import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __minifyVar from '../../utils/minifyVar';

class postcssSugarPluginPaddingFunctionInterface extends __SInterface {
    static definition = {
        padding: {
            type: 'String',
            values: Object.keys(__theme().config('padding')),
            default: 'default',
            required: true,
        },
        scalable: {
            type: 'Boolean',
            default: __theme().config('scalable.padding'),
        },
    };
}
export { postcssSugarPluginPaddingFunctionInterface as interface };

export interface IPostcssSugarPluginPaddingFunctionParams {
    padding: string;
    scalable: boolean;
}

export default function ({ params }: { params: Partial<IPostcssSugarPluginPaddingFunctionParams> }) {
    const finalParams: IPostcssSugarPluginPaddingFunctionParams = {
        padding: '',
        scalable: true,
        ...params,
    };

    const padding = finalParams.padding;
    let paddings = padding.split(' ').map((s) => {
        if (s === `${parseInt(s)}`) return `sugar.theme(padding.${s})`;
        return s;
    });

    if (finalParams.scalable) {
        paddings = paddings.map((p) => `sugar.scalable(${p})`);
    }

    return paddings.join(' ');
}
