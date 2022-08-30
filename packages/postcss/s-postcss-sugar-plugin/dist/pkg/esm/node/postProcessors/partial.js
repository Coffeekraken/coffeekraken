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
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
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
                    node.remove();
                    return false;
                }
                else if (node.type === 'comment' &&
                    node.text.trim().match(/SENDPARTIAL:/)) {
                    inPartial = false;
                    node.remove();
                    return false;
                }
                else if (inPartial) {
                    node.remove();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxNQUFNLElBQUksUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTFDLE1BQU0sQ0FBQyxPQUFPLFdBQWlCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFOztRQUNuRSxNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRW5DLHNDQUFzQztRQUN0Qyw0QkFBNEI7UUFDNUIsZ0ZBQWdGO1FBQ2hGLGNBQWM7UUFDZCxJQUFJO1FBRUosTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTVCLE1BQU0sY0FBYyxHQUFHO1lBQ25CLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FDWCxpRkFBaUYsQ0FDcEY7U0FDSixDQUFDO1FBRUYsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzdCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDcEIsY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU5QiwyQkFBMkI7WUFDM0Isc0dBQXNHO1lBQ3RHLG9GQUFvRjtZQUNwRixJQUFJLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztZQUVqQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMvQixnQkFBZ0IsR0FBRyxZQUFZLGdCQUFnQixFQUFFLENBQUM7YUFDckQ7WUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNuQyxnQkFBZ0IsSUFBSSxNQUFNLENBQUM7YUFDOUI7WUFFRCxPQUFPLENBQUMsR0FBRyxDQUNQLDRDQUE0QyxnQkFBZ0Isa0JBQWtCLENBQ2pGLENBQUM7WUFFRixJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssWUFBWSxFQUFFO2dCQUNsQyxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQzthQUNqRDtZQUVELGVBQWUsQ0FDWCxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUksZ0JBQWdCLEVBQUUsRUFDeEMsY0FBYyxDQUNqQixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUU7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FDUCxtRUFBbUUsQ0FDdEUsQ0FBQztZQUVGLDZCQUE2QjtZQUM3QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNwQyxJQUNJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUztvQkFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQ3JDO29CQUNFLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDZCxPQUFPLEtBQUssQ0FBQztpQkFDaEI7cUJBQU0sSUFDSCxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVM7b0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUN4QztvQkFDRSxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2QsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO3FCQUFNLElBQUksU0FBUyxFQUFFO29CQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2QsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUU7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FDUCxnRkFDSSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQ25CLFNBQVMsQ0FDWixDQUFDO1NBQ0w7SUFDTCxDQUFDO0NBQUEifQ==