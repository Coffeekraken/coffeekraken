var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SDuration from '@coffeekraken/s-duration';
import { __writeFileSync } from '@coffeekraken/sugar/fs';
import { minify as __minify } from 'csso';
export default function ({ root, sharedData, settings, cacheDir }) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const duration = new __SDuration();
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
            chunkContent = __minify(chunkContent).css;
            __writeFileSync(`${settings.outDir}/${finalChunkPath}`, chunkContent);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxJQUFJLFFBQVEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUxQyxNQUFNLENBQUMsT0FBTyxXQUFpQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTs7O1FBQ25FLE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDbkMsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ2xCLE9BQU87U0FDVjtRQUNELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixNQUFNLFlBQVksR0FBRztZQUNqQixHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQ1gsNkVBQTZFLENBQ2hGO1NBQ0osQ0FBQztRQUNGLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7WUFDM0IsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUNsQixZQUFZLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLDJCQUEyQjtZQUMzQixvR0FBb0c7WUFDcEcsb0ZBQW9GO1lBQ3BGLElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQztZQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDN0IsY0FBYyxHQUFHLFVBQVUsY0FBYyxFQUFFLENBQUM7YUFDL0M7WUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDakMsY0FBYyxJQUFJLE1BQU0sQ0FBQzthQUM1QjtZQUNELE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gsMENBQTBDLGNBQWMsZ0JBQWdCLENBQzNFLENBQUM7WUFDRixZQUFZLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUMxQyxlQUFlLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxJQUFJLGNBQWMsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQ3JCLE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gsK0RBQStELENBQ2xFLENBQUM7WUFDRiw2QkFBNkI7WUFDN0IsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDcEMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDOUQsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDZixPQUFPLEtBQUssQ0FBQztpQkFDaEI7cUJBQU0sSUFDSCxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVM7b0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUN0QztvQkFDRSxPQUFPLEdBQUcsS0FBSyxDQUFDO29CQUNoQixPQUFPLEtBQUssQ0FBQztpQkFDaEI7cUJBQU0sSUFBSSxPQUFPLEVBQUU7b0JBQ2hCLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQ3JCLE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gsNEVBQ0ksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixTQUFTLENBQ1osQ0FBQztTQUNMOztDQUNKIn0=