const __SCommand = require('../../terminal/SCommand');
const __deepMerge = require('../../object/deepMerge');
const __SBuildDocMapCli = require('./SBuildDocMapCli');
const __sugarConfig = require('../../config/sugar');

/**
 * @name              SBuildDocMapCommand
 * @namespace         node.build.docMap
 * @type              SCommand
 *
 * This class represent a command used to watch and build docNav.json
 *
 * @param         {Object}        [argsObj={}]                An object to configure this specific scss command with these properties:
 * - input (null) {String}: Specify the input files that you want to scan for namespace tag
 * - outputDir (null) {String}: Specify the output folder where you want to save the docNav file
 * @param        {Object}         [commandSettings={}]         An object of SCommand settings to configure your command
 *
 * @example       js
 * const SBuildDocMapCommand = require('@coffeekraken/sugar/node/build/doc/SBuildDocMapCommand');
 * const myCommand = new SBuildDocMapCommand();
 * myCommand.run();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = class SBuildDocMapCommand extends __SCommand {
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
      'build.docMap',
      new __SBuildDocMapCli(),
      __deepMerge(
        {
          argsObj,
          title: 'Build docMap.json',
          key: 'm',
          concurrent: false,
          namespace: 'build.doc'
        },
        commandSettings
      )
    );
  }
};
