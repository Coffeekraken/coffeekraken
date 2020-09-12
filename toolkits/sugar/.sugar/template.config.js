const __path = require('path');

module.exports = {
  /**
   * @name      engines
   * @namespace   config.template
   * @type      Object
   *
   * Store all the available engines when using the ```STemplate``` class.
   * You can override or add some engines here using the format "{extension}: {path}"
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  engines: {
    /**
     * @name          blade.php
     * @namespace     config.template.engines
     * @type          String
     *
     * Store the path where to find the blade.php template engine
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    'blade.php': __path.resolve(
      __dirname,
      '../src/node/template/engines/SBladeTemplateEngine'
    )
  },

  /**
   * @name      dataHandlers
   * @namespace   config.template
   * @type      Object
   *
   * Store all the available dataHandlers when using the ```STemplate``` class.
   * You can override or add some dataHandlers here using the format "{extension}: {path}"
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  dataHandlers: {
    /**
     * @name          data.js
     * @namespace     config.template.dataHandlers
     * @type          String
     *
     * Store the path where to find the data.js data handler
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    'data.js': __path.resolve(
      __dirname,
      '../src/node/template/dataHandlers/js.js'
    ),

    /**
     * @name          data.json
     * @namespace     config.template.dataHandlers
     * @type          String
     *
     * Store the path where to find the data.json data handler
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    'data.json': __path.resolve(
      __dirname,
      '../src/node/template/dataHandlers/json.js'
    )
  }
};
