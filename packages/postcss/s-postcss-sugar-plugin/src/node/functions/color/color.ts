// @ts-nocheck

import __SColor from '@coffeekraken/s-color';
import __SInterface from '@coffeekraken/s-interface';
import { __isColor } from '@coffeekraken/sugar/is';

/**
 * @name          color
 * @namespace     node.function.color
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./color
 * @status        beta
 *
 * This function allows you to get a color value depending on your theme config.
 *
 * @param       {String}        color      The color to get
 * @param       {String}        [schema=null]      The color schema to get
 * @param       {String}        [modifier=null]     A color modifier like "--alpha 0.3 --saturate 20", etc...
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    color: sugar.color(accent);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class colorSchemaNameInterface extends __SInterface {
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
            schema: {
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
    schema: string;
    modifier: string;
}

export default function color({
    params,
}: {
    params: Partial<IPostcssSugarPluginColorParams>;
}) {
    const finalParams: IPostcssSugarPluginColorParams = {
        color: '',
        schema: undefined,
        modifier: undefined,
        ...params,
    };

    if (finalParams.color.match(/^(hsla?|rgba?|hsv)\(/))
        return finalParams.color;
    if (finalParams.color.match(/^var\(--/)) return finalParams.color;

    let colorName = finalParams.color;
    let colorSchemaName = finalParams.schema ?? '';
    let colorModifier = finalParams.modifier ?? '';

    if (colorSchemaName.match(/^--[a-z]+/)) {
        colorModifier = colorSchemaName;
        colorSchemaName = undefined;
    }

    let modifierParams = {};
    if (colorModifier) {
        modifierParams = colorSchemaNameInterface.apply(colorModifier);
    }

    if (__isColor(colorName)) {
        const color = new __SColor(colorName);
        if (colorModifier) {
            color.apply(colorModifier);
        }
        return color.toString();
    } else {
        const colorVar = `--s-theme-color-${colorName}`;

        let colorSchemaNameVar = `s-theme-color-${colorName}`;
        if (colorSchemaName) {
            colorSchemaNameVar += `-${colorSchemaName}`;
        }

        colorSchemaNameVar =
            '--' + colorSchemaNameVar.replace(/-{2,999}/gm, '-');

        let finalValue = colorVar;

        const hParts = [
            `var(${colorVar}-h, 0)`,
            `var(${colorSchemaNameVar}-spin ,${modifierParams.spin ?? 0})`,
        ];

        const sParts = [`var(${colorVar}-s, 0)`];
        if (colorSchemaName) {
            sParts.push(`var(${colorSchemaNameVar}-saturation-offset, 0)`);
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
        if (colorSchemaName) {
            lParts.push(`var(${colorSchemaNameVar}-lightness-offset, 0)`);
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
                    : `var(${colorSchemaNameVar}-a, 1)`
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
