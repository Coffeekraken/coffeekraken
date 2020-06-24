const __SCommand = require('../../terminal/SCommand');
const __deepMerge = require('../../object/deepMerge');
const __SFrontentServerCli = require('./SFrontendServerCli');

/**
 * @name              SFrontendServerCommand
 * @namespace           node.server.express
 * @type              SCommand
 *
 * This class represent a command used start an Express server locally.
 *
 * @param         {Object}        [argsObj={}]                An object to configure this specific php server command with these properties:
 * @param        {Object}         [commandSettings={}]         An object of SCommand settings to configure your command
 *
 * @example       js
 * const SFrontendServerCommand = require('@coffeekraken/sugar/node/build/frontend/SFrontendServerCommand');
 * const myCommand = new SFrontendServerCommand();
 * myCommand.run();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = class SFrontendServerCommand extends __SCommand {
  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(argsObj = {}, commandSettings = {}) {
    // init command
    super(
      'server.frontend',
      new __SFrontentServerCli(),
      __deepMerge(
        {
          argsObj,
          title: 'Frontend Express Node Server',
          key: 'f',
          concurrent: false,
          namespace: 'server.node'
        },
        commandSettings
      )
    );
  }
};
