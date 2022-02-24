import __getExtendsStack from '@coffeekraken/sugar/shared/class/utils/getExtendsStack';
import __isPlain from '@coffeekraken/sugar/shared/is/plainObject';
import __deepAssign from '@coffeekraken/sugar/shared/object/deepAssign';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __get from '@coffeekraken/sugar/shared/object/get';
import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
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
         * @name            _settings
         * @type            ISClassSettings
         * @private
         *
         * Store the class settings
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._settings = {};
        /**
         * @name            _interfacesStack
         * @type            Object
         * @private
         *
         * Store the interfaces objects by class
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._interfacesStack = {};
        generateInterfacesStack(this);
        // set settings
        setSettings(this, settings);
        // interface
        applyInterfaces(this);
        // define metas enumarable
        this.metas = getMetas(this);
        Object.defineProperty(this, 'metas', {
            enumerable: true,
            value: getMetas(this),
        });
    }
    // public get metas(): ISClassMetas {
    //   let name = `<yellow>${this._settings.metas?.name || ''}</yellow>`;
    //   if (this._settings.metas?.id) {
    //     name += ` <cyan>${this._settings.metas.id}</cyan>`;
    //   }
    //   const metasObj = {
    //     id: this._settings.metas?.id ?? this.constructor.name,
    //     name: this._settings.metas?.name ?? this.constructor.name,
    //     formattedName: name,
    //     color: this._settings.metas?.color ?? 'yellow'
    //   };
    //   return metasObj;
    // }
    /**
     * @name      formattedName
     * @type      String
     * @get
     *
     * Access the process name and (not the same as a node process name)
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get formattedName() {
        var _a, _b, _c;
        let name = `<yellow>${((_a = this.metas) === null || _a === void 0 ? void 0 : _a.name) || ''}</yellow>`;
        if ((_b = this.metas) === null || _b === void 0 ? void 0 : _b.id) {
            name += ` <cyan>${(_c = this.metas) === null || _c === void 0 ? void 0 : _c.id}</cyan>`;
        }
        return name;
    }
    static extends(Cls) {
        class SClass extends Cls {
            constructor(settings, ...args) {
                super(...args);
                // public get metas(): ISClassMetas {
                // }
                this._settings = {};
                this._interfacesStack = {};
                generateInterfacesStack(this);
                // set settings
                setSettings(this, settings);
                // interface
                applyInterfaces(this);
                // define metas enumarable
                // @weird: Check why metas is not enumarable by default
                this.metas = getMetas(this);
                Object.defineProperty(this, 'metas', {
                    enumerable: true,
                    value: getMetas(this),
                });
            }
            get formattedName() {
                let name = `<yellow>${this.name || ''}</yellow>`;
                if (this.id) {
                    name += ` <cyan>${this.id}</cyan>`;
                }
                return name;
            }
            expose(instance, settings) {
                return expose(this, instance, settings);
            }
            applyInterface(name, on) {
                return applyInterface(this, name, on);
            }
            getInterface(name) {
                return getInterface(this, name);
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
    applyInterface(name, on) {
        return applyInterface(this, name, on);
    }
    getInterface(name) {
        return getInterface(this, name);
    }
    toPlainObject() {
        return toPlainObject(this);
    }
}
function getMetas(ctx) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let name = `<yellow>${((_a = ctx._settings.metas) === null || _a === void 0 ? void 0 : _a.name) || ''}</yellow>`;
    if ((_b = ctx._settings.metas) === null || _b === void 0 ? void 0 : _b.id) {
        name += ` <cyan>${ctx._settings.metas.id}</cyan>`;
    }
    const metasObj = {
        id: (_d = (_c = ctx._settings.metas) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : ctx.constructor.name,
        name: (_f = (_e = ctx._settings.metas) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : ctx.constructor.name,
        formattedName: name,
        color: (_h = (_g = ctx._settings.metas) === null || _g === void 0 ? void 0 : _g.color) !== null && _h !== void 0 ? _h : 'yellow',
    };
    return metasObj;
}
function generateInterfacesStack(ctx) {
    // get all the interfaces to apply
    const extendsStack = __getExtendsStack(ctx, {
        includeBaseClass: true,
    });
    Object.keys(extendsStack).forEach((className) => {
        const cls = extendsStack[className];
        if (cls.interfaces) {
            ctx._interfacesStack[className] = cls.interfaces;
        }
    });
}
function expose(ctx, instance, settings) {
    settings = __deepMerge({
        as: undefined,
        props: [],
    }, settings);
    if (settings.as && typeof settings.as === 'string') {
        ctx[settings.as] = instance;
    }
    if (settings.props) {
        settings.props.forEach((prop) => {
            if (instance[prop].bind && typeof instance[prop].bind === 'function') {
                ctx[prop] = instance[prop].bind(instance);
            }
            else {
                ctx[prop] = instance[prop];
            }
        });
    }
}
function getInterfaceObj(ctx, name) {
    let interfaceObj = __get(ctx._interfacesStack, name);
    if (!interfaceObj) {
        const keys = Object.keys(ctx._interfacesStack);
        for (let i = 0; i < keys.length; i++) {
            const interfacesObj = ctx._interfacesStack[keys[i]];
            if (interfacesObj[name] !== undefined) {
                if (__isPlain(interfacesObj[name])) {
                    interfaceObj = interfacesObj[name];
                }
                else {
                    interfaceObj = {
                        apply: true,
                        on: name === 'settings' ? '_settings' : name === 'this' ? ctx : undefined,
                        class: interfacesObj[name],
                    };
                }
                break;
            }
        }
    }
    if (name === 'settings' && interfaceObj.on === undefined) {
        if (ctx.settings !== undefined)
            interfaceObj.on = 'settings';
        else if (ctx._settings !== undefined)
            interfaceObj.on = '_settings';
    }
    return interfaceObj;
}
function toPlainObject(ctx) {
    return __toJson(ctx);
}
function getInterface(ctx, name) {
    const interfaceObj = getInterfaceObj(ctx, name);
    if (__isPlain(interfaceObj))
        return interfaceObj.class;
    return interfaceObj;
}
function applyInterfaces(ctx) {
    const keys = Object.keys(ctx._interfacesStack);
    for (let i = keys.length - 1; i >= 0; i--) {
        const interfacesObj = ctx._interfacesStack[keys[i]];
        const className = keys[i];
        Object.keys(interfacesObj).forEach((name) => {
            const interfaceObj = interfacesObj[name];
            let settings;
            if (__isPlain(interfaceObj)) {
                settings = Object.assign({}, Object.assign({ apply: true, on: name === 'settings' ? '_settings' : name === 'this' ? ctx : undefined }, interfaceObj));
            }
            else {
                settings = Object.assign({}, {
                    apply: true,
                    on: name === 'settings' ? '_settings' : name === 'this' ? ctx : undefined,
                    class: interfaceObj,
                });
            }
            if (settings.apply !== true)
                return;
            if (settings.on) {
                if (typeof settings.on === 'string' && __get(ctx, settings.on) !== undefined) {
                    applyInterface(ctx, `${className}.${name}`, settings.on);
                }
                else if (typeof settings.on === 'object') {
                    applyInterface(ctx, `${className}.${name}`, settings.on);
                }
                else if (ctx[name] !== undefined) {
                    applyInterface(ctx, `${className}.${name}`);
                }
            }
        });
    }
}
function applyInterface(ctx, name, on = null) {
    const interfaceObj = getInterfaceObj(ctx, `${name}`);
    if (!interfaceObj) {
        throw new Error(`You try to apply the interface named "<yellow>${name}</yellow>" on the context "<cyan>${ctx.name}</cyan>" but it does not exists...`);
    }
    if (on !== undefined)
        interfaceObj.on = on;
    if (!interfaceObj) {
        throw `Sorry the the asked interface "<yellow>${name}</yellow>" does not exists on the class "<cyan>${ctx.constructor.name}</cyan>"`;
    }
    if (name.includes('.')) {
        name = name.split('.').slice(1).join('.');
    }
    // apply the interface if exists
    if (__isPlain(interfaceObj)) {
        let onValue;
        if (interfaceObj.on && typeof interfaceObj.on === 'string') {
            onValue = __get(ctx, interfaceObj.on);
        }
        else if (interfaceObj.on && typeof interfaceObj.on === 'object') {
            onValue = interfaceObj.on;
        }
        else {
            onValue = __get(ctx, name);
        }
        let applyId = ctx.constructor.name;
        if (ctx.id)
            applyId += `(${ctx.id})`;
        if (name)
            applyId += `.${name}`;
        if (interfaceObj.on && interfaceObj.on.constructor)
            applyId += `.${interfaceObj.on.constructor.name}`;
        if (interfaceObj.on && interfaceObj.on.id)
            applyId += `(${interfaceObj.on.id})`;
        let res;
        if (name === 'this') {
            res = interfaceObj.class.apply(onValue || {}, {
                id: applyId,
                throw: true,
            });
            __deepAssign(ctx, res.value);
            return ctx;
        }
        else {
            res = interfaceObj.class.apply(onValue, {
                id: applyId,
                throw: true,
            });
            if (interfaceObj.on && typeof interfaceObj.on === 'object') {
                const returnValue = __deepAssign(interfaceObj.on, res);
                return returnValue;
            }
            else if (interfaceObj.on && typeof interfaceObj.on === 'string') {
                return __deepAssign(__get(ctx, interfaceObj.on), res);
            }
            else if (ctx[name] !== undefined) {
                return ctx[name];
            }
            else {
                return res;
            }
        }
    }
}
function setSettings(ctx, settings = {}) {
    var _a;
    // saving the settings
    ctx._settings = settings;
    // make sure a "metas" property is available
    if (!ctx._settings.metas)
        ctx._settings.metas = {};
    // make sure we have an id
    if (!((_a = ctx._settings.metas) === null || _a === void 0 ? void 0 : _a.id))
        ctx._settings.metas.id = ctx.constructor.name;
    if (!ctx.constructor.name.match(/^SConfig/)) {
        if (!ctx._settings.metas.color)
            ctx._settings.metas.color = __getColorFor(ctx.constructor.name, {
                scope: 'class',
            });
    }
    else if (!ctx._settings.metas.color)
        ctx._settings.metas.color = 'yellow';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8saUJBQWlCLE1BQU0sd0RBQXdELENBQUM7QUFFdkYsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFDbEUsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxLQUFLLE1BQU0sdUNBQXVDLENBQUM7QUFFMUQsT0FBTyxhQUFhLE1BQU0sa0RBQWtELENBQUM7QUFFN0UsT0FBTyxRQUFRLE1BQU0sMENBQTBDLENBQUM7QUEyRGhFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTTtJQW1IdkI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxXQUE0QixFQUFFO1FBNUgxQzs7Ozs7Ozs7O1dBU0c7UUFDSCxjQUFTLEdBQW9CLEVBQUUsQ0FBQztRQUVoQzs7Ozs7Ozs7O1dBU0c7UUFDSSxxQkFBZ0IsR0FBUSxFQUFFLENBQUM7UUF1RzlCLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLGVBQWU7UUFDZixXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLFlBQVk7UUFDWixlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtZQUNqQyxVQUFVLEVBQUUsSUFBSTtZQUNoQixLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQztTQUN4QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBckdELHFDQUFxQztJQUNyQyx1RUFBdUU7SUFDdkUsb0NBQW9DO0lBQ3BDLDBEQUEwRDtJQUMxRCxNQUFNO0lBRU4sdUJBQXVCO0lBQ3ZCLDZEQUE2RDtJ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