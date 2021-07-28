import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __knownCssProperties from 'known-css-properties';
export default function jsObjectToCssProperties(jsObject, settings) {
    const finalSettings = __deepMerge({
        exclude: [],
        only: []
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNPYmplY3RUb0Nzc1Byb3BlcnRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqc09iamVjdFRvQ3NzUHJvcGVydGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRSxPQUFPLG9CQUFvQixNQUFNLHNCQUFzQixDQUFDO0FBNkJ4RCxNQUFNLENBQUMsT0FBTyxVQUFVLHVCQUF1QixDQUM3QyxRQUFhLEVBQ2IsUUFBbUM7SUFFbkMsTUFBTSxhQUFhLEdBQTZCLFdBQVcsQ0FDekQ7UUFDRSxPQUFPLEVBQUUsRUFBRTtRQUNYLElBQUksRUFBRSxFQUFFO0tBQ1QsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLE1BQU0sVUFBVSxHQUFhLEVBQUUsQ0FBQztJQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3JDLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUN2RCxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFFLE9BQU87UUFFbkUsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFL0IsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ3ZGLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUVqRixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBRW5CLElBQUksS0FBSyxFQUFFLFFBQVEsQ0FBQztRQUVwQixRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssYUFBYTtnQkFDaEIsVUFBVSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsS0FBSyxJQUFJLENBQUMsQ0FBQztnQkFDakQsTUFBTTtZQUNSLEtBQUssV0FBVztnQkFDZCxVQUFVLENBQUMsSUFBSSxDQUFDLG9CQUFvQixLQUFLLElBQUksQ0FBQyxDQUFDO2dCQUMvQyxNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ2QsUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDZCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3hCLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3JCO2dCQUNELFVBQVUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEtBQUssS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDO2dCQUM5RCxNQUFNO1lBQ1IsS0FBSyxrQkFBa0I7Z0JBQ3JCLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ2QsUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDZCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3hCLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3JCO2dCQUNELFVBQVUsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEtBQUssS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDO2dCQUN6RSxNQUFNO1lBQ1IsS0FBSyxlQUFlLENBQUM7WUFDckIsS0FBSyx3QkFBd0IsQ0FBQztZQUM5QixLQUFLLHlCQUF5QixDQUFDO1lBQy9CLEtBQUssNEJBQTRCLENBQUM7WUFDbEMsS0FBSywyQkFBMkI7Z0JBQzlCLFVBQVUsQ0FBQyxJQUFJLENBQUMsc0NBQXNDLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQ2pFLE1BQU07WUFDUixLQUFLLGNBQWM7Z0JBQ2pCLFVBQVUsQ0FBQyxJQUFJLENBQUMsb0NBQW9DLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQy9ELE1BQU07WUFDUixLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssWUFBWSxDQUFDO1lBQ2xCLEtBQUssZUFBZSxDQUFDO1lBQ3JCLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssY0FBYztnQkFDakIsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksa0JBQWtCLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQ3RELE1BQU07WUFDTixLQUFLLFNBQVMsQ0FBQztZQUNmLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssZ0JBQWdCLENBQUM7WUFDdEIsS0FBSyxjQUFjLENBQUM7WUFDcEIsS0FBSyxlQUFlO2dCQUNsQixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxtQkFBbUIsS0FBSyxJQUFJLENBQUMsQ0FBQztnQkFDckQsTUFBTTtZQUNSLEtBQUssT0FBTztnQkFDVixVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxDQUFDO2dCQUMzQyxNQUFNO1lBQ1IsS0FBSyxlQUFlO2dCQUNsQixVQUFVLENBQUMsSUFBSSxDQUFDLDBCQUEwQixLQUFLLElBQUksQ0FBQyxDQUFDO2dCQUNyRCxNQUFNO1lBQ1IsS0FBSyxpQkFBaUI7Z0JBQ3BCLFVBQVUsQ0FBQyxJQUFJLENBQUM7O2NBRVYsdUJBQXVCLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7O1NBRXpELENBQUMsQ0FBQztnQkFDTCxNQUFNO1lBQ047Z0JBRUUsTUFBTSxLQUFLLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxDQUFDO2dCQUN2QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUFFLE9BQU87Z0JBRXZDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDdEMsTUFBTTtTQUNUO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsQ0FBQyJ9