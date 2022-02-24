export default function (env) {
    // if (env.platform !== 'node') return;
    return {
        /**
         * @name            input
         * @namespace       config.favicon
         * @type            String
         * @default         [config.storage.src.rootDir]/favicon/favicon.png
         *
         * Specify where the favicon source file is stored
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        input: '[config.storage.src.rootDir]/favicon/favicon.png',
        /**
         * @name            outDir
         * @namespace       config.favicon
         * @type            String
         * @default         [config.storage.dist.rootDir]/favicon
         *
         * Specify where the favicon output files have to be stored
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        outDir: '[config.storage.dist.rootDir]/favicon',
        /**
         * @name            settings
         * @namespace       config.favicon
         * @type            String
         * @default         {}
         *
         * Specify some settings to override and pass to the [favicons](https://www.npmjs.com/package/favicons) builder
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        settings: {}
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmF2aWNvbkJ1aWxkZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmF2aWNvbkJ1aWxkZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4Qix1Q0FBdUM7SUFFdkMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUUsa0RBQWtEO1FBRXpEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUUsdUNBQXVDO1FBRS9DOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUUsRUFBRTtLQUNmLENBQUM7QUFDTixDQUFDIn0=