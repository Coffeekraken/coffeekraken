// @ts-nocheck
// @shared
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
    var toString_1 = __importDefault(require("../string/toString"));
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
        var oneLineText = text.replace(/\r\n/g, '|rn|');
        oneLineText = oneLineText.replace(/\n/g, '|n|');
        oneLineText = oneLineText.replace(/\r/g, '|r|');
        // loop on the tags
        Object.keys(tags).forEach(function (tagName) {
            // create the match regex
            var reg = new RegExp("<s*" + tagName + "[^>]*>((.*?))<\\s*/\\s*" + tagName + ">", 'g');
            // const reg = new RegExp(`<\s*${tagName}[^>]*>(([\S\s]+)?)<\\s*\/\\s*${tagName}>`, 'g');
            var tagsArray = oneLineText.match(reg);
            var singleReg = new RegExp("\\s?<" + tagName + "\\s?/>\\s?", 'g');
            var singleTagsArray = oneLineText.match(singleReg);
            if (tagsArray) {
                for (var i = 0; i < tagsArray.length; i++) {
                    var t = tagsArray[i];
                    var tagArgs = t.match("<\\s*" + tagName + "[^>]*>((.*?))<\\s*/\\s*" + tagName + ">");
                    if (!tagArgs)
                        continue;
                    var tagToReplace = tagArgs[0];
                    var tagContent = tagArgs[1];
                    // call the replacement function
                    oneLineText = oneLineText.replace(tagToReplace, tags[tagName](tagName, tagContent));
                }
            }
            if (singleTagsArray) {
                for (var i = 0; i < singleTagsArray.length; i++) {
                    var t = singleTagsArray[i];
                    var tagArgs = t.match("\\s?<" + tagName + "\\s?/>\\s?");
                    if (!tagArgs)
                        continue;
                    var tagToReplace = tagArgs[0];
                    var tagContent = '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVRhZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL2h0bWwvcmVwbGFjZVRhZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUVWLGdFQUE0QztJQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUk7UUFDN0IsSUFBSSxDQUFDLElBQUk7WUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksR0FBRyxrQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoRCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEQsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztZQUNoQyx5QkFBeUI7WUFDekIsSUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQ3BCLFFBQU8sT0FBTywrQkFBMkIsT0FBTyxNQUFHLEVBQ25ELEdBQUcsQ0FDSixDQUFDO1lBQ0YseUZBQXlGO1lBQ3pGLElBQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFekMsSUFBTSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsVUFBUSxPQUFPLGVBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNoRSxJQUFNLGVBQWUsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXJELElBQUksU0FBUyxFQUFFO2dCQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN6QyxJQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQ3JCLFVBQVEsT0FBTywrQkFBMkIsT0FBTyxNQUFHLENBQ3JELENBQUM7b0JBQ0YsSUFBSSxDQUFDLE9BQU87d0JBQUUsU0FBUztvQkFDdkIsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRTlCLGdDQUFnQztvQkFDaEMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQy9CLFlBQVksRUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUNuQyxDQUFDO2lCQUNIO2FBQ0Y7WUFFRCxJQUFJLGVBQWUsRUFBRTtnQkFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQy9DLElBQU0sQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFRLE9BQU8sZUFBYSxDQUFDLENBQUM7b0JBQ3RELElBQUksQ0FBQyxPQUFPO3dCQUFFLFNBQVM7b0JBQ3ZCLElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEMsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO29CQUV0QixnQ0FBZ0M7b0JBQ2hDLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUMvQixZQUFZLEVBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FDbkMsQ0FBQztpQkFDSDthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVsRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=