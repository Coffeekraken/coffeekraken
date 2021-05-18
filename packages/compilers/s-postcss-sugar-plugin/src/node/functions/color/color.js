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
    const nameParts = finalParams.name.split('.');
    if (nameParts.length === 2) {
        colorName = nameParts[0];
        modifierName = nameParts[1];
    }
    let modifierParams = {};
    if (finalParams.modifier) {
        modifierParams = ColorModifierInterface.apply(finalParams.modifier);
        if (!modifierParams.hasIssues()) {
            modifierParams = modifierParams.value;
        }
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
        if (colorName === 'current')
            colorVar = `--s-theme-current-color`;
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