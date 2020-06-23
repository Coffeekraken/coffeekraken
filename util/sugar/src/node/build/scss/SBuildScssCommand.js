const __SCommand = require('../../terminal/SCommand');
const __deepMerge = require('../../object/deepMerge');
const __SBuildScssCli = require('./SBuildScssCli');
const __sugarConfig = require('../../config/sugar');

/**
 * @name              SBuildScssCommand
 * @namespace         sugar.node.build.scss
 * @type              SCommand
 *
 * This class represent a command used to watch and build scss files.
 *
 * @param         {Object}        [argsObj={}]                An object to configure this specific scss command with these properties:
 * - input (null) {String}: Specify the input files that you want to build. You can use glob pattern
 * - output (null) {String}: Specify the output folder where you want to save the compiled files
 * - watch (null) {String}: Specify a glob pattern of the files you want to watch
 * - style (expanded) {String}: Specify the style of files that you want. Can be "nested", "expanded", "compact" or "compressed"
 * - map (true) {Boolean}: Specify if you want a sourcemap file to be generated
 * - prod (false) {Boolean}: Specify if you want to generate the production ready files that will be suffixed with ".prod.css"
 * - include.sugar (true) {Boolean}: Specify if you want coffeekraken sugar to be automatically included or not
 * - vendor.sass ({}) {Object}: Specify a setting object that will be passed to the sass compiler
 * @param        {Object}         [commandSettings={}]         An object of SCommand settings to configure your command
 *
 * @example       js
 * const SBuildScssCommand = require('@coffeekraken/sugar/node/build/commands/SBuildScssCommand');
 * const myCommand = new SBuildScssCommand();
 * myCommand.run();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = class SBuildScssCommand extends __SCommand {
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
      'build.scss',
      new __SBuildScssCli(),
      __deepMerge(
        {
          argsObj,
          title: 'Build SCSS',
          key: 's',
          concurrent: false,
          namespace: 'build.scss',
          watch: {
            patterns: __sugarConfig('build.scss.watch'),
            mapToProperty: 'input'
          }
        },
        commandSettings
      )
    );
  }
};
