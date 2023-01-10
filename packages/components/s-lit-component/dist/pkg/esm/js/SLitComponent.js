// @ts-nocheck
// @TODO            check how to override private static methods
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SComponentUtils, { SComponentUtilsDefaultPropsInterface } from '@coffeekraken/s-component-utils';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import { __expandPleasantCssClassnames } from '@coffeekraken/sugar/html';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import { html as __html, LitElement } from 'lit';
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
export function html(strings, ...values) {
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
        newStr = __expandPleasantCssClassnames(newStr);
        // if (classmap && (inClass || newStr.match(/class="/))) {
        //     newStr = classmap.patchHtml(newStr);
        // }
        // patch html in the value if possible
        // and expand classnames
        if (newVal && typeof newVal === 'string') {
            newVal = __expandPleasantCssClassnames(newVal);
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
    return __html(newStrings, ...newValues);
}
export default class SLitComponent extends LitElement {
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
        this.settings = __deepMerge({
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
            __querySelectorLive('style', ($style) => {
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
        this.cu = new __SComponentUtils(this, Object.assign(Object.assign(Object.assign({}, ((_d = this.settings) !== null && _d !== void 0 ? _d : {})), ((_e = this.settings.componentUtils) !== null && _e !== void 0 ? _e : {})), { style: (_k = (_h = (_g = (_f = this.constructor.styles) === null || _f === void 0 ? void 0 : _f.cssText) !== null && _g !== void 0 ? _g : this.settings.style) !== null && _h !== void 0 ? _h : (_j = this.settings.componentUtils) === null || _j === void 0 ? void 0 : _j.style) !== null && _k !== void 0 ? _k : '' }));
        this.componentUtils = this.cu;
        (() => __awaiter(this, void 0, void 0, function* () {
            var _l, _m;
            const defaultProps = __SComponentUtils.getDefaultProps(this.tagName.toLowerCase());
            const mountWhen = (_m = (_l = this.getAttribute('mount-when')) !== null && _l !== void 0 ? _l : defaultProps.mountWhen) !== null && _m !== void 0 ? _m : 'direct';
            // component class
            this.classList.add(...this.cu.cls('').split(' '));
            yield __wait();
            yield __wait();
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
        __SComponentUtils.setDefaultProps(selector, props);
    }
    static propertiesFromInterface(properties, int) {
        var _a;
        const propertiesObj = {};
        class SLitComponentPropsInterface extends SComponentUtilsDefaultPropsInterface {
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
                propertiesObj[prop].attribute = __dashCase(prop);
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
            const _this = this, defaultProps = __SComponentUtils.getDefaultProps(this.tagName.toLowerCase());
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
                let attrValue = this.getAttribute(__dashCase(prop));
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
            yield __wait();
            if (this.props.adoptStyle && this.shadowRoot) {
                yield this.cu.adoptStyleInShadowRoot(this.shadowRoot);
            }
            return true;
        });
    }
}
SLitComponent._keepInjectedCssBeforeStylesheetLinksInited = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxnRUFBZ0U7Ozs7Ozs7Ozs7QUFHaEUsT0FBTyxpQkFBaUIsRUFBRSxFQUN0QixvQ0FBb0MsRUFDdkMsTUFBTSxpQ0FBaUMsQ0FBQztBQUV6QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxJQUFJLElBQUksTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUVqRCxTQUFTLFFBQVEsQ0FBQyxHQUFHOztJQUNqQixJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ04sT0FBTyxFQUFFLENBQUM7S0FDYjtJQUVELElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1FBQ3pCLE9BQU8sR0FBRyxDQUFDO0tBQ2Q7U0FBTSxJQUFJLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtRQUNsQyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxNQUFNLEdBQUcsR0FBRyxNQUFBLE1BQUEsR0FBRyxDQUFDLE1BQU0sMENBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7WUFDdEMsSUFBSSxPQUFPLEdBQUcs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