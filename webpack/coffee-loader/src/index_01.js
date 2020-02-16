const __fs = require('fs');
const __fsExtra = require('fs-extra');
const __path = require('path');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __log = require('@coffeekraken/sugar/node/log/log');
const __base64 = require('@coffeekraken/sugar/node/crypt/base64');
const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');
const __glob = require('glob');

const __imagemin = require('imagemin');
const __imagemin_mozjpeg = require('imagemin-mozjpeg');
const __imagemin_svgo = require('imagemin-svgo');
const __imagemin_gifsicle = require('imagemin-gifsicle');
const __imagemin_pngquant = require('imagemin-pngquant');
const __imagemin_webp = require('imagemin-webp');

const __typescript = require('typescript');
const __coffeescript = require('coffeescript');

const __sass = require('sass');
const __globImporter = require('sass-glob-importer');
const __Bundler = require("scss-bundle").Bundler;

const __fileLoader = require('file-loader');

const __babel = require("@babel/core");

const getOptions = require('loader-utils').getOptions;

let updatedTimestamps = {};
let idx = 0;
let currentIdx = 0;
let idxInterval = null

if (__fs.existsSync(`${__tmpDir()}/_webpackBuildSpeedOptimizationLoader.json`)) {
  updatedTimestamps = JSON.parse(__fs.readFileSync(`${__tmpDir()}/_webpackBuildSpeedOptimizationLoader.json`));
}

// function __callback(content, resource, mimeTime, cb) {
//
//   // save the file in the cache directory
//   __fsExtra.outputFile(`${__tmpDir()}/_webpackBuildSpeedOptimizationLoader/${resource.slice(1).split('/').join('-')}`, content);
//
//   // save the
//   updatedTimestamps[resource] = mimeTime;
//
//   // call the callback
//   cb(null, content);
//
//   clearTimeout(idxInterval);
//   idxInterval = setTimeout(() => {
//     __fs.writeFileSync(`${__tmpDir()}/_webpackBuildSpeedOptimizationLoader.json`, JSON.stringify(updatedTimestamps));
//   }, 500);
//
// }
//
async function __optimizeImage(resource, source, options) {
  switch(__getExtension(resource)) {
    case 'jpg':
      return await __imagemin.buffer(source, {
        plugins: [__imagemin_mozjpeg(options.vendors.imageminMozjpeg)]
      });
    break;
    case 'png':
      return await __imagemin.buffer(source, {
        plugins: [__imagemin_pngquant(options.vendors.imageminPngquant)]
      });
    break;
    case 'gif':
      return await __imagemin.buffer(source, {
        plugins: [__imagemin_gifsicle(options.vendors.imageminGifsicle)]
      });
    break;
    case 'svg':
      return await __imagemin.buffer(source, {
        plugins: [__imagemin_svgo(options.vendors.imageminSvgo)]
      });
    break;
    case 'webp':
      return await __imagemin.buffer(source, {
        plugins: [__imagemin_webp(options.vendors.imageminWebp)]
      });
    break;
  }
}

// prepare default options
let options = {
  disable: false,
  compile: ['js','ts','coffee','css','jpg','svg','gif','png','webp'],
  vendors: {
    babel: {
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
      ],
      presets: ['@babel/preset-env']
    },
    sass: {},
    typescript: {},
    coffeescript: {},
    fileLoader: {},
    imageminMozjpeg: {},
    imageminSvgo: {},
    imageminGifsicle: {},
    imageminPngquant: {},
    imageminWebp: {}
  },
  file: {
    extensions: [],
    outputFolder: ['dist/files'],
    sourcesFolder: ['src/files']
  },
  js: {
    extensions: ['js'],
    outputFolder: 'dist/js',
    sourcesFolder: ['src/js'],
    sources: '**/*.bundle.js'
  },
  ts: {
    extensions: ['ts'],
    outputFolder: 'dist/js',
    sourcesFolder: ['src/js'],
    sources: '**/*.ts'
  },
  coffee: {
    extensions: ['coffee'],
    outputFolder: 'dist/js',
    sourcesFolder: ['src/js'],
    sources: '**/*.coffee'
  },
  css: {
    extensions: ['css','scss','sass'],
    outputFolder: ['dist/css'],
    sourcesFolder: ['src/css'],
    sources: '**/*.bundle.{css,scss,sass}'
  },
  jpg: {
    extensions: ['jpg','jpeg'],
    outputFolder: ['dist/images'],
    sourcesFolder: ['src/images'],
    sources: '**/*.{jpg,jpeg}',
    quality: 70
  },
  svg: {
    extensions: ['svg'],
    outputFolder: ['dist/images'],
    sourcesFolder: ['src/images'],
    sources: '**/*.svg'
  },
  gif: {
    extensions: ['gif'],
    outputFolder: ['dist/images'],
    sourcesFolder: ['src/images'],
    sources: '**/*.gif',
    quality: 70
  },
  png: {
    extensions: ['png'],
    outputFolder: ['dist/images'],
    sourcesFolder: ['src/images'],
    sources: '**/*.png',
    quality: 70
  },
  webp: {
    extensions: ['webp'],
    outputFolder: ['dist/images'],
    sourcesFolder: ['src/images'],
    sources: '**/*.webp',
    quality: 70
  }
}

