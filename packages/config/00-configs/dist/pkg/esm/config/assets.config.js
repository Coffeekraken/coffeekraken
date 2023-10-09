export default function (api) {
    if (api.env.platform !== 'node') {
        return;
    }
    return {
        /**
         * @name            dev
         * @namespace       config.assets
         * @type            String
         * @default         { type: 'module', defer: true, src: '/src/js/index.ts', env: 'development' }
         *
         * Specify the development javascript index asset.
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        dev: {
            type: 'module',
            defer: true,
            src: '/src/js/index.ts',
            env: 'development',
        },
        /**
         * @name            module
         * @namespace       config.assets
         * @type            String
         * @default         { type: 'module', defer: true, src: '/dist/js/index.esm.js', env: 'production' }
         *
         * Specify the production javascript module index asset.
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        module: {
            type: 'module',
            defer: true,
            src: '/dist/js/index.esm.js',
            env: 'production',
        },
        /**
         * @name            style
         * @namespace       config.assets
         * @type            String
         * @default         { defer: true, src: '/dist/css/index.css' }
         *
         * Specify the production style index asset.
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        style: {
            id: 'global',
            defer: true,
            src: '/dist/css/index.css',
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUM3QixPQUFPO0tBQ1Y7SUFFRCxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsa0JBQWtCO1lBQ3ZCLEdBQUcsRUFBRSxhQUFhO1NBQ3JCO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsdUJBQXVCO1lBQzVCLEdBQUcsRUFBRSxZQUFZO1NBQ3BCO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRTtZQUNILEVBQUUsRUFBRSxRQUFRO1lBQ1osS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUscUJBQXFCO1NBQzdCO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==