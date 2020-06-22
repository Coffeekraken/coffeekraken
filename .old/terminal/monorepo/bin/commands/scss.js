const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const { execSync } = require('child_process');
const __processPath = require('./processPath');
const __path = require('path');

module.exports = (cwd = process.cwd()) => {

  __log(`Generating the css file(s)...`, 'info');

  const loadPaths = '--load-path=' + __config.dist.css.loadPaths.join(' --load-path=');

  try {
    execSync(`${__path.resolve(__dirname + '/../../node_modules/sass/sass.js')} ${__processPath(__config.dist.css.sourceFolder)}:${__processPath(__config.dist.css.outputFolder)} ${loadPaths} --style=${__config.dist.css.style} --no-source-map`, {
        cwd: cwd
    });
  } catch(error) {
    __log(error, 'error');
    process.exit();
  }

  __log(`The javascript files have been Successfully generated.`, 'success');

}
