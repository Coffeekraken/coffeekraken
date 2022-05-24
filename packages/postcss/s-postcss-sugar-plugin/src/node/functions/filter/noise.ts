import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           noise
 * @namespace      node.function.filter
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./noise
 * @status        beta
 *
 * This function allows you to get a noise effect image back.
 *
 * @param       {Number}        [frequency=0.65]      The frequency of the noise
 * @param       {String}        [width='5000px']        The width of the noise
 * @param       {String}        [height='5000px']       The height of the noise
 * @return        {Css}         The generated css
 *
 * @example        css
 * .my-element {
 *    filter: sugar.filter.noise();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginDisabledInterface extends __SInterface {
    static get _definition() {
        return {
            frequency: {
                type: 'Number',
                required: true,
                default: 0.65,
            },
            width: {
                type: 'String',
                required: true,
                default: '5000px',
            },
            height: {
                type: 'String',
                required: true,
                default: '5000px',
            },
        };
    }
}

export interface IPostcssSugarPluginDisabledParams {
    frequency: number;
    width: string;
    height: string;
}

export { postcssSugarPluginDisabledInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginDisabledParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginDisabledParams = {
        frequency: 0.65,
        width: '5000px',
        height: '5000px',
        ...params,
    };
    return `url('data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${finalParams.width} ${finalParams.height}" style="width:${finalParams.width};height:${finalParams.height};"><style type="text/css"><![CDATA[ rect{filter:url(#filter);width:${finalParams.width};height:${finalParams.height};} ]]></style><filter id="filter"><feTurbulence type="fractalNoise" baseFrequency="${finalParams.frequency}" numOctaves="3" stitchTiles="stitch" /></filter><rect filter="url(#filter)" /></svg>`,
    )}')`;
}
