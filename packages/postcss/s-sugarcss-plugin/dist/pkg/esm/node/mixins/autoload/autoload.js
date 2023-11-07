import __SInterface from '@coffeekraken/s-interface';
import { __globalNodeModulesPath } from '@coffeekraken/sugar/npm';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __filehound from 'filehound';
import __fs from 'fs';
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
class SSugarcssPluginAutoloadMixinInterface extends __SInterface {
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
export { SSugarcssPluginAutoloadMixinInterface as interface };
export default function ({ params, atRule, CssVars, getRoot, postcssApi, replaceWith, }) {
    const finalParams = Object.assign({ glob: 'autoload.css', depth: 4 }, params);
    const vars = new CssVars();
    const globalNodeModulesPath = __globalNodeModulesPath(), monoNodeModulesPath = `${__packageRootDir(process.cwd(), {
        highest: true,
    })}/node_modules`, packageNodeModulesPath = `${__packageRootDir()}/node_modules`;
    // build an array with all the folders in which to search for file
    const foldersPaths = [];
    if (__fs.existsSync(packageNodeModulesPath)) {
        foldersPaths.push(packageNodeModulesPath);
    }
    if (__fs.existsSync(monoNodeModulesPath)) {
        foldersPaths.push(monoNodeModulesPath);
    }
    if (__fs.existsSync(globalNodeModulesPath)) {
        foldersPaths.push(globalNodeModulesPath);
    }
    const files = __filehound
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUVILE1BQU0scUNBQXNDLFNBQVEsWUFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxrREFBa0Q7Z0JBQy9ELE9BQU8sRUFBRSxjQUFjO2FBQzFCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxnSEFBZ0g7Z0JBQ3BILE9BQU8sRUFBRSxDQUFDO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT0QsT0FBTyxFQUFFLHFDQUFxQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTlELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsT0FBTyxFQUNQLFVBQVUsRUFDVixXQUFXLEdBUWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLGNBQWMsRUFDcEIsS0FBSyxFQUFFLENBQUMsSUFDTCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxxQkFBcUIsR0FBRyx1QkFBdUIsRUFBRSxFQUNuRCxtQkFBbUIsR0FBRyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNyRCxPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDLGVBQWUsRUFDakIsc0JBQXNCLEdBQUcsR0FBRyxnQkFBZ0IsRUFBRSxlQUFlLENBQUM7SUFFbEUsa0VBQWtFO0lBQ2xFLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUN4QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsRUFBRTtRQUN6QyxZQUFZLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7S0FDN0M7SUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsRUFBRTtRQUN0QyxZQUFZLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7S0FDMUM7SUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBRTtRQUN4QyxZQUFZLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7S0FDNUM7SUFFRCxNQUFNLEtBQUssR0FBRyxXQUFXO1NBQ3BCLE1BQU0sRUFBRTtTQUNSLEtBQUssQ0FBQyxHQUFHLFlBQVksQ0FBQztTQUN0QixHQUFHLENBQUMsS0FBSyxDQUFDO1NBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7U0FDdEIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7U0FDeEIsUUFBUSxFQUFFLENBQUM7SUFFaEIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDekIsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVELG1DQUFtQztJQUNuQyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==