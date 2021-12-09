// @ts-nocheck

import __SColor from '@coffeekraken/s-color';
import __SInterface from '@coffeekraken/s-interface';
import __isColor from '@coffeekraken/sugar/shared/is/color';

/**
 * @name          color
 * @namespace     node.function.color
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get a color value depending on your theme config.
 *
 * @param       {String}        color      The color to get
 * @param       {String}        [variant=null]      The color variant to get
 * @param       {String}        [modifier=null]     A color modifier like "--alpha 0.3 --saturate 20", etc...
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    color: sugar.color(accent);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class colorVariantNameInterface extends __SInterface {
    static get _definition() {
        return {
            saturate: {
                type: 'Number|String',
                default: 0,
            },
            desaturate: {
                type: 'Number',
                default: 0,
            },
            darken: {
                type: 'Number',
                default: 0,
            },
            lighten: {
                type: 'Number',
                default: 0,
            },
            spin: {
                type: 'Number',
                default: 0,
            },
            alpha: {
                type: 'Number',
                default: 1,
            },
        };
    }
}

class postcssSugarPluginColorInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                alias: 'c',
            },
            variant: {
                type: 'String',
                alias: 'v',
            },
            modifier: {
                type: 'String',
                alias: 'm',
            },
        };
    }
}
export { postcssSugarPluginColorInterface as interface };

export interface IPostcssSugarPluginColorParams {
    name: string;
    variant: string;
    modifier: string;
}

export default function color({
    params,
}: {
    params: Partial<IPostcssSugarPluginColorParams>;
}) {
    const finalParams: IPostcssSugarPluginColorParams = {
        color: '',
        variant: undefined,
        modifier: undefined,
        ...params,
    };

    if (finalParams.color.match(/^(hsla?|rgba?|hsv)\(/))
        return finalParams.color;
    if (finalParams.color.match(/^var\(--/)) return finalParams.color;

    let colorName = finalParams.color;
    let colorVariantName = finalParams.variant ?? '';
    let colorModifier = finalParams.modifier ?? '';
    let colorStateName = '';

    if (colorVariantName.match(/^--[a-z]+/)) {
        colorModifier = colorVariantName;
        colorVariantName = undefined;
    }

    const nameParts = finalParams.color.split(':');

    if (nameParts.length === 2) {
        colorName = nameParts[0];
        colorStateName = nameParts[1];
    }

    let modifierParams = {};
    if (colorModifier) {
        modifierParams = colorVariantNameInterface.apply(colorModifier);
    }

    if (__isColor(colorName)) {
        const color = new __SColor(colorName);
        if (colorModifier) {
            color.apply(colorModifier);
        }
        return color.toString();
    } else {
        const colorVar = `--s-theme-color-${colorName}`;

        let colorVariantNameVar = `s-theme-color-${colorName}`;
        if (colorStateName) {
            colorVariantNameVar += `-${colorStateName}`;
        }
        if (colorVariantName) {
            colorVariantNameVar += `-${colorVariantName}`;
        }

        colorVariantNameVar =
            '--' + colorVariantNameVar.replace(/-{2,999}/gm, '-');

        let finalValue = colorVar;

        const hParts = [
            `var(${colorVar}-h, 0)`,
            `var(${colorVariantNameVar}-spin ,${modifierParams.spin ?? 0})`,
        ];

        const sParts = [`var(${colorVar}-s, 0)`];
        if (colorVariantName) {
            sParts.push(`var(${colorVariantNameVar}-saturation-offset, 0)`);
        }
        let saturationOffset = modifierParams.saturate
            ? modifierParams.saturate
            : modifierParams.desaturate
            ? modifierParams.desaturate * -1
            : undefined;
        if (saturationOffset !== undefined) {
            sParts.push(saturationOffset);
        }

        const lParts = [`var(${colorVar}-l, 0)`];
        if (colorVariantName) {
            lParts.push(`var(${colorVariantNameVar}-lightness-offset, 0)`);
        }
        let lightnessOffset = modifierParams.lighten
            ? modifierParams.lighten
            : modifierParams.darken
            ? modifierParams.darken * -1
            : undefined;
        if (lightnessOffset !== undefined) {
            lParts.push(lightnessOffset);
        }

        let alpha =
            modifierParams.alpha !== undefined ? modifierParams.alpha : 1;

        finalValue = `hsla(
            calc(
                ${hParts.join(' + ')}
            ),
            calc(
                (${sParts.join(' + ')}) * 1%
            ),
            calc(
                (${lParts.join(' + ')}) * 1%
            ),
            ${
                modifierParams.alpha !== undefined
                    ? modifierParams.alpha
                    : `var(${colorVariantNameVar}-a, 1)`
            }
    )`;

        finalValue = finalValue
            .replace(/(\n|\s{2,99999999})/gm, '')
            .replace(/\t/gm, ' ')
            .replace(/\s?\+\s?/gm, ' + ')
            .replace(/\)\-\s?/gm, ') - ')
            .replace(/\s?\*\s?/gm, ' * ')
            .replace(/\s?\/\s?/gm, ' / ');

        return finalValue;
    }
}
