"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
class SBuilder extends s_class_1.default {
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
        super((0, deepMerge_1.default)({
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
        settings = (0, deepMerge_1.default)(this.settings, settings);
        const duration = new s_duration_1.default();
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
            type: s_log_1.default.TYPE_INFO,
            value: `<yellow>[build]</yellow> Start ${this.constructor.name} build`,
        });
        promise.then(() => {
            promise.emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<green>[success]</green> Build ${this.constructor.name} finished <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
            });
        });
        return promise;
    }
}
exports.default = SBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUVuRCxnRUFBeUM7QUFDekMsNEZBQXNFO0FBd0N0RSxNQUFNLFFBQVMsU0FBUSxpQkFBUTtJQUMzQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQW9DO1FBQzVDLEtBQUssQ0FDRCxJQUFBLG1CQUFXLEVBQ1A7WUFDSSxTQUFTLEVBQUUsU0FBUztTQUN2QixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxLQUFLLENBQUMsU0FBYyxFQUFFLEVBQUUsV0FBZ0IsRUFBRTtRQUN0QyxRQUFRLEdBQUcsSUFBQSxtQkFBVyxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFaEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7UUFFbkMsOEJBQThCO1FBQzlCLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUN6QixJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDcEIsV0FBVyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsYUFBYTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FDWCw2Q0FBNkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDhEQUE4RCxDQUNuSSxDQUFDO1NBQ0w7UUFFRCxhQUFhO1FBQ2IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFbkQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDaEIsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO1lBQ3RCLEtBQUssRUFBRSxrQ0FBa0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFFBQVE7U0FDekUsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDaEIsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsa0NBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUNyQixvREFDSSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQ25CLFdBQVc7YUFDZCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7Q0FDSjtBQUVELGtCQUFlLFFBQVEsQ0FBQyJ9