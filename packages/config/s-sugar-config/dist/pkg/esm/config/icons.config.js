export default function (api) {
    if (api.env.platform !== 'node')
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
            url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
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
             * @default         [config.storage.src.fontsDir]/sugar-icons
             *
             * Specify the output directory to generate fonticon in
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get outputDir() {
                return `${api.config.storage.src.fontsDir}/sugar-icons`;
            },
            /**
             * @name            serveFontsDir
             * @namespace       config.icons.fantasticon
             * @type            String
             * @default         [config.storage.dist.fontsDir]/sugar-icons
             *
             * Specify the path to the fonts directory to serve
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get serveFontsDir() {
                return `${api.config.storage.dist.fontsDir}/sugar-icons`;
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxXQUFXLEVBQUU7WUFDVDs7Ozs7Ozs7Ozs7Ozs7ZUFjRztZQUNILEdBQUcsRUFDQywyRUFBMkU7U0FDbEY7UUFFRCxXQUFXLEVBQUU7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLGdCQUFnQjtZQUV0Qjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxTQUFTO2dCQUNULE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxjQUFjLENBQUM7WUFDNUQsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLGFBQWE7Z0JBQ2IsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLGNBQWMsQ0FBQztZQUM3RCxDQUFDO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9