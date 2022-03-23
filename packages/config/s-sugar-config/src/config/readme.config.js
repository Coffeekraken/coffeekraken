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
    function default_1(env, config) {
        if (env.platform !== 'node')
            return;
        return {
            layout: {
                /**
                 * @name            headerImageUrl
                 * @namespace       config.readme.layout
                 * @type            String
                 * @default         [config.serve.img.url]/img/doc/readmeHeader.jpg
                 *
                 * Specify the header image to use for displaying readme. This has to be relative to your project root directory
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                headerImageUrl: '[config.serve.img.url]/doc/readmeHeader.jpg',
            },
            /**
             * @name            shields
             * @namespace       config.readme
             * @type            Object
             * @default         [config.shieldsio.shields]
             *
             * Specify the readme shields to display in your readme.
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            shields: '[config.shieldsio.shields]',
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZG1lLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlYWRtZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxtQkFBeUIsR0FBRyxFQUFFLE1BQU07UUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07WUFBRSxPQUFPO1FBRXBDLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0o7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsY0FBYyxFQUFFLDZDQUE2QzthQUNoRTtZQUNEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsNEJBQTRCO1NBQ3hDLENBQUM7SUFDTixDQUFDO0lBL0JELDRCQStCQyJ9