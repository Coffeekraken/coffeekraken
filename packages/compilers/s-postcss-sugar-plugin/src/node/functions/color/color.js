import __SInterface from '@coffeekraken/s-interface';
import __SColor from '@coffeekraken/s-color';
import __theme from '../../utils/theme';
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
export default function ({ params }) {
    const finalParams = Object.assign({ name: '', modifier: '', return: 'var' }, params);
    let isPlainColor = false;
    if (finalParams.name.match(/^#[a-zA-Z0-9]{3,6}$/) ||
        finalParams.name.match(/^rgba\([0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}\)$/) ||
        finalParams.name.match(/^rgb\([0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}\)$/) ||
        finalParams.name.match(/^hsl\([0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?\)$/) ||
        finalParams.name.match(/^hsv\([0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?\)$/)) {
        isPlainColor = true;
        const color = new __SColor(finalParams.name);
        if (finalParams.modifier) {
            color.apply(finalParams.modifier);
        }
        return color.toString();
    }
    else {
        let name = finalParams.name;
        let modifier = finalParams.modifier;
        let modifierStr = modifier || 'default';
        const colorValue = __theme().config(`color.${name}.${modifierStr}`);
        let colorVar = `--s-theme-color-${name}-${modifierStr}`;
        if (finalParams.return === 'var') {
            return `var(${colorVar}, ${colorValue})`;
        }
        else {
            return colorValue;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUV4QyxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7O0FBQ2xELDJDQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUM7UUFDeEIsT0FBTyxFQUFFLEtBQUs7S0FDZjtDQUNGLENBQUM7QUFFSixPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFRekQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBR1A7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsSUFBSSxFQUFFLEVBQUUsRUFDUixRQUFRLEVBQUUsRUFBRSxFQUNaLE1BQU0sRUFBRSxLQUFLLElBQ1YsTUFBTSxDQUNWLENBQUM7SUFFRixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7SUFFekIsSUFDRSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztRQUM3QyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDcEIsMkZBQTJGLENBQzVGO1FBQ0QsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQ3BCLG1FQUFtRSxDQUNwRTtRQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUNwQiwrRUFBK0UsQ0FDaEY7UUFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDcEIsK0VBQStFLENBQ2hGLEVBQ0Q7UUFDQSxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXBCLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDeEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkM7UUFDRCxPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUN6QjtTQUFNO1FBQ0wsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBRXBDLElBQUksV0FBVyxHQUFHLFFBQVEsSUFBSSxTQUFTLENBQUM7UUFFeEMsTUFBTSxVQUFVLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFFcEUsSUFBSSxRQUFRLEdBQUcsbUJBQW1CLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUV4RCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQ2hDLE9BQU8sT0FBTyxRQUFRLEtBQUssVUFBVSxHQUFHLENBQUM7U0FDMUM7YUFBTTtZQUNMLE9BQU8sVUFBVSxDQUFDO1NBQ25CO0tBQ0Y7QUFDSCxDQUFDIn0=