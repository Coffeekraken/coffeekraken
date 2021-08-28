// @ts-nocheck

import { html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import __SSidePanelComponentInterface from './interface/SSidePanelComponentInterface';
import __SComponentUtils, { SLitElement, ISComponentUtilsDefaultProps } from '@coffeekraken/s-component-utils';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';

import __css from '../css/s-side-panel.css';

export interface SSidePanelComponentProps extends ISComponentUtilsDefaultProps {
    side: 'top' | 'left' | 'bottom' | 'right';
    active: boolean;
    overlay: boolean;
    triggerer: string;
    closeOn: ('click' | 'escape')[];
}

export default class SSidePanel extends SLitElement {
    static _activePanels: SSidePanel[] = [];

    static get properties() {
        return __SComponentUtils.properties({}, __SSidePanelComponentInterface);
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    _component = undefined;

    set active(value) {
        this._active = value;
        if (value && this.constructor._activePanels.indexOf(this) === -1) {
            this.constructor._activePanels.push(this);
        }
        if (value) {
            this.setAttribute('active', true);
        } else this.removeAttribute('active');
        this.requestUpdate();
    }
    get active() {
        return this._active;
    }

    @property()
    overlay;

    _$nodes;

    constructor() {
        super();
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            componentUtils: {
                interface: __SSidePanelComponentInterface,
                defaultProps: {},
            },
        });

        if (this._component.props.closeOn.indexOf('click') !== -1) {
            this.addEventListener('click', (e) => {
                if (this._$container.contains(e.target)) return;
                if (this.constructor._activePanels.slice(-1)[0] !== this) return;
                this.constructor._activePanels.pop();
                this.active = false;
            });
        }
        if (this._component.props.closeOn.indexOf('escape') !== -1) {
            __hotkey('escape').on('press', () => {
                if (this.constructor._activePanels.slice(-1)[0] !== this) return;
                this.constructor._activePanels.pop();
                this.active = false;
            });
        }

        if (this._component.props.defaultStyle) {
            this.setAttribute('default-style', true);
        }

        this._$nodes = Array.from(this.children);

        if (this._component.props.triggerer) {
            const $triggerers = Array.from(document.querySelectorAll(this._component.props.triggerer));
            $triggerers.forEach(($triggerer) => {
                $triggerer.addEventListener('click', (e) => {
                    this.open();
                });
            });
        }
    }
    firstUpdated() {
        this._$container = this.querySelector('.s-side-panel__container');

        this._$nodes.forEach(($node) => {
            this._$container?.appendChild($node);
        });
    }
    createRenderRoot() {
        return this;
    }
    open() {
        this.active = true;
    }
    close() {
        this.active = false;
    }
    render() {
        return html`
            ${this.overlay ? html` <div class="${this._component.className('__overlay')}"></div> ` : ''}
            <div class="${this._component.className('__container')}"></div>
        `;
    }
}

export function webcomponent(props: Partial<SSidePanelComponentProps> = {}, tagName = 's-side-panel') {
    __SComponentUtils.setDefaultProps(tagName, props);
    customElements.define(tagName, SSidePanel);
}
