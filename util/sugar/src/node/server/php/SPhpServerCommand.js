const __SCommand = require('../../terminal/SCommand');
const __deepMerge = require('../../object/deepMerge');
const __SPhpServerCli = require('./SPhpServerCli');

/**
 * @name              SPhpServerCommand
 * @namespace         sugar.node.server.php
 * @type              SCommand
 *
 * This class represent a command used start a PHP server locally.
 *
 * @param         {Object}        [argsObj={}]                An object to configure this specific php server command with these properties:
 * @param        {Object}         [commandSettings={}]         An object of SCommand settings to configure your command
 *
 * @example       js
 * const SPhpServerCommand = require('@coffeekraken/sugar/node/build/commands/SPhpServerCommand');
 * const myCommand = new SPhpServerCommand();
 * myCommand.run();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = class SPhpServerCommand extends __SCommand {
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
      'server.php',
      new __SPhpServerCli(),
      __deepMerge(
        {
          argsObj,
          title: 'PHP Server',
          key: 'p',
          concurrent: false,
          namespace: 'server.php'
        },
        commandSettings
      )
    );
  }
};
