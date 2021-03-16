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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkVmlld3NDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvYnVpbGQvX193aXBfXy92aWV3cy9TQnVpbGRWaWV3c0NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUN0RCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN0RCxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3JELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLGtCQUFtQixTQUFRLFVBQVU7SUFDMUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxPQUFPLEdBQUcsRUFBRSxFQUFFLGVBQWUsR0FBRyxFQUFFO1FBQzVDLGVBQWU7UUFDZixLQUFLLENBQ0gsYUFBYSxFQUNiLElBQUksZ0JBQWdCLEVBQUUsRUFDdEIsV0FBVyxDQUNUO1lBQ0UsT0FBTztZQUNQLEtBQUssRUFBRSxhQUFhO1lBQ3BCLEdBQUcsRUFBRSxHQUFHO1lBQ1IsVUFBVSxFQUFFLEtBQUs7WUFDakIsU0FBUyxFQUFFLGFBQWE7WUFDeEIsS0FBSyxFQUFFLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztTQUMxQyxFQUNELGVBQWUsQ0FDaEIsQ0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUMifQ==