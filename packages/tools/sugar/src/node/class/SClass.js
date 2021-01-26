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
            onValue = ctx[interfaceObj.on];
        }
        else if (interfaceObj.on && typeof interfaceObj.on === 'object') {
            onValue = interfaceObj.on;
        }
        else {
            onValue = ctx[name];
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
            res = interfaceObj.class.apply(onValue, {
                id: applyId,
                complete: true,
                throw: true
            });
            deepMerge_1.default(ctx, res.value);
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
                const returnValue = deepMerge_1.default(interfaceObj.on, res.value);
                return returnValue;
            }
            else if (interfaceObj.on && typeof interfaceObj.on === 'string') {
                ctx[interfaceObj.on] = deepMerge_1.default(ctx[interfaceObj.on], res.value);
                return ctx[interfaceObj.on];
            }
            else if (ctx[name] !== undefined) {
                // ctx[name] = __deepMerge(ctx[name], res.value);
                return ctx[name];
            }
            else {
                throw `You try to apply the interface "<yellow>${interfaceObj.class.name}</yellow>" on a data "<cyan>${interfaceObj.on}</cyan>" that seems to be inexistant`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxVQUFVOzs7OztBQUVWLG9FQUE4QztBQUM5QyxvRUFBMEM7QUFDMUMsd0RBQWtDO0FBQ2xDLCtFQUF5RDtBQWtFekQsTUFBTSxNQUFNO0lBa0hWOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksV0FBNEIsRUFBRTtRQTNIMUM7Ozs7Ozs7OztXQVNHO1FBQ0gsY0FBUyxHQUFvQixFQUFFLENBQUM7UUFFaEM7Ozs7Ozs7OztXQVNHO1FBQ0kscUJBQWdCLEdBQVEsRUFBRSxDQUFDO1FBc0doQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixlQUFlO1FBQ2YsV0FBVyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1QixZQUFZO1FBQ1osZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUF6R0Q7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQVcsRUFBRTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFXLElBQUksQ0FBQyxLQUFLO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxhQUFhO1FBQ2YsSUFBSSxJQUFJLEdBQUcsV0FBVyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsV0FBVyxDQUFDO1FBQ2pELElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNYLElBQUksSUFBSSxV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