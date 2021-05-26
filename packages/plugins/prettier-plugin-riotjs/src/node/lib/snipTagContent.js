// @ts-nocheck
export const snippedTagContentAttribute = '✂prettier:content✂';
export function snipScriptAndStyleTagContent(source) {
    const scriptMatchSpans = getMatchIndexes('script');
    const styleMatchSpans = getMatchIndexes('style');
    return snipTagContent(snipTagContent(source, 'script', '{}', scriptMatchSpans, styleMatchSpans), 'style', '', styleMatchSpans, scriptMatchSpans);
    function getMatchIndexes(tagName) {
        const regex = getRegexp(tagName);
        const indexes = [];
        let match = null;
        while ((match = regex.exec(source)) != null) {
            indexes.push([match.index, regex.lastIndex]);
        }
        return indexes;
    }
    function snipTagContent(_source, tagName, placeholder, ownSpans, otherSpans) {
        const regex = getRegexp(tagName);
        let idx = 0;
        return _source.replace(regex, (match, attributes, content) => {
            if (match.startsWith('<!--') || withinOtherSpan(idx)) {
                return match;
            }
            const encodedContent = Buffer.from(content).toString('base64');
            return `<${tagName}${attributes} ${snippedTagContentAttribute}="${encodedContent}">${placeholder}</${tagName}>`;
        });
        function withinOtherSpan(idx) {
            return otherSpans.some((otherSpan) => ownSpans[idx][0] > otherSpan[0] && ownSpans[idx][1] < otherSpan[1]);
        }
    }
    function getRegexp(tagName) {
        return new RegExp(`<!--[^]*?-->|<${tagName}([^]*?)>([^]*?)<\/${tagName}>`, 'g');
    }
}
export function hasSnippedContent(text) {
    return text.includes(snippedTagContentAttribute);
}
export function unsnipContent(text) {
    const regex = /(<\w+.*?)\s*✂prettier:content✂="(.*?)">.*?(?=<\/)/gi;
    return text.replace(regex, (_, start, encodedContent) => {
        const content = Buffer.from(encodedContent, 'base64').toString('utf8');
        return `${start}>${content}`;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25pcFRhZ0NvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbmlwVGFnQ29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQUcsb0JBQW9CLENBQUM7QUFFL0QsTUFBTSxVQUFVLDRCQUE0QixDQUFDLE1BQWM7SUFDekQsTUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsTUFBTSxlQUFlLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWpELE9BQU8sY0FBYyxDQUNuQixjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDLEVBQ3pFLE9BQU8sRUFDUCxFQUFFLEVBQ0YsZUFBZSxFQUNmLGdCQUFnQixDQUNqQixDQUFDO0lBRUYsU0FBUyxlQUFlLENBQUMsT0FBZTtRQUN0QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsTUFBTSxPQUFPLEdBQXVCLEVBQUUsQ0FBQztRQUN2QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELFNBQVMsY0FBYyxDQUNyQixPQUFlLEVBQ2YsT0FBZSxFQUNmLFdBQW1CLEVBQ25CLFFBQTRCLEVBQzVCLFVBQThCO1FBRTlCLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsRUFBRTtZQUMzRCxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNwRCxPQUFPLEtBQUssQ0FBQzthQUNkO1lBQ0QsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0QsT0FBTyxJQUFJLE9BQU8sR0FBRyxVQUFVLElBQUksMEJBQTBCLEtBQUssY0FBYyxLQUFLLFdBQVcsS0FBSyxPQUFPLEdBQUcsQ0FBQztRQUNsSCxDQUFDLENBQUMsQ0FBQztRQUVILFNBQVMsZUFBZSxDQUFDLEdBQVc7WUFDbEMsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUNwQixDQUFDLFNBQVMsRUFBRSxFQUFFLENBQ1osUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUNyRSxDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7SUFFRCxTQUFTLFNBQVMsQ0FBQyxPQUFlO1FBQ2hDLE9BQU8sSUFBSSxNQUFNLENBQ2YsaUJBQWlCLE9BQU8scUJBQXFCLE9BQU8sR0FBRyxFQUN2RCxHQUFHLENBQ0osQ0FBQztJQUNKLENBQUM7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLElBQVk7SUFDNUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsSUFBWTtJQUN4QyxNQUFNLEtBQUssR0FBRyxxREFBcUQsQ0FBQztJQUVwRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsRUFBRTtRQUN0RCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkUsT0FBTyxHQUFHLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMifQ==