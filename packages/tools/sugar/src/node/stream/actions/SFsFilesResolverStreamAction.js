"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SActionsStreamAction_1 = __importDefault(require("../SActionsStreamAction"));
const glob_1 = __importDefault(require("glob"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const SError_1 = __importDefault(require("../../error/SError"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
const extractGlob_1 = __importDefault(require("../../glob/extractGlob"));
const extractNoneGlob_1 = __importDefault(require("../../glob/extractNoneGlob"));
class SFsFilesResolverStreamActionInterface extends SInterface_1.default {
}
SFsFilesResolverStreamActionInterface.definitionObj = {
    input: {
        type: 'String|Array<String>',
        required: true
    }
};
module.exports = (_a = class SFindInFileStreamAction extends SActionsStreamAction_1.default {
        /**
         * @name            constructor
         * @type            Function
         * @constructor
         *
         * Constructor
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
            super(deepMerge_1.default({
                name: 'File resolver',
                id: 'SFsFilesResolverStreamAction',
                cache: false,
                ignoreFolders: ['__wip__', '__tests__'],
                out: 'array'
            }, settings));
        }
        /**
         * @name          run
         * @type          Function
         * @async
         *
         * Override the base class run method
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        run(streamObj, settings = {}) {
            settings = deepMerge_1.default(this._settings, settings);
            return super.run(streamObj, (resolve, reject, trigger) => {
                let filesPathesObj = [];
                const streamObjArray = [];
                let input;
                if (streamObj.input)
                    input = Array.isArray(streamObj.input)
                        ? streamObj.input
                        : [streamObj.input];
                let inputs = [];
                inputs = [
                    ...input.map((inputString) => {
                        if (inputString.includes(':')) {
                            return {
                                rootDir: inputString.split(':')[0],
                                glob: inputString.split(':')[1]
                            };
                        }
                        return {
                            rootDir: extractNoneGlob_1.default(inputString),
                            glob: extractGlob_1.default(inputString)
                        };
                    })
                ];
                inputs.forEach((inputObj) => {
                    // // check if the input path is a path or a glob
                    // if (!__isGlob(searchPath) && !__isPath(searchPath, true)) {
                    //   filesPathes.push(searchPath);
                    //   this.warn(
                    //     `One of the passed inputs is either not a valid glob pattern, either not a valid file path and will be treated as a simple String...`
                    //   );
                    //   return;
                    // }
                    const path = glob_1.default
                        .sync(inputObj.glob || '**/*', {
                        cwd: inputObj.rootDir || packageRoot_1.default(),
                        ignore: settings.ignoreFolders.map((f) => {
                            return `**/${f}/**`;
                        })
                    })
                        .map((p) => {
                        return Object.assign(Object.assign({}, inputObj), { relPath: p, path: path_1.default.resolve(inputObj.rootDir, p), finename: filename_1.default(p), extension: extension_1.default(p) });
                    });
                    // append to the filePathes
                    filesPathesObj = [...filesPathesObj, ...path];
                    // const reg = new RegExp(`\s?${searchPattern}\s?`, 'gm');
                    // path.forEach((p) => {
                    //   if (__isDirectory(p)) {
                    //     const filesPathArray = __glob.sync(`${p}/*.*`);
                    //     filesPathArray.forEach((filePath) => {
                    //       if (searchPattern) {
                    //         const content = __fs.readFileSync(filePath, 'utf8');
                    //         const matches = content.match(reg);
                    //         if (matches) {
                    //           if (filesPathes.indexOf(filePath) === -1)
                    //             filesPathes.push(filePath);
                    //         }
                    //       } else {
                    //         if (filesPathes.indexOf(filePath) === -1)
                    //           filesPathes.push(filePath);
                    //       }
                    //     });
                    //   } else if (!__isSymlink(p)) {
                    //     if (searchPattern) {
                    //       const content = __fs.readFileSync(p, 'utf8');
                    //       const matches = content.match(reg);
                    //       if (matches) {
                    //         if (filesPathes.indexOf(p) === -1) filesPathes.push(p);
                    //       }
                    //     } else {
                    //       if (filesPathes.indexOf(p) === -1) filesPathes.push(p);
                    //     }
                    //   }
                    // });
                });
                if (!filesPathesObj.length) {
                    throw new SError_1.default(`Sorry but your <primary>input</primary> streamObj property setted to "<cyan>${streamObj.input.replace(`${packageRoot_1.default()}/`, '')}</cyan>" does not resolve to any files...`);
                }
                if (settings.out !== 'array') {
                    streamObj[settings.out || 'files'] = filesPathesObj;
                    resolve(streamObj);
                }
                else {
                    filesPathesObj.forEach((pathObj) => {
                        const stats = fs_1.default.statSync(pathObj.path);
                        streamObjArray.push(Object.assign({}, Object.assign(Object.assign({}, streamObj), { input: pathObj.path, inputObj: Object.assign(Object.assign({}, pathObj), { stats: {
                                    size: stats.size,
                                    mtime: stats.mtime,
                                    ctime: stats.ctime,
                                    birthtime: stats.birthtime
                                } }) })));
                    });
                    resolve(streamObjArray);
                }
            });
        }
    },
    /**
     * @name            interface
     * @type             Object
     * @static
     *
     * Store the definition object that specify the streamObj required properties, types, etc...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.interface = SFsFilesResolverStreamActionInterface,
    _a);
