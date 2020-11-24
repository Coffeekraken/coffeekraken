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
