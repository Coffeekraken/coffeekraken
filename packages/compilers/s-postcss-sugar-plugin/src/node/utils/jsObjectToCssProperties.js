import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __knownCssProperties from 'known-css-properties';
export default function jsObjectToCssProperties(jsObject, settings) {
    const finalSettings = __deepMerge(
        {
            exclude: [],
            only: [],
        },
        settings,
    );
    const propsStack = [];
    Object.keys(jsObject).forEach((prop) => {
        if (finalSettings.exclude.indexOf(prop) !== -1) return;
        if (finalSettings.exclude.indexOf(__dashCase(prop)) !== -1) return;
        const originalProp = prop;
        prop = __dashCase(prop).trim();
        if (finalSettings.exclude.length && finalSettings.exclude.indexOf(prop) !== -1) return;
        if (finalSettings.only.length && finalSettings.only.indexOf(prop) === -1) return;
        const value = jsObject[originalProp];
        if (!value) return;
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
            case 'padding-inline':
            case 'padding-block':
            case 'padding-inline-start':
            case 'padding-inline-end':
            case 'padding-block-start':
            case 'padding-block-end':
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
                propsStack.push(`@sugar.color(${value});`);
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
                if (props.indexOf(prop) === -1) return;
                propsStack.push(`${prop}: ${value};`);
                break;
        }
    });
    return propsStack.join('\n');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNPYmplY3RUb0Nzc1Byb3BlcnRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqc09iamVjdFRvQ3NzUHJvcGVydGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRSxPQUFPLG9CQUFvQixNQUFNLHNCQUFzQixDQUFDO0FBNkJ4RCxNQUFNLENBQUMsT0FBTyxVQUFVLHVCQUF1QixDQUFDLFFBQWEsRUFBRSxRQUE0QztJQUN2RyxNQUFNLGFBQWEsR0FBNkIsV0FBVyxDQUN2RDtRQUNJLE9BQU8sRUFBRSxFQUFFO1FBQ1gsSUFBSSxFQUFFLEVBQUU7S0FDWCxFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQWEsRUFBRSxDQUFDO0lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ3ZELElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUVuRSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUvQixJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDdkYsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxhQUFhLENBQUMsSUFBSSxD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
