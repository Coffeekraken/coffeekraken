import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __isValidUnitValue from '@coffeekraken/sugar/shared/css/isValidUnitValue';
import __minifyVar from '../../utils/minifyVar';

class postcssSugarPluginFontFamilyInterface extends __SInterface {
    static definition = {
        name: {
            type: 'String',
            required: true,
            alias: 'n',
        },
    };
}
export { postcssSugarPluginFontFamilyInterface as interface };

export interface IPostcssSugarPluginFontFamilyParams {
    name: string;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginFontFamilyParams>;
}) {
    const finalParams: IPostcssSugarPluginFontFamilyParams = {
        name: '',
        ...params,
    };

    const name = finalParams.name;

    if (__isValidUnitValue(name)) {
        return name;
    }

    return `sugar.theme(font.family.${name}.font-family)`;
}
