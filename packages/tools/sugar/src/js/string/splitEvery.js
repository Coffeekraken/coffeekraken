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
                // console.log(item, reg.test(item));
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
                    // console.log('CHECK', item);
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
            // console.log(arr);
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
    return splitEvery;
});
//# sourceMappingURL=module.js.map