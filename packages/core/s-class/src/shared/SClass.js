var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/shared/class/getExtendsStack", "@coffeekraken/sugar/shared/is/plainObject", "@coffeekraken/sugar/shared/object/deepAssign", "@coffeekraken/sugar/shared/object/deepMerge", "@coffeekraken/sugar/shared/object/get", "@coffeekraken/sugar/shared/dev/color/getColorFor", "@coffeekraken/sugar/shared/object/toJson"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const getExtendsStack_1 = __importDefault(require("@coffeekraken/sugar/shared/class/getExtendsStack"));
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsdUdBQWlGO0lBRWpGLDRGQUFrRTtJQUNsRSw4RkFBd0U7SUFDeEUsNEZBQXNFO0lBQ3RFLGdGQUEwRDtJQUUxRCxtR0FBNkU7SUFFN0Usc0ZBQWdFO0lBMERoRSxNQUFxQixNQUFNO1FBbUh6Qjs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFZLFdBQTRCLEVBQUU7WUE1SDFDOzs7Ozs7Ozs7ZUFTRztZQUNILGNBQVMsR0FBb0IsRUFBRSxDQUFDO1lBRWhDOzs7Ozs7Ozs7ZUFTRztZQUNJLHFCQUFnQixHQUFRLEVBQUUsQ0FBQztZQXVHaEMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsZUFBZTtZQUNmLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDNUIsWUFBWTtZQUNaLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QiwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO2dCQUNuQyxVQUFVLEVBQUUsSUFBSTtnQkFDaEIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDdEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQXJHRCxxQ0FBcUM7UUFDckMsdUVBQXVFO1FBQ3ZFLG9DQUFvQztRQUNwQywwREFBMEQ7UUFDMUQsTUFBTTtRQUVOLHVCQUF1QjtRQUN2Qiw2REFBNkQ7UUFDN0QsaUVBQWlFO1FBQ2pFLDJCQUEyQjtRQUMzQixxREFBcUQ7UUFDckQsT0FBTztRQUVQLHFCQUFxQjtRQUNyQixJQUFJO1FBRUo7Ozs7Ozs7OztXQVNHO1FBQ0gsSUFBSSxhQUFhOztZQUNmLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQSxNQUFB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