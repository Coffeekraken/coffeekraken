var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/shared/class/utils/getExtendsStack", "@coffeekraken/sugar/shared/is/plainObject", "@coffeekraken/sugar/shared/object/deepAssign", "@coffeekraken/sugar/shared/object/deepMerge", "@coffeekraken/sugar/shared/object/get", "@coffeekraken/sugar/shared/dev/color/getColorFor", "@coffeekraken/sugar/shared/object/toJson"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsNkdBQXVGO0lBRXZGLDRGQUFrRTtJQUNsRSw4RkFBd0U7SUFDeEUsNEZBQXNFO0lBQ3RFLGdGQUEwRDtJQUUxRCxtR0FBNkU7SUFFN0Usc0ZBQWdFO0lBMERoRSxNQUFxQixNQUFNO1FBbUh6Qjs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFZLFdBQTRCLEVBQUU7WUE1SDFDOzs7Ozs7Ozs7ZUFTRztZQUNILGNBQVMsR0FBb0IsRUFBRSxDQUFDO1lBRWhDOzs7Ozs7Ozs7ZUFTRztZQUNJLHFCQUFnQixHQUFRLEVBQUUsQ0FBQztZQXVHaEMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsZUFBZTtZQUNmLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDNUIsWUFBWTtZQUNaLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QiwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO2dCQUNuQyxVQUFVLEVBQUUsSUFBSTtnQkFDaEIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDdEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQXJHRCxxQ0FBcUM7UUFDckMsdUVBQXVFO1FBQ3ZFLG9DQUFvQztRQUNwQywwREFBMEQ7UUFDMUQsTUFBTTtRQUVOLHVCQUF1QjtRQUN2Qiw2REFBNkQ7UUFDN0QsaUVBQWlFO1FBQ2pFLDJCQUEyQjtRQUMzQixxREFBcUQ7UUFDckQsT0FBTztRQUVQLHFCQUFxQjtRQUNyQixJQUFJO1FBRUo7Ozs7Ozs7OztXQVNHO1FBQ0gsSUFBSSxhQUFhOztZQUNmLElBQUksSUFBSSxHQUFHLFdBQVcsT0FBQSxJQUFJ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