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