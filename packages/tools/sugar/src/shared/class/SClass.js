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
     * @name            metas
     * @type            String
     * @get
     *
     * Access the metas in the ```_settings.metas```
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get metas() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let name = `<yellow>${((_a = this._settings.metas) === null || _a === void 0 ? void 0 : _a.name) || ''}</yellow>`;
        if ((_b = this._settings.metas) === null || _b === void 0 ? void 0 : _b.id) {
            name += ` <cyan>${this._settings.metas.id}</cyan>`;
        }
        const metasObj = {
            id: (_d = (_c = this._settings.metas) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : this.constructor.name,
            name: (_f = (_e = this._settings.metas) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : this.constructor.name,
            formattedName: name,
            color: (_h = (_g = this._settings.metas) === null || _g === void 0 ? void 0 : _g.color) !== null && _h !== void 0 ? _h : 'yellow'
        };
        return metasObj;
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
        let name = `<yellow>${this.metas.name || ''}</yellow>`;
        if (this.metas.id) {
            name += ` <cyan>${this.metas.id}</cyan>`;
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
            get metas() {
                return this._settings.metas;
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
    var _a;
    // saving the settings
    ctx._settings = settings;
    // make sure a "metas" property is available
    if (!ctx._settings.metas)
        ctx._settings.metas = {};
    // make sure we have an id
    if (!ctx._settings.id && !((_a = ctx._settings.metas) === null || _a === void 0 ? void 0 : _a.id))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0VBQXlEO0FBRXpELG9FQUEwQztBQUMxQyxzRUFBZ0Q7QUFDaEQsb0VBQThDO0FBQzlDLHdEQUFrQztBQUNsQyxvRkFBOEQ7QUFDOUQscUVBQStDO0FBMEQvQyxNQUFNLE1BQU07SUF3R1Y7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxXQUE0QixFQUFFO1FBakgxQzs7Ozs7Ozs7O1dBU0c7UUFDSCxjQUFTLEdBQW9CLEVBQUUsQ0FBQztRQUVoQzs7Ozs7Ozs7O1dBU0c7UUFDSSxxQkFBZ0IsR0FBUSxFQUFFLENBQUM7UUE0RmhDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLGVBQWU7UUFDZixXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLFlBQVk7UUFDWixlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQS9GRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFXLEtBQUs7O1FBQ2QsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFBLE1BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLDBDQUFFLElBQUksS0FBSSxFQUFFLFdBQVcsQ0FBQztRQUNsRSxJQUFJLE1BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLDBDQUFFLEVBQUUsRUFBRTtZQUM1QixJQUFJLElBQUksVUFBVSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVMsQ0FBQztTQUNwRDtRQUVELE1BQU0sUUFBUSxHQUFHO1lBQ2YsRUFBRSxFQUFFLE1BQUEsTUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssMENBQUUsRUFBRSxtQ0FBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7WUFDckQsSUFBSSxFQUFFLE1BQUEsTUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssMENBQUUs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