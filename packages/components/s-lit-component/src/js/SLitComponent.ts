// @ts-nocheck
// @TODO            check how to override private static methods

import type { ISComponentUtilsSettings } from '@coffeekraken/s-component-utils';
import __SComponentUtils, {
    SComponentUtilsDefaultPropsInterface
} from '@coffeekraken/s-component-utils';
import __SInterface from '@coffeekraken/s-interface';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import { __expandPleasantCssClassnames } from '@coffeekraken/sugar/html';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import { html as __html, LitElement } from 'lit';

function tplToStr(tpl) {
    if (!tpl) {
        return '';
    }

    if (typeof tpl === 'string') {
        return tpl;
    } else if (tpl.strings && tpl.values) {
        let str = tpl.strings[0];
        for (let i = 1; i < tpl.strings.length; i++) {
            const val = tpl.values?.[i - 1] ?? '';
            if (typeof val === 'string') {
                str += val;
            } else if (Array.isArray(val)) {
                val.forEach((v) => {
                    str += tplToStr(v);
                });
            } else if (val.values) {
                str += tplToStr(val);
            }

            str += tpl.strings[i] ?? '';
        }
        return str;
    } else if (tpl.values) {
        let str = '';
        tpl.values.forEach((val) => {
            str += val;
        });
        return str;
    }
}

export function html(strings, ...values) {
    const newStrings = [];
    newStrings.raw = strings.raw;
    const newValues = [];

    const classmap = document.env?.SUGAR?.classmap;

    let inClass = false,
        newClasses = [];

    for (let i = 0; i < strings.length; i++) {
        let newStr = strings[i],
            newVal = values[i];

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

export interface ISLitComponentSettings extends ISComponentUtilsSettings {
    interface?: typeof __SInterface;
    rootNode?: HTMLElement;
    shadowDom?: boolean;
    defaultProps?: any;
    componentUtils: Partial<ISComponentUtilsSettings>;
}

export interface ISLitComponentDefineSettings {
    window: any;
}

export interface ISLitComponentDefaultProps {
    id: string;
    lnf: string;
    mountWhen: 'directly' | 'direct' | 'inViewport';
    adoptStyle: boolean;
    saveState: boolean;
    defaultStyle: boolean;
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
    static define(
        tagName: string,
        Cls: SLitComponent,
        props: any = {},
        settings: Partial<ISLitComponentDefineSettings> = {},
    ) {
        const win = settings.window ?? window;

        if (win.customElements.get(tagName.toLowerCase())) {
            return;
        }

        // set the default props
        SLitComponent.setDefaultProps(tagName, props);
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

            // handle physical and boolean attributes
            if (
                definition.physical ||
                definition.type?.type?.toLowerCase?.() === 'boolean' ||
                definition.type?.toLowerCase?.() === 'boolean' ||
                definition.type?.type?.toLowerCase?.() === 'object' ||
                definition.type?.toLowerCase?.() === 'object'
            ) {
                propertiesObj[prop].reflect = true;
                propertiesObj[prop].attribute = __dashCase(prop);
                propertiesObj[prop].converter = {
                    fromAttribute: (value, type) => {
                        const typeStr =
                            definition.type?.type?.toLowerCase() ??
                            definition.type?.toLowerCase();

                        if (typeStr === 'object' && typeof value === 'string') {
                            try {
                                const json = JSON.parse(value);
                                return json;
                            } catch (e) {
                                console.error(e);
                            }
                        }
                        if (value === 'true' || value === '') return true;
                        return value;
                    },
                    toAttribute(value) {
                        if (
                            typeof value !== 'string' &&
                            typeof value !== 'boolean'
                        ) {
                            try {
                                const jsonStr = JSON.stringify(value);
                                return jsonStr;
                            } catch (e) {}
                        }

                        if (
                            value === 'false' ||
                            value === false ||
                            value === null
                        ) {
                            return undefined;
                        }
                        return value;
                    },
                };
            }
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

        this.cu = new __SComponentUtils(this, {
            ...(this.settings ?? {}),
            ...(this.settings.componentUtils ?? {}),
            style:
                this.constructor.styles?.cssText ??
                this.settings.style ??
                this.settings.componentUtils?.style ??
                '',
        });
        this.componentUtils = this.cu;

        (async () => {
            const defaultProps = __SComponentUtils.getDefaultProps(
                this.tagName.toLowerCase(),
            );
            const mountWhen =
                this.getAttribute('mount-when') ??
                defaultProps.mountWhen ??
                'direct';

            // component class
            this.classList.add(...this.cu.cls('').split(' '));

            await __wait();
            await __wait();
            if (!mountWhen.match(/^direct(ly)?$/)) {
                // wait until mount
                await this.cu.waitAndExecute(mountWhen, () => {
                    this._mount();
                });
            } else {
                this._mount();
            }
        })();
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

    async _mount() {
        const _this = this,
            defaultProps = __SComponentUtils.getDefaultProps(
                this.tagName.toLowerCase(),
            );

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

            let attrValue = this.getAttribute(__dashCase(prop));
            if (attrValue !== null) {
                if (attrValue === 'false') attrValue = false;
                if (attrValue === '') attrValue = true;
                finalProps[prop] = attrValue;
            }

            // default props
            if (finalProps[prop] === undefined && this[prop] === undefined) {
                finalProps[prop] = defaultProps[prop] ?? obj.default;
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
            await this.mount();
        }

        // set the not as updatable
        this._shouldUpdate = true;
        // @ts-ignore
        this.requestUpdate();
        await this.updateComplete;
        this.cu.injectStyle(
            this.constructor.styles?.cssText ?? '',
            this.tagName,
        );
        await __wait();
        if (this.props.adoptStyle && this.shadowRoot) {
            await this.cu.adoptStyleInShadowRoot(this.shadowRoot);
        }

        return true;
    }
}
