const __chokidar = require('chokidar');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __fs = require('fs');

/**
 * @name                                      CoffeeBuilderPackage
 * @namespace                                 terminal.coffeebuilder.node.classes
 * @type                                      Class
 *
 * This is the class that represent a package (folder) in the CoffeeBuilder world.
 *
 * @param               {String}                  path                The path to the source package folder that will represent the package
 *
 * @example             js
 * const CoffeeBuilderPackage = require('@coffeekraken/coffeebuilder/node/classes/CoffeeBuilderPackage');
 * const package = new CoffeeBuilderPackage('my/cool/package');
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class CoffeeBuilderPackage {

  /**
   * @name                                _type
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPackage
   * @type                                String
   * 
   * Store the package type like "node", "php", etc...
   * Each packages types has to have an "adapter" attached.
   * By default, here's the packages types that are supported out of the box:
   * - node: Node packages represented by a "package.json" file at the root folder
   * - php: PHP packages represented by a "composer.json" file at the root folder
   * 
   * More adapters can be registered throufh the config "coffeebuilder.config.js" file
   * under the properties: 
   */

  /**
   * @name                                _path
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPackage
   * @type                                String
   * @private
   * 
   * Represent the path to the package folder
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _path = null;

  /**
   * @name                                constructor
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPackage
   * @type                                Function
   * @constructor
   *
   * @param         {String}            path            The path to the package folder that will represent the package
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(path) {
    if (!__fs.existsSync(path)) {
      throw new Error(`The CoffeeBuilderPackage with the path "${path}" cannot be instanciated cause the source folder does not exist...`);
    }
    if (!__fs.existsSync(`${path}/package.json`)) {
      throw new Error(`The CoffeeBuilderPackage with the path "${path}" cannot be instanciated cause no "package.json" file has been founded...`);
    }
    this._path = path;

    // watch the package if needed
    if (this.config.watch) {
      this.watch(true);
    }

  }

  /**
   * @name                                watch
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPackage
   * @type                                Function
   * 
   * Start of stop the package watching process
   * 
   * @param             {Boolean}             watch           Tell if you want to watch or not this package
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  watch(watch) {
    if (watch) {
      if (!this._chokidarInstances) this._chokidarInstances = [];
      this.sourcesFoldersGlob.forEach(folderGlob => {
        const chokidar = __chokidar.watch(folderGlob);
        chokidar.on('change', (e, path) => {
          CoffeeBuilder.events.emit('packageUpdated', this);
        });
        this._chokidarInstances.push(chokidar);
      });
    } else {
      if (!this._chokidarInstances) return;
      const promises = [];
      this._chokidarInstances.forEach(chokidar => {
        promises.push(chokidar.close());
      });
      Promise.all(promises).then(() => {
        this._chokidarInstances = null;
      });
    }
  }

  /**
   * @name                                config
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPackage
   * @type                                Object
   * 
   * Access the package config materialized by the "coffeebuilder.config.js" file the his root folder
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get config() {
    if (this._configCache) return this._configCache;
    let packageConfig = {};
    if (!__fs.existsSync(`${this.path}/coffeebuilder.config.js`)) {
      this._configCache = {};
    } else {
      packageConfig = require(`${process.cwd()}/${this.path}/coffeebuilder.config.js`);
    }
    this._configCache = Object.assign({}, __deepMerge(CoffeeBuilder.config.base, packageConfig));
    return this._configCache;
  }

  /**
   * @name                                path
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPackage
   * @type                                String
   * 
   * Access the package path
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get path() {
    return this._path;
  }

  /**
   * @name                                name
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPackage
   * @type                                String
   * 
   * Access the package name
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get name() {
    return this.json.name;
  }

  /**
   * @name                                description
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPackage
   * @type                                String
   * 
   * Access the package description
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get description() {
    return this.json.description;
  }

  /**
   * @name                                version
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPackage
   * @type                                String
   * 
   * Access the package version
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get version() {
    return this.json.version;
  }

  /**
   * @name                                json
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPackage
   * @type                                String
   * 
   * Access the package "package.json" content
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get json() {
    if (this._json) return this._json;
    this._json = require(`${process.cwd()}/${this.path}/package.json`);
    return this._json;
  }

  /**
   * @name                  sourcesFoldersGlob
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderPackage
   * @type                  Array
   *
   * Get the an array of all the sources folders with theirs proper glob to search files in it
   *
   * @example               js
   * myPackage.sourcesFoldersGlob; // => ['my/cool/*.js', 'my/other/*.png']
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get sourcesFoldersGlob() {
    if (this._sourcesFoldersGlobCache) return this._sourcesFoldersGlobCache;
    const results = [];
    Object.keys(this.config.resources).forEach(resourceName => {
      const resource = this.config.resources[resourceName];
      resource.sourcesFolders.forEach(path => {
        results.push(`${this.path}/${path}/${resource.sources}`);
      });
    });
    this._sourcesFoldersGlobCache = results;
    return results;
  }

  /**
   * @name                  sourcesFoldersPaths
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderPackage
   * @type                  Array
   *
   * Access the array of sources folders pathes for this package
   *
   * @example               js
   * myPackage.sourcesFoldersPaths; // => ['my/cool', 'my/other']
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get sourcesFoldersPaths() {

    if (this._sourcesFoldersPathsCache) return this._sourcesFoldersPathsCache;

    const results = [];

    Object.keys(this.config.resources).forEach(resourceName => {

      const resource = this.config.resources[resourceName];

      resource.sourcesFolders.forEach(path => {
        results.push(`${this.path}/${path}`);
      });

    });

    this._sourcesFoldersPathsCache = results;

    // return the output file paths
    return results;

  }

  /**
   * @name                  outputsFoldersPaths
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderPackage
   * @type                  Array
   *
   * Access the array of output folders pathes for this package
   *
   * @example               js
   * myPackage.outputsFoldersPaths; // => ['my/cool/output', 'my/other']
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get outputsFoldersPaths() {

    if (this._outputsFoldersPathsCache) return this._outputsFoldersPathsCache;

    const results = [];

    Object.keys(this.config.resources).forEach(resourceName => {

      const resource = this.config.resources[resourceName];

      resource.outputFolders.forEach(path => {
        results.push(`${this.path}/${path}`);
      });

    });

    this._outputsFoldersPathsCache = results;

    // return the output file paths
    return results;

  }

}
