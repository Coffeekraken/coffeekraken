import __path from 'path';

export default {
  /**
   * @name            rootDir
   * @namespace       config.views
   * @type            String
   * @default          [config.storage.srcDir]/views
   *
   * Specify the root views directory
   *
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  rootDir: `[config.storage.srcDir]/views`,

  /**
   * @name            cacheDir
   * @namespace       config.views
   * @type            String
   * @default          [config.storage.cacheDir]
   *
   * Specify the views template rendering cache directory
   *
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  cacheDir: `[config.storage.cacheDir]/views`,

  /**
   * @name      engines
   * @namespace   config.views
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
     * @name          blade
     * @namespace     config.views.engines
     * @type          String
     *
     * Store the path where to find the blade.php template engine
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    blade: __path.resolve(
      __dirname,
      '../node/template/engines/SBladeTemplateEngine'
    )
  },

  /**
   * @name      dataHandlers
   * @namespace   config.views
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
     * @name          js
     * @namespace     config.views.dataHandlers
     * @type          String
     *
     * Store the path where to find the data.js|json data handler
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    js: __path.resolve(__dirname, '../node/template/dataHandlers/js.js')
  }
};
