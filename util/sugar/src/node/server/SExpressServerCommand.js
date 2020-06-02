const __SCommand = require('../terminal/SCommand');
const __deepMerge = require('../object/deepMerge');
const __SExpressServerCli = require('./SExpressServerCli');

/**
 * @name              SExpressServerCommand
 * @namespace         sugar.node.server
 * @type              SCommand
 *
 * This class represent a command used start an Express server locally.
 *
 * @param         {Object}        [argsObj={}]                An object to configure this specific php server command with these properties:
 * @param        {Object}         [commandSettings={}]         An object of SCommand settings to configure your command
 *
 * @example       js
 * const SExpressServerCommand = require('@coffeekraken/sugar/node/build/commands/SExpressServerCommand');
 * const myCommand = new SExpressServerCommand();
 * myCommand.run();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = class SExpressServerCommand extends __SCommand {
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
      new __SExpressServerCli(),
      __deepMerge(
        {
          argsObj,
          title: 'Express Node Server',
          key: 'e',
          concurrent: false,
          namespace: 'server.node'
        },
        commandSettings
      )
    );
  }
};
