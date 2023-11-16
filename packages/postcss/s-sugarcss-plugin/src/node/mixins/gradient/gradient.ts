import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           gradient
 * @as              @s.gradient
 * @namespace      node.mixin.gradient
 * @type           PostcssMixin
 * @platform      postcss
 * @status        alpha
 *
 * This mixin generate all the css needed to apply a gradient on your elements
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.gradient($1, $2, $3)
 *
 * @example        css
 * .my-cool-element {
 *    @s.gradient(accent, secondary, radial);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginGradientInterface extends __SInterface {
    static get _definition() {
        return {
            start: {
                type: 'String',
                required: true,
                alias: 's',
            },
            end: {
                type: 'String',
                required: true,
                alias: 'e',
            },
            type: {
                type: 'String',
                values: ['linear', 'radial'],
                default: 'linear',
            },
            x: {
                type: 'String',
                default: __STheme.current.get('gradient.defaultX'),
            },
            y: {
                type: 'String',
                default: __STheme.current.get('gradient.defaultY'),
            },
            angle: {
                type: 'Number | String',
                default: __STheme.current.get('gradient.defaultAngle'),
            },
            size: {
                type: 'String',
                default: 'farthest-corner',
            },
        };
    }
}

export interface ISSugarcssPluginGradientParams {
    start: string;
    end: string;
    x: string;
    y: string;
    type: 'linear' | 'radial';
    angle: string | number;
    size: string;
}

export { SSugarcssPluginGradientInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginGradientParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginGradientParams = {
        start: '',
        end: '',
        x: '50%',
        y: '50%',
        type: 'linear',
        angle: '90deg',
        size: 'circle',
        ...params,
    };

    let startColorValue = finalParams.start,
        endColorValue = finalParams.end;

    const themeColorsObj = __STheme.current.get('color');

    if (
        startColorValue.match(/^[a-zA-Z0-9:_-]+$/) &&
        themeColorsObj[startColorValue]
    ) {
        startColorValue = `s.color(${startColorValue})`;
    }
    if (
        endColorValue.match(/^[a-zA-Z0-9:_-]+$/) &&
        themeColorsObj[endColorValue]
    ) {
        endColorValue = `s.color(${endColorValue})`;
    }

    const variables = [];

    let gradientCss = [...variables];

    if (finalParams.type === 'linear') {
        gradientCss.push(
            `background-image: linear-gradient(var(--s-gradient-angle, ${finalParams.angle}), var(--s-gradient-start, ${startColorValue}) 0%, var(--s-gradient-end, ${endColorValue}) 100%);`,
        );
    } else if (finalParams.type === 'radial') {
        gradientCss.push(
            `background-image: radial-gradient(${finalParams.size} at var(--s-gradient-x, ${finalParams.x}) var(--s-gradient-y, ${finalParams.y}), var(--s-gradient-start, ${startColorValue}) 0%, var(--s-gradient-end, ${endColorValue}) 100%);`,
        );
    }

    return gradientCss;
}
