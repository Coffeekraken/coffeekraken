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
            case 'margin':
            case 'margin-top':
            case 'margin-bottom':
            case 'margin-left':
            case 'margin-right':
            case 'padding':
            case 'padding-top':
            case 'padding-bottom':
            case 'padding-left':
            case 'padding-right':
                propsStack.push(`${prop}: sugar.space(${value})`);
                break;
            default:
                propsStack.push(`${prop}: ${value};`);
                break;
        }
    });
    return propsStack.join('\n');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNPYmplY3RUb0Nzc1Byb3BlcnRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqc09iamVjdFRvQ3NzUHJvcGVydGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQTRCdEUsTUFBTSxDQUFDLE9BQU8sVUFBVSx1QkFBdUIsQ0FDN0MsUUFBYSxFQUNiLFFBQW1DO0lBRW5DLE1BQU0sYUFBYSxHQUE2QixXQUFXLENBQ3pEO1FBQ0UsT0FBTyxFQUFFLEVBQUU7S0FDWixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQWEsRUFBRSxDQUFDO0lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDckMsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPO1FBRXZELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssYUFBYTtnQkFDaEIsVUFBVSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsS0FBSyxJQUFJLENBQUMsQ0FBQztnQkFDakQsTUFBTTtZQUNSLEtBQUssV0FBVztnQkFDZCxVQUFVLENBQUMsSUFBSSxDQUFDLG9CQUFvQixLQUFLLElBQUksQ0FBQyxDQUFDO2dCQUMvQyxNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLFVBQVUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQ2pELE1BQU07WUFDUixLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssWUFBWSxDQUFDO1lBQ2xCLEtBQUssZUFBZSxDQUFDO1lBQ3JCLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssY0FBYyxDQUFDO1lBQ3BCLEtBQUssU0FBUyxDQUFDO1lBQ2YsS0FBSyxhQUFhLENBQUM7WUFDbkIsS0FBSyxnQkFBZ0IsQ0FBQztZQUN0QixLQUFLLGNBQWMsQ0FBQztZQUNwQixLQUFLLGVBQWU7Z0JBQ2xCLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlCQUFpQixLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1I7Z0JBQ0UsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QyxNQUFNO1NBQ1Q7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixDQUFDIn0=