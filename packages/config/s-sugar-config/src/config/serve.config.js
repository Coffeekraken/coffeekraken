export function postprocess(env, serveConfig, config) {
    return serveConfig;
}
export default (env, config) => {
    return {
        img: {
            /**
             * @name            url
             * @namespace       config.serve.img
             * @type            String
             * @default         /dist/img
             *
             * Specify the serving img folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '/dist/img',
        },
        js: {
            /**
             * @name            url
             * @namespace       config.serve.js
             * @type            String
             * @default         /dist/js
             *
             * Specify the serving js folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '/dist/js',
        },
        css: {
            /**
             * @name            url
             * @namespace       config.serve.css
             * @type            String
             * @default         /dist/css
             *
             * Specify the serving css folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '/dist/css',
        },
        icons: {
            /**
             * @name            url
             * @namespace       config.serve.icons
             * @type            String
             * @default         /dist/icons
             *
             * Specify the serving icons folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '/dist/icons',
        },
        fonts: {
            /**
             * @name            url
             * @namespace       config.serve.fonts
             * @type            String
             * @default         /dist/fonts
             *
             * Specify the serving fonts folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '/dist/fonts',
        },
        cache: {
            /**
             * @name            url
             * @namespace       config.serve.cache
             * @type            String
             * @default         /cache
             *
             * Specify the serving cache folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '/cache',
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sVUFBVSxXQUFXLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxNQUFNO0lBQ2hELE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxlQUFlLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzNCLE9BQU87UUFDSCxHQUFHLEVBQUU7WUFDRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLFdBQVc7U0FDbkI7UUFDRCxFQUFFLEVBQUU7WUFDQTs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLFVBQVU7U0FDbEI7UUFDRCxHQUFHLEVBQUU7WUFDRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLFdBQVc7U0FDbkI7UUFDRCxLQUFLLEVBQUU7WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLGFBQWE7U0FDckI7UUFDRCxLQUFLLEVBQUU7WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLGFBQWE7U0FDckI7UUFDRCxLQUFLLEVBQUU7WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLFFBQVE7U0FDaEI7S0FDSixDQUFDO0FBQ04sQ0FBQyxDQUFDIn0=