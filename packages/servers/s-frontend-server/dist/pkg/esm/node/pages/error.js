// @ts-nocheck
import __deepMerge from '../../../../shared/object/deepMerge';
/**
 * @name                error
 * @namespace           sugar.node.server.frontend.pages
 * @type                Function
 * @status              wip
 *
 * This function simply return the 404 page content to send to the user
 * with the passed data object described here:
 *
 * @param       {Object}       data         The page data to display
 * - title (404) {String}: Page title
 * - intro (null) {String}: An intro text
 * - body (Not found) {String}: The body text you want to display
 * - ctas ([]) {Array<Object>}: An array of object describing each call to actions you want to display on the bottom of the content
 * - ctas.text (null) {String}: The text of the call to action
 * - ctas.href (null) {String}: The url where to send the user
 * - ctas.target (_self) {String}: The target of the cta.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import 404 from '@coffeekraken/sugar/node/server/frontend/pages/404';
 * const content = await 404('Error', 'Something wrong happened', null, [{
 *    text: 'Go to Google',
 *    href: 'https://google.com'
 * }]);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function error(data = {}) {
    data = __deepMerge({
        title: 'Error',
        intro: 'Somethings wrong happend',
        body: null,
        ctas: [
            {
                text: 'Go back',
                href: 'javascript:history.back()',
                target: '_self'
            }
        ]
    }, data);
    const settings = __deepMerge(__SugarConfig.get('frontend'), args);
    const server = __express();
    const promise = new __SPromise({
        id: 'frontendServerError'
    });
    // build the "templateData" object to pass to the render engines
    const templateData = {
        frontspec: JSON.stringify(frontspec),
        env: process.env.NODE_ENV || 'development',
        settings: JSON.stringify(settings),
        packageJson: __standardizeJson(require(__packageRootDir() + '/package.json'))
    };
}
export default error;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxxQ0FBcUMsQ0FBQztBQUU5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILFNBQVMsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFO0lBQ3RCLElBQUksR0FBRyxXQUFXLENBQ2hCO1FBQ0UsS0FBSyxFQUFFLE9BQU87UUFDZCxLQUFLLEVBQUUsMEJBQTBCO1FBQ2pDLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFO1lBQ0o7Z0JBQ0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsSUFBSSxFQUFFLDJCQUEyQjtnQkFDakMsTUFBTSxFQUFFLE9BQU87YUFDaEI7U0FDRjtLQUNGLEVBQ0QsSUFBSSxDQUNMLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRSxNQUFNLE1BQU0sR0FBRyxTQUFTLEVBQUUsQ0FBQztJQUUzQixNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQztRQUM3QixFQUFFLEVBQUUscUJBQXFCO0tBQzFCLENBQUMsQ0FBQztJQUVILGdFQUFnRTtJQUNoRSxNQUFNLFlBQVksR0FBRztRQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFDcEMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWE7UUFDMUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ2xDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQztLQUM5RSxDQUFDO0FBQ0osQ0FBQztBQUNELGVBQWUsS0FBSyxDQUFDIn0=