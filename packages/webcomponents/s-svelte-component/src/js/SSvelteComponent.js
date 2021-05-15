import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __mustache from 'mustache';
import __stylesheetToString from '@coffeekraken/sugar/js/css/stylesheetToString';
import { onMount as __onMount, beforeUpdate as __beforeUpdate, afterUpdate as __afterUpdate, onDestroy as __onDestroy, tick as __tick, setContext as __setContext, getContext as __getContext, hasContext as __hasContext } from 'svelte';
import { writable } from 'svelte/store';
import __camelize from '@coffeekraken/sugar/shared/string/camelize';
class SSVelteComponent extends __SClass {
    constructor(params, settings) {
        var _a;
        super(__deepMerge({
            svelteComponent: {
                classPrefix: 's-'
            }
        }, settings || {}));
        this.props = {};
        /**
         * @name      styleStr
         * @type      String
         * @get
         *
         * Access the document style string
         *
         * @since     2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._styleStr = '';
        // disable mustache escaping
        __mustache.escape = function (text) {
            return text;
        };
        // @ts-ignore
        const interfaceClass = 
        // @ts-ignore
        (_a = this.svelteComponentSettings.interface) !== null && _a !== void 0 ? _a : this.constructor.interface;
        const processedParams = {};
        Object.keys(params).forEach((propName) => {
            processedParams[__camelize(propName)] = params[propName];
        });
        // @ts-ignore
        if (interfaceClass) {
            // add default props
            // @ts-ignore
            interfaceClass.definition = Object.assign(Object.assign({}, interfaceClass.definition), { noLnf: {
                    type: {
                        type: 'Boolean',
                        nullishAsTrue: true
                    },
                    default: false
                }, noBare: {
                    type: {
                        type: 'Boolean',
                        nullishAsTrue: true
                    },
                    default: false
                }, noStyle: {
                    type: {
                        type: 'Boolean',
                        nullishAsTrue: true
                    },
                    default: false
                } });
            // @ts-ignore
            const paramsInterfaceResult = interfaceClass.apply(processedParams !== null && processedParams !== void 0 ? processedParams : {});
            if (paramsInterfaceResult.hasIssues()) {
                throw new Error(paramsInterfaceResult.toString());
            }
            else {
                Object.keys(paramsInterfaceResult.value).forEach((propName) => {
                    let value = paramsInterfaceResult.value[propName];
                    const proxy = writable(paramsInterfaceResult.value[propName], () => {
                        return () => { };
                    });
                    proxy.subscribe((v) => {
                        value = v;
                    });
                    Object.defineProperty(this.props, propName, {
                        enumerable: true,
                        get() {
                            return value;
                        },
                        set(v) {
                            // proxy.update((v) => v);
                            proxy.set(v);
                        }
                    });
                });
            }
        }
        this.onMount(() => {
            if (this.props.noLnf) {
                this.$root.classList.add('s-no-lnf');
            }
            if (this.props.noBare) {
                this.$root.classList.add('s-no-bare');
            }
        });
    }
    /**
     * @name      svelteComponentSettings
     * @type      ISSvelteComponentSettings
     * @get
     *
     * Access the svelteComponent settings
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get svelteComponentSettings() {
        return this._settings.svelteComponent;
    }
    get styleStr() {
        if (!this._styleStr)
            this._styleStr = __stylesheetToString(document.styleSheets);
        return this._styleStr;
    }
    get $root() {
        if (!this._$root) {
            throw new Error(`To use the $root property, you MUST call the "setRoot" in your onMount component code and pass it the root HTMLElement of your HTML component code`);
        }
        return this._$root;
    }
    get $elm() {
        return this._componentElm;
    }
    /**
     * @name      styleElm
     * @type      HTMLElement
     * @get
     *
     * Access the root style HTMLElement inside the shadow dom
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get styleElm() {
        for (let i = 0; i < this._componentElm.shadowRoot.children.length; i++) {
            const elm = this._componentElm.shadowRoot.children[i];
            if (elm.tagName === 'STYLE')
                return elm;
        }
        return undefined;
    }
    setRoot($root) {
        this._$root = $root;
        this._componentElm = this._$root.parentNode.host;
        if (!this.props.noStyle) {
            this._applyStyles();
        }
    }
    /**
     * @name      _applyStyles
     * @type      Function
     *
     * This function simply check if a "@sugar.style.apply" directive has been applied
     * and apply it correctly using the stylesheets applied to the page
     *
     * @since     2.0.0
     *
     */
    _applyStyles() {
        if (!this.styleElm)
            return;
        const matches = this.styleElm.innerHTML.match(/[\.#]?[a-zA-Z0-9-_:>+*\s]+\{(.*\n?)content:"(s-style-[a-zA-Z0-9-_]+)"(.*\n?)\}/gm);
        if (matches) {
            let newStyleStr = this.styleElm.innerHTML;
            newStyleStr = newStyleStr.replace(/content:\?"s-style-[a-zA-Z0-9-_]+"/, '');
            matches.forEach((match) => {
                // @ts-ignore
                const selector = match.split('{')[0];
                // @ts-ignore
                const styleName = match.match(/content:"(.*)"/)[1];
                const reg = new RegExp(`\.${styleName}.*\{[^\}]+\}`, 'gm');
                const styleCssMatches = this.styleStr.match(reg);
                if (styleCssMatches) {
                    styleCssMatches.forEach((styleMatch) => {
                        const newStyle = styleMatch.replace(`.${styleName}`, selector);
                        newStyleStr += newStyle;
                    });
                }
            });
            this.styleElm.innerHTML = newStyleStr;
            const styleElm = document.createElement('style');
            styleElm.innerHTML = this.styleStr.replace(/--[a-zA-Z0-9-_]+:[^;]+;/gm, '');
            this._componentElm.shadowRoot.prepend(styleElm);
        }
    }
    compileMustache(template, data) {
        return __mustache.render(template, data);
    }
    className(name = '') {
        return name
            .split(' ')
            .map((cls) => `${this.svelteComponentSettings.classPrefix}${this.svelteComponentSettings.classPrefix && cls && !cls.match(/^__/)
            ? '-'
            : ''}${cls}`)
            .join(' ');
    }
    onMount(callback) {
        __onMount(callback);
    }
    beforeUpdate(callback) {
        __beforeUpdate(callback);
    }
    afterUpdate(callback) {
        __afterUpdate(callback);
    }
    onDestroy(callback) {
        __onDestroy(callback);
    }
    tick() {
        __tick();
    }
    getContext(callback) {
        __getContext(callback);
    }
    hasContext(callback) {
        __hasContext(callback);
    }
    setContext(key, context) {
        __setContext(key, context);
    }
}
export default SSVelteComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdmVsdGVDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsT0FBTyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sb0JBQW9CLE1BQU0sK0NBQStDLENBQUM7QUFFakYsT0FBTyxFQUNMLE9BQU8sSUFBSSxTQUFTLEVBQ3BCLFlBQVksSUFBSSxjQUFjLEVBQzlCLFdBQVcsSUFBSSxhQUFhLEVBQzVCLFNBQVMsSUFBSSxXQUFXLEVBQ3hCLElBQUksSUFBSSxNQUFNLEVBQ2QsVUFBVSxJQUFJLFlBQVksRUFDMUIsVUFBVSxJQUFJLFlBQVksRUFDMUIsVUFBVSxJQUFJLFlBQVksRUFFM0IsTUFBTSxRQUFRLENBQUM7QUFDaEIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV4QyxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQVlwRSxNQUFNLGdCQUFpQixTQUFRLFFBQVE7SUE4RXJDLFlBQVksTUFBVyxFQUFFLFFBQWlEOztRQUN4RSxLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsZUFBZSxFQUFFO2dCQUNmLFdBQVcsRUFBRSxJQUFJO2FBQ2xCO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQXZGSixVQUFLLEdBQXdCLEVBQUUsQ0FBQztRQWdCaEM7Ozs7Ozs7OztXQVNHO1FBQ0gsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQStEckIsNEJBQTRCO1FBQzVCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxJQUFJO1lBQ2hDLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO1FBRUYsYUFBYTtRQUNiLE1BQU0sY0FBYztRQUNsQixhQUFhO1FBQ2IsTUFBQSxJQUFJLENBQUMsdUJB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