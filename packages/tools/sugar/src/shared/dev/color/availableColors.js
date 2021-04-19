var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-sugar-config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
    function availableColors(settings) {
        settings = Object.assign({ excludeBasics: false }, (settings !== null && settings !== void 0 ? settings : {}));
        let colors = Object.keys(s_sugar_config_1.default('dev.colors'));
        if (settings.excludeBasics) {
            colors = colors.filter((c) => {
                return c !== 'white' && c !== 'black' && c !== 'grey' && c !== 'gray';
            });
        }
        return colors;
    }
    exports.default = availableColors;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmxlQ29sb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXZhaWxhYmxlQ29sb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsa0ZBQXlEO0lBb0J6RCxTQUF3QixlQUFlLENBQ3JDLFFBQTRDO1FBRTVDLFFBQVEsbUJBQ04sYUFBYSxFQUFFLEtBQUssSUFDakIsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztRQUNGLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBRXRELElBQUksUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUMxQixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUMzQixPQUFPLENBQUMsS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLE9BQU8sSUFBSSxDQUFDLEtBQUssTUFBTSxJQUFJLENBQUMsS0FBSyxNQUFNLENBQUM7WUFDeEUsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFoQkQsa0NBZ0JDIn0=