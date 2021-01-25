"use strict";
// @ts-nocheck
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRMaW5lRXZlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcGxpdExpbmVFdmVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxjQUFjLENBQUMsSUFBSSxFQUFFLEtBQUs7SUFDbEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO0lBQzdFLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNmLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUVyQixJQUFJLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztJQUU1QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDWixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFFcEIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNuQyxPQUFPLENBQUMsS0FBSyxTQUFTLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7SUFFSCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdkIsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQUU7WUFDaEMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCO2FBQU0sSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLEVBQUU7WUFDOUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCO2FBQU0sSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzFCLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QjthQUFNO1lBQ0wsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUMvQixJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBRTtTQUNqQzthQUFNLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxFQUFFO1NBQy9DO2FBQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1NBQ3RCO2FBQU07WUFDTCxHQUFHLEVBQUUsQ0FBQztTQUNQO1FBRUQsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUVqQixJQUFJLEdBQUcsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUM5QixLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hCLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDakIsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNUO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXhCLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdEIsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQyJ9