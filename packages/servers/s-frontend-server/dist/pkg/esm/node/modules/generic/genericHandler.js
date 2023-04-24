// @ts-nocheck
import __pageType from './types/page';
import __viewsType from './types/views';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQUMsR0FBRztJQUN0QyxRQUFRLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFO1FBQ3pCLEtBQUssTUFBTTtZQUNQLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU07UUFDVixLQUFLLE9BQU8sQ0FBQztRQUNiO1lBQ0ksT0FBTyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEIsTUFBTTtLQUNiO0FBQ0wsQ0FBQyJ9