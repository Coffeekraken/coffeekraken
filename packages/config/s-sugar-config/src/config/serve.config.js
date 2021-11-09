import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
export function postprocess(env, serveConfig, config) {
    if (env.env === 'production') {
        serveConfig.img.url = config.storage.dist.imgDir.replace(__packageRoot(), '');
        serveConfig.js.url = config.storage.dist.jsDir.replace(__packageRoot(), '');
        serveConfig.css.url = config.storage.dist.cssDir.replace(__packageRoot(), '');
        serveConfig.icons.url = config.storage.dist.iconsDir.replace(__packageRoot(), '');
        serveConfig.fonts.url = config.storage.dist.fontsDir.replace(__packageRoot(), '');
    }
    else {
        serveConfig.img.url = config.storage.src.imgDir.replace(__packageRoot(), '');
        serveConfig.js.url = config.storage.src.jsDir.replace(__packageRoot(), '');
        serveConfig.css.url = config.storage.src.cssDir.replace(__packageRoot(), '');
        serveConfig.icons.url = config.storage.src.iconsDir.replace(__packageRoot(), '');
        serveConfig.fonts.url = config.storage.src.fontsDir.replace(__packageRoot(), '');
    }
    return serveConfig;
}
export default (env, config) => {
    return {
        img: {
            /**
             * @name            url
             * @namespace       config.serve.img
             * @type            String
             * @default         config.storage.(src|dist).imgDir.replace(__packageRoot(),'')
             *
             * Specify the serving img folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '',
        },
        js: {
            /**
             * @name            url
             * @namespace       config.serve.js
             * @type            String
             * @default         config.storage.(src|dist).jsDir.replace(__packageRoot(),'')
             *
             * Specify the serving js folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '',
        },
        css: {
            /**
             * @name            url
             * @namespace       config.serve.css
             * @type            String
             * @default         config.storage.(src|dist).cssDir.replace(__packageRoot(),'')
             *
             * Specify the serving css folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '',
        },
        icons: {
            /**
             * @name            url
             * @namespace       config.serve.icons
             * @type            String
             * @default         config.storage.(src|dist).iconsDir.replace(__packageRoot(),'')
             *
             * Specify the serving icons folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '',
        },
        fonts: {
            /**
             * @name            url
             * @namespace       config.serve.fonts
             * @type            String
             * @default         config.storage.(src|dist).fontsDir.replace(__packageRoot(),'')
             *
             * Specify the serving fonts folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '',
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBRXRFLE1BQU0sVUFBVSxXQUFXLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxNQUFNO0lBQ2hELElBQUksR0FBRyxDQUFDLEdBQUcsS0FBSyxZQUFZLEVBQUU7UUFDMUIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FDcEQsYUFBYSxFQUFFLEVBQ2YsRUFBRSxDQUNMLENBQUM7UUFDRixXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNsRCxhQUFhLEVBQUUsRUFDZixFQUFFLENBQ0wsQ0FBQztRQUNGLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ3BELGFBQWEsRUFBRSxFQUNmLEVBQUUsQ0FDTCxDQUFDO1FBQ0YsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FDeEQsYUFBYSxFQUFFLEVBQ2YsRUFBRSxDQUNMLENBQUM7UUFDRixXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUN4RCxhQUFhLEVBQUUsRUFDZixFQUFFLENBQ0wsQ0FBQztLQUNMO1NBQU07UUFDSCxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUNuRCxhQUFhLEVBQUUsRUFDZixFQUFFLENBQ0wsQ0FBQztRQUNGLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ2pELGFBQWEsRUFBRSxFQUNmLEVBQUUsQ0FDTCxDQUFDO1FBQ0YsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FDbkQsYUFBYSxFQUFFLEVBQ2YsRUFBRSxDQUNMLENBQUM7UUFDRixXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUN2RCxhQUFhLEVBQUUsRUFDZixFQUFFLENBQ0wsQ0FBQztRQUNGLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQ3ZELGFBQWEsRUFBRSxFQUNmLEVBQUUsQ0FDTCxDQUFDO0tBQ0w7SUFDRCxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDO0FBRUQsZUFBZSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUMzQixPQUFPO1FBQ0gsR0FBRyxFQUFFO1lBQ0Q7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxFQUFFO1NBQ1Y7UUFDRCxFQUFFLEVBQUU7WUFDQTs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLEVBQUU7U0FDVjtRQUNELEdBQUcsRUFBRTtZQUNEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsRUFBRTtTQUNWO1FBQ0QsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxFQUFFO1NBQ1Y7UUFDRCxLQUFLLEVBQUU7WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLEVBQUU7U0FDVjtLQUNKLENBQUM7QUFDTixDQUFDLENBQUMifQ==