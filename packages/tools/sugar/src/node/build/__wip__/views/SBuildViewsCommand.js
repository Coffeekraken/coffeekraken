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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkVmlld3NDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0J1aWxkVmlld3NDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBRWQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDdEQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDdEQsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNyRCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUVwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxrQkFBbUIsU0FBUSxVQUFVO0lBQzFEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksT0FBTyxHQUFHLEVBQUUsRUFBRSxlQUFlLEdBQUcsRUFBRTtRQUM1QyxlQUFlO1FBQ2YsS0FBSyxDQUNILGFBQWEsRUFDYixJQUFJLGdCQUFnQixFQUFFLEVBQ3RCLFdBQVcsQ0FDVDtZQUNFLE9BQU87WUFDUCxLQUFLLEVBQUUsYUFBYTtZQUNwQixHQUFHLEVBQUUsR0FBRztZQUNSLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLEtBQUssRUFBRSxhQUFhLENBQUMsbUJBQW1CLENBQUM7U0FDMUMsRUFDRCxlQUFlLENBQ2hCLENBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDIn0=