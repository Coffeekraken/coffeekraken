"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const glob_1 = __importDefault(require("glob"));
const glob_2 = __importDefault(require("../is/glob"));
const fs_1 = __importDefault(require("fs"));
const SFile_1 = __importDefault(require("./SFile"));
/**
 * @name            findUp
 * @namespace       sugar.node.fs
 * @type            Function
 * @async
 *
 * This function simply walk across upper folders to search for a file
 * and returns you the first finded
 *
 * @param       {IFindUpSearch}         search          The name of the file you search
 * @param       {IFindUpSettings}       [settings={}]       An object of settings to configure your research
 * @return      {SFile|null}                                 An SFile instance or null if nothings founded
 *
 * @example         js
 * import findUp from '@coffeekraken/sugar/node/fs/findUp';
 * const file = await findUp('myCoolFile.json', {});
 * console.log(file.path);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const fn = function findUp(search, settings) {
    settings = Object.assign({ symlinks: true, cwd: process.cwd(), stopWhenFound: true, SFile: true }, settings);
    return new Promise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
        const cwd = settings.cwd;
        let currentPath = cwd.split('/').filter((p) => p.trim() !== '');
        let foundedFiles = [];
        while (currentPath.length > 0) {
            const path = `/${currentPath.join('/')}`;
            if (glob_2.default(search)) {
                let files = glob_1.default.sync(search, {
                    cwd: path,
                    symlinks: settings.symlinks
                });
                if (files && files.length) {
                    files = files.map((f) => {
                        return `${path}/${f}`;
                    });
                    foundedFiles = [...foundedFiles, ...files];
                }
            }
            else if (fs_1.default.existsSync(`${path}/${search}`)) {
                foundedFiles.push(`${path}/${search}`);
            }
            // check if we need to stop when found
            if (settings.stopWhenFound && foundedFiles.length) {
                break;
            }
            // update the currentPath
            currentPath = currentPath.slice(0, -1);
        }
        if (settings.SFile === true) {
            // wrap into an SFile
            foundedFiles = foundedFiles.map((path) => {
                return new SFile_1.default(path);
            });
        }
        // resolve at the end
        return resolve(foundedFiles);
    }));
};
module.exports = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmluZFVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7O0FBSWQsZ0RBQTBCO0FBQzFCLHNEQUFrQztBQUNsQyw0Q0FBc0I7QUFDdEIsb0RBQThCO0FBRTlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sRUFBRSxHQUFZLFNBQVMsTUFBTSxDQUNqQyxNQUFjLEVBQ2QsUUFBeUI7SUFFekIsUUFBUSxtQkFDTixRQUFRLEVBQUUsSUFBSSxFQUNkLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ2xCLGFBQWEsRUFBRSxJQUFJLEVBQ25CLEtBQUssRUFBRSxJQUFJLElBQ1IsUUFBUSxDQUNaLENBQUM7SUFFRixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUMvQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ3pCLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDaEUsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXRCLE9BQU8sV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDekMsSUFBSSxjQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3BCLElBQUksS0FBSyxHQUFHLGNBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUM5QixHQUFHLEVBQUUsSUFBSTtvQkFDVCxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7aUJBQzVCLENBQUMsQ0FBQztnQkFDSCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUN6QixLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUN0QixPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUN4QixDQUFDLENBQUMsQ0FBQztvQkFDSCxZQUFZLEdBQUcsQ0FBQyxHQUFHLFlBQVksRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO2lCQUM1QzthQUNGO2lCQUFNLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksSUFBSSxNQUFNLEVBQUUsQ0FBQyxFQUFFO2dCQUMvQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDeEM7WUFDRCxzQ0FBc0M7WUFDdEMsSUFBSSxRQUFRLENBQUMsYUFBYSxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pELE1BQU07YUFDUDtZQUNELHlCQUF5QjtZQUN6QixXQUFXLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4QztRQUVELElBQUksUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDM0IscUJBQXFCO1lBQ3JCLFlBQVksR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3ZDLE9BQU8sSUFBSSxlQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELHFCQUFxQjtRQUNyQixPQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsaUJBQVMsRUFBRSxDQUFDIn0=