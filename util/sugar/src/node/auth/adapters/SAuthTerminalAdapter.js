const __SAuthAdapter = require('./SAuthAdapter');
const __blessed = require('blessed');
const __terminalKit = require('terminal-kit');
const __parseHtml = require('../../terminal/parseHtml');

/**
 * @name                            STerminalAuthAdapter
 * @namespace                       sugar.node.auth.adapters
 * @type                            Class
 * 
 * Terminal SAuth adapter that allows you to ask the auth informations through the terminal
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class STerminalAuthAdapter extends __SAuthAdapter {

  /**
   * @name                          constructor
   * @type                          Function
   * 
   * Construct the STerminalAuthAdapter instance
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor() {
    super(['basic', 'bearer']);
  }

  /**
   * @name                      _basic
   * @type                      Function
   * @async
   * 
   * Ask the user for username, password
   * 
   * @return            {Promise}                     A promise that will be resolved with the getted username, password
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _basic() {

    const term = __terminalKit.createTerminal({});

    console.log(__parseHtml('<cyan><bold>Username</bold></cyan>:'));
    const username = await term.inputField({
      cancelable: true
    }).promise;

    if (!username) {
      term.processExit();
      return null;
    }

    console.log('');
    console.log(__parseHtml('<cyan><bold>Password</bold></cyan>:'));
    const password = await term.inputField({
      echoChar: '*',
      cancelable: true
    }).promise;

    if (!password) {
      term.processExit();
      return null;
    }

    term.processExit();
    return {
      username,
      password
    };

  }


}