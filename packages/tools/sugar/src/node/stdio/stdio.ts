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

  if (type === 'inherit') {
    // source.forEach((s) => {
    //   s.on(
    //     'log,*.log,warn,*.warn,error,*.error,reject,*.reject',
    //     (data, metas) => {
    //       if (!data) return;
    //       if (data.type) {
    //         let value = data.value;
    //         if (typeof value === 'string') {
    //           value = __parseHtml(value);
    //         } else if (value) {
    //           value = __toString(value);
    //         }
    //         switch (data.type) {
    //           case 'separator':
    //             const separator = data.separator
    //               ? data.separator.slice(0, 1)
    //               : '-';
    //             if (value) {
    //               console.log(
    //                 '\n' +
    //                   __parseHtml(
    //                     `${value} ${separator.repeat(
    //                       process.stdout.columns - __countLine(value) - 1
    //                     )}`
    //                   )
    //               );
    //             } else {
    //               console.log(
    //                 '\n' + __parseHtml(separator.repeat(process.stdout.columns))
    //               );
    //             }
    //             break;
    //         }
    //       } else {
    //         let value = data.value !== undefined ? data.value : data;
    //         if (typeof value === 'string') {
    //           value = __parseHtml(value);
    //         } else {
    //           value = __toString(value);
    //         }
    //         console.log(value);
    //       }
    //     }
    //   );
    // });
    // return undefined;
  } else if (__isClass(stdio)) {
    // @ts-ignore
    return new stdio(source, settings);
  } else if (type === 'blessed') {
    return new __SBlessedStdio(source, settings);
  }
};
