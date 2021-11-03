// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SColor from '@coffeekraken/s-color';
import __isColor from '@coffeekraken/sugar/shared/is/color';
class colorVariantNameInterface extends __SInterface {
}
colorVariantNameInterface.definition = {
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
class postcssSugarPluginColorInterface extends __SInterface {
}
postcssSugarPluginColorInterface.definition = {
    color: {
        type: 'String',
        alias: 'c',
    },
    variant: {
        type: 'String',
        alias: 'v',
    },
};
export { postcssSugarPluginColorInterface as interface };
export default function color({ params, }) {
    var _a;
    const finalParams = Object.assign({ color: '', variant: undefined }, params);
    if (finalParams.color.match(/^(hsla?|rgba?|hsv)\(/))
        return finalParams.color;
    if (finalParams.color.match(/^var\(--/))
        return finalParams.color;
    let colorName = finalParams.color;
    let colorVariantName = finalParams.variant ? finalParams.variant : '';
    let colorStateName = '';
    const nameParts = finalParams.color.split(':');
    if (nameParts.length === 2) {
        colorName = nameParts[0];
        colorStateName = nameParts[1];
    }
    let modifierParams = {};
    if (finalParams.variant && finalParams.variant.match(/^--/)) {
        modifierParams = colorVariantNameInterface.apply(finalParams.variant);
    }
    else if (finalParams.variant &&
        finalParams.variant.trim().match(/[a-zA-Z0-9_-]+/)) {
        colorVariantName = finalParams.variant;
    }
    if (__isColor(colorName)) {
        const color = new __SColor(colorName);
        if (finalParams.variant) {
            color.apply(finalParams.variant);
        }
        return color.toString();
    }
    else {
        const colorVar = `--s-theme-color-${colorName}`;
        let colorVariantNameVar = `s-theme-color-${colorName}`;
        if (colorStateName) {
            colorVariantNameVar += `-${colorStateName}`;
        }
        if (finalParams.variant && !finalParams.variant.match(/^--/)) {
            colorVariantNameVar += `-${colorVariantName}`;
        }
        colorVariantNameVar =
            '--' + colorVariantNameVar.replace(/-{2,999}/gm, '-');
        let finalValue = colorVar;
        let saturationOffset = modifierParams.saturate
            ? modifierParams.saturate
            : modifierParams.desaturate
                ? modifierParams.desaturate * -1
                : undefined;
        if (saturationOffset === undefined) {
            saturationOffset = `var(${colorVariantNameVar}-saturation-offset, 0)`;
        }
        let lightnessOffset = modifierParams.lighten
            ? modifierParams.lighten
            : modifierParams.darken
                ? modifierParams.darken * -1
                : undefined;
        if (lightnessOffset === undefined)
            lightnessOffset = `var(${colorVariantNameVar}-lightness-offset, 0)`;
        let alpha = modifierParams.alpha !== undefined ? modifierParams.alpha : 1;
        finalValue = `hsla(
      calc(
        var(${colorVar}-h, 0)
        +
        var(${colorVariantNameVar}-spin ,${(_a = modifierParams.spin) !== null && _a !== void 0 ? _a : 0})
      ),
      calc(
        (
          var(${colorVar}-s, 0)
          +
          ${saturationOffset}
        )
        * 1%
      ),
      calc(
        (
          var(${colorVar}-l, 0)
          +
          ${lightnessOffset}
        )
        * 1%
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFHNUQsTUFBTSx5QkFBMEIsU0FBUSxZQUFZOztBQUN6QyxvQ0FBVSxHQUFHO0lBQ2hCLFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ2I7Q0FDSixDQUFDO0FBR04sTUFBTSxnQ0FBaUMsU0FBUSxZQUFZOztBQUNoRCwyQ0FBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDYjtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDYjtDQUNKLENBQUM7QUFFTixPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFPekQsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQUMsRUFDMUIsTUFBTSxHQUdUOztJQUNHLE1BQU0s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