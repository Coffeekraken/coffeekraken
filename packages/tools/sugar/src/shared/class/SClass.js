"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getExtendsStack_1 = __importDefault(require("../class/getExtendsStack"));
const plainObject_1 = __importDefault(require("../is/plainObject"));
const deepAssign_1 = __importDefault(require("../object/deepAssign"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const get_1 = __importDefault(require("../object/get"));
const availableColors_1 = __importDefault(require("../dev/colors/availableColors"));
const pickRandom_1 = __importDefault(require("../array/pickRandom"));
const toJson_1 = __importDefault(require("../object/toJson"));
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
                interfaceObj = interfacesObj[name];
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
            const settings = Object.assign({}, Object.assign({ apply: false, on: name === 'this' ? ctx : undefined }, interfaceObj));
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
            // if (typeof interfaceObj.on !== 'string') {
            //   _console.trace('COCO', interfaceObj.on);
            // }
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
            ctx._settings.metas.color = pickRandom_1.default(availableColors_1.default());
    }
    else if (!ctx._settings.metas.color)
        ctx._settings.metas.color = 'yellow';
}
// const cls: ISClass = SClass;
exports.default = SClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0VBQXlEO0FBRXpELG9FQUEwQztBQUMxQyxzRUFBZ0Q7QUFDaEQsb0VBQThDO0FBQzlDLHdEQUFrQztBQUNsQyxvRkFBOEQ7QUFDOUQscUVBQStDO0FBQy9DLDhEQUF3QztBQTBEeEMsTUFBTSxNQUFNO0lBbUhWOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksV0FBNEIsRUFBRTtRQTVIMUM7Ozs7Ozs7OztXQVNHO1FBQ0gsY0FBUyxHQUFvQixFQUFFLENBQUM7UUFFaEM7Ozs7Ozs7OztXQVNHO1FBQ0kscUJBQWdCLEdBQVEsRUFBRSxDQUFDO1FBdUdoQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixlQUFlO1FBQ2YsV0FBVyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1QixZQUFZO1FBQ1osZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDbkMsVUFBVSxFQUFFLElBQUk7WUFDaEIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUM7U0FDdEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXJHRCxxQ0FBcUM7SUFDckMsdUVBQXVFO0lBQ3ZFLG9DQUFvQztJQUNwQywwREFBMEQ7SUFDMUQsTUFBTTtJQUVOLHVCQUF1QjtJQUN2Qiw2REFBNkQ7SUFDN0QsaUVBQWlFO0lBQ2pFLDJCQUEyQjtJQUMzQixxREFBcUQ7SUFDckQsT0FBTztJQUVQLHFCQUFxQjtJQUNyQixJQUFJO0lBRUo7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxhQUFhOztRQUNmLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQSxNQUFB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