"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const find_in_files_1 = __importDefault(require("find-in-files"));
const minimatch_1 = __importDefault(require("minimatch"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filename_1 = __importDefault(require("../fs/filename"));
const extension_1 = __importDefault(require("../fs/extension"));
const SDocblock_1 = __importDefault(require("./SDocblock"));
/**
 * @name                  firstDocblockWithNamespaceInFolder
 * @namespace           sugar.node.docblock
 * @type                  Function
 * @async
 *
 * This function search in the passed folder for files containing a "@namespace" tag (and an "@name" optional one)
 * and generate a SNav instance with all these founded files as sources...
 *
 * @param         {String}          directory               The directory in which to search for files with the namespace tag
 * @param         {Object}          [settings={}]           A settings object to configure your navigation generation:
 * - exclude ('**\/+(__tests__ | __wip__)\/**') {String}: Specify a glob pattern representing the files to exclude from the generation
 * @return        {Object}                                    An object containing the docblocks holded in each namespaces as properties
 *
 * @example       js
 * import firstDocblockWithNamespaceInFolder from '@coffeekraken/sugar/node/nav/firstDocblockWithNamespaceInFolder';
 * firstDocblockWithNamespaceInFolder('my/cool/folder');
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
async function firstDocblockWithNamespaceInFolder(directory, settings = {}) {
    settings = deepMerge_1.default({
        exclude: '**/+(__tests__|__wip__)/**'
    }, settings);
    if (!fs_1.default.existsSync(directory))
        return {};
    let founded = await find_in_files_1.default.find(`@namespace`, directory);
    const namespaceObj = {};
    Object.keys(founded).forEach((path) => {
        const relativePath = path_1.default.relative(directory, path);
        if (minimatch_1.default(relativePath, settings.exclude))
            return;
        const content = fs_1.default.readFileSync(path, 'utf8');
        // console.log(content);
        const docblocks = new SDocblock_1.default(content);
        const docblock = docblocks.blocks[0] ? docblocks.blocks[0] : null;
        if (!docblock)
            return;
        delete docblock.object.raw;
        const name = docblock.object.name ||
            filename_1.default(path).replace(`.${extension_1.default(path)}`, '');
        namespaceObj[docblock.object.namespace + '.' + name] = {
            ...docblock.object,
            path: relativePath
        };
    });
    return namespaceObj;
}
exports.default = firstDocblockWithNamespaceInFolder;
