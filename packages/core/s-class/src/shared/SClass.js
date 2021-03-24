var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/shared/class/getExtendsStack", "@coffeekraken/sugar/shared/is/plainObject", "@coffeekraken/sugar/shared/object/deepAssign", "@coffeekraken/sugar/shared/object/deepMerge", "@coffeekraken/sugar/shared/object/get", "@coffeekraken/sugar/shared/dev/colors/availableColors", "@coffeekraken/sugar/shared/array/pickRandom", "@coffeekraken/sugar/shared/object/toJson"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const getExtendsStack_1 = __importDefault(require("@coffeekraken/sugar/shared/class/getExtendsStack"));
    const plainObject_1 = __importDefault(require("@coffeekraken/sugar/shared/is/plainObject"));
    const deepAssign_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepAssign"));
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    const get_1 = __importDefault(require("@coffeekraken/sugar/shared/object/get"));
    const availableColors_1 = __importDefault(require("@coffeekraken/sugar/shared/dev/colors/availableColors"));
    const pickRandom_1 = __importDefault(require("@coffeekraken/sugar/shared/array/pickRandom"));
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsdUdBQWlGO0lBRWpGLDRGQUFrRTtJQUNsRSw4RkFBd0U7SUFDeEUsNEZBQXNFO0lBQ3RFLGdGQUEwRDtJQUMxRCw0R0FBc0Y7SUFDdEYsNkZBQXVFO0lBQ3ZFLHNGQUFnRTtJQTBEaEUsTUFBTSxNQUFNO1FBbUhWOzs7Ozs7Ozs7V0FTRztRQUNILFlBQVksV0FBNEIsRUFBRTtZQTVIMUM7Ozs7Ozs7OztlQVNHO1lBQ0gsY0FBUyxHQUFvQixFQUFFLENBQUM7WUFFaEM7Ozs7Ozs7OztlQVNHO1lBQ0kscUJBQWdCLEdBQVEsRUFBRSxDQUFDO1lBdUdoQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixlQUFlO1lBQ2YsV0FBVyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM1QixZQUFZO1lBQ1osZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLDBCQUEwQjtZQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7Z0JBQ25DLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQzthQUN0QixDQUFDLENBQUM7UUFDTCxDQUFDO1FBckdELHFDQUFxQztRQUNyQyx1RUFBdUU7UUFDdkUsb0NBQW9DO1FBQ3BDLDBEQUEwRDtRQUMxRCxNQUFNO1FBRU4sdUJBQXVCO1FBQ3ZCLDZEQUE2RDtRQUM3RCxpRUFBaUU7UUFDakUsMkJBQTJCO1FBQzNCLHFEQUFxRDtRQUNyRCxPQUFPO1FBRVAscUJBQXFCO1FBQ3JCLElBQUk7UUFFSjs7Ozs7Ozs7O1dBU0c7UUFDSCxJQUFJLGFBQWE7O1lBQ2YsSUFBSSxJQUFJLEdBQUcsV0FB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