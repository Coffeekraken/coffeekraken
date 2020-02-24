const __events = require('./events');

const __stats = {
  cache: {
    files: []
  },
  build: {
    startTimestamp: null,
    endTimestamp: null,
    files: [],
    processedFiles: [],
    currentFilePath: '',
    currentProcessor: '',
    percentage: 0,
    processors: {}
  },
  postBuild: {
    startTimestamp: null,
    endTimestamp: null,
    files: [],
    processedFiles: [],
    currentFilePath: '',
    currentProcessor: '',
    percentage: 0,
    processors: {}
  }
}

__events.on('cache', (data) => {
  __stats.cache.files = __stats.cache.files.concat(data.files);
});

__events.on('build', (data) => {

  if (data.files) __stats.build.files = data.files;
  if (data.filepath) __stats.build.currentFilePath = data.filepath;
  if (data.processor) __stats.build.currentProcessor = data.processor;

  if (data.processor && ! __stats.build.processors[data.processor]) {
    __stats.build.processors[data.processor] = {
      processedFiles: []
    }
  }
  if (data.filepath && data.processor) {
    if (__stats.build.processors[data.processor].processedFiles.indexOf(data.filepath) === -1) __stats.build.processors[data.processor].processedFiles.push(data.filepath);
    if (__stats.build.processedFiles.indexOf(data.filepath) === -1) __stats.build.processedFiles.push(data.filepath);
  }

  const filteredFilesArray = __stats.build.processedFiles.filter((f) => {
    return __stats.build.files.indexOf(f) !== -1;
  });

  __stats.build.percentage = Math.round(100 / __stats.build.files.length * filteredFilesArray.length);
});

__events.on('postBuild', (data) => {

  if (data.files) __stats.postBuild.files = data.files.map((f) => {
    return __path.resolve(f);
  });

  if (data.filepath) __stats.postBuild.currentFilePath = data.filepath;
  if (data.processor) __stats.postBuild.currentProcessor = data.processor;

  if (data.processor && ! __stats.build.processors[data.processor]) {
    __stats.build.processors[data.processor] = {
      processedFiles: []
    }
  }
  if (data.filepath && data.processor) {
    if (__stats.build.processors[data.processor].processedFiles.indexOf(data.filepath) === -1) __stats.build.processors[data.processor].processedFiles.push(data.filepath);
  }
  if (data.filepath) {
    if (__stats.postBuild.processedFiles.indexOf(data.filepath) === -1) __stats.postBuild.processedFiles.push(data.filepath);
  }

  const filteredFilesArray = __stats.postBuild.processedFiles.filter((f) => {
    return __stats.postBuild.files.indexOf(f) !== -1;
  });

  __stats.postBuild.percentage = Math.round(100 / __stats.postBuild.files.length * filteredFilesArray.length);

});

module.exports = __stats;
