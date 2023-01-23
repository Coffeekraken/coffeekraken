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
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const path_2 = __importDefault(require("path"));
/**
 * @name        frontspecIngredient
 * @namespace   node.ingredients.frontspec
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the "frontspec.json" file at the root of your project
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const frontspecIngredient = {
    id: 'frontspec',
    description: 'Add the default <cyan>frontspec.json</cyan> file into your <magenta>sugar</magenta> project',
    projectTypes: ['unknown', 'sugar'],
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            const frontspecPath = `${(0, path_1.__packageRootDir)()}/frontspec.json`;
            const sourceJsonPath = path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), 'src/data/frontspec/frontspec.json');
            // copy the file to the project root
            (0, fs_1.__copySync)(sourceJsonPath, frontspecPath);
            console.log(`<green>[frontspec]</green> Default <cyan>frontspec.json</cyan> file addedd <green>successfully</green>`);
            return true;
        });
    },
};
exports.default = frontspecIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQStEO0FBQy9ELG1EQUE0RDtBQUM1RCxnREFBMEI7QUFHMUI7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sbUJBQW1CLEdBQXdCO0lBQzdDLEVBQUUsRUFBRSxXQUFXO0lBQ2YsV0FBVyxFQUNQLDZGQUE2RjtJQUNqRyxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO0lBQzVCLEdBQUc7O1lBQ0wsTUFBTSxhQUFhLEdBQUcsR0FBRyxJQUFBLHVCQUFnQixHQUFFLGlCQUFpQixDQUFDO1lBQzdELE1BQU0sY0FBYyxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQ2pDLElBQUEsdUJBQWdCLEVBQUMsSUFBQSxjQUFTLEdBQUUsQ0FBQyxFQUM3QixtQ0FBbUMsQ0FDdEMsQ0FBQztZQUVGLG9DQUFvQztZQUNwQyxJQUFBLGVBQVUsRUFBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFMUMsT0FBTyxDQUFDLEdBQUcsQ0FDUCx3R0FBd0csQ0FDM0csQ0FBQztZQUVGLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKLENBQUM7QUFDRixrQkFBZSxtQkFBbUIsQ0FBQyJ9