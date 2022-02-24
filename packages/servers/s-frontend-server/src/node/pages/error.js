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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0scUNBQXFDLENBQUM7QUFFOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFDSCxTQUFTLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtJQUN0QixJQUFJLEdBQUcsV0FBVyxDQUNoQjtRQUNFLEtBQUssRUFBRSxPQUFPO1FBQ2QsS0FBSyxFQUFFLDBCQUEwQjtRQUNqQyxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRTtZQUNKO2dCQUNFLElBQUksRUFBRSxTQUFTO2dCQUNmLElBQUksRUFBRSwyQkFBMkI7Z0JBQ2pDLE1BQU0sRUFBRSxPQUFPO2FBQ2hCO1NBQ0Y7S0FDRixFQUNELElBQUksQ0FDTCxDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEUsTUFBTSxNQUFNLEdBQUcsU0FBUyxFQUFFLENBQUM7SUFFM0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUM7UUFDN0IsRUFBRSxFQUFFLHFCQUFxQjtLQUMxQixDQUFDLENBQUM7SUFFSCxnRUFBZ0U7SUFDaEUsTUFBTSxZQUFZLEdBQUc7UUFDbkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQ3BDLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBQzFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUNsQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEdBQUcsZUFBZSxDQUFDLENBQUM7S0FDOUUsQ0FBQztBQUNKLENBQUM7QUFDRCxlQUFlLEtBQUssQ0FBQyJ9