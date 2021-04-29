"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const glob_all_1 = __importDefault(require("glob-all"));
const child_process_1 = __importDefault(require("child_process"));
const md5_1 = __importDefault(require("../../shared/crypt/md5"));
const sanitizeSugarJson_1 = __importDefault(require("../../shared/sugar/sanitizeSugarJson"));
const _cache = {};
function sugarJson(packageName = '*', settings) {
    settings = Object.assign({ package: true, modules: true, top: true, global: true, cache: true }, settings);
    const cacheId = md5_1.default.encrypt(settings);
    if (settings.cache && _cache[cacheId])
        return _cache[cacheId];
    // get global node modules directory path
    const globalNodeModulesPath = child_process_1.default
        .execSync(`npm root -g`)
        .toString()
        .trim();
    const packagesArray = packageName.split(',');
    // get local node modules directory path
    const localNodeModulesPath = `${packageRoot_1.default()}/node_modules`;
    // get local node modules directory path
    const topLocalNodeModulesPath = `${packageRoot_1.default(process.cwd(), true)}/node_modules`;
    // build globs
    const globs = [];
    // local first
    if (localNodeModulesPath && settings.modules) {
        if (packageName === '*') {
            globs.push(`${localNodeModulesPath}/*/sugar.json`);
            globs.push(`${localNodeModulesPath}/*/*/sugar.json`);
            // globs.push(`${__packageRoot()}/sugar.json`);
        }
        else {
            packagesArray.forEach((name) => {
                globs.push(`${localNodeModulesPath}/${name}/sugar.json`);
            });
        }
    }
    // top local
    if (localNodeModulesPath !== topLocalNodeModulesPath &&
        settings.modules &&
        settings.top) {
        if (packageName === '*') {
            globs.push(`${topLocalNodeModulesPath}/*/sugar.json`);
            globs.push(`${topLocalNodeModulesPath}/*/*/sugar.json`);
        }
        else {
            packagesArray.forEach((name) => {
                globs.push(`${topLocalNodeModulesPath}/${name}/sugar.json`);
            });
        }
    }
    // then global
    if (globalNodeModulesPath && settings.modules && settings.global) {
        if (packageName === '*') {
            globs.push(`${globalNodeModulesPath}/*/sugar.json`);
            globs.push(`${globalNodeModulesPath}/*/*/sugar.json`);
        }
        else {
            packagesArray.forEach((name) => {
                globs.push(`${globalNodeModulesPath}/${name}/sugar.json`);
            });
        }
    }
    if (settings.package) {
        globs.push(`${packageRoot_1.default(process.cwd())}/sugar.json`);
    }
    if (localNodeModulesPath !== topLocalNodeModulesPath &&
        settings.package &&
        settings.top) {
        globs.push(`${packageRoot_1.default(process.cwd(), true)}/sugar.json`);
    }
    // search for "sugar.json" files
    const files = glob_all_1.default.sync(globs, {}).filter((path) => {
        try {
            require(`${path.replace('sugar.json', 'package.json')}`);
            return true;
        }
        catch (e) {
            return false;
        }
    });
    let results = {};
    if (files.length === 1 &&
        packagesArray.length === 1 &&
        packagesArray[0] !== '*') {
        results = sanitizeSugarJson_1.default(Object.assign({ metas: {
                path: files[0],
                folderPath: files[0].split('/').slice(0, -1).join('/')
            } }, require(files[0])));
    }
    else {
        files.forEach((path) => {
            // read the file
            const json = require(path);
            const packageJson = require(`${path.replace('sugar.json', 'package.json')}`);
            results[packageJson.name] = sanitizeSugarJson_1.default(Object.assign({ metas: {
                    path,
                    folderPath: path.split('/').slice(0, -1).join('/')
                } }, json));
        });
    }
    // cache if needed
    if (settings.cache)
        _cache[cacheId] = Object.assign({}, results);
    return results;
}
exports.default = sugarJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJKc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXJKc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0VBQWdEO0FBQ2hELHdEQUE4QjtBQUM5QixrRUFBMkM7QUFDM0MsaUVBQTJDO0FBQzNDLDZGQUF1RTtBQTJEdkUsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO0FBRXZCLFNBQXdCLFNBQVMsQ0FDL0IsV0FBVyxHQUFHLEdBQUcsRUFDakIsUUFBc0M7SUFFdEMsUUFBUSxtQkFDTixPQUFPLEVBQUUsSUFBSSxFQUNiLE9BQU8sRUFBRSxJQUFJLEVBQ2IsR0FBRyxFQUFFLElBQUksRUFDVCxNQUFNLEVBQUUsSUFBSSxFQUNaLEtBQUssRUFBRSxJQUFJLElBQ1IsUUFBUSxDQUNaLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxhQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQUUsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFOUQseUNBQXlDO0lBQ3pDLE1BQU0scUJBQXFCLEdBQUcsdUJBQWM7U0FDekMsUUFBUSxDQUFDLGFBQWEsQ0FBQztTQUN2QixRQUFRLEVBQUU7U0FDVixJQUFJLEVBQUUsQ0FBQztJQUVWLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFN0Msd0NBQXdDO0lBQ3hDLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxxQkFBYSxFQUFFLGVBQWUsQ0FBQztJQUUvRCx3Q0FBd0M7SUFDeEMsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLHFCQUFhLENBQzlDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDYixJQUFJLENBQ0wsZUFBZSxDQUFDO0lBRWpCLGNBQWM7SUFDZCxNQUFNLEtBQUssR0FBYSxFQUFFLENBQUM7SUFFM0IsY0FBYztJQUNk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