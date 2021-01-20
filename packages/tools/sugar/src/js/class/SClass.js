"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const plainObject_1 = __importDefault(require("../is/plainObject"));
const get_1 = __importDefault(require("../object/get"));
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
        // saving the settings
        setSettings(this, settings);
        // interface
        applyInterface(this);
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
                // saving the settings
                setSettings(this, settings);
                // interface
                applyInterface(this);
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
function getInterface(ctx, name) {
    if (!ctx.constructor.interfaces || !ctx.constructor.interfaces[name])
        return undefined;
    if (plainObject_1.default(ctx.constructor.interfaces[name]))
        return ctx.constructor.interfaces[name].class;
    return ctx.constructor.interfaces[name];
}
function applyInterface(ctx, name, on) {
    if (!ctx.constructor.interfaces)
        return undefined;
    let interfacesObj = ctx.constructor.interfaces;
    if (name !== undefined && ctx.constructor.interfaces[name] !== undefined) {
        interfacesObj = {
            [name]: ctx.constructor.interfaces[name]
        };
    }
    let res;
    // apply the interface if exists
    if (!plainObject_1.default(interfacesObj) && interfacesObj.apply !== undefined) {
        res = interfacesObj.apply(on || ctx);
    }
    else if (plainObject_1.default(interfacesObj)) {
        Object.keys(interfacesObj).forEach((prop) => {
            const interfaceObj = interfacesObj[prop];
            const autoApply = plainObject_1.default(interfaceObj)
                ? interfaceObj.autoApply
                : true;
            const interfaceClass = plainObject_1.default(interfaceObj)
                ? interfaceObj.class
                : interfaceObj;
            if (!name && autoApply === false)
                return;
            let applyId = ctx.constructor.name;
            if (ctx.id)
                applyId += `(${ctx.id})`;
            if (name)
                applyId += `.${name}`;
            if (on && on.constructor)
                applyId += `.${on.constructor.name}`;
            if (on && on.id)
                applyId += `(${on.id})`;
            if (prop === 'this') {
                res = interfaceClass.apply(on || ctx, {
                    id: applyId,
                    complete: true,
                    throw: true
                });
            }
            else {
                res = interfaceClass.apply(on || get_1.default(ctx, prop), {
                    id: applyId,
                    complete: true,
                    throw: true
                });
            }
        });
    }
    if (name !== undefined) {
        return res;
    }
}
function setSettings(ctx, settings = {}) {
    // saving the settings
    if (ctx.constructor.settingsInterface) {
        ctx._settings = deepMerge_1.default(ctx.constructor.settingsInterface.defaults(), settings);
    }
    else {
        ctx._settings = settings;
    }
}
// const cls: ISClass = SClass;
exports.default = SClass;
//# sourceMappingURL=SClass.js.map