if (process.env.NODE_ENV != 'production') require('module-alias/register');

const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __fs = require('fs');
const __loaderUtils = require('loader-utils');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __asyncForEach = require('@coffeekraken/sugar/js/array/asyncForEach');
const __writeFileSync = require('@coffeekraken/sugar/node/fs/writeFileSync');
const __log = require('@coffeekraken/sugar/node/log/log');
const __cliProgress = require('cli-progress');
const __colors = require('colors/safe');
const __getDevEnv = require('@coffeekraken/sugar/node/dev/getDevEnv');
const __breakLineDependingOnSidesPadding = require('@coffeekraken/sugar/node/terminal/breakLineDependingOnSidesPadding');
const __readline = require('readline');
const __folderSize = require('@coffeekraken/sugar/node/fs/folderSize');
const __parseHtml = require('@coffeekraken/sugar/node/terminal/parseHtml');
const __coffeeEvents = require('@coffeekraken/coffeebuilder/node/events');

let _options = {};
let _processedResources = [];
let _processedResourcesPercentage = 0;
let _interface = null;
let _usedProcessors = {};

let printInterval;

__coffeeEvents.on('reset', () => {
  console.log('RESET');
  _processedResources = [];
  _processedResourcesPercentage = 0;
  _usedProcessors = {};
});

