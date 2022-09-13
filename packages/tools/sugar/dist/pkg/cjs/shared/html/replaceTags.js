"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toString_1 = __importDefault(require("../string/toString"));
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
 * @example             js
 * import { __replaceTags } from '@coffeekraken/sugar/html';
 *  __replaceTags('<span>Hello</span> world', {
 *    span: (tag, content) => `<div>${content}</div>`; // => <div>Hello</div> world
 * });
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __replaceTags(text, tags) {
    if (!text)
        text = '';
    text = (0, toString_1.default)(text);
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
exports.default = __replaceTags;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtFQUE0QztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUF3QixhQUFhLENBQUMsSUFBSSxFQUFFLElBQUk7SUFDNUMsSUFBSSxDQUFDLElBQUk7UUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLElBQUksR0FBRyxJQUFBLGtCQUFVLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDaEQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxtQkFBbUI7SUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNsQyx5QkFBeUI7UUFDekIsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQ2xCLE9BQU8sT0FBTywyQkFBMkIsT0FBTyxHQUFHLEVBQ25ELEdBQUcsQ0FDTixDQUFDO1FBQ0YseUZBQXlGO1FBQ3pGLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFekMsTUFBTSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxPQUFPLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoRSxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXJELElBQUksU0FBUyxFQUFFO1lBQ1gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3ZDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FDbkIsUUFBUSxPQUFPLDJCQUEyQixPQUFPLEdBQUcsQ0FDdkQsQ0FBQztnQkFDRixJQUFJLENBQUMsT0FBTztvQkFBRSxTQUFTO2dCQUN2QixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFOUIsZ0NBQWdDO2dCQUNoQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FDN0IsWUFBWSxFQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQ3JDLENBQUM7YUFDTDtTQUNKO1FBRUQsSUFBSSxlQUFlLEVBQUU7WUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdDLE1BQU0sQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLE9BQU8sYUFBYSxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxPQUFPO29CQUFFLFNBQVM7Z0JBQ3ZCLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUV0QixnQ0FBZ0M7Z0JBQ2hDLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUM3QixZQUFZLEVBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FDckMsQ0FBQzthQUNMO1NBQ0o7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyRCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRWxELE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUEzREQsZ0NBMkRDIn0=