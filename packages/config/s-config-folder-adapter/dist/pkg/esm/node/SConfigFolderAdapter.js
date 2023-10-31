// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SConfig from '@coffeekraken/s-config';
import __SConfigAdapter from '@coffeekraken/s-config-adapter';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import { __unique } from '@coffeekraken/sugar/array';
import { __sha256 } from '@coffeekraken/sugar/crypto';
import { __dirname, __readJsonSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __replaceTokens } from '@coffeekraken/sugar/token';
import __fs from 'fs';
import __path from 'path';
import { __pool } from '@coffeekraken/sugar/fs';
export default class SConfigFolderAdapter extends __SConfigAdapter {
    constructor(settings) {
        super(__deepMerge({
            fileName: '%name.config.js',
            folderName: '.sugar',
            scopes: {
                default: [__path.resolve(__dirname(), '../../config')],
                module: [],
                repo: [
                    `${__packageRootDir(process.cwd(), {
                        highest: true,
                    })}/%folderName`,
                ],
                package: [
                    `${__packageRootDir(process.cwd())}/%folderName`,
                ],
                user: [
                    `${__packageRootDir(process.cwd())}/.local/%folderName`,
                ],
            },
            savingScope: 'user',
        }, settings || {}));
        this._scopedSettings = {};
        this._scopedFoldersPaths = {};
        this._foldersPaths = [];
        this._hashes = {};
        // determine the running format (cjs|esm)
        try {
            if (module !== undefined)
                format = 'cjs';
        }
        catch (e) { }
        // handle each scopes
        Object.keys(this.settings.scopes).forEach((scope) => {
            let scopeFoldersPathArray = this.settings.scopes[scope];
            if (scopeFoldersPathArray) {
                if (!Array.isArray(scopeFoldersPathArray))
                    scopeFoldersPathArray = [scopeFoldersPathArray];
                scopeFoldersPathArray = scopeFoldersPathArray.map((path) => {
                    return __replaceTokens(path.replace('%folderName', this.settings.folderName));
                });
            }
            // append to the scoped folders path array
            this._scopedFoldersPaths[scope] = scopeFoldersPathArray;
        });
        let fullFoldersPaths = [];
        for (let [scope, folderPaths] of Object.entries(this._scopedFoldersPaths)) {
            fullFoldersPaths = [
                ...fullFoldersPaths,
                ...folderPaths.map((folderPath) => {
                    return `${folderPath}/${this.settings.fileName.replace('%name', '*')}`;
                }),
            ];
        }
        this._pool = __pool(fullFoldersPaths, {
            watch: true,
        });
        this._pool.on('ready', (files) => {
            this.ready();
        });
        this._pool.on('change', (file) => {
            this._hashes[file.path] = file.hash;
            this.update();
        });
    }
    integrity() {
        if (!Object.keys(this._hashes).length) {
            this._pool.files.forEach((file) => {
                this._hashes[file.path] = file.hash;
            });
        }
        const hashes = [];
        for (let [path, hash] of Object.entries(this._hashes)) {
            hashes.push(hash);
        }
        const hash = __sha256.encrypt(`${hashes.join('-')}`);
        return hash;
    }
    _load(folderPaths, env, configObj) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            folderPaths = __unique(folderPaths);
            for (let i = 0; i < folderPaths.length; i++) {
                const path = folderPaths[i];
                if (!__fs.existsSync(path))
                    continue;
                const paths = __fs.readdirSync(path);
                for (let j = 0; j < paths.length; j++) {
                    let file = paths[j], filePath = `${path}/${file}`, deleteAfterLoad = false;
                    const configId = filePath
                        .split('/')
                        .slice(-1)[0]
                        .replace(/\.config\.(t|j)s(on)?$/, '');
                    // exclude .d.ts files
                    if (filePath.match(/\.d\.ts$/))
                        continue;
                    // make sure it's a js, ts or json file
                    if (!filePath.match(/\.(j|t)s(on)?$/))
                        continue;
                    let buildTemporaryRes;
                    let importedConfig;
                    let importTimeout = setTimeout(() => {
                        throw new Error(`[SConfigFolderAdapter.load] The configuration "<cyan>${filePath}</cyan>" cannot be loaded for some unknown reason(s)...`);
                    }, 5000);
                    if (filePath.match(/\.ts$/)) {
                        buildTemporaryRes =
                            yield __STypescriptBuilder.buildTemporary(filePath);
                        filePath = buildTemporaryRes.path;
                        importedConfig = yield import(`${filePath}?v=${Math.round(Math.random() * 99999)}`);
                    }
                    else if (filePath.match(/\.json$/)) {
                        importedConfig = __readJsonSync(filePath);
                    }
                    else {
                        importedConfig = yield import(`${filePath}?v=${Math.round(Math.random() * 99999)}`);
                    }
                    if (!importedConfig) {
                        importedConfig = {};
                    }
                    // CJS async import resolution
                    if ((importedConfig === null || importedConfig === void 0 ? void 0 : importedConfig.__esModule) && (importedConfig === null || importedConfig === void 0 ? void 0 : importedConfig.default)) {
                        importedConfig = importedConfig.default;
                    }
                    clearTimeout(importTimeout);
                    let configData = importedConfig.default;
                    if (typeof configData === 'function') {
                        configData = configData({
                            env,
                            config: configObj !== null && configObj !== void 0 ? configObj : {},
                            get this() {
                                return configObj[configId];
                            },
                            get theme() {
                                if (!configObj.theme)
                                    return {};
                                const themeId = `${configObj.theme.theme}-${configObj.theme.variant}`;
                                return configObj.theme.themes[themeId];
                            },
                            extends: __deepMerge,
                        });
                    }
                    const configKey = __path.basename(filePath.replace(/\.config\.(j|t)s$/, ''));
                    configObj[configKey] = __deepMerge((_a = configObj[configKey]) !== null && _a !== void 0 ? _a : {}, configData);
                    if (importedConfig.preprocess &&
                        typeof importedConfig.preprocess === 'function') {
                        __SConfig.registerPreprocess(this.name, configKey, importedConfig.preprocess);
                    }
                    if (importedConfig.postprocess &&
                        typeof importedConfig.postprocess === 'function') {
                        __SConfig.registerPostprocess(this.name, configKey, importedConfig.postprocess);
                    }
                }
            }
            return Object.assign({}, configObj);
        });
    }
    load({ env, config }) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < Object.keys(this._scopedFoldersPaths).length; i++) {
                const scope = Object.keys(this._scopedFoldersPaths)[i];
                const scopedFoldersPaths = this._scopedFoldersPaths[scope];
                if (scopedFoldersPaths && scopedFoldersPaths.length) {
                    this._scopedSettings[scope] = yield this._load(scopedFoldersPaths, env, config);
                }
            }
            let resultSettings = {};
            Object.keys(this._scopedSettings).forEach((scope) => {
                resultSettings = __deepMerge(resultSettings, this._scopedSettings[scope]);
            });
            return resultSettings;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFHZCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUUvQyxPQUFPLGdCQUFnQixNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sb0JBQW9CLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQVcsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUkxQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFvRGhELE1BQU0sQ0FBQyxPQUFPLE9BQU8sb0JBQXFCLFNBQVEsZ0JBQWdCO0lBTTlELFlBQVksUUFBZ0Q7UUFDeEQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsVUFBVSxFQUFFLFFBQVE7WUFDcEIsTUFBTSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ3RELE1BQU0sRUFBRSxFQUFFO2dCQUNWLElBQUksRUFBRTtvQkFDRixHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTt3QkFDL0IsT0FBTyxFQUFFLElBQUk7cUJBQ2hCLENBQUMsY0FBYztpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWM7aUJBQ25EO2dCQUNELElBQUksRUFBRTtvQkFDRixHQUFHLGdCQUFnQixDQUNmLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FDaEIscUJBQXFCO2lCQUN6QjthQUNKO1lBQ0QsV0FBVyxFQUFFLE1BQU07U0FDdEIsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFoQ04sb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFDMUIsd0JBQW1CLEdBQVEsRUFBRSxDQUFDO1FBQzlCLGtCQUFhLEdBQWEsRUFBRSxDQUFDO1FBa0Y3QixZQUFPLEdBQTJCLEVBQUUsQ0FBQztRQWxEakMseUNBQXlDO1FBQ3pDLElBQUk7WUFDQSxJQUFJLE1BQU0sS0FBSyxTQUFTO2dCQUFFLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDNUM7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1FBRWQscUJBQXFCO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNoRCxJQUFJLHFCQUFxQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXhELElBQUkscUJBQXFCLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDO29CQUNyQyxxQkFBcUIsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQ3BELHFCQUFxQixHQUFHLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUN2RCxPQUFPLGVBQWUsQ0FDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FDeEQsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQzthQUNOO1lBRUQsMENBQTBDO1lBQzFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxxQkFBcUIsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzFCLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUMzQyxJQUFJLENBQUMsbUJBQW1CLENBQzNCLEVBQUU7WUFDQyxnQkFBZ0IsR0FBRztnQkFDZixHQUFHLGdCQUFnQjtnQkFDbkIsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7b0JBQzlCLE9BQU8sR0FBRyxVQUFVLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUNsRCxPQUFPLEVBQ1AsR0FBRyxDQUNOLEVBQUUsQ0FBQztnQkFDUixDQUFDLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtZQUNsQyxLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdELFNBQVM7UUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFDNUIsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckI7UUFFRCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVLLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBbUIsRUFBRSxTQUFTOzs7WUFDbkQsV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVwQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekMsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7b0JBQUUsU0FBUztnQkFFckMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFckMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ25DLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDZixRQUFRLEdBQUcsR0FBRyxJQUFJLElBQUksSUFBSSxFQUFFLEVBQzVCLGVBQWUsR0FBRyxLQUFLLENBQUM7b0JBQzVCLE1BQU0sUUFBUSxHQUFHLFFBQVE7eUJBQ3BCLEtBQUssQ0FBQyxHQUFHLENBQUM7eUJBQ1YsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNaLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFFM0Msc0JBQXNCO29CQUN0QixJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO3dCQUFFLFNBQVM7b0JBQ3pDLHVDQUF1QztvQkFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7d0JBQUUsU0FBUztvQkFFaEQsSUFBSSxpQkFBaUIsQ0FBQztvQkFDdEIsSUFBSSxjQUFjLENBQUM7b0JBRW5CLElBQUksYUFBYSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0JBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQ1gsd0RBQXdELFFBQVEseURBQXlELENBQzVILENBQUM7b0JBQ04sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUVULElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTt3QkFDekIsaUJBQWlCOzRCQUNiLE1BQU0sb0JBQW9CLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN4RCxRQUFRLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDO3dCQUNsQyxjQUFjLEdBQUcsTUFBTSxNQUFNLENBQ3pCLEdBQUcsUUFBUSxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQ3ZELENBQUM7cUJBQ0w7eUJBQU0sSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO3dCQUNsQyxjQUFjLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUM3Qzt5QkFBTTt3QkFDSCxjQUFjLEdBQUcsTUFBTSxNQUFNLENBQ3pCLEdBQUcsUUFBUSxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQ3ZELENBQUM7cUJBQ0w7b0JBRUQsSUFBSSxDQUFDLGNBQWMsRUFBRTt3QkFDakIsY0FBYyxHQUFHLEVBQUUsQ0FBQztxQkFDdkI7b0JBRUQsOEJBQThCO29CQUM5QixJQUFJLENBQUEsY0FBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLFVBQVUsTUFBSSxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsT0FBTyxDQUFBLEVBQUU7d0JBQ3ZELGNBQWMsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDO3FCQUMzQztvQkFFRCxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBRTVCLElBQUksVUFBVSxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUM7b0JBQ3hDLElBQUksT0FBTyxVQUFVLEtBQUssVUFBVSxFQUFFO3dCQUNsQyxVQUFVLEdBQUcsVUFBVSxDQUFDOzRCQUNwQixHQUFHOzRCQUNILE1BQU0sRUFBRSxTQUFTLGFBQVQsU0FBUyxjQUFULFNBQVMsR0FBSSxFQUFFOzRCQUN2QixJQUFJLElBQUk7Z0NBQ0osT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQy9CLENBQUM7NEJBQ0QsSUFBSSxLQUFLO2dDQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztvQ0FBRSxPQUFPLEVBQUUsQ0FBQztnQ0FDaEMsTUFBTSxPQUFPLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dDQUN0RSxPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUMzQyxDQUFDOzRCQUNELE9BQU8sRUFBRSxXQUFXO3lCQUN2QixDQUFDLENBQUM7cUJBQ047b0JBRUQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FDN0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUMsQ0FDNUMsQ0FBQztvQkFFRixTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUM5QixNQUFBLFNBQVMsQ0FBQyxTQUFTLENBQUMsbUNBQUksRUFBRSxFQUMxQixVQUFVLENBQ2IsQ0FBQztvQkFFRixJQUNJLGNBQWMsQ0FBQyxVQUFVO3dCQUN6QixPQUFPLGNBQWMsQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUNqRDt3QkFDRSxTQUFTLENBQUMsa0JBQWtCLENBQ3hCLElBQUksQ0FBQyxJQUFJLEVBQ1QsU0FBUyxFQUNULGNBQWMsQ0FBQyxVQUFVLENBQzVCLENBQUM7cUJBQ0w7b0JBRUQsSUFDSSxjQUFjLENBQUMsV0FBVzt3QkFDMUIsT0FBTyxjQUFjLENBQUMsV0FBVyxLQUFLLFVBQVUsRUFDbEQ7d0JBQ0UsU0FBUyxDQUFDLG1CQUFtQixDQUN6QixJQUFJLENBQUMsSUFBSSxFQUNULFNBQVMsRUFDVCxjQUFjLENBQUMsV0FBVyxDQUM3QixDQUFDO3FCQUNMO2lCQUNKO2FBQ0o7WUFFRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDOztLQUN2QztJQUVLLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7O1lBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbkUsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNELElBQUksa0JBQWtCLElBQUksa0JBQWtCLENBQUMsTUFBTSxFQUFFO29CQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FDMUMsa0JBQWtCLEVBQ2xCLEdBQUcsRUFDSCxNQUFNLENBQ1QsQ0FBQztpQkFDTDthQUNKO1lBRUQsSUFBSSxjQUFjLEdBQVEsRUFBRSxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNoRCxjQUFjLEdBQUcsV0FBVyxDQUN4QixjQUFjLEVBQ2QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FDOUIsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxjQUFjLENBQUM7UUFDMUIsQ0FBQztLQUFBO0NBQ0oifQ==