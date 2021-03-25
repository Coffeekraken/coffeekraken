// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../string/toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVRhZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXBsYWNlVGFncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxrRUFBNEM7SUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJO1FBQzdCLElBQUksQ0FBQyxJQUFJO1lBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLEdBQUcsa0JBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoRCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hELG1CQUFtQjtRQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3BDLHlCQUF5QjtZQUN6QixNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FDcEIsT0FBTyxPQUFPLDJCQUEyQixPQUFPLEdBQUcsRUFDbkQsR0FBRyxDQUNKLENBQUM7WUFDRix5RkFBeUY7WUFDekYsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV6QyxNQUFNLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLE9BQU8sYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFckQsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3pDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FDckIsUUFBUSxPQUFPLDJCQUEyQixPQUFPLEdBQUcsQ0FDckQsQ0FBQztvQkFDRixJQUFJLENBQUMsT0FBTzt3QkFBRSxTQUFTO29CQUN2QixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFOUIsZ0NBQWdDO29CQUNoQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FDL0IsWUFBWSxFQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQ25DLENBQUM7aUJBQ0g7YUFDRjtZQUVELElBQUksZUFBZSxFQUFFO2dCQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDL0MsTUFBTSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsT0FBTyxhQUFhLENBQUMsQ0FBQztvQkFDdEQsSUFBSSxDQUFDLE9BQU87d0JBQUUsU0FBUztvQkFDdkIsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7b0JBRXRCLGdDQUFnQztvQkFDaEMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQy9CLFlBQVksRUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUNuQyxDQUFDO2lCQUNIO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyRCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWxELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxrQkFBZSxXQUFXLENBQUMifQ==