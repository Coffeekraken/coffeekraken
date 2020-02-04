const __path = require('path');
const __fs = require('fs');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __log = require('@coffeekraken/sugar/node/log/log');
const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');

class ConcatDependenciesVendorsPlugin {

  constructor(options) {
    this._options = {
      dependenciesExtensions: ['js'],
      vendorsExtensions: ['css'],
      outputFilePath: null,
      ...options
    };
  }

  apply(compiler) {

    if ( ! this._options.outputFilePath) {
      __log(`ConcatDependenciesVendorsPlugin: You must specify the "outputFilePath" options with an absolute file path where you want to output the grabed content...`, 'error');
      return;
    }

    compiler.hooks.done.tap('ConcatDependenciesVendorsPlugin', (stats) => {

      const contentArray = [];

      stats.compilation.fileDependencies.forEach((item, i) => {

        const extension = __getExtension(item);

        // check that the dependencie has to be processed
        if (this._options.dependenciesExtensions.indexOf(extension) !== -1) {

          // loop on the wanted vendors extensions to handle and check if a file exist
          this._options.vendorsExtensions.forEach((ext) => {

            const vendorFilePath = item.replace(`.${extension}`, `.${ext}`);
            if (__fs.existsSync(vendorFilePath)) {
              const data = __fs.readFileSync(vendorFilePath);
              contentArray.push(data);
            }

          });

        }

      });

      __fs.writeFileSync(this._options.outputFilePath, contentArray.join('\n'));

      __log(`ConcatDependenciesVendorsPlugin: The dependencies vendors have been concatenated into the file "${this._options.outputFilePath}" successfuly`, 'success');

    });

  }
}

module.exports = ConcatDependenciesVendorsPlugin;
