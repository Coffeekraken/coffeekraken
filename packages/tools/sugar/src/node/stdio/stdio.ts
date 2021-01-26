// @ts-nocheck
import __SBlessedStdio from './blessed/SBlessedStdio';
import __STerminalStdio from './terminal/STerminalStdio';
import __isClass from '../is/class';

/**
 * @name            stdio
 * @namespace           sugar.node.stdio
 * @type            Function
 * @wip
 *
 * This function simply take a SProcess compatible process instance and display the Stdio
 * accordingly to the context where this process is running. If the Stdio is in a childProcess,
 * it will just console.log the log, error, etc... to the terminal but if the
 * process is in the main terminal instance, it will be wrapped inside a blessed box instance
 * and displayed nicely.
 *
 * @param         {SProcess}          proc        The process to display Stdio for
 * @param         {Object}            [settings={}]     An object of blessed settings that will be passed to the main blessed.box instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import Stdio from '@coffeekraken/sugar/node/stdio/stdio';
 * import spawn from '@coffeekraken/sugar/node/process/spawn';
 * const proc = spawn('ls -la');
 * Stdio(proc);
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = (sources, settings = {}) => {
  if (!Array.isArray(sources)) sources = [sources];

  let stdioInstance: any;

  if (__isClass(settings.class)) {
    stdioInstance = new settings.class(this._sources, settings);
  } else if (typeof settings.type === 'string') {
    switch (settings.type) {
      case 'inherit':
      case 'terminal':
        stdioInstance = new __STerminalStdio(sources, {
          ...settings
        });
        break;
      case 'blessed':
        stdioInstance = new __SBlessedStdio(sources, {
          ...settings,
          attach: true
        });
        break;
      default:
        break;
    }
  }

  return stdioInstance;
};
