"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
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
        as = (0, fs_1.__fileName)(iconPath.split('.').slice(0, -1).join('.'));
    }
    // reading the icon file
    const potentialFilePathFromRoot = path_2.default.resolve((0, path_1.__packageRootDir)(), finalParams.path);
    const potentialFilePathFromFile = path_2.default.resolve(sourcePath, finalParams.path);
    if (fs_2.default.existsSync(potentialFilePathFromFile)) {
        sharedData.icons.push({
            path: potentialFilePathFromFile,
            as,
        });
    }
    else if (fs_2.default.existsSync(potentialFilePathFromRoot)) {
        sharedData.icons.push({
            path: potentialFilePathFromRoot,
            as,
        });
    }
    else {
        throw new Error(`<red>[sugar.css.mixins.icon.fs]</red> Sorry but it seems that the requested icon "<cyan>${finalParams.path}</cyan>" does not exists on the filesystem`);
    }
    return replaceWith([`/** S-SUGAR-FS-ICON:${as} */`]);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCwrQ0FBb0Q7QUFDcEQsbURBQTREO0FBQzVELDRDQUFzQjtBQUN0QixnREFBMEI7QUFFMUIsTUFBTSxzQ0FBdUMsU0FBUSxxQkFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsRUFBRSxFQUFFO2dCQUNBLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU9rRCwyREFBUztBQUU1RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBQ1gsVUFBVSxFQUNWLFVBQVUsR0FPYjtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLEVBQUUsRUFBRSxFQUFFLElBQ0gsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtRQUNuQixVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztLQUN6QjtJQUVELElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUM7SUFDeEIsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNMLEVBQUUsR0FBRyxJQUFBLGVBQVUsRUFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUMvRDtJQUVELHdCQUF3QjtJQUN4QixNQUFNLHlCQUF5QixHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQzVDLElBQUEsdUJBQWdCLEdBQUUsRUFDbEIsV0FBVyxDQUFDLElBQUksQ0FDbkIsQ0FBQztJQUNGLE1BQU0seUJBQXlCLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FDNUMsVUFBVSxFQUNWLFdBQVcsQ0FBQyxJQUFJLENBQ25CLENBQUM7SUFFRixJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsRUFBRTtRQUM1QyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNsQixJQUFJLEVBQUUseUJBQXlCO1lBQy9CLEVBQUU7U0FDTCxDQUFDLENBQUM7S0FDTjtTQUFNLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO1FBQ25ELFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ2xCLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsRUFBRTtTQUNMLENBQUMsQ0FBQztLQUNOO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUNYLDJGQUEyRixXQUFXLENBQUMsSUFBSSw0Q0FBNEMsQ0FDMUosQ0FBQztLQUNMO0lBRUQsT0FBTyxXQUFXLENBQUMsQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUF2REQsNEJBdURDIn0=