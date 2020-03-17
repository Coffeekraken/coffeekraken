const __moduleAlias = require('module-alias');
const __webpack = require('webpack');
const __fs = require('fs');
const __path = require('path');
const __glob = require('glob');
const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __uniqid = require('@coffeekraken/sugar/js/string/uniqid');

/**
 * @name                                      CoffeeBuilderWebpack
 * @namespace                                 terminal.coffeebuilder.node.classes.CoffeeBuilderWebpack
 * @type                                      Class
 * 
 * This class encapsule the webpack logic and expose a simple api to use with the rest of the CoffeeBuilder environment
 * 
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class CoffeeBuilderWebpack {

  /**
   * @name                     constructor
   * @namespace                terminal.coffeebuilder.node.classes.CoffeeBuilderWebpack
   * @type                      Function
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor() {
    // handle the "webpack.config.js" file at the project root
    // if (__fs.existsSync(process.cwd() + '/webpack.config.js')) {
    //   this._coffeebuilder._config.vendors.webpack = __deepMerge(this._coffeebuilder._config.vendors.webpack, require(process.cwd() + '/webpack.config.js'));
    // }
  }

  /**
   * @name                        run
   * @namespace                   terminal.coffeebuilder.node.classes.CoffeeBuilderWebpack
   * @type                        Function
   *
   * Run the webpack build process
   *
   * @param           {Array}             [compile=null]            An array of which file types you want to compile
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(packageName = null, compile = null) {
    return new Promise((resolve, reject) => {

      this._packageName = packageName;
      this._packagePath = CoffeeBuilder.config.base.packages[packageName];
      this._compile = compile;

      if (this._packagePath && __fs.existsSync(`${process.cwd()}/${this._packagePath}/node_modules`)) {
        __moduleAlias.addPath(`${process.cwd()}/${this._packagePath}/node_modules`);
      }

      // check the needed configs in order to run the compilation properly
      if (Object.keys(this.config().entry).length === 0) {
        CoffeeBuilder.ui.changeLocation('error', {
          message: `It seems that your configuration return <red><bold>no files</bold></red> to compile at all for the package "<yellow><bold>${CoffeeBuilder.api.getCurrentPackageName()}</bold></yellow>"...`
        });
        return;
      }

      __webpack(this.config(), (err, stats) => {
        if (err || stats.hasErrors()) {
          console.log(stats);
        }
        // console.log(stats);
        // process finished
        resolve(stats);
      });
    });
  }

  /**
   * @name                        webpackConfig
   * @namespace                   terminal.coffeebuilder.node.classes.CoffeeBuilderWebpack
   * @type                        Function
   *
   * Return the webpack configuration object builded by coffeebuilder
   *
   * @return        {Object}                The webpack configuration object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  config() {

    const runConfig = CoffeeBuilder.config.current;
    const webpackConfig = Object.assign({}, runConfig.vendors.webpack);

    // context
    const packagePath = this._packagePath ? process.cwd() + '/' + this._packagePath : process.cwd();
    webpackConfig.context = packagePath;

    // modules
    if (this._packagePath) {
      webpackConfig.resolve.modules.push(__path.resolve(process.cwd(), this._packagePath, 'node_modules'));
    }
    webpackConfig.resolve.modules.push(__path.resolve(__dirname, '../../node_modules'));
    webpackConfig.resolve.modules.push(__path.resolve(process.cwd(), 'node_modules'));

    // aliases
    CoffeeBuilder._api.getPackagesPathes().forEach(pkgPath => {
      if (__fs.existsSync(`${process.cwd()}/${pkgPath}/package.json`)) {
        const packageJson = require(`${process.cwd()}/${pkgPath}/package.json`);
        const name = packageJson.name;
        webpackConfig.resolve.alias[name] = __path.resolve(process.cwd(), pkgPath);
      }
    });

    // output
    if (this._packagePath) {
      webpackConfig.output.path = __path.resolve(process.cwd(), this._packagePath);
    }

    // entry
    webpackConfig.entry = this._getEntry();

    // return the webpack configuration object
    return webpackConfig;

  }

  /**
   * @name                        _getEntry
   * @namespace                   terminal.coffeebuilder.node.classes.CoffeeBuilderWebpack
   * @type                        Function
   * @private
   *
   * Return the "entry" webpack configuration object builded by coffeebuilder
   *
   * @return                {Object}                The "entry" webpack object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _getEntry() {

    // the entry webpack object
    let entryObj = {};
    let entryString = '';

    let packagePath = '';
    if (this._packagePath) {
      packagePath = this._packagePath;
    }

    const runConfig = CoffeeBuilder.config.current;

    // loop on the "compile" option to know which file types we have to handle
    const fileTypesToCompile = this._compile || runConfig.compile;
    fileTypesToCompile.forEach((fileType) => {

      // get the file type options object
      const optionsObj = runConfig.resources[fileType] || {};

      // check the configuration object
      if (!optionsObj.sourcesFolders) {
        throw new Error(`You try to compile the <yellow>"${fileType}"</yellow> files but you don't have setted the <red>"config.${fileType}.sourcesFolder"</red> config...`);
      }
      if (!optionsObj.outputFolders) {
        throw new Error(`You try to compile the <yellow>"${fileType}"</yellow> files but you don't have setted the <red>"config.${fileType}.outputFolder"</red> config...`);
      }
      if (!optionsObj.sources) {
        throw new Error(`You try to compile the <yellow>"${fileType}"</yellow> files but you don't have setted the <red>"config.${fileType}.sources"</red> config...`);
      }

      const sourcesFolder = Array.isArray(optionsObj.sourcesFolders) ? optionsObj.sourcesFolders : [optionsObj.sourcesFolders];
      const outputFolder = Array.isArray(optionsObj.outputFolders) ? optionsObj.outputFolders : [optionsObj.outputFolders];

      // search for the files
      let files = [];
      sourcesFolder.forEach((folder) => {
        let searchPath = folder + '/' + optionsObj.sources;
        if (packagePath) {
          searchPath = `${packagePath}/${searchPath}`;
        }
        files = files.concat(__glob.sync(searchPath));
      });

      // process the founded files
      files.forEach((file, i) => {

        let entryKey = file;
        const ext = __getExtension(entryKey);
        entryKey = entryKey.replace(ext, optionsObj.saveExtension || ext);

        sourcesFolder.forEach((source) => {
          entryKey = entryKey.replace(source, '@outputFolder');
          if (entryKey.slice(0, 1) === '/') entryKey = entryKey.slice(1);
        });

        if (__getExtension(entryKey) === 'js') {
          outputFolder.forEach((folder) => {
            let key = entryKey.replace('@outputFolder', folder).replace(this._packagePath + '/', '');
            // key = key.replace('//', '/');
            // if ( ! entryKey.match(/\.js$/g)) return;
            entryObj[key] = process.cwd() + '/' + file;
            CoffeeBuilder.events.emit('entryPathes', process.cwd() + '/' + file);
          });
        } else {
          entryKey = entryKey.replace('//', '/');
          entryString += `import * as coffeebuilderImport${__uniqid()} from '${process.cwd() + '/' + file}';\n`;
          CoffeeBuilder.events.emit('entryPathes', process.cwd() + '/' + file);
        }

      });

    });

    if (entryString !== '') {

      const tmpDir = __tmpDir();
      __fs.writeFileSync(tmpDir + '/coffeebuilderImports.js', entryString);

      const relativePathToTmpDir = __path.relative(process.cwd(), tmpDir);
      entryObj[relativePathToTmpDir + '/coffeebuilderImportsBuilded.js'] = tmpDir + '/coffeebuilderImports.js';

    }

    // return the entry object
    return entryObj;

  }

}