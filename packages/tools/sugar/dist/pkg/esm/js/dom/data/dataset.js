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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSxtQ0FBbUMsQ0FBQztBQUM3RCxPQUFPLFVBQVUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6RCxPQUFPLFVBQVUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEdBQUcsSUFBSTtJQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVk7UUFBRSxPQUFPO0lBQy9CLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDUixNQUFNLENBQUMsR0FDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3hCO1NBQU07UUFDSCx1QkFBdUI7UUFDdkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pDO2FBQU07WUFDSCxvQ0FBb0M7WUFDcEMsK0JBQStCO1lBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNyRTtRQUNELHFCQUFxQjtRQUNyQixPQUFPLElBQUksQ0FBQztLQUNmO0FBQ0wsQ0FBQztBQUNELGVBQWUsT0FBTyxDQUFDIn0=