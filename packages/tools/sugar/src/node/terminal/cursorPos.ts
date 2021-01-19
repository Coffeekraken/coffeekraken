// @ts-nocheck

import { terminal as __terminalKit } from 'terminal-kit';

// TODO tests

/**
 * @name                                      cursorPos
 * @namespace           sugar.node.terminal
 * @type                                      Function
 * @wip
 *
 * Return the terminal cursor position in {x,y} format.
 *
 * @return              {Promise}                         A promise resolved once the position has been getted
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      move in "format" folder
 *
 * @example             js
 * import cursorPos from '@coffeekraken/sugar/node/terminal/cursorPos';
 * await cursorPos(); // => { x: 10, y: 20 }
 *
 * @see       https://www.npmjs.com/package/terminal-kit
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function cursorPos() {
  return new Promise(async ({ resolve, reject }) => {
    __terminalKit.once('terminal', (name, data) => {
      resolve(data);
    });
    try {
      await __terminalKit.getCursorLocation();
    } catch (e) {}
  });
}
export = cursorPos;
