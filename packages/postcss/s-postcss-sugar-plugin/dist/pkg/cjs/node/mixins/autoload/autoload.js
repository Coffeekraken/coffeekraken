"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const npm_1 = require("@coffeekraken/sugar/npm");
const path_1 = require("@coffeekraken/sugar/path");
const filehound_1 = __importDefault(require("filehound"));
const fs_1 = __importDefault(require("fs"));
/**
 * @name          autoload
 * @namespace     node.mixin.autoload
 * @type          PostcssMixin
 * @platform      postcss
 * @status        wip
 *
 * This mixin allows you to autoload all the "autoload.css" files found in the
 * packages installed in the "node_modules" folder.
 * This is usefull to load dependencies css like for the s-appear package, etc...
 *
 * @return      {Css}                   The generated css
 *
 * @example       css
 * @s.autoload;
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginAutoloadMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            glob: {
                type: 'String',
                description: 'Specify a glob of the files you want to autoload',
                default: 'autoload.css',
            },
            depth: {
                type: 'Number',
                description: 'Specify the depth of the search relative to the node_modules folder. Higher you set this, slower it will be...',
                default: 4,
            },
        };
    }
}
exports.interface = postcssSugarPluginAutoloadMixinInterface;
function default_1({ params, atRule, CssVars, getRoot, postcssApi, replaceWith, }) {
    const finalParams = Object.assign({ glob: 'autoload.css', depth: 4 }, params);
    const vars = new CssVars();
    const globalNodeModulesPath = (0, npm_1.__globalNodeModulesPath)(), monoNodeModulesPath = `${(0, path_1.__packageRootDir)(process.cwd(), {
        highest: true,
    })}/node_modules`, packageNodeModulesPath = `${(0, path_1.__packageRootDir)()}/node_modules`;
    // build an array with all the folders in which to search for file
    const foldersPaths = [];
    if (fs_1.default.existsSync(packageNodeModulesPath)) {
        foldersPaths.push(packageNodeModulesPath);
    }
    if (fs_1.default.existsSync(monoNodeModulesPath)) {
        foldersPaths.push(monoNodeModulesPath);
    }
    if (fs_1.default.existsSync(globalNodeModulesPath)) {
        foldersPaths.push(globalNodeModulesPath);
    }
    const files = filehound_1.default
        .create()
        .paths(...foldersPaths)
        .ext('css')
        .glob(finalParams.glob)
        .depth(finalParams.depth)
        .findSync();
    if (!files || !files.length) {
        return vars;
    }
    // add the import in the root nodes
    const root = getRoot(atRule);
    files.forEach((filePath) => {
        console.log('ADD', filePath);
        root.nodes.unshift(postcssApi.parse(`@import url("${filePath}");`));
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxpREFBa0U7QUFDbEUsbURBQTREO0FBQzVELDBEQUFvQztBQUNwQyw0Q0FBc0I7QUFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUVILE1BQU0sd0NBQXlDLFNBQVEscUJBQVk7SUFDL0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsa0RBQWtEO2dCQUMvRCxPQUFPLEVBQUUsY0FBYzthQUMxQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsZ0hBQWdIO2dCQUNwSCxPQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU9vRCw2REFBUztBQUU5RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsT0FBTyxFQUNQLFVBQVUsRUFDVixXQUFXLEdBUWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLGNBQWMsRUFDcEIsS0FBSyxFQUFFLENBQUMsSUFDTCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxxQkFBcUIsR0FBRyxJQUFBLDZCQUF1QixHQUFFLEVBQ25ELG1CQUFtQixHQUFHLEdBQUcsSUFBQSx1QkFBZ0IsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDckQsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxlQUFlLEVBQ2pCLHNCQUFzQixHQUFHLEdBQUcsSUFBQSx1QkFBZ0IsR0FBRSxlQUFlLENBQUM7SUFFbEUsa0VBQWtFO0lBQ2xFLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUN4QixJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsRUFBRTtRQUN6QyxZQUFZLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7S0FDN0M7SUFDRCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsRUFBRTtRQUN0QyxZQUFZLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7S0FDMUM7SUFDRCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBRTtRQUN4QyxZQUFZLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7S0FDNUM7SUFFRCxNQUFNLEtBQUssR0FBRyxtQkFBVztTQUNwQixNQUFNLEVBQUU7U0FDUixLQUFLLENBQUMsR0FBRyxZQUFZLENBQUM7U0FDdEIsR0FBRyxDQUFDLEtBQUssQ0FBQztTQUNWLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1NBQ3RCLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1NBQ3hCLFFBQVEsRUFBRSxDQUFDO0lBRWhCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxtQ0FBbUM7SUFDbkMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGdCQUFnQixRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBN0RELDRCQTZEQyJ9