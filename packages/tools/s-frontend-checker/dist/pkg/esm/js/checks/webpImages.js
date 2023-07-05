/**
 * @name            webpImages
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if a print stylesheet is defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'webpImages',
        name: 'Webp for images',
        description: "Consider using the 'webp' extension for images to improve the performances of your website",
        category: __SFrontendChecker.CATEGORY_NICE_TO_HAVE,
        level: 2,
        check({ $context }) {
            var _a;
            const $nonWebpImages = Array.from((_a = $context.querySelectorAll('img:is([src*=".jpg"],[src*=".jpeg"],[src*=".gif"],[src*=".png"])')) !== null && _a !== void 0 ? _a : []);
            if ($nonWebpImages.length) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: "It's recommanded to provide images as `webp` format",
                    example: '<img src="something.webp" alt="...">',
                    moreLink: 'https://developers.google.com/speed/webp',
                    elements: $nonWebpImages,
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsWUFBWTtRQUNoQixJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLFdBQVcsRUFDUCw0RkFBNEY7UUFDaEcsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHFCQUFxQjtRQUNsRCxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTs7WUFDZCxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUM3QixNQUFBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDckIsa0VBQWtFLENBQ3JFLG1DQUFJLEVBQUUsQ0FDVixDQUFDO1lBRUYsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFO2dCQUN2QixPQUFPO29CQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxjQUFjO29CQUN6QyxPQUFPLEVBQ0gscURBQXFEO29CQUN6RCxPQUFPLEVBQUUsc0NBQXNDO29CQUMvQyxRQUFRLEVBQUUsMENBQTBDO29CQUNwRCxRQUFRLEVBQUUsY0FBYztpQkFDM0IsQ0FBQzthQUNMO1lBQ0QsT0FBTztnQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsY0FBYzthQUM1QyxDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=