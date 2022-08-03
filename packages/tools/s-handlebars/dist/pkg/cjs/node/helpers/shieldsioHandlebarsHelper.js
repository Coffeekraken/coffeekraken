"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
function ShieldsioHandlebarsHelper(settings) {
    const shieldsConfig = s_sugar_config_1.default.get('shieldsio');
    return function (context, options) {
        const shields = [];
        shieldsConfig.shields.forEach((shield) => {
            shields.push(`![${shield}](https://shields.io/${shieldsConfig.urls[shield]})`);
        });
        return shields.join(' ');
    };
}
exports.default = ShieldsioHandlebarsHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQTBEO0FBYTFELFNBQXdCLHlCQUF5QixDQUM3QyxRQUFzRTtJQUV0RSxNQUFNLGFBQWEsR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUV0RCxPQUFPLFVBQVUsT0FBTyxFQUFFLE9BQU87UUFDN0IsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO1FBRTdCLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDckMsT0FBTyxDQUFDLElBQUksQ0FDUixLQUFLLE1BQU0sd0JBQXdCLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDbkUsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQztBQUNOLENBQUM7QUFoQkQsNENBZ0JDIn0=