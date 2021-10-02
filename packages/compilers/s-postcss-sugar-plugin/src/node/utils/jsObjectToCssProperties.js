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
        if (finalSettings.exclude.length &&
            finalSettings.exclude.indexOf(prop) !== -1)
            return;
        if (finalSettings.only.length &&
            finalSettings.only.indexOf(prop) === -1)
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
            case 'transition':
                propsStack.push(`transition: sugar.transition(${value});`);
                break;
            case 'margin-inline':
            case 'margin-block':
            case 'margin-inline-start':
            case 'margin-inline-end':
            case 'margin-block-start':
            case 'margin-block-end':
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
            // case 'rhythm-vertical':
            //     propsStack.push(`
            //     @sugar.rhythm.vertical {
            //         ${jsObjectToCssProperties(jsObject['rhythmVertical'])}
            //     }
            //     `);
            //     break;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNPYmplY3RUb0Nzc1Byb3BlcnRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqc09iamVjdFRvQ3NzUHJvcGVydGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRSxPQUFPLG9CQUFvQixNQUFNLHNCQUFzQixDQUFDO0FBNkJ4RCxNQUFNLENBQUMsT0FBTyxVQUFVLHVCQUF1QixDQUMzQyxRQUFhLEVBQ2IsUUFBNEM7SUFFNUMsTUFBTSxhQUFhLEdBQTZCLFdBQVcsQ0FDdkQ7UUFDSSxPQUFPLEVBQUUsRUFBRTtRQUNYLElBQUksRUFBRSxFQUFFO0tBQ1gsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLE1BQU0sVUFBVSxHQUFhLEVBQUUsQ0FBQztJQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ25DLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUN2RCxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFFLE9BQU87UUFFbkUsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFL0IsSUFDSSxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDNUIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTFDLE9BQU87UUFDWCxJQUNJLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUN6QixhQUFhLENBQUMsSUFB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