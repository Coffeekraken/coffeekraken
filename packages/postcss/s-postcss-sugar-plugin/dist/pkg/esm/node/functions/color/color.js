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
export default function color({ params, }) {
    var _a, _b, _c;
    const finalParams = Object.assign({ color: '', schema: undefined, modifier: undefined }, params);
    if (finalParams.color.match(/^(hsla?|rgba?|hsv)\(/))
        return finalParams.color;
    if (finalParams.color.match(/^var\(--/))
        return finalParams.color;
    let colorName = finalParams.color;
    let colorSchemaName = (_a = finalParams.schema) !== null && _a !== void 0 ? _a : '';
    let colorModifier = (_b = finalParams.modifier) !== null && _b !== void 0 ? _b : '';
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
    }
    else {
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
            `var(${colorSchemaNameVar}-spin ,${(_c = modifierParams.spin) !== null && _c !== void 0 ? _c : 0})`,
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
        let alpha = modifierParams.alpha !== undefined ? modifierParams.alpha : 1;
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
            ${modifierParams.alpha !== undefined
            ? modifierParams.alpha
            : `var(${colorSchemaNameVar}-a, 1)`}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLHdCQUF5QixTQUFRLFlBQVk7SUFDL0MsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsZUFBZTtnQkFDckIsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBTSxnQ0FBaUMsU0FBUSxZQUFZO0lBQ3ZELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsUUFBUSxFQUFF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