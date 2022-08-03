"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getColorFor_1 = __importDefault(require("@coffeekraken/sugar/shared/dev/color/getColorFor"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const toJson_1 = __importDefault(require("@coffeekraken/sugar/shared/object/toJson"));
class SClass {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings = {}) {
        /**
         * @name            settings
         * @type            ISClassSettings
         * @private
         *
         * Store the class settings
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.settings = {};
        // set settings
        setSettings(this, settings);
        // define metas enumarable
        this.metas = getMetas(this);
        Object.defineProperty(this, 'metas', {
            enumerable: true,
            value: getMetas(this),
        });
    }
    static extends(Cls) {
        class SClass extends Cls {
            constructor(settings, ...args) {
                super(...args);
                this.settings = {};
                // set settings
                setSettings(this, settings);
                // define metas enumarable
                this.metas = getMetas(this);
                Object.defineProperty(this, 'metas', {
                    enumerable: true,
                    value: getMetas(this),
                });
            }
            expose(instance, settings) {
                return expose(this, instance, settings);
            }
            toPlainObject() {
                return toPlainObject(this);
            }
        }
        return SClass;
    }
    expose(instance, settings) {
        return expose(this, instance, settings);
    }
    toPlainObject() {
        return toPlainObject(this);
    }
}
exports.default = SClass;
function getMetas(ctx) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let name = `<yellow>${((_a = ctx.settings.metas) === null || _a === void 0 ? void 0 : _a.name) || ''}</yellow>`;
    if ((_b = ctx.settings.metas) === null || _b === void 0 ? void 0 : _b.id) {
        name += ` <cyan>${ctx.settings.metas.id}</cyan>`;
    }
    const metasObj = {
        id: (_d = (_c = ctx.settings.metas) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : ctx.constructor.name,
        name: (_f = (_e = ctx.settings.metas) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : ctx.constructor.name,
        formattedName: name,
        color: (_h = (_g = ctx.settings.metas) === null || _g === void 0 ? void 0 : _g.color) !== null && _h !== void 0 ? _h : 'yellow',
    };
    return metasObj;
}
function expose(ctx, instance, settings) {
    var _a;
    settings = (0, deepMerge_1.default)({
        as: undefined,
        props: [],
    }, settings);
    if (settings.as && typeof settings.as === 'string') {
        ctx[settings.as] = instance;
    }
    (_a = settings === null || settings === void 0 ? void 0 : settings.props) === null || _a === void 0 ? void 0 : _a.forEach((prop) => {
        if (instance[prop].bind && typeof instance[prop].bind === 'function') {
            ctx[prop] = instance[prop].bind(instance);
        }
        else {
            ctx[prop] = instance[prop];
        }
    });
}
function toPlainObject(ctx) {
    return (0, toJson_1.default)(ctx);
}
function setSettings(ctx, settings = {}) {
    var _a;
    // saving the settings
    ctx.settings = settings;
    // make sure a "metas" property is available
    if (!ctx.settings.metas)
        ctx.settings.metas = {};
    // make sure we have an id
    if (!((_a = ctx.settings.metas) === null || _a === void 0 ? void 0 : _a.id))
        ctx.settings.metas.id = ctx.constructor.name;
    if (!ctx.constructor.name.match(/^SConfig/)) {
        if (!ctx.settings.metas.color)
            ctx.settings.metas.color = (0, getColorFor_1.default)(ctx.constructor.name, {
                scope: 'class',
            });
    }
    else if (!ctx.settings.metas.color)
        ctx.settings.metas.color = 'yellow';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsbUdBQTZFO0FBQzdFLDRGQUFzRTtBQUN0RSxzRkFBZ0U7QUEyRGhFLE1BQXFCLE1BQU07SUFpRHZCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksV0FBNEIsRUFBRTtRQTFEMUM7Ozs7Ozs7OztXQVNHO1FBQ0ksYUFBUSxHQUFvQixFQUFFLENBQUM7UUFpRGxDLGVBQWU7UUFDZixXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDakMsVUFBVSxFQUFFLElBQUk7WUFDaEIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUM7U0FDeEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTNDRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQVE7UUFDbkIsTUFBTSxNQUFPLFNBQVEsR0FBRztZQUVwQixZQUFZLFFBQWEsRUFBRSxHQUFHLElBQUk7Z0JBQzlCLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUZULGFBQVEsR0FBb0IsRUFBRSxDQUFDO2dCQUdyQyxlQUFlO2dCQUNmLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzVCLDBCQUEwQjtnQkFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtvQkFDakMsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDO2lCQUN4QixDQUFDLENBQUM7WUFDUCxDQUFDO1lBQ0QsTUFB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