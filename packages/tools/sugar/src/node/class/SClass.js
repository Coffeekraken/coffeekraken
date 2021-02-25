// @shared
import __deepAssign from '../object/deepAssign';
import __deepMerge from '../object/deepMerge';
import __isPlain from '../is/plainObject';
import __get from '../object/get';
import __getExtendsStack from '../class/getExtendsStack';
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
            const settings = Object.assign({}, Object.assign({ apply: true, on: name === 'this' ? ctx : undefined }, interfaceObj));
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
            // if (typeof interfaceObj.on !== 'string') {
            //   nativeConsole.trace('COCO', interfaceObj.on);
            // }
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
    // saving the settings
    ctx._settings = settings;
}
// const cls: ISClass = SClass;
export default SClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7QUFFVixPQUFPLFlBQVksTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLEtBQUssTUFBTSxlQUFlLENBQUM7QUFFbEMsT0FBTyxpQkFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQWtFekQsTUFBTSxNQUFNO0lBa0hWOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksV0FBNEIsRUFBRTtRQTNIMUM7Ozs7Ozs7OztXQVNHO1FBQ0gsY0FBUyxHQUFvQixFQUFFLENBQUM7UUFFaEM7Ozs7Ozs7OztXQVNHO1FBQ0kscUJBQWdCLEdBQVEsRUFBRSxDQUFDO1FBc0doQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixlQUFlO1FBQ2YsV0FBVyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1QixZQUFZO1FBQ1osZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUF6R0Q7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQVcsRUFBRTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFXLElBQUksQ0FBQyxLQUFLO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxhQUFh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