const __path = require('path');
const __fs = require('fs');
const __processFile = require('../processFile');

class CoffeeBuilderPlugin {

  // constructor() {
  // }

  apply(compiler) {
    compiler.hooks.done.tap('CoffeeBuilderPlugin', async stats => {

      // loop on all the compiled assets
      const assetsKeys = Object.keys(stats.compilation.assets);
      for (let i=0; i<assetsKeys.length; i++) {

        const assetObj = stats.compilation.assets[assetsKeys[i]];

        const source = __fs.readFileSync(assetObj.existsAt, 'utf8');
        // console.log(assetObj.existsAt, source);

        // await __processFile()


      }

    });
  }
}

module.exports = CoffeeBuilderPlugin;
