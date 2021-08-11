// @ts-nocheck
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, property, css, unsafeCSS } from 'lit-element';
import __SSidePanelComponentInterface from './interface/SSidePanelComponentInterface';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import __css from '../css/s-side-panel.css';
export default class SSidePanel extends LitElement {
    constructor() {
        var _a;
        super();
        this._component = undefined;
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            interface: __SSidePanelComponentInterface,
            defaultProps: {}
        });
        if (this._component.props.closeOn.indexOf('click') !== -1) {
            (_a = this.querySelector('.s-side-panel__overlay')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
                if (e.target !== this)
                    return;
                if (this.constructor._activePanels.slice(-1)[0] !== this)
                    return;
                this.constructor._activePanels.pop();
                this.active = false;
            });
        }
        if (this._component.props.closeOn.indexOf('escape') !== -1) {
            __hotkey('escape').on('press', () => {
                if (this.constructor._activePanels.slice(-1)[0] !== this)
                    return;
                this.constructor._activePanels.pop();
                this.active = false;
            });
        }
        if (this._component.props.defaultStyle) {
            this.setAttribute('default-style', true);
        }
        this._$nodes = Array.from(this.children);
    }
    static get styles() {
        return css `${unsafeCSS(__css)}`;
    }
    static get properties() {
        return { active: { type: Boolean } };
    }
    set active(value) {
        this._active = value;
        if (value && this.constructor._activePanels.indexOf(this) === -1) {
            this.constructor._activePanels.push(this);
        }
        if (value) {
            this.setAttribute('active', true);
        }
        else
            this.removeAttribute('active');
        this.requestUpdate();
    }
    get active() {
        return this._active;
    }
    firstUpdated() {
        const $container = this.querySelector('.s-side-panel__container');
        this._$nodes.forEach($node => {
            $container === null || $container === void 0 ? void 0 : $container.appendChild($node);
        });
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return html `
            ${this.overlay ? html `
                <div class="${this._component.className('__overlay')}"></div>
            ` : ''} 
            <div class="${this._component.className('__container')}">
            </div>            
        `;
    }
}
SSidePanel._activePanels = [];
__decorate([
    property()
], SSidePanel.prototype, "overlay", void 0);
export function webcomponent(tagName = 's-side-panel') {
    customElements.define(tagName, SSidePanel);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NpZGVQYW5lbENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTaWRlUGFuZWxDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7OztBQUVkLE9BQU8sRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUE0QixNQUFNLGFBQWEsQ0FBQztBQUNsRyxPQUFPLDhCQUE4QixNQUFNLDBDQUEwQyxDQUFDO0FBQ3RGLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFFaEUsT0FBTyxRQUFRLE1BQU0sd0NBQXdDLENBQUM7QUFFOUQsT0FBTyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFFNUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsVUFBVTtJQWlDOUM7O1FBQ0ksS0FBSyxFQUFFLENBQUM7UUF0QlosZUFBVSxHQUFHLFNBQVMsQ0FBQztRQXVCbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdkYsU0FBUyxFQUFFLDhCQUE4QjtZQUN6QyxZQUFZLEVBQUUsRUFBRTtTQUNuQixDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDdkQsTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLDBDQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUMxRSxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSTtvQkFBRSxPQUFPO2dCQUM5QixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxD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