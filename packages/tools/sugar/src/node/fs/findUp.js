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
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const glob_2 = __importDefault(require("../../shared/is/glob"));
const fs_1 = __importDefault(require("fs"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
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
                return new s_file_1.default(path);
            });
        }
        // resolve at the end
        return resolve(foundedFiles);
    }));
};
exports.default = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmluZFVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUlkLGdEQUEwQjtBQUMxQixnRUFBNEM7QUFDNUMsNENBQXNCO0FBQ3RCLGtFQUEyQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLEVBQUUsR0FBWSxTQUFTLE1BQU0sQ0FDakMsTUFBYyxFQUNkLFFBQXlCO0lBRXpCLFFBQVEsbUJBQ04sUUFBUSxFQUFFLElBQUksRUFDZCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNsQixhQUFhLEVBQUUsSUFBSSxFQUNuQixLQUFLLEVBQUUsSUFBSSxJQUNSLFFBQVEsQ0FDWixDQUFDO0lBRUYsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDL0MsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUN6QixJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUV0QixPQUFPLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3pDLElBQUksY0FBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNwQixJQUFJLEtBQUssR0FBRyxjQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDOUIsR0FBRyxFQUFFLElBQUk7b0JBQ1QsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO2lCQUM1QixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtvQkFDekIsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTt3QkFDdEIsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsWUFBWSxHQUFHLENBQUMsR0FBRyxZQUFZLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQztpQkFDNUM7YUFDRjtpQkFBTSxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLElBQUksTUFBTSxFQUFFLENBQUMsRUFBRTtnQkFDL0MsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ3hDO1lBQ0Qsc0NBQXNDO1lBQ3RDLElBQUksUUFBUSxDQUFDLGFBQWEsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUNqRCxNQUFNO2FBQ1A7WUFDRCx5QkFBeUI7WUFDekIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEM7UUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQzNCLHFCQUFxQjtZQUNyQixZQUFZLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUN2QyxPQUFPLElBQUksZ0JBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQscUJBQXFCO1FBQ3JCLE9BQU8sT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixrQkFBZSxFQUFFLENBQUMifQ==