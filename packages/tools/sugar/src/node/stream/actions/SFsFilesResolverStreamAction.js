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
SFsFilesResolverStreamActionInterface.definition = {
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
    _a.interfaces = {
        this: SFsFilesResolverStreamActionInterface
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzRmlsZXNSZXNvbHZlclN0cmVhbUFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGc0ZpbGVzUmVzb2x2ZXJTdHJlYW1BY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBR2QsbUZBQTZEO0FBQzdELGdEQUEwQjtBQUMxQix1RUFBaUQ7QUFDakQsNENBQXNCO0FBQ3RCLHlFQUFtRDtBQUVuRCxnRUFBMEM7QUFDMUMsd0VBQWtEO0FBQ2xELHlFQUFtRDtBQUNuRCxpRkFBMkQ7QUFLM0QsTUFBTSxxQ0FBc0MsU0FBUSxvQkFBWTs7QUFDdkQsZ0RBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsc0JBQXNCO1FBQzVCLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDO0FBdUJKLHVCQUFTLE1BQU0sdUJBQXdCLFNBQVEsOEJBQXNCO1FBY25FOzs7Ozs7OztXQVFHO1FBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtZQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtnQkFDRSxJQUFJLEVBQUUsZUFBZTtnQkFDckIsRUFBRSxFQUFFLDhCQUE4QjtnQkFDbEMsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osYUFBYSxFQUFFLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQztnQkFDdkMsR0FBRyxFQUFFLE9BQU87YUFDYixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFDSixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSCxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsR0FBRyxFQUFFO1lBQzFCLFFBQVEsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDakQsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO2dCQUN4RCxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7Z0JBQ3hCLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztnQkFFMUIsSUFBSSxLQUFLLENBQUM7Z0JBQ1YsSUFBSSxTQUFTLENBQUMsS0FBSztvQkFDakIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzt3QkFDcEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLO3dCQUNqQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztnQkFFaEIsTUFBTSxHQUFHO29CQUNQLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO3dCQUMzQixJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQzdCLE9BQU87Z0NBQ0wsT0FBTyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNsQyxJQUFJLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ2hDLENBQUM7eUJBQ0g7d0JBQ0QsT0FBTzs0QkFDTCxPQUFPLEVBQUUseUJBQWlCLENBQUMsV0FBVyxDQUFDOzRCQUN2QyxJQUFJLEVBQUUscUJBQWEsQ0FBQyxXQUFXLENBQUM7eUJBQ2pDLENBQUM7b0JBQ0osQ0FBQyxDQUFDO2lCQUNILENBQUM7Z0JBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUMxQixpREFBaUQ7b0JBQ2pELDhEQUE4RDtvQkFDOUQsa0NBQWtDO29CQUNsQyxlQUFlO29CQUNmLDRJQUE0STtvQkFDNUksT0FBTztvQkFDUCxZQUFZO29CQUNaLElBQUk7b0JBRUosTUFBTSxJQUFJLEdBQUcsY0FBTTt5QkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksTUFBTSxFQUFFO3dCQUM3QixHQUFHLEVBQUUsUUFBUSxDQUFDLE9BQU8sSUFBSSxxQkFBYSxFQUFFO3dCQUN4QyxNQUFNLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTs0QkFDdkMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDO3dCQUN0QixDQUFDLENBQUM7cUJBQ0gsQ0FBQzt5QkFDRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTt3QkFDVCx1Q0FDSyxRQUFRLEtBQ1gsT0FBTyxFQUFFLENBQUMsRUFDVixJQUFJLEVBQUUsY0FBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUN6QyxRQUFRLEVBQUUsa0JBQWEsQ0FBQyxDQUFDLENBQUMsRUFDMUIsU0FBUyxFQUFFLG1CQUFXLENBQUMsQ0FBQyxDQUFDLElBQ3pCO29CQUNKLENBQUMsQ0FBQyxDQUFDO29CQUVMLDJCQUEyQjtvQkFDM0IsY0FBYyxHQUFHLENBQUMsR0FBRyxjQUFjLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFFOUMsMERBQTBEO29CQUMxRCx3QkFBd0I7b0JBQ3hCLDRCQUE0QjtvQkFDNUIsc0RBQXNEO29CQUN0RCw2Q0FBNkM7b0JBQzdDLDZCQUE2QjtvQkFDN0IsK0RBQStEO29CQUMvRCw4Q0FBOEM7b0JBQzlDLHlCQUF5QjtvQkFDekIsc0RBQXNEO29CQUN0RCwwQ0FBMEM7b0JBQzFDLFlBQVk7b0JBQ1osaUJBQWlCO29CQUNqQixvREFBb0Q7b0JBQ3BELHdDQUF3QztvQkFDeEMsVUFBVTtvQkFDVixVQUFVO29CQUNWLGtDQUFrQztvQkFDbEMsMkJBQTJCO29CQUMzQixzREFBc0Q7b0JBQ3RELDRDQUE0QztvQkFDNUMsdUJBQXVCO29CQUN2QixrRUFBa0U7b0JBQ2xFLFVBQVU7b0JBQ1YsZUFBZTtvQkFDZixnRUFBZ0U7b0JBQ2hFLFFBQVE7b0JBQ1IsTUFBTTtvQkFDTixNQUFNO2dCQUNSLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO29CQUMxQixNQUFNLElBQUksZ0JBQVEsQ0FDaEIsK0VBQStFLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNwRyxHQUFHLHFCQUFhLEVBQUUsR0FBRyxFQUNyQixFQUFFLENBQ0gsMkNBQTJDLENBQzdDLENBQUM7aUJBQ0g7Z0JBRUQsSUFBSSxRQUFRLENBQUMsR0FBRyxLQUFLLE9BQU8sRUFBRTtvQkFDNUIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsY0FBYyxDQUFDO29CQUNwRCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3BCO3FCQUFNO29CQUNMLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDakMsTUFBTSxLQUFLLEdBQUcsWUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzFDLGNBQWMsQ0FBQyxJQUFJLENBQ2pCLE1BQU0sQ0FBQyxNQUFNLENBQ1gsRUFBRSxrQ0FFRyxTQUFTLEtBQ1osS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQ25CLFFBQVEsa0NBQ0gsT0FBTyxLQUNWLEtBQUssRUFBRTtvQ0FDTCxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7b0NBQ2hCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztvQ0FDbEIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO29DQUNsQixTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7aUNBQzNCLE9BR04sQ0FDRixDQUFDO29CQUNKLENBQUMsQ0FBQyxDQUFDO29CQUNILE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDekI7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FDRjtJQTdLQzs7Ozs7Ozs7T0FRRztJQUNJLGFBQVUsR0FBRztRQUNsQixJQUFJLEVBQUUscUNBQXFDO0tBQzNDO1FBa0tGIn0=