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
        // exports only for production target
        // if (!settings.exports) {
        //     // console.log(`<yellow>[export]</yellow> Exports <red>disabled</red>`);
        //     return;
        // }
        const css = root.toString();
        // console.log('CSS', root.toString());
        const exportMatches = [
            ...css.matchAll(/\/\*\!\sSEXPORT:([a-zA-Z0-9_\/\.-]+)\s\*\/([\s\S]*)\/\*\!\sSENDEXPORT:([a-zA-Z0-9_\/\.-]+)\s\*\//g),
        ];
        exportMatches.forEach((match) => {
            let exportPath = match[1], exportContent = match[2];
            // generate the output path
            // if a / or a . is found in the exportPath, use as it is,
            // otherwise if it's just an "id" like "welcome", save it into the "css" subdirectory
            let finalExportPath = exportPath;
            if (!finalExportPath.match(/\//)) {
                finalExportPath = `exports/${finalExportPath}`;
            }
            if (!finalExportPath.match(/\.css$/)) {
                finalExportPath += '.css';
            }
            console.log(`<yellow>[export]</yellow> Export "<cyan>${finalExportPath}</cyan>"`);
            if (settings.target === 'production') {
                exportContent = __minify(exportContent).css;
            }
            __writeFileSync(`${settings.outDir}/${finalExportPath}`, exportContent);
        });
        if (exportMatches.length) {
            console.log(`<yellow>[export]</yellow> Purging exported css from main one...`);
            // removing all exported css
            let inExport = false;
            root.nodes = root.nodes.filter((node) => {
                if (node.type === 'comment' && node.text.trim().match(/SEXPORT:/)) {
                    inExport = true;
                    node.remove();
                    return false;
                }
                else if (node.type === 'comment' &&
                    node.text.trim().match(/SENDEXPORT:/)) {
                    inExport = false;
                    node.remove();
                    return false;
                }
                else if (inExport) {
                    node.remove();
                    return false;
                }
                return true;
            });
        }
        if (exportMatches.length) {
            console.log(`<green>[export]</green> Exports saved <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxNQUFNLElBQUksUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTFDLE1BQU0sQ0FBQyxPQUFPLFdBQWlCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFOztRQUNuRSxNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRW5DLHFDQUFxQztRQUNyQywyQkFBMkI7UUFDM0IsK0VBQStFO1FBQy9FLGNBQWM7UUFDZCxJQUFJO1FBRUosTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTVCLHVDQUF1QztRQUV2QyxNQUFNLGFBQWEsR0FBRztZQUNsQixHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQ1gsbUdBQW1HLENBQ3RHO1NBQ0osQ0FBQztRQUVGLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM1QixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ3JCLGFBQWEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0IsMkJBQTJCO1lBQzNCLDBEQUEwRDtZQUMxRCxxRkFBcUY7WUFDckYsSUFBSSxlQUFlLEdBQUcsVUFBVSxDQUFDO1lBRWpDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM5QixlQUFlLEdBQUcsV0FBVyxlQUFlLEVBQUUsQ0FBQzthQUNsRDtZQUNELElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNsQyxlQUFlLElBQUksTUFBTSxDQUFDO2FBQzdCO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDUCwyQ0FBMkMsZUFBZSxVQUFVLENBQ3ZFLENBQUM7WUFFRixJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssWUFBWSxFQUFFO2dCQUNsQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQzthQUMvQztZQUVELGVBQWUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUksZUFBZSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FDUCxpRUFBaUUsQ0FDcEUsQ0FBQztZQUVGLDRCQUE0QjtZQUM1QixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNwQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUMvRCxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2QsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO3FCQUFNLElBQ0gsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTO29CQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFDdkM7b0JBQ0UsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNkLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtxQkFBTSxJQUFJLFFBQVEsRUFBRTtvQkFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNkLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsOEVBQ0ksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixTQUFTLENBQ1osQ0FBQztTQUNMO0lBQ0wsQ0FBQztDQUFBIn0=