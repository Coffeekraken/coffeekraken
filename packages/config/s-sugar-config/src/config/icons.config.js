export default function (env) {
    if (env.platform !== 'node')
        return {};
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            outputDir: '[config.storage.src.fontsDir]/sugar-icons',
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbnMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaWNvbnMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU8sRUFBRSxDQUFDO0lBRXZDLE9BQU87UUFDSCxXQUFXLEVBQUU7WUFDVDs7Ozs7Ozs7Ozs7Ozs7ZUFjRztZQUNILEdBQUcsRUFBRSwwREFBMEQ7U0FDbEU7UUFFRCxXQUFXLEVBQUU7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLGdCQUFnQjtZQUV0Qjs7Ozs7Ozs7OztlQVVHO1lBQ0gsU0FBUyxFQUFFLDJDQUEyQztTQUN6RDtLQUNKLENBQUM7QUFDTixDQUFDIn0=