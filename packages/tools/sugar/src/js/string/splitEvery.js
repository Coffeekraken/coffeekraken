// @ts-nocheck
// @shared
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
    var countLine_1 = __importDefault(require("./countLine"));
    /**
     * @name                          splitEvery
     * @namespace           sugar.js.string
     * @type                          Function
     * @stable
     *
     * Split a string every n chars either by taking care of not spliting the words, or by simply spliting without any attention to that...
     *
     * @param               {String}                  text                      The text to split
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
    function splitEvery(text, every, splitWords) {
        if (splitWords === void 0) { splitWords = false; }
        if (splitWords) {
            var reg = new RegExp(".{1," + every + "}", 'g');
            return __spreadArrays(text.matchAll(reg)).map(function (o) { return o[0]; });
        }
        else {
            var reg_1 = new RegExp("(\\x1B[[0-9;]+m)|(\\x1B[39m])|(<[a-zA-Zs/]+>)", 
            // `(?:(?:\x1B\[[\d;]*m)*[^\x1B]){1,${every}}(?:(?:\x1B\[[\d;]*m)+$)?`,
            'g');
            // const reg = new RegExp(`(?:(?:\033\[[0-9;]*m)*.?){1,${every}}`, 'g');
            var chunks = text
                .split(reg_1)
                .filter(function (m) { return m != '' && m != null && m != undefined; })
                .map(function (item) {
                return item.split(/(\s{1,99999999})/g);
            });
            var finalChunks_1 = [];
            chunks.forEach(function (chunk) {
                finalChunks_1 = __spreadArrays(finalChunks_1, chunk);
            });
            var finalLines_1 = [''];
            var lineCount_1 = 0;
            var lastOpenedTag_1 = null;
            finalChunks_1.forEach(function (item) {
                if (!item)
                    return;
                if (reg_1.test(item)) {
                    if (item.substr(0, 2) !== '</' || item.substr(0, 4) !== '\x1B') {
                        lastOpenedTag_1 = item;
                        if (item.substr(0, 1) !== '<') {
                            lastOpenedTag_1 = "\u001B" + lastOpenedTag_1;
                        }
                    }
                    finalLines_1[finalLines_1.length - 1] += item;
                    return;
                }
                if (lineCount_1 + item.length > every) {
                    var toAdd = item.substr(0, every - lineCount_1 - 1);
                    finalLines_1[finalLines_1.length - 1] += toAdd;
                    var rest = lastOpenedTag_1 + item.replace(toAdd, '');
                    // if (toAdd.slice(-1) !== ' ' && rest.slice(0, 1) !== ' ')
                    //   finalLines[finalLines.length - 1] += '-';
                    var restLines = splitEvery(rest, every);
                    finalLines_1 = __spreadArrays(finalLines_1, restLines);
                    lineCount_1 = countLine_1.default(finalLines_1[finalLines_1.length - 1]);
                }
                else {
                    lineCount_1 += item.length;
                    finalLines_1[finalLines_1.length - 1] += item;
                }
            });
            return finalLines_1;
            // const arr = [];
            // [].forEach.call(chunks, function (a) {
            //   if (!/^(?:\033\[[0-9;]*m)*$/.test(a)) {
            //     arr.push(a);
            //   }
            // });
            var words_1 = text.split(' ');
            var lines_1 = [];
            var currentLine_1 = '';
            words_1.forEach(function (word, i) {
                if (currentLine_1.length + word.length <= every) {
                    currentLine_1 += word + ' ';
                    if (i === words_1.length - 1) {
                        lines_1.push(currentLine_1);
                    }
                }
                else if (i < words_1.length - 1) {
                    lines_1.push(currentLine_1);
                    currentLine_1 = word + ' ';
                }
                else {
                    lines_1.push(currentLine_1);
                    lines_1.push(word);
                }
            });
            lines_1 = lines_1.map(function (l) { return l.trim(); });
            lines_1 = lines_1.filter(function (l) { return l !== ''; });
            return lines_1;
        }
    }
    exports.default = splitEvery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRFdmVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwbGl0RXZlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFViwwREFBc0M7SUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBRUgsbUZBQW1GO0lBRW5GLFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBa0I7UUFBbEIsMkJBQUEsRUFBQSxrQkFBa0I7UUFDakQsSUFBSSxVQUFVLEVBQUU7WUFDZCxJQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxTQUFPLEtBQUssTUFBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLE9BQU8sZUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBSixDQUFJLENBQUMsQ0FBQztTQUNqRDthQUFNO1lBQ0wsSUFBTSxLQUFHLEdBQUcsSUFBSSxNQUFNLENBQ3BCLCtDQUFrRDtZQUNsRCx1RUFBdUU7WUFDdkUsR0FBRyxDQUNKLENBQUM7WUFDRix3RUFBd0U7WUFDeEUsSUFBTSxNQUFNLEdBQUcsSUFBSTtpQkFDaEIsS0FBSyxDQUFDLEtBQUcsQ0FBQztpQkFDVixNQUFNLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLFNBQVMsRUFBdEMsQ0FBc0MsQ0FBQztpQkFDckQsR0FBRyxDQUFDLFVBQUMsSUFBSTtnQkFDUixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztZQUNMLElBQUksYUFBVyxHQUFHLEVBQUUsQ0FBQztZQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLFVB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