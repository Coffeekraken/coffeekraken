"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getExtendsStack_1 = __importDefault(require("@coffeekraken/sugar/shared/class/utils/getExtendsStack"));
const plainObject_1 = __importDefault(require("@coffeekraken/sugar/shared/is/plainObject"));
const deepAssign_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepAssign"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const get_1 = __importDefault(require("@coffeekraken/sugar/shared/object/get"));
const getColorFor_1 = __importDefault(require("@coffeekraken/sugar/shared/dev/color/getColorFor"));
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
exports.default = SClass;
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
    const extendsStack = getExtendsStack_1.default(ctx, {
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
    settings = deepMerge_1.default({
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
    let interfaceObj = get_1.default(ctx._interfacesStack, name);
    if (!interfaceObj) {
        const keys = Object.keys(ctx._interfacesStack);
        for (let i = 0; i < keys.length; i++) {
            const interfacesObj = ctx._interfacesStack[keys[i]];
            if (interfacesObj[name] !== undefined) {
                if (plainObject_1.default(interfacesObj[name])) {
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
    return toJson_1.default(ctx);
}
function getInterface(ctx, name) {
    const interfaceObj = getInterfaceObj(ctx, name);
    if (plainObject_1.default(interfaceObj))
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
            if (plainObject_1.default(interfaceObj)) {
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
                    get_1.default(ctx, settings.on) !== undefined) {
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
    if (plainObject_1.default(interfaceObj)) {
        let onValue;
        if (interfaceObj.on && typeof interfaceObj.on === 'string') {
            onValue = get_1.default(ctx, interfaceObj.on);
        }
        else if (interfaceObj.on && typeof interfaceObj.on === 'object') {
            onValue = interfaceObj.on;
        }
        else {
            onValue = get_1.default(ctx, name);
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
            deepAssign_1.default(ctx, res.value);
            return ctx;
        }
        else {
            res = interfaceObj.class.apply(onValue, {
                id: applyId,
                complete: true,
                throw: true
            });
            if (interfaceObj.on && typeof interfaceObj.on === 'object') {
                const returnValue = deepAssign_1.default(interfaceObj.on, res.value);
                return returnValue;
            }
            else if (interfaceObj.on && typeof interfaceObj.on === 'string') {
                return deepAssign_1.default(get_1.default(ctx, interfaceObj.on), res.value);
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
            ctx._settings.metas.color = getColorFor_1.default(ctx.constructor.name, {
                scope: 'class'
            });
    }
    else if (!ctx._settings.metas.color)
        ctx._settings.metas.color = 'yellow';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLWNsYXNzL3NyYy9zaGFyZWQvU0NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkdBQXVGO0FBRXZGLDRGQUFrRTtBQUNsRSw4RkFBd0U7QUFDeEUsNEZBQXNFO0FBQ3RFLGdGQUEwRDtBQUUxRCxtR0FBNkU7QUFFN0Usc0ZBQWdFO0FBMERoRSxNQUFxQixNQUFNO0lBbUh6Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFdBQTRCLEVBQUU7UUE1SDFDOzs7Ozs7Ozs7V0FTRztRQUNILGNBQVMsR0FBb0IsRUFBRSxDQUFDO1FBRWhDOzs7Ozs7Ozs7V0FTRztRQUNJLHFCQUFnQixHQUFRLEVBQUUsQ0FBQztRQXVHaEMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsZUFBZTtRQUNmLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDNUIsWUFBWTtRQUNaLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QiwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQ25DLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDO1NBQ3RCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFyR0QscUNBQXFDO0lBQ3JDLHVFQUF1RTtJQUN2RSxvQ0FBb0M7SUFDcEMsMERBQTBEO0lBQzFELE1BQU07SUFFTix1QkFBdUI7SUFDdkIsNkRBQTZEO0lBQzdELGlFQUFpRTtJQUNqRSwyQkFBMkI7SUFDM0IscURBQXFEO0lBQ3JELE9BQU87SUFFUCxxQkFBcUI7SUFDckIsSUFBSTtJQUVKOzs7Ozs7Ozs7T0FTRztJ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