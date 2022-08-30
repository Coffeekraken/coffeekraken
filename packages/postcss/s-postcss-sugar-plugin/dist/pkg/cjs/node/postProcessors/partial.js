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
const writeFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFileSync"));
const csso_1 = require("csso");
function default_1({ root, sharedData, settings, cacheDir }) {
    return __awaiter(this, void 0, void 0, function* () {
        const duration = new s_duration_1.default();
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
                partialContent = (0, csso_1.minify)(partialContent).css;
            }
            (0, writeFileSync_1.default)(`${settings.outDir}/${finalPartialPath}`, partialContent);
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEVBQW1EO0FBQ25ELDhGQUF3RTtBQUN4RSwrQkFBMEM7QUFFMUMsbUJBQStCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFOztRQUNuRSxNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFXLEVBQUUsQ0FBQztRQUVuQyxzQ0FBc0M7UUFDdEMsNEJBQTRCO1FBQzVCLGdGQUFnRjtRQUNoRixjQUFjO1FBQ2QsSUFBSTtRQUVKLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU1QixNQUFNLGNBQWMsR0FBRztZQUNuQixHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQ1gsaUZBQWlGLENBQ3BGO1NBQ0osQ0FBQztRQUVGLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM3QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ3BCLGNBQWMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFOUIsMkJBQTJCO1lBQzNCLHNHQUFzRztZQUN0RyxvRkFBb0Y7WUFDcEYsSUFBSSxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7WUFFakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDL0IsZ0JBQWdCLEdBQUcsWUFBWSxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3JEO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDbkMsZ0JBQWdCLElBQUksTUFBTSxDQUFDO2FBQzlCO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDUCw0Q0FBNEMsZ0JBQWdCLGtCQUFrQixDQUNqRixDQUFDO1lBRUYsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLFlBQVksRUFBRTtnQkFDbEMsY0FBYyxHQUFHLElBQUEsYUFBUSxFQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQzthQUNqRDtZQUVELElBQUEsdUJBQWUsRUFDWCxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUksZ0JBQWdCLEVBQUUsRUFDeEMsY0FBYyxDQUNqQixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUU7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FDUCxtRUFBbUUsQ0FDdEUsQ0FBQztZQUVGLDZCQUE2QjtZQUM3QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNwQyxJQUNJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUztvQkFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQ3JDO29CQUNFLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDZCxPQUFPLEtBQUssQ0FBQztpQkFDaEI7cUJBQU0sSUFDSCxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVM7b0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUN4QztvQkFDRSxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2QsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO3FCQUFNLElBQUksU0FBUyxFQUFFO29CQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2QsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUU7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FDUCxnRkFDSSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQ25CLFNBQVMsQ0FDWixDQUFDO1NBQ0w7SUFDTCxDQUFDO0NBQUE7QUFuRkQsNEJBbUZDIn0=