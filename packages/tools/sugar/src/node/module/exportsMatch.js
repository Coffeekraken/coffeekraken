"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimatch_1 = __importDefault(require("minimatch"));
const node_1 = __importDefault(require("../is/node"));
const plainObject_1 = __importDefault(require("../is/plainObject"));
const sugar_1 = __importDefault(require("../config/sugar"));
function exportsMatch(packageDir, exportsObj, modulePath, settings) {
    let modulesSubpaths = exportsObj;
    const set = Object.assign({ method: 'import', extensions: sugar_1.default('module.resolve.extensions') }, (settings || {}));
    // loop on exports keys
    const keys = Object.keys(exportsObj);
    if (keys.indexOf('node') !== -1 || keys.indexOf('default') !== -1) {
        if (keys.length > 2)
            throw new Error(`Your "exports" field in the "<yellow>${packageDir}/package.json</yellow>" file seems to be invalid. You cannot have any other keys than "node" and "default" at the same level...`);
    }
    if (keys.indexOf('require') !== -1 || keys.indexOf('import') !== -1) {
        if (keys.length > 2)
            throw new Error(`Your "exports" field in the "<yellow>${packageDir}/package.json</yellow>" file seems to be invalid. You cannot have any other keys than "require" and "import" at the same level...`);
    }
    let founded = false;
    while (!founded) {
        if (Object.keys(modulesSubpaths).indexOf('node') !== -1 ||
            Object.keys(modulesSubpaths).indexOf('default') !== -1) {
            // check "node" and "default" keys
            if (node_1.default() && modulesSubpaths.node !== undefined) {
                modulesSubpaths = modulesSubpaths.node;
            }
            else if (modulesSubpaths.default) {
                modulesSubpaths = modulesSubpaths.default;
            }
        }
        else if (Object.keys(modulesSubpaths).indexOf('import') !== -1 ||
            Object.keys(modulesSubpaths).indexOf('require') !== -1) {
            // check "import" and "require" method
            if (set.method === 'import' && modulesSubpaths.import !== undefined) {
                modulesSubpaths = modulesSubpaths.import;
            }
            else if (modulesSubpaths.require) {
                modulesSubpaths = modulesSubpaths.require;
            }
        }
        else if (plainObject_1.default(modulesSubpaths)) {
            // check if a key match
            for (let key in modulesSubpaths) {
                if (minimatch_1.default(modulePath, key.replace(/^\.\//, ''))) {
                    modulesSubpaths = modulesSubpaths[key];
                    break;
                }
            }
        }
        // check if we have finished checking these fields
        if ((modulesSubpaths.node === undefined &&
            modulesSubpaths.default === undefined &&
            modulesSubpaths.import === undefined &&
            modulesSubpaths.require === undefined) ||
            !plainObject_1.default(modulesSubpaths)) {
            founded = true;
        }
    }
    console.log('found', modulesSubpaths, internalMathPath);
    if (typeof modulesSubpaths === 'string') {
    }
    //   let internalMathPath: string;
    //   if (__isPlainObject(modulesSubpaths)) {
    //   } else if (typeof modulesSubpaths === 'string') {
    //       internalMathPath = modulesSubpaths;
    //   }
    //   // if we don't have any match, return undefined
    //   if (!internalMathPath) return;
    // check if the matched internal
    return 'coco';
}
exports.default = exportsMatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0c01hdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhwb3J0c01hdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQW9DO0FBQ3BDLHNEQUFrQztBQUNsQyxvRUFBZ0Q7QUFDaEQsNERBQTRDO0FBMkI1QyxTQUF3QixZQUFZLENBQ2xDLFVBQWtCLEVBQ2xCLFVBQWUsRUFDZixVQUFrQixFQUNsQixRQUF5QztJQUV6QyxJQUFJLGVBQWUsR0FBRyxVQUFVLENBQUM7SUFFakMsTUFBTSxHQUFHLG1CQUNQLE1BQU0sRUFBRSxRQUFRLEVBQ2hCLFVBQVUsRUFBRSxlQUFhLENBQUMsMkJBQTJCLENBQUMsSUFDbkQsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRix1QkFBdUI7SUFDdkIsTUFBTSxJQUFJLEdBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNqRSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUNqQixNQUFNLElBQUksS0FBSyxDQUNiLHdDQUF3QyxVQUFVLGlJQUFpSSxDQUNwTCxDQUFDO0tBQ0w7SUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNuRSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUNqQixNQUFNLElBQUksS0FBSyxDQUNiLHdDQUF3QyxVQUFVLG1JQUFtSSxDQUN0TCxDQUFDO0tBQ0w7SUFFRCxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDcEIsT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUNmLElBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUN0RDtZQUNBLGtDQUFrQztZQUNsQyxJQUFJLGNBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUNwRCxlQUFlLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQzthQUN4QztpQkFBTSxJQUFJLGVBQWUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xDLGVBQWUsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDO2FBQzNDO1NBQ0Y7YUFBTSxJQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDdEQ7WUFDQSxzQ0FBc0M7WUFDdEMsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLFFBQVEsSUFBSSxlQUFlLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDbkUsZUFBZSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7YUFDMUM7aUJBQU0sSUFBSSxlQUFlLENBQUMsT0FBTyxFQUFFO2dCQUNsQyxlQUFlLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQzthQUMzQztTQUNGO2FBQU0sSUFBSSxxQkFBZSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQzNDLHVCQUF1QjtZQUN2QixLQUFLLElBQUksR0FBRyxJQUFJLGVBQWUsRUFBRTtnQkFDL0IsSUFBSSxtQkFBVyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFO29CQUNyRCxlQUFlLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN2QyxNQUFNO2lCQUNQO2FBQ0Y7U0FDRjtRQUVELGtEQUFrRDtRQUNsRCxJQUNFLENBQUMsZUFBZSxDQUFDLElBQUksS0FBSyxTQUFTO1lBQ2pDLGVBQWUsQ0FBQyxPQUFPLEtBQUssU0FBUztZQUNyQyxlQUFlLENBQUMsTUFBTSxLQUFLLFNBQVM7WUFDcEMsZUFBZSxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUM7WUFDeEMsQ0FBQyxxQkFBZSxDQUFDLGVBQWUsQ0FBQyxFQUNqQztZQUNBLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDaEI7S0FDRjtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXhELElBQUksT0FBTyxlQUFlLEtBQUssUUFBUSxFQUFFO0tBQ3hDO0lBRUQsa0NBQWtDO0lBRWxDLDRDQUE0QztJQUU1QyxzREFBc0Q7SUFDdEQsNENBQTRDO0lBQzVDLE1BQU07SUFFTixvREFBb0Q7SUFDcEQsbUNBQW1DO0lBRW5DLGdDQUFnQztJQUVoQyxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBN0ZELCtCQTZGQyJ9