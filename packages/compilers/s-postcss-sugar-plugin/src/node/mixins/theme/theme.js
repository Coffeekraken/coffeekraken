import __SInterface from '@coffeekraken/s-interface';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __theme, { themeDefinition } from '../../utils/theme';
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
        default: 0
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
class postcssSugarPluginThemeinInterface extends __SInterface {
}
postcssSugarPluginThemeinInterface.definition = {
    theme: themeDefinition
};
export { postcssSugarPluginThemeinInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ theme: '' }, params);
    const themesObj = __theme().themes;
    if (!themesObj[finalParams.theme])
        throw new Error(`Sorry but the requested theme "<yellow>${finalParams.theme}</yellow>" does not exists...`);
    // @ts-ignore
    const flattenedTheme = __flatten(themesObj[finalParams.theme]);
    let vars = [];
    Object.keys(flattenedTheme).forEach((key) => {
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
    if (atRule.parent.type === 'root') {
        vars.unshift(':root {');
        vars.push('}');
    }
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFNBQVMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRSxPQUFPLE9BQU8sRUFBRSxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRzdELE1BQU0sc0JBQXVCLFNBQVEsWUFBWTs7QUFDeEMsaUNBQVUsR0FBRztJQUNsQixRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNmO0NBQ0YsQ0FBQztBQUdKLE1BQU0sa0NBQW1DLFNBQVEsWUFBWTs7QUFDcEQsNkNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUUsZUFBZTtDQUN2QixDQUFDO0FBT0osT0FBTyxFQUFFLGtDQUFrQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQzNELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIs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