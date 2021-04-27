// @ts-nocheck
/**
 * @name                                    methodExists
 * @namespace            js.class.utils
 * @type                                    Function
 * @stable
 *
 * Check if one or more methods exists on a class instance
 *
 * @param           {Object}              instance                The instance to check the methods on
 * @param           {String}              ...methods              The methods to check
 * @return          {Boolean|Array}                               Return true if all is ok, and an array of missing methods if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * class Coco {
 *    hello() {}
 * }
 * import methodExists from '@coffeekraken/sugar/node/class/utils/methodExists';
 * const myInstance = new Coco();
 * methodExists(myInstance, 'hello', 'world'); // => ['world'];
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function methodExists(instance, ...methods) {
    const missingMethodsArray = [];
    if (!Array.isArray(methods))
        methods = [methods];
    methods.forEach((method) => {
        if (typeof instance[method] !== 'function')
            missingMethodsArray.push(method);
    });
    return !missingMethodsArray.length ? true : missingMethodsArray;
}
export default methodExists;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kRXhpc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC9jbGFzcy91dGlscy9tZXRob2RFeGlzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsWUFBWSxDQUFDLFFBQVEsRUFBRSxHQUFHLE9BQU87SUFDeEMsTUFBTSxtQkFBbUIsR0FBRyxFQUFFLENBQUM7SUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQUUsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3pCLElBQUksT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssVUFBVTtZQUN4QyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO0FBQ2xFLENBQUM7QUFDRCxlQUFlLFlBQVksQ0FBQyJ9