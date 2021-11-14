import __argsToString from './argsToString';

/**
 * @name            buildCommandLine
 * @namespace            js.cli
 * @type            Function
 * @platform          js
 * @platform          node
 * @status              wip
 *
 * This function takes as parameters a command line (with tokens), an arguments object and a definition object to
 * generate the final command line string to launch.
 * A token is simply a string that begin with "[" and end with "]" like so: "[mytoken]".
 * Each arguments of the definition object can be a token. If you have an argument called "hostname", the corresponding token will be "[hostname]".
 * A special token called "[arguments]" is needed if you want the passed arguments to be integrated to the builded command line.
 *
 * @param       {String}      command         The tokenized command line to use as base
 * @param       {Object}      definition   The definition object of the command to launch
 * @param       {Object}      [args={}]       An optional arguments/values object to override definition default value
 * @param       {Object}      [settings={}]     An object of settings to configure your command line buildine process:
 * - includeAllParams (true) {Boolean}: Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument
 * - alias (true) {Boolean}: Specify if you want to make use of the aliases in your generated command
 * @return      {String}                      The builded command string
 *
 * @setting         {Boolean}       [keepFalsy=false]           Specify if you want to keep falsy arguments in your command line or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import buildCommandLine from '@coffeekraken/sugar/js/cli/buildCommandLine';
 * buildCommandLine('php [hostname]:[port] [rootDir] [arguments]', {
 *    hostname: {
 *      type: 'String',
 *      description: 'Server hostname',
 *      default: 'localhost'
 *    },
 *    port: {
 *      type: 'Number',
 *      description: 'Server port',
 *      default: 8080
 *    },
 *    rootDir: {
 *      type: 'String',
 *      description: 'Root directory',
 *      default: '.'
 *    },
 *    arg1: {
 *      type: 'Boolean',
 *      alias: 'a',
 *      description: 'Argument 1',
 *      default: true
 *    }
 * }, {
 *    port: 8888
 * });
 * // => php localhost:8888 . -a
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IBuildCommandLineSettings {
    keepFalsy: boolean;
}

export default function buildCommandLine(
    command: string,
    args: Record<string, unknown> = {},
    settings?: Partial<IBuildCommandLineSettings>,
) {
    settings = {
        keepFalsy: false,
        ...(settings ?? {}),
    };
    // loop on args
    const string = __argsToString(args, {
        keepFalsy: settings.keepFalsy,
    });
    const cmdString = command.replace('[arguments]', string);
    return cmdString;
}
