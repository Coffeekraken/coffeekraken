// @ts-nocheck

import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import __SPanelComponentInterface from './interface/SPanelComponentInterface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';

// @ts-ignore
import __css from '../../../../src/css/s-panel.css'; // relative to /dist/pkg/esm/js

export interface SSidePanelComponentProps {
    position: 'top' | 'left' | 'bottom' | 'right' | 'modal';
    active: boolean;
    overlay: boolean;
    triggerer: string;
    closeOn: ('click' | 'escape')[];
}

export default class SSidePanel extends __SLitComponent {
    static _activePanels: SSidePanel[] = [];

    static get properties() {
        return __SLitComponent.properties({}, __SPanelComponentInterface);
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
                litComponent: {
                    shadowDom: false,
                },
                componentUtils: {
                    interface: __SPanelComponentInterface,
                },
            }),
        );

        console.log(this.constructor.properties);

        if (this.props.closeOn.indexOf('click') !== -1) {
            this.addEventListener('click', (e) => {
                if (this._$container.contains(e.target)) return;
                if (this.constructor._activePanels.slice(-1)[0] !== this)
                    return;
                this.constructor._activePanels.pop();
                this.active = false;
            });
        }
        if (this.props.closeOn.indexOf('escape') !== -1) {
            __hotkey('escape').on('press', () => {
                if (this.constructor._activePanels.slice(-1)[0] !== this)
                    return;
                this.constructor._activePanels.pop();
                this.active = false;
            });
        }

        this._$nodes = Array.from(this.children);

        if (this.props.triggerer) {
            const $triggerers = Array.from(
                document.querySelectorAll(this.props.triggerer),
            );
            $triggerers.forEach(($triggerer) => {
                $triggerer.addEventListener('click', (e) => {
                    this.open();
                });
            });
        }
    }
    firstUpdated() {
        this._$container = this.querySelector('.s-panel__container');

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
            <div
                class="${this.componentUtils.className(
                    '',
                )} ${this.componentUtils.className(`--${this.props.position}`)}"
            >
                ${this.props.overlay
                    ? html`
                          <div
                              class="${this.componentUtils.className(
                                  '__overlay',
                              )}"
                          ></div>
                      `
                    : ''}
                <div
                    class="${this.componentUtils.className('__container')}"
                ></div>
            </div>
        `;
    }
}

export function define(
    props: Partial<SSidePanelComponentProps> = {},
    tagName = 's-panel',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SSidePanel);
}
