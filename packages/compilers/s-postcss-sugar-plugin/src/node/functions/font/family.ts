import __SInterface from '@coffeekraken/s-interface';
import __isValidUnitValue from '@coffeekraken/sugar/shared/css/isValidUnitValue';

class postcssSugarPluginFontFamilyInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                name: {
                    type: 'String',
                    required: true,
                    alias: 'n',
                },
            })
        );
    }
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
