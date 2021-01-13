import __SPromise from '../promise/SPromise';
import __sugarConfig from '../config/sugar';
import __deepMerge from '../object/deepMerge';
import __absolute from '../path/absolute';
import __resolveDependency from './utils/resolveDependency';
import __SCache from '../cache/SCache';
import __SFile from '../fs/SFile';
import __SScssFile from './SScssFile';
import __findImportStatements from './utils/findImportStatements';

/**
 * @name            SScssDependenciesTree
 * @namespace       sugar.node.scss
 * @type            Class
 * @extends         SPromise
 * @beta
 *
 * This class allows you to generate the dependencies tree from a certain scss file.
 * It includes optionally the imports and the uses in the tree.
 *
 * @param           {String}            input           The input file path from where you want to generate the dependency tree
 * @param           {ISScssDependenciesTreeSettings}        [settings={}]           Some settings to configure your tree
 *
 * @setting         {Boolean}           [imports=true]          Specify if you want to include the imports
 * @setting         {Boolean}           [uses=true]             Specify if you want to include the imports
 * @setting         {String}            [rootDir=config.storage.rootDir]            Specify the directory from where to resolve relative pathes
 * @setting         {Array<String>}     [includePaths=config.scss.compile.includePaths]     Specify the directories where to search for resolving dependencies
 *
 * @example         js
 * import SScssDependenciesTree from '@coffeekraken/sugar/node/scss/SScssDependenciesTree';
 * const dep = new SScssDependenciesTree('/my/cool/file.scss');
 * dep.generate();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

interface ISScssDependenciesTreeSettings {
  imports?: boolean;
  uses?: boolean;
  rootDir?: boolean;
}

interface ISScssDependenciesTreeDependency {}

interface ISScssDependenciesTreeCtor {
  new (input: String, settings?: ISScssDependenciesTreeSettings);
}
interface ISScssDependenciesTree {
  generate(settings?: ISScssDependenciesTreeSettings);
}

const cls: ISScssDependenciesTreeCtor = class SScssDependenciesTree
  extends __SPromise
  implements ISScssDependenciesTree {
  /**
   * @name        _input
   * @type        String
   * @private
   *
   * Store the input passed in the constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _input: string;

  /**
   * @name        _cache
   * @type        SCache
   * @private
   *
   * Store the SCache instance used
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _cache: __SCache;

  /**
   * @name      _cachedValue
   * @type      Object
   * @private
   *
   * Store the cached dependencies
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _cachedValue: any;

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(input, settings = {}) {
    super(
      __deepMerge(
        {
          imports: true,
          uses: true,
          rootDir: __sugarConfig('storage.rootDir'),
          includePaths: __sugarConfig('scss.compile.includePaths')
        },
        settings
      )
    );
    // @ts-ignore
    if (!this._settings.id) this._settings.id = this.constructor.name;

    // @ts-ignore
    this._input = __absolute(input, this._settings.rootDir);

    // @ts-ignore
    this._cache = new __SCache(this._settings.id, {});
  }

  tree = {
    files: {},
    tree: {}
  };

  /**
   * @name        generate
   * @type        Function
   * @async
   *
   * Generate the dependencies tree and return it
   *
   * @param     {ISScssDependenciesTreeSettings}      [settings={}]     Some settings to override the base settings
   * @return    {Object<ISScssDependenciesTreeDependency}               An object of all the files dependencies
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async generate(settings = {}) {
    settings = __deepMerge(this._settings, settings);

    // get the cache
    this._cachedValue = await this._cache.get('dependenciesTree');

    // start parsing
    this.tree.tree = this._parseFileToFindDependencies(this._input);

    // console.log(this.tree);

    // // loop on each dependencies to generate the tree
    // dependencies.forEach(depFile => {

    // });
  }

  _parseFileToFindDependencies(path) {
    let file = new __SScssFile(path);

    console.log(file.dependencies);

    if (this._cachedValue && this._cachedValue[path]) {
    }

    // let tree = {
    //   [path]: file
    // };

    const depsArray = file.dependencies;

    depsArray.forEach((depFile) => {});

    // // read the file
    // const content = file.readSync();

    // // find dependencies
    // let deps: any = __findImportStatements(content);

    // // loop on deps
    // deps = deps
    //   .map((dep) => {
    //     const file = __resolveDependency(dep.path, {
    //       from: path
    //     });
    //     if (file) {
    //       // @ts-ignore
    //       file.scss = {
    //         type: dep.type
    //       };
    //     }
    //     return file;
    //   })
    //   .filter((p) => p !== undefined)
    //   .forEach((depFile) => {
    //     if (!this.tree.files[depFile.path]) {
    //       this.tree.files[depFile.path] = depFile;
    //     }

    //     // depObj[depFile.path] = {
    //     //   type: depFile.type
    //     // };

    //     tree[path][depFile.path] = depFile;

    //     // recursively find deps
    //     const depsTree = this._parseFileToFindDependencies(depFile.path);

    //     tree = __deepMerge(tree, depsTree);
    //   });

    // // return the dependencies
    // return tree;

    return {};
  }
};

export = cls;
