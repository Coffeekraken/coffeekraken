// @ts-nocheck
// @TODO            check how to override private static methods

import type { ISComponentUtilsSettings } from '@coffeekraken/s-component-utils';
import __SComponentUtils, {
    SComponentUtilsDefaultPropsInterface,
} from '@coffeekraken/s-component-utils';
import __SInterface from '@coffeekraken/s-interface';
import { __injectStyle, __querySelectorLive } from '@coffeekraken/sugar/dom';
import { __deepMerge, __set } from '@coffeekraken/sugar/object';
import { __camelCase, __dashCase, __parse } from '@coffeekraken/sugar/string';
import { LitElement, html as __html } from 'lit';

export { __html as html };

export interface ISLitComponentSettings extends ISComponentUtilsSettings {
    interface?: typeof __SInterface;
    rootNode?: HTMLElement;
    shadowDom?: boolean;
    defaultProps?: any;
    componentUtils: Partial<ISComponentUtilsSettings>;
}

export interface ISLitComponentDefineSettings {
    window?: any;
}

export interface ISLitComponentDefaultProps {
    id: string;
    lnf: string;
    mountWhen: 'directly' | 'direct' | 'inViewport';
    adoptStyle: boolean;
    saveState: boolean;
}

export default class SLitComponent extends LitElement {
    static _keepInjectedCssBeforeStylesheetLinksInited = false;

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
    settings = {};

