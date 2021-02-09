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
Object.defineProperty(exports, "__esModule", { value: true });
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SDocblock_1 = __importDefault(require("../docblock/SDocblock"));
const removeSync_1 = __importDefault(require("../fs/removeSync"));
const filename_1 = __importDefault(require("../fs/filename"));
const SGlob_1 = __importDefault(require("../glob/SGlob"));
const SClass_1 = __importDefault(require("../class/SClass"));
const SDocMapSettingsInterface_1 = __importDefault(require("./interface/SDocMapSettingsInterface"));
const wait_1 = __importDefault(require("../time/wait"));
const clone_1 = __importDefault(require("../object/clone"));
const writeFileSync_1 = __importDefault(require("../fs/writeFileSync"));
class SDocMap extends SClass_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        super(deepMerge_1.default({
            id: 'SDocMap',
            docMap: {}
        }, settings || {}));
        /**
         * @name          _entries
         * @type           ISDocMapEntries
         * @private
         *
         * This store the docMap.json entries
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._entries = {};
    }
    /**
     * @name        docMapSettings
     * @type        Object
     * @get
     *
     * Access the docMap settings
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get docMapSettings() {
        return this._settings.docMap;
    }
    /**
     * @name          find
     * @type          Function
     *
     * This static method allows you to search for docMap.json files and get back the array of pathes where to
     * find the found files
     *
     * @todo      update documentation
     *
     * @param       {Object}        [settings={}]       A settings object to override the instance level ones
     * @return      {SPromise}                          An SPromise instance that will be resolved once the docMap.json file(s) have been correctly read
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    find(settings) {
        const findSettings = (deepMerge_1.default(this.docMapSettings.find, settings || {}));
        return new SPromise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            // build the glob pattern to use
            const patterns = findSettings.globs || [];
            let files = [];
            yield wait_1.default(1);
            const searchStrArray = ['Searching docMaps using globs:'];
            patterns.forEach((pat) => {
                searchStrArray.push(`- <yellow>${pat}</yellow>`);
            });
            emit('log', {
                value: searchStrArray.join('\n')
            });
            for (let i = 0; i < patterns.length; i++) {
                const foundedFiles = (yield SGlob_1.default.resolve(patterns[i]));
                files = [...files, ...foundedFiles];
            }
            const findedStrArray = [
                `Found <yellow>${files.length}</yellow> docMap file(s):`
            ];
            files.forEach((file) => {
                findedStrArray.push(`- <cyan>${file.relPath}</cyan>`);
            });
            emit('log', {
                value: findedStrArray.join('\n')
            });
            resolve(files);
        }), {
            id: this.id + '.find'
        });
    }
    /**
     * @name          read
     * @type          Function
     *
     * This static method allows you to search for docMap.json files and read them to get
     * back the content of them in one call. It can take advantage of the cache if
     * the setting.cache property is setted to true
     *
     * @todo      update documentation
     * @todo      integrate the "cache" feature
     *
     * @param       {Object}        [settings={}]       A settings object to override the instance level ones
     * @return      {SPromise}                          An SPromise instance that will be resolved once the docMap.json file(s) have been correctly read
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    read(settings) {
        return new SPromise_1.default(({ resolve, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const filesPromise = this.find(settings);
            pipe(filesPromise);
            const files = yield filesPromise;
            let docMapJson = {};
            // loop on all files
            files.forEach((file) => {
                const content = JSON.parse(fs_1.default.readFileSync(file.path, 'utf8'));
                Object.keys(content).forEach((docMapItemKey) => {
                    content[docMapItemKey].path = path_1.default.resolve(file.path.split('/').slice(0, -1).join('/'), content[docMapItemKey].relPath);
                });
                docMapJson = Object.assign(Object.assign({}, docMapJson), content);
            });
            // return the final docmap
            resolve(docMapJson);
        }), {
            id: this.id + '.read'
        });
    }
    /**
     * @name          build
     * @type          Function
     *
     * This method allows you to specify one or more glob patterns to scan files for "@namespace" docblock tags
     * and extract all the necessary informations to build the docMap.json file
     *
     * @param         {String|Array<String>}          sources         The glob pattern(s) you want to scan files in
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    build(settings) {
        const buildSettings = (deepMerge_1.default(this.docMapSettings.build, settings));
        return new SPromise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            let globs = buildSettings.globs || [];
            if (!Array.isArray(globs))
                globs = [globs];
            emit('log', {
                value: `Searching files to use as docMap sources using globs:\n- <yellow>${globs.join('</yellow>\n- ')}</yellow>`
            });
            for (let i = 0; i < globs.length; i++) {
                const glob = globs[i];
                // scan for files
                let files = yield SGlob_1.default.resolve(glob, {});
                files = files.filter((file) => {
                    if (!buildSettings.exclude || buildSettings.exclude === undefined)
                        return true;
                    return !file.path.match(buildSettings.exclude.path);
                });
                emit('log', {
                    value: `<yellow>${files.length}</yellow> file(s) found using the glob "<cyan>${glob}</cyan>"`
                });
                // loop on each files to check for docblocks
                for (let j = 0; j < files.length; j++) {
                    const filepath = files[j].path;
                    const content = fs_1.default.readFileSync(filepath, 'utf8');
                    if (!content)
                        continue;
                    const docblocks = new SDocblock_1.default(content).toObject();
                    if (!docblocks || !docblocks.length)
                        continue;
                    let docblockObj = {};
                    const children = {};
                    docblocks.forEach((docblock) => {
                        for (let i = 0; 
                        // @todo    {Clean}   remove ts-ignore
                        // @ts-ignore
                        i < Object.keys(buildSettings.exclude).length; i++) {
                            const excludeReg = 
                            // @todo    {Clean}   remove ts-ignore
                            // @ts-ignore
                            buildSettings.exclude[Object.keys(buildSettings.exclude)[i]];
                            // @todo    {Clean}   remove ts-ignore
                            // @ts-ignore
                            const value = docblock[Object.keys(buildSettings.exclude)[i]];
                            if (value === undefined)
                                continue;
                            if (value.match(excludeReg))
                                return;
                        }
                        if (docblock.name && docblock.name.slice(0, 1) === '_')
                            return;
                        if (docblock.private)
                            return;
                        // const path = __path.relative(outputDir, filepath);
                        const filename = filename_1.default(filepath);
                        let docblockEntryObj = {
                            name: docblock.name,
                            type: docblock.type,
                            description: docblock.description
                        };
                        if (docblock.namespace)
                            docblockEntryObj.namespace = docblock.namespace;
                        if (docblock.extends)
                            docblockEntryObj.extends = docblock.extends;
                        if (docblock.status)
                            docblockEntryObj.status = docblock.status;
                        if (docblock.static)
                            docblockEntryObj.static = true;
                        if (docblock.since)
                            docblockEntryObj.since = docblock.since;
                        if (docblock.namespace) {
                            docblockObj = Object.assign(Object.assign({}, docblockEntryObj), { __fullPath: filepath, // this property will be used in the save method to generate the correct pathes relative to this
                                filename, extension: filename.split('.').slice(1)[0], path: path_1.default.relative(packageRoot_1.default(), filepath), directory: path_1.default
                                    .relative(packageRoot_1.default(), filepath)
                                    .replace(`/${filename_1.default(filepath)}`, '') });
                            this._entries[`${docblock.namespace}.${docblock.name}`] = docblockObj;
                        }
                        else {
                            children[docblock.name] = docblockEntryObj;
                        }
                    });
                    docblockObj.children = children;
                }
            }
            emit('log', {
                value: `<green>${Object.keys(this._entries).length}</green> entries gathered for this docMap`
            });
            resolve(this._entries);
        }), {
            id: this.id + '.build'
        });
    }
    /**
     * @name              save
     * @type              Function
     *
     * This method save the docMap.json file in the outputDir setted in the settings.
     * You can specify an output path as parameter to use this instead of the instance level settings.
     *
     * @param         {String}            [output=null]           A full output file path where to save the file
     * @return        {SPromise}                                  An SPromise instance resolved once the file has been saved
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    save(outputOrSettings, settings) {
        let output, saveSettings;
        if (typeof outputOrSettings === 'string') {
            output = outputOrSettings;
            saveSettings = this.docMapSettings.save;
        }
        else {
            saveSettings = (deepMerge_1.default(this.docMapSettings.save, outputOrSettings));
            output = saveSettings.path;
        }
        const outputDir = output.replace(`/${filename_1.default(output)}`, '');
        return new SPromise_1.default(({ resolve, emit, pipe, pipeFrom }) => {
            let entries = clone_1.default(this._entries, { deep: true });
            emit('log', {
                value: `Saving the docMap file to "<cyan>${output.replace(`${packageRoot_1.default()}/`, '')}</cyan>"`
            });
            // add relPath and directory property depending on the output
            Object.keys(entries).forEach((namespace) => {
                const obj = entries[namespace];
                // @ts-ignore
                const relPath = path_1.default.relative(outputDir, obj.__fullPath);
                const relDirectory = relPath.replace(`/${filename_1.default(relPath)}`, '');
                obj.relPath = relPath;
                obj.relDirectory = relDirectory;
                // @ts-ignore
                delete obj.__fullPath;
            });
            removeSync_1.default(output);
            writeFileSync_1.default(output, JSON.stringify(entries, null, 4));
            emit('log', {
                value: `<green>[save]</green> DocMap file "<yellow>${filename_1.default(output)}</yellow>" <green>saved successfully</green> under "<cyan>${output}</cyan>"`
            });
            resolve(entries);
        }, {
            id: this.id + '.save'
        });
    }
}
SDocMap.interfaces = {
    settings: {
        apply: true,
        on: '_settings.docMap',
        class: SDocMapSettingsInterface_1.default
    }
};
exports.default = SDocMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtRUFBNkM7QUFDN0Msb0VBQThDO0FBQzlDLHNFQUFnRDtBQUVoRCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLHNFQUFnRDtBQUVoRCxrRUFBNEM7QUFDNUMsOERBQTJDO0FBRTNDLDBEQUFvQztBQUNwQyw2REFBdUM7QUFFdkMsb0dBQThFO0FBQzlFLHdEQUFrQztBQUVsQyw0REFBc0M7QUFDdEMsd0VBQWtEO0FBa0ZsRCxNQUFNLE9BQVEsU0FBUSxnQkFBUTtJQW1DNUI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUE4QjtRQUN4QyxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxTQUFTO1lBQ2IsTUFBTSxFQUFFLEVBQUU7U0FDWCxFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBN0NKOzs7Ozs7Ozs7V0FTRztRQUNILGFBQVEsR0FBb0IsRUFBRSxDQUFDO0lBb0MvQixDQUFDO0lBbENEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksY0FBYztRQUNoQixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsTUFBTSxDQUFDO0lBQ3RDLENBQUM7SUF3QkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxJQUFJLENBQUMsUUFBd0M7UUFDM0MsTUFBTSxZQUFZLEdBQXlCLENBQ3pDLG1CQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUN0RCxDQUFDO1FBRUYsT0FBTyxJQUFJLGtCQUFVLENBQ25CLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDbEMsZ0NBQWdDO1lBQ2hDLE1BQU0sUUFBUSxHQUFhLFlBQVksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1lBRXBELElBQUksS0FBSyxHQUFjLEVBQUUsQ0FBQztZQUMxQixNQUFNLGNBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVoQixNQUFNLGNBQWMsR0FBYSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDcEUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN2QixjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2pDLENBQUMsQ0FBQztZQUVILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QyxNQUFNLFlBQVksR0FBbUIsQ0FDbkMsTUFBTSxlQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNuQyxDQUFDO2dCQUNGLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLEdBQUcsWUFBWSxDQUFDLENBQUM7YUFDckM7WUFFRCxNQUFNLGNBQWMsR0FBYTtnQkFDL0IsaUJBQWlCLEtBQUssQ0FBQyxNQUFNLDJCQUEyQjthQUN6RCxDQUFDO1lBQ0YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNyQixjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNqQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFBLEVBQ0Q7WUFDRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPO1NBQ3RCLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILElBQUksQ0FBQyxRQUF1QztRQUMxQyxPQUFPLElBQUksa0JBQVUsQ0FDbkIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzFCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25CLE1BQU0sS0FBSyxHQUFHLE1BQU0sWUFBWSxDQUFDO1lBRWpDLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUVwQixvQkFBb0I7WUFDcEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNyQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUVqRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO29CQUM3QyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQzNDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQy9CLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7Z0JBRUgsVUFBVSxtQ0FDTCxVQUFVLEdBQ1YsT0FBTyxDQUNYLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztZQUVILDBCQUEwQjtZQUMxQixPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFBLEVBQ0Q7WUFDRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPO1NBQ3RCLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxLQUFLLENBQUMsUUFBd0M7UUFDNUMsTUFBTSxhQUFhLEdBQTBCLENBQzNDLG1CQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQ2pELENBQUM7UUFDRixPQUFPLElBQUksa0JBQVUsQ0FDbkIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNsQyxJQUFJLEtBQUssR0FBYSxhQUFhLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQUUsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFM0MsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEVBQUUsb0VBQW9FLEtBQUssQ0FBQyxJQUFJLENBQ25GLGVBQWUsQ0FDaEIsV0FBVzthQUNiLENBQUMsQ0FBQztZQUVILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXRCLGlCQUFpQjtnQkFDakIsSUFBSSxLQUFLLEdBQUcsTUFBTSxlQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDNUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLElBQUksYUFBYSxDQUFDLE9BQU8sS0FBSyxTQUFTO3dCQUMvRCxPQUFPLElBQUksQ0FBQztvQkFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEQsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEVBQUUsV0FBVyxLQUFLLENBQUMsTUFBTSxpREFBaUQsSUFBSSxVQUFVO2lCQUM5RixDQUFDLENBQUM7Z0JBRUgsNENBQTRDO2dCQUM1QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDckMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDL0IsTUFBTSxPQUFPLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBRXBELElBQUksQ0FBQyxPQUFPO3dCQUFFLFNBQVM7b0JBRXZCLE1BQU0sU0FBUyxHQUFHLElBQUksbUJBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFFdEQsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNO3dCQUFFLFNBQVM7b0JBRTlDLElBQUksV0FBVyxHQUFRLEVBQUUsQ0FBQztvQkFDMUIsTUFBTSxRQUFRLEdBQVEsRUFBRSxDQUFDO29CQUV6QixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQzdCLEtBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQzt3QkFDVCxzQ0FBc0M7d0JBQ3RDLGFBQWE7d0JBQ2IsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFDN0MsQ0FBQyxFQUFFLEVBQ0g7NEJBQ0EsTUFBTSxVQUFVOzRCQUNkLHNDQUFzQzs0QkFDdEMsYUFBYTs0QkFDYixhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQy9ELHNDQUFzQzs0QkFDdEMsYUFBYTs0QkFDYixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDOUQsSUFBSSxLQUFLLEtBQUssU0FBUztnQ0FBRSxTQUFTOzRCQUNsQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2dDQUFFLE9BQU87eUJBQ3JDO3dCQUVELElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRzs0QkFBRSxPQUFPO3dCQUMvRCxJQUFJLFFBQVEsQ0FBQyxPQUFPOzRCQUFFLE9BQU87d0JBRTdCLHFEQUFxRDt3QkFDckQsTUFBTSxRQUFRLEdBQUcsa0JBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDekMsSUFBSSxnQkFBZ0IsR0FBa0I7NEJBQ3BDLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTs0QkFDbkIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJOzRCQUNuQixXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVc7eUJBQ2xDLENBQUM7d0JBQ0YsSUFBSSxRQUFRLENBQUMsU0FBUzs0QkFDcEIsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7d0JBQ2xELElBQUksUUFBUSxDQUFDLE9BQU87NEJBQUUsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7d0JBQ2xFLElBQUksUUFBUSxDQUFDLE1BQU07NEJBQUUsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7d0JBQy9ELElBQUksUUFBUSxDQUFDLE1BQU07NEJBQUUsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzt3QkFDcEQsSUFBSSxRQUFRLENBQUMsS0FBSzs0QkFBRSxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQzt3QkFFNUQsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFOzRCQUN0QixXQUFXLG1DQUNOLGdCQUFnQixLQUNuQixVQUFVLEVBQUUsUUFBUSxFQUFFLGdHQUFnRztnQ0FDdEgsUUFBUSxFQUNSLFNBQVMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDMUMsSUFBSSxFQUFFLGNBQU0sQ0FBQyxRQUFRLENBQUMscUJBQWEsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUNoRCxTQUFTLEVBQUUsY0FBTTtxQ0FDZCxRQUFRLENBQUMscUJBQWEsRUFBRSxFQUFFLFFBQVEsQ0FBQztxQ0FDbkMsT0FBTyxDQUFDLElBQUksa0JBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUc5QyxDQUFDOzRCQUNGLElBQUksQ0FBQyxRQUFRLENBQ1gsR0FBRyxRQUFRLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FDekMsR0FBRyxXQUFXLENBQUM7eUJBQ2pCOzZCQUFNOzRCQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7eUJBQzVDO29CQUNILENBQUMsQ0FBQyxDQUFDO29CQUNILFdBQVcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2lCQUNqQzthQUNGO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEVBQUUsVUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUM3QiwyQ0FBMkM7YUFDNUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUEsRUFDRDtZQUNFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLFFBQVE7U0FDdkIsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILElBQUksQ0FDRixnQkFBd0QsRUFDeEQsUUFBd0M7UUFFeEMsSUFBSSxNQUFNLEVBQUUsWUFBa0MsQ0FBQztRQUMvQyxJQUFJLE9BQU8sZ0JBQWdCLEtBQUssUUFBUSxFQUFFO1lBQ3hDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztZQUMxQixZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7U0FDekM7YUFBTTtZQUNMLFlBQVksR0FBeUIsQ0FDbkMsbUJBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUN4RCxDQUFDO1lBQ0YsTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7U0FDNUI7UUFFRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksa0JBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWxFLE9BQU8sSUFBSSxrQkFBVSxDQUNuQixDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUNwQyxJQUFJLE9BQU8sR0FBb0IsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUV0RSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRSxvQ0FBb0MsTUFBTSxDQUFDLE9BQU8sQ0FDdkQsR0FBRyxxQkFBYSxFQUFFLEdBQUcsRUFDckIsRUFBRSxDQUNILFVBQVU7YUFDWixDQUFDLENBQUM7WUFFSCw2REFBNkQ7WUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDekMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMvQixhQUFhO2dCQUNiLE1BQU0sT0FBTyxHQUFHLGNBQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDM0QsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FDbEMsSUFBSSxrQkFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQzVCLEVBQUUsQ0FDSCxDQUFDO2dCQUNGLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN0QixHQUFHLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztnQkFDaEMsYUFBYTtnQkFDYixPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxvQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JCLHVCQUFlLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTFELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLDhDQUE4QyxrQkFBYSxDQUNoRSxNQUFNLENBQ1AsNkRBQTZELE1BQU0sVUFBVTthQUMvRSxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxFQUNEO1lBQ0UsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTztTQUN0QixDQUNGLENBQUM7SUFDSixDQUFDOztBQW5YTSxrQkFBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLEtBQUssRUFBRSxJQUFJO1FBQ1gsRUFBRSxFQUFFLGtCQUFrQjtRQUN0QixLQUFLLEVBQUUsa0NBQTBCO0tBQ2xDO0NBQ0YsQ0FBQztBQWdYSixrQkFBZSxPQUFPLENBQUMifQ==