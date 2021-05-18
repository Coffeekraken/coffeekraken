// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginColorCurrentInterface extends __SInterface {
}
postcssSugarPluginColorCurrentInterface.definition = {
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
export { postcssSugarPluginColorCurrentInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ name: '', modifier: '', return: 'var' }, params);
    let colorName = finalParams.name;
    let modifierName = 'default';
    const nameParts = finalParams.name.split('.');
    if (nameParts.length === 2) {
        colorName = nameParts[0];
        modifierName = nameParts[1];
    }
    const vars = [
        `--s-theme-current-color: var(--s-theme-color-${colorName}-${modifierName});`,
        `--s-theme-current-color-h: var(--s-theme-color-${colorName}-${modifierName}-h);`,
        `--s-theme-current-color-s: var(--s-theme-color-${colorName}-${modifierName}-s);`,
        `--s-theme-current-color-l: var(--s-theme-color-${colorName}-${modifierName}-l);`,
        `--s-theme-current-color-r: var(--s-theme-color-${colorName}-${modifierName}-r);`,
        `--s-theme-current-color-g: var(--s-theme-color-${colorName}-${modifierName}-g);`,
        `--s-theme-current-color-b: var(--s-theme-color-${colorName}-${modifierName}-b);`,
        `--s-theme-current-color-a: var(--s-theme-color-${colorName}-${modifierName}-a);`
    ];
    if (atRule.parent.type === 'root') {
        vars.unshift(':root {');
        vars.push('}');
    }
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
    // return vars.join('\n');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1cnJlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sdUNBQXdDLFNBQVEsWUFBWTs7QUFDekQsa0RBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztRQUN4QixPQUFPLEVBQUUsS0FBSztLQUNmO0NBQ0YsQ0FBQztBQUVKLE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQVFoRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLElBQUksRUFBRSxFQUFFLEVBQ1IsUUFBUSxFQUFFLEVBQUUsRUFDWixNQUFNLEVBQUUsS0FBSyxJQUNWLE1BQU0sQ0FDVixDQUFDO0lBRUYsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUNqQyxJQUFJLFlBQVksR0FBRyxTQUFTLENBQUM7SUFFN0IsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUMxQixTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLFlBQVksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDN0I7SUFFRCxNQUFNLElBQUksR0FBYTtRQUNyQixnREFBZ0QsU0FBUyxJQUFJLFlBQVksSUFBSTtRQUM3RSxrREFBa0QsU0FBUyxJQUFJLFlBQVksTUFBTTtRQUNqRixrREFBa0QsU0FBUyxJQUFJLFlBQVksTUFBTTtRQUNqRixrREFBa0QsU0FBUyxJQUFJLFlBQVksTUFBTTtRQUNqRixrREFBa0QsU0FBUyxJQUFJLFlBQVksTUFBTTtRQUNqRixrREFBa0QsU0FBUyxJQUFJLFlBQVksTUFBTTtRQUNqRixrREFBa0QsU0FBUyxJQUFJLFlBQVksTUFBTTtRQUNqRixrREFBa0QsU0FBUyxJQUFJLFlBQVksTUFBTTtLQUNsRixDQUFDO0lBRUYsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2hCO0lBRUQsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXhCLDBCQUEwQjtBQUM1QixDQUFDIn0=