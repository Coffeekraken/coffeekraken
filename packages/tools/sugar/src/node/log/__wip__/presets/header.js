"use strict";
// @ts-nocheck
/**
 * @name                header
 * @namespace           sugar.node.log.presets
 * @type                Function
 *
 * Log a header message containing infos like passed title, passed description and passed infos {Object}.
 *
 * @param           {String}              title                 The title to display
 * @param           {String}              [description=null]    The description to display
 * @param           {Object}              [infos={}]            An object of infos to display in {key}: {value} format
 * @return          {String}                                    A formatted header string that you can pas to the your log function
 *
 * @example         js
 * const header = require('@coffeekraken/sugar/node/log/presets/header');
 * console.log(header('Hello World', 'Something cool to say about the application...', { version: '1.0.0' }));
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function header(title, description = null, infos = {}) {
    const columns = process.env.STDOUT_COLUMNS || process.stdout.columns;
    let message = '<br/>';
    message += '<br/>';
    message += `${'#'.repeat(columns)}`;
    message += '<br/>';
    message += `<red>${title}</red>`;
    message += '<br/>';
    message += '<br/> ';
    if (description) {
        message += description;
        message += '<br/>';
        message += '<br/>';
    }
    // loop on each infos
    Object.keys(infos).forEach((key) => {
        message += `<bold><cyan>${key.charAt(0).toUpperCase() + key.slice(1)}</cyan></bold>: ${infos[key]}\n`;
    });
    message += '<br/>';
    message += '<br/>';
    message += '\n';
    message += `${'#'.repeat(columns)}`;
    message += '<br/>';
    // return the message
    return message;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE1BQU0sQ0FBQyxLQUFLLEVBQUUsV0FBVyxHQUFHLElBQUksRUFBRSxLQUFLLEdBQUcsRUFBRTtJQUNwRSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUVyRSxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDdEIsT0FBTyxJQUFJLE9BQU8sQ0FBQztJQUNuQixPQUFPLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDcEMsT0FBTyxJQUFJLE9BQU8sQ0FBQztJQUNuQixPQUFPLElBQUksUUFBUSxLQUFLLFFBQVEsQ0FBQztJQUNqQyxPQUFPLElBQUksT0FBTyxDQUFDO0lBQ25CLE9BQU8sSUFBSSxRQUFRLENBQUM7SUFDcEIsSUFBSSxXQUFXLEVBQUU7UUFDZixPQUFPLElBQUksV0FBVyxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQUM7UUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBQztLQUNwQjtJQUNELHFCQUFxQjtJQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ2pDLE9BQU8sSUFBSSxlQUNULEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQzNDLG1CQUFtQixLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sSUFBSSxPQUFPLENBQUM7SUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBQztJQUNuQixPQUFPLElBQUksSUFBSSxDQUFDO0lBQ2hCLE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUNwQyxPQUFPLElBQUksT0FBTyxDQUFDO0lBRW5CLHFCQUFxQjtJQUNyQixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUMifQ==