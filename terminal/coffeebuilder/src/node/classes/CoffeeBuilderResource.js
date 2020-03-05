const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __base64 = require('@coffeekraken/sugar/node/crypt/base64');
const __writeFileSync = require('@coffeekraken/sugar/node/fs/writeFileSync');
const __fs = require('fs');
const __events = require('../events');

const __settings = require('../../../coffeebuilder.config');


/**
 * @name                                      CoffeeBuilderResource
 * @namespace                                 terminal.coffeebuilder.node.classes
 * @type                                      Class
 *
 * This is the class that represent a resource (file) in the CoffeeBuilder world.
 *
 * @param               {String}                  filepath                The path to the source file that will represent the resource
 *
 * @example             js
 * const CoffeeBuilderResource = require('@coffeekraken/coffeebuilder/node/classes/CoffeeBuilderResource');
 * const resource = new CoffeeBuilderResource('my/cool/file.jpg');
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class CoffeeBuilderResource {

  /**
   * @name                _filepath
   * @namespace           terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                String
   * @private
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _filepath = null;

  /**
   * @name                _saveExtension
   * @namespace           terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                String
   * @private
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _saveExtension = null;

  /**
   * @name                _data
   * @namespace           terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                String
   * @private
   *
   * Store the resource actual data
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _data = null;

  /**
   * @name                _map
   * @namespace           terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                String
   * @private
   *
   * Store the resource actual source map if exist
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _map = null;

  /**
   * @name                _fromCache
   * @namespace           terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                Boolean
   * @private
   *
   * Define if the data are coming from cache or not
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _fromCache = false;

  /**
   * @name                _updateTimestamp
   * @namespace           terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                Number
   * @private
   *
   * Store when the data of this resources have been updated the last time
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _updateTimestamp = 0;

  /**
   * @constructor
   *
   * @param         {String}            filepath            The path to the source file that will represent the resource
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(filepath) {
    if (!__fs.existsSync(filepath)) {
      throw new Error(`The CoffeeBuilderResource with the filepath "${filepath}" cannot be instanciated cause the source file does not exist...`);
    }
    this._filepath = filepath;

    // restore the cache
    this._restoreData();

  }

  /**
   * @name                  _restoreData
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                  Object
   *
   * Get the resource from the cache. Return an object with the properties "data", "saveExtension" and "map" or false if the resource is not in cache...
   *
   */
  _restoreData() {

    const cachePath = __tmpDir() + '/coffeeBuilderCache';
    const encryptedPath = __base64.encrypt(this.filepath);
    const jsonCacheFilePath = cachePath + '/' + encryptedPath + '.json';

    if (__fs.existsSync(jsonCacheFilePath)) {

      const updateTimestamp = __fs.statSync(this.filepath).mtimeMs;
      const jsonCacheFileUpdateTimestamp = __fs.statSync(jsonCacheFilePath).mtimeMs;

      if (updateTimestamp < jsonCacheFileUpdateTimestamp) {

        // tell the resource that it is coming from the cache
        this._fromCache = true;

        // reading the cache file
        const jsonCacheFile = JSON.parse(__fs.readFileSync(jsonCacheFilePath));
        jsonCacheFile.data = Buffer.from(jsonCacheFile.data, 'base64');

        this.data = jsonCacheFile.data;
        if (jsonCacheFile.map) this.map = jsonCacheFile.map;
        if (jsonCacheFile.saveExtension) this.saveExtension = jsonCacheFile.saveExtension;

        // stop here
        return;
      }

    }

    this.data = __fs.readFileSync(this.filepath);
    if (__fs.existsSync(`${this.filepath}.map`)) {
      this.map = __fs.readFileSync(`${this.filepath}.map`);
    }

  }

  /**
   * @name                   cacheTimestamp
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                  Number
   *
   * Return the update timestamp of the cache
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get cacheTimestamp() {
    const cachePath = __tmpDir() + '/coffeeBuilderCache';
    const encryptedPath = __base64.encrypt(this.filepath);
    const jsonCacheFilePath = cachePath + '/' + encryptedPath + '.json';
    if (!__fs.existsSync(jsonCacheFilePath)) return false;
    const jsonCacheFileUpdateTimestamp = __fs.statSync(jsonCacheFilePath).mtimeMs;
    return jsonCacheFileUpdateTimestamp;
  }

  /**
   * @name                  isFromCache
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                  Boolean
   *
   * Check if the resource is in cache or not
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isFromCache() {
    return this._fromCache;
  }

  /**
   * @name                  filepath
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                  String
   *
   * Get the resource filepath
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get filepath() {
    return this._filepath;
  }

  /**
   * @name                  outputFilePathes
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                  Array
   *
   * Access the array of output file pathes for this resource
   *
   * @example               js
   * myResource.outputFilePathes; // => ['my/cool/output.jpg', 'my/other/output.jpg']
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get outputFilePathes() {

    const results = [];

    let buildScopes = {};
    Object.keys(__settings.resources).forEach((key, i) => {
      const opts = __settings.resources[key];

      let outputFilePath = this.filepath;

      if (opts.extensions && opts.extensions.indexOf(this.extension) !== -1) {
        buildScopes[key] = opts;
      } else return;

      Object.keys(buildScopes).forEach((scopeKey) => {

        const scope = buildScopes[scopeKey];

        let outputFolder = scope.outputFolders;
        if (!Array.isArray(outputFolder)) outputFolder = [outputFolder];

        let sourcesFolder = scope.sourcesFolders;
        if (!Array.isArray(sourcesFolder)) sourcesFolder = [sourcesFolder];
        if (!outputFolder || !sourcesFolder) return;

        outputFolder.forEach((outputFolderPath) => {

          sourcesFolder.forEach((sourcesFolderPath) => {
            outputFilePath = outputFilePath.trim();
            outputFilePath = outputFilePath.replace(process.cwd(), '');
            outputFilePath = outputFilePath.replace(sourcesFolderPath, '');
            outputFilePath = outputFilePath.replace(outputFolderPath, '');
            if (outputFilePath.slice(0, 2) === '//') outputFilePath = outputFilePath.slice(2);
            if (outputFilePath.slice(0, 1) === '/') outputFilePath = outputFilePath.slice(1);
            outputFilePath = outputFilePath.replace(`.${this.extension}`, `.${this.saveExtension}`);
          });

          if (`${outputFolderPath}/${outputFilePath}`.includes(__tmpDir())) return;

          // append the output file path to the results
          results.push(`${outputFolderPath}/${outputFilePath}`);

        });
      });
    });

    // return the output file paths
    return results;

  }

  /**
   * @name                  saveExtension
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                  String
   *
   * Get the resource saveExtension source either from the cache, or from the source file directly
   *
   * @example               js
   * myResource.saveExtension; // => ...
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get saveExtension() {

    // check if the data is already available
    if (this._saveExtension) return this._saveExtension;

    // return the actual file extension
    return this.extension;

  }

  /**
   * @name                  saveExtension
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                  String
   *
   * Set the resource saveExtension
   *
   * @example               js
   * myResource.saveExtension = 'png';
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  set saveExtension(extension) {

    // update the timestamp
    this._updateTimestamp = Date.now();

    // save the saveExtension
    this._saveExtension = extension;

  }

  /**
   * @name                  extension
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                  String
   *
   * Get the resource extension
   *
   * @example               js
   * myResource.extension; // => jpg
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get extension() {

    // return the actual file extension
    return __getExtension(this._filepath);

  }

  /**
   * @name                  map
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                  Array
   *
   * Get the resource map source either from the cache, or from the source file directly
   *
   * @example               js
   * myResource.map; // => ...
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get map() {

    // check if the data is already available
    if (this._map) return this._map;

    // // the resource is not either in the _data property or in the cache, get if from the file itself...
    // if (__fs.existsSync(this.outputFilePathes[0] + '.map')) {
    //   this._map = __fe.readFileSync(this.outputFilePathes[0] + '.map');
    // }

    // return the data
    return this._map || false;

  }

  /**
   * @name                  map
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                  String
   *
   * Set the map resource data
   *
   * @example               js
   * myResource.map = '...';
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  set map(data) {

    // update the timestamp
    this._updateTimestamp = Date.now();

    // save the map content
    this._map = data;

  }

  /**
   * @name                  data
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                  Array
   *
   * Get the resource data source either from the cache, or from the source file directly
   *
   * @example               js
   * myResource.data; // => ...
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get data() {

    // check if the data is already available
    if (this._data) return this._data;

    // the resource is not either in the _data property or in the cache, get if from the file itself...
    this.data = __fs.readFileSync(this._filepath);

    // return the data
    return this._data;

  }

  /**
   * @name                  data
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                  String
   *
   * Set the resource data
   *
   * @example               js
   * myResource.data = '...';
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  set data(data) {

    // update the timestamp
    this._updateTimestamp = Date.now();

    // save the map content
    this._data = Buffer.from(data);

  }

  /**
   * @name                  updateTimestamp
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                  Number
   *
   * This represent the timestamp when the data have been last updated
   *
   * @example               js
   * myResource.updateTimestamp; // => 45435774492387
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get updateTimestamp() {

    // return the data
    return this._updateTimestamp;

  }

  /**
   * @name                  emitSaveProcessedStat
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderResource 
   * @type                  Function
   *
   * @param       {String}              [e='saveProcessed']             The event to emit
   *
   * Emit an event for the stats that register a processed file
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  emitSaveProcessedStat(e = 'saveProcessed') {
    __events.emit(e, this);
  }

  /**
   * @name                  saveCache
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                  Function
   *
   * Save the resource in cache
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  saveCache() {

    const cachePath = __tmpDir() + '/coffeeBuilderCache';
    const encryptedPath = __base64.encrypt(this._filepath);
    let mapContent = null;

    if (__fs.existsSync(`${this._filepath}.map`)) {
      mapContent = __fs.readFileSync(`${this._filepath}.map`);
    }

    const stats = __fs.statSync(this._filepath);
    const updateTimestamp = stats.mtimeMs;

    let jsonCacheFileUpdateTimestamp = 0;

    // try to get the json cache file
    let jsonCacheFile = null;
    const jsonCacheFilePath = cachePath + '/' + encryptedPath + '.json';
    if (__fs.existsSync(jsonCacheFilePath)) {
      jsonCacheFile = __fs.readFileSync(jsonCacheFilePath);
      jsonCacheFile = JSON.parse(jsonCacheFile);
      jsonCacheFileUpdateTimestamp = __fs.statSync(jsonCacheFilePath).mtimeMs;
    }

    if (jsonCacheFileUpdateTimestamp < updateTimestamp) {

      // update the source
      __writeFileSync(jsonCacheFilePath, JSON.stringify({
        data: Buffer.from(this.data).toString('base64'),
        map: mapContent,
        saveExtension: this._saveExtension
      }));

    }

  }

  /**
   * @name                  save
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderResource
   * @type                  Function
   *
   * Save the passed file depending on the differents scopes and output folders setted in the config
   *
   * @param           {WebpackLoader}             [loaderInstance=null]               The webpack loader instance to use to save the file
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  save(loaderInstance = null) {

    // cache the file
    this.saveCache();

    this.emitSaveProcessedStat();

    if (!this.filepath.includes(__tmpDir())) __events.emit('savedResource', this);

    if (this.saveExtension === 'js' && loaderInstance) {
      return true;
    }

    // loop on all the output file pathes
    this.outputFilePathes.forEach((output) => {
      __writeFileSync(process.cwd() + '/' + output, this.data);
    });

    return true;

  }

}
