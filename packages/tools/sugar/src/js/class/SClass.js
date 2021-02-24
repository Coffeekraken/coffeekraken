"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepAssign_1 = __importDefault(require("../object/deepAssign"));
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
    if (name === 'settings' && interfaceObj.on === undefined) {
        if (ctx.settings !== undefined)
            interfaceObj.on = 'settings';
        else if (ctx._settings !== undefined)
            interfaceObj.on = '_settings';
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
            const settings = Object.assign({}, Object.assign({ apply: true, on: name === 'this' ? ctx : undefined }, interfaceObj));
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
    let interfaceObj = getInterfaceObj(ctx, `${name}`);
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
            //   nativeConsole.trace('COCO', interfaceObj.on);
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
    // saving the settings
    ctx._settings = settings;
}
// const cls: ISClass = SClass;
exports.default = SClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxVQUFVOzs7OztBQUVWLHNFQUFnRDtBQUNoRCxvRUFBOEM7QUFDOUMsb0VBQTBDO0FBQzFDLHdEQUFrQztBQUVsQywrRUFBeUQ7QUFrRXpELE1BQU0sTUFBTTtJQWtIVjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFdBQTRCLEVBQUU7UUEzSDFDOzs7Ozs7Ozs7V0FTRztRQUNILGNBQVMsR0FBb0IsRUFBRSxDQUFDO1FBRWhDOzs7Ozs7Ozs7V0FTRztRQUNJLHFCQUFnQixHQUFRLEVBQUUsQ0FBQztRQXNHaEMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsZUFBZTtRQUNmLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDNUIsWUFBWTtRQUNaLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBekdEOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFXLEVBQUU7UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBQ3BELENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBVyxJQUFJLENBQUMsS0FBSztRQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUNELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksYUFBYTtRQUNmLElBQUksSUFBSSxHQUFHLFdBQVcsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLFdBQVcsQ0FBQztRQUNqRCxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFD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