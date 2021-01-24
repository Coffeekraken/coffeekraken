"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const plainObject_1 = __importDefault(require("../is/plainObject"));
const get_1 = __importDefault(require("../object/get"));
const getExtendsStack_1 = __importDefault(require("../class/getExtendsStack"));
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
    }
    /**
     * @name            id
     * @type            String
     * @get
     *
     * Access the id setted in the ```_settings.id```
     * By default, the id will be the ```constructor.name```
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get id() {
        return this._settings.id || this.constructor.name;
    }
    /**
     * @name            name
     * @type            String
     * @get
     *
     * Access the name setted in the ```_settings.name```
     * By default, the name will be the ```constructor.name```
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    set name(value) {
        this._settings.name = value;
    }
    get name() {
        return this._settings.name || this.constructor.name;
    }
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
        let name = `<yellow>${this.name || ''}</yellow>`;
        if (this.id) {
            name += ` <cyan>${this.id}</cyan>`;
        }
        return name;
    }
    static extends(Cls) {
        class SClass extends Cls {
            constructor(settings, ...args) {
                super(...args);
                this._settings = {};
                this._interfacesStack = {};
                generateInterfacesStack(this);
                // set settings
                setSettings(this, settings);
                // interface
                applyInterfaces(this);
            }
            get id() {
                return this._settings.id || this.constructor.name;
            }
            get name() {
                return this._settings.name || this.constructor.name;
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
    return interfaceObj;
}
function getInterface(ctx, name) {
    let interfaceObj = getInterfaceObj(ctx, name);
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
            const settings = Object.assign({}, Object.assign({ apply: true, on: undefined }, interfaceObj));
            if (settings.apply !== true)
                return;
            let on;
            if (settings.on) {
                if (get_1.default(ctx, settings.on) !== undefined) {
                    on = get_1.default(ctx, settings.on);
                }
            }
            applyInterface(ctx, `${className}.${name}`, on);
        });
    }
}
function applyInterface(ctx, name, on = null) {
    let interfaceObj = getInterfaceObj(ctx, `${name}`);
    if (on !== undefined)
        interfaceObj.on = on;
    if (!interfaceObj) {
        throw `Sorry the the asked interface "<yellow>${name}</yellow>" does not exists on the class "<cyan>${ctx.constructor.name}</cyan>"`;
    }
    if (name.includes('.')) {
        name = name.split('.').slice(1).join('.');
    }
    let res;
    // apply the interface if exists
    if (!plainObject_1.default(interfaceObj) && interfaceObj.apply !== undefined) {
        res = interfaceObj.apply(on || ctx);
    }
    else if (plainObject_1.default(interfaceObj)) {
        const interfaceClass = plainObject_1.default(interfaceObj)
            ? interfaceObj.class
            : interfaceObj;
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
        if (name === 'this') {
            res = interfaceClass.apply(onValue, {
                id: applyId,
                complete: true,
                throw: true
            });
            deepMerge_1.default(ctx, res.value);
        }
        else {
            res = interfaceClass.apply(onValue, {
                id: applyId,
                complete: true,
                throw: true
            });
            if (interfaceObj.on && typeof interfaceObj.on === 'object') {
                interfaceObj.on = deepMerge_1.default(interfaceObj.on, res.value);
            }
            else {
                ctx[name] = deepMerge_1.default(ctx[name], res.value);
            }
        }
    }
    return res;
}
function setSettings(ctx, settings = {}) {
    // saving the settings
    ctx._settings = settings;
}
// const cls: ISClass = SClass;
exports.default = SClass;
//# sourceMappingURL=SClass.js.map