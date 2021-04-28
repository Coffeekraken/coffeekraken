"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toString_1 = __importDefault(require("../string/toString"));
/**
 * @name                            replaceTags
 * @namespace            js.html
 * @type                            Function
 * @stable
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
 * import replaceTags from '@coffeekraken/sugar/js/html/replaceTags';
 * replaceTags('<span>Hello</span> world', {
 *    span: (tag, content) => `<div>${content}</div>`; // => <div>Hello</div> world
 * });
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function replaceTags(text, tags) {
    if (!text)
        text = '';
    text = toString_1.default(text);
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
exports.default = replaceTags;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVRhZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2h0bWwvcmVwbGFjZVRhZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsa0VBQTRDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSTtJQUM3QixJQUFJLENBQUMsSUFBSTtRQUFFLElBQUksR0FBRyxFQUFFLENBQUM7SUFDckIsSUFBSSxHQUFHLGtCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDaEQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxtQkFBbUI7SUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNwQyx5QkFBeUI7UUFDekIsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQ3BCLE9BQU8sT0FBTywyQkFBMkIsT0FBTyxHQUFHLEVBQ25ELEdBQUcsQ0FDSixDQUFDO1FBQ0YseUZBQXlGO1FBQ3pGLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFekMsTUFBTSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxPQUFPLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoRSxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXJELElBQUksU0FBUyxFQUFFO1lBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3pDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FDckIsUUFBUSxPQUFPLDJCQUEyQixPQUFPLEdBQUcsQ0FDckQsQ0FBQztnQkFDRixJQUFJLENBQUMsT0FBTztvQkFBRSxTQUFTO2dCQUN2QixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFOUIsZ0NBQWdDO2dCQUNoQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FDL0IsWUFBWSxFQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQ25DLENBQUM7YUFDSDtTQUNGO1FBRUQsSUFBSSxlQUFlLEVBQUU7WUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9DLE1BQU0sQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLE9BQU8sYUFBYSxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxPQUFPO29CQUFFLFNBQVM7Z0JBQ3ZCLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUV0QixnQ0FBZ0M7Z0JBQ2hDLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUMvQixZQUFZLEVBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FDbkMsQ0FBQzthQUNIO1NBQ0Y7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyRCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRWxELE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFDRCxrQkFBZSxXQUFXLENBQUMifQ==