// @ts-nocheck

import __countLineChars from './countLineChars';

/**
 * @name                          splitEvery
 * @namespace            shared.string
 * @type                          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Split a string every n chars either by taking care of not spliting the words, or by simply spliting without any attention to that...
 *
 * @param               {String}                  text                      The text to split
 * @param               {Number}                  every                     How many characters to split the text
 * @param               {Partial<ISplitEverySettings}       [settings=[]]       Some settings to configure your split process
 * @return              {Array}                                             An array of the splited text parts
 *
 * @setting         {Boolean}           [splitWords=true]        If you want to split the words or not...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __splitEvery($1, $2)
 * 
 * @example           js
 * import { __splitEvery } from '@coffeekraken/sugar/string';
 * __splitEvery('Hello World', 2, {
 *    splitWords: true
 * }); // => ['He','ll','o ','Wo','rl','d']
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

// TODO: Add support for special characters like terminal colors, html tags, etc...

export interface ISplitEverySettings {
    splitWords: boolean;
}

export default function __splitEvery(
    text,
    every,
    settings: Partial<ISplitEverySettings> = {},
) {
    const finalSettings: ISplitEverySettings = {
        splitWords: true,
        ...settings,
    };

    if (finalSettings.splitWords) {
        const reg = new RegExp(`.{1,${every}}`, 'g');
        return [...text.matchAll(reg)].map((o) => o[0]);
    } else {
        const reg = new RegExp(
            `(\\x1B\[[0-9;]+m)|(\\x1B\[39m])|(<[a-zA-Z\s/]+>)`,
            // `(?:(?:\x1B\[[\d;]*m)*[^\x1B]){1,${every}}(?:(?:\x1B\[[\d;]*m)+$)?`,
            'g',
        );
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
            if (!item) return;

            if (reg.test(item)) {
                if (
                    item.substr(0, 2) !== '</' ||
                    item.substr(0, 4) !== '\x1B'
                ) {
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
                lineCount = __countLineChars(finalLines[finalLines.length - 1]);
            } else {
                lineCount += item.length;
                finalLines[finalLines.length - 1] += item;
            }
        });

        return finalLines;
    }
}
