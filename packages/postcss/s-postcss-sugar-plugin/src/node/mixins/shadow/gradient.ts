import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           shadow
 * @as              @s.shadow.gradient
 * @namespace      node.mixin.shadow
 * @type           PostcssMixin
 * @platform        css
 * @status        alpha
 *
 * This mixin allows you to apply a linear gradient shadow to any HTMLElement.
 * Note that this mixin make use of the :before pseudo class.
 *
 * @param       {Number|String}         [x=0]           The x offset
 * @param       {Number|String}         [y=0]           The y offset
 * @param       {Number|String}         [blur=0]        The blur amount
 * @param       {Number|String}         [spread=0]      The spread amount
 * @param       {String}                [startColor=sugar.color(accent)]            The start color
 * @param       {String}                [endColor=sugar.color(complementary)]       The end color
 * @param           {String}            [angle=90deg]           The gradient angle
 * @return        {Css}           The generated css
 *
 * @example        css
 * .myCoolElement {
 *    @s.shadow.gradient(0, 10px, 10px, 0, s.color(accent), s.color(complementary));
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginShadowGradientInterface extends __SInterface {
    static get _definition() {
        return {
            x: {
                type: 'Number|String',
                required: true,
                default: 0,
            },
            y: {
                type: 'Number|String',
                required: true,
                default: 0,
            },
            blur: {
                type: 'Number|String',
                required: true,
                default: 0,
            },
            spread: {
                type: 'Number|String',
                required: true,
                default: 0,
            },
            startColor: {
                type: 'String',
                required: true,
                default: 'sugar.color(accent)',
            },
            endColor: {
                type: 'String',
                required: true,
                default: 'sugar.color(complementary)',
            },
            angle: {
                type: 'String',
                required: false,
                default: '90deg',
            },
        };
    }
}

export interface IPostcssSugarPluginShadowGradientParams {
    x: number | string;
    y: number | string;
    blur: number | string;
    spread: number | string;
    startColor: string;
    endColor: string;
    angle: string;
}

export { postcssSugarPluginShadowGradientInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginShadowGradientParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginShadowGradientParams = {
        x: 0,
        y: 0,
        blur: 0,
        spread: 0,
        startColor: '',
        endColor: '',
        angle: '',
        ...params,
    };

    const vars: string[] = [];

    // lnf
    vars.push(`
        &:before {
            z-index: 0;
            content: '';
            position: absolute;
            top: calc(50% + ${
                typeof finalParams.y === 'number'
                    ? finalParams.y + 'px'
                    : finalParams.y
            });
            left: calc(50% + ${
                typeof finalParams.x === 'number'
                    ? finalParams.x + 'px'
                    : finalParams.x
            });
            width: 100%; height: 100%;
            background: linear-gradient(${finalParams.angle}, ${
        finalParams.startColor
    }, ${finalParams.endColor});
            filter: blur(${finalParams.blur});
            transform: translate(-50%, -50%) scale(${finalParams.spread});

            ${atRule.nodes.map((node) => node.toString()).join(';')}

        }
    `);

    return vars;
}
