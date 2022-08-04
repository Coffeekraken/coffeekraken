"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const filename_1 = __importDefault(require("@coffeekraken/sugar/node/fs/filename"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class postcssSugarPluginIconFsMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            path: {
                type: 'String',
                required: true,
            },
            as: {
                type: 'String',
            },
        };
    }
}
exports.interface = postcssSugarPluginIconFsMixinInterface;
function default_1({ params, atRule, replaceWith, sourcePath, sharedData, }) {
    const finalParams = Object.assign({ path: '', as: '' }, params);
    if (!sharedData.icons) {
        sharedData.icons = [];
    }
    let as = finalParams.as;
    if (!as) {
        as = (0, filename_1.default)(iconPath.split('.').slice(0, -1).join('.'));
    }
    // reading the icon file
    const potentialFilePathFromRoot = path_1.default.resolve((0, packageRoot_1.default)(), finalParams.path);
    const potentialFilePathFromFile = path_1.default.resolve(sourcePath, finalParams.path);
    if (fs_1.default.existsSync(potentialFilePathFromFile)) {
        sharedData.icons.push({
            path: potentialFilePathFromFile,
            as,
        });
    }
    else if (fs_1.default.existsSync(potentialFilePathFromRoot)) {
        sharedData.icons.push({
            path: potentialFilePathFromRoot,
            as,
        });
    }
    else {
        throw new Error(`<red>[sugar.css.mixins.icon.fs]</red> Sorry but it seems that the requested icon "<cyan>${finalParams.path}</cyan>" does not exists on the filesystem`);
    }
    replaceWith([]);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRkFBOEQ7QUFDOUQsNEZBQXNFO0FBQ3RFLDRDQUFzQjtBQUN0QixnREFBMEI7QUFFMUIsTUFBTSxzQ0FBdUMsU0FBUSxxQkFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsRUFBRSxFQUFFO2dCQUNBLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU9rRCwyREFBUztBQUU1RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBQ1gsVUFBVSxFQUNWLFVBQVUsR0FPYjtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLEVBQUUsRUFBRSxFQUFFLElBQ0gsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtRQUNuQixVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztLQUN6QjtJQUVELElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUM7SUFDeEIsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNMLEVBQUUsR0FBRyxJQUFBLGtCQUFVLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDL0Q7SUFFRCx3QkFBd0I7SUFDeEIsTUFBTSx5QkFBeUIsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUM1QyxJQUFBLHFCQUFhLEdBQUUsRUFDZixXQUFXLENBQUMsSUFBSSxDQUNuQixDQUFDO0lBQ0YsTUFBTSx5QkFBeUIsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUM1QyxVQUFVLEVBQ1YsV0FBVyxDQUFDLElBQUksQ0FDbkIsQ0FBQztJQUVGLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO1FBQzVDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ2xCLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsRUFBRTtTQUNMLENBQUMsQ0FBQztLQUNOO1NBQU0sSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7UUFDbkQsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDbEIsSUFBSSxFQUFFLHlCQUF5QjtZQUMvQixFQUFFO1NBQ0wsQ0FBQyxDQUFDO0tBQ047U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQ1gsMkZBQTJGLFdBQVcsQ0FBQyxJQUFJLDRDQUE0QyxDQUMxSixDQUFDO0tBQ0w7SUFFRCxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQXZERCw0QkF1REMifQ==