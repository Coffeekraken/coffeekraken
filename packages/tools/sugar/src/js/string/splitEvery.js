// @ts-nocheck
// @shared
import __countLine from './countLine';
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
                lineCount = __countLine(finalLines[finalLines.length - 1]);
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
export default splitEvery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRFdmVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwbGl0RXZlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFFVixPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsbUZBQW1GO0FBRW5GLFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHLEtBQUs7SUFDakQsSUFBSSxVQUFVLEVBQUU7UUFDZCxNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pEO1NBQU07UUFDTCxNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FDcEIsa0RBQWtEO1FBQ2xELHVFQUF1RTtRQUN2RSxHQUFHLENBQ0osQ0FBQztRQUNGLHdFQUF3RTtRQUN4RSxNQUFNLE1BQU0sR0FBRyxJQUFJO2FBQ2hCLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDO2FBQ3JELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDTCxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxF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