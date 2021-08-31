import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SClass from '@coffeekraken/s-class';
import __SDuration from '@coffeekraken/s-duration';
class SBuilder extends __SClass {
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
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        super(__deepMerge({
            builder: {
                interface: undefined,
            },
        }, settings || {}));
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
        const duration = new __SDuration();
        // @weird:ts-compilation-issue
        let finalParams = params;
        if (settings.interface) {
            finalParams = settings.interface.apply(params);
        }
        // @ts-ignore
        const promise = this._build(finalParams, settings);
        promise.emit('log', {
            value: `<yellow>[build]</yellow> Start ${this.constructor.name} build`,
        });
        promise.then(() => {
            promise.emit('log', {
                value: `<green>[success]</green> Build ${this.constructor.name} finished <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
            });
        });
        return promise;
    }
}
export default SBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQTZDbkQsTUFBTSxRQUFTLFNBQVEsUUFBUTtJQUMzQjs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGVBQWU7UUFDZixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsT0FBTyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQStCO1FBQ3ZDLEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxPQUFPLEVBQUU7Z0JBQ0wsU0FBUyxFQUFFLFNBQVM7YUFDdkI7U0FDSixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxLQUFLLENBQUMsU0FBYyxFQUFFLEVBQUUsV0FBZ0IsRUFBRTtRQUN0QyxRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFdkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUVuQyw4QkFBOEI7UUFDOUIsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRTtZQUNwQixXQUFXLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbEQ7UUFFRCxhQUFhO1FBQ2IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFbkQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDaEIsS0FBSyxFQUFFLGtDQUFrQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksUUFBUTtTQUN6RSxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNkLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNoQixLQUFLLEVBQUUsa0NBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUNyQixvREFBb0QsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixXQUFXO2FBQ2pHLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztDQUNKO0FBRUQsZUFBZSxRQUFRLENBQUMifQ==