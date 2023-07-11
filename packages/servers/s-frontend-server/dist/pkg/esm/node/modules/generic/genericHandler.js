// @ts-nocheck
import __pageType from './types/page.js';
import __viewsType from './types/views.js';
/**
 * @name                genericHandler
 * @namespace           node.modules.docmap
 * @type                Function
 * @platform            node
 * @status              beta
 *
 * This function is responsible of responding to express requests made on the doc pages
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function genericHandler(api) {
    switch (api.pageConfig.type) {
        case 'page':
            return __pageType(api);
            break;
        case 'views':
        default:
            return __viewsType(api);
            break;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLFdBQVcsTUFBTSxrQkFBa0IsQ0FBQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0sQ0FBQyxPQUFPLFVBQVUsY0FBYyxDQUFDLEdBQUc7SUFDdEMsUUFBUSxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRTtRQUN6QixLQUFLLE1BQU07WUFDUCxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QixNQUFNO1FBQ1YsS0FBSyxPQUFPLENBQUM7UUFDYjtZQUNJLE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLE1BQU07S0FDYjtBQUNMLENBQUMifQ==