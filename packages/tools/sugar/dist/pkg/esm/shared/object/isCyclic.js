// @ts-nocheck
/**
 * @name                isCyclic
 * @namespace            shared.object
 * @type                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function check if the passed object has circular dependencies and if so, returns where it has been found in the object
 *
 * @param           {Object}            object              The object to check
 * @return          {String|false}                              false if all is ok, a string that tells where the circular dep has been found if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import __isCyclic from '@coffeekraken/sugar/node/object/isCyclic';
 * const obj = { hello: 'world' };
 * obj.cyclic = obj;
 * __isCyclic(obj);
 *
 * @see            https://stackoverflow.com/questions/14962018/detecting-and-fixing-circular-references-in-javascript
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function isCyclic(obj) {
    var seenObjects = [];
    function detect(obj) {
        if (obj && typeof obj === 'object') {
            if (seenObjects.indexOf(obj) !== -1) {
                return true;
            }
            seenObjects.push(obj);
            for (var key in obj) {
                if (obj.hasOwnProperty(key) && detect(obj[key])) {
                    return [
                        JSON.stringify(obj, null, 4),
                        'cycle at ' + key,
                    ].join('\n\n');
                }
            }
        }
        return false;
    }
    return detect(obj);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFFBQVEsQ0FBQyxHQUFHO0lBQ2hDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUVyQixTQUFTLE1BQU0sQ0FBQyxHQUFHO1FBQ2YsSUFBSSxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQ2hDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDakMsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEIsS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7Z0JBQ2pCLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQzdDLE9BQU87d0JBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDNUIsV0FBVyxHQUFHLEdBQUc7cUJBQ3BCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNsQjthQUNKO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkIsQ0FBQyJ9