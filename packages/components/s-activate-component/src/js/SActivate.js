var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, property, css, unsafeCSS } from 'lit-element';
import __SActivateComponentInterface from './interface/SActivateComponentInterface';
import __SComponentUtils from '@coffeekraken/s-component-utils';
export default class SActivate extends LitElement {
    constructor() {
        super();
        this._component = undefined;
        this._hrefSelector = undefined;
        this._$targets = undefined;
        this._$groupElements = undefined;
        this._state = 'pending';
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            interface: __SActivateComponentInterface,
            defaultProps: {}
        });
    }
    static get styles() {
        return css `${unsafeCSS(`
            :host {
                display: inline-block;
                cursor: pointer;
            }
        `)}`;
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
        const targets = Array.from(document.querySelectorAll(this._hrefSelector));
        if (targets.length)
            this._$targets = targets;
        if (this._component.props.group) {
            this._$groupElements = Array.from(document.querySelectorAll(`s-activate[group="${this._component.props.group}"]`));
        }
        this._component.props.trigger.forEach(trigger => {
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
            localStorage.setItem(`s-activate-state-${this.id}`, true);
        }
        // history
        if (this._component.props.history) {
            document.location.hash = this._hrefSelector;
        }
        // check if we have some elements in the group
        if (this._$groupElements) {
            this._$groupElements.forEach($element => {
                if ($element === this)
                    return;
                try {
                    $element.unactivate();
                }
                catch (e) { }
            });
        }
        // add the "active" attribute to the component
        this.setAttribute('active', true);
        // loop on targets to activate them
        if (this._$targets) {
            this._$targets.forEach($target => {
                $target.classList.add('active');
                $target.setAttribute('active', true);
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
            this._$targets.forEach($target => {
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
export function webcomponent(tagName = 's-activate', settings = {}) {
    customElements.define(tagName, SActivate, settings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGl2YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0FjdGl2YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUE0QixNQUFNLGFBQWEsQ0FBQztBQUNsRyxPQUFPLDZCQUE2QixNQUFNLHlDQUF5QyxDQUFDO0FBQ3BGLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFJaEUsTUFBTSxDQUFDLE9BQU8sT0FBTyxTQUFVLFNBQVEsVUFBVTtJQW1CN0M7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQWxCWixlQUFVLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLGtCQUFhLEdBQUcsU0FBUyxDQUFDO1FBQzFCLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsb0JBQWUsR0FBRyxTQUFTLENBQUM7UUFHNUIsV0FBTSxHQUFHLFNBQVMsQ0FBQztRQWFmLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3ZGLFNBQVMsRUFBRSw2QkFBNkI7WUFDeEMsWUFBWSxFQUFFLEVBQUU7U0FDbkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWZELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUEsR0FBRyxTQUFTLENBQUM7Ozs7O1NBS3RCLENBQUMsRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQVNELFlBQVk7UUFDUixhQUFhO1FBQ2IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUpBQXVKLENBQUMsQ0FBQztZQUN2TCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUss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