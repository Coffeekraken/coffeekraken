const __SCommand = require('../terminal/SCommand');
const __deepMerge = require('../object/deepMerge');
const __SBuildJsCli = require('./SBuildJsCli');

/**
 * @name              SBuildJsCommand
 * @namespace         sugar.node.build.commands
 * @type              SCommand
 *
 * This class represent a command used to watch and build scss files.
 *
 * @param         {Object}        [argsObj={}]                An object to configure this specific scss command with these properties:
 * - input (null) {String}: Specify the input files that you want to build. You can use glob pattern
 * - output (null) {String}: Specify the output folder where you want to save the compiled files
 * - map (true) {Boolean}: Specify if you want a sourcemap file to be generated
 * - prod (false) {Boolean}: Specify if you want to generate the production ready files that will be suffixed with ".prod.css"
 * @param        {Object}         [commandSettings={}]         An object of SCommand settings to configure your command
 *
 * @example       js
 * const SBuildJsCommand = require('@coffeekraken/sugar/node/build/commands/SBuildJsCommand');
 * const myCommand = new SBuildJsCommand();
 * myCommand.run();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = class SBuildJsCommand extends __SCommand {
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
      'build.js',
      new __SBuildJsCli(),
      __deepMerge(
        {
          argsObj,
          title: 'Build JS',
          key: 'j',
          concurrent: false,
          namespace: 'build.js'
        },
        commandSettings
      )
    );
  }
};
