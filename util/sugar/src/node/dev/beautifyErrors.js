const __parseError = require('parse-error');
const __log = require('../log/log');
const __breakLineDependingOnSidesPadding = require('../terminal/breakLineDependingOnSidesPadding');

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
  process.on('uncaughtException', (err) => {

    const error = __parseError(err);

    const substract = 12;
    const columns = (process.env.STDOUT_COLUMNS || process.stdout.columns) - substract;

    const stack = error.stack.split('\n');
    let finalStack = stack.filter((line) => {
      if ( ! line.includes('at ')) return false;
      if (line.includes('checkArgs.js')) return false;
      if (line.includes('<anonymous>')) return false;
      if (line.includes('/node_modules/')) return false;
      return true;
    });
    finalStack = finalStack.map((line) => {
      line = line.trim().replace('at ', '');
      line = line.replace(process.cwd(), '');
      return line;
    });

    let message = '';

    message += `<bgRed>   ${' '.repeat(error.type.length)}   </bgRed>`;
    message += '<br/>';
    message += `<bgRed>   <bold>${error.type}</bold>   </bgRed>`;
    message += '<br/>';
    message += `<bgRed>   ${' '.repeat(error.type.length)}   </bgRed>`;

    message += '<br/>';
    message += '<br/>';
    message += '<br/>';

    message += `<bold><white>${error.message}</white></bold>`;

    message += '<br/>';
    message += '<br/>';
    message += '<br/>';

    finalStack.forEach((line) => {

      let func = line.match(/[\S]+\s/g);
      let path = line.match(/\([a-zA-Z0-9\/.]+/g);
      let position = line.match(/:[0-9:]+/g);

      if (func) func = func[0].trim();
      if (path) path = path[0].slice(1);
      if (position) position = position[0].slice(1);

      const formatedFunc = `<yellow>${func}</yellow>`;
      const formatedPath = `${path}`;
      const formatedPosition = `<cyan>${position}</cyan>`;

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

    __log(message, 'error');

  });

}
