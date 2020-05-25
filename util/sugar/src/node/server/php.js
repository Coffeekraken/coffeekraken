const __deepMerge = require('../../node/object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __spawn = require('../childProcess/spawn');
const __phpCli = require('../../cli/server/php.cli');
const __argsToString = require('../cli/argsToString');

/**
 * @name                php
 * @namespace           sugar.node.server
 * @type                Function
 *
 * This function take care of starting a local php server on which you can subscribe for different "events"
 * through the returned SPromise api:
 *
 *
 * @param         {Object}          [settings={}]         The settings object to configure the build process. Here's the list of available settings:
 *
 * @return        {SPromise}                An SPromise instance on which you can subscribe for "compiled" stack as well as the normal Promise stacks like "then, catch" etc... Here's the "events" you can subscribe on:
 *
 * @example       js
 * const phpServer = require('@coffeekraken/sugar/node/server/php');
 * phpServer({
 *
 * }).on('compiled', file => {
 *    // do something...
 * });
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = (settings = {}) => {
  let childProcess;
  const promise = new __SPromise((resolve, reject, trigger, cancel) => {
    settings = __deepMerge({}, settings);
    const args = __argsToString(settings, __phpCli.definition);
    childProcess = __spawn(
      `php -S ${settings.hostname || 'localhost'}:${settings.port || 8080} ${
        settings.rootDir || '.'
      } ${args}`
    );
    childProcess.trigger(
      'stdout.data',
      `<green><bold>Your PHP server is up and running</bold></green>:
- Hostname: <yellow>${settings.hostname}</yellow>
- Port    : <yellow>${settings.port}</yellow>
- RootDir : <yellow>${settings.rootDir}</yellow>
- URL     : <cyan>http://${settings.hostname}:${settings.port}</cyan>

<red>Ctrl+c</red> to kill the server`
    );
  }).start();
  __SPromise.pipe(childProcess, promise);
  return promise;
};
