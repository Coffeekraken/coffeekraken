"use strict";
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
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const directory_1 = __importDefault(require("@coffeekraken/sugar/node/is/directory"));
const express_1 = __importDefault(require("express"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
function rootFiles(express, settings, config) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const packageRoot = (0, packageRoot_1.default)();
        const files = fs_1.default.readdirSync(packageRoot);
        emit('log', {
            value: `<yellow>[rootFiles]</yellow> Exposing <magenta>${files.length}</magenta> root file(s)`,
        });
        files.forEach((fileName) => {
            const filePath = `${packageRoot}/${fileName}`;
            if ((0, directory_1.default)(filePath))
                return;
            if (['docmap.json', 'package.json'].includes(fileName))
                return;
            // emit('log', {
            //     value: `<yellow>[rootFiles]</yellow> Exposing file "<yellow>${fileName}</yellow>"`,
            // });
            express.get(`/${fileName}`, express_1.default.static(packageRoot, {
                index: fileName,
            }));
        });
        resolve(true);
    }), {
        metas: {
            id: 'SFrontendServer',
        },
    });
}
exports.default = rootFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEZBQXNFO0FBQ3RFLDRDQUFzQjtBQUN0QixzRkFBa0U7QUFDbEUsc0RBQWdDO0FBQ2hDLHdFQUFpRDtBQUVqRCxTQUF3QixTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNO0lBQ3ZELE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN0QyxNQUFNLFdBQVcsR0FBRyxJQUFBLHFCQUFhLEdBQUUsQ0FBQztRQUNwQyxNQUFNLEtBQUssR0FBRyxZQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixLQUFLLEVBQUUsa0RBQWtELEtBQUssQ0FBQyxNQUFNLHlCQUF5QjtTQUNqRyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDdkIsTUFBTSxRQUFRLEdBQUcsR0FBRyxXQUFXLElBQUksUUFBUSxFQUFFLENBQUM7WUFDOUMsSUFBSSxJQUFBLG1CQUFhLEVBQUMsUUFBUSxDQUFDO2dCQUFFLE9BQU87WUFDcEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUFFLE9BQU87WUFDL0QsZ0JBQWdCO1lBQ2hCLDBGQUEwRjtZQUMxRixNQUFNO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FDUCxJQUFJLFFBQVEsRUFBRSxFQUNkLGlCQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtnQkFDMUIsS0FBSyxFQUFFLFFBQVE7YUFDbEIsQ0FBQyxDQUNMLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUEsRUFDRDtRQUNJLEtBQUssRUFBRTtZQUNILEVBQUUsRUFBRSxpQkFBaUI7U0FDeEI7S0FDSixDQUNKLENBQUM7QUFDTixDQUFDO0FBakNELDRCQWlDQyJ9