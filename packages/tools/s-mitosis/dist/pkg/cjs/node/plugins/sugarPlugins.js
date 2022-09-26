"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultPropsPlugin_1 = __importDefault(require("./defaultPropsPlugin"));
const propsAccessorPlugin_1 = __importDefault(require("./propsAccessorPlugin"));
exports.default = (plugins, targets) => {
    const pluginsMap = {
        defaultProps: defaultPropsPlugin_1.default,
        propsAccessor: propsAccessorPlugin_1.default
    };
    const finalConfig = {};
    targets.forEach(target => {
        if (!finalConfig[target]) {
            finalConfig[target] = {
                plugins: []
            };
        }
        plugins.forEach(plugin => {
            let pluginFn = pluginsMap[plugin];
            if (!pluginFn) {
                throw new Error(`The requested "${plugin}" @coffeekraken/s-mitosis plugin does not exists...`);
            }
            finalConfig[target].plugins.push(pluginFn({
                target
            }));
        });
    });
    return finalConfig;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEVBQXdEO0FBQ3hELGdGQUEwRDtBQUUxRCxrQkFBZSxDQUFDLE9BQWlCLEVBQUUsT0FBaUIsRUFBRSxFQUFFO0lBQ3BELE1BQU0sVUFBVSxHQUFHO1FBQ2YsWUFBWSxFQUFFLDRCQUFvQjtRQUNsQyxhQUFhLEVBQUUsNkJBQXFCO0tBQ3ZDLENBQUM7SUFFRixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFFdkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3RCLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRztnQkFDbEIsT0FBTyxFQUFFLEVBQUU7YUFDZCxDQUFBO1NBQ0o7UUFFRCxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3JCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLE1BQU0scURBQXFELENBQUMsQ0FBQzthQUNsRztZQUNELFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDdEMsTUFBTTthQUNULENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUM7SUFHUCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyJ9