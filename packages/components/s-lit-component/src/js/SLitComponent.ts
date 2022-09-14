// @ts-nocheck
// @TODO            check how to override private static methods

import type { ISComponentUtilsSettings } from '@coffeekraken/s-component-utils';
import __SComponentUtils, {
    SComponentUtilsDefaultPropsInterface,
} from '@coffeekraken/s-component-utils';
import __SInterface from '@coffeekraken/s-interface';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import { LitElement } from 'lit';

export interface ISLitComponentSettings extends ISComponentUtilsSettings {
    interface?: typeof __SInterface;
    rootNode?: HTMLElement;
    shadowDom?: boolean;
    defaultProps?: any;
    componentUtils: Partial<ISComponentUtilsSettings>;
}

let _debug = false;

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
    _shouldUpdate = false;

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

    static createProperties(properties: any, int: __SInterface): any {
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
                definition.type?.toLowerCase?.() === 'boolean' ||
                definition.type?.type?.toLowerCase?.() === 'boolean'
            ) {
                propertiesObj[prop].reflect = true;
                propertiesObj[prop].attribute = __dashCase(prop);
                propertiesObj[prop].converter = {
                    fromAttribute: (value, type) => {
                        if (value === 'true' || value === '') return true;
                        return value;
                    },
                    toAttribute(value) {
                        if (
                            value === 'false' ||
                            value === false ||
                            value === null
                        ) {
                            return null;
                        }
                        return String(value);
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
            this.props.mounted = true;
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

        this.componentUtils = new __SComponentUtils(this, {
            ...(this.settings ?? {}),
            ...(this.settings.componentUtils ?? {}),
            style:
                this.constructor.styles?.cssText ??
                this.settings.style ??
                this.settings.componentUtils?.style ??
                '',
        });

        // component class
        this.classList.add(...this.componentUtils.className('').split(' '));

        (async () => {
            const defaultProps = __SComponentUtils.getDefaultProps(
                this.tagName.toLowerCase(),
            );
            const mountWhen =
                this.getAttribute('mount-when') ??
                defaultProps.mountWhen ??
                'direct';

            setTimeout(async () => {
                // wait until mount
                await this.componentUtils.waitAndExecute(
                    mountWhen,
                    this._mount.bind(this),
                );
            });
        })();
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
            properties = this.constructor.createProperties();
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
            Object.assign(this.props, finalProps);
        }

        // make props responsive
        this.componentUtils.makePropsResponsive(this.props);

        // handle state if needed
        if (this.state) {
            this.state = this.componentUtils.handleState(this.state, {
                save: this.props.saveState,
            });
            this.state.$set('*', () => {
                this.requestUpdate();
            });
        }

        // verbose
        if (this.props.verbose) {
            console.log(
                `[${this.tagName.toLowerCase()}]${
                    this.id ? ` #${this.id} ` : ' '
                }mounting`,
            );
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
        this.componentUtils.injectStyle(
            this.constructor.styles?.cssText ?? '',
            this.tagName,
        );
        await __wait();
        if (this.props.adoptStyle && this.shadowRoot) {
            await this.componentUtils.adoptStyleInShadowRoot(this.shadowRoot);
        }

        return true;
    }
}
