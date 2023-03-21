"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const object_1 = require("@coffeekraken/sugar/object");
const SCarpenterAppComponent_1 = require("./SCarpenterAppComponent");
const s_front_1 = __importDefault(require("@coffeekraken/s-front"));
class SCarpenter extends s_class_1.default {
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
        var _a;
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
        const front = new s_front_1.default({
            id: 'carpenter',
            lod: {
                defaultLevel: 5,
            },
        });
        front.setLod(5);
        // features
        // __sActivateFeature();
        // components
        (0, SCarpenterAppComponent_1.define)({
            window: (_a = window.top) !== null && _a !== void 0 ? _a : window,
        });
    }
}
exports.default = SCarpenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHVEQUF5RDtBQUN6RCxxRUFBbUY7QUFFbkYsb0VBQTZDO0FBSTdDLE1BQXFCLFVBQVcsU0FBUSxpQkFBUTtJQUM1Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXVDOztRQUMvQyxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXZDLE1BQU0sS0FBSyxHQUFHLElBQUksaUJBQVEsQ0FBQztZQUN2QixFQUFFLEVBQUUsV0FBVztZQUNmLEdBQUcsRUFBRTtnQkFDRCxZQUFZLEVBQUUsQ0FBQzthQUNsQjtTQUNKLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFaEIsV0FBVztRQUNYLHdCQUF3QjtRQUV4QixhQUFhO1FBQ2IsSUFBQSwrQkFBNkIsRUFBQztZQUMxQixNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsR0FBRyxtQ0FBSSxNQUFNO1NBQy9CLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQTlCRCw2QkE4QkMifQ==