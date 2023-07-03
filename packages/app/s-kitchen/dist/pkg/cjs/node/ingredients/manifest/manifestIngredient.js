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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const package_1 = require("@coffeekraken/sugar/package");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
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
    add() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const packageJson = (0, package_1.__packageJsonSync)();
            const publicDir = s_sugar_config_1.default.get('storage.src.publicDir');
            if (fs_2.default.existsSync(`${publicDir}/manifest.json`)) {
                const json = (0, fs_1.__readJsonSync)(`${publicDir}/manifest.json`);
                json.short_name = packageJson.name;
                json.name = packageJson.description;
                (0, fs_1.__writeJsonSync)(`${publicDir}/manifest.json`, json);
            }
            else {
                const json = (0, fs_1.__readJsonSync)(`${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/src/data/manifest/manifest.json`);
                json.short_name = packageJson.name;
                json.name = packageJson.description;
                (0, fs_1.__writeJsonSync)(`${publicDir}/manifest.json`, json);
            }
            (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<green>[manifest]</green> Default <cyan>manifest.json</cyan> file addedd <green>successfully</green>`);
            return true;
        });
    },
};
exports.default = manifestIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELCtDQUlnQztBQUNoQyx5REFBZ0U7QUFDaEUsbURBQTREO0FBQzVELDRDQUFzQjtBQUd0Qjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxrQkFBa0IsR0FBd0I7SUFDNUMsRUFBRSxFQUFFLFVBQVU7SUFDZCxXQUFXLEVBQ1AsdUZBQXVGO0lBQzNGLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0lBQ3BDLEdBQUc7OztZQUNMLE1BQU0sV0FBVyxHQUFHLElBQUEsMkJBQWlCLEdBQUUsQ0FBQztZQUV4QyxNQUFNLFNBQVMsR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBRTlELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDL0MsTUFBTSxJQUFJLEdBQUcsSUFBQSxtQkFBYyxFQUFDLEdBQUcsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUMxRCxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztnQkFDcEMsSUFBQSxvQkFBZSxFQUFDLEdBQUcsU0FBUyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2RDtpQkFBTTtnQkFDSCxNQUFNLElBQUksR0FBRyxJQUFBLG1CQUFjLEVBQ3ZCLEdBQUcsSUFBQSx1QkFBZ0IsRUFDZixJQUFBLGNBQVMsR0FBRSxDQUNkLGtDQUFrQyxDQUN0QyxDQUFDO2dCQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO2dCQUNwQyxJQUFBLG9CQUFlLEVBQUMsR0FBRyxTQUFTLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3ZEO1lBRUQsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCxzR0FBc0csQ0FDekcsQ0FBQztZQUVGLE9BQU8sSUFBSSxDQUFDOztLQUNmO0NBQ0osQ0FBQztBQUNGLGtCQUFlLGtCQUFrQixDQUFDIn0=