options.vendors.imageminMozjpeg.quality = options.jpg.quality;
options.vendors.imageminGifsicle.optimizationLevel = Math.round(3 / 100 * options.gif.quality);
options.vendors.imageminPngquant.quality = [1 / 100 * options.png.quality, 1 / 100 * options.png.quality];
options.vendors.imageminWebp.quality = options.webp.quality;

module.exports = async function loader(source) {
  this.cacheable && this.cacheable();

  const callback = this.async();
  const extension = __getExtension(this.resource);
  const _this = this;
  let returnSource = true;
  let returnExtension = extension;


  if (options.disable === true) {
    // Bypass processing while on watch mode
    return source;
  } else {

    const stats = __fs.statSync(this.resource);
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

    // jpg transpiler
    if (options.jpg.extensions.indexOf(extension) !== -1) {
      if ( ! options.jpg) return callback(null, source);
      source = await __optimizeImage(this.resource, source, options);
      returnSource = false;
    }

    // svg transpiler
    if (options.svg.extensions.indexOf(extension) !== -1) {
      if ( ! options.svg) return callback(null, source);
      source = await __optimizeImage(this.resource, source, options);
      returnSource = false;
    }

    // png transpiler
    if (options.png.extensions.indexOf(extension) !== -1) {
      if ( ! options.png) return callback(null, source);
      source = await __optimizeImage(this.resource, source, options);
      returnSource = false;
    }

    // webp transpiler
    if (options.webp.extensions.indexOf(extension) !== -1) {
      if ( ! options.webp) return callback(null, source);
      source = await __optimizeImage(this.resource, source, options);
      returnSource = false;
    }

    // gif transpiler
    if (options.gif.extensions.indexOf(extension) !== -1) {
      if ( ! options.gif) return callback(null, source);
      source = await __optimizeImage(this.resource, source, options);
      returnSource = false;
    }

    // css transpiler
    if (options.css.extensions.indexOf(extension) !== -1) {
      if ( ! options.css) return callback(null, source);

      const projectDirectory = process.cwd();
      const bundler = new __Bundler(undefined, projectDirectory);

      const result = await bundler.bundle(this.resource);
      __fs.writeFileSync(`${__tmpDir()}/_coffeekrakenCoffeeLoader.scss`, result.bundledContent);

      source = __sass.renderSync(__deepMerge({
        file: `${__tmpDir()}/_coffeekrakenCoffeeLoader.scss`,
        includePaths: [__path.resolve(process.cwd(), 'node_modules'), __path.resolve(this.rootContext, 'node_modules')],
        // importer: __globImporter()
      }, options.vendors.sass)).css;

      returnExtension = 'css';
      returnSource = false;
    }

    // coffeescript transpiler
    if (options.coffee.extensions.indexOf(extension) !== -1) {
      const result = __coffeescript.compile(source.toString(), __deepMerge({
      }, options.vendors.coffeescript));
      source = result;
      returnExtension = 'js';
    }

    // ts transpiler
    if (options.ts.extensions.indexOf(extension) !== -1) {
      const result = __typescript.transpileModule(source.toString(), __deepMerge({
        compilerOptions: {
          module: __typescript.ModuleKind.CommonJS
        }
      }, options.vendors.typescript));
      source = result.outputText;
      returnExtension = 'js';
    }

    // js transpiler
    if (options.js.extensions.indexOf(extension) !== -1) {
      // process babel
      source = __babel.transformSync(source, options.vendors.babel).code;
    }

    // file loader
    if (options.file.extensions.indexOf(extension) !== -1) {
      const copy = Object.assign({}, this);
      copy.query = options.file;
      source = __fileLoader.call(copy, source);
    }

    // write files on disk if needed
    if (extension !== 'js' && extension !== 'ts' && extension !== 'coffee') {

      let buildScopes = {};
      Object.keys(options).forEach((key, i) => {
        const opts = options[key];

        let outputFilePath = this.resource;

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
              outputFilePath = outputFilePath.replace(this.rootContext, '');
              outputFilePath = outputFilePath.replace(sourcesFolderPath, '');
              if (outputFilePath.slice(0,2) === '//') outputFilePath = outputFilePath.slice(2);
              if (outputFilePath.slice(0,1) === '/') outputFilePath = outputFilePath.slice(1);
              outputFilePath = outputFilePath.replace(`.${extension}`,`.${returnExtension}`);
            });

            // console.log(outputFolder + '/' + outputFilePath);
            // console.log(`${this.rootContext}/${outputFolder}/${outputFilePath}`);
            this.emitFile(`${outputFolderPath}/${outputFilePath}`, source);

          });
          returnSource = false;
        });

      });

    }

  }

  if (returnSource) {
    callback(null, source);
  } else {
    callback(null, '');
  }
  // return source;

}

