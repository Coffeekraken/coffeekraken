// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
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
        values: ['default', 'accent', 'complementary'],
        required: true
    },
    modifier: {
        type: 'String',
        alias: 'm'
    }
};
export { postcssSugarPluginColorInterface as interface };
export default function color({ params }) {
    var _a;
    const finalParams = Object.assign({ color: '', modifier: undefined, return: 'var' }, params);
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
    let schemaVar = `--s-theme-colorSchema-${colorName}-default`;
    let colorModifierVar = `--s-theme-colorSchema-${colorName}`;
    if (colorStateName) {
        colorModifierVar += `--${colorStateName}`;
    }
    if (finalParams.modifier && !finalParams.modifier.match(/^--/)) {
        colorModifierVar += `-${colorModifier}`;
    }
    let finalValue = schemaVar;
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
        var(${schemaVar}-h)
        +
        var(${colorModifierVar}-spin ,${(_a = modifierParams.spin) !== null && _a !== void 0 ? _a : 0})
      ),
      calc(
        (
          var(${schemaVar}-s)
          + 
          ${saturationOffset}
        )
        * 1%
      ),
      calc(
        (
           var(${schemaVar}-l)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUtyRCxNQUFNLHNCQUF1QixTQUFRLFlBQVk7O0FBQ3hDLGlDQUFVLEdBQUc7SUFDbEIsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLGVBQWU7UUFDckIsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtDQUNGLENBQUM7QUFHSixNQUFNLGdDQUFpQyxTQUFRLFlBQVk7O0FBQ2xELDJDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLGVBQWUsQ0FBQztRQUM5QyxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQUVKLE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU96RCxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxFQUM1QixNQUFNLEVBR1A7O0lBQ0MsTUFBTSxXQUFXLG1CQUNmLEtB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