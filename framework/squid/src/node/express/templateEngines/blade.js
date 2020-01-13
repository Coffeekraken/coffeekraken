const __fs = require('fs');
const __nodeBladePhp = require('@coffeekraken/node-blade-php');

/**
 * @name            blade
 * @namespace       squid.node.express.templateEngines
 * @type            Function
 *
 * Register a blade php template engine to handle views named like *.blade.php
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
 */
module.exports = function(filePath, options, callback) {
  __nodeBladePhp.setViewsFolder(options.settings.views);
  __nodeBladePhp.compile(filePath.replace(options.settings.views, ''), options).then(result => {
    return callback(null, result);
  });
}
