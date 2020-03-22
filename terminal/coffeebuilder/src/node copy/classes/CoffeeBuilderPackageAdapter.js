/**
 * @name                                      CoffeeBuilderPackageAdapter
 * @namespace                                 terminal.coffeebuilder.node.classes
 * @type                                      Class
 *
 * * Represent the base class to create some CoffeeBuilderPackageAdapter subclasses
 * If you want to create an adapter, you need to create a class that extends this one
 * and override at least these methods:
 * - static isPackage(path): Has to return true or false depending if the passed package meet the adapter criterions
 * - get version: Has to return the package version
 * - get name: Has to return the package name
 * - get description: has to return the package description
 * 
 * @example             js
 * class MyCoolAdapter extends CoffeeBuilderPackageAdapter {
 *    constructor() {
 *      super();
 *    }
 *    get name() {
 *      return ...
 *    }
 * }
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class CoffeeBuilderPackageAdapter {

  /**
   * @name                              _path
   * @namespace                         terminal.coffeebuilder.node.classes.CoffeeBuilderPackageAdapter
   * @type                              String
   * @private
   * 
   * Store the path to the package
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _path = null;

  /**
   * @name                              constructor
   * @namespace                         terminal.coffeebuilder.node.classes.CoffeeBuilderPackageAdapter
   * @type                              Class
   * 
   * @param         {String}            packagePack             The path to the package folder
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(packagePath) {
    this._path = packagePath;
  }

  /**
   * @name                                path
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPackageAdapter
   * @type                                String
   * 
   * Get the package path
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get path() {
    return this._path;
  }

}