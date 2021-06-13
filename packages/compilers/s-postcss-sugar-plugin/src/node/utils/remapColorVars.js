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
export default function (from, to) {
    const flattenedTheme = __flatten(__theme().config(`.`));
    let vars = [];
    let fromVars = [], toVars = [];
    // let vars: string[] = [];
    Object.keys(flattenedTheme).forEach((key) => {
        if (key.includes(`color.${from}`)) {
            const internalColorKey = key.replace(`color.${from}.`, '');
            fromVars.push(internalColorKey);
        }
        else if (key.includes(`color.${to}`)) {
            const internalColorKey = key.replace(`color.${to}.`, '');
            toVars.push(internalColorKey);
        }
    });
    fromVars.forEach(key => {
        const varKey = key.replace(/\./gm, '-').replace(/:/gm, '-');
        if (toVars.indexOf(key) === -1) {
            vars.push(`--s-theme-color-${from}-${varKey}: initial;`);
        }
        else {
            vars.push(`--s-theme-color-${from}-${varKey}: --s-theme-color-${to}-${varKey};`);
            toVars = toVars.filter(l => l !== key);
        }
    });
    console.log('VARS', vars);
    console.log('TO', toVars);
    //   function getValue(color, internalColorKey): string[] {
    //       const resultArray: string[] = [];
    //     const key = `color.${color}.${internalColorKey}`;
    //     const value = flattenedTheme[key];
    //     const varKey = key.replace(/\./gm, '-').replace(/:/gm, '-');
    //     if (
    //       key.match(/^color\./) &&
    //       typeof value === 'string' &&
    //       value.match(/^--/)
    //     ) {
    //       const modifierParams = ColorModifierInterface.apply(value).value;
    //       Object.keys(modifierParams).forEach((propKey) => {
    //         const propValue = modifierParams[propKey];
    //         resultArray.push(`--s-theme-${varKey}-${propKey}: ${propValue};`);
    //       });
    //       if (modifierParams.saturate > 0) {
    //         vars.push(
    //           `--s-theme-${varKey}-saturationOffset: ${modifierParams.saturate};`
    //         );
    //       } else if (modifierParams.desaturate > 0) {
    //         vars.push(
    //           `--s-theme-${varKey}-saturationOffset: ${
    //             modifierParams.desaturate * -1
    //           };`
    //         );
    //       } else {
    //         vars.push(`--s-theme-${varKey}-saturationOffset: 0;`);
    //       }
    //       if (modifierParams.lighten > 0) {
    //         vars.push(
    //           `--s-theme-${varKey}-lightnessOffset: ${modifierParams.lighten};`
    //         );
    //       } else if (modifierParams.darken > 0) {
    //         vars.push(
    //           `--s-theme-${varKey}-lightnessOffset: ${modifierParams.darken * -1};`
    //         );
    //       } else {
    //         vars.push(`--s-theme-${varKey}-lightnessOffset: 0;`);
    //       }
    //     } else {
    //       if (`${value}`.match(/:/)) {
    //         vars.push(`--s-theme-${varKey}: "${flattenedTheme[key]}";`);
    //       } else {
    //         vars.push(`--s-theme-${varKey}: ${flattenedTheme[key]};`);
    //       }
    //     }
    //   }
    vars = vars.filter((v) => {
        return (!v.match(/-(saturate|desaturate|lighten|darken|help|grayscale):\s/) &&
            !v.match(/\s0;$/));
    });
    console.log('FROM', fromVars);
    console.log('TO', toVars);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtYXBDb2xvclZhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZW1hcENvbG9yVmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFDbEUsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxzQkFBdUIsU0FBUSxZQUFZOztBQUN4QyxpQ0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7Q0FDRixDQUFDO0FBR0osTUFBTSxDQUFDLE9BQU8sV0FBVyxJQUFZLEVBQUUsRUFBVTtJQUMvQyxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFeEQsSUFBSSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksUUFBUSxHQUFhLEVBQUUsRUFDckIsTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUUxQiwyQkFBMkI7SUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVB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