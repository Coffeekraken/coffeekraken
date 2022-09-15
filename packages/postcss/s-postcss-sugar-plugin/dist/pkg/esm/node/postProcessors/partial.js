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
    return __awaiter(this, void 0, void 0, function* () {
        const duration = new __SDuration();
        // partials only for production target
        // if (!settings.partials) {
        //     // console.log(`<yellow>[partial]</yellow> Exports <red>disabled</red>`);
        //     return;
        // }
        const css = root.toString();
        const partialMatches = [
            ...css.matchAll(/\/\*\!\sSPARTIAL:([a-zA-Z0-9_\/\.-]+)\s\*\/(((?!\/\*\!\sSENDPARTIAL:)[\s\S])*)/g),
        ];
        partialMatches.forEach((match) => {
            let partialId = match[1], partialContent = match[2];
            // generate the output path
            // if a / or a . is found in the partialId, use as a path and will be stored in the "partials" folder,
            // otherwise if it's just an "id" like "welcome", save it into the "partials" folder
            let finalPartialPath = partialId;
            if (!finalPartialPath.match(/\//)) {
                finalPartialPath = `partials/${finalPartialPath}`;
            }
            if (!finalPartialPath.match(/\.css$/)) {
                finalPartialPath += '.css';
            }
            console.log(`<yellow>[partial]</yellow> Saving "<cyan>${finalPartialPath}</cyan>" partial`);
            if (settings.target === 'production') {
                partialContent = __minify(partialContent).css;
            }
            __writeFileSync(`${settings.outDir}/${finalPartialPath}`, partialContent);
        });
        if (partialMatches.length) {
            console.log(`<yellow>[partial]</yellow> Purging partialed css from main one...`);
            // removing all partialed css
            let inPartial = false;
            root.nodes = root.nodes.filter((node) => {
                if (node.type === 'comment' &&
                    node.text.trim().match(/SPARTIAL:/)) {
                    inPartial = true;
                    // node.remove();
                    return false;
                }
                else if (node.type === 'comment' &&
                    node.text.trim().match(/SENDPARTIAL:/)) {
                    inPartial = false;
                    // node.remove();
                    return false;
                }
                else if (inPartial) {
                    // node.remove();
                    return false;
                }
                return true;
            });
        }
        if (partialMatches.length) {
            console.log(`<green>[partial]</green> Partials saved <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxJQUFJLFFBQVEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUxQyxNQUFNLENBQUMsT0FBTyxXQUFpQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTs7UUFDbkUsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUVuQyxzQ0FBc0M7UUFDdEMsNEJBQTRCO1FBQzVCLGdGQUFnRjtRQUNoRixjQUFjO1FBQ2QsSUFBSTtRQUVKLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU1QixNQUFNLGNBQWMsR0FBRztZQUNuQixHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQ1gsaUZBQWlGLENBQ3BGO1NBQ0osQ0FBQztRQUVGLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM3QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ3BCLGNBQWMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFOUIsMkJBQTJCO1lBQzNCLHNHQUFzRztZQUN0RyxvRkFBb0Y7WUFDcEYsSUFBSSxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7WUFFakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDL0IsZ0JBQWdCLEdBQUcsWUFBWSxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3JEO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDbkMsZ0JBQWdCLElBQUksTUFBTSxDQUFDO2FBQzlCO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDUCw0Q0FBNEMsZ0JBQWdCLGtCQUFrQixDQUNqRixDQUFDO1lBRUYsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLFlBQVksRUFBRTtnQkFDbEMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUM7YUFDakQ7WUFFRCxlQUFlLENBQ1gsR0FBRyxRQUFRLENBQUMsTUFBTSxJQUFJLGdCQUFnQixFQUFFLEVBQ3hDLGNBQWMsQ0FDakIsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsbUVBQW1FLENBQ3RFLENBQUM7WUFFRiw2QkFBNkI7WUFDN0IsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDcEMsSUFDSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVM7b0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUNyQztvQkFDRSxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUNqQixpQkFBaUI7b0JBQ2pCLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtxQkFBTSxJQUNILElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUztvQkFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQ3hDO29CQUNFLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ2xCLGlCQUFpQjtvQkFDakIsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO3FCQUFNLElBQUksU0FBUyxFQUFFO29CQUNsQixpQkFBaUI7b0JBQ2pCLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsZ0ZBQ0ksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixTQUFTLENBQ1osQ0FBQztTQUNMO0lBQ0wsQ0FBQztDQUFBIn0=