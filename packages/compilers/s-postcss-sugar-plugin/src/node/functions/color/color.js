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
    if (__isColor(colorName)) {
        const color = new __SColor(colorName);
        if (finalParams.modifier) {
            color.apply(finalParams.modifier);
        }
        return color.toString();
    }
    else {
        let colorVar = `--s-theme-color-${colorName}-default`;
        let schemaVar = `--s-theme-color-schema-${colorName}`;
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
        var(${schemaVar}-h, var(${colorVar}-h, 0))
        +
        var(${colorModifierVar}-spin ,${(_a = modifierParams.spin) !== null && _a !== void 0 ? _a : 0})
      ),
      calc(
        (
          var(${schemaVar}-s, var(${colorVar}-s, 0))
          + 
          ${saturationOffset}
        )
        * 1%
      ),
      calc(
        (
           var(${schemaVar}-l, var(${colorVar}-l, 0))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsTUFBTSxzQkFBdUIsU0FBUSxZQUFZOztBQUN4QyxpQ0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7Q0FDRixDQUFDO0FBR0osTUFBTSxnQ0FBaUMsU0FBUSxZQUFZOztBQUNsRCwyQ0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQUVKLE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU96RCxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxFQUM1QixNQUFNLEVBR1A7O0lBQ0MsTUFBTSxXQUFXLG1CQUNmLEtBQUssRUFBRSxFQUFFLEVBQ1QsUUFBUSxFQUFFLFNBQVMsRUFDbkIsTUFBTSxFQUFFLEtBQUssSUFDVixNQUFNLENBQ1YsQ0FBQztJQUVGLElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFDbEMsSUFBSSxhQUFhLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQzVFLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUV4QixNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzFCLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsY0FBYyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMvQjtJQUVELElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUN4QixJQUFJLFdBQVcsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDN0QsY0FBYyxHQUFHLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUMvQixjQUFjLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztTQUN2QztLQUNGO1NBQU0sSUFDTCxXQUFXLENBQUMsUUFBUTtRQUNwQixXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUNuRDtRQUNBLGFBQWEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO0tBQ3RDO0lBRUQsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQ3hCLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDekI7U0FBTTtRQUNMLElBQUksUUFBUSxHQUFHLG1CQUFtQixTQUFTLFVBQVUsQ0FBQztRQUN0RCxJQUFJLFNBQVMsR0FBRywwQkFBMEIsU0FBUyxFQUFFLENBQUM7UUFFdEQsSUFBSSxnQkFBZ0IsR0FBRyxtQkFBbUIsU0FBUyxFQUFFLENBQUM7UUFDdEQsSUFBSSxjQUFjLEVBQUU7WUFDbEIsZ0JBQWdCLElBQUksS0FBSyxjQUFjLEVBQUUsQ0FBQztTQUMzQztRQUNELElBQUksV0FBVyxDQUFDLFFBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlELGdCQUFnQixJQUFJLElBQUksYUFBYSxFQUFFLENBQUM7U0FDekM7UUFFRCxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFFMUIsSUFBSSxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsUUFBUTtZQUM1QyxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVE7WUFDekIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxVQUFVO2dCQUMzQixDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDZCxJQUFJLGdCQUFnQixLQUFLLFNBQVM7WUFDaEMsZ0JBQWdCLEdBQUcsT0FBTyxnQkFBZ0IsdUJBQXVCLENBQUM7UUFFcEUsSUFBSSxlQUFlLEdBQUcsY0FBYyxDQUFDLE9BQU87WUFDMUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxPQUFPO1lBQ3hCLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTTtnQkFDdkIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2QsSUFBSSxlQUFlLEtBQUssU0FBUztZQUMvQixlQUFlLEdBQUcsT0FBTyxnQkFBZ0Isc0JBQXNCLENBQUM7UUFFbEUsVUFBVSxHQUFHOztjQUVILFNBQVMsV0FBVyxRQUFROztjQUU1QixnQkFBZ0IsVUFBVSxNQUFBLGNBQWMsQ0FBQyxJQUFJLG1DQUFJLENBQUM7Ozs7Z0JBSWhELFNBQVMsV0FBVyxRQUFROztZQUVoQyxnQkFBZ0I7Ozs7OztpQkFNWCxTQUFTLFdBQVcsUUFBUTs7WUFFakMsZUFBZTs7OztNQUlyQixDQUFDO1FBRUgsVUFBVSxHQUFHLFVBQVU7YUFDcEIsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQzthQUNwQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQzthQUNwQixPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQzthQUM1QixPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQzthQUM1QixPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQzthQUM1QixPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWhDLE9BQU8sVUFBVSxDQUFDO0tBQ25CO0FBQ0gsQ0FBQyJ9