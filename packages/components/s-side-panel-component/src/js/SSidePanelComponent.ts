// @ts-nocheck

import {LitElement, html, property, css, unsafeCSS, query, queryAssignedNodes} from 'lit-element';
import __SSidePanelComponentInterface from './interface/SSidePanelComponentInterface';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';

import __css from '../css/s-side-panel.css';

export default class SSidePanel extends LitElement {

    static _activePanels: SSidePanel[] = [];

    static get styles() {
        return css`${unsafeCSS(__css)}`;
    }

    static get properties() { 
        return { active: { type: Boolean } };
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
            interface: __SSidePanelComponentInterface,
            defaultProps: {}
        });

        if (this._component.props.closeOn.indexOf('click') !== -1) {
            this.querySelector('.s-side-panel__overlay')?.addEventListener('click', (e) => {
                if (e.target !== this) return;
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

    }
    firstUpdated() {

        const $container = this.querySelector('.s-side-panel__container');

        this._$nodes.forEach($node => {
            $container?.appendChild($node);
        });
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return html`
            ${this.overlay ? html`
                <div class="${this._component.className('__overlay')}"></div>
            ` : ''} 
            <div class="${this._component.className('__container')}">
            </div>            
        `;
    }
}

export function webcomponent(tagName = 's-side-panel') {
    customElements.define(tagName, SSidePanel);
}