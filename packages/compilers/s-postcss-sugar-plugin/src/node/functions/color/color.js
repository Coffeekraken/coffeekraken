// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SColor from '@coffeekraken/s-color';
import __isColor from '@coffeekraken/sugar/shared/is/color';
class colorVariantNameInterface extends __SInterface {
}
colorVariantNameInterface.definition = {
    saturate: {
        type: 'Number|String',
        default: 0
    },
    desaturate: {
        type: 'Number',
        default: 0
    },
    darken: {
        type: 'Number',
        default: 0
    },
    lighten: {
        type: 'Number',
        default: 0
    },
    spin: {
        type: 'Number',
        default: 0
    },
    alpha: {
        type: 'Number',
        default: 1
    }
};
class postcssSugarPluginColorInterface extends __SInterface {
}
postcssSugarPluginColorInterface.definition = {
    color: {
        type: 'String',
        alias: 'c'
    },
    variant: {
        type: 'String',
        alias: 'v'
    }
};
export { postcssSugarPluginColorInterface as interface };
export default function color({ params }) {
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
        colorVariantNameVar = '--' + colorVariantNameVar.replace(/-{2,999}/gm, '-');
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
      var(${colorVariantNameVar}-a, ${alpha})
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFHNUQsTUFBTSx5QkFBMEIsU0FBUSxZQUFZOztBQUMzQyxvQ0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7Q0FDRixDQUFDO0FBR0osTUFBTSxnQ0FBaUMsU0FBUSxZQUFZOztBQUNsRCwyQ0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtDQUNGLENBQUM7QUFFSixPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFPekQsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQUMsRUFDNUIsTUFBTSxFQUdQOztJQUNDLE1BQU0s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