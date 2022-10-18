"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultMetasPlugin_1 = __importDefault(require("./plugins/defaultMetasPlugin"));
const defaultPropsPlugin_1 = __importDefault(require("./plugins/defaultPropsPlugin"));
const exportDefaultClassPlugin_1 = __importDefault(require("./plugins/exportDefaultClassPlugin"));
const exportDefinePlugin_1 = __importDefault(require("./plugins/exportDefinePlugin"));
function default_1() {
    const plugins = {
        webcomponent: {
            plugins: [
                (0, defaultPropsPlugin_1.default)({
                    target: 'webcomponent',
                }),
                (0, exportDefaultClassPlugin_1.default)({
                    target: 'webcomponent',
                }),
                (0, exportDefinePlugin_1.default)({
                    target: 'webcomponent',
                })
            ],
        },
        react: {
            plugins: []
        },
        vue3: {
            plugins: []
        }
    };
    for (let [target, options] of Object.entries(plugins)) {
        options.plugins.push((0, defaultMetasPlugin_1.default)({
            target
        }));
    }
    return plugins;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0ZBQWdFO0FBQ2hFLHNGQUFnRTtBQUNoRSxrR0FBNEU7QUFDNUUsc0ZBQWdFO0FBR2hFO0lBQ0ksTUFBTSxPQUFPLEdBQUc7UUFDWixZQUFZLEVBQUU7WUFDVixPQUFPLEVBQUU7Z0JBQ0wsSUFBQSw0QkFBb0IsRUFBQztvQkFDakIsTUFBTSxFQUFFLGNBQWM7aUJBQ3pCLENBQUM7Z0JBQ0YsSUFBQSxrQ0FBMEIsRUFBQztvQkFDdkIsTUFBTSxFQUFFLGNBQWM7aUJBQ3pCLENBQUM7Z0JBQ0YsSUFBQSw0QkFBb0IsRUFBQztvQkFDakIsTUFBTSxFQUFFLGNBQWM7aUJBQ3pCLENBQUM7YUFDTDtTQUNKO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsT0FBTyxFQUFFLEVBQUU7U0FDZDtRQUNELElBQUksRUFBRTtZQUNGLE9BQU8sRUFBRSxFQUFFO1NBQ2Q7S0FDSixDQUFDO0lBRUYsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDbkQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBQSw0QkFBb0IsRUFBQztZQUN0QyxNQUFNO1NBQ1QsQ0FBQyxDQUFDLENBQUM7S0FDUDtJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUE5QkQsNEJBOEJDIn0=