// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SColor from '@coffeekraken/s-color';
import __isColor from '@coffeekraken/sugar/shared/is/color';
class ColorModifierInterface extends __SInterface {
}
ColorModifierInterface.definition = {
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
        default: undefined
    },
    opacity: {
        type: 'Number',
        default: undefined
    },
    opacify: {
        type: 'Number',
        default: 0
    },
    grayscale: {
        type: 'Boolean',
        default: false
    }
};
class postcssSugarPluginColorInterface extends __SInterface {
}
postcssSugarPluginColorInterface.definition = {
    name: {
        type: 'String',
        required: true,
        alias: 'n'
    },
    modifier: {
        type: 'String',
        alias: 'm'
    },
    return: {
        type: 'String',
        values: ['var', 'value'],
        default: 'var'
    }
};
export { postcssSugarPluginColorInterface as interface };
export default function color({ params }) {
    var _a, _b;
    const finalParams = Object.assign({ name: '', modifier: '', return: 'var' }, params);
    let colorName = finalParams.name;
    let modifierName = 'default';
    // const nameParts = finalParams.name.split('.');
    // if (nameParts.length === 2) {
    //   colorName = nameParts[0];
    //   modifierName = nameParts[1];
    // }
    let modifierParams = {};
    if (finalParams.modifier && finalParams.modifier.match(/^--/)) {
        modifierParams = ColorModifierInterface.apply(finalParams.modifier);
        if (!modifierParams.hasIssues()) {
            modifierParams = modifierParams.value;
        }
    }
    else if (finalParams.modifier &&
        finalParams.modifier.trim().match(/[a-zA-Z0-9_-]+/)) {
        modifierName = finalParams.modifier;
    }
    if (__isColor(colorName)) {
        const color = new __SColor(colorName);
        if (finalParams.modifier) {
            color.apply(finalParams.modifier);
        }
        return color.toString();
    }
    else {
        // get the color value
        // const colorValue = __theme().config(`color.${colorName}.${modifierName}`);
        if ((modifierParams.saturate ||
            modifierParams.desaturate ||
            modifierParams.lighten ||
            modifierParams.spin ||
            modifierParams.darken) &&
            (modifierParams.alpha !== undefined ||
                modifierParams.opacity !== undefined ||
                modifierParams.opacify)) {
            throw new Error(`<red>postcssSugarPlugin.function.color</red> Sorry but you cannot use HSL modifiers with RGBA ones...`);
        }
        let colorVar = `--s-theme-color-${colorName}-${modifierName}`;
        // if (colorName === 'current') colorVar = `--s-theme-current-color`;
        let finalValue = colorVar;
        if (modifierParams.saturate ||
            modifierParams.desaturate ||
            modifierParams.lighten ||
            modifierParams.darken ||
            modifierParams.hue !== undefined) {
            const spin = modifierParams.spin;
            finalValue = `hsl(calc(var(${colorVar}-h) + ${spin}), calc((var(${colorVar}-s) ${modifierParams.saturate ? '+' : '-'} ${(_a = modifierParams.saturate) !== null && _a !== void 0 ? _a : modifierParams.desaturate}) * 1%), calc((var(${colorVar}-l) ${modifierParams.lighten ? '+' : '-'} ${(_b = modifierParams.lighten) !== null && _b !== void 0 ? _b : modifierParams.darken}) * 1%))`;
        }
        else if (modifierParams.alpha !== undefined ||
            modifierParams.opacity !== undefined ||
            modifierParams.opacify) {
            let a = `var(${colorVar}-a)`;
            if (modifierParams.alpha !== undefined)
                a = modifierParams.alpha;
            else if (modifierParams.opacity !== undefined)
                a = modifierParams.opacity;
            else if (modifierParams.opacify)
                a = `calc(${a} + ${modifierParams.opacify})`;
            finalValue = `rgba(var(${colorVar}-r),var(${colorVar}-g), var(${colorVar}-b), ${a})`;
        }
        else {
            finalValue = `var(${finalValue})`;
        }
        if (finalParams.return === 'var') {
            return finalValue;
        }
        else {
            // return colorValue;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsTUFBTSxzQkFBdUIsU0FBUSxZQUFZOztBQUN4QyxpQ0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxTQUFTO0tBQ25CO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsU0FBUztLQUNuQjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtDQUNGLENBQUM7QUFHSixNQUFNLGdDQUFpQyxTQUFRLFlBQVk7O0FBQ2xELDJDQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFB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