const { spawn, Thread, Worker } = require('threads');

/**
 * @name                        CoffeeBuilderUI
 * @namespace                   terminal.coffeebuilder.node.classes
 * @type                        Class
 * 
 * Class that handle the coffeebuilder interface drawing, user inputs, etc...
 * 
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class CoffeeBuilderUI {

  /**
   * @name                              constructor
   * @namespace                         terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                              Function
   * @constructor
   * 
   * Construct the class
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor() {

  }

  /**
   * @name                  changeLocation
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                  Function
   * 
   * Change the user location in the UI. This method accept 1 argument which is the new location wanted
   * and can be one of these options:
   * - home: Display the "welcome" UI
   * - build: Display the build progress
   * - stats: Display the build stats
   * - error: Display an error message
   *    - settings: { message: 'An error has occured...' }
   * - loading: Display a loading message
   *    - settings: { message: 'Please wait...' }
   * - packageSelector: Display the packages list to select one of them
   * 
   * @param           {String}                location              The new location wanted
   * @param           {Object}                [settings={}]         The new location settings
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async changeLocation(location, settings = {}) {

  }

  /**
   * @name                  draw
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                  Function
   * 
   * Draw the interface
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async draw() {

  }

}

module.exports = CoffeeBuilderUI;