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
            /**
             * @name            input
             * @namespace       config.postcssBuilder
             * @type            String
             * @default         [config.storage.src.cssDir]/index.css
             *
             * Specify the input file to use for building your postcss
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            input: '[config.storage.src.cssDir]/index.css',
            /**
             * @name            output
             * @namespace       config.postcssBuilder
             * @type            String
             * @default         [config.storage.dist.cssDir]/index.css
             *
             * Specify the output file to save your builded postcss
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            output: '[config.storage.dist.cssDir]/index.css',
            /**
             * @name            postcss
             * @namespace       config.postcssBuilder
             * @type            Object
             * @default         [config.postcss]
             *
             * Specify the postcss compiler configuration
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            postcss: '[config.postcss]',
            /**
             * @name            purgecss
             * @namespace       config.postcssBuilder
             * @type            Object
             * @default         [config.purgecss]
             *
             * Specify the purgecss compiler configuration
             *
             * @since       2.0.0
             * @author         Oli vier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            purgecss: '[config.purgecss]',
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc0J1aWxkZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc0J1aWxkZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsbUJBQXlCLEdBQUcsRUFBRSxNQUFNO1FBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1lBQUUsT0FBTztRQUNwQyxPQUFPO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSx1Q0FBdUM7WUFDOUM7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSx3Q0FBd0M7WUFDaEQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxrQkFBa0I7WUFDM0I7Ozs7Ozs7Ozs7ZUFVRztZQUNILFFBQVEsRUFBRSxtQkFBbUI7U0FDaEMsQ0FBQztJQUNOLENBQUM7SUFwREQsNEJBb0RDIn0=