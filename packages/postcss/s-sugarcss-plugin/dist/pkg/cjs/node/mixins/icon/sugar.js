"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const fs_1 = require("@coffeekraken/sugar/fs");
const fs_2 = __importDefault(require("fs"));
class SSugarcssPluginIconSugarMixinInterface extends s_interface_1.default {
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
exports.interface = SSugarcssPluginIconSugarMixinInterface;
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
    const iconFilePath = finalParams.path;
    if (fs_2.default.existsSync(iconFilePath)) {
        sharedData.icons.push({
            path: iconFilePath,
            as,
        });
    }
    else {
        throw new Error(`<red>[sugar.css.mixins.icon.sugar]</red> Sorry but it seems that the requested icon "<cyan>${finalParams.path}</cyan>" does not exists in the sugar library`);
    }
    replaceWith([]);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCwrQ0FBb0Q7QUFDcEQsNENBQXNCO0FBRXRCLE1BQU0sc0NBQXVDLFNBQVEscUJBQVk7SUFDN0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEVBQUUsRUFBRTtnQkFDQSxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPa0QsMkRBQVM7QUFFNUQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUNYLFVBQVUsRUFDVixVQUFVLEdBT2I7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixFQUFFLEVBQUUsRUFBRSxJQUNILE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7UUFDbkIsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7S0FDekI7SUFFRCxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDO0lBQ3hCLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDTCxFQUFFLEdBQUcsSUFBQSxlQUFVLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDL0Q7SUFFRCx3QkFBd0I7SUFDeEIsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUN0QyxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDL0IsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDbEIsSUFBSSxFQUFFLFlBQVk7WUFDbEIsRUFBRTtTQUNMLENBQUMsQ0FBQztLQUNOO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUNYLDhGQUE4RixXQUFXLENBQUMsSUFBSSwrQ0FBK0MsQ0FDaEssQ0FBQztLQUNMO0lBRUQsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3BCLENBQUM7QUExQ0QsNEJBMENDIn0=