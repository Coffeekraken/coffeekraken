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
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const find_in_files_1 = __importDefault(require("find-in-files"));
const fs_2 = __importDefault(require("fs"));
const minimatch_1 = __importDefault(require("minimatch"));
const path_1 = __importDefault(require("path"));
const SDocblock_js_1 = __importDefault(require("../../shared/SDocblock.js"));
/**
 * @___name                  firstDocblockWithNamespaceInFolder
 * @___namespace           node.utils
 * @___type                  Function
 * @___async
 * @___platform            node
 * @___status              wip
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
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function firstDocblockWithNamespaceInFolder(directory, settings = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        settings = (0, object_1.__deepMerge)({
            exclude: '**/+(__tests__|__wip__)/**',
        }, settings);
        if (!fs_2.default.existsSync(directory))
            return {};
        const founded = yield find_in_files_1.default.find(`@namespace`, directory);
        const namespaceObj = {};
        for (let i = 0; i < Object.keys(founded).length; i++) {
            const path = founded[Object.keys(founded)[i]];
            const relativePath = path_1.default.relative(directory, path);
            if ((0, minimatch_1.default)(relativePath, settings.exclude))
                return;
            const content = fs_2.default.readFileSync(path, 'utf8');
            const docblocks = new SDocblock_js_1.default(content);
            yield docblocks.parse();
            const docblock = docblocks.blocks[0] ? docblocks.blocks[0] : null;
            if (!docblock)
                return;
            delete docblock.object.raw;
            const name = docblock.object.name ||
                (0, fs_1.__fileName)(path).replace(`.${(0, fs_1.__extension)(path)}`, '');
            namespaceObj[docblock.object.namespace + '.' + name] = Object.assign(Object.assign({}, docblock.object), { path: relativePath });
        }
        return namespaceObj;
    });
}
exports.default = firstDocblockWithNamespaceInFolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLCtDQUFpRTtBQUNqRSx1REFBeUQ7QUFDekQsa0VBQTBDO0FBQzFDLDRDQUFzQjtBQUN0QiwwREFBb0M7QUFDcEMsZ0RBQTBCO0FBQzFCLDZFQUFvRDtBQUVwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQThCLGtDQUFrQyxDQUM1RCxTQUFTLEVBQ1QsUUFBUSxHQUFHLEVBQUU7O1FBRWIsUUFBUSxHQUFHLElBQUEsb0JBQVcsRUFDbEI7WUFDSSxPQUFPLEVBQUUsNEJBQTRCO1NBQ3hDLEVBQ0QsUUFBUSxDQUNYLENBQUM7UUFFRixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUUzQyxNQUFNLE9BQU8sR0FBRyxNQUFNLHVCQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVsRSxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7UUFFeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsTUFBTSxZQUFZLEdBQUcsY0FBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEQsSUFBSSxJQUFBLG1CQUFXLEVBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUM7Z0JBQUUsT0FBTztZQUV4RCxNQUFNLE9BQU8sR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUVoRCxNQUFNLFNBQVMsR0FBRyxJQUFJLHNCQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0MsTUFBTSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEIsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRWxFLElBQUksQ0FBQyxRQUFRO2dCQUFFLE9BQU87WUFDdEIsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUUzQixNQUFNLElBQUksR0FDTixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUk7Z0JBQ3BCLElBQUEsZUFBVSxFQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUEsZ0JBQVcsRUFBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTFELFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLG1DQUM3QyxRQUFRLENBQUMsTUFBTSxLQUNsQixJQUFJLEVBQUUsWUFBWSxHQUNyQixDQUFDO1NBQ0w7UUFFRCxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0NBQUE7QUExQ0QscURBMENDIn0=