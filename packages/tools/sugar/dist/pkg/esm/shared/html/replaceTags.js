// @ts-nocheck
import __toString from '../string/toString';
/**
 * @name                            replaceTags
 * @namespace            shared.html
 * @type                            Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * Replace all the html tags that you specify by something else that you can fully choose
 *
 * @param               {String}                 text                           The text in which replace all the tags
 * @param               {Object}                 tags                           An object of tags to replace which have as value the replacement function that take the tag name, the tag content and must return the replacement content
 * @return              {String}                                                The new text
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __replaceTags($1m $2)
 *
 * @example             js
 * import { __replaceTags } from '@coffeekraken/sugar/html';
 *  __replaceTags('<span>Hello</span> world', {
 *    span: (tag, content) => `<div>${content}</div>`; // => <div>Hello</div> world
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __replaceTags(text, tags) {
    if (!text)
        text = '';
    text = __toString(text);
    let oneLineText = text.replace(/\r\n/g, '|rn|');
    oneLineText = oneLineText.replace(/\n/g, '|n|');
    oneLineText = oneLineText.replace(/\r/g, '|r|');
    // loop on the tags
    Object.keys(tags).forEach((tagName) => {
        // create the match regex
        const reg = new RegExp(`<\s*${tagName}[^>]*>((.*?))<\\s*\/\\s*${tagName}>`, 'g');
        // const reg = new RegExp(`<\s*${tagName}[^>]*>(([\S\s]+)?)<\\s*\/\\s*${tagName}>`, 'g');
        const tagsArray = oneLineText.match(reg);
        const singleReg = new RegExp(`\\s?<${tagName}\\s?\/>\\s?`, 'g');
        const singleTagsArray = oneLineText.match(singleReg);
        if (tagsArray) {
            for (let i = 0; i < tagsArray.length; i++) {
                const t = tagsArray[i];
                const tagArgs = t.match(`<\\s*${tagName}[^>]*>((.*?))<\\s*\/\\s*${tagName}>`);
                if (!tagArgs)
                    continue;
                const tagToReplace = tagArgs[0];
                const tagContent = tagArgs[1];
                // call the replacement function
                oneLineText = oneLineText.replace(tagToReplace, tags[tagName](tagName, tagContent));
            }
        }
        if (singleTagsArray) {
            for (let i = 0; i < singleTagsArray.length; i++) {
                const t = singleTagsArray[i];
                const tagArgs = t.match(`\\s?<${tagName}\\s?\/>\\s?`);
                if (!tagArgs)
                    continue;
                const tagToReplace = tagArgs[0];
                const tagContent = '';
                // call the replacement function
                oneLineText = oneLineText.replace(tagToReplace, tags[tagName](tagName, tagContent));
            }
        }
    });
    oneLineText = oneLineText.replace(/\|rn\|/g, '\r\n');
    oneLineText = oneLineText.replace(/\|n\|/g, '\n');
    oneLineText = oneLineText.replace(/\|r\|/g, '\r');
    return oneLineText;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJO0lBQzVDLElBQUksQ0FBQyxJQUFJO1FBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNyQixJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsbUJBQW1CO0lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDbEMseUJBQXlCO1FBQ3pCLE1BQU0sR0FBRyxHQUFHLElBQUksTUFBTSxDQUNsQixPQUFPLE9BQU8sMkJBQTJCLE9BQU8sR0FBRyxFQUNuRCxHQUFHLENBQ04sQ0FBQztRQUNGLHlGQUF5RjtRQUN6RixNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXpDLE1BQU0sU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsT0FBTyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEUsTUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVyRCxJQUFJLFNBQVMsRUFBRTtZQUNYLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQ25CLFFBQVEsT0FBTywyQkFBMkIsT0FBTyxHQUFHLENBQ3ZELENBQUM7Z0JBQ0YsSUFBSSxDQUFDLE9BQU87b0JBQUUsU0FBUztnQkFDdkIsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTlCLGdDQUFnQztnQkFDaEMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQzdCLFlBQVksRUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUNyQyxDQUFDO2FBQ0w7U0FDSjtRQUVELElBQUksZUFBZSxFQUFFO1lBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM3QyxNQUFNLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxPQUFPLGFBQWEsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsT0FBTztvQkFBRSxTQUFTO2dCQUN2QixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztnQkFFdEIsZ0NBQWdDO2dCQUNoQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FDN0IsWUFBWSxFQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQ3JDLENBQUM7YUFDTDtTQUNKO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVsRCxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDIn0=