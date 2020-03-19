const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __set = require('@coffeekraken/sugar/js/object/set');
const __get = require('@coffeekraken/sugar/js/object/get');
const __base64 = require('@coffeekraken/sugar/node/crypt/base64');

class CoffeeBuilderStats {

  /**
   * @name                          _stats
   * @namespace                     terminal.coffeebuilder.node.classes.CoffeeBuilderStats
   * @type                          Object
   * @private
   * 
   * Store the stats
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _stats = {};

  /**
   * @name                          constructor
   * @namespace                     terminal.coffeebuilder.node.classes.CoffeeBuilderStats
   * @type                          Function
   * @constructor
   * 
   * CoffeeBuilderStats constructor
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor() {
    // init the stats
    this.reset();
    // listen for events
    this._listenEvents();
  }

  /**
   * @name                                reset
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderStats
   * @type                                Function
   * 
   * Reset the stats
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  reset() {
    this._stats = {
      currentPackageName: null,
      statsByPackages: {},
      statsTemplate: {
        resources: {},
        entryPathes: [],
        savedResources: {},
        currentPackage: null,
        folders: {
          sources: {},
          outputs: {}
        },
        cache: {
          resources: {}
        },
        errors: [],
        build: {
          startTimestamp: null,
          endTimestamp: null,
          processedResources: {},
          currentResourcePath: '',
          currentProcessor: '',
          percentage: 0,
          processors: {}
        },
        postBuild: {
          startTimestamp: null,
          endTimestamp: null,
          processedResources: {},
          currentFilePath: '',
          currentProcessor: '',
          percentage: 0,
          processors: {}
        }
      }
    };
  }

  /**
   * @name                            getCurrentPackageStats
   * @namespace                       terminal.coffeebuilder.node.classes.CoffeeBuilderStats
   * @type                            Function
   * 
   * Get the current package stats or return false if their's not...
   * 
   * @return              {Object|Boolean}                          The current package stats or false if their's not...
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getCurrentPackageStats() {

    if (this._stats.statsByPackages[CoffeeBuilder.api.getCurrentPackageName()]) {
      return this._stats.statsByPackages[CoffeeBuilder.api.getCurrentPackageName()];
    }

    return false;
  }

  /**
   * @name                            set
   * @namespace                       terminal.coffeebuilder.node.classes.CoffeeBuilderStats
   * @type                            Function
   * 
   * Set a stats value
   * 
   * @todo      low             Rework the description
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  set(path, value) {

    if (!this._stats.statsByPackages[CoffeeBuilder.api.getCurrentPackageName()]) {
      this._stats.statsByPackages[CoffeeBuilder.api.getCurrentPackageName()] = {};
      Object.assign(this._stats.statsByPackages[CoffeeBuilder.api.getCurrentPackageName()], this._stats.statsTemplate);
    }

    __set(this._stats.statsByPackages[CoffeeBuilder.api.getCurrentPackageName()], path, value);
  }

  /**
   * @name                            get
   * @namespace                       terminal.coffeebuilder.node.classes.CoffeeBuilderStats
   * @type                            Function
   * 
   * Get a stats value
   * 
   * @todo      low             Rework the description
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get(path) {
    if (!this._stats.statsByPackages[CoffeeBuilder.api.getCurrentPackageName()]) {
      this._stats.statsByPackages[CoffeeBuilder.api.getCurrentPackageName()] = {};
      Object.assign(this._stats.statsByPackages[CoffeeBuilder.api.getCurrentPackageName()], this._stats.statsTemplate);
    }
    return __get(this._stats.statsByPackages[CoffeeBuilder.api.getCurrentPackageName()], path);
  }

  /**
   * @name                            listenEvents
   * @namespace                       terminal.coffeebuilder.node.classes.CoffeeBuilderStats
   * @type                            Function
   * 
   * Listen for events emitted through the class instance
   * 
   */
  _listenEvents() {

    CoffeeBuilder.events.on('resource', (resource) => {
      if (!this.get(`resources.${resource.id}`)) {
        this.set(`resources.${resource.id}`, resource);
      }
    });

    CoffeeBuilder.events.on('entryPathes', (path) => {
      if (this.get('entryPathes').indexOf(path) === -1) {
        this._stats.statsByPackages[CoffeeBuilder.api.getCurrentPackageName()].entryPathes.push(path);
      }
    });

    CoffeeBuilder.events.on('savedResource', (resource) => {
      if (!this.get(`savedResources.${resource.id}`)) {
        this.set(`savedResources.${resource.id}`, resource);
      }
    });

    CoffeeBuilder.events.on('fromCache', (data) => {
      this.set(`cache.resources.${data.resource.id}`, data.resource);
    });

    CoffeeBuilder.events.on('build', (data) => {

      const resource = data.resource;
      const processorName = data.processor || data.processorName;

      this.set(`build.processedResources.${resource.id}`, resource);

      this.set(`build.currentResourcePath`, resource.id);

      if (processorName) this.set('build.currentProcessor', processorName);

      if (processorName && !this.get(`build.processors.${processorName}`)) {
        this.set(`build.processors.${processorName}`, {
          processedResources: {}
        });
      }

      if (processorName && !resource.filepath.includes(__tmpDir())) {
        if (!this.get(`build.processors.${processorName}.processedResources.${resource.id}`)) {
          this.set(`build.processors.${processorName}.processedResources.${resource.id}`, resource);
        }
      }

      const filteredObj = __filterObj(this.get('build.processedResources'), (f) => {
        return this.get('entryPathes').indexOf(f.filepath) !== -1;
      });

      this.set(`build.percentage`, Math.round(100 / this.get('entryPathes').length * Object.keys(filteredObj).length))
    });

    CoffeeBuilder.events.on('postBuild', (data) => {

      const resource = data.resource;
      const processorName = data.processor || data.processorName;

      this.set(`postBuild.processedResources.${resource.id}`, resource);

      this.set(`postBuild.currentResourcePath`, resource.id);

      if (processorName) this.set('postBuild.currentProcessor', processorName);

      if (processorName && !this.get(`postBuild.processors.${processorName}`)) {
        this.set(`postBuild.processors.${processorName}`, {
          processedResources: {}
        });
      }

      if (processorName && !resource.filepath.includes(__tmpDir())) {
        if (!this.get(`postBuild.processors.${processorName}.processedResources.${resource.id}`)) {
          this.set(`postBuild.processors.${processorName}.processedResources.${resource.id}`, resource);
        }
      }

      const filteredObj = __filterObj(this.get('postBuild.processedResources'), (f) => {
        return this.get('entryPathes').indexOf(f.filepath) !== -1;
      });

      this.set(`postBuild.percentage`, Math.round(100 / this.get('entryPathes').length * Object.keys(filteredObj).length))

    });

  }

}

module.exports = CoffeeBuilderStats;
