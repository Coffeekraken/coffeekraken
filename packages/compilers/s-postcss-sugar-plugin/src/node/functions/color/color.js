// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SColor from '@coffeekraken/s-color';
import __isColor from '@coffeekraken/sugar/shared/is/color';
import __minifyVar from '../../utils/minifyVar';
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
        default: 1
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
    if (finalParams.color.match(/^(hsla?|rgba?|hsv)\(/))
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
            colorModifierVar += `-${colorStateName}`;
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
        if (saturationOffset === undefined) {
            saturationOffset = `var(${__minifyVar(`${colorModifierVar}-saturationOffset`)}, 0)`;
        }
        let lightnessOffset = modifierParams.lighten
            ? modifierParams.lighten
            : modifierParams.darken
                ? modifierParams.darken * -1
                : undefined;
        if (lightnessOffset === undefined)
            lightnessOffset = `var(${__minifyVar(`${colorModifierVar}-lightnessOffset`)}, 0)`;
        let alpha = modifierParams.alpha !== undefined ? modifierParams.alpha : 1;
        finalValue = `hsla(
      calc(
        var(${__minifyVar(`${colorVar}-h`)}, 0)
        +
        var(${__minifyVar(`${colorModifierVar}-spin`)} ,${(_a = modifierParams.spin) !== null && _a !== void 0 ? _a : 0})
      ),
      calc(
        (
          var(${__minifyVar(`${colorVar}-s`)}, 0)
          + 
          ${saturationOffset}
        )
        * 1%
      ),
      calc(
        (
           var(${__minifyVar(`${colorVar}-l`)}, 0)
          +
          ${lightnessOffset}
        )
        * 1%
      ),
      var(${__minifyVar(`${colorModifierVar}-a`)}, ${alpha})
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsT0FBTyxXQUFXLE1BQU0sdUJBQXVCLENBQUM7QUFFaEQsTUFBTSxzQkFBdUIsU0FBUSxZQUFZOztBQUN4QyxpQ0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7Q0FDRixDQUFDO0FBR0osTUFBTSxnQ0FBaUMsU0FBUSxZQUFZOztBQUNsRCwyQ0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtDQUNGLENBQUM7QUFFSixPQUFPLEVB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