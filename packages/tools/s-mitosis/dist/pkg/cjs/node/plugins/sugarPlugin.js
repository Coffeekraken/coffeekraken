"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultPropsPlugin_1 = __importDefault(require("./defaultPropsPlugin"));
const propsAccessorPlugin_1 = __importDefault(require("./propsAccessorPlugin"));
exports.default = (pluginOptions) => (options) => {
    return {
        plugins: [
            (0, defaultPropsPlugin_1.default)(pluginOptions),
            (0, propsAccessorPlugin_1.default)(pluginOptions)
        ]
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEVBQXdEO0FBQ3hELGdGQUEwRDtBQUUxRCxrQkFBZSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtJQUMxQyxPQUFPO1FBQ0gsT0FBTyxFQUFFO1lBQ0wsSUFBQSw0QkFBb0IsRUFBQyxhQUFhLENBQUM7WUFDbkMsSUFBQSw2QkFBcUIsRUFBQyxhQUFhLENBQUM7U0FDdkM7S0FDSixDQUFBO0FBQ0wsQ0FBQyxDQUFDIn0=