module.exports.options = (opts) => {
  if (opts.compile) delete options.compile;
  options = __deepMerge(options, opts);
}

module.exports.entry = (entryObj) => {

  // build all the src glob patterns
  const globPatterns = [];
  const filesToBuild = [];

  options.compile.forEach((scope) => {
    const opts = options[scope];
    if ( ! opts || ! opts.sources) return;
    let sourcesFolder = opts.sourcesFolder;
    if ( ! Array.isArray(sourcesFolder)) sourcesFolder = [sourcesFolder];
    sourcesFolder = [...new Set(sourcesFolder)];
    opts.sourcesFolder.forEach((s) => {
      if (globPatterns.find((obj) => {
        return obj.pattern === s + '/' + opts.sources;
      })) return;

      globPatterns.push({
        pattern: s + '/' + opts.sources,
        sourcesFolder: sourcesFolder,
        outputFolder: opts.outputFolder
      });
    });
  });

  globPatterns.forEach((patternObj) => {
    const files = __glob.sync(`${__dirname}/../../${patternObj.pattern}`);
    filesToBuild.push({
      outputFolder: patternObj.outputFolder,
      sourcesFolder: patternObj.sourcesFolder,
      files
    });
  });

  // build the entry property
  let assetsArray = [];
  filesToBuild.forEach((fileObj) => {

    fileObj.files.forEach((file) => {

      const extension = __getExtension(file);
      let filePath = file.replace(__path.resolve(__dirname, '../../'), '');

      fileObj.sourcesFolder.forEach((sourcesFolderPath) => {
        filePath = filePath.replace(sourcesFolderPath, '');
        if (filePath.slice(0,2) === '//') filePath = filePath.replace('//','');
      });

      if (extension !== 'js' && extension !== 'ts' && extension !== 'coffee') {
        assetsArray.push(`require("${__path.relative(`${__tmpDir()}/_squidAssetsImport.js`, file)}");`);
      } else {
        filePath = filePath.replace('.ts','.js').replace('.coffee','.js');
        entryObj[`${fileObj.outputFolder}/${filePath}`] = file;
      }

    });
  });

  __fs.writeFileSync(`${__tmpDir()}/_squidAssetsImport.js`, assetsArray.join('\n'));
  entryObj[__path.relative(`${__path.resolve(__dirname, '../../')}`, `${__tmpDir()}`) + '/_squidAssetsImportCompiled.js'] = `${__tmpDir()}/_squidAssetsImport.js`;
}

module.exports.raw = true;
