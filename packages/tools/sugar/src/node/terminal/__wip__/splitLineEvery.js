"use strict";
/**
 * @name                                splitLineEvery
 * @namespace           sugar.node.terminal
 * @type                                Function
 *
 * Split a line every x characters but does not count the characters like \u011b and the tags like <red> etc...
 *
 * @param                    {String}                   line                    The line to split
 * @param                    {Number}                   every                   Every hoe many characters to split the line
 * @return                   {Array}                                            The splited line in Array format
 *
 * @example                 js
 * const splitLineEvery  = require('@coffeekraken/sugar/node/terminal/splitLineEvery');
 * splitLineEvery('Hello <red>world</red> how are you?', 5);
 * // ['Hello ', 'world', ' how ', 'are y', 'ou?']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function splitLineEvery(line, every) {
    let characters = line.split(/(<\/?[a-zA-Z0-9]+\s?\/?>)|(\u001b\[\d{1,3}m)/g);
    let lines = [];
    let currentLine = '';
    let filteredCharacters = [];
    let idx = 0;
    let isInTag = false;
    characters = characters.filter((c) => {
        return c !== undefined;
    });
    characters.forEach((c) => {
        if (c.match(/\u001b\[\d{1,3}m/g)) {
            filteredCharacters.push(c);
        }
        else if (c.match(/<\/?[a-zA-Z0-9]+\s?\/?>/g)) {
            filteredCharacters.push(c);
        }
        else if (c.match(/\\n/g)) {
            filteredCharacters.push(c);
        }
        else {
            filteredCharacters.push(...c.split(''));
        }
    });
    filteredCharacters.forEach((c) => {
        if (c.match(/\u001b\[\d{1,3}m/g)) {
        }
        else if (c.match(/<\/?[a-zA-Z0-9]+\s?\/?>/g)) {
        }
        else if (c === '\n') {
        }
        else {
            idx++;
        }
        currentLine += c;
        if (idx >= every || c === '\n') {
            lines.push(currentLine);
            currentLine = '';
            idx = 0;
        }
    });
    lines.push(currentLine);
    lines = lines.map((l) => {
        return l.trim();
    });
    return lines;
};
