import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
class SBuilder extends __SEventEmitter {
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
            builder: {
                interface: undefined
            }
        }, settings || {}));
        this.initialParams = Object.assign({}, initialParams);
    }
    /**
     * @name        builderSettings
     * @type        any
     * @get
     *
     * Access the builder settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get builderSettings() {
        return this._settings.builder;
    }
    /**
     * @name            build
     * @type            Function
     *
     * This method is the one you have to call when you want to launch a compilation process.
     * It will call the ```_build``` one which MUST return an instance of the SPromise class.
     *
     * @param           {String|Array<String>}          input           Specify the input to use for compilation
     * @param           {Object}                        [settings={}]       Specify an object of settings to configure your compilation process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    build(params = {}, settings = {}) {
        settings = __deepMerge(this.builderSettings, settings);
        // @weird:ts-compilation-issue
        let finalParams = params;
        if (settings.interface) {
            finalParams = settings.interface.apply(params).value;
        }
        // @ts-ignore
        const promise = this._build(finalParams, settings);
        // @weird:ts-compilation-issue
        this.pipe(promise);
        return promise;
    }
}
export default SBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQTJDNUQsTUFBTSxRQUFTLFNBQVEsZUFBZTtJQTBCcEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxhQUFrQixFQUFFLFFBQStCO1FBQzdELEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxPQUFPLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFLFNBQVM7YUFDckI7U0FDRixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBcENEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksZUFBZTtRQUNqQixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsT0FBTyxDQUFDO0lBQ3ZDLENBQUM7SUEwQkQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsS0FBSyxDQUFDLFNBQWMsRUFBRSxFQUFFLFdBQWdCLEVBQUU7UUFDeEMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXZELDhCQUE4QjtRQUM5QixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDekIsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ3RCLFdBQVcsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDdEQ7UUFFRCxhQUFhO1FBQ2IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkQsOEJBQThCO1FBQ3hCLElBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUIsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBRUQsZUFBZSxRQUFRLENBQUMifQ==