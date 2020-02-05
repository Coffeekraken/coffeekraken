const __fs = require('fs');
const __fsExtra = require('fs-extra');
const __path = require('path');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __log = require('@coffeekraken/sugar/node/log/log');
const __base64 = require('@coffeekraken/sugar/node/crypt/base64');
const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');

const __imagemin = require('imagemin');
const __imagemin_mozjpeg = require('imagemin-mozjpeg');
const __imagemin_svgo = require('imagemin-svgo');
const __imagemin_gifsicle = require('imagemin-gifsicle');
const __imagemin_pngquant = require('imagemin-pngquant');
const __imagemin_webp = require('imagemin-webp');

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

function __callback(content, resource, mimeTime, cb) {

  // save the file in the cache directory
  __fsExtra.outputFile(`${__tmpDir()}/_webpackBuildSpeedOptimizationLoader/${resource.slice(1).split('/').join('-')}`, content);

  // save the
  updatedTimestamps[resource] = mimeTime;

  // call the callback
  cb(null, content);

  clearTimeout(idxInterval);
  idxInterval = setTimeout(() => {
    __fs.writeFileSync(`${__tmpDir()}/_webpackBuildSpeedOptimizationLoader.json`, JSON.stringify(updatedTimestamps));
  }, 500);

}

async function __optimizeImage(resource, source, options) {
  switch(__getExtension(resource)) {
    case 'jpg':
      return await __imagemin.buffer(source, {
        plugins: [__imagemin_mozjpeg({
          ...options.jpg
        })]
      });
    break;
  }
}

module.exports = async function loader(source) {
  this.cacheable && this.cacheable();

  const callback = this.async();
  const extension = __getExtension(this.resource);
  const _this = this;
  let options = getOptions(this);

  // prepare default options
  options = __deepMerge({
    bypassOnDebug: false,
    babel: {
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
      ],
      presets: ['@babel/preset-env']
    },
    file: {
      extensions: ['jpg','png']
    },
    jpg: {
      quality: 1
    },
    svg: {},
    gif: {
      optimizationLevel: 3
    },
    png: {
      quality: [0.5, 0.7]
    },
    webp: {
      quality: 70
    }
  }, options);

  if ((this.debug === true && options.bypassOnDebug === true) || options.disable === true) {
    // Bypass processing while on watch mode
    return callback(null, content);
  } else {

    const stats = __fs.statSync(this.resource);
    const mimeTime = stats.mtime;

    // if (updatedTimestamps[this.resource]) {
    //
    //   if (updatedTimestamps[this.resource].localeCompare(mimeTime)) {
    //     if (__fs.existsSync(`${__tmpDir()}/_webpackBuildSpeedOptimizationLoader/${this.resource.slice(1).split('/').join('-')}`)) {
    //       return callback(null, __fs.readFileSync(`${__tmpDir()}/_webpackBuildSpeedOptimizationLoader/${this.resource.slice(1).split('/').join('-')}`));
    //     }
    //     return callback(null, source);
    //   }
    // }

    const promises = [];

    switch(extension) {
      case 'jpg':
      case 'jpeg':
        if ( ! options.jpg) return callback(null, source);

        source = await __optimizeImage(this.resource, source, options);

      break;
      // case 'svg':
      //   if ( ! options.svg) return callback(null, source);
      //   __imagemin.buffer(source, {
      //     plugins: [__imagemin_svgo({
      //       ...options.svg
      //     })]
      //   }).then(data => { __callback(data, this.resource, mimeTime, callback); }).catch(err => { callback(err); });
      // break;
      // case 'png':
      //   if ( ! options.png) return callback(null, source);
      //   __imagemin.buffer(source, {
      //     plugins: [__imagemin_pngquant({
      //       ...options.png
      //     })]
      //   }).then(data => { __callback(data, this.resource, mimeTime, callback); }).catch(err => { callback(err); });
      // break;
      // case 'webp':
      //   if ( ! options.webp) return callback(null, source);
      //   __imagemin.buffer(source, {
      //     plugins: [__imagemin_webp({
      //       ...options.webp
      //     })]
      //   }).then(data => { __callback(data, this.resource, mimeTime, callback); }).catch(err => { callback(err); });
      // break;
      // case 'gif':
      //   if ( ! options.gif) return callback(null, source);
      //   __imagemin.buffer(source, {
      //     plugins: [__imagemin_gifsicle({
      //       ...options.gif || options.gif
      //     })]
      //   })
      //   .then(data => { __callback(data, this.resource, mimeTime, callback); }).catch(err => { callback(err); });
      //   return;
      // break;
      case 'js':
      default:

        console.log('JS');
        // process babel
        source = __babel.transformSync(source, options.babel).code;

        // __callback(resultingCode, this.resource, mimeTime, callback)
      break;
    }

    // Promise.all(promises).then((result) => {
    //
    //
    //
    //   console.log('re', result);
    // });

    switch(true) {
      case (options.file.extensions.indexOf(extension) !== -1):
        const copy = Object.assign({}, this);
        copy.query = options.file;
        delete copy.query.extensions;
        source = __fileLoader.call(copy, source);
      break;
    }

    callback(null, source);

  }

}
module.exports.raw = true;
