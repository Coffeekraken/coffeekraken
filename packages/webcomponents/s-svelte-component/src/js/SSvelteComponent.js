import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __mustache from 'mustache';
import __stylesheetToString from '@coffeekraken/sugar/js/css/stylesheetToString';
import { onMount as __onMount, beforeUpdate as __beforeUpdate, afterUpdate as __afterUpdate, onDestroy as __onDestroy, tick as __tick, setContext as __setContext, getContext as __getContext, hasContext as __hasContext } from 'svelte';
import { writable } from 'svelte/store';
import { get_current_component } from 'svelte/internal';
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
        this._currentComponent = get_current_component();
        // disable mustache escaping
        __mustache.escape = function (text) {
            return text;
        };
        // @ts-ignore
        const interfaceClass = (_a = this.svelteComponentSettings.interface) !== null && _a !== void 0 ? _a : this.constructor.interface;
        const processedParams = {};
        Object.keys(params).forEach((propName) => {
            processedParams[__camelize(propName)] = params[propName];
        });
        // @ts-ignore
        if (interfaceClass) {
            // add default props
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
                this.rootElm.classList.add('s-no-lnf');
            }
            if (this.props.noBare) {
                this.rootElm.classList.add('s-no-bare');
            }
            if (!this.props.noStyle) {
                this._applyStyles();
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
    get rootElm() {
        for (let i = 0; i < this._currentComponent.shadowRoot.children.length; i++) {
            const elm = this._currentComponent.shadowRoot.children[i];
            if (elm.tagName !== 'STYLE')
                return elm;
        }
        return this._currentComponent;
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
        for (let i = 0; i < this._currentComponent.shadowRoot.children.length; i++) {
            const elm = this._currentComponent.shadowRoot.children[i];
            if (elm.tagName === 'STYLE')
                return elm;
        }
        return undefined;
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
        const matches = this.styleElm.innerHTML.match(/[\.#]?[a-zA-Z0-9-_:>+*\s]+\{(.*\n?)content:"(s-style-[a-zA-Z0-9-_]+)"(.*\n?)\}/gm);
        if (matches) {
            let newStyleStr = this.styleElm.innerHTML;
            newStyleStr = newStyleStr.replace(/content:\?"s-style-[a-zA-Z0-9-_]+"/, '');
            matches.forEach((match) => {
                const selector = match.split('{')[0];
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
            this._currentComponent.shadowRoot.prepend(styleElm);
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
    tick(callback) {
        __tick(callback);
    }
    getContext(callback) {
        __getContext(callback);
    }
    hasContext(callback) {
        __hasContext(callback);
    }
    setContext(callback) {
        __setContext(callback);
    }
}
export default SSVelteComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdmVsdGVDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsT0FBTyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sb0JBQW9CLE1BQU0sK0NBQStDLENBQUM7QUFFakYsT0FBTyxFQUNMLE9BQU8sSUFBSSxTQUFTLEVBQ3BCLFlBQVksSUFBSSxjQUFjLEVBQzlCLFdBQVcsSUFBSSxhQUFhLEVBQzVCLFNBQVMsSUFBSSxXQUFXLEVBQ3hCLElBQUksSUFBSSxNQUFNLEVBQ2QsVUFBVSxJQUFJLFlBQVksRUFDMUIsVUFBVSxJQUFJLFlBQVksRUFDMUIsVUFBVSxJQUFJLFlBQVksRUFFM0IsTUFBTSxRQUFRLENBQUM7QUFDaEIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RCxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQVlwRSxNQUFNLGdCQUFpQixTQUFRLFFBQVE7SUErRXJDLFlBQVksTUFBVyxFQUFFLFFBQWlEOztRQUN4RSxLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsZUFBZSxFQUFFO2dCQUNmLFdBQVcsRUFBRSxJQUFJO2FBQ2xCO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQXhGSixVQUFLLEdBQXdCLEVBQUUsQ0FBQztRQWdCaEM7Ozs7Ozs7OztXQVNHO1FBQ0gsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQWdFckIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLHFCQUFxQixFQUFFLENBQUM7UUFFakQsNEJBQTRCO1FBQzVCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxJQUFJO1lBQ2hD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