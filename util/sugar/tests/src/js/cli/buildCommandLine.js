import __toString from '../string/toString';
import __argsToString from './argsToString';

/**
 * @name            buildCommandLine
 * @namespace       sugar.js.cli
 * @type            Function
 *
 * This function takes as parameters a command line (with tokens), an arguments object and a definition object to
 * generate the final command line string to launch.
 * A token is simply a string that begin with "[" and end with "]" like so: "[mytoken]".
 * Each arguments of the definition object can be a token. If you have an argument called "hostname", the corresponding token will be "[hostname]".
 * A special token called "[arguments]" is needed if you want the passed arguments to be integrated to the builded command line.
 *
 * @param       {String}      command         The tokenized command line to use as base
 * @param       {Object}      definitionObj   The definition object of the command to launch
 * @param       {Object}      [args={}]       An optional arguments/values object to override definition default value
 * @param       {Boolean}     [includeAllArgs = true]       Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument
 * @return      {String}                      The builded command string
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
export default function buildCommandLine(
  command,
  definitionObj,
  args = {},
  includeAllArgs = true
) {
  definitionObj = Object.assign({}, definitionObj);
  // get all the tokens
  const tokens = command.match(/\[[a-zA-Z0-9-_]+\]/gm);
  tokens.forEach((token) => {
    const tokenName = token.replace('[', '').replace(']', '');
    if (tokenName === 'arguments') return;
    const tokenValue =
      args && args[tokenName] !== undefined
        ? args[tokenName]
        : definitionObj[tokenName]
        ? definitionObj[tokenName].default
        : undefined;
    delete definitionObj[tokenName];
    if (tokenValue === undefined) {
      command = command.replace(token, '');
      return;
    }
    let tokenValueString = __toString(tokenValue);
    command = command.replace(token, tokenValueString);
  });

  // args to string
  const argsString = __argsToString(args, definitionObj, includeAllArgs).trim();
  command = command.replace('[arguments]', argsString);

  return command.trim();
}
