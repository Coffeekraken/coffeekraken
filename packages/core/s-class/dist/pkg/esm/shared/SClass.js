import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __toJson from '@coffeekraken/sugar/shared/object/toJson';
export default class SClass {
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
         * @public
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
    // if (!ctx.constructor.name.match(/^SConfig/)) {
    //     if (!ctx.settings.metas.color)
    //         ctx.settings.metas.color = __getColorFor(ctx.constructor.name, {
    //             scope: 'class',
    //         });
    // } else if (!ctx.settings.metas.color) ctx.settings.metas.color = 'yellow';
    ctx.settings.metas.color = 'yellow';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBb0VoRSxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU07SUEwQnZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBUTtRQUNuQixNQUFNLE1BQU8sU0FBUSxHQUFHO1lBRXBCLFlBQVksUUFBYSxFQUFFLEdBQUcsSUFBSTtnQkFDOUIsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBRlQsYUFBUSxHQUFvQixFQUFFLENBQUM7Z0JBR3JDLGVBQWU7Z0JBQ2YsV0FBVyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDNUIsMEJBQTBCO2dCQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO29CQUNqQyxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUM7aUJBQ3hCLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCxNQUFNLENBQUMsUUFBYSxFQUFFLFFBQStCO2dCQUNqRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLENBQUM7WUFDRCxhQUFhO2dCQUNULE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLENBQUM7U0FDSjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFdBQTRCLEVBQUU7UUEzRDFDOzs7Ozs7Ozs7V0FTRztRQUNJLGFBQVEsR0FBb0IsRUFBRSxDQUFDO1FBa0RsQyxlQUFlO1FBQ2YsV0FBVyxDQUFD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