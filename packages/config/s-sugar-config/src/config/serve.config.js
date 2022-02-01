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
             * @default         /img
             *
             * Specify the serving img folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: env.env === 'development' ? '[config.vite.server.hostname]/dist/img' : '/dist/img',
        },
        js: {
            /**
             * @name            url
             * @namespace       config.serve.js
             * @type            String
             * @default         /js
             *
             * Specify the serving js folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: env.env === 'development' ? '[config.vite.server.hostname]/dist/js' : '/dist/js',
        },
        css: {
            /**
             * @name            url
             * @namespace       config.serve.css
             * @type            String
             * @default         /css
             *
             * Specify the serving css folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: env.env === 'development' ? '[config.vite.server.hostname]/dist/css' : '/dist/css',
        },
        icons: {
            /**
             * @name            url
             * @namespace       config.serve.icons
             * @type            String
             * @default         /icons
             *
             * Specify the serving icons folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: env.env === 'development' ? '[config.vite.server.hostname]/dist/icons' : '/dist/icons',
        },
        fonts: {
            /**
             * @name            url
             * @namespace       config.serve.fonts
             * @type            String
             * @default         /fonts
             *
             * Specify the serving fonts folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: env.env === 'development' ? '[config.vite.server.hostname]/dist/fonts' : '/dist/fonts',
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
            url: env.env === 'development' ? '[config.vite.server.hostname]/cache' : '/cache',
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sVUFBVSxXQUFXLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxNQUFNO0lBQ2hELE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxlQUFlLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzNCLE9BQU87UUFDSCxHQUFHLEVBQUU7WUFDRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLENBQUMsV0FBVztTQUMxRjtRQUNELEVBQUUsRUFBRTtZQUNBOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLHVDQUF1QyxDQUFDLENBQUMsQ0FBQyxVQUFVO1NBQ3hGO1FBQ0QsR0FBRyxFQUFFO1lBQ0Q7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxDQUFDLFdBQVc7U0FDMUY7UUFDRCxLQUFLLEVBQUU7WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDLENBQUMsYUFBYTtTQUM5RjtRQUNELEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLDBDQUEwQyxDQUFDLENBQUMsQ0FBQyxhQUFhO1NBQzlGO1FBQ0QsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMscUNBQXFDLENBQUMsQ0FBQyxDQUFDLFFBQVE7U0FDcEY7S0FDSixDQUFDO0FBQ04sQ0FBQyxDQUFDIn0=