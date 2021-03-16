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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvbG9nL19fd2lwX18vcHJlc2V0cy9oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFDLEtBQUssRUFBRSxXQUFXLEdBQUcsSUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFO0lBQ3BFLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBRXJFLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN0QixPQUFPLElBQUksT0FBTyxDQUFDO0lBQ25CLE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUNwQyxPQUFPLElBQUksT0FBTyxDQUFDO0lBQ25CLE9BQU8sSUFBSSxRQUFRLEtBQUssUUFBUSxDQUFDO0lBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUM7SUFDbkIsT0FBTyxJQUFJLFFBQVEsQ0FBQztJQUNwQixJQUFJLFdBQVcsRUFBRTtRQUNmLE9BQU8sSUFBSSxXQUFXLENBQUM7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBQztRQUNuQixPQUFPLElBQUksT0FBTyxDQUFDO0tBQ3BCO0lBQ0QscUJBQXFCO0lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDakMsT0FBTyxJQUFJLGVBQ1QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDM0MsbUJBQW1CLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxJQUFJLE9BQU8sQ0FBQztJQUNuQixPQUFPLElBQUksT0FBTyxDQUFDO0lBQ25CLE9BQU8sSUFBSSxJQUFJLENBQUM7SUFDaEIsT0FBTyxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO0lBQ3BDLE9BQU8sSUFBSSxPQUFPLENBQUM7SUFFbkIscUJBQXFCO0lBQ3JCLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyJ9