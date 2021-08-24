import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __knownCssProperties from 'known-css-properties';
export default function jsObjectToCssProperties(jsObject, settings) {
    const finalSettings = __deepMerge({
        exclude: [],
        only: [],
    }, settings);
    const propsStack = [];
    Object.keys(jsObject).forEach((prop) => {
        if (finalSettings.exclude.indexOf(prop) !== -1)
            return;
        if (finalSettings.exclude.indexOf(__dashCase(prop)) !== -1)
            return;
        const originalProp = prop;
        prop = __dashCase(prop).trim();
        if (finalSettings.exclude.length && finalSettings.exclude.indexOf(prop) !== -1)
            return;
        if (finalSettings.only.length && finalSettings.only.indexOf(prop) === -1)
            return;
        const value = jsObject[originalProp];
        if (!value)
            return;
        let color, modifier;
        switch (prop) {
            case 'font-family':
                propsStack.push(`@sugar.font.family(${value});`);
                break;
            case 'font-size':
                propsStack.push(`@sugar.font.size(${value});`);
                break;
            case 'color':
                color = value;
                modifier = '';
                if (Array.isArray(value)) {
                    color = value[0];
                    modifier = value[1];
                }
                propsStack.push(`color: sugar.color(${color}, ${modifier});`);
                break;
            case 'background-color':
                color = value;
                modifier = '';
                if (Array.isArray(value)) {
                    color = value[0];
                    modifier = value[1];
                }
                propsStack.push(`background-color: sugar.color(${color}, ${modifier});`);
                break;
            case 'border-radius':
            case 'border-top-left-radius':
            case 'border-top-right-radius':
            case 'border-bottom-right-radius':
            case 'border-bottom-left-radius':
                propsStack.push(`border-radius: sugar.border.radius(${value});`);
                break;
            case 'border-width':
                propsStack.push(`border-width: sugar.border.width(${value});`);
                break;
            case 'margin':
            case 'margin-top':
            case 'margin-bottom':
            case 'margin-left':
            case 'margin-right':
                propsStack.push(`${prop}: sugar.margin(${value});`);
                break;
            case 'padding':
            case 'padding-top':
            case 'padding-bottom':
            case 'padding-left':
            case 'padding-right':
                propsStack.push(`${prop}: sugar.padding(${value});`);
                break;
            case 'depth':
                propsStack.push(`@sugar.depth(${value});`);
                break;
            case 'default-color':
                propsStack.push(`@sugar.color.remap(ui, ${value});`);
                break;
            case 'rhythm-vertical':
                propsStack.push(`
          @sugar.rhythm.vertical {
            ${jsObjectToCssProperties(jsObject[':rhythmVertical'])}
          }
        `);
                break;
            default:
                const props = __knownCssProperties.all;
                if (props.indexOf(prop) === -1)
                    return;
                propsStack.push(`${prop}: ${value};`);
                break;
        }
    });
    return propsStack.join('\n');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNPYmplY3RUb0Nzc1Byb3BlcnRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqc09iamVjdFRvQ3NzUHJvcGVydGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRSxPQUFPLG9CQUFvQixNQUFNLHNCQUFzQixDQUFDO0FBNkJ4RCxNQUFNLENBQUMsT0FBTyxVQUFVLHVCQUF1QixDQUFDLFFBQWEsRUFBRSxRQUE0QztJQUN2RyxNQUFNLGFBQWEsR0FBNkIsV0FBVyxDQUN2RDtRQUNJLE9BQU8sRUFBRSxFQUFFO1FBQ1gsSUFBSSxFQUFFLEVBQUU7S0FDWCxFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQWEsRUFBRSxDQUFDO0lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ3ZELElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUVuRSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUvQixJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDdkYsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxhQUFhLENBQUMsSUFBSSxD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