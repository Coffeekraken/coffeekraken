"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    // if (!ctx.constructor.name.match(/^SConfig/)) {
    //     if (!ctx.settings.metas.color)
    //         ctx.settings.metas.color = __getColorFor(ctx.constructor.name, {
    //             scope: 'class',
    //         });
    // } else if (!ctx.settings.metas.color) ctx.settings.metas.color = 'yellow';
    ctx.settings.metas.color = 'yellow';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNEZBQXNFO0FBQ3RFLHNGQUFnRTtBQTJEaEUsTUFBcUIsTUFBTTtJQWlEdkI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxXQUE0QixFQUFFO1FBMUQxQzs7Ozs7Ozs7O1dBU0c7UUFDSSxhQUFRLEdBQW9CLEVBQUUsQ0FBQztRQWlEbEMsZUFBZTtRQUNmLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDNUIsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtZQUNqQyxVQUFVLEVBQUUsSUFBSTtZQUNoQixLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQztTQUN4QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBM0NELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBUTtRQUNuQixNQUFNLE1BQU8sU0FBUSxHQUFHO1lBRXBCLFlBQVksUUFBYSxFQUFFLEdBQUcsSUFBSTtnQkFDOUIsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBRlQsYUFBUSxHQUFvQixFQUFFLENBQUM7Z0JBR3JDLGVBQWU7Z0JBQ2YsV0FBVyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDNUIsMEJBQTBCO2dCQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO29CQUNqQyxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUM7aUJBQ3hCLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCxNQUFNLENBQUMsUUFBYSxF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