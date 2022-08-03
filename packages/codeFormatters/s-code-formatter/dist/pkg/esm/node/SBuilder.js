import __SClass from '@coffeekraken/s-class';
import __SDuration from '@coffeekraken/s-duration';
import __SLog from '@coffeekraken/s-log';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
class SBuilder extends __SClass {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super(__deepMerge({
            interface: undefined,
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    build(params = {}, settings = {}) {
        settings = __deepMerge(this.settings, settings);
        const duration = new __SDuration();
        // @weird:ts-compilation-issue
        let finalParams = params;
        if (settings.interface) {
            finalParams = settings.interface.apply(params);
        }
        // @ts-ignore
        if (!this._build) {
            throw new Error(`<yellow>[SBuilder]</yellow> Your "<yellow>${this.constructor.name}</yellow>" MUST have a "<magenta>_build</magenta>" method...`);
        }
        // @ts-ignore
        const promise = this._build(finalParams, settings);
        promise.emit('log', {
            type: __SLog.TYPE_INFO,
            value: `<yellow>[build]</yellow> Start ${this.constructor.name} build`,
        });
        promise.then(() => {
            promise.emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[success]</green> Build ${this.constructor.name} finished <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
            });
        });
        return promise;
    }
}
export default SBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBd0N0RSxNQUFNLFFBQVMsU0FBUSxRQUFRO0lBQzNCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBb0M7UUFDNUMsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLFNBQVMsRUFBRSxTQUFTO1NBQ3ZCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILEtBQUssQ0FBQyxTQUFjLEVBQUUsRUFBRSxXQUFnQixFQUFFO1FBQ3RDLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVoRCxNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRW5DLDhCQUE4QjtRQUM5QixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDekIsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ3BCLFdBQVcsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNsRDtRQUVELGFBQWE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQ1gsNkNBQTZDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSw4REFBOEQsQ0FDbkksQ0FBQztTQUNMO1FBRUQsYUFBYTtRQUNiLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRW5ELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2hCLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztZQUN0QixLQUFLLEVBQUUsa0NBQWtDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxRQUFRO1NBQ3pFLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hCLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztnQkFDdEIsS0FBSyxFQUFFLGtDQUNILElBQUksQ0FBQyxXQUFXLENBQUMsSUFDckIsb0RBQ0ksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixXQUFXO2FBQ2QsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0NBQ0o7QUFFRCxlQUFlLFFBQVEsQ0FBQyJ9