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
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const find_in_files_1 = __importDefault(require("find-in-files"));
const minimatch_1 = __importDefault(require("minimatch"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filename_1 = __importDefault(require("../fs/filename"));
const extension_1 = __importDefault(require("../fs/extension"));
const SDocblock_1 = __importDefault(require("./SDocblock"));
module.exports = function firstDocblockWithNamespaceInFolder(directory, settings = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        settings = deepMerge_1.default({
            exclude: '**/+(__tests__|__wip__)/**'
        }, settings);
        if (!fs_1.default.existsSync(directory))
            return {};
        let founded = yield find_in_files_1.default.find(`@namespace`, directory);
        const namespaceObj = {};
        Object.keys(founded).forEach((path) => {
            const relativePath = path_1.default.relative(directory, path);
            if (minimatch_1.default(relativePath, settings.exclude))
                return;
            const content = fs_1.default.readFileSync(path, 'utf8');
            const docblocks = new SDocblock_1.default(content);
            const docblock = docblocks.blocks[0] ? docblocks.blocks[0] : null;
            if (!docblock)
                return;
            delete docblock.object.raw;
            const name = docblock.object.name ||
                filename_1.default(path).replace(`.${extension_1.default(path)}`, '');
            namespaceObj[docblock.object.namespace + '.' + name] = Object.assign(Object.assign({}, docblock.object), { path: relativePath });
        });
        return namespaceObj;
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyc3REb2NibG9ja3NXaXRoTmFtZXNwYWNlSW5Gb2xkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaXJzdERvY2Jsb2Nrc1dpdGhOYW1lc3BhY2VJbkZvbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7OztBQUVkLG9FQUE4QztBQUM5QyxrRUFBMEM7QUFDMUMsMERBQW9DO0FBQ3BDLDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsOERBQTJDO0FBQzNDLGdFQUEwQztBQUMxQyw0REFBc0M7QUE0QnRDLGlCQUFTLFNBQWUsa0NBQWtDLENBQ3hELFNBQVMsRUFDVCxRQUFRLEdBQUcsRUFBRTs7UUFFYixRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxPQUFPLEVBQUUsNEJBQTRCO1NBQ3RDLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUUzQyxJQUFJLE9BQU8sR0FBRyxNQUFNLHVCQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVoRSxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7UUFFeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNwQyxNQUFNLFlBQVksR0FBRyxjQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0RCxJQUFJLG1CQUFXLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUM7Z0JBQUUsT0FBTztZQUV4RCxNQUFNLE9BQU8sR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUVoRCxNQUFNLFNBQVMsR0FBRyxJQUFJLG1CQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0MsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRWxFLElBQUksQ0FBQyxRQUFRO2dCQUFFLE9BQU87WUFDdEIsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUUzQixNQUFNLElBQUksR0FDUixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUk7Z0JBQ3BCLGtCQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksbUJBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTNELFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLG1DQUMvQyxRQUFRLENBQUMsTUFBTSxLQUNsQixJQUFJLEVBQUUsWUFBWSxHQUNuQixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0NBQUEsQ0FBQyJ9