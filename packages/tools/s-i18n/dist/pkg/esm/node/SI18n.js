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
import __SDuration from '@coffeekraken/s-duration';
import __SI18n from '../shared/SI18n';
import __SI18nExtractParamsInterface from './interface/SI18nExtractParamsInterface';
import __ts from 'typescript';
import { __writeJsonSync } from '@coffeekraken/sugar/fs';
import { __deepMerge, __sort } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';
import __SGlob from '@coffeekraken/s-glob';
export default class SI18n extends __SI18n {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(settings = {}) {
        super(__deepMerge({}, settings));
    }
    /**
     * @name            extract
     * @type            Function
     * @async
     *
     * This async method allows you to extract all the translations from your codebase.
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    extract(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = __SI18nExtractParamsInterface.apply(params);
            const duration = new __SDuration();
            console.log(`<yellow>[extract]</yellow> i18n extraction starting...`);
            const files = __SGlob.resolveSync(finalParams.glob, {
                cwd: __packageRootDir(),
            });
            console.log(`<yellow>[extract]</yellow> <cyan>${files.length}</cyan> file${files.length > 1 ? 's' : ''} found`);
            let i18n = {};
            // recursive function that process each nodes
            function delintNode(node) {
                var _a;
                if (node.kind === __ts.SyntaxKind.CallExpression) {
                    let text = node.getFullText().trim();
                    if (text.startsWith('__i18n')) {
                        // make sure that the text is not on the same line as the
                        const id = (_a = text.match(/id:\s?('|"|`)(.+)('|"|`)/)) === null || _a === void 0 ? void 0 : _a[2], string = node.arguments[0].text;
                        // set the translation in the i18n object
                        i18n[id !== null && id !== void 0 ? id : string] = string;
                    }
                }
                // process every child nodes
                __ts.forEachChild(node, delintNode);
            }
            // loop on each founded files to process them
            files.forEach((file) => {
                const sourceFile = __ts.createSourceFile('foo.ts', file.raw, __ts.ScriptTarget.ES5, true);
                delintNode(sourceFile);
            });
            // sort the i18n by keys
            i18n = __sort(i18n);
            // writing the file on the disk
            __writeJsonSync(`${finalParams.outDir}/${finalParams.fileName}`, i18n);
            console.log(`<green>[extract]</green> i18n extraction complete <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>!`);
            console.log(`<green>[extract]</green> Your i18n file has been saved here "<cyan>${__path.relative(__packageRootDir(), `${finalParams.outDir}/${finalParams.fileName}`)}</cyan>"`);
            resolve();
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUV0QyxPQUFPLDZCQUE2QixNQUFNLHlDQUF5QyxDQUFDO0FBRXBGLE9BQU8sSUFBSSxNQUFNLFlBQVksQ0FBQztBQUU5QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUEwQzNDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sS0FBTSxTQUFRLE9BQU87SUFDdEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUNyQixLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxPQUFPLENBQ0gsTUFBb0M7UUFFcEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN6QyxNQUFNLFdBQVcsR0FDYiw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFaEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUVuQyxPQUFPLENBQUMsR0FBRyxDQUNQLHdEQUF3RCxDQUMzRCxDQUFDO1lBRUYsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO2dCQUNoRCxHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7YUFDMUIsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FDUCxvQ0FBb0MsS0FBSyxDQUFDLE1BQU0sZUFDNUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDN0IsUUFBUSxDQUNYLENBQUM7WUFFRixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFFZCw2Q0FBNkM7WUFDN0MsU0FBUyxVQUFVLENBQUMsSUFBZTs7Z0JBQy9CLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRTtvQkFDOUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNyQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7d0JBQzNCLHlEQUF5RDt3QkFDekQsTUFBTSxFQUFFLEdBQUcsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLDBDQUFHLENBQUMsQ0FBQyxFQUNsRCxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBRXBDLHlDQUF5Qzt3QkFDekMsSUFBSSxDQUFDLEVBQUUsYUFBRixFQUFFLGNBQUYsRUFBRSxHQUFJLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztxQkFDL0I7aUJBQ0o7Z0JBRUQsNEJBQTRCO2dCQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN4QyxDQUFDO1lBRUQsNkNBQTZDO1lBQzdDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDbkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUNwQyxRQUFRLEVBQ1IsSUFBSSxDQUFDLEdBQUcsRUFDUixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFDckIsSUFBSSxDQUNQLENBQUM7Z0JBQ0YsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1lBRUgsd0JBQXdCO1lBQ3hCLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFcEIsK0JBQStCO1lBQy9CLGVBQWUsQ0FDWCxHQUFHLFdBQVcsQ0FBQyxNQUFNLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUMvQyxJQUFJLENBQ1AsQ0FBQztZQUVGLE9BQU8sQ0FBQyxHQUFHLENBQ1AsNEZBQ0ksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixZQUFZLENBQ2YsQ0FBQztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQ1Asc0VBQXNFLE1BQU0sQ0FBQyxRQUFRLENBQ2pGLGdCQUFnQixFQUFFLEVBQ2xCLEdBQUcsV0FBVyxDQUFDLE1BQU0sSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQ2xELFVBQVUsQ0FDZCxDQUFDO1lBRUYsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKIn0=