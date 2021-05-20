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
    // alpha: {
    //   type: 'Number',
    //   default: undefined
    // },
    // opacify: {
    //   type: 'Number',
    //   default: 0
    // },
    grayscale: {
        type: 'Boolean',
        default: false
    }
};
class postcssSugarPluginColorInterface extends __SInterface {
}
postcssSugarPluginColorInterface.definition = {
    color: {
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
    var _a;
    const finalParams = Object.assign({ color: '', modifier: undefined, return: 'var' }, params);
    console.log(finalParams);
    let colorName = finalParams.color;
    let colorModifier = finalParams.modifier ? finalParams.modifier : 'default';
    let colorStateName = '';
    const nameParts = finalParams.color.split(':');
    if (nameParts.length === 2) {
        colorName = nameParts[0];
        colorStateName = nameParts[1];
    }
    let modifierParams = {};
    if (finalParams.modifier && finalParams.modifier.match(/^--/)) {
        modifierParams = ColorModifierInterface.apply(finalParams.modifier);
        if (!modifierParams.hasIssues()) {
            modifierParams = modifierParams.value;
        }
    }
    else if (finalParams.modifier &&
        finalParams.modifier.trim().match(/[a-zA-Z0-9_-]+/)) {
        colorModifier = finalParams.modifier;
    }
    if (__isColor(colorName)) {
        const color = new __SColor(colorName);
        if (finalParams.modifier) {
            color.apply(finalParams.modifier);
        }
        return color.toString();
    }
    else {
        // if (
        //   modifierParams.saturate ||
        //   modifierParams.desaturate ||
        //   modifierParams.lighten ||
        //   modifierParams.spin ||
        //   modifierParams.darken
        //   // (modifierParams.alpha !== undefined || modifierParams.opacify)
        // ) {
        //   throw new Error(
        //     `<red>postcssSugarPlugin.function.color</red> Sorry but you cannot use HSL modifiers with RGBA ones...`
        //   );
        // }
        let colorVar = `--s-theme-color-${colorName}-default`;
        let schemaVar = `--s-theme-color-schema-${colorName}`;
        let colorModifierVar = `--s-theme-color-${colorName}`;
        if (colorStateName) {
            colorModifierVar += `--${colorStateName}`;
        }
        if (finalParams.modifier && !finalParams.modifier.match(/^--/)) {
            colorModifierVar += `-${colorModifier}`;
        }
        // if (colorName === 'primary' && colorStateName) {
        //   console.log(colorModifierVar);
        // }
        let finalValue = colorVar;
        // if (
        //   modifierParams.saturate ||
        //   modifierParams.desaturate ||
        //   modifierParams.lighten ||
        //   modifierParams.darken ||
        //   modifierParams.hue !== undefined
        // ) {
        let saturationOffset = modifierParams.saturate
            ? modifierParams.saturate
            : modifierParams.desaturate
                ? modifierParams.desaturate * -1
                : undefined;
        if (saturationOffset === undefined)
            saturationOffset = `var(${colorModifierVar}-saturationOffset, 0)`;
        let lightnessOffset = modifierParams.lighten
            ? modifierParams.lighten
            : modifierParams.darken
                ? modifierParams.darken * -1
                : undefined;
        if (lightnessOffset === undefined)
            lightnessOffset = `var(${colorModifierVar}-lightnessOffset, 0)`;
        finalValue = `hsl(
      calc(
        var(${schemaVar}-h, var(${colorVar}-h))
        +
        var(${colorModifierVar}-spin ,${(_a = modifierParams.spin) !== null && _a !== void 0 ? _a : 0})
      ),
      calc(
        (
          var(${schemaVar}-s, var(${colorVar}-s))
          + 
          ${saturationOffset}
        )
        * 1%
      ),
      calc(
        (
          var(${schemaVar}-l, var(${colorVar}-l))
          +
          ${lightnessOffset}
        )
        * 1%
      )
    )`;
        // calc((var(${schemaVar}-s, var(${colorVar}-s)) ${
        //   modifierParams.saturate ? '+' : '-'
        // } ${
        //   modifierParams.saturate
        //     ? `var(${colorModifierVar}-saturate , ${modifierParams.saturate})`
        //     : modifierParams.desaturate
        //     ? `var(${colorModifierVar}-desaturate , ${modifierParams.desaturate})`
        //     : 0
        // }) * 1%), calc((var(${schemaVar}-s, var(${colorVar}-s)) ${
        //   modifierParams.lighten ? '+' : '-'
        // } ${
        //   modifierParams.lighten
        //     ? `var(${colorModifierVar}-lighten , ${modifierParams.lighten})`
        //     : modifierParams.darken
        //     ? `var(${colorModifierVar}-darken , ${modifierParams.darken})`
        //     : 0
        // }) * 1%))`;
        // } else if (
        //   modifierParams.alpha !== undefined ||
        //   modifierParams.opacity !== undefined ||
        //   modifierParams.opacify
        // ) {
        //   let a = `var(${schemaVar}-a, var(${colorVar}-a))`;
        //   if (modifierParams.alpha !== undefined) a = modifierParams.alpha;
        //   else if (modifierParams.opacity !== undefined) a = modifierParams.opacity;
        //   else if (modifierParams.opacify)
        //     a = `calc(${a} + var(${colorModifierVar}-opacity , ${modifierParams.opacity}))`;
        //   finalValue = `rgba(var(${schemaVar}-r, var(${colorVar}-r)),var(${schemaVar}-g, var(${colorVar}-g)), var(${schemaVar}-b, var(${colorVar}-b)), ${a})`;
        // } else {
        //   finalValue = `var(${schemaVar}, var(${colorVar}))`;
        // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsTUFBTSxzQkFBdUIsU0FBUSxZQUFZOztBQUN4QyxpQ0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxXQUFXO0lBQ1gsb0JBQW9CO0lBQ3BCLHVCQUF1QjtJQUN2QixLQUFLO0lBQ0wsYUFBYTtJQUNiLG9CQUFvQjtJQUNwQixlQUFlO0lBQ2YsS0FBSztJQUNMLFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtDQUNGLENBQUM7QUFHSixNQUFNLGdDQUFpQyxTQUFRLFlBQVk7O0FBQ2xELDJDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxN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