    /**
     * @name            props
     * @type            Object
     *
     * Store the component props
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    props: any = {};
    componentUtils: __SComponentUtils;
    cu: __SComponentUtils;
    _shouldUpdate = false;

    _state = {};
    get state() {
        return this._state;
    }
    set state(state) {
        Object.assign(this._state, state);
    }

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
    static define(
        tagName: string,
        Cls: SLitComponent,
        props: any = {},
        settings: Partial<ISLitComponentDefineSettings> = {},
    ) {
        // set the default props
        SLitComponent.setDefaultProps(tagName, props);

        const win = settings.window ?? window;
        if (win.customElements.get(tagName.toLowerCase())) {
            return;
        }

        win.customElements.define(tagName.toLowerCase(), class extends Cls {});
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
    static setDefaultProps(selector: string | string[], props: any): void {
        __SComponentUtils.setDefaultProps(selector, props);
    }

    static propertiesFromInterface(properties: any, int: __SInterface): any {
        const propertiesObj = {};

        class SLitComponentPropsInterface extends SComponentUtilsDefaultPropsInterface {}

        SLitComponentPropsInterface.definition = {
            ...SLitComponentPropsInterface.definition,
            ...(int?.definition ?? {}),
        };

        // @ts-ignore
        Object.keys(SLitComponentPropsInterface.definition).forEach((prop) => {
            // @ts-ignore
            const definition = SLitComponentPropsInterface.definition[prop];
            propertiesObj[prop] = {
                ...(definition.lit ?? {}),
            };

            let type = String,
                typeStr = definition.type?.type ?? definition.type;
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

            // set the attribute to check on the element
            propertiesObj[prop].attribute = __dashCase(prop);

            // handle physical and boolean attributes
            if (
                definition.physical ||
                definition.type?.type?.toLowerCase?.() === 'boolean' ||
                definition.type?.toLowerCase?.() === 'boolean' ||
                definition.type?.type?.toLowerCase?.() === 'object' ||
                definition.type?.toLowerCase?.() === 'object'
            ) {
                propertiesObj[prop].reflect = true;
            }

            // converter
            propertiesObj[prop].converter = {
                fromAttribute: (value, type) => {
                    const typeStr =
                        definition.type?.type?.toLowerCase() ??
                        definition.type?.toLowerCase();

                    if (typeStr === 'object' && typeof value === 'string') {
                        try {
                            const json = JSON.parse(value);
                            const finalJson = __deepMerge(
                                definition.default ?? {},
                                json,
                            );
                            return finalJson;
                        } catch (e) {
                            console.error(e);
                        }
                    }
                    if (value === 'true' || value === '') return true;
                    if (value === 'null') return null;
                    if (value === 'undefined') return undefined;
                    if (value === 'false') return false;
                    return value;
                },
                toAttribute(value) {
                    if (
                        value === 'false' ||
                        value === false ||
                        value === null
                    ) {
                        return undefined;
                    }

                    if (
                        typeof value !== 'string' &&
                        typeof value !== 'boolean'
                    ) {
                        try {
                            const jsonStr = JSON.stringify(value);
                            return jsonStr;
                        } catch (e) {}
                    }
                    return value;
                },
            };
        });

        const props = {
            ...propertiesObj,
            ...(properties ?? {}),
        };

        return props;
    }

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
    constructor(settings: Partial<ISLitComponentSettings> = {}) {
        super();

        this.settings = __deepMerge(
            {
                componentUtils: {},
                shadowDom: false,
                get rootNode() {
                    return this.shadowRoot?.querySelector('*:first-child');
                },
            },
            settings,
        );

        // init default state
        if (this.constructor.state) {
            this.state = Object.assign({}, this.constructor.state);
        } else {
            this.state = {};
        }
        if (!this.state?.status) {
            this.state.status = 'idle';
        }

        // shadow handler
        if (this.settings.shadowDom === false) {
            this.createRenderRoot = () => {
                return this;
            };
        }

        // check if we need to inject the css into the
        // document that is not the same as the app one
        const doc = this._getDocumentFromElement(this);
        if (document !== doc && this.constructor.styles) {
            __injectStyle(this.constructor.styles, {
                rootNode: doc,
            });
        }

        // make sure the injected styles stays BEFORE the link[rel="stylesheet"]
        // to avoid style override
        if (!SLitComponent._keepInjectedCssBeforeStylesheetLinksInited) {
            const $firstStylesheetLink = document.head.querySelector(
                'link[rel="stylesheet"]',
            );
            __querySelectorLive(
                'style',
                ($style) => {
                    if ($firstStylesheetLink) {
                        document.head.insertBefore(
                            $style,
                            $firstStylesheetLink,
                        );
                    }
                },
                {
                    rootNode: document.head,
                },
            );
            SLitComponent._keepInjectedCssBeforeStylesheetLinksInited = true;
        }

        // @ts-ignore
        const nodeFirstUpdated = this.firstUpdated?.bind(this);
        // @ts-ignore
        this.firstUpdated = async () => {
            if (nodeFirstUpdated) {
                await nodeFirstUpdated();
            }
            // set the component as mounted
            // @ts-ignore
            this.setAttribute('mounted', true);
        };

        // litElement shouldUpdate
        // @ts-ignore
        const nodeShouldUpdate = this.shouldUpdate?.bind(this);
        // @ts-ignore
        this.shouldUpdate = () => {
            if (nodeShouldUpdate) {
                const res = nodeShouldUpdate();
                if (!res) return false;
            }
            return this._shouldUpdate;
        };

        this.utils = new __SComponentUtils(this, {
            ...(this.settings ?? {}),
            ...(this.settings.componentUtils ?? {}),
            style:
                this.constructor.styles?.cssText ??
                this.settings.style ??
                this.settings.componentUtils?.style ??
                '',
        });

        (async () => {
            const defaultProps = __SComponentUtils.getDefaultProps(
                this.tagName.toLowerCase(),
            );

            const mountWhen =
                this.getAttribute('mount-when') ??
                defaultProps.mountWhen ??
                'direct';

            // component class
            this.classList.add(...this.utils.cls('').split(' '));

            // wait until mount
            await this.utils.waitAndExecute(mountWhen, () => {
                this._mount();
            });
        })();
    }

    firstUpdated() {
        super.firstUpdated();
    }

    updated() {}

    _getDocumentFromElement($elm) {
        while ($elm.parentNode) {
            $elm = $elm.parentNode;
        }
        return $elm;
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

    async _mount() {
        const _this = this,
            defaultProps = __SComponentUtils.getDefaultProps(
                this.tagName.toLowerCase(),
            );

        // const defaultFromInterface = this.settings.interface?.defaults() ?? {};

        let properties = this.constructor.properties;
        if (!properties) {
            properties = this.constructor.propertiesFromInterface();
        }

        // this.props stack
        let finalProps = {};
        for (let [prop, obj] of Object.entries(properties)) {
            if (this[prop] !== undefined) {
                finalProps[prop] = this[prop];
            }

            Object.defineProperty(this.props, prop, {
                enumerable: true,
                get() {
                    return _this[prop];
                },
                set(value) {
                    // get the value
                    value = value?.value ?? value;
                    // try to parse JSON if the value is a string
                    if (value && typeof value === 'string') {
                        try {
                            _this[prop] = JSON.parse(value);
                            return;
                        } catch (e) {}
                    }
                    // set the value
                    _this[prop] = value;
                },
            });

            // default props
            if (finalProps[prop] === undefined && this[prop] === undefined) {
                finalProps[prop] = defaultProps[prop] ?? obj.default;
            }
        }

        const attrs = this.attributes;
        for (let [id, attr] of Object.entries(attrs)) {
            if (attr.name.includes('.')) {
                __set(finalProps, __camelCase(attr.name), __parse(attr.value));
            }
        }

        if (this.settings.interface) {
            finalProps = this.settings.interface.apply(finalProps);
        }
        Object.assign(this.props, finalProps);

        // make props responsive
        this.utils.makePropsResponsive(this.props);

        // verbose
        if (this.props.verbose) {
            console.log(
                `[${this.tagName.toLowerCase()}]${
                    this.id ? ` #${this.id} ` : ' '
                }mounting`,
            );
        }

        // handle state if needed
        if (this.state) {
            const state = Object.assign({}, this.state);
            delete this.state;
            Object.defineProperty(this, 'state', {
                enumerable: true,
                value: this.utils.handleState(state, {
                    save: this.props.saveState,
                }),
            });
            this.state.$set('*', () => {
                this.requestUpdate();
            });
        }

        // custom mount function
        if (this.mount && typeof this.mount === 'function') {
            await this.mount();
        }

        // set the not as updatable
        this._shouldUpdate = true;
        // @ts-ignore
        this.requestUpdate();
        await this.updateComplete;
        this.utils.injectStyle(
            this.constructor.styles?.cssText ?? '',
            this.tagName,
        );
        // await __wait();
        if (this.props.adoptStyle && this.shadowRoot) {
            await this.utils.adoptStyleInShadowRoot(this.shadowRoot);
        }

        return true;
    }
}
