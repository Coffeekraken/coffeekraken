"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    if (api.env.platform !== 'node')
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
        get input() {
            return `${api.config.storage.src.cssDir}/index.css`;
        },
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
        get output() {
            return `${api.config.storage.dist.cssDir}/index.css`;
        },
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
        get postcss() {
            return api.config.postcss;
        },
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
        get purgecss() {
            return api.config.purgecss;
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUN4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksS0FBSztZQUNMLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxZQUFZLENBQUM7UUFDeEQsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE1BQU07WUFDTixPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sWUFBWSxDQUFDO1FBQ3pELENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxPQUFPO1lBQ1AsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM5QixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksUUFBUTtZQUNSLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDL0IsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBL0RELDRCQStEQyJ9