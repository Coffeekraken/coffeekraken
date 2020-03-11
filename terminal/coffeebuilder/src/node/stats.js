const __events = require('./events');
const __path = require('path');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __set = require('@coffeekraken/sugar/js/object/set');
const __get = require('@coffeekraken/sugar/js/object/get');

let __stats = {};

function reset() {
  __stats = {
    currentPackage: '.',
    packages: [],
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

  setCurrentPackage('.');

}
reset();

function setPackages(packages) {
  __stats.packages = packages;
}

function setCurrentPackage(packagePath) {
  __stats.currentPackage = packagePath;
  if (__stats.packages.indexOf(packagePath) === -1) {
    __stats.packages.push(packagePath);
  }
  if (!__stats.statsByPackages[packagePath]) {
    __stats.statsByPackages[packagePath] = {};
    Object.assign(__stats.statsByPackages[packagePath], __stats.statsTemplate);
  }
}

function setValue(path, value) {
  __set(__stats.statsByPackages[__stats.currentPackage], path, value);
}

function getValue(path) {
  return __get(__stats.statsByPackages[__stats.currentPackage], path);
}

__events.on('resource', (resource) => {
  if (!getValue(`resources.${resource.filepath}`)) {
    setValue(`resources.${resource.filepath}`, resource);
  }

  // if (!__stats.resources[resource.filepath]) {
  //   __stats.resources[resource.filepath] = resource;
  // }
});

__events.on('entryPathes', (path) => {
  if (getValue('entryPathes').indexOf(path) === -1) {
    __stats.statsByPackages[__stats.currentPackage].entryPathes.push(path);
  }

  // if (__stats.entryPathes.indexOf(path) === -1) {
  //   __stats.entryPathes.push(path);
  // }
});

__events.on('savedResource', (resource) => {
  if (!getValue(`savedResources.${resource.filepath}`)) {
    setValue(`savedResources.${resource.filepath}`, resource);
  }
  // if (!__stats.savedResources[resource.filepath]) {
  //   __stats.savedResources[resource.filepath] = resource;
  // }
});

__events.on('fromCache', (data) => {
  setValue(`cache.resources.${data.resource.filepath}`, data.resource);
  // __stats.cache.resources[data.resource.filepath] = data.resource;
});

__events.on('build', (data) => {

  const resource = data.resource;
  const processorName = data.processor || data.processorName;

  setValue(`build.processedResources.${resource.filepath}`, resource);
  // __stats.build.processedResources[resource.filepath] = resource;

  setValue(`build.currentResourcePath`, resource.filepath);
  // __stats.build.currentResourcePath = resource.filepath;

  if (processorName) setValue('build.currentProcessor', processorName);
  // __stats.build.currentProcessor = processorName;

  if (processorName && !getValue(`build.processors.${processorName}`)) {
    // if (processorName && !__stats.build.processors[processorName]) {
    setValue(`build.processors.${processorName}`, {
      processedResources: {}
    });
    // __stats.build.processors[processorName] = {
    //   processedResources: {}
    // }
  }

  if (processorName && !resource.filepath.includes(__tmpDir())) {
    if (!getValue(`build.processors.${processorName}.processedResources.${resource.filepath}`)) {
      // if (!__stats.build.processors[processorName].processedResources[resource.filepath]) {
      setValue(`build.processors.${processorName}.processedResources.${resource.filepath}`, resource);
      // __stats.build.processors[processorName].processedResources[resource.filepath] = resource;
    }
  }

  const filteredObj = __filterObj(getValue('build.processedResources'), (f) => {
    return getValue('entryPathes').indexOf(f.filepath) !== -1;
    // return __stats.entryPathes.indexOf(f.filepath) !== -1;
  });

  setValue(`build.percentage`, Math.round(100 / getValue('entryPathes').length * Object.keys(filteredObj).length))
  // __stats.build.percentage = Math.round(100 / __stats.entryPathes.length * Object.keys(filteredObj).length);
});

__events.on('postBuild', (data) => {

  const resource = data.resource;
  const processorName = data.processor || data.processorName;

  setValue(`postBuild.processedResources.${resource.filepath}`, resource);
  // __stats.postBuild.processedResources[resource.filepath] = resource;

  setValue(`postBuild.currentResourcePath`, resource.filepath);
  // __stats.postBuild.currentResourcePath = resource.filepath;

  if (processorName) setValue('postBuild.currentProcessor', processorName);
  // __stats.postBuild.currentProcessor = processorName;

  if (processorName && !getValue(`postBuild.processors.${processorName}`)) {
    // if (processorName && !__stats.postBuild.processors[processorName]) {
    setValue(`postBuild.processors.${processorName}`, {
      processedResources: {}
    });
    // __stats.postBuild.processors[processorName] = {
    //   processedResources: {}
    // }
  }

  if (processorName && !resource.filepath.includes(__tmpDir())) {
    if (!getValue(`postBuild.processors.${processorName}.processedResources.${resource.filepath}`)) {
      // if (!__stats.postBuild.processors[processorName].processedResources[resource.filepath]) {
      setValue(`postBuild.processors.${processorName}.processedResources.${resource.filepath}`, resource);
      // __stats.postBuild.processors[processorName].processedResources[resource.filepath] = resource;
    }
  }

  const filteredObj = __filterObj(getValue('postBuild.processedResources'), (f) => {
    return getValue('entryPathes').indexOf(f.filepath) !== -1;
    // return __stats.entryPathes.indexOf(f.filepath) !== -1;
  });

  setValue(`postBuild.percentage`, Math.round(100 / getValue('entryPathes').length * Object.keys(filteredObj).length))
  // __stats.build.percentage = Math.round(100 / __stats.entryPathes.length * Object.keys(filteredObj).length);

  // const resource = data.resource;
  // const processorName = data.processor || data.processorName;

  // __stats.postBuild.processedResources[resource.filepath] = resource;

  // __stats.postBuild.currentResourcePath = resource.filepath;

  // if (processorName) __stats.postBuild.currentProcessor = processorName;

  // if (processorName && !__stats.postBuild.processors[processorName]) {
  //   __stats.postBuild.processors[processorName] = {
  //     processedResources: {}
  //   }
  // }
  // if (processorName && !resource.filepath.includes(__tmpDir())) {
  //   if (!__stats.postBuild.processors[processorName].processedResources[resource.filepath]) {
  //     __stats.postBuild.processors[processorName].processedResources[resource.filepath] = resource;
  //   }
  // }

  // const filteredObj = __filterObj(__stats.postBuild.processedResources, (f) => {
  //   return __stats.entryPathes.indexOf(f.filepath) !== -1;
  // });
  // __stats.postBuild.percentage = Math.round(100 / __stats.entryPathes.length * Object.keys(filteredObj).length);

});

module.exports = __stats;
module.exports.reset = reset;
module.exports.setValue = setValue;
module.exports.getValue = getValue;
module.exports.setCurrentPackage = setCurrentPackage;
module.exports.setPackages = setPackages;
