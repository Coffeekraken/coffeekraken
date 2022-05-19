// @ts-nocheck
import __SColor from '@coffeekraken/s-color';
import __SInterface from '@coffeekraken/s-interface';
import __isColor from '@coffeekraken/sugar/shared/is/color';
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
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
export default function color({ params, }) {
    var _a, _b, _c;
    const finalParams = Object.assign({ color: '', variant: undefined, modifier: undefined }, params);
    if (finalParams.color.match(/^(hsla?|rgba?|hsv)\(/))
        return finalParams.color;
    if (finalParams.color.match(/^var\(--/))
        return finalParams.color;
    let colorName = finalParams.color;
    let colorVariantName = (_a = finalParams.variant) !== null && _a !== void 0 ? _a : '';
    let colorModifier = (_b = finalParams.modifier) !== null && _b !== void 0 ? _b : '';
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
    }
    else {
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
            `var(${colorVariantNameVar}-spin ,${(_c = modifierParams.spin) !== null && _c !== void 0 ? _c : 0})`,
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
            : `var(${colorVariantNameVar}-a, 1)`}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0seUJBQTBCLFNBQVEsWUFBWTtJQUNoRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxlQUFlO2dCQUNyQixPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFB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