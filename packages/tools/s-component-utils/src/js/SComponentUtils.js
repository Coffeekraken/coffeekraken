// @ts-nocheck
// @TODO            check how to override private static methods
// import __mustache from 'mustache';
import __autoCast from '@coffeekraken/sugar/shared/string/autoCast';
import __SInterface from '@coffeekraken/s-interface';
import __adoptStyleInShadowRoot from '@coffeekraken/sugar/js/css/adoptStyleInShadowRoot';
import __injectStyle from '@coffeekraken/sugar/js/css/injectStyle';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __SClass from '@coffeekraken/s-class';
import __inViewportStatusChange from '@coffeekraken/sugar/js/dom/detect/inViewportStatusChange';
import __SConductor from '@coffeekraken/s-conductor';
export class SComponentDefaultInterface extends __SInterface {
    static get _definition() {
        return {
            id: {
                type: 'String',
                physical: true,
            },
            mounted: {
                type: 'Boolean',
                default: false,
                physical: true,
            },
            mountWhen: {
                type: 'String',
                values: ['directly', 'inViewport'],
                default: 'directly',
            },
            adoptStyle: {
                type: 'Boolean',
                default: true,
                physical: true,
            },
            bare: {
                type: 'Boolean',
                default: false,
                physical: true,
            },
        };
    }
}
export default class SComponent extends __SClass {
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
    constructor(node, props, settings = {}) {
        var _a, _b;
        var _c;
        super(__deepMerge({
            componentUtils: {},
        }, settings));
        /**
         * @name            state
         * @type            String
         *
         * Track the state of the component.
         * - pending: default state when nothing has been done
         * - mount: state when the component has to be mounted
         * - mounted: state when the component has been mounded
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.state = 'pending';
        this._isInViewport = false;
        this.node = node;
        this._props = props;
        // listen viewport status update
        this.inViewportStatusChange
            .on('enter', () => {
            if (this.node.tagName.toLowerCase() === 'ck-blob') {
                console.log('IN');
            }
            this._isInViewport = true;
        })
            .on('leave', () => {
            this._isInViewport = false;
        });
        // build the final interface class to apply on props
        let InterfaceToApply = (_c = class InlineSComponentUtilsInterface extends __SInterface {
            },
            _c.definition = {},
            _c);
        // @ts-ignore
        InterfaceToApply.definition = Object.assign(Object.assign({}, Object.assign({}, SComponentDefaultInterface.definition)), ((_b = (_a = this.componentUtilsSettings.interface) === null || _a === void 0 ? void 0 : _a.definition) !== null && _b !== void 0 ? _b : {}));
        // @ts-ignore
        this.InterfaceToApply = InterfaceToApply;
        // @ts-ignore
        const styleStr = this.componentUtilsSettings.style;
        this.injectStyle(styleStr !== null && styleStr !== void 0 ? styleStr : '');
    }
    /**
     * @name            name
     * @type            String
     *
     * Get the name of the node or feature that this component utils is
     * used by. Get from `settings.componentUtils.name` then throught the passed
     * node using his tagName property
     *
     * @since   2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    get name() {
        var _a;
        return ((_a = this.componentUtilsSettings.name) !== null && _a !== void 0 ? _a : this.node.tagName.toLowerCase());
    }
    static setDefaultProps(selector, props) {
        selector = Array.isArray(selector) ? selector : [selector];
        selector.forEach((sel) => {
            var _a;
            this._defaultProps[sel] = Object.assign(Object.assign({}, ((_a = this._defaultProps[sel]) !== null && _a !== void 0 ? _a : {})), props);
        });
    }
    /**
     * @name            getDefaultProps
     * @type            Function
     * @static
     *
     * This static method allows you to get back some default props setted for a component/feature, etc...
     *
     * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
     * @return    {Any}                                 Some default props setted or an empty object
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static getDefaultProps(selector) {
        var _a;
        return (_a = this._defaultProps[selector]) !== null && _a !== void 0 ? _a : {};
    }
    /**
     * @name        componentUtilsSettings
     * @type        ISComponentUtilsSettings
     * @get
     *
     * Access the component utils sertings
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    get componentUtilsSettings() {
        return this._settings.componentUtils;
    }
    get inViewportStatusChange() {
        if (this._inViewportStatusChangePromise)
            return this._inViewportStatusChangePromise;
        this._inViewportStatusChangePromise = __inViewportStatusChange(this.node);
        return this._inViewportStatusChangePromise;
    }
    /**
     * @name           waitAndExecute
     * @type            Function
     * @async
     *
     * This async method allows you to wait for the component (node) has reached
     * his "mount" state. This state depends fully on the "mountWhen" property.
     * When the state has been reached, the passed callback will be executed.
     *
     * @return          {Promise}           A promise fullfilled when the component (node) has reached his "mount" state
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    waitAndExecute(callback) {
        return __SConductor.when(this.node, this.props.mountWhen, callback);
    }
    /**
     * @name        adoptStyleInShadowRoot
     * @type        Function
     * @async
     *
     * This method allows you to make the passed shadowRoot element adopt
     * the style of the passed context who's by default the document itself
     *
     * @param       {HTMLShadowRootElement}         $shadowRoot             The shadow root you want to adopt the $context styles
     * @param      {HTMLElement}                   [$context=document]     The context from which you want to adopt the styles
     * @return      {Promise}                                               Return a promise fullfilled when the styles have been adopted
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    adoptStyleInShadowRoot($shadowRoot, $context) {
        return __adoptStyleInShadowRoot($shadowRoot, $context);
    }
    get props() {
        // if props already builded
        if (this._finalProps)
            return this._finalProps;
        const props = this._props;
        let passedProps = {};
        if (props.constructor.name === 'NamedNodeMap') {
            Object.keys(props).forEach((key) => {
                var _a, _b, _c;
                let value;
                if (((_a = props[key]) === null || _a === void 0 ? void 0 : _a.nodeValue) !== undefined) {
                    if (props[key].nodeValue === '')
                        value = true;
                    else
                        value = props[key].nodeValue;
                }
                if (!value)
                    return;
                passedProps[__camelCase((_c = (_b = props[key]) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : key)] =
                    __autoCast(value);
            });
        }
        else {
            j;
            passedProps = props;
        }
        this._finalProps = __deepMerge(this.defaultProps, this.InterfaceToApply.apply(passedProps, {
            descriptor: {
                defaults: false,
            },
        }));
        const _this = this;
        this._finalProps = new Proxy(this._finalProps, {
            get(target, prop, receiver) {
                return target[prop];
            },
            set(obj, prop, value) {
                const propDef = _this.InterfaceToApply.definition[prop];
                if (propDef === null || propDef === void 0 ? void 0 : propDef.physical) {
                    if (value === false ||
                        value === undefined ||
                        value === null) {
                        _this.node.removeAttribute(__dashCase(prop));
                    }
                    else {
                        _this.node.setAttribute(__dashCase(prop), String(value));
                    }
                }
                obj[prop] = value;
                return true;
            },
        });
        Object.keys(this._finalProps).forEach((prop) => {
            this._finalProps[prop] = this._finalProps[prop];
        });
        return this._finalProps;
    }
    get defaultProps() {
        var _a, _b, _c;
        if (this._defaultProps)
            return Object.assign({}, this._defaultProps);
        this._defaultProps = Object.assign({}, __deepMerge(
        // @ts-ignore
        this.InterfaceToApply.defaults(), (_a = this.componentUtilsSettings.defaultProps) !== null && _a !== void 0 ? _a : {}, (_b = this.constructor._defaultProps['*']) !== null && _b !== void 0 ? _b : {}, (_c = this.constructor._defaultProps[this.name]) !== null && _c !== void 0 ? _c : {}));
        return this._defaultProps;
    }
    static getFinalInterface(int) {
        class InlineSComponentUtilsInterface extends __SInterface {
        }
        InlineSComponentUtilsInterface.definition = SComponentDefaultInterface.definition;
        if (int) {
            InlineSComponentUtilsInterface.definition = Object.assign(Object.assign({}, SComponentDefaultInterface.definition), int.definition);
        }
        // @ts-ignore
        return InlineSComponentUtilsInterface;
    }
    injectStyle(css, id = this.tagName) {
        // @ts-ignore
        if (this.constructor._injectedStyles.indexOf(id) !== -1)
            return;
        // @ts-ignore
        this.constructor._injectedStyles.push(id);
        __injectStyle(css, id);
    }
    /**
     * @name            exposeApi
     * @type            Function
     *
     * This method allows you to pass a simple key value object
     * that tells binding of some methods on the actual dom node.
     *
     * @param       {Any}           apiObj          The simple key value pairs api object
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    exposeApi(apiObj, ctx = this.node) {
        setTimeout(() => {
            let $on = this.node;
            Object.keys(apiObj).forEach((apiFnName) => {
                const apiFn = apiObj[apiFnName].bind(ctx);
                $on[apiFnName] = apiFn;
            });
        });
    }
    /**
     * @name          className
     * @type          Function
     *
     * This method allows you to get a component ready className like my-component__something, etc...
     *
     * @param         {String}        cls         The class you want to process. Can be multiple classes separated by a space
     * @return        {String}                    The generated class that you can apply
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    className(cls = '', style = '') {
        let clsString = cls
            .split(' ')
            .map((clsName) => `${this.node.tagName.toLowerCase()}${clsName && !clsName.match(/^__/) ? '-' : ''}${clsName}`)
            .join(' ');
        if (style && !this.props.bare) {
            clsString += ` ${style}`;
        }
        return clsString;
    }
    /**
     * @name      isMounted
     * @type      Function
     *
     * This method returns true if the component is mounted, false if not
     *
     * @return    {Boolean}       true if is mounted, false if not
     *
     * @since   2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    isMounted() {
        var _a;
        return (_a = this.node) === null || _a === void 0 ? void 0 : _a.hasAttribute('mounted');
    }
    /**
     * @name            isInViewport
     * @type            Function
     *
     * true if the component is in the viewport, false if not
     *
     * @since   2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    isInViewport() {
        return this._isInViewport;
    }
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
SComponent._defaultProps = {};
SComponent._injectedStyles = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBvbmVudFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbXBvbmVudFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxnRUFBZ0U7QUFFaEUscUNBQXFDO0FBQ3JDLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sd0JBQXdCLE1BQU0sbURBQW1ELENBQUM7QUFDekYsT0FBTyxhQUFhLE1BQU0sd0NBQXdDLENBQUM7QUFFbkUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxVQUFVLE1BQU0sNENBQTRDLENBQUM7QUFFcEUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyx3QkFBd0IsTUFBTSwwREFBMEQsQ0FBQztBQUVoRyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsWUFBWTtJQUN4RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsRUFBRSxFQUFFO2dCQUNBLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUM7Z0JBQ2xDLE9BQU8sRUFBRSxVQUFVO2FBQ3RCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dC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