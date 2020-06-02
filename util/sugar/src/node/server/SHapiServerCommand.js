const __SCommand = require('../terminal/SCommand');
const __deepMerge = require('../object/deepMerge');
const __SHapiServerCli = require('./SHapiServerCli');

/**
 * @name              SHapiServerCommand
 * @namespace         sugar.node.server
 * @type              SCommand
 *
 * This class represent a command used start a PHP server locally.
 *
 * @param         {Object}        [argsObj={}]                An object to configure this specific php server command with these properties:
 * @param        {Object}         [commandSettings={}]         An object of SCommand settings to configure your command
 *
 * @example       js
 * const SHapiServerCommand = require('@coffeekraken/sugar/node/build/commands/SHapiServerCommand');
 * const myCommand = new SHapiServerCommand();
 * myCommand.run();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = class SHapiServerCommand extends __SCommand {
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
      'server.hapi',
      new __SHapiServerCli(),
      __deepMerge(
        {
          argsObj,
          title: 'Hapi Node Server',
          key: 'h',
          concurrent: false,
          namespace: 'server.node'
        },
        commandSettings
      )
    );
  }
};
