import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __isValidUnitValue from '@coffeekraken/sugar/shared/css/isValidUnitValue';
import __minifyVar from '../../utils/minifyVar';

class postcssSugarPluginFontSizeInterface extends __SInterface {
    static definition = {
        name: {
            type: 'String',
            required: true,
            alias: 'n',
        },
        scalable: {
            type: 'Boolean',
            default: true,
        },
    };
}
export { postcssSugarPluginFontSizeInterface as interface };

export interface IPostcssSugarPluginFontSizeParams {
    name: string;
    scalable: boolean;
}

export default function ({ params }: { params: Partial<IPostcssSugarPluginFontSizeParams> }) {
    const finalParams: IPostcssSugarPluginFontSizeParams = {
        name: '',
        scalable: true,
        ...params,
    };

    const name = finalParams.name;

    if (__isValidUnitValue(name)) {
        if (finalParams.scalable) return `sugar.scalable(${name})`;
        return name;
    }

    if (finalParams.scalable) return `sugar.scalable(sugar.theme(font.size.${name}))`;
    return `sugar.theme(font.size.${name})`;
}
