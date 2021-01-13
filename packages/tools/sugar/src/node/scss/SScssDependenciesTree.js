"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const sugar_1 = __importDefault(require("../config/sugar"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const absolute_1 = __importDefault(require("../path/absolute"));
const SCache_1 = __importDefault(require("../cache/SCache"));
const SScssFile_1 = __importDefault(require("./SScssFile"));
const cls = class SScssDependenciesTree extends SPromise_1.default {
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
        super(deepMerge_1.default({
            imports: true,
            uses: true,
            rootDir: sugar_1.default('storage.rootDir'),
            includePaths: sugar_1.default('scss.compile.includePaths')
        }, settings));
        this.tree = {
            files: {},
            tree: {}
        };
        // @ts-ignore
        if (!this._settings.id)
            this._settings.id = this.constructor.name;
        // @ts-ignore
        this._input = absolute_1.default(input, this._settings.rootDir);
        // @ts-ignore
        this._cache = new SCache_1.default(this._settings.id, {});
    }
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
    generate(settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this._settings, settings);
            // get the cache
            this._cachedValue = yield this._cache.get('dependenciesTree');
            // start parsing
            this.tree.tree = this._parseFileToFindDependencies(this._input);
            // console.log(this.tree);
            // // loop on each dependencies to generate the tree
            // dependencies.forEach(depFile => {
            // });
        });
    }
    _parseFileToFindDependencies(path) {
        let file = new SScssFile_1.default(path);
        console.log(file.dependencies);
        if (this._cachedValue && this._cachedValue[path]) {
        }
        // let tree = {
        //   [path]: file
        // };
        const depsArray = file.dependencies;
        depsArray.forEach((depFile) => { });
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
module.exports = cls;
//# sourceMappingURL=SScssDependenciesTree.js.map