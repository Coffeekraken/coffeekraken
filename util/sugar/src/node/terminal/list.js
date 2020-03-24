const __terminalKit = require('terminal-kit');


const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('./parseHtml');
const __STerminalList = require('./STerminalList');

/**
 * @name                            list
 * @namespace                       sugar.node.terminal
 * @type                            Function
 *
 * Allows you to create some lists either selectable or not
 *
 * @param             {Array}               items           An array of items in string format or in object format with properties "text" and "value"
 * @param             {Object}              [settings={}]     On object of settings to configure the list like color, etc...
 * @return            {String}                                The string representing the formatted list to log where you want
 *
 * @example           js
 * const list = require('@coffeekraken/node/terminal/list');
 * const myList = list(['Hello','World'], {
 *   item: text => `<white>${text}</white>`,
 *   selected: text => `<bgYellow><black> ${text} </black></bgYellow>`
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function list(items, settings = {}) {
  const terminalList = new __STerminalList(items, settings);
  terminalList.log();
}



// function terminate() {
//   __terminalKit.grabInput(false);
//   setTimeout(function () { process.exit() }, 100);
// }
// __terminalKit.grabInput({ mouse: 'button' });
// __terminalKit.on('key', function (name, matches, data) {
//   switch (name.toUpperCase()) {
//     case 'UP':

//       break;
//     case 'DOWN':

//       break;
//     case 'RIGHT':

//       break;
//     case 'LEFT':

//       break;
//   }
//   if (name === 'CTRL_C') { terminate(); }
// });