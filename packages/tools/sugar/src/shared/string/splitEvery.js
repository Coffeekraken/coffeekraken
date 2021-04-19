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
        define(["require", "exports", "./countLine"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const countLine_1 = __importDefault(require("./countLine"));
    /**
     * @name                          splitEvery
     * @namespace           sugar.js.string
     * @type                          Function
     * @stable
     *
     * Split a string every n chars either by taking care of not spliting the words, or by simply spliting without any attention to that...
     *
     * @param               {String}                  text                      The text to split
     * @param               {Number}                  every                     How many characters to split the text
     * @param               {Boolean}                 [splitWords=false]        If you want to split the words or not...
     * @return              {Array}                                             An array of the splited text parts
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example           js
     * import splitEvery from '@coffeekraken/node/string/splitEvery';
     * splitEvery('Hello World', 2, true); // => ['He','ll','o ','Wo','rl','d']
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    // TODO: Add support for special characters like terminal colors, html tags, etc...
    function splitEvery(text, every, splitWords = false) {
        if (splitWords) {
            const reg = new RegExp(`.{1,${every}}`, 'g');
            return [...text.matchAll(reg)].map((o) => o[0]);
        }
        else {
            const reg = new RegExp(`(\\x1B\[[0-9;]+m)|(\\x1B\[39m])|(<[a-zA-Z\s/]+>)`, 
            // `(?:(?:\x1B\[[\d;]*m)*[^\x1B]){1,${every}}(?:(?:\x1B\[[\d;]*m)+$)?`,
            'g');
            // const reg = new RegExp(`(?:(?:\033\[[0-9;]*m)*.?){1,${every}}`, 'g');
            const chunks = text
                .split(reg)
                .filter((m) => m != '' && m != null && m != undefined)
                .map((item) => {
                return item.split(/(\s{1,99999999})/g);
            });
            let finalChunks = [];
            chunks.forEach((chunk) => {
                finalChunks = [...finalChunks, ...chunk];
            });
            let finalLines = [''];
            let lineCount = 0;
            let lastOpenedTag = null;
            finalChunks.forEach((item) => {
                if (!item)
                    return;
                if (reg.test(item)) {
                    if (item.substr(0, 2) !== '</' || item.substr(0, 4) !== '\x1B') {
                        lastOpenedTag = item;
                        if (item.substr(0, 1) !== '<') {
                            lastOpenedTag = `\x1B${lastOpenedTag}`;
                        }
                    }
                    finalLines[finalLines.length - 1] += item;
                    return;
                }
                if (lineCount + item.length > every) {
                    const toAdd = item.substr(0, every - lineCount - 1);
                    finalLines[finalLines.length - 1] += toAdd;
                    const rest = lastOpenedTag + item.replace(toAdd, '');
                    // if (toAdd.slice(-1) !== ' ' && rest.slice(0, 1) !== ' ')
                    //   finalLines[finalLines.length - 1] += '-';
                    const restLines = splitEvery(rest, every);
                    finalLines = [...finalLines, ...restLines];
                    lineCount = countLine_1.default(finalLines[finalLines.length - 1]);
                }
                else {
                    lineCount += item.length;
                    finalLines[finalLines.length - 1] += item;
                }
            });
            return finalLines;
            // const arr = [];
            // [].forEach.call(chunks, function (a) {
            //   if (!/^(?:\033\[[0-9;]*m)*$/.test(a)) {
            //     arr.push(a);
            //   }
            // });
            const words = text.split(' ');
            let lines = [];
            let currentLine = '';
            words.forEach((word, i) => {
                if (currentLine.length + word.length <= every) {
                    currentLine += word + ' ';
                    if (i === words.length - 1) {
                        lines.push(currentLine);
                    }
                }
                else if (i < words.length - 1) {
                    lines.push(currentLine);
                    currentLine = word + ' ';
                }
                else {
                    lines.push(currentLine);
                    lines.push(word);
                }
            });
            lines = lines.map((l) => l.trim());
            lines = lines.filter((l) => l !== '');
            return lines;
        }
    }
    exports.default = splitEvery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRFdmVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwbGl0RXZlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNERBQXNDO0lBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCRztJQUVILG1GQUFtRjtJQUVuRixTQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRyxLQUFLO1FBQ2pELElBQUksVUFBVSxFQUFFO1lBQ2QsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM3QyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqRDthQUFNO1lBQ0wsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQ3BCLGtEQUFrRDtZQUNsRCx1RUFBdUU7WUFDdkUsR0FBRyxDQUNKLENBQUM7WUFDRix3RUFBd0U7WUFDeEUsTUFBTSxNQUFNLEdBQUcsSUFBSTtpQkFDaEIsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDO2lCQUNyRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDWixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztZQUNMLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZC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