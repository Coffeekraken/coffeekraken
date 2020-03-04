const __events = require('./events');
const __path = require('path');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');

let __stats = {};

function reset() {
  __stats = {
    resources: {},
    entryPathes: [],
    savedResources: {},
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
  };
}
reset();

__events.on('resource', (resource) => {
  if (!__stats.resources[resource.filepath]) {
    __stats.resources[resource.filepath] = resource;
  }
});

__events.on('entryPathes', (path) => {
  if (__stats.entryPathes.indexOf(path) === -1) {
    __stats.entryPathes.push(path);
  }
});

__events.on('savedResource', (resource) => {
  if (!__stats.savedResources[resource.filepath]) {
    __stats.savedResources[resource.filepath] = resource;
  }
});

__events.on('fromCache', (data) => {
  __stats.cache.resources[data.resource.filepath] = data.resource;
});

__events.on('build', (data) => {

  const resource = data.resource;
  const processorName = data.processor || data.processorName;

  __stats.build.processedResources[resource.filepath] = resource;

  __stats.build.currentResourcePath = resource.filepath;

  if (processorName) __stats.build.currentProcessor = processorName;

  if (processorName && !__stats.build.processors[processorName]) {
    __stats.build.processors[processorName] = {
      processedResources: {}
    }
  }
  if (processorName && !resource.filepath.includes(__tmpDir())) {
    if (!__stats.build.processors[processorName].processedResources[resource.filepath]) {
      __stats.build.processors[processorName].processedResources[resource.filepath] = resource;
    }
  }

  const filteredObj = __filterObj(__stats.build.processedResources, (f) => {
    return __stats.entryPathes.indexOf(f.filepath) !== -1;
  });
  __stats.build.percentage = Math.round(100 / __stats.entryPathes.length * Object.keys(filteredObj).length);
});

__events.on('postBuild', (data) => {

  const resource = data.resource;
  const processorName = data.processor || data.processorName;

  __stats.postBuild.processedResources[resource.filepath] = resource;

  __stats.postBuild.currentResourcePath = resource.filepath;

  if (processorName) __stats.postBuild.currentProcessor = processorName;

  if (processorName && !__stats.postBuild.processors[processorName]) {
    __stats.postBuild.processors[processorName] = {
      processedResources: {}
    }
  }
  if (processorName && !resource.filepath.includes(__tmpDir())) {
    if (!__stats.postBuild.processors[processorName].processedResources[resource.filepath]) {
      __stats.postBuild.processors[processorName].processedResources[resource.filepath] = resource;
    }
  }

  const filteredObj = __filterObj(__stats.postBuild.processedResources, (f) => {
    return __stats.entryPathes.indexOf(f.filepath) !== -1;
  });
  __stats.postBuild.percentage = Math.round(100 / __stats.entryPathes.length * Object.keys(filteredObj).length);

});

module.exports = __stats;
module.exports.reset = reset;
