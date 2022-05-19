import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          radius
 * @namespace     node.function.border
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./radius
 * @status        beta
 *
 * This function allows you to get a border radius value depending on your theme config
 *
 * @param       {String}        radius      The radius to get
 * @param       {Boolean}       [scalable='theme.scalable.padding']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    border-radius: sugar.border.radius(30);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginBorderRadiusFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            radius: {
                type: 'String',
                values: Object.keys(__STheme.get('border.radius')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.get('scalable.padding'),
            },
        };
    }
}
export { postcssSugarPluginBorderRadiusFunctionInterface as interface };

export interface IPostcssSugarPluginBorderRadiusFunctionParams {
    radius: string;
    scalable: boolean;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginBorderRadiusFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginBorderRadiusFunctionParams = {
        radius: '',
        scalable: true,
        ...params,
    };

    let radiuses = finalParams.radius.split(' ').map((s) => {
        let registeredValue,
            factor = '';

        // try to get the padding with the pased
        try {
            registeredValue = __STheme.get(`border.radius.${s}`);
        } catch (e) {}

        // default return simply his value
        if (s === 'default') {
            // @ts-ignore
            factor = '1';
        } else if (registeredValue !== undefined) {
            factor = `sugar.theme(border.radius.${s}, ${finalParams.scalable})`;
        } else if (
            isNaN(parseFloat(s)) &&
            s.match(/[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)
        ) {
            // support dotPath
            factor = `sugar.theme(${s}, ${finalParams.scalable})`;
        } else if (!isNaN(parseFloat(s))) {
            // support simple number
            factor = `${s}`;
        } else {
            throw new Error(
                `<yellow>[s-postcss-sugar-plugin]</yellow> Padding "<cyan>${s}</cyan>" is not a valid value`,
            );
        }
        // generate css value
        return `calc(sugar.theme(border.radius.default) * ${factor})`;
    });

    return radiuses.join(' ');
}
