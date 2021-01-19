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
//# sourceMappingURL=findUp.js.map