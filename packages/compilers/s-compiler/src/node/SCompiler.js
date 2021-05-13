import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
class SCompiler extends __SEventEmitter {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams, settings) {
        super(__deepMerge({
            compiler: {}
        }, settings || {}));
        this.initialParams = Object.assign({}, initialParams);
    }
    /**
     * @name            compile
     * @type            Function
     *
     * This method is the one you have to call when you want to launch a compilation process.
     * It will call the ```_compile``` one which MUST return an instance of the SPromise class.
     *
     * @param           {String|Array<String>}          input           Specify the input to use for compilation
     * @param           {Object}                        [settings={}]       Specify an object of settings to configure your compilation process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    compile(params = {}, settings = {}) {
        settings = __deepMerge(this._settings, settings);
        // @weird:ts-compilation-issue
        params = this.applyInterface('params', params);
        // @ts-ignore
        const promise = this._compile(params, settings);
        // @weird:ts-compilation-issue
        this.pipe(promise);
        return promise;
    }
}
export default SCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBMkM1RCxNQUFNLFNBQVUsU0FBUSxlQUFlO0lBWXJDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksYUFBa0IsRUFBRSxRQUFnQztRQUM5RCxLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsUUFBUSxFQUFFLEVBQUU7U0FDYixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsT0FBTyxDQUFDLFNBQWMsRUFBRSxFQUFFLFdBQWdCLEVBQUU7UUFDMUMsUUFBUSxHQUFHLFdBQVcsQ0FBTyxJQUFLLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXhELDhCQUE4QjtRQUM5QixNQUFNLEdBQVMsSUFBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFdEQsYUFBYTtRQUNiLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELDhCQUE4QjtRQUN4QixJQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQUVELGVBQWUsU0FBUyxDQUFDIn0=