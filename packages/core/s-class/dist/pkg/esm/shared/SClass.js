import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __toJson from '@coffeekraken/sugar/shared/object/toJson';
export default class SClass {
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
    settings = __deepMerge({
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
    return __toJson(ctx);
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
            ctx.settings.metas.color = __getColorFor(ctx.constructor.name, {
                scope: 'class',
            });
    }
    else if (!ctx.settings.metas.color)
        ctx.settings.metas.color = 'yellow';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sYUFBYSxNQUFNLGtEQUFrRCxDQUFDO0FBQzdFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBMkRoRSxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU07SUFpRHZCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksV0FBNEIsRUFBRTtRQTFEMUM7Ozs7Ozs7OztXQVNHO1FBQ0ksYUFBUSxHQUFvQixFQUFFLENBQUM7UUFpRGxDLGVBQWU7UUFDZixXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDakMsVUFBVSxFQUFFLElBQUk7WUFDaEIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUM7U0FDeEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTNDRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQVE7UUFDbkIsTUFBTSxNQUFPLFNBQVEsR0FBRztZQUVwQixZQUFZLFFBQWEsRUFBRSxHQUFHLElBQUk7Z0JBQzlCLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUZULGFBQVEsR0FBb0IsRUFBRSxDQUFDO2dCQUdyQyxlQUFlO2dCQUNmLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzVCLDBCQUEwQjtnQkFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtvQkFDakMsVUFBVSxFQUFFLElBQUk7b0JB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