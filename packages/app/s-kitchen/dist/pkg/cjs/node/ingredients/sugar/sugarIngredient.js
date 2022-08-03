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
const prependToFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/prependToFileSync"));
const install_1 = __importDefault(require("@coffeekraken/sugar/node/npm/install"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
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
            const rootPath = (0, packageRoot_1.default)(process.cwd());
            // installing the actual package
            emit('log', {
                value: `<yellow>sugar</yellow> Installing the actual <cyan>@coffeekraken/sugar</cyan>...`,
            });
            try {
                yield pipe((0, install_1.default)('@coffeekraken/sugar'));
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
                        fs_1.default.writeFileSync(`${rootPath}/pages/_sugar.ts`, [
                            `import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';`,
                            `if (typeof window === 'object') {`,
                            `   __expandPleasantCssClassnamesLive();`,
                            `}`,
                        ].join('\n'));
                        // adding the≤ import in the _app.tsx file
                        (0, prependToFileSync_1.default)(`${rootPath}/pages/_app.tsx`, ["import './_sugar';"].join('\n'));
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
exports.default = sugarIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0dBQWdGO0FBQ2hGLG1GQUFnRTtBQUNoRSw0RkFBc0U7QUFDdEUsNENBQXNCO0FBR3RCOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSxlQUFlLEdBQXdCO0lBQ3pDLEVBQUUsRUFBRSxPQUFPO0lBQ1gsV0FBVyxFQUNQLHNFQUFzRTtJQUMxRSxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO0lBQzVCLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7O1lBQ3ZDLE1BQU0sUUFBUSxHQUFHLElBQUEscUJBQWEsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUU5QyxnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsa0ZBQWtGO2FBQzVGLENBQUMsQ0FBQztZQUNILElBQUk7Z0JBQ0EsTUFBTSxJQUFJLENBQUMsSUFBQSxpQkFBWSxFQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQzthQUNuRDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLDJIQUEySDtpQkFDckksQ0FBQyxDQUFDO2FBQ047WUFFRCxzQkFBc0I7WUFDdEIsSUFDSSxNQUFNLEdBQUcsQ0FBQztnQkFDTixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsc0RBQXNEO2dCQUMvRCxPQUFPLEVBQUUsSUFBSTthQUNoQixDQUFDLEVBQ0o7Z0JBQ0UsaUVBQWlFO2dCQUVqRSxRQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO29CQUM5QixLQUFLLE1BQU07d0JBQ1AsdUJBQXVCO3dCQUN2QixZQUFJLENBQUMsYUFBYSxDQUNkLEdBQUcsUUFBUSxrQkFBa0IsRUFDN0I7NEJBQ0ksOEdBQThHOzRCQUM5RyxtQ0FBbUM7NEJBQ25DLHlDQUF5Qzs0QkFDekMsR0FBRzt5QkFDTixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDZixDQUFDO3dCQUNGLDBDQUEwQzt3QkFDMUMsSUFBQSwyQkFBbUIsRUFDZixHQUFHLFFBQVEsaUJBQWlCLEVBQzVCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3BDLENBQUM7d0JBQ0YsTUFBTTtpQkFDYjthQUNKO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsdUZBQXVGO2FBQ2pHLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKLENBQUM7QUFDRixrQkFBZSxlQUFlLENBQUMifQ==