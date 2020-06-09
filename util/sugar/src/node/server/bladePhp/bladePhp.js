const __SBladePhpServerCli = require('./SBladePhpServerCli');

/**
 * @name                bladePhp
 * @namespace           sugar.node.server.bladePhp
 * @type                Function
 *
 * This function take care of starting a local php server which render some blade templates
 *
 * @param         {Object}          [args={}]         The args object to configure the build process. Check the PhpSCli class definition object for available arguments
 * @return        {SPromise}                An SPromise instance on which you can subscribe for "compiled" stack as well as the normal Promise stacks like "then, catch" etc... Here's the "events" you can subscribe on:
 *
 * @example       js
 * const bladePhpServer = require('@coffeekraken/sugar/node/server/bladePhp');
 * bladePhpServer({
 *
 * })
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = (args = {}) => {
  const cli = new __SBladePhpServerCli();
  return cli.spawn(args);
};
