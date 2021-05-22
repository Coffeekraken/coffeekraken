import __theme from './theme';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
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
export default function (color) {
    const flattenedTheme = __flatten(__theme().config(`.`));
    let vars = [];
    // let vars: string[] = [];
    Object.keys(flattenedTheme).forEach((key) => {
        if (!key.includes(`color.${color}`))
            return;
        const value = flattenedTheme[key];
        const varKey = key.replace(/\./gm, '-').replace(/:/gm, '-');
        if (key.match(/^color\./) &&
            typeof value === 'string' &&
            value.match(/^--/)) {
            const modifierParams = ColorModifierInterface.apply(value).value;
            Object.keys(modifierParams).forEach((propKey) => {
                const propValue = modifierParams[propKey];
                vars.push(`--s-theme-${varKey}-${propKey}: ${propValue};`);
            });
            if (modifierParams.saturate > 0) {
                vars.push(`--s-theme-${varKey}-saturationOffset: ${modifierParams.saturate};`);
            }
            else if (modifierParams.desaturate > 0) {
                vars.push(`--s-theme-${varKey}-saturationOffset: ${modifierParams.desaturate * -1};`);
            }
            else {
                vars.push(`--s-theme-${varKey}-saturationOffset: 0;`);
            }
            if (modifierParams.lighten > 0) {
                vars.push(`--s-theme-${varKey}-lightnessOffset: ${modifierParams.lighten};`);
            }
            else if (modifierParams.darken > 0) {
                vars.push(`--s-theme-${varKey}-lightnessOffset: ${modifierParams.darken * -1};`);
            }
            else {
                vars.push(`--s-theme-${varKey}-lightnessOffset: 0;`);
            }
        }
        else {
            if (`${value}`.match(/:/)) {
                vars.push(`--s-theme-${varKey}: "${flattenedTheme[key]}";`);
            }
            else {
                vars.push(`--s-theme-${varKey}: ${flattenedTheme[key]};`);
            }
        }
    });
    vars = vars.filter((v) => {
        return (!v.match(/-(saturate|desaturate|lighten|darken|help|grayscale):\s/) &&
            !v.match(/\s0;$/));
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVDb2xvck9ialRvVmFycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRoZW1lQ29sb3JPYmpUb1ZhcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sc0JBQXVCLFNBQVEsWUFBWTs7QUFDeEMsaUNBQVUsR0FBRztJQUNsQixRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNmO0NBQ0YsQ0FBQztBQUdKLE1BQU0sQ0FBQyxPQUFPLFdBQVcsS0FBYTtJQUNwQyxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFeEQsSUFBSSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRXhCLDJCQUEyQjtJQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsS0FB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