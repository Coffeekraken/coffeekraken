// @ts-nocheck
import __uncamelize from '../../../shared/string/uncamelize';
import __autoCast from '../../../shared/string/autoCast';
import __toString from '../../../shared/string/toString';
/**
 * @name      dataset
 * @namespace            js.dom.data
 * @type      Function
 * @platform          js
 * @status              wip
 *
 * Get or set a value on the passed element with the passed name
 *
 * @param       {HTMLElement}       $elm         The HTMLElement on which to set to value
 * @param       {String}            key         The key to set the data
 * @param       {Mixed}             [value=null]  The value to set
 * @return      {Mixed}                         Return the value wanted or setted
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import dataset from '@coffeekraken/sugar/js/dom/dataset';
 * dataset(myCoolElement, 'hello', 'world'); // => 'world';
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function dataset($elm, key, value = null) {
    if (!$elm.getAttribute)
        return;
    if (!value) {
        const v = $elm.dataset[key] || $elm.getAttribute('data-' + __uncamelize(key));
        return __autoCast(v);
    }
    else {
        // try to set the value
        const dataset = $elm.dataset;
        if (dataset) {
            $elm.dataset[key] = __toString(value);
        }
        else {
            // set the data through setAttribute
            // cause no support for dataset
            $elm.setAttribute('data-' + __uncamelize(key), __toString(value));
        }
        // return the element
        return $elm;
    }
}
export default dataset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sWUFBWSxNQUFNLG1DQUFtQyxDQUFDO0FBQzdELE9BQU8sVUFBVSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pELE9BQU8sVUFBVSxNQUFNLGlDQUFpQyxDQUFDO0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssR0FBRyxJQUFJO0lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWTtRQUFFLE9BQU87SUFDL0IsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE1BQU0sQ0FBQyxHQUNILElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEUsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEI7U0FBTTtRQUNILHVCQUF1QjtRQUN2QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekM7YUFBTTtZQUNILG9DQUFvQztZQUNwQywrQkFBK0I7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QscUJBQXFCO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7QUFDTCxDQUFDO0FBQ0QsZUFBZSxPQUFPLENBQUMifQ==