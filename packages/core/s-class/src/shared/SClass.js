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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
            value: getMetas(this)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                    value: getMetas(this)
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
        color: (_h = (_g = ctx._settings.metas) === null || _g === void 0 ? void 0 : _g.color) !== null && _h !== void 0 ? _h : 'yellow'
    };
    return metasObj;
}
function generateInterfacesStack(ctx) {
    // get all the interfaces to apply
    const extendsStack = __getExtendsStack(ctx, {
        includeBaseClass: true
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
        props: []
    }, settings);
    if (settings.as && typeof settings.as === 'string') {
        ctx[settings.as] = instance;
    }
    if (settings.props) {
        settings.props.forEach((prop) => {
            ctx[prop] = instance[prop].bind(instance);
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
                        on: name === 'settings'
                            ? '_settings'
                            : name === 'this'
                                ? ctx
                                : undefined,
                        class: interfacesObj[name]
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
                settings = Object.assign({}, Object.assign({ apply: true, on: name === 'settings'
                        ? '_settings'
                        : name === 'this'
                            ? ctx
                            : undefined }, interfaceObj));
            }
            else {
                settings = Object.assign({}, {
                    apply: true,
                    on: name === 'settings'
                        ? '_settings'
                        : name === 'this'
                            ? ctx
                            : undefined,
                    class: interfaceObj
                });
            }
            if (settings.apply !== true)
                return;
            if (settings.on) {
                if (typeof settings.on === 'string' &&
                    __get(ctx, settings.on) !== undefined) {
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
                complete: true,
                throw: true
            });
            __deepAssign(ctx, res.value);
            return ctx;
        }
        else {
            res = interfaceObj.class.apply(onValue, {
                id: applyId,
                complete: true,
                throw: true
            });
            if (interfaceObj.on && typeof interfaceObj.on === 'object') {
                const returnValue = __deepAssign(interfaceObj.on, res.value);
                return returnValue;
            }
            else if (interfaceObj.on && typeof interfaceObj.on === 'string') {
                return __deepAssign(__get(ctx, interfaceObj.on), res.value);
            }
            else if (ctx[name] !== undefined) {
                return ctx[name];
            }
            else if (!res.hasIssues()) {
                return res.value;
                // throw `You try to apply the interface "<yellow>${interfaceObj.class.name}</yellow>" on a data "<cyan>${interfaceObj.on}</cyan>" that seems to be inexistant`;
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
                scope: 'class'
            });
    }
    else if (!ctx._settings.metas.color)
        ctx._settings.metas.color = 'yellow';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8saUJBQWlCLE1BQU0sd0RBQXdELENBQUM7QUFFdkYsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFDbEUsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxLQUFLLE1BQU0sdUNBQXVDLENBQUM7QUFFMUQsT0FBTyxhQUFhLE1BQU0sa0RBQWtELENBQUM7QUFFN0UsT0FBTyxRQUFRLE1BQU0sMENBQTBDLENBQUM7QUEwRGhFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTTtJQW1IekI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxXQUE0QixFQUFFO1FBNUgxQzs7Ozs7Ozs7O1dBU0c7UUFDSCxjQUFTLEdBQW9CLEVBQUUsQ0FBQztRQUVoQzs7Ozs7Ozs7O1dBU0c7UUFDSSxxQkFBZ0IsR0FBUSxFQUFFLENBQUM7UUF1R2hDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLGVBQWU7UUFDZixXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLFlBQVk7UUFDWixlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtZQUNuQyxVQUFVLEVBQUUsSUFBSTtZQUNoQixLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQztTQUN0QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBckdELHFDQUFxQztJQUNyQyx1RUFBdUU7SUFDdkUsb0NBQW9DO0lBQ3BDLDBEQUEwRDtJQUMxRCxNQUFNO0lBRU4sdUJBQXVCO0lBQ3ZCLDZEQUE2RDtJ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