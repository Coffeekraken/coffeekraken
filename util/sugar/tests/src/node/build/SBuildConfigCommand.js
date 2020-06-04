const __SCommand = require('../terminal/SCommand');
const __deepMerge = require('../object/deepMerge');
const __SBuildConfigCli = require('./SBuildConfigCli');
const __sugarConfig = require('../config/sugar');

/**
 * @name              SBuildConfigCommand
 * @namespace         sugar.node.build
 * @type              SCommand
 *
 * This class represent a command used to watch and build config files
 *
 * @param         {Object}        [argsObj={}]                An object to configure this specific scss command with these properties:
 * - input (null) {String}: Specify the input files that you want to build. You can use glob pattern
 * - outputDir (null) {String}: Specify the output folder where you want to save the compiled files
 * @param        {Object}         [commandSettings={}]         An object of SCommand settings to configure your command
 *
 * @example       js
 * const SBuildConfigCommand = require('@coffeekraken/sugar/node/build/commands/SBuildConfigCommand');
 * const myCommand = new SBuildConfigCommand();
 * myCommand.run();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = class SBuildConfigCommand extends __SCommand {
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
      'build.config',
      new __SBuildConfigCli(),
      __deepMerge(
        {
          argsObj,
          title: 'Build Config',
          key: 'c',
          concurrent: false,
          namespace: 'build.config',
          watch: __sugarConfig('build.config.watch')
            ? {
                patterns: __sugarConfig('build.config.watch'),
                mapToProperty: 'input'
              }
            : false
        },
        commandSettings
      )
    );
  }
};
