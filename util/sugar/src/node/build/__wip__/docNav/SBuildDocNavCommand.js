const __SCommand = require('../../terminal/SCommand');
const __deepMerge = require('../../object/deepMerge');
const __SBuildDocNavCli = require('./SBuildDocNavCli');
const __sugarConfig = require('../../config/sugar');

/**
 * @name              SBuildDocNavCommand
 * @namespace         node.build.docNav
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
 * const SBuildDocNavCommand = require('@coffeekraken/sugar/node/build/doc/SBuildDocNavCommand');
 * const myCommand = new SBuildDocNavCommand();
 * myCommand.run();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = class SBuildDocNavCommand extends __SCommand {
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
      'build.docNav',
      new __SBuildDocNavCli(),
      __deepMerge(
        {
          argsObj,
          title: 'Build docNav.json',
          key: 'n',
          concurrent: false,
          namespace: 'build.doc',
          watch: {
            patterns: __sugarConfig('build.doc.watch'),
            mapToProperty: 'input'
          }
        },
        commandSettings
      )
    );
  }
};
