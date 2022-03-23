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
    function default_1(env) {
        if (env.platform !== 'node')
            return;
        return {
            fontawesome: {
                /**
                 * @name            url
                 * @namespace       config.icons.fontawesome
                 * @type             String
                 * @default         https://use.fontawesome.com/releases/v5.15.3/css/all.css
                 *
                 * Specify the url to the font-awesome stylesheet to load. By default it will load
                 * all the icons but you can create a "kit" on the fontaawesome website and load only
                 * the icons you need.
                 * When using the postcss sugar plugin with the ```@sugar.icon.fa``` mixin, this url will be automatically
                 * loaded in your css if you use some fontawesome icons.
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                url: 'https://use.fontawesome.com/releases/v5.15.3/css/all.css',
            },
            fantasticon: {
                /**
                 * @name            name
                 * @namespace       config.icons.fantasticon
                 * @type            String
                 * @default         sugar-fonticon
                 *
                 * Specify the name of the generated font
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                name: 'sugar-fonticon',
                /**
                 * @name            outputDir
                 * @namespace       config.icons.fantasticon
                 * @type            String
                 * @default         [config.storage.dist.fontsDir]/sugar-icons
                 *
                 * Specify the output directory to generate fonticon in
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                outputDir: '[config.storage.src.fontsDir]/sugar-icons',
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbnMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaWNvbnMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsbUJBQXlCLEdBQUc7UUFDeEIsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07WUFBRSxPQUFPO1FBRXBDLE9BQU87WUFDSCxXQUFXLEVBQUU7Z0JBQ1Q7Ozs7Ozs7Ozs7Ozs7O21CQWNHO2dCQUNILEdBQUcsRUFBRSwwREFBMEQ7YUFDbEU7WUFFRCxXQUFXLEVBQUU7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLGdCQUFnQjtnQkFFdEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsU0FBUyxFQUFFLDJDQUEyQzthQUN6RDtTQUNKLENBQUM7SUFDTixDQUFDO0lBbkRELDRCQW1EQyJ9