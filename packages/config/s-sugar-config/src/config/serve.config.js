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
            url: env.env === 'development' ? '[config.vite.server.hostname]/img' : '/img',
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
            url: env.env === 'development' ? '[config.vite.server.hostname]/js' : '/js',
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
            url: env.env === 'development' ? '[config.vite.server.hostname]/css' : '/css',
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
            url: env.env === 'development' ? '[config.vite.server.hostname]/icons' : '/icons',
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
            url: env.env === 'development' ? '[config.vite.server.hostname]/fonts' : '/fonts',
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sVUFBVSxXQUFXLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxNQUFNO0lBQ2hELE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxlQUFlLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzNCLE9BQU87UUFDSCxHQUFHLEVBQUU7WUFDRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLENBQUMsTUFBTTtTQUNoRjtRQUNELEVBQUUsRUFBRTtZQUNBOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQyxLQUFLO1NBQzlFO1FBQ0QsR0FBRyxFQUFFO1lBQ0Q7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxDQUFDLE1BQU07U0FDaEY7UUFDRCxLQUFLLEVBQUU7WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLENBQUMsUUFBUTtTQUNwRjtRQUNELEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLHFDQUFxQyxDQUFDLENBQUMsQ0FBQyxRQUFRO1NBQ3BGO0tBQ0osQ0FBQztBQUNOLENBQUMsQ0FBQyJ9