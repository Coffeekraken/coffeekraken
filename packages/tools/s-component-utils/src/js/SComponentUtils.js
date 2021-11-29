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
        // waiting for mount state
        this._whenMountPromise = new Promise((resolve) => {
            switch (this.props.mountWhen) {
                case 'inViewport':
                    this.inViewportStatusChange.on('enter', () => {
                        resolve();
                    });
                    break;
                case 'directly':
                default:
                    resolve();
                    break;
            }
        });
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
     * @name           waitOnMountState
     * @type            Function
     * @async
     *
     * This asynv method allows you to wait for the component (node) has reached
     * his "mount" state. This state depends fully on the "mountWhen" property
     *
     * @return          {Promise}           A promise fullfilled when the component (node) has reached his "mount" state
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    waitOnMountState() {
        return this._whenMountPromise;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBvbmVudFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbXBvbmVudFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxnRUFBZ0U7QUFFaEUscUNBQXFDO0FBQ3JDLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sd0JBQXdCLE1BQU0sbURBQW1ELENBQUM7QUFDekYsT0FBTyxhQUFhLE1BQU0sd0NBQXdDLENBQUM7QUFFbkUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxVQUFVLE1BQU0sNENBQTRDLENBQUM7QUFFcEUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyx3QkFBd0IsTUFBTSwwREFBMEQsQ0FBQztBQUdoRyxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsWUFBWTtJQUN4RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsRUFBRSxFQUFFO2dCQUNBLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUM7Z0JBQ2xDLE9BQU8sRUFBRSxVQUFVO2FBQ3RCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFB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