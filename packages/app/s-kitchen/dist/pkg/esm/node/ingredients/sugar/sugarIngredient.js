var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __prependToFileSync from '@coffeekraken/sugar/node/fs/prependToFileSync';
import __npmInstall from '@coffeekraken/sugar/node/npm/install';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fs from 'fs';
/**
 * @name        sugarIngredient
 * @namespace   node.ingredients.manifest
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the sugar toolkit integration into your project. It will:
 *
 * 1. Install the toolkit
 * 2. Create some base files
 * 3. Add support for "pleasant css syntax"
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const sugarIngredient = {
    id: 'sugar',
    description: 'Add the <yellow>@coffeekraken/sugar</yellow> package to your project',
    projectTypes: ['unknown', 'sugar'],
    add({ ask, log, emit, pipe, context }) {
        return __awaiter(this, void 0, void 0, function* () {
            const rootPath = __packageRoot(process.cwd());
            // installing the actual package
            emit('log', {
                value: `<yellow>sugar</yellow> Installing the actual <cyan>@coffeekraken/sugar</cyan>...`,
            });
            try {
                yield pipe(__npmInstall('@coffeekraken/sugar'));
            }
            catch (e) {
                emit('log', {
                    value: `<red>sugar</red> Something went wrong when installing the @coffeekraken/sugar package. Please try to install it manually.`,
                });
            }
            // pleasant css syntax
            if (yield ask({
                type: 'confirm',
                message: `Add the <yellow>pleasant css syntax</yellow> support`,
                default: true,
            })) {
                // @TODO            Finish next integration and add "generic" one
                switch (context.projectType.type) {
                    case 'next':
                        // adding the js needed
                        __fs.writeFileSync(`${rootPath}/pages/_sugar.ts`, [
                            `import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';`,
                            `if (typeof window === 'object') {`,
                            `   __expandPleasantCssClassnamesLive();`,
                            `}`,
                        ].join('\n'));
                        // adding the≤ import in the _app.tsx file
                        __prependToFileSync(`${rootPath}/pages/_app.tsx`, ["import './_sugar';"].join('\n'));
                        break;
                }
            }
            emit('log', {
                value: `<yellow>[sugar]</yellow> Added <green>successfully</green> in your project. Have fun!`,
            });
            return true;
        });
    },
};
export default sugarIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sbUJBQW1CLE1BQU0sK0NBQStDLENBQUM7QUFDaEYsT0FBTyxZQUFZLE1BQU0sc0NBQXNDLENBQUM7QUFDaEUsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBR3RCOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSxlQUFlLEdBQXdCO0lBQ3pDLEVBQUUsRUFBRSxPQUFPO0lBQ1gsV0FBVyxFQUNQLHNFQUFzRTtJQUMxRSxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO0lBQzVCLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7O1lBQ3ZDLE1BQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUU5QyxnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsa0ZBQWtGO2FBQzVGLENBQUMsQ0FBQztZQUNILElBQUk7Z0JBQ0EsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQzthQUNuRDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLDJIQUEySDtpQkFDckksQ0FBQyxDQUFDO2FBQ047WUFFRCxzQkFBc0I7WUFDdEIsSUFDSSxNQUFNLEdBQUcsQ0FBQztnQkFDTixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsc0RBQXNEO2dCQUMvRCxPQUFPLEVBQUUsSUFBSTthQUNoQixDQUFDLEVBQ0o7Z0JBQ0UsaUVBQWlFO2dCQUVqRSxRQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO29CQUM5QixLQUFLLE1BQU07d0JBQ1AsdUJBQXVCO3dCQUN2QixJQUFJLENBQUMsYUFBYSxDQUNkLEdBQUcsUUFBUSxrQkFBa0IsRUFDN0I7NEJBQ0ksOEdBQThHOzRCQUM5RyxtQ0FBbUM7NEJBQ25DLHlDQUF5Qzs0QkFDekMsR0FBRzt5QkFDTixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDZixDQUFDO3dCQUNGLDBDQUEwQzt3QkFDMUMsbUJBQW1CLENBQ2YsR0FBRyxRQUFRLGlCQUFpQixFQUM1QixDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNwQyxDQUFDO3dCQUNGLE1BQU07aUJBQ2I7YUFDSjtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLHVGQUF1RjthQUNqRyxDQUFDLENBQUM7WUFFSCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7Q0FDSixDQUFDO0FBQ0YsZUFBZSxlQUFlLENBQUMifQ==