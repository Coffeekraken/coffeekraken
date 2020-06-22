const __fs = require('fs');

const __CoffeeBuilderPackageAdapter = require('../CoffeeBuilderPackageAdapter');

/**
 * @name                                      ComposerPackageAdapter
 * @namespace                                 terminal.coffeebuilder.node.classes
 * @type                                      Class
 *
 * This is the class that represent a package (folder) in the CoffeeBuilder world.
 *
 * @param               {String}                  path                The path to the source package folder that will represent the package
 *
 * @example             js
 * const ComposerPackageAdapter = require('@coffeekraken/coffeebuilder/node/classes/packagesAdapters/ComposerPackageAdapter');
 * const package = new ComposerPackageAdapter('my/cool/package');
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class ComposerPackageAdapter extends __CoffeeBuilderPackageAdapter {

  static searchGlob = '**/composer.json';
  static ignoreGlob = '**/{vendor,node_modules}/**';

  static isPackage(path) {
    if (!__fs.existsSync(`${process.cwd()}/${path}/composer.json`)) return false;
    return true;
  }

  constructor(packagePath) {
    super(packagePath);
    this._json = require(`${process.cwd()}/${path}/composer.json`);
  }

  get name() {
    return this._json.name;
  }

  get description() {
    return this._json.description;
  }

  get version() {
    return this._json.version;
  }

}