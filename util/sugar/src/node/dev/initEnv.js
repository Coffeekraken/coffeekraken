const __envinfo = require('envinfo');
const __dotenv = require('dotenv');
const __parseError = require('parse-error');
const __RenderKid = require('renderkid');

/**
 * @name                          initEnv
 * @namespace                     sugar.node.dev
 * @type                          Function
 *
 * Init the node environment by initialising "dotenv", "envinfo" and beautify the errors display.
 *
 * - dotenv: Load the environment variables from ".env" file into process.env stack
 * - errors: Beautify the errors display to be more readdable
 * - envinfo: Store an object of the environment on which the script is running like the CPU, node version, etc...
 * --- The object will be stored in the process.env.ENV_INFO
 *
 * @example               js
 * const initEnv = require('@coffeekraken/sugar/node/dev/initEnv');
 * initEnv();
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function initEnv() {

  // init dotenv
  __dotenv.config();

  // init envinfo
  process.env.ENV_INFO = __envinfo.run({
        System: ['OS', 'CPU', 'Memory', 'Shell'],
        Binaries: ['Node', 'npm'],
        Browsers: ['Chrome', 'Firefox', 'Safari'],
  }, {
    json: true, console: false, showNotFound: false
  });

  // catch the errors to prettify them
  process.on('uncaughtException', (err) => {

    const error = __parseError(err);

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
      // line = [line.slice(0, screen.width-30), '\n', line.slice(screen.width-30)].join('');
      return line;
    });

    const rk = new __RenderKid();
    rk.style({
      "h1": {
        display: 'inline',
        background: 'red',
        color: 'white',
        padding: '0 2 0 2'
      },
      "box": {
        display: 'inline',
        background: 'magenta',
        color: 'white',
        padding: '0 2 0 2'
      },
      "span": {
        display: 'inline',
        color: 'yellow'
      },
      "span.line-number": {
        color: 'cyan'
      },
      "p": {
        display: 'inline',
        color: 'white',
        padding: '0 2 0 2'
      }
    });

    console.log(rk.render(`
      <h1>
        ${error.type}
      </h1>
      <br />
      <br />
      <box>${error.message}</box>
      <br />
      <br />
      ${finalStack.map((line) => {
        line = line.split('(');
        line = `<span>${line[0]}</span>(${line[1]}`;
        line = line.split(':');
        line = line[2] ? `${line[0]}:<span class="line-number">${line[1]}:${line[2].slice(0,-1)}</span>)` : '';
        return `<p>- ${line}</p><br /><br />`;
      }).join('')}
    `));

  });

}
