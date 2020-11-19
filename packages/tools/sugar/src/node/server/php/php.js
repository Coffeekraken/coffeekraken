const __PhpSCli = require('./SPhpServerCli');

/**
 * @name                php
 * @namespace           sugar.node.server.php
 * @type                Function
 *
 * This function take care of starting a local php server on which you can subscribe for different "events"
 * through the returned SPromise api.
 *
 * @param         {Object}          [args={}]         The args object to configure the build process. Check the PhpSCli class definition object for available arguments
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
module.exports = (args = {}) => {
  const cli = new __PhpSCli();
  return cli.spawn(args);
};
