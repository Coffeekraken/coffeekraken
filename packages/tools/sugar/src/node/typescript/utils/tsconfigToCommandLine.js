"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const STscInterface_1 = __importDefault(require("../interface/STscInterface"));
const buildCommandLine_1 = __importDefault(require("../../../shared/cli/buildCommandLine"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
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
            if (STscInterface_1.default.definition[key] === undefined)
                return;
            params[key] = value;
        });
    }
    const cli = buildCommandLine_1.default('[arguments]', params, {
        definition: STscInterface_1.default.definition
    });
    return cli;
};
exports.default = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNjb25maWdUb0NvbW1hbmRMaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHNjb25maWdUb0NvbW1hbmRMaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0VBQXlEO0FBQ3pELDRGQUFzRTtBQUN0RSw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGlGQUEyRDtBQUMzRCxxRUFBK0M7QUFFL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLGdCQUFnQixDQUFDLFlBQVksRUFBRSxhQUFhLEdBQUcsRUFBRTtJQUN4RCw2QkFBNkI7SUFDN0IsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksRUFBRTtRQUMxQyxNQUFNLG9EQUFvRCxZQUFZLCtCQUErQixDQUFDO0tBQ3ZHO0lBQ0QsZ0JBQWdCO0lBQ2hCLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUV6QyxJQUFJLHlCQUF5QixHQUFHLEVBQUUsQ0FBQztJQUVuQyxtQ0FBbUM7SUFDbkMsSUFBSSxZQUFZLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtRQUN0QyxNQUFNLG1CQUFtQixHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQ3hDLG9CQUFZLENBQUMsWUFBWSxDQUFDLEVBQzFCLFlBQVksQ0FBQyxPQUFPLENBQ3JCLENBQUM7UUFDRix5QkFBeUIsR0FBRyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2xFLFlBQVksR0FBRyxtQkFBVyxDQUFDLHlCQUF5QixFQUFFLFlBQVksQ0FBQyxDQUFDO0tBQ3JFO0lBRUQsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQztBQUNELE1BQU0sRUFBRSxHQUFHLFVBQVUsWUFBWTtJQUMvQixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFFbEIsZ0JBQWdCO0lBQ2hCLE1BQU0sTUFBTSxHQUFRLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRW5ELGtCQUFrQjtJQUNsQixJQUFJLE1BQU0sQ0FBQyxlQUFlLEtBQUssSUFBSSxFQUFFO1FBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2xELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsSUFBSSx1QkFBZSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTO2dCQUFFLE9BQU87WUFDMUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztLQUNKO0lBRUQsTUFBTSxHQUFHLEdBQUcsMEJBQWtCLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRTtRQUNwRCxVQUFVLEVBQUUsdUJBQWUsQ0FBQyxVQUFVO0tBQ3ZDLENBQUMsQ0FBQztJQUVILE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBQ0Ysa0JBQWUsRUFBRSxDQUFDIn0=