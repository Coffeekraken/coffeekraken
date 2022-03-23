var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/node/fs/dirname", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
    const path_1 = __importDefault(require("path"));
    function default_1(env, config) {
        return {
            sources: {
                coffeekrakenio: {
                    active: true,
                    settings: {},
                    path: path_1.default.resolve((0, dirname_1.default)(), '../src/node/sitemap'),
                },
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZW1hcEJ1aWxkZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2l0ZW1hcEJ1aWxkZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsa0ZBQTREO0lBQzVELGdEQUEwQjtJQUUxQixtQkFBeUIsR0FBRyxFQUFFLE1BQU07UUFDaEMsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxjQUFjLEVBQUU7b0JBQ1osTUFBTSxFQUFFLElBQUk7b0JBQ1osUUFBUSxFQUFFLEVBQUU7b0JBQ1osSUFBSSxFQUFFLGNBQU0sQ0FBQyxPQUFPLENBQUMsSUFBQSxpQkFBUyxHQUFFLEVBQUUscUJBQXFCLENBQUM7aUJBQzNEO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQztJQVZELDRCQVVDIn0=