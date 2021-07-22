import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export default function jsObjectToCssProperties(jsObject, settings) {
    const finalSettings = __deepMerge({
        exclude: []
    }, settings);
    const propsStack = [];
    Object.keys(jsObject).forEach((prop) => {
        if (finalSettings.exclude.indexOf(prop) !== -1)
            return;
        const value = jsObject[prop];
        if (!value)
            return;
        switch (prop) {
            case 'font-family':
                propsStack.push(`@sugar.font.family(${value});`);
                break;
            case 'font-size':
                propsStack.push(`@sugar.font.size(${value});`);
                break;
            case 'color':
                propsStack.push(`color: sugar.color(${value});`);
                break;
            case 'background-color':
                propsStack.push(`background-color: sugar.color(${value});`);
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
            default:
                propsStack.push(`${prop}: ${value};`);
                break;
        }
    });
    return propsStack.join('\n');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNPYmplY3RUb0Nzc1Byb3BlcnRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqc09iamVjdFRvQ3NzUHJvcGVydGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQTRCdEUsTUFBTSxDQUFDLE9BQU8sVUFBVSx1QkFBdUIsQ0FDN0MsUUFBYSxFQUNiLFFBQW1DO0lBRW5DLE1BQU0sYUFBYSxHQUE2QixXQUFXLENBQ3pEO1FBQ0UsT0FBTyxFQUFFLEVBQUU7S0FDWixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQWEsRUFBRSxDQUFDO0lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDckMsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPO1FBRXZELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3QixJQUFJLENBQUMsS0FBSztZQUFFLE9BQU87UUFFbkIsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLGFBQWE7Z0JBQ2hCLFVBQVUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQ2pELE1BQU07WUFDUixLQUFLLFdBQVc7Z0JBQ2QsVUFBVSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsS0FBSyxJQUFJLENBQUMsQ0FBQztnQkFDL0MsTUFBTTtZQUNSLEtBQUssT0FBTztnQkFDVixVQUFVLENBQUMsSUFBSSxDQUFDLHNCQUFzQixLQUFLLElBQUksQ0FBQyxDQUFDO2dCQUNqRCxNQUFNO1lBQ1IsS0FBSyxrQkFBa0I7Z0JBQ3JCLFVBQVUsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQzVELE1BQU07WUFDUixLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssWUFBWSxDQUFDO1lBQ2xCLEtBQUssZUFBZSxDQUFDO1lBQ3JCLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssY0FBYztnQkFDakIsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksa0JBQWtCLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQ3RELE1BQU07WUFDTixLQUFLLFNBQVMsQ0FBQztZQUNmLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssZ0JBQWdCLENBQUM7WUFDdEIsS0FBSyxjQUFjLENBQUM7WUFDcEIsS0FBSyxlQUFlO2dCQUNsQixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxtQkFBbUIsS0FBSyxJQUFJLENBQUMsQ0FBQztnQkFDckQsTUFBTTtZQUNSO2dCQUNFLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDdEMsTUFBTTtTQUNUO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsQ0FBQyJ9