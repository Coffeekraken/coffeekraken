"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const toString_1 = __importDefault(require("../string/toString"));
/**
 * @name                            replaceTags
 * @namespace           sugar.js.html
 * @type                            Function
 * @stable
 *
 * Replace all the html tags that you specify by something else that you can fully choose
 *
 * @param               {String}                 text                           The text in which replace all the tags
 * @param               {Object}                 tags                           An object of tags to replace which have as value the replacement function that take the tag name, the tag content and must return the replacement content
 * @return              {String}                                                The new text
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
module.exports = replaceTags;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVRhZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXBsYWNlVGFncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7QUFFVixrRUFBNEM7QUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJO0lBQzdCLElBQUksQ0FBQyxJQUFJO1FBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNyQixJQUFJLEdBQUcsa0JBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNoRCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRWhELG1CQUFtQjtJQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ3BDLHlCQUF5QjtRQUN6QixNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FDcEIsT0FBTyxPQUFPLDJCQUEyQixPQUFPLEdBQUcsRUFDbkQsR0FBRyxDQUNKLENBQUM7UUFDRix5RkFBeUY7UUFDekYsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV6QyxNQUFNLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLE9BQU8sYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFckQsSUFBSSxTQUFTLEVBQUU7WUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUNyQixRQUFRLE9BQU8sMkJBQTJCLE9BQU8sR0FBRyxDQUNyRCxDQUFDO2dCQUNGLElBQUksQ0FBQyxPQUFPO29CQUFFLFNBQVM7Z0JBQ3ZCLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU5QixnQ0FBZ0M7Z0JBQ2hDLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUMvQixZQUFZLEVBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FDbkMsQ0FBQzthQUNIO1NBQ0Y7UUFFRCxJQUFJLGVBQWUsRUFBRTtZQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDL0MsTUFBTSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsT0FBTyxhQUFhLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLE9BQU87b0JBQUUsU0FBUztnQkFDdkIsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7Z0JBRXRCLGdDQUFnQztnQkFDaEMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQy9CLFlBQVksRUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUNuQyxDQUFDO2FBQ0g7U0FDRjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFbEQsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQUNELGlCQUFTLFdBQVcsQ0FBQyJ9