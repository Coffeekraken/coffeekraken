// @shared

import __toString from '../string/toString';
import __argsToString from './argsToString';
import __deepMerge from '../object/deepMerge';
import __parse from '../string/parse';

/**
 * @name            buildCommandLine
 * @namespace           sugar.js.cli
 * @type            Function
 * @beta
 *
 * This function takes as parameters a command line (with tokens), an arguments object and a definition object to
 * generate the final command line string to launch.
 * A token is simply a string that begin with "[" and end with "]" like so: "[mytoken]".
 * Each arguments of the definition object can be a token. If you have an argument called "hostname", the corresponding token will be "[hostname]".
 * A special token called "[arguments]" is needed if you want the passed arguments to be integrated to the builded command line.
 *
 * @param       {String}      command         The tokenized command line to use as base
 * @param       {Object}      definition   The definition object of the command to launch
 * @param       {Object}      [args={}]       An optional arguments/values object to override definition default value
 * @param       {Object}      [settings={}]     An object of settings to configure your command line buildine process:
 * - includeAllArgs (true) {Boolean}: Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument
 * - alias (true) {Boolean}: Specify if you want to make use of the aliases in your generated command
 * @return      {String}                      The builded command string
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
  definition?: Record<string, unknown>;
  includeAllArgs?: boolean;
  alias?: boolean;
}

export interface IBuildCommandLineFn {
  (
    command: string,
    args?: Record<string, unknown>,
    settings?: IBuildCommandLineSettings
  ): string;
}

const fn: IBuildCommandLineFn = function buildCommandLine(
  command: string,
  args: Record<string, unknown> = {},
  settings: IBuildCommandLineSettings = {}
) {
  settings = {
    definition: undefined,
    includeAllArgs: true,
    alias: true,
    ...settings
  };
  const definition = Object.assign({}, settings.definition);
  // get all the tokens
  const tokens = command.match(/\[[a-zA-Z0-9-_]+\]/gm) || [];
  tokens.forEach((token) => {
    const tokenName = token.replace('[', '').replace(']', '');
    if (tokenName === 'arguments') return;
    const tokenValue =
      args && args[tokenName] !== undefined
        ? args[tokenName]
        : definition[tokenName]
        ? (<any>definition[tokenName]).default
        : undefined;
    delete definition[tokenName];
    delete args[tokenName];
    if (tokenValue === undefined) {
      command = command.replace(token, '');
      return;
    }
    let tokenValueString = '';
    if (Array.isArray(tokenValue)) {
      tokenValue.forEach((tValue) => {
        let str =
          tValue.toString !== undefined && typeof tValue.toString === 'function'
            ? tValue.toString()
            : __toString(tValue);
        // handle quotes or not
        if (typeof __parse(str) === 'string') str = `"${str}"`;
        // append to the string
        tokenValueString += `${str} `;
      });
      tokenValueString = tokenValueString.trim();
    } else {
      tokenValueString =
        tokenValue.toString !== undefined &&
        typeof tokenValue.toString === 'function'
          ? tokenValue.toString()
          : __toString(tokenValue);
      // handle quotes or not
      if (typeof __parse(tokenValueString) === 'string')
        tokenValueString = `"${tokenValueString}"`;
    }
    command = command.replace(token, tokenValueString);
  });

  // args to string
  const argsString = __argsToString(args, settings).trim();
  command = command.replace('[arguments]', argsString);

  return command.trim();
};
export default fn;
