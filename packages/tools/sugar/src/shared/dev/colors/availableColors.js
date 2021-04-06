var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../config/sugar"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const sugar_1 = __importDefault(require("../../config/sugar"));
    function availableColors(settings) {
        settings = Object.assign({ excludeBasics: false }, (settings !== null && settings !== void 0 ? settings : {}));
        let colors = Object.keys(sugar_1.default('dev.colors'));
        if (settings.excludeBasics) {
            colors = colors.filter((c) => {
                return c !== 'white' && c !== 'black' && c !== 'grey' && c !== 'gray';
            });
        }
        return colors;
    }
    exports.default = availableColors;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmxlQ29sb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXZhaWxhYmxlQ29sb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsK0RBQStDO0lBb0IvQyxTQUF3QixlQUFlLENBQ3JDLFFBQTRDO1FBRTVDLFFBQVEsbUJBQ04sYUFBYSxFQUFFLEtBQUssSUFDakIsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztRQUNGLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFFdEQsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQzFCLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzNCLE9BQU8sQ0FBQyxLQUFLLE9BQU8sSUFBSSxDQUFDLEtBQUssT0FBTyxJQUFJLENBQUMsS0FBSyxNQUFNLElBQUksQ0FBQyxLQUFLLE1BQU0sQ0FBQztZQUN4RSxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQWhCRCxrQ0FnQkMifQ==