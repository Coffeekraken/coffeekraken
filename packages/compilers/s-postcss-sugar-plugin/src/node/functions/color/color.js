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
    }
};
export { postcssSugarPluginColorInterface as interface };
export default function color({ params }) {
    var _a;
    const finalParams = Object.assign({ color: '', modifier: undefined }, params);
    if (finalParams.color.match(/^sugar\.color\(/))
        return finalParams.color;
    if (finalParams.color.match(/^var\(--/))
        return finalParams.color;
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
        const colorVar = `--s-theme-color-${colorName}-default`;
        let colorModifierVar = `--s-theme-color-${colorName}`;
        if (colorStateName) {
            colorModifierVar += `--${colorStateName}`;
        }
        if (finalParams.modifier && !finalParams.modifier.match(/^--/)) {
            colorModifierVar += `-${colorModifier}`;
        }
        let finalValue = colorVar;
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
        var(${colorVar}-h, 0)
        +
        var(${colorModifierVar}-spin ,${(_a = modifierParams.spin) !== null && _a !== void 0 ? _a : 0})
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
      )
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsTUFBTSxzQkFBdUIsU0FBUSxZQUFZOztBQUN4QyxpQ0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7Q0FDRixDQUFDO0FBR0osTUFBTSxnQ0FBaUMsU0FBUSxZQUFZOztBQUNsRCwyQ0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQUVKLE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU96RCxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxFQUM1QixN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