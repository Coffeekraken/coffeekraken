"use strict";
// @ts-nocheck
// @TODO            check how to override private static methods
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.html = void 0;
const s_component_utils_1 = __importStar(require("@coffeekraken/s-component-utils"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
const dom_1 = require("@coffeekraken/sugar/dom");
const html_1 = require("@coffeekraken/sugar/html");
const object_1 = require("@coffeekraken/sugar/object");
const dashCase_1 = __importDefault(require("@coffeekraken/sugar/shared/string/dashCase"));
const lit_1 = require("lit");
function tplToStr(tpl) {
    var _a, _b, _c;
    if (!tpl) {
        return '';
    }
    if (typeof tpl === 'string') {
        return tpl;
    }
    else if (tpl.strings && tpl.values) {
        let str = tpl.strings[0];
        for (let i = 1; i < tpl.strings.length; i++) {
            const val = (_b = (_a = tpl.values) === null || _a === void 0 ? void 0 : _a[i - 1]) !== null && _b !== void 0 ? _b : '';
            if (typeof val === 'string') {
                str += val;
            }
            else if (Array.isArray(val)) {
                val.forEach((v) => {
                    str += tplToStr(v);
                });
            }
            else if (val.values) {
                str += tplToStr(val);
            }
            str += (_c = tpl.strings[i]) !== null && _c !== void 0 ? _c : '';
        }
        return str;
    }
    else if (tpl.values) {
        let str = '';
        tpl.values.forEach((val) => {
            str += val;
        });
        return str;
    }
}
function html(strings, ...values) {
    var _a, _b;
    const newStrings = [];
    newStrings.raw = strings.raw;
    const newValues = [];
    const classmap = (_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.classmap;
    let inClass = false, newClasses = [];
    for (let i = 0; i < strings.length; i++) {
        let newStr = strings[i], newVal = values[i];
        // patch html if a classmap is available
        // and expand classnames
        newStr = (0, html_1.__expandPleasantCssClassnames)(newStr);
        // if (classmap && (inClass || newStr.match(/class="/))) {
        //     newStr = classmap.patchHtml(newStr);
        // }
        // patch html in the value if possible
        // and expand classnames
        if (newVal && typeof newVal === 'string') {
            newVal = (0, html_1.__expandPleasantCssClassnames)(newVal);
            // if (classmap && (inClass || newStr.match(/class="/))) {
            //     newVal = classmap.patchHtml(newVal);
            // }
        }
        // // check if the newStr ends with some classes like `class="my-class ${something}`
        // const classesMatches = newStr.match(/class="([a-zA-Z0-9_-\s]+)$/m);
        // if (inClass && typeof values[i] === 'string') {
        //     newClasses.push(values[i]);
        // } else if (classesMatches?.[1]) {
        //     inClass = true;
        // } else if (i > 0 && inClass && newStr.match(/^"/)) {
        //     newStrings[i - 1] += ` ${newClasses.join(' ')}`;
        //     newClasses = [];
        //     inClass = false;
        // }
        // add the new string into the template string
        newStrings.push(newStr);
        // add the new value
        newValues.push(newVal);
    }
    // console.log(newStrings);
    return (0, lit_1.html)(newStrings, ...newValues);
}
exports.html = html;
class SLitComponent extends lit_1.LitElement {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(settings = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        super();
        /**
         * @name            settings
         * @type            Object
         * @private
         *
         * Store the settings
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.settings = {};
        /**
         * @name            props
         * @type            Object
         *
         * Store the component props
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.props = {};
        this._shouldUpdate = false;
        this._state = {};
        this.settings = (0, object_1.__deepMerge)({
            componentUtils: {},
            shadowDom: false,
            get rootNode() {
                var _a;
                return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('*:first-child');
            },
        }, settings);
        // init default state
        if (this.constructor.state) {
            this.state = Object.assign({}, this.constructor.state);
        }
        else {
            this.state = {};
        }
        if (!((_a = this.state) === null || _a === void 0 ? void 0 : _a.status)) {
            this.state.status = 'idle';
        }
        // shadow handler
        if (this.settings.shadowDom === false) {
            this.createRenderRoot = () => {
                return this;
            };
        }
        // make sure the injected styles stays BEFORE the link[rel="stylesheet"]
        // to avoid style override
        if (!SLitComponent._keepInjectedCssBeforeStylesheetLinksInited) {
            const $firstStylesheetLink = document.head.querySelector('link[rel="stylesheet"]');
            (0, dom_1.__querySelectorLive)('style', ($style) => {
                if ($firstStylesheetLink) {
                    document.head.insertBefore($style, $firstStylesheetLink);
                }
            }, {
                rootNode: document.head,
            });
            SLitComponent._keepInjectedCssBeforeStylesheetLinksInited = true;
        }
        // @ts-ignore
        const nodeFirstUpdated = (_b = this.firstUpdated) === null || _b === void 0 ? void 0 : _b.bind(this);
        // @ts-ignore
        this.firstUpdated = () => __awaiter(this, void 0, void 0, function* () {
            if (nodeFirstUpdated) {
                yield nodeFirstUpdated();
            }
            // set the component as mounted
            // @ts-ignore
            this.setAttribute('mounted', true);
        });
        // litElement shouldUpdate
        // @ts-ignore
        const nodeShouldUpdate = (_c = this.shouldUpdate) === null || _c === void 0 ? void 0 : _c.bind(this);
        // @ts-ignore
        this.shouldUpdate = () => {
            if (nodeShouldUpdate) {
                const res = nodeShouldUpdate();
                if (!res)
                    return false;
            }
            return this._shouldUpdate;
        };
        this.cu = new s_component_utils_1.default(this, Object.assign(Object.assign(Object.assign({}, ((_d = this.settings) !== null && _d !== void 0 ? _d : {})), ((_e = this.settings.componentUtils) !== null && _e !== void 0 ? _e : {})), { style: (_k = (_h = (_g = (_f = this.constructor.styles) === null || _f === void 0 ? void 0 : _f.cssText) !== null && _g !== void 0 ? _g : this.settings.style) !== null && _h !== void 0 ? _h : (_j = this.settings.componentUtils) === null || _j === void 0 ? void 0 : _j.style) !== null && _k !== void 0 ? _k : '' }));
        this.componentUtils = this.cu;
        (() => __awaiter(this, void 0, void 0, function* () {
            var _l, _m;
            const defaultProps = s_component_utils_1.default.getDefaultProps(this.tagName.toLowerCase());
            const mountWhen = (_m = (_l = this.getAttribute('mount-when')) !== null && _l !== void 0 ? _l : defaultProps.mountWhen) !== null && _m !== void 0 ? _m : 'direct';
            // component class
            this.classList.add(...this.cu.cls('').split(' '));
            yield (0, datetime_1.__wait)();
            yield (0, datetime_1.__wait)();
            if (!mountWhen.match(/^direct(ly)?$/)) {
                // wait until mount
                yield this.cu.waitAndExecute(mountWhen, () => {
                    this._mount();
                });
            }
            else {
                this._mount();
            }
        }))();
    }
    get state() {
        return this._state;
    }
    set state(state) {
        Object.assign(this._state, state);
    }
    // static expand(tpl) {
    //     // console.log('PL', `${tpl}`);
    //     console.log(tpl);
    //     for (let [key, str] of Object.entries(tpl.strings)) {
    //         console.log('jey', key);
    //         tpl.strings[key] = 'coco';
    //     }
    //     return tpl;
    // }
    /**
     * @name            define
     * @type            Function
     * @static
     *
     * This static method allows you to define a custom element just like the `customElement.define` does.
     * The trick is that this define method will not initialize the component directly. It will
     * wait until it is near the viewport before actually creating a new element names "%tagName-up".
     * This will be the custom element that is registered and that will replace your "%tagName" HTMLElement.
     *
     * @param
     * @param       {Any}           props          The initial props to apply to your custom element
     * @param       {String}        tagName         The tagname you want to search in the DOM
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static define(tagName, Cls, props = {}, settings = {}) {
        var _a;
        const win = (_a = settings.window) !== null && _a !== void 0 ? _a : window;
        if (win.customElements.get(tagName.toLowerCase())) {
            return;
        }
        // set the default props
        SLitComponent.setDefaultProps(tagName, props);
        win.customElements.define(tagName.toLowerCase(), class extends Cls {
        });
    }
    /**
     * @name            setDefaultProps
     * @type            Function
     * @static
     *
     * This static method allows you to set some default props for some particular
     * component(s). You can target components using simple css selectorl like "my-component#cool".
     * Once the component is instanciated, it will check if some defaults are specified and
     * extends them with the passed props.
     *
     * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
     * @param     {Any}         props         An object of props you want to set defaults for
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static setDefaultProps(selector, props) {
        s_component_utils_1.default.setDefaultProps(selector, props);
    }
    static propertiesFromInterface(properties, int) {
        var _a;
        const propertiesObj = {};
        class SLitComponentPropsInterface extends s_component_utils_1.SComponentUtilsDefaultPropsInterface {
        }
        SLitComponentPropsInterface.definition = Object.assign(Object.assign({}, SLitComponentPropsInterface.definition), ((_a = int === null || int === void 0 ? void 0 : int.definition) !== null && _a !== void 0 ? _a : {}));
        // @ts-ignore
        Object.keys(SLitComponentPropsInterface.definition).forEach((prop) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            // @ts-ignore
            const definition = SLitComponentPropsInterface.definition[prop];
            propertiesObj[prop] = Object.assign({}, ((_a = definition.lit) !== null && _a !== void 0 ? _a : {}));
            let type = String, typeStr = (_c = (_b = definition.type) === null || _b === void 0 ? void 0 : _b.type) !== null && _c !== void 0 ? _c : definition.type;
            switch (typeStr.toLowerCase()) {
                case 'boolean':
                    type = Boolean;
                    break;
                case 'object':
                    type = Object;
                    break;
                case 'number':
                    type = Number;
                    break;
                default:
                    if (typeStr.match(/\[\]$/)) {
                        type = Array;
                    }
                    break;
            }
            // const type = definition.type?.type ?? definition.type ?? 'string';
            // set the type
            propertiesObj[prop].type = type;
            // set the default value
            propertiesObj[prop].default = definition.default;
            // handle physical and boolean attributes
            if (definition.physical ||
                ((_f = (_e = (_d = definition.type) === null || _d === void 0 ? void 0 : _d.type) === null || _e === void 0 ? void 0 : _e.toLowerCase) === null || _f === void 0 ? void 0 : _f.call(_e)) === 'boolean' ||
                ((_h = (_g = definition.type) === null || _g === void 0 ? void 0 : _g.toLowerCase) === null || _h === void 0 ? void 0 : _h.call(_g)) === 'boolean' ||
                ((_l = (_k = (_j = definition.type) === null || _j === void 0 ? void 0 : _j.type) === null || _k === void 0 ? void 0 : _k.toLowerCase) === null || _l === void 0 ? void 0 : _l.call(_k)) === 'object' ||
                ((_o = (_m = definition.type) === null || _m === void 0 ? void 0 : _m.toLowerCase) === null || _o === void 0 ? void 0 : _o.call(_m)) === 'object') {
                propertiesObj[prop].reflect = true;
                propertiesObj[prop].attribute = (0, dashCase_1.default)(prop);
                propertiesObj[prop].converter = {
                    fromAttribute: (value, type) => {
                        var _a, _b, _c, _d;
                        const typeStr = (_c = (_b = (_a = definition.type) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== null && _c !== void 0 ? _c : (_d = definition.type) === null || _d === void 0 ? void 0 : _d.toLowerCase();
                        if (typeStr === 'object' && typeof value === 'string') {
                            try {
                                const json = JSON.parse(value);
                                return json;
                            }
                            catch (e) {
                                console.error(e);
                            }
                        }
                        if (value === 'true' || value === '')
                            return true;
                        return value;
                    },
                    toAttribute(value) {
                        if (typeof value !== 'string' &&
                            typeof value !== 'boolean') {
                            try {
                                const jsonStr = JSON.stringify(value);
                                return jsonStr;
                            }
                            catch (e) { }
                        }
                        if (value === 'false' ||
                            value === false ||
                            value === null) {
                            return undefined;
                        }
                        return value;
                    },
                };
            }
        });
        const props = Object.assign(Object.assign({}, propertiesObj), (properties !== null && properties !== void 0 ? properties : {}));
        return props;
    }
    disconnectedCallback() {
        // this.state?.revoke?.();
    }
    /**
     * @name            mount
     * @type            Function
     * @async
     *
     * This method allows you to actually mount your feature behavior.
     * It will be called depending on the "mountWhen" setting setted.
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _mount() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const _this = this, defaultProps = s_component_utils_1.default.getDefaultProps(this.tagName.toLowerCase());
            let properties = this.constructor.properties;
            if (!properties) {
                properties = this.constructor.propertiesFromInterface();
            }
            // this.props stack
            let finalProps = {};
            for (let [prop, obj] of Object.entries(properties)) {
                Object.defineProperty(this.props, prop, {
                    enumerable: true,
                    get() {
                        return _this[prop];
                    },
                    set(value) {
                        var _a;
                        // get the value
                        value = (_a = value === null || value === void 0 ? void 0 : value.value) !== null && _a !== void 0 ? _a : value;
                        // try to parse JSON if the value is a string
                        if (value && typeof value === 'string') {
                            try {
                                _this[prop] = JSON.parse(value);
                                return;
                            }
                            catch (e) { }
                        }
                        // set the value
                        _this[prop] = value;
                    },
                });
                let attrValue = this.getAttribute((0, dashCase_1.default)(prop));
                if (attrValue !== null) {
                    if (attrValue === 'false')
                        attrValue = false;
                    if (attrValue === '')
                        attrValue = true;
                    finalProps[prop] = attrValue;
                }
                // default props
                if (finalProps[prop] === undefined && this[prop] === undefined) {
                    finalProps[prop] = (_a = defaultProps[prop]) !== null && _a !== void 0 ? _a : obj.default;
                }
            }
            if (this.settings.interface) {
                finalProps = this.settings.interface.apply(finalProps);
            }
            Object.assign(this.props, finalProps);
            // make props responsive
            this.cu.makePropsResponsive(this.props);
            // verbose
            if (this.props.verbose) {
                console.log(`[${this.tagName.toLowerCase()}]${this.id ? ` #${this.id} ` : ' '}mounting`);
            }
            // handle state if needed
            if (this.state) {
                const state = Object.assign({}, this.state);
                delete this.state;
                Object.defineProperty(this, 'state', {
                    enumerable: true,
                    value: this.cu.handleState(state, {
                        save: this.props.saveState,
                    }),
                });
                this.state.$set('*', () => {
                    this.requestUpdate();
                });
            }
            // custom mount function
            if (this.mount && typeof this.mount === 'function') {
                yield this.mount();
            }
            // set the not as updatable
            this._shouldUpdate = true;
            // @ts-ignore
            this.requestUpdate();
            yield this.updateComplete;
            this.cu.injectStyle((_c = (_b = this.constructor.styles) === null || _b === void 0 ? void 0 : _b.cssText) !== null && _c !== void 0 ? _c : '', this.tagName);
            yield (0, datetime_1.__wait)();
            if (this.props.adoptStyle && this.shadowRoot) {
                yield this.cu.adoptStyleInShadowRoot(this.shadowRoot);
            }
            return true;
        });
    }
}
exports.default = SLitComponent;
SLitComponent._keepInjectedCssBeforeStylesheetLinksInited = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsZ0VBQWdFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdoRSxxRkFFeUM7QUFFekMsMkRBQXNEO0FBQ3RELGlEQUE4RDtBQUM5RCxtREFBeUU7QUFDekUsdURBQXlEO0FBQ3pELDBGQUFvRTtBQUNwRSw2QkFBaUQ7QUFFakQsU0FBUyxRQUFRLENBQUMsR0FBRzs7SUFDakIsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNOLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFFRCxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtRQUN6QixPQUFPLEdBQUcsQ0FBQztLQUNkO1NBQU0sSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDbEMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsTUFBTSxHQUFHLEdBQUcsTUFBQSxNQUFBLEdBQUcsQ0FBQyxNQUFNLDBDQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1lBQ3RDLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO2dCQUN6QixHQUFHLElBQUksR0FBRyxDQUFDO2FBQ2Q7aUJBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ2QsR0FBRyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLENBQUM7YUFDTjtp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