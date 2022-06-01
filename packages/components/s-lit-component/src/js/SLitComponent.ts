// @ts-nocheck
// @TODO            check how to override private static methods

// import __mustache from 'mustache';
import __SInterface from '@coffeekraken/s-interface';
import __adoptStyleInShadowRoot from '@coffeekraken/sugar/js/dom/css/adoptStyleInShadowRoot';
import __injectStyle from '@coffeekraken/sugar/js/dom/css/injectStyle';
import __whenInViewport from '@coffeekraken/sugar/js/dom/detect/whenInViewport';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __SComponentUtils, {
    SComponentUtilsDefaultPropsInterface,
} from '@coffeekraken/s-component-utils';
import { LitElement } from 'lit';

export interface ISLitComponentSettings {
    interface?: typeof __SInterface;
    rootNode?: HTMLElement;
    shadowDom?: boolean;
    defaultProps?: any;
}

export interface ISLitComponentCtorSettings {
    litComponent: Partial<ISLitComponentSettings>;
}

export interface ISLitComponentDefaultProps {
    id: string;
    lnf: string;
    mountWhen: 'directly' | 'direct' | 'inViewport';
    adoptStyle: boolean;
    defaultStyle: boolean;
}

export default class SLitComponent extends LitElement {
    /**
     * @name            _settings
     * @type            Object
     * @private
     *
     * Store the settings
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _settings = {};

    /**
     * @name            props
     * @type            Object
     *
     * Store the component props
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    props: any;
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

    /**
     * @name        litComponentSettings
     * @type        ISLitComponentSettings
     * @get
     *
     * Access the component utils sertings
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    get litComponentSettings(): ISLitComponentSettings {
        return (<any>this.settings).litComponent;
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
    constructor(settings: Partial<ISLitComponentCtorSettings> = {}) {
        super();

        this.settings = __deepMerge(
            {
                componentUtils: {},
                litComponent: {
                    shadowDom: true,
                    get rootNode() {
                        return this.shadowRoot?.querySelector('*:first-child');
                    },
                },
            },
            settings,
        );

        // shadow handler
        if (this.litComponentSettings.shadowDom === false) {
            this.createRenderRoot = () => {
                return this;
            };
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
            this.mounted = true;
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

        setTimeout(async () => {
            const _this = this,
                default
                defaultProps = __SComponentUtils.getDefaultProps(
                    this.tagName.toLowerCase(),
                );

            let properties = this.constructor.properties;
            if (!properties) {
                properties = this.constructor.createProperties();
            }

            // this.props stack
            this.props = {};
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

                // default props
                if (this[prop] === undefined) {
                    this[prop] = defaultProps[prop] ?? obj.default;
                }
            }

            // this.state stack
            this._state = Object.assign({}, this.state ?? {});
            this.state = {};
            for (let [prop, value] of Object.entries(this._state)) {
                Object.defineProperty(this.state, prop, {
                    get() {
                        return _this._state[prop];
                    },
                    set(value) {
                        _this._state[prop] = value;
                        _this.requestUpdate();
                    },
                });
            }

            this.componentUtils = new __SComponentUtils(this, {
                componentUtils: {
                    ...(this.settings.componentUtils ?? {}),
                    style:
                        this.constructor.styles?.cssText ??
                        this.settings.componentUtils?.style ??
                        '',
                },
            });

            await this.componentUtils.waitAndExecute(
                this.props.mountWhen,
                this._mount.bind(this),
            );
        });
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
