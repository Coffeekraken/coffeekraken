const __log = require('../log/log');
const __breakLineDependingOnSidesPadding = require('../terminal/breakLineDependingOnSidesPadding');
const __parseError = require('./parseError');

/**
 * @name                              beautifyErrors
 * @namespace                         sugar.node.dev
 * @type                              Function
 *
 * Catch the basic errors from the node process and render them to be more readable
 *
 * @example             js
 * const beautifyErrors = require('@coffeekraken/node/dev/beautifyErrors');
 * beautifyErrors();
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function beautifyErrors() {

  // catch the errors to prettify them
  ['unhandledRejection', 'uncaughtException'].forEach((e) => {
    process.on(e, async (err) => {

      const error = __parseError(err);

      const substract = 12;
      const columns = (process.env.STDOUT_COLUMNS || process.stdout.columns) - substract;

      let finalStack = error.stack.filter((line) => {
        if (line.filename.includes('checkArgs.js')) return false;
        if (line.filename.includes('/node_modules/')) return false;
        return true;
      });
      finalStack = finalStack.map((line) => {
        line.filename = line.filename.replace(process.cwd(), '');
        return line;
      });

      let message = '';

      message += '<br/>';
      message += '<br/>';
      message += '<br/>';

      message += `<bgRed>   ${' '.repeat(error.type.length)}   </bgRed>`;
      message += '<br/>';
      message += `<bgRed>   <bold>${error.type}</bold>   </bgRed>`;
      message += '<br/>';
      message += `<bgRed>   ${' '.repeat(error.type.length)}   </bgRed>`;

      message += '<br/>';
      message += '<br/>';
      message += '<br/>';

      message += error.message;

      message += '<br/>';
      message += '<br/>';
      message += '<br/>';

      finalStack.forEach((line) => {

        const formatedFunc = `<yellow>${line.function}</yellow>`;
        const formatedPath = `${line.filename}`;
        const formatedPosition = `<bold><cyan>${line.line}</cyan></bold>:<cyan>${line.row}</cyan>`;

        message += `<bold>${formatedFunc}</bold>`;
        message += '<br/>';

        message += `${formatedPath}`;

        message += '<br/>';

        message += `${formatedPosition}`;
        message += '<br/>';
        message += '<br/>';

      });

      message += '<br/>';
      message += '<br/>';

      await __log(message, 'error');

      process.exit(0);

    });

  });

}
