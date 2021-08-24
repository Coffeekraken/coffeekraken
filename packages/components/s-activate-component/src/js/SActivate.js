var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, property, css, unsafeCSS } from 'lit-element';
import __SActivateComponentInterface from './interface/SActivateComponentInterface';
import __SComponentUtils, { SLitElement } from '@coffeekraken/s-component-utils';
export default class SActivate extends SLitElement {
    constructor() {
        super();
        this._state = 'pending';
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            componentUtils: {
                interface: __SActivateComponentInterface,
                defaultProps: {},
            },
        });
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
            :host {
                display: inline-block;
                cursor: pointer;
            }
        `)}
        `;
    }
    firstUpdated() {
        // save state
        if (this._component.props.saveState) {
            if (!this.id)
                throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
            this._component.props.active = localStorage.getItem(`s-activate-state-${this.id}`) !== null;
        }
        if (this._component.props.href) {
            this._hrefSelector = this._component.props.href;
        }
        let targets;
        if (this._hrefSelector)
            targets = Array.from(document.querySelectorAll(this._hrefSelector));
        if (targets.length)
            this._$targets = targets;
        if (this._component.props.group) {
            this._$groupElements = Array.from(document.querySelectorAll(`s-activate[group="${this._component.props.group}"]`));
        }
        this._component.props.trigger.forEach((trigger) => {
            switch (trigger) {
                case 'click':
                    this.addEventListener('click', (e) => {
                        if (this.isActive() && this._component.props.toggle) {
                            this.unactivate();
                        }
                        else {
                            this.activate();
                        }
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
        // expose API
        // this.activate = this.activate.bind(this);
        // this.unactivate = this.unactivate.bind(this);
        // this.isActive = this.isActive.bind(this);
        // activate if has the "active" attribute
        if (this._component.props.active) {
            this.activate(true);
        }
    }
    isActive() {
        return this.hasAttribute('active');
    }
    activate(force = false) {
        // protect from activating multiple times
        if (!force && this.isActive())
            return;
        // save state
        if (this._component.props.saveState) {
            if (!this.id)
                throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
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
                if ($element === this)
                    return;
                try {
                    // @ts-ignore
                    $element.unactivate();
                }
                catch (e) { }
            });
        }
        // add the "active" attribute to the component
        this.setAttribute('active', 'true');
        // loop on targets to activate them
        if (this._$targets) {
            // @ts-ignore
            this._$targets.forEach(($target) => {
                $target.classList.add('active');
                $target.setAttribute('active', 'true');
            });
        }
    }
    unactivate() {
        // protect from unactivating multiple times
        if (!this.isActive())
            return;
        // save state
        if (this._component.props.saveState) {
            if (!this.id)
                throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
            localStorage.removeItem(`s-activate-state-${this.id}`);
        }
        // remove the "active" attribute to the component
        this.removeAttribute('active');
        // loop on targets to unactivate them
        if (this._$targets) {
            // @ts-ignore
            this._$targets.forEach(($target) => {
                $target.classList.remove('active');
                $target.removeAttribute('active');
            });
        }
    }
    render() {
        return html `<slot></slot>`;
    }
}
__decorate([
    property()
], SActivate.prototype, "_state", void 0);
export function webcomponent(props = {}, tagName = 's-activate', settings = {}) {
    __SComponentUtils.setDefaultProps(tagName, props);
    customElements.define(tagName, SActivate, settings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGl2YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0FjdGl2YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQTZCLE1BQU0sYUFBYSxDQUFDO0FBQ3hGLE9BQU8sNkJBQTZCLE1BQU0seUNBQXlDLENBQUM7QUFDcEYsT0FBTyxpQkFBaUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBY2pGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBVSxTQUFRLFdBQVc7SUFvQjlDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFkWixXQUFNLEdBQUcsU0FBUyxDQUFDO1FBZWYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdkYsY0FBYyxFQUFFO2dCQUNaLFNBQVMsRUFBRSw2QkFBNkI7Z0JBQ3hDLFlBQVksRUFBRSxFQUFFO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQW5CRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDOzs7OztTQUtmLENBQUM7U0FDRCxDQUFDO0lBQ04sQ0FBQztJQVdELFlBQVk7UUFDUixhQUFhO1FBQ2IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNSLE1BQU0sSUFBSSxLQUFLLENBQ1gsdUpBQXVKLENBQzFKLENBQUM7WUFDTixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssSUFB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