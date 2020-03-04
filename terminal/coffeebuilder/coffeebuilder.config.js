/**
 * @name                              coffeebuilder.config.js
 * @namespace                         terminal.coffeebuilder
 * @type                              Object
 * 
 * This object represent the default config for the coffeebuilder package.
 * You can simply override these configs by defining a "coffeebuilder.config.js" file at the root of your project.
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = {

  /**
   * @name            plugins
   * @namespace       terminal.coffeebuilder
   * @type            Object
   * 
   * Store all the registered plugins default config
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  plugins: {

    /**
     * @name                  lazyDomLoad
     * @namespace             terminal.coffeebuilder.config.plugins
     * @type                  Object
     * 
     * Store all the lazyDomLoad plugin default config
     * 
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    lazyDomLoad: {

      /**
       * @name                      resources
       * @namespace                 terminal.coffeebuilder.config.plugins.lazyDomLoad
       * @type                      Object
       * 
       * Store all the resources to lazy load. The format is {cssSelector}: {resourcePath}
       * 
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      resources: {

      }

    }

  }

};