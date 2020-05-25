const __SCommand = require('../../terminal/SCommand');
const __deepMerge = require('../../object/deepMerge');
const __argsToString = require('../../cli/argsToString');
const __phpCli = require('../../../cli/server/php.cli');

/**
 * @name              SPhpServerCommand
 * @namespace         sugar.node.server.commands
 * @type              SCommand
 *
 * This class represent a command used start a PHP server locally.
 *
 * @param         {Object}        [args={}]                An object to configure this specific php server command with these properties:
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
  constructor(args = {}, commandSettings = {}) {
    // init command
    super(
      'server.php',
      `sugar server.php`,
      __deepMerge(
        {
          title: 'PHP Server',
          key: 'p',
          concurrent: false,
          definition: __phpCli.definition,
          args,
          namespace: 'server'
        },
        commandSettings
      )
    );
  }
};
