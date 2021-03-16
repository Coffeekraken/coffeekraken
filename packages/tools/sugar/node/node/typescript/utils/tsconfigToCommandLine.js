"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TscInterface_1 = __importDefault(require("../compile/interface/TscInterface"));
const buildCommandLine_1 = __importDefault(require("../../cli/buildCommandLine"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const folderPath_1 = __importDefault(require("../../fs/folderPath"));
/**
 * @name        tsconfigToCommandLine
 * @namespace   sugar.node.typescript.utils
 * @type        Function
 *
 * This function simply take a tsconfig file path and
 * transform it into a ```tsc``` command line arguments
 *
 * @param       {String}       tsconfigPath       Pass a tsconfig.json file path
 * @return      {String}                           The tsconfig command line equivalent
 *
 * @example       js
 * import tsconfigToCommandLine from '@coffeekraken/sugar/node/typescript/utils/tsconfigToCommandLine';
 * tsconfigToCommandLine({
 *    compilerOptions: {
 *      target: 'es6',
 *      module: 'commonjs'
 *    }
 * }); // => -t es6 -m commonjs
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function recursiveRequire(tsconfigPath, currentConfig = {}) {
    // check that the file exists
    if (fs_1.default.existsSync(tsconfigPath) !== true) {
        throw `Sorry but the passed tsconfig file path "<yellow>${tsconfigPath}</yellow>" does not exists...`;
    }
    // read the file
    let tsconfigJson = require(tsconfigPath);
    let extendsTsconfigConfigJson = {};
    // check if it extends another file
    if (tsconfigJson.extends !== undefined) {
        const extendsTsconfigPath = path_1.default.resolve(folderPath_1.default(tsconfigPath), tsconfigJson.extends);
        extendsTsconfigConfigJson = recursiveRequire(extendsTsconfigPath);
        tsconfigJson = deepMerge_1.default(extendsTsconfigConfigJson, tsconfigJson);
    }
    return tsconfigJson;
}
const fn = function (tsconfigPath) {
    const params = {};
    // load the file
    const config = recursiveRequire(tsconfigPath);
    // compilerOptions
    if (config.compilerOptions !== null) {
        Object.keys(config.compilerOptions).forEach((key) => {
            const value = config.compilerOptions[key];
            if (TscInterface_1.default.definition[key] === undefined)
                return;
            params[key] = value;
        });
    }
    const cli = buildCommandLine_1.default('[arguments]', params, {
        definition: TscInterface_1.default.definition
    });
    return cli;
};
exports.default = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNjb25maWdUb0NvbW1hbmRMaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvdHlwZXNjcmlwdC91dGlscy90c2NvbmZpZ1RvQ29tbWFuZExpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxRkFBK0Q7QUFDL0Qsa0ZBQTREO0FBQzVELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsdUVBQWlEO0FBQ2pELHFFQUErQztBQUUvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLGFBQWEsR0FBRyxFQUFFO0lBQ3hELDZCQUE2QjtJQUM3QixJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQzFDLE1BQU0sb0RBQW9ELFlBQVksK0JBQStCLENBQUM7S0FDdkc7SUFDRCxnQkFBZ0I7SUFDaEIsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRXpDLElBQUkseUJBQXlCLEdBQUcsRUFBRSxDQUFDO0lBRW5DLG1DQUFtQztJQUNuQyxJQUFJLFlBQVksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO1FBQ3RDLE1BQU0sbUJBQW1CLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FDeEMsb0JBQVksQ0FBQyxZQUFZLENBQUMsRUFDMUIsWUFBWSxDQUFDLE9BQU8sQ0FDckIsQ0FBQztRQUNGLHlCQUF5QixHQUFHLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbEUsWUFBWSxHQUFHLG1CQUFXLENBQUMseUJBQXlCLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDckU7SUFFRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDO0FBQ0QsTUFBTSxFQUFFLEdBQUcsVUFBVSxZQUFZO0lBQy9CLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUVsQixnQkFBZ0I7SUFDaEIsTUFBTSxNQUFNLEdBQVEsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFbkQsa0JBQWtCO0lBQ2xCLElBQUksTUFBTSxDQUFDLGVBQWUsS0FBSyxJQUFJLEVBQUU7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDbEQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxJQUFJLHNCQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVM7Z0JBQUUsT0FBTztZQUN6RCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxNQUFNLEdBQUcsR0FBRywwQkFBa0IsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFO1FBQ3BELFVBQVUsRUFBRSxzQkFBYyxDQUFDLFVBQVU7S0FDdEMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDLENBQUM7QUFDRixrQkFBZSxFQUFFLENBQUMifQ==