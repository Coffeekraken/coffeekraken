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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRMaW5lRXZlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS90ZXJtaW5hbC9fX3dpcF9fL3NwbGl0TGluZUV2ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGNBQWMsQ0FBQyxJQUFJLEVBQUUsS0FBSztJQUNsRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7SUFDN0UsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2YsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBRXJCLElBQUksa0JBQWtCLEdBQUcsRUFBRSxDQUFDO0lBRTVCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztJQUVwQixVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ25DLE9BQU8sQ0FBQyxLQUFLLFNBQVMsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN2QixJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUNoQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUI7YUFBTSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsRUFBRTtZQUM5QyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUI7YUFBTSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDMUIsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCO2FBQU07WUFDTCxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQy9CLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1NBQ2pDO2FBQU0sSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLEVBQUU7U0FDL0M7YUFBTSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7U0FDdEI7YUFBTTtZQUNMLEdBQUcsRUFBRSxDQUFDO1NBQ1A7UUFFRCxXQUFXLElBQUksQ0FBQyxDQUFDO1FBRWpCLElBQUksR0FBRyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQzlCLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDeEIsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUNqQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ1Q7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFeEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN0QixPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDIn0=