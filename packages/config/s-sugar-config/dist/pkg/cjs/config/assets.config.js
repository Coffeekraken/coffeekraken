"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
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
         * @name            nomodule
         * @namespace       config.assets
         * @type            String
         * @default         { nomodule: true, defer: true, src: '/dist/js/index.amd.js', env: 'production' }
         *
         * Specify the production javascript nomodule index asset.
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        nomodule: {
            nomodule: true,
            defer: true,
            src: '/dist/js/index.amd.js',
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLGtCQUFrQjtZQUN2QixHQUFHLEVBQUUsYUFBYTtTQUNyQjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLHVCQUF1QjtZQUM1QixHQUFHLEVBQUUsWUFBWTtTQUNwQjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUU7WUFDTixRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLHVCQUF1QjtZQUM1QixHQUFHLEVBQUUsWUFBWTtTQUNwQjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUU7WUFDSCxFQUFFLEVBQUUsUUFBUTtZQUNaLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLHFCQUFxQjtTQUM3QjtLQUNKLENBQUM7QUFDTixDQUFDO0FBekVELDRCQXlFQyJ9