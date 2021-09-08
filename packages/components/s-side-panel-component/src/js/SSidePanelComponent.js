// @ts-nocheck
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import __SSidePanelComponentInterface from './interface/SSidePanelComponentInterface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import __css from '../css/s-side-panel.css';
export default class SSidePanel extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            sLitComponent: {
                shadowDom: false,
            },
            sComponentUtils: {
                interface: __SSidePanelComponentInterface,
            },
        }));
        if (this.props.closeOn.indexOf('click') !== -1) {
            this.addEventListener('click', (e) => {
                if (this._$container.contains(e.target))
                    return;
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
            const $triggerers = Array.from(document.querySelectorAll(this.props.triggerer));
            $triggerers.forEach(($triggerer) => {
                $triggerer.addEventListener('click', (e) => {
                    this.open();
                });
            });
        }
    }
    static get properties() {
        return __SLitComponent.properties({}, __SSidePanelComponentInterface);
    }
    static get styles() {
        return css `
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
        }
        else
            this.removeAttribute('active');
        this.requestUpdate();
    }
    get active() {
        return this._active;
    }
    firstUpdated() {
        this._$container = this.querySelector('.s-side-panel__container');
        this._$nodes.forEach(($node) => {
            var _a;
            (_a = this._$container) === null || _a === void 0 ? void 0 : _a.appendChild($node);
        });
    }
    open() {
        this.active = true;
    }
    close() {
        this.active = false;
    }
    render() {
        return html `
            ${this.overlay ? html ` <div class="${this.componentUtils.className('__overlay')}"></div> ` : ''}
            <div class="${this.componentUtils.className('__container')}"></div>
        `;
    }
}
SSidePanel._activePanels = [];
__decorate([
    property()
], SSidePanel.prototype, "overlay", void 0);
export function define(props = {}, tagName = 's-side-panel') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SSidePanel);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NpZGVQYW5lbENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTaWRlUGFuZWxDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7OztBQUVkLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyw4QkFBOEIsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RCxPQUFPLFFBQVEsTUFBTSx3Q0FBd0MsQ0FBQztBQUU5RCxPQUFPLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQVU1QyxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxlQUFlO0lBZ0NuRDtRQUNJLEtBQUssQ0FDRCxXQUFXLENBQUM7WUFDUixhQUFhLEVBQUU7Z0JBQ1gsU0FBUyxFQUFFLEtBQUs7YUFDbkI7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsU0FBUyxFQUFFLDhCQUE4QjthQUM1QztTQUNKLENBQUMsQ0FDTCxDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNqQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBQUUsT0FBTztnQkFDaEQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJO29CQUFFLE9BQU87Z0JBQ2pFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDN0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO2dCQUNoQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUk7b0JBQUUsT0FBTztnQkFDakUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXpDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDdEIsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtnQkFDL0IsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUN2QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFuRUQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLEtBQUs7UUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDOUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNyQzs7WUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0QsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUE4Q0QsWUFBWTtRQUNSLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBRWxFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7O1lBQzNCLE1BQUEsSUFBSSxDQUFDLFdBQVcsMENBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELElBQUk7UUFDQSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBQ0QsS0FBSztRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7Y0FDTCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUEsZ0JBQWdCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7MEJBQ2pGLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztTQUM3RCxDQUFDO0lBQ04sQ0FBQzs7QUF4Rk0sd0JBQWEsR0FBaUIsRUFBRSxDQUFDO0FBMkJ4QztJQURDLFFBQVEsRUFBRTsyQ0FDSDtBQWdFWixNQUFNLFVBQVUsTUFBTSxDQUFDLFFBQTJDLEVBQUUsRUFBRSxPQUFPLEdBQUcsY0FBYztJQUMxRixlQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUMvQyxDQUFDIn0=