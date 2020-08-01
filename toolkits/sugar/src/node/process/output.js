const __SOutput = require('../blessed/SOutput');

/**
 * @name            output
 * @namespace           node.process
 * @type            Function
 *
 * This function simply take a SProcess compatible process instance and display the output
 * accordingly to the context where this process is running. If the output is in a childProcess,
 * it will just console.log the stdout.data, stderr.data, etc... to the terminal but if the
 * process is in the main terminal instance, it will be wrapped inside a blessed box instance
 * and displayed nicely.
 *
 * @param         {SProcess}          proc        The process to display output for
 * @param         {Object}            [settings={}]     An object of blessed settings that will be passed to the main blessed.box instance
 *
 * @example       js
 * const output = require('@coffeekraken/sugar/node/process/output');
 * const spawn = require('@coffeekraken/sugar/node/process/spawn');
 * const proc = spawn('ls -la');
 * output(proc);
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (proc, settings = {}) => {
  const output = new __SOutput(proc, settings);
  output.attach();
};
