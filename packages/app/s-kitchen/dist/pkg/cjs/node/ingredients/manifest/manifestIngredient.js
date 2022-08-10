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
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
const writeJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
const jsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/package/jsonSync"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
/**
 * @name        manifestIngredient
 * @namespace   node.ingredients.manifest
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the "manifest.json" file at the root of your project
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const manifestIngredient = {
    id: 'manifest',
    description: 'Add the default <cyan>manifest.json</cyan> into your <magenta>sugar</magenta> project',
    projectTypes: ['unknown', 'sugar', 'next'],
    add({ ask, log, emit }) {
        return __awaiter(this, void 0, void 0, function* () {
            const packageJson = (0, jsonSync_1.default)();
            const publicDir = s_sugar_config_1.default.get('storage.src.publicDir');
            if (fs_1.default.existsSync(`${publicDir}/manifest.json`)) {
                const json = (0, readJsonSync_1.default)(`${publicDir}/manifest.json`);
                json.short_name = packageJson.name;
                json.name = packageJson.description;
                (0, writeJsonSync_1.default)(`${publicDir}/manifest.json`, json);
            }
            else {
                const json = (0, readJsonSync_1.default)(`${(0, packageRoot_1.default)((0, dirname_1.default)())}/src/data/manifest/manifest.json`);
                json.short_name = packageJson.name;
                json.name = packageJson.description;
                (0, writeJsonSync_1.default)(`${publicDir}/manifest.json`, json);
            }
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<green>[manifest]</green> Default <cyan>manifest.json</cyan> file addedd <green>successfully</green>`,
            });
            return true;
        });
    },
};
exports.default = manifestIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLGtGQUEwRDtBQUMxRCxrRkFBNEQ7QUFDNUQsNEZBQXNFO0FBQ3RFLDhGQUF3RTtBQUN4RSx5RkFBc0U7QUFDdEUsNEZBQXNFO0FBQ3RFLDRDQUFzQjtBQUd0Qjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxrQkFBa0IsR0FBd0I7SUFDNUMsRUFBRSxFQUFFLFVBQVU7SUFDZCxXQUFXLEVBQ1AsdUZBQXVGO0lBQzNGLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0lBQ3BDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFOztZQUN4QixNQUFNLFdBQVcsR0FBRyxJQUFBLGtCQUFhLEdBQUUsQ0FBQztZQUVwQyxNQUFNLFNBQVMsR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBRTlELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDL0MsTUFBTSxJQUFJLEdBQUcsSUFBQSxzQkFBYyxFQUFDLEdBQUcsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUMxRCxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztnQkFDcEMsSUFBQSx1QkFBZSxFQUFDLEdBQUcsU0FBUyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2RDtpQkFBTTtnQkFDSCxNQUFNLElBQUksR0FBRyxJQUFBLHNCQUFjLEVBQ3ZCLEdBQUcsSUFBQSxxQkFBYSxFQUFDLElBQUEsaUJBQVMsR0FBRSxDQUFDLGtDQUFrQyxDQUNsRSxDQUFDO2dCQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO2dCQUNwQyxJQUFBLHVCQUFlLEVBQUMsR0FBRyxTQUFTLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3ZEO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7Z0JBQ3RCLEtBQUssRUFBRSxzR0FBc0c7YUFDaEgsQ0FBQyxDQUFDO1lBRUgsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0osQ0FBQztBQUNGLGtCQUFlLGtCQUFrQixDQUFDIn0=