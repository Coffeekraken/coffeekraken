// @ts-nocheck
export function extractAttributes(html) {
    const extractAttributesRegex = /<[a-z]+\s*(.*?)>/i;
    const attributeRegex = /([^\s=]+)(?:=("|')(.*?)\2)?/gi;
    const [, attributesString] = html.match(extractAttributesRegex);
    const attrs = [];
    let match;
    while ((match = attributeRegex.exec(attributesString))) {
        const [all, name, quotes, value] = match;
        const attrStart = match.index;
        let valueNode;
        if (!value) {
            valueNode = true;
        }
        else {
            let valueStart = attrStart + name.length;
            if (quotes) {
                valueStart += 2;
            }
            valueNode = [
                {
                    type: 'Text',
                    data: value,
                    start: valueStart,
                    end: valueStart + value.length
                }
            ];
        }
        attrs.push({
            type: 'Attribute',
            name,
            value: valueNode,
            start: attrStart,
            end: attrStart + all.length
        });
    }
    return attrs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdEF0dHJpYnV0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHRyYWN0QXR0cmlidXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBSWQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLElBQVk7SUFDNUMsTUFBTSxzQkFBc0IsR0FBRyxtQkFBbUIsQ0FBQztJQUNuRCxNQUFNLGNBQWMsR0FBRywrQkFBK0IsQ0FBQztJQUV2RCxNQUFNLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUUsQ0FBQztJQUVqRSxNQUFNLEtBQUssR0FBb0IsRUFBRSxDQUFDO0lBRWxDLElBQUksS0FBOEIsQ0FBQztJQUNuQyxPQUFPLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFO1FBQ3RELE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDekMsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQU0sQ0FBQztRQUUvQixJQUFJLFNBQWlDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDbEI7YUFBTTtZQUNMLElBQUksVUFBVSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3pDLElBQUksTUFBTSxFQUFFO2dCQUNWLFVBQVUsSUFBSSxDQUFDLENBQUM7YUFDakI7WUFFRCxTQUFTLEdBQUc7Z0JBQ1Y7b0JBQ0UsSUFBSSxFQUFFLE1BQU07b0JBQ1osSUFBSSxFQUFFLEtBQUs7b0JBQ1gsS0FBSyxFQUFFLFVBQVU7b0JBQ2pCLEdBQUcsRUFBRSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU07aUJBQ25CO2FBQ2QsQ0FBQztTQUNIO1FBRUQsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNULElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUk7WUFDSixLQUFLLEVBQUUsU0FBUztZQUNoQixLQUFLLEVBQUUsU0FBUztZQUNoQixHQUFHLEVBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNO1NBQzVCLENBQUMsQ0FBQztLQUNKO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIn0=