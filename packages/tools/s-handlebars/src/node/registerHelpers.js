import * as __helpers from './helpers/index';
/**
 * @name            registerHelpers
 * @namespace       node
 * @type            Function
 * @platform        js
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This function allows you to register all the helpers provided in this package
 * directly on your handlebars instance.
 *
 * @param       {Object}        handlebars      The handlebars instance on which to register the helpers
 *
 * @example         js
 * import { registerHelpers } from '@coffeekraken/s-handlebars';
 * import __handlebars from 'handlebars';
 * registerHelpers(__handlebard);
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function registerHelpers(handlebars) {
    for (const [key, value] of Object.entries(__helpers)) {
        handlebars.registerHelper(key, value);
        console.log;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJIZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXJIZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sS0FBSyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZUFBZSxDQUFDLFVBQWU7SUFDbkQsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDbEQsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQztLQUNmO0FBQ0wsQ0FBQyJ9