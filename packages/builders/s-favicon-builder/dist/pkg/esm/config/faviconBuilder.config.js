export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            input
         * @namespace       config.faviconBuilder
         * @type            String
         * @default         [config.storage.src.rootDir]/favicon/favicon.png
         *
         * Specify where the favicon source file is stored
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get input() {
            return `${api.config.storage.src.rootDir}/favicon/favicon.png`;
        },
        /**
         * @name            outDir
         * @namespace       config.faviconBuilder
         * @type            String
         * @default         [config.storage.dist.rootDir]/favicon
         *
         * Specify where the favicon output files have to be stored
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get outDir() {
            return `${api.config.storage.dist.rootDir}/favicon`;
        },
        /**
         * @name            settings
         * @namespace       config.faviconBuilder
         * @type            String
         * @default         {}
         *
         * Specify some settings to override and pass to the [favicons](https://www.npmjs.com/package/favicons) builder
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        settings: {},
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxLQUFLO1lBQ0wsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLHNCQUFzQixDQUFDO1FBQ25FLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxNQUFNO1lBQ04sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLFVBQVUsQ0FBQztRQUN4RCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxFQUFFO0tBQ2YsQ0FBQztBQUNOLENBQUMifQ==