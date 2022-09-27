"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultPropsPlugin_1 = __importDefault(require("./defaultPropsPlugin"));
exports.default = (plugins, targets) => {
    const pluginsMap = {
        defaultProps: defaultPropsPlugin_1.default,
    };
    const finalConfig = {};
    targets.forEach((target) => {
        if (!finalConfig[target]) {
            finalConfig[target] = {
                plugins: [],
            };
        }
        plugins.forEach((plugin) => {
            let pluginFn = pluginsMap[plugin];
            if (!pluginFn) {
                throw new Error(`The requested "${plugin}" @coffeekraken/s-mitosis plugin does not exists...`);
            }
            finalConfig[target].plugins.push(pluginFn({
                target,
            }));
        });
    });
    return finalConfig;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEVBQXdEO0FBRXhELGtCQUFlLENBQUMsT0FBaUIsRUFBRSxPQUFpQixFQUFFLEVBQUU7SUFDcEQsTUFBTSxVQUFVLEdBQUc7UUFDZixZQUFZLEVBQUUsNEJBQW9CO0tBQ3JDLENBQUM7SUFFRixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFFdkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdEIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHO2dCQUNsQixPQUFPLEVBQUUsRUFBRTthQUNkLENBQUM7U0FDTDtRQUVELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN2QixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDWCxNQUFNLElBQUksS0FBSyxDQUNYLGtCQUFrQixNQUFNLHFEQUFxRCxDQUNoRixDQUFDO2FBQ0w7WUFDRCxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDNUIsUUFBUSxDQUFDO2dCQUNMLE1BQU07YUFDVCxDQUFDLENBQ0wsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDLENBQUMifQ==