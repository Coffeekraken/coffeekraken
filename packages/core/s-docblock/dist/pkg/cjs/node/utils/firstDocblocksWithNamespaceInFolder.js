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
const extension_1 = __importDefault(require("@coffeekraken/sugar/node/fs/extension"));
const filename_1 = __importDefault(require("@coffeekraken/sugar/node/fs/filename"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const find_in_files_1 = __importDefault(require("find-in-files"));
const fs_1 = __importDefault(require("fs"));
const minimatch_1 = __importDefault(require("minimatch"));
const path_1 = __importDefault(require("path"));
const SDocblock_1 = __importDefault(require("../../shared/SDocblock"));
/**
 * @name                  firstDocblockWithNamespaceInFolder
 * @namespace           sugar.node.docblock
 * @type                  Function
 * @async
 * @status              wip
 *
 * This function search in the passed folder for files containing a "@namespace" tag (and an "@name" optional one)
 * and generate a SNav instance with all these founded files as sources...
 *
 * @param         {String}          directory               The directory in which to search for files with the namespace tag
 * @param         {Object}          [settings={}]           A settings object to configure your navigation generation:
 * - exclude ('**\/+(__tests__ | __wip__)\/**') {String}: Specify a glob pattern representing the files to exclude from the generation
 * @return        {Object}                                    An object containing the docblocks holded in each namespaces as properties
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import firstDocblockWithNamespaceInFolder from '@coffeekraken/sugar/node/nav/firstDocblockWithNamespaceInFolder';
 * firstDocblockWithNamespaceInFolder('my/cool/folder');
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function firstDocblockWithNamespaceInFolder(directory, settings = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        settings = (0, deepMerge_1.default)({
            exclude: '**/+(__tests__|__wip__)/**',
        }, settings);
        if (!fs_1.default.existsSync(directory))
            return {};
        const founded = yield find_in_files_1.default.find(`@namespace`, directory);
        const namespaceObj = {};
        for (let i = 0; i < Object.keys(founded).length; i++) {
            const path = founded[Object.keys(founded)[i]];
            const relativePath = path_1.default.relative(directory, path);
            if ((0, minimatch_1.default)(relativePath, settings.exclude))
                return;
            const content = fs_1.default.readFileSync(path, 'utf8');
            const docblocks = new SDocblock_1.default(content);
            yield docblocks.parse();
            const docblock = docblocks.blocks[0] ? docblocks.blocks[0] : null;
            if (!docblock)
                return;
            delete docblock.object.raw;
            const name = docblock.object.name ||
                (0, filename_1.default)(path).replace(`.${(0, extension_1.default)(path)}`, '');
            namespaceObj[docblock.object.namespace + '.' + name] = Object.assign(Object.assign({}, docblock.object), { path: relativePath });
        }
        return namespaceObj;
    });
}
exports.default = firstDocblockWithNamespaceInFolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHNGQUFnRTtBQUNoRSxvRkFBaUU7QUFDakUsNEZBQXNFO0FBQ3RFLGtFQUEwQztBQUMxQyw0Q0FBc0I7QUFDdEIsMERBQW9DO0FBQ3BDLGdEQUEwQjtBQUMxQix1RUFBaUQ7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUE4QixrQ0FBa0MsQ0FDNUQsU0FBUyxFQUNULFFBQVEsR0FBRyxFQUFFOztRQUViLFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ2xCO1lBQ0ksT0FBTyxFQUFFLDRCQUE0QjtTQUN4QyxFQUNELFFBQVEsQ0FDWCxDQUFDO1FBRUYsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFFM0MsTUFBTSxPQUFPLEdBQUcsTUFBTSx1QkFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFbEUsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXhCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sWUFBWSxHQUFHLGNBQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3RELElBQUksSUFBQSxtQkFBVyxFQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDO2dCQUFFLE9BQU87WUFFeEQsTUFBTSxPQUFPLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFaEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNDLE1BQU0sU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hCLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUVsRSxJQUFJLENBQUMsUUFBUTtnQkFBRSxPQUFPO1lBQ3RCLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFFM0IsTUFBTSxJQUFJLEdBQ04sUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJO2dCQUNwQixJQUFBLGtCQUFhLEVBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBQSxtQkFBVyxFQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFN0QsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsbUNBQzdDLFFBQVEsQ0FBQyxNQUFNLEtBQ2xCLElBQUksRUFBRSxZQUFZLEdBQ3JCLENBQUM7U0FDTDtRQUVELE9BQU8sWUFBWSxDQUFDO0lBQ3hCLENBQUM7Q0FBQTtBQTFDRCxxREEwQ0MifQ==