module.exports.raw = true;
module.exports = function coffeeLoader(source) {

  this.cacheable(false);

  // this.cacheable && this.cacheable();

  const _callback = this.async();
  const _extension = __getExtension(this.resource);
  let _saveExtension = _extension;
  const _rootContext = this.rootContext;
  const _this = this;
  _options = __loaderUtils.getOptions(this);
  _options = __deepMerge(require('./defaultSettings'), _options);

  const _resource = this.resource;
  let _source = source;

  Object.keys(_options.processors).forEach((processorName) => {
    const processorObj = _options.processors[processorName];
    if (processorObj.extensions.indexOf(_extension) != -1) {
      if ( ! _usedProcessors[processorName]) {
        _usedProcessors[processorName] = {
          files: 0
        };
      }
    }
  });

  if (_options.disable === true) {
    // Bypass processing while on watch mode
    return source;
  } else {

    const stats = __fs.statSync(_resource);
    const mimeTime = stats.mtime;

    // if (updatedTimestamps[this.resource]) {
    //
    //   if (updatedTimestamps[this.resource].localeCompare(mimeTime)) {
    //     __log(`The resource "${this.resource.replace(this.rootContext, '')}" has not changed so it will be taken from the cache...`, 'info');
    //     if (__fs.existsSync(`${__tmpDir()}/_webpackBuildSpeedOptimizationLoader/${this.resource.slice(1).split('/').join('-')}`)) {
    //       // console.log(options);
    //       // console.log(this.resource.localeCompare(this.rootContext));
    //
    //       if ( ! this.resource.includes(this.rootContext)) return;
    //       if (extension === 'js' || extension === 'css' || extension === 'scss' || extension === 'sass') {
    //         if ( ! this.resource.includes('.bundle.')) return;
    //       }
    //
    //       let buildScopes = {};
    //
    //       Object.keys(options).forEach((key, i) => {
    //         const opts = options[key];
    //
    //         let outputFilePath = this.resource;
    //
    //         if (opts.extensions && opts.extensions.indexOf(extension) !== -1) {
    //           buildScopes[key] = opts;
    //         } else return;
    //
    //         Object.keys(buildScopes).forEach((scopeKey) => {
    //
    //           const scope = buildScopes[scopeKey];
    //
    //           const outputFolder = scope.outputFolder;
    //           let sourcesFolder = scope.sourcesFolder;
    //           if ( ! Array.isArray(sourcesFolder)) sourcesFolder = [sourcesFolder];
    //           if ( ! outputFolder || ! sourcesFolder) return;
    //
    //           sourcesFolder.forEach((sourcesFolderPath) => {
    //             outputFilePath = outputFilePath.replace(this.rootContext, '');
    //             outputFilePath = outputFilePath.replace(sourcesFolderPath, '');
    //             outputFilePath = outputFilePath.replace('//','');
    //             if (outputFilePath.slice(0,1) === '/') outputFilePath = outputFilePath.slice(1);
    //           });
    //
    //           // console.log(scopeKey);
    //           //   console.log(outputFilePath);
    //
    //         });
    //
    //
    //
    //
    //       });
    //
    //       // return this.emitFile(outputPath, content);
    //       // return callback(null, __fs.readFileSync(`${__tmpDir()}/_webpackBuildSpeedOptimizationLoader/${this.resource.slice(1).split('/').join('-')}`));
    //     }
    //     return callback(null, source);
    //   }
    // }

    let processorsSortedAndFilteredObj = __sortObj(_options.processors, (a, b) => {
      return b.weight - a.weight;
    });
    processorsSortedAndFilteredObj = __filterObj(processorsSortedAndFilteredObj, (item) => {
      return item !== false && item.extensions.indexOf(_extension) !== -1;
    });

    async function execProcessor(i = 0) {

      const processorObj = processorsSortedAndFilteredObj[Object.keys(processorsSortedAndFilteredObj)[i]];
      const result = await processorObj.processor(_resource, _source, processorObj.settings, _this);
      _source = result.source || result;
      if (result.extension) _saveExtension = result.extension;

      _usedProcessors[Object.keys(processorsSortedAndFilteredObj)[i]].files++;

      __coffeeEvents.emit('data', {
        percentage: _processedResourcesPercentage,
        resource: _resource,
        processor: Object.keys(processorsSortedAndFilteredObj)[i],
        processedResources: _processedResources,
        usedProcessors: _usedProcessors
      });

      if (i >= Object.keys(processorsSortedAndFilteredObj).length-1) {
        handleProcessedFile(_resource, _source, Object.keys(processorsSortedAndFilteredObj)[i]);
      } else {
        execProcessor(i+1);
      }
    }
    if (Object.keys(processorsSortedAndFilteredObj).length > 0) execProcessor();
    else handleProcessedFile(_resource, _source);

    async function handleProcessedFile(resource, sourceCode, processor) {

      _processedResources.push(resource);
      let processedResourcesCount = 0;
      Object.keys(_this._compiler.options.entry).forEach((r) => {
        const sourcePath = _this._compiler.options.entry[r];
        if (_processedResources.indexOf(sourcePath) != -1) {
          processedResourcesCount++;
        }
      });
      _processedResourcesPercentage = 100 / Object.keys(_this._compiler.options.entry).length * processedResourcesCount;

      __coffeeEvents.emit('data', {
        percentage: _processedResourcesPercentage,
        resource,
        processor,
        processedResources: _processedResources,
        usedProcessors: _usedProcessors
      });

      // check if is a js file so that we let webpack handle his saving phase...
      if (_saveExtension === 'js') {
        return _callback(null, sourceCode);
      } else {
        saveProcessedFile(resource, sourceCode, _saveExtension);
        return _callback(null, '');
      }
    }

    function saveProcessedFile(resource, sourceCode, saveExtension) {

      let buildScopes = {};
      let extension = __getExtension(resource);

      Object.keys(_options.files).forEach((key, i) => {
        const opts = _options.files[key];

        let outputFilePath = resource;

        if (opts.extensions && opts.extensions.indexOf(extension) !== -1) {
          buildScopes[key] = opts;
        } else return;

        Object.keys(buildScopes).forEach((scopeKey) => {

          const scope = buildScopes[scopeKey];

          let outputFolder = scope.outputFolder;
          if ( ! Array.isArray(outputFolder)) outputFolder = [outputFolder];

          let sourcesFolder = scope.sourcesFolder;
          if ( ! Array.isArray(sourcesFolder)) sourcesFolder = [sourcesFolder];
          if ( ! outputFolder || ! sourcesFolder) return;

          outputFolder.forEach((outputFolderPath) => {

            sourcesFolder.forEach((sourcesFolderPath) => {
              outputFilePath = outputFilePath.trim();
              outputFilePath = outputFilePath.replace(_rootContext, '');
              outputFilePath = outputFilePath.replace(sourcesFolderPath, '');
              if (outputFilePath.slice(0,2) === '//') outputFilePath = outputFilePath.slice(2);
              if (outputFilePath.slice(0,1) === '/') outputFilePath = outputFilePath.slice(1);
              outputFilePath = outputFilePath.replace(`.${_extension}`,`.${saveExtension}`);
            });

            __writeFileSync(process.cwd() + '/' + outputFolderPath + '/' + outputFilePath, sourceCode);
            // _this.emitFile(`${outputFolderPath}/${outputFilePath}`, sourceCode);

          });
        });
      });
    }

    // console.log(this.resource, src);

    // jpg transpiler
  //   if (options.jpg.extensions.indexOf(extension) !== -1) {
  //     if ( ! options.jpg) return callback(null, source);
  //     source = await __optimizeImage(this.resource, source, options);
  //     returnSource = false;
  //   }
  //
  //   // svg transpiler
  //   if (options.svg.extensions.indexOf(extension) !== -1) {
  //     if ( ! options.svg) return callback(null, source);
  //     source = await __optimizeImage(this.resource, source, options);
  //     returnSource = false;
  //   }
  //
  //   // png transpiler
  //   if (options.png.extensions.indexOf(extension) !== -1) {
  //     if ( ! options.png) return callback(null, source);
  //     source = await __optimizeImage(this.resource, source, options);
  //     returnSource = false;
  //   }
  //
  //   // webp transpiler
  //   if (options.webp.extensions.indexOf(extension) !== -1) {
  //     if ( ! options.webp) return callback(null, source);
  //     source = await __optimizeImage(this.resource, source, options);
  //     returnSource = false;
  //   }
  //
  //   // gif transpiler
  //   if (options.gif.extensions.indexOf(extension) !== -1) {
  //     if ( ! options.gif) return callback(null, source);
  //     source = await __optimizeImage(this.resource, source, options);
  //     returnSource = false;
  //   }
  //
  //   // css transpiler
  //   if (options.css.extensions.indexOf(extension) !== -1) {
  //     if ( ! options.css) return callback(null, source);
  //
  //     const projectDirectory = process.cwd();
  //     const bundler = new __Bundler(undefined, projectDirectory);
  //
  //     const result = await bundler.bundle(this.resource);
  //     __fs.writeFileSync(`${__tmpDir()}/_coffeekrakenCoffeeLoader.scss`, result.bundledContent);
  //
  //     source = __sass.renderSync(__deepMerge({
  //       file: `${__tmpDir()}/_coffeekrakenCoffeeLoader.scss`,
  //       includePaths: [__path.resolve(process.cwd(), 'node_modules'), __path.resolve(this.rootContext, 'node_modules')],
  //       // importer: __globImporter()
  //     }, options.vendors.sass)).css;
  //
  //     returnExtension = 'css';
  //     returnSource = false;
  //   }
  //
  //   // coffeescript transpiler
  //   if (options.coffee.extensions.indexOf(extension) !== -1) {
  //     const result = __coffeescript.compile(source.toString(), __deepMerge({
  //     }, options.vendors.coffeescript));
  //     source = result;
  //     returnExtension = 'js';
  //   }
  //
  //   // ts transpiler
  //   if (options.ts.extensions.indexOf(extension) !== -1) {
  //     const result = __typescript.transpileModule(source.toString(), __deepMerge({
  //       compilerOptions: {
  //         module: __typescript.ModuleKind.CommonJS
  //       }
  //     }, options.vendors.typescript));
  //     source = result.outputText;
  //     returnExtension = 'js';
  //   }
  //
  //   // js transpiler
  //   if (options.js.extensions.indexOf(extension) !== -1) {
  //     // process babel
  //     source = __babel.transformSync(source, options.vendors.babel).code;
  //   }
  //
  //   // file loader
  //   if (options.file.extensions.indexOf(extension) !== -1) {
  //     const copy = Object.assign({}, this);
  //     copy.query = options.file;
  //     source = __fileLoader.call(copy, source);
  //   }
  //
  //   // write files on disk if needed
  //   if (extension !== 'js' && extension !== 'ts' && extension !== 'coffee') {
  //
  //     let buildScopes = {};
  //     Object.keys(options).forEach((key, i) => {
  //       const opts = options[key];
  //
  //       let outputFilePath = this.resource;
  //
  //       if (opts.extensions && opts.extensions.indexOf(extension) !== -1) {
  //         buildScopes[key] = opts;
  //       } else return;
  //
  //       Object.keys(buildScopes).forEach((scopeKey) => {
  //
  //         const scope = buildScopes[scopeKey];
  //
  //         let outputFolder = scope.outputFolder;
  //         if ( ! Array.isArray(outputFolder)) outputFolder = [outputFolder];
  //
  //         let sourcesFolder = scope.sourcesFolder;
  //         if ( ! Array.isArray(sourcesFolder)) sourcesFolder = [sourcesFolder];
  //         if ( ! outputFolder || ! sourcesFolder) return;
  //
  //         outputFolder.forEach((outputFolderPath) => {
  //
  //           sourcesFolder.forEach((sourcesFolderPath) => {
  //             outputFilePath = outputFilePath.trim();
  //             outputFilePath = outputFilePath.replace(this.rootContext, '');
  //             outputFilePath = outputFilePath.replace(sourcesFolderPath, '');
  //             if (outputFilePath.slice(0,2) === '//') outputFilePath = outputFilePath.slice(2);
  //             if (outputFilePath.slice(0,1) === '/') outputFilePath = outputFilePath.slice(1);
  //             outputFilePath = outputFilePath.replace(`.${extension}`,`.${returnExtension}`);
  //           });
  //
  //           // console.log(outputFolder + '/' + outputFilePath);
  //           // console.log(`${this.rootContext}/${outputFolder}/${outputFilePath}`);
  //           this.emitFile(`${outputFolderPath}/${outputFilePath}`, source);
  //
  //         });
  //         returnSource = false;
  //       });
  //
  //     });
  //
  //   }
  //
  }

  // console.log(this.resource, result);

  // return source;

}
