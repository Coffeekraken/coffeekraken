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
    exports.default = {
        server: {
            /**
             * @name            id
             * @namespace       config.discord.server
             * @type            String
             * @default         Coffeekraken
             *
             * Specify the discord server id
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            id: 'Coffeekraken',
            /**
             * @name            url
             * @namespace       config.discord.server
             * @type            String
             * @default         https://discord.gg/ERsX54UE
             *
             * Specify the discord server url
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            url: 'https://discord.gg/ERsX54UE',
        },
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY29yZC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaXNjb3JkLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLGtCQUFlO1FBQ1gsTUFBTSxFQUFFO1lBQ0o7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxjQUFjO1lBQ2xCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsNkJBQTZCO1NBQ3JDO0tBQ0osQ0FBQyJ9