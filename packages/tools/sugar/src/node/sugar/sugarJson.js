"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("../../shared/path/packageRoot"));
const glob_all_1 = __importDefault(require("glob-all"));
const child_process_1 = __importDefault(require("child_process"));
function sugarJson(packageName = '*', settings) {
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
    if (localNodeModulesPath) {
        if (packageName === '*') {
            globs.push(`${localNodeModulesPath}/*/sugar.json`);
            globs.push(`${localNodeModulesPath}/*/*/sugar.json`);
            globs.push(`${packageRoot_1.default()}/sugar.json`);
        }
        else {
            packagesArray.forEach((name) => {
                globs.push(`${localNodeModulesPath}/${name}/sugar.json`);
            });
        }
    }
    // top local
    if (localNodeModulesPath !== topLocalNodeModulesPath) {
        if (packageName === '*') {
            globs.push(`${topLocalNodeModulesPath}/*/sugar.json`);
            globs.push(`${topLocalNodeModulesPath}/*/*/sugar.json`);
            globs.push(`${packageRoot_1.default(process.cwd(), true)}/sugar.json`);
        }
        else {
            packagesArray.forEach((name) => {
                globs.push(`${topLocalNodeModulesPath}/${name}/sugar.json`);
            });
        }
    }
    // then global
    if (globalNodeModulesPath) {
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
        results = Object.assign({ metas: {
                path: files[0],
                folderPath: files[0].split('/').slice(0, -1).join('/')
            } }, require(files[0]));
    }
    else {
        files.forEach((path) => {
            // read the file
            const json = require(path);
            const packageJson = require(`${path.replace('sugar.json', 'package.json')}`);
            results[packageJson.name] = Object.assign({ metas: {
                    path,
                    folderPath: path.split('/').slice(0, -1).join('/')
                } }, json);
        });
    }
    return results;
}
exports.default = sugarJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJKc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXJKc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0ZBQTBEO0FBQzFELHdEQUE4QjtBQUM5QixrRUFBMkM7QUFvRDNDLFNBQXdCLFNBQVMsQ0FDL0IsV0FBVyxHQUFHLEdBQUcsRUFDakIsUUFBc0M7SUFFdEMseUNBQXlDO0lBQ3pDLE1BQU0scUJBQXFCLEdBQUcsdUJBQWM7U0FDekMsUUFBUSxDQUFDLGFBQWEsQ0FBQztTQUN2QixRQUFRLEVBQUU7U0FDVixJQUFJLEVBQUUsQ0FBQztJQUVWLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFN0Msd0NBQXdDO0lBQ3hDLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxxQkFBYSxFQUFFLGVBQWUsQ0FBQztJQUUvRCx3Q0FBd0M7SUFDeEMsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLHFCQUFhLENBQzlDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDYixJQUFJLENBQ0wsZUFBZSxDQUFDO0lBRWpCLGNBQWM7SUFDZCxNQUFNLEtBQUssR0FBYSxFQUFFLENBQUM7SUFFM0IsY0FBYztJQUNkLElBQUksb0JBQW9CLEVBQUU7UUFDeEIsSUFBSSxXQUFXLEtBQUssR0FBRyxFQUFFO1lBQ3ZCLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxvQkFBb0IsZUFBZSxDQUFDLENBQUM7WUFDbkQsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLG9CQUFvQixpQkFBaUIsQ0FBQyxDQUFDO1lBQ3JELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxxQkFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQzdDO2FBQU07WUFDTCxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzdCLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxvQkFBb0IsSUFBSSxJQUFJLGFBQWEsQ0FBQyxD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