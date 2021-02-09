"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function error(data = {}) {
    data = deepMerge_1.default({
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
    const settings = deepMerge_1.default(__sugarConfig('frontend'), args);
    const server = __express();
    const promise = new __SPromise({
        id: 'frontendServerError'
    });
    // build the "templateData" object to pass to the render engines
    const templateData = {
        frontspec: JSON.stringify(frontspec),
        env: process.env.NODE_ENV || 'development',
        settings: JSON.stringify(settings),
        packageJson: __standardizeJson(require(__packageRoot() + '/package.json'))
    };
}
exports.default = error;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCwwRUFBb0Q7QUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFDSCxTQUFTLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtJQUN0QixJQUFJLEdBQUcsbUJBQVcsQ0FDaEI7UUFDRSxLQUFLLEVBQUUsT0FBTztRQUNkLEtBQUssRUFBRSwwQkFBMEI7UUFDakMsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUU7WUFDSjtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJLEVBQUUsMkJBQTJCO2dCQUNqQyxNQUFNLEVBQUUsT0FBTzthQUNoQjtTQUNGO0tBQ0YsRUFDRCxJQUFJLENBQ0wsQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFHLG1CQUFXLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlELE1BQU0sTUFBTSxHQUFHLFNBQVMsRUFBRSxDQUFDO0lBRTNCLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDO1FBQzdCLEVBQUUsRUFBRSxxQkFBcUI7S0FDMUIsQ0FBQyxDQUFDO0lBRUgsZ0VBQWdFO0lBQ2hFLE1BQU0sWUFBWSxHQUFHO1FBQ25CLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUNwQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUMxQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDbEMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQztLQUMzRSxDQUFDO0FBQ0osQ0FBQztBQUNELGtCQUFlLEtBQUssQ0FBQyJ9