(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function availableColors(settings) {
        settings = Object.assign({ excludeBasics: false }, (settings !== null && settings !== void 0 ? settings : {}));
        const _colors = [
            'yellow',
            'cyan',
            'green',
            'magenta',
            'red',
            'blue',
            'primary',
            'secondary',
            'grey',
            'gray'
        ];
        let colors = _colors;
        if (settings.excludeBasics) {
            colors = _colors.filter((c) => {
                return c !== 'white' && c !== 'black' && c !== 'grey' && c !== 'gray';
            });
        }
        return colors;
    }
    exports.default = availableColors;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmxlQ29sb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXZhaWxhYmxlQ29sb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBb0JBLFNBQXdCLGVBQWUsQ0FDckMsUUFBNEM7UUFFNUMsUUFBUSxtQkFDTixhQUFhLEVBQUUsS0FBSyxJQUNqQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQUc7WUFDZCxRQUFRO1lBQ1IsTUFBTTtZQUNOLE9BQU87WUFDUCxTQUFTO1lBQ1QsS0FBSztZQUNMLE1BQU07WUFDTixTQUFTO1lBQ1QsV0FBVztZQUNYLE1BQU07WUFDTixNQUFNO1NBQ1AsQ0FBQztRQUVGLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUNyQixJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDMUIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDNUIsT0FBTyxDQUFDLEtBQUssT0FBTyxJQUFJLENBQUMsS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLE1BQU0sSUFBSSxDQUFDLEtBQUssTUFBTSxDQUFDO1lBQ3hFLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBN0JELGtDQTZCQyJ9