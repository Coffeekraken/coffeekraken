const __SCommand = require('../terminal/SCommand');
const __deepMerge = require('../object/deepMerge');
const __SBladePhpServerCli = require('./SBladePhpServerCli');

/**
 * @name              SBladePhpServerCommand
 * @namespace         sugar.node.server
 * @type              SCommand
 *
 * This class represent a command used start a Blade PHP server locally.
 *
 * @param         {Object}        [argsObj={}]                An object to configure this specific php server command with these properties:
 * @param        {Object}         [commandSettings={}]         An object of SCommand settings to configure your command
 *
 * @example       js
 * const SBladePhpServerCommand = require('@coffeekraken/sugar/node/build/commands/SBladePhpServerCommand');
 * const myCommand = new SBladePhpServerCommand();
 * myCommand.run();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = class SBladePhpServerCommand extends __SCommand {
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
      'server.bladePhp',
      new __SBladePhpServerCli(),
      __deepMerge(
        {
          argsObj,
          title: 'Blade PHP Server',
          key: 'b',
          concurrent: false,
          namespace: 'server.php'
        },
        commandSettings
      )
    );
  }
};
