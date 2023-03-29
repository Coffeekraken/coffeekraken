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
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const SI18n_1 = __importDefault(require("../shared/SI18n"));
const SI18nExtractParamsInterface_1 = __importDefault(require("./interface/SI18nExtractParamsInterface"));
const typescript_1 = __importDefault(require("typescript"));
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const path_2 = __importDefault(require("path"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
class SI18n extends SI18n_1.default {
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
        super((0, object_1.__deepMerge)({}, settings));
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
            const finalParams = SI18nExtractParamsInterface_1.default.apply(params);
            const duration = new s_duration_1.default();
            console.log(`<yellow>[extract]</yellow> i18n extraction starting...`);
            const files = s_glob_1.default.resolveSync(finalParams.glob, {
                cwd: (0, path_1.__packageRootDir)(),
            });
            console.log(`<yellow>[extract]</yellow> <cyan>${files.length}</cyan> file${files.length > 1 ? 's' : ''} found`);
            let i18n = {};
            // recursive function that process each nodes
            function delintNode(node) {
                var _a;
                if (node.kind === typescript_1.default.SyntaxKind.CallExpression) {
                    let text = node.getFullText().trim();
                    if (text.startsWith('__i18n')) {
                        // make sure that the text is not on the same line as the
                        const id = (_a = text.match(/id:\s?('|"|`)(.+)('|"|`)/)) === null || _a === void 0 ? void 0 : _a[2], string = node.arguments[0].text;
                        // set the translation in the i18n object
                        i18n[id !== null && id !== void 0 ? id : string] = string;
                    }
                }
                // process every child nodes
                typescript_1.default.forEachChild(node, delintNode);
            }
            // loop on each founded files to process them
            files.forEach((file) => {
                const sourceFile = typescript_1.default.createSourceFile('foo.ts', file.raw, typescript_1.default.ScriptTarget.ES5, true);
                delintNode(sourceFile);
            });
            // sort the i18n by keys
            i18n = (0, object_1.__sort)(i18n);
            // writing the file on the disk
            (0, fs_1.__writeJsonSync)(`${finalParams.outDir}/${finalParams.fileName}`, i18n);
            console.log(`<green>[extract]</green> i18n extraction complete <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>!`);
            console.log(`<green>[extract]</green> Your i18n file has been saved here "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), `${finalParams.outDir}/${finalParams.fileName}`)}</cyan>"`);
            resolve();
        }));
    }
}
exports.default = SI18n;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDBFQUFtRDtBQUNuRCw0REFBc0M7QUFFdEMsMEdBQW9GO0FBRXBGLDREQUE4QjtBQUU5QiwrQ0FBeUQ7QUFDekQsdURBQWlFO0FBQ2pFLG1EQUE0RDtBQUU1RCxnREFBMEI7QUFFMUIsa0VBQTJDO0FBMEMzQyxNQUFxQixLQUFNLFNBQVEsZUFBTztJQUN0Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3JCLEtBQUssQ0FBQyxJQUFBLG9CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE9BQU8sQ0FDSCxNQUFvQztRQUVwQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3pDLE1BQU0sV0FBVyxHQUNiLHFDQUE2QixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVoRCxNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFXLEVBQUUsQ0FBQztZQUVuQyxPQUFPLENBQUMsR0FBRyxDQUNQLHdEQUF3RCxDQUMzRCxDQUFDO1lBRUYsTUFBTSxLQUFLLEdBQUcsZ0JBQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDaEQsR0FBRyxFQUFFLElBQUEsdUJBQWdCLEdBQUU7YUFDMUIsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FDUCxvQ0FBb0MsS0FBSyxDQUFDLE1BQU0sZUFDNUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDN0IsUUFBUSxDQUNYLENBQUM7WUFFRixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFFZCw2Q0FBNkM7WUFDN0MsU0FBUyxVQUFVLENBQUMsSUFBZTs7Z0JBQy9CLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxvQkFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUU7b0JBQzlDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDckMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO3dCQUMzQix5REFBeUQ7d0JBQ3pELE1BQU0sRUFBRSxHQUFHLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQywwQ0FBRyxDQUFDLENBQUMsRUFDbEQsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUVwQyx5Q0FBeUM7d0JBQ3pDLElBQUksQ0FBQyxFQUFFLGFBQUYsRUFBRSxjQUFGLEVBQUUsR0FBSSxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7cUJBQy9CO2lCQUNKO2dCQUVELDRCQUE0QjtnQkFDNUIsb0JBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3hDLENBQUM7WUFFRCw2Q0FBNkM7WUFDN0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNuQixNQUFNLFVBQVUsR0FBRyxvQkFBSSxDQUFDLGdCQUFnQixDQUNwQyxRQUFRLEVBQ1IsSUFBSSxDQUFDLEdBQUcsRUFDUixvQkFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQ3JCLElBQUksQ0FDUCxDQUFDO2dCQUNGLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztZQUVILHdCQUF3QjtZQUN4QixJQUFJLEdBQUcsSUFBQSxlQUFNLEVBQUMsSUFBSSxDQUFDLENBQUM7WUFFcEIsK0JBQStCO1lBQy9CLElBQUEsb0JBQWUsRUFDWCxHQUFHLFdBQVcsQ0FBQyxNQUFNLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUMvQyxJQUFJLENBQ1AsQ0FBQztZQUVGLE9BQU8sQ0FBQyxHQUFHLENBQ1AsNEZBQ0ksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixZQUFZLENBQ2YsQ0FBQztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQ1Asc0VBQXNFLGNBQU0sQ0FBQyxRQUFRLENBQ2pGLElBQUEsdUJBQWdCLEdBQUUsRUFDbEIsR0FBRyxXQUFXLENBQUMsTUFBTSxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FDbEQsVUFBVSxDQUNkLENBQUM7WUFFRixPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUF2R0Qsd0JBdUdDIn0=