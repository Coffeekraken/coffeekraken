// @ts-nocheck

import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import __SSidePanelComponentInterface from './interface/SSidePanelComponentInterface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';

import __css from '../css/s-side-panel.css';

export interface SSidePanelComponentProps {
    side: 'top' | 'left' | 'bottom' | 'right';
    active: boolean;
    overlay: boolean;
    triggerer: string;
    closeOn: ('click' | 'escape')[];
}

export default class SSidePanel extends __SLitComponent {
    static _activePanels: SSidePanel[] = [];

    static get properties() {
        return __SLitComponent.properties({}, __SSidePanelComponentInterface);
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

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
        super(
            __deepMerge({
                sLitComponent: {
                    shadowDom: false,
                },
                sComponentUtils: {
                    interface: __SSidePanelComponentInterface,
                },
            }),
        );

        if (this.props.closeOn.indexOf('click') !== -1) {
            this.addEventListener('click', (e) => {
                if (this._$container.contains(e.target)) return;
                if (this.constructor._activePanels.slice(-1)[0] !== this) return;
                this.constructor._activePanels.pop();
                this.active = false;
            });
        }
        if (this.props.closeOn.indexOf('escape') !== -1) {
            __hotkey('escape').on('press', () => {
                if (this.constructor._activePanels.slice(-1)[0] !== this) return;
                this.constructor._activePanels.pop();
                this.active = false;
            });
        }

        this._$nodes = Array.from(this.children);

        if (this.props.triggerer) {
            const $triggerers = Array.from(document.querySelectorAll(this.props.triggerer));
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
    open() {
        this.active = true;
    }
    close() {
        this.active = false;
    }
    render() {
        return html`
            ${this.overlay ? html` <div class="${this.componentUtils.className('__overlay')}"></div> ` : ''}
            <div class="${this.componentUtils.className('__container')}"></div>
        `;
    }
}

export function define(props: Partial<SSidePanelComponentProps> = {}, tagName = 's-side-panel') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SSidePanel);
}
