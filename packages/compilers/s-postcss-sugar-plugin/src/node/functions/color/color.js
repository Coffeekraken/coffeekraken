// @ts-nocheck
import __SColor from '@coffeekraken/s-color';
import __SInterface from '@coffeekraken/s-interface';
import __isColor from '@coffeekraken/sugar/shared/is/color';
class colorVariantNameInterface extends __SInterface {
    static get definition() {
        var _a;
        return ((_a = this.cached) !== null && _a !== void 0 ? _a : this.cache({
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
        }));
    }
}
class postcssSugarPluginColorInterface extends __SInterface {
    static get definition() {
        var _a;
        return ((_a = this.cached()) !== null && _a !== void 0 ? _a : this.cache({
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
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsTUFBTSx5QkFBMEIsU0FBUSxZQUFZO0lBQ2hELE1BQU0sS0FBSyxVQUFVOztRQUNqQixPQUFPLENBQ0gsTUFBQSxJQUFJLENBQUMsTUFBTSxtQ0FDWCxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ1AsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxlQUFlO2dCQUNyQixPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtTQUNKLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBTSxnQ0FBaUMsU0FBUSxZQUFZO0lBQ3ZELE1BQU0sS0FBSyxVQUFVOztRQUNqQixPQUFPLENBQ0gsTUFBQSxJQUFJLENBQUMsTUFBTSxFQUFFLG1DQUNiLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDUCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZ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