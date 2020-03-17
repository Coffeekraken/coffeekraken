const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __set = require('@coffeekraken/sugar/js/object/set');
const __get = require('@coffeekraken/sugar/js/object/get');

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
      if (!this.getValue(`resources.${resource.filepath}`)) {
        this.setValue(`resources.${resource.filepath}`, resource);
      }
    });

    CoffeeBuilder.events.on('entryPathes', (path) => {
      if (this.getValue('entryPathes').indexOf(path) === -1) {
        this._stats.statsByPackages[CoffeeBuilder.api.getCurrentPackageName()].entryPathes.push(path);
      }
    });

    CoffeeBuilder.events.on('savedResource', (resource) => {
      if (!this.getValue(`savedResources.${resource.filepath}`)) {
        this.setValue(`savedResources.${resource.filepath}`, resource);
      }
    });

    CoffeeBuilder.events.on('fromCache', (data) => {
      this.setValue(`cache.resources.${data.resource.filepath}`, data.resource);
    });

    CoffeeBuilder.events.on('build', (data) => {

      const resource = data.resource;
      const processorName = data.processor || data.processorName;

      this.setValue(`build.processedResources.${resource.filepath}`, resource);

      this.setValue(`build.currentResourcePath`, resource.filepath);

      if (processorName) this.setValue('build.currentProcessor', processorName);

      if (processorName && !this.getValue(`build.processors.${processorName}`)) {
        this.setValue(`build.processors.${processorName}`, {
          processedResources: {}
        });
      }

      if (processorName && !resource.filepath.includes(__tmpDir())) {
        if (!this.getValue(`build.processors.${processorName}.processedResources.${resource.filepath}`)) {
          this.setValue(`build.processors.${processorName}.processedResources.${resource.filepath}`, resource);
        }
      }

      const filteredObj = __filterObj(this.getValue('build.processedResources'), (f) => {
        return this.getValue('entryPathes').indexOf(f.filepath) !== -1;
      });

      this.setValue(`build.percentage`, Math.round(100 / this.getValue('entryPathes').length * Object.keys(filteredObj).length))
    });

    CoffeeBuilder.events.on('postBuild', (data) => {

      const resource = data.resource;
      const processorName = data.processor || data.processorName;

      this.setValue(`postBuild.processedResources.${resource.filepath}`, resource);

      this.setValue(`postBuild.currentResourcePath`, resource.filepath);

      if (processorName) this.setValue('postBuild.currentProcessor', processorName);

      if (processorName && !getValue(`postBuild.processors.${processorName}`)) {
        this.setValue(`postBuild.processors.${processorName}`, {
          processedResources: {}
        });
      }

      if (processorName && !resource.filepath.includes(__tmpDir())) {
        if (!this.getValue(`postBuild.processors.${processorName}.processedResources.${resource.filepath}`)) {
          this.setValue(`postBuild.processors.${processorName}.processedResources.${resource.filepath}`, resource);
        }
      }

      const filteredObj = __filterObj(this.getValue('postBuild.processedResources'), (f) => {
        return this.getValue('entryPathes').indexOf(f.filepath) !== -1;
      });

      this.setValue(`postBuild.percentage`, Math.round(100 / this.getValue('entryPathes').length * Object.keys(filteredObj).length))

    });

  }

}

module.exports = CoffeeBuilderStats;
