"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const color_1 = __importDefault(require("@coffeekraken/sugar/shared/is/color"));
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
class colorSchemaNameInterface extends s_interface_1.default {
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
class postcssSugarPluginColorInterface extends s_interface_1.default {
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
exports.interface = postcssSugarPluginColorInterface;
function color({ params, }) {
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
    if ((0, color_1.default)(colorName)) {
        const color = new s_color_1.default(colorName);
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
exports.default = color;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCxvRUFBNkM7QUFDN0MsNEVBQXFEO0FBQ3JELGdGQUE0RDtBQUU1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0sd0JBQXlCLFNBQVEscUJBQVk7SUFDL0MsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsZUFBZTtnQkFDckIsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBTSxnQ0FBaUMsU0FBUSxxQkFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1NBQ0osQ0FBQztJQUNO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