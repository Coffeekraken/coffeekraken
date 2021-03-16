"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
SFsFilesResolverStreamActionInterface.definition = {
    input: {
        type: 'String|Array<String>',
        required: true
    }
};
/**
 * @name            SFindInFileStreamAction
 * @namespace       node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @status              beta
 *
 * This class is a stream action that allows you search inside files for a certain string/pattern
 * And get back the list of founded files.
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFindInFileStreamAction extends SActionsStreamAction_1.default {
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
        return super.run(streamObj, ({ resolve, reject, emit }) => {
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
}
exports.default = SFindInFileStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SFindInFileStreamAction.interfaces = {
    this: SFsFilesResolverStreamActionInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzRmlsZXNSZXNvbHZlclN0cmVhbUFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL3N0cmVhbS9hY3Rpb25zL1NGc0ZpbGVzUmVzb2x2ZXJTdHJlYW1BY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBR2QsbUZBQTZEO0FBQzdELGdEQUEwQjtBQUMxQix1RUFBaUQ7QUFDakQsNENBQXNCO0FBQ3RCLHlFQUFtRDtBQUVuRCxnRUFBMEM7QUFDMUMsd0VBQWtEO0FBQ2xELHlFQUFtRDtBQUNuRCxpRkFBMkQ7QUFLM0QsTUFBTSxxQ0FBc0MsU0FBUSxvQkFBWTs7QUFDdkQsZ0RBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsc0JBQXNCO1FBQzVCLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDO0FBR0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFxQix1QkFBd0IsU0FBUSw4QkFBc0I7SUFjekU7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsSUFBSSxFQUFFLGVBQWU7WUFDckIsRUFBRSxFQUFFLDhCQUE4QjtZQUNsQyxLQUFLLEVBQUUsS0FBSztZQUNaLGFBQWEsRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7WUFDdkMsR0FBRyxFQUFFLE9BQU87U0FDYixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzFCLFFBQVEsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakQsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3hELElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztZQUN4QixNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7WUFFMUIsSUFBSSxLQUFLLENBQUM7WUFDVixJQUFJLFNBQVMsQ0FBQyxLQUFLO2dCQUNqQixLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO29CQUNwQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUs7b0JBQ2pCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFFaEIsTUFBTSxHQUFHO2dCQUNQLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO29CQUMzQixJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQzdCLE9BQU87NEJBQ0wsT0FBTyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNsQyxJQUFJLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ2hDLENBQUM7cUJBQ0g7b0JBQ0QsT0FBTzt3QkFDTCxPQUFPLEVBQUUseUJBQWlCLENBQUMsV0FBVyxDQUFDO3dCQUN2QyxJQUFJLEVBQUUscUJBQWEsQ0FBQyxXQUFXLENBQUM7cUJBQ2pDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDO2FBQ0gsQ0FBQztZQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDMUIsaURBQWlEO2dCQUNqRCw4REFBOEQ7Z0JBQzlELGtDQUFrQztnQkFDbEMsZUFBZTtnQkFDZiw0SUFBNEk7Z0JBQzVJLE9BQU87Z0JBQ1AsWUFBWTtnQkFDWixJQUFJO2dCQUVKLE1BQU0sSUFBSSxHQUFHLGNBQU07cUJBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtvQkFDN0IsR0FBRyxFQUFFLFFBQVEsQ0FBQyxPQUFPLElBQUkscUJBQWEsRUFBRTtvQkFDeEMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7d0JBQ3ZDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDdEIsQ0FBQyxDQUFDO2lCQUNILENBQUM7cUJBQ0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ1QsdUNBQ0ssUUFBUSxLQUNYLE9BQU8sRUFBRSxDQUFDLEVBQ1YsSUFBSSxFQUFFLGNBQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFDekMsUUFBUSxFQUFFLGtCQUFhLENBQUMsQ0FBQyxDQUFDLEVBQzFCLFNBQVMsRUFBRSxtQkFBVyxDQUFDLENBQUMsQ0FBQyxJQUN6QjtnQkFDSixDQUFDLENBQUMsQ0FBQztnQkFFTCwyQkFBMkI7Z0JBQzNCLGNBQWMsR0FBRyxDQUFDLEdBQUcsY0FBYyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBRTlDLDBEQUEwRDtnQkFDMUQsd0JBQXdCO2dCQUN4Qiw0QkFBNEI7Z0JBQzVCLHNEQUFzRDtnQkFDdEQsNkNBQTZDO2dCQUM3Qyw2QkFBNkI7Z0JBQzdCLCtEQUErRDtnQkFDL0QsOENBQThDO2dCQUM5Qyx5QkFBeUI7Z0JBQ3pCLHNEQUFzRDtnQkFDdEQsMENBQTBDO2dCQUMxQyxZQUFZO2dCQUNaLGlCQUFpQjtnQkFDakIsb0RBQW9EO2dCQUNwRCx3Q0FBd0M7Z0JBQ3hDLFVBQVU7Z0JBQ1YsVUFBVTtnQkFDVixrQ0FBa0M7Z0JBQ2xDLDJCQUEyQjtnQkFDM0Isc0RBQXNEO2dCQUN0RCw0Q0FBNEM7Z0JBQzVDLHVCQUF1QjtnQkFDdkIsa0VBQWtFO2dCQUNsRSxVQUFVO2dCQUNWLGVBQWU7Z0JBQ2YsZ0VBQWdFO2dCQUNoRSxRQUFRO2dCQUNSLE1BQU07Z0JBQ04sTUFBTTtZQUNSLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7Z0JBQzFCLE1BQU0sSUFBSSxnQkFBUSxDQUNoQiwrRUFBK0UsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ3BHLEdBQUcscUJBQWEsRUFBRSxHQUFHLEVBQ3JCLEVBQUUsQ0FDSCwyQ0FBMkMsQ0FDN0MsQ0FBQzthQUNIO1lBRUQsSUFBSSxRQUFRLENBQUMsR0FBRyxLQUFLLE9BQU8sRUFBRTtnQkFDNUIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsY0FBYyxDQUFDO2dCQUNwRCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDcEI7aUJBQU07Z0JBQ0wsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUNqQyxNQUFNLEtBQUssR0FBRyxZQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDMUMsY0FBYyxDQUFDLElBQUksQ0FDakIsTUFBTSxDQUFDLE1BQU0sQ0FDWCxFQUFFLGtDQUVHLFNBQVMsS0FDWixLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksRUFDbkIsUUFBUSxrQ0FDSCxPQUFPLEtBQ1YsS0FBSyxFQUFFO2dDQUNMLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtnQ0FDaEIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO2dDQUNsQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7Z0NBQ2xCLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUzs2QkFDM0IsT0FHTixDQUNGLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztBQTdLSCwwQ0E4S0M7QUE3S0M7Ozs7Ozs7O0dBUUc7QUFDSSxrQ0FBVSxHQUFHO0lBQ2xCLElBQUksRUFBRSxxQ0FBcUM7Q0FDNUMsQ0FBQyJ9