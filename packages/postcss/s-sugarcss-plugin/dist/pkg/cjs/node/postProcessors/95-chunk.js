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
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const fs_1 = require("@coffeekraken/sugar/fs");
const csso_1 = require("csso");
function default_1({ root, sharedData, settings, cacheDir }) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const duration = new s_duration_1.default();
        // check if active in settings
        if (!settings.chunks) {
            return;
        }
        const css = root.toString();
        const chunkMatches = [
            ...css.matchAll(/\/\*\!\sSCHUNK:([a-zA-Z0-9_\/\.-]+)\s\*\/(((?!\/\*\!\sSENDCHUNK:)[\s\S])*)/g),
        ];
        chunkMatches.forEach((match) => {
            var _a;
            let chunkId = match[1], chunkContent = match[2];
            // generate the output path
            // if a / or a . is found in the chunkId, use as a path and will be stored in the "partials" folder,
            // otherwise if it's just an "id" like "welcome", save it into the "partials" folder
            let finalChunkPath = chunkId;
            if (!finalChunkPath.match(/\//)) {
                finalChunkPath = `chunks/${finalChunkPath}`;
            }
            if (!finalChunkPath.match(/\.css$/)) {
                finalChunkPath += '.css';
            }
            (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[chunk]</yellow> Saving "<cyan>${finalChunkPath}</cyan>" chunk`);
            chunkContent = (0, csso_1.minify)(chunkContent).css;
            (0, fs_1.__writeFileSync)(`${settings.outDir}/${finalChunkPath}`, chunkContent);
        });
        if (chunkMatches.length) {
            (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[chunk]</yellow> Purging chunked css from main one...`);
            // removing all partialed css
            let inChunk = false;
            root.nodes = root.nodes.filter((node) => {
                if (node.type === 'comment' && node.text.trim().match(/SCHUNK:/)) {
                    inChunk = true;
                    return false;
                }
                else if (node.type === 'comment' &&
                    node.text.trim().match(/SENDCHUNK:/)) {
                    inChunk = false;
                    return false;
                }
                else if (inChunk) {
                    return false;
                }
                return true;
            });
        }
        if (chunkMatches.length) {
            (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, `<green>[chunk]</green> Chubks saved <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEVBQW1EO0FBQ25ELCtDQUF5RDtBQUN6RCwrQkFBMEM7QUFFMUMsbUJBQStCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFOzs7UUFDbkUsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7UUFDbkMsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ2xCLE9BQU87U0FDVjtRQUNELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixNQUFNLFlBQVksR0FBRztZQUNqQixHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQ1gsNkVBQTZFLENBQ2hGO1NBQ0osQ0FBQztRQUNGLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7WUFDM0IsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUNsQixZQUFZLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLDJCQUEyQjtZQUMzQixvR0FBb0c7WUFDcEcsb0ZBQW9GO1lBQ3BGLElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQztZQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDN0IsY0FBYyxHQUFHLFVBQVUsY0FBYyxFQUFFLENBQUM7YUFDL0M7WUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDakMsY0FBYyxJQUFJLE1BQU0sQ0FBQzthQUM1QjtZQUNELE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gsMENBQTBDLGNBQWMsZ0JBQWdCLENBQzNFLENBQUM7WUFDRixZQUFZLEdBQUcsSUFBQSxhQUFRLEVBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQzFDLElBQUEsb0JBQWUsRUFBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUksY0FBYyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDMUUsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDckIsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCwrREFBK0QsQ0FDbEUsQ0FBQztZQUNGLDZCQUE2QjtZQUM3QixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNwQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUM5RCxPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUNmLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtxQkFBTSxJQUNILElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUztvQkFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQ3RDO29CQUNFLE9BQU8sR0FBRyxLQUFLLENBQUM7b0JBQ2hCLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtxQkFBTSxJQUFJLE9BQU8sRUFBRTtvQkFDaEIsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDckIsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCw0RUFDSSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQ25CLFNBQVMsQ0FDWixDQUFDO1NBQ0w7O0NBQ0o7QUE1REQsNEJBNERDIn0=