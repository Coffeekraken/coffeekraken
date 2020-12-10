"use strict";
// @ts-nocheck
const __SCommand = require('../../terminal/SCommand');
const __deepMerge = require('../../object/deepMerge');
const __SBuildViewsCli = require('./SBuildViewsCli');
const __sugarConfig = require('../../config/sugar');
/**
 * @name              SBuildViewsCommand
 * @namespace           sugar.node.build.views
 * @type              SCommand
 *
 * This class represent a command used to watch and build views files
 *
 * @param         {Object}        [argsObj={}]                An object to configure this specific scss command with these properties:
 * - input (null) {String}: Specify the input files that you want to build. You can use glob pattern
 * - outputDir (null) {String}: Specify the output folder where you want to save the compiled files
 * @param        {Object}         [commandSettings={}]         An object of SCommand settings to configure your command
 *
 * @example       js
 * const SBuildViewsCommand = require('@coffeekraken/sugar/node/build/views/SBuildViewsCommand');
 * const myCommand = new SBuildViewsCommand();
 * myCommand.run();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = class SBuildViewsCommand extends __SCommand {
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
        super('build.views', new __SBuildViewsCli(), __deepMerge({
            argsObj,
            title: 'Build Views',
            key: 'v',
            concurrent: false,
            namespace: 'build.views',
            watch: __sugarConfig('build.views.watch')
        }, commandSettings));
    }
};
//# sourceMappingURL=module.js.map