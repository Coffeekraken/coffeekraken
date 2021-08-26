import { html, property, css, unsafeCSS, query, queryAssignedNodes } from 'lit-element';
import __SActivateComponentInterface from './interface/SActivateComponentInterface';
import __SComponentUtils, { SLitElement } from '@coffeekraken/s-component-utils';
import __copy from '@coffeekraken/sugar/js/clipboard/copy';
import __wait from '@coffeekraken/sugar/shared/time/wait';

export interface ISActivateComponentProps {
    href: string;
    group: string;
    toggle: boolean;
    history: boolean;
    active: boolean;
    activeClass: string;
    saveState: boolean;
    trigger: string[];
}

export default class SActivate extends SLitElement {
    _component: __SComponentUtils;
    _hrefSelector?: string;
    _$targets?: HTMLElement[];
    _$groupElements?: HTMLElement[];
    _$nodes?: Element[];
    _unactivateTimeout;

    @property()
    _state = 'pending';

    static get properties() {
        return __SComponentUtils.properties({}, __SActivateComponentInterface);
    }

    static get styles() {
        return css`
            ${unsafeCSS(`
            s-activate {
                display: inline-block;
                cursor: pointer;
            }
        `)}
        `;
    }

    constructor() {
        super();
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            componentUtils: {
                interface: __SActivateComponentInterface,
                defaultProps: {},
            },
        });

        this._$nodes = Array.from(this.children);
    }
    createRenderRoot() {
        return this;
    }
    firstUpdated() {
        this._$nodes?.forEach(($node) => {
            this.appendChild($node);
        });

        // save state
        if (this._component.props.saveState) {
            if (!this.id)
                throw new Error(
                    `<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`,
                );
            this._component.props.active = localStorage.getItem(`s-activate-state-${this.id}`) !== null;
        }

        if (this._component.props.href) {
            this._hrefSelector = this._component.props.href;
        }

        let targets;
        if (this._hrefSelector) targets = Array.from(document.querySelectorAll(this._hrefSelector));
        if (targets.length) this._$targets = targets;

        if (this._component.props.group) {
            this._$groupElements = Array.from(
                document.querySelectorAll(`s-activate[group="${this._component.props.group}"]`),
            );
        }

        this._component.props.trigger.forEach((trigger) => {
            switch (trigger) {
                case 'click':
                    this.addEventListener('click', (e) => {
                        if (this.isActive() && this._component.props.toggle) {
                            this.unactivate();
                        } else {
                            this.activate();
                        }
                    });
                    break;
                case 'mouseover':
                    this.addEventListener('mouseover', (e) => {
                        this.activate();
                    });
                    break;
                case 'mouseout':
                case 'mouseleave':
                    this.addEventListener('mouseleave', (e) => {
                        this.unactivate();
                    });
                    break;
                case 'anchor':
                    if (document.location.hash === this._hrefSelector) {
                        this.activate();
                    }
                    window.addEventListener('hashchange', (e) => {
                        if (document.location.hash === this._hrefSelector) {
                            this.activate();
                        }
                    });

                    break;
            }
        });

        // activate if has the "active" attribute
        if (this._component.props.active) {
            this.activate(true);
        }
    }
    isActive() {
        return this.hasAttribute('active');
    }
    async activate(force = false) {
        // clear the unactivate timeout
        clearTimeout(this._unactivateTimeout);

        // protect from activating multiple times
        if (!force && this.isActive()) return;

        setTimeout(() => {
            // save state
            if (this._component.props.saveState) {
                if (!this.id)
                    throw new Error(
                        `<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`,
                    );
                localStorage.setItem(`s-activate-state-${this.id}`, 'true');
            }

            // history
            if (this._component.props.history && this._hrefSelector) {
                document.location.hash = this._hrefSelector;
            }

            // check if we have some elements in the group
            if (this._$groupElements) {
                // @ts-ignore
                this._$groupElements.forEach(($element) => {
                    if ($element === this) return;
                    try {
                        // @ts-ignore
                        $element.unactivate();
                    } catch (e) {}
                });
            }

            // add the "active" attribute to the component
            this.setAttribute('active', 'true');

            // loop on targets to activate them
            if (this._$targets) {
                // @ts-ignore
                this._$targets.forEach(($target) => {
                    if (this._component.props.activeClass) {
                        $target.classList.add(this._component.props.activeClass);
                    }
                    if (this._component.props.activeAttribute) {
                        $target.setAttribute(this._component.props.activeAttribute, 'true');
                    }
                });
            }
        }, this._component.props.activateTimeout);
    }
    async unactivate() {
        // protect from unactivating multiple times
        if (!this.isActive()) return;

        this._unactivateTimeout = setTimeout(() => {
            // save state
            if (this._component.props.saveState) {
                if (!this.id)
                    throw new Error(
                        `<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`,
                    );
                localStorage.removeItem(`s-activate-state-${this.id}`);
            }

            // remove the "active" attribute to the component
            this.removeAttribute('active');

            // loop on targets to unactivate them
            if (this._$targets) {
                // @ts-ignore
                this._$targets.forEach(($target) => {
                    if (this._component.props.activeClass) {
                        $target.classList.remove(this._component.props.activeClass);
                    }
                    if (this._component.props.activeAttribute) {
                        $target.removeAttribute(this._component.props.activeAttribute);
                    }
                });
            }
        }, this._component.props.unactivateTimeout);
    }
    render() {
        return html``;
    }
}

export function webcomponent(props: Partial<ISActivateComponentProps> = {}, tagName = 's-activate', settings = {}) {
    __SComponentUtils.setDefaultProps(tagName, props);
    customElements.define(tagName, SActivate, settings);
}
