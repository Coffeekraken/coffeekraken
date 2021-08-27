var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
        this._$nodes = Array.from(this.children);
    }
    static get properties() {
        return __SComponentUtils.properties({}, __SActivateComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
            s-activate {
                display: inline-block;
                cursor: pointer;
            }
        `)}
        `;
    }
    createRenderRoot() {
        return this;
    }
    firstUpdated() {
        var _a;
        (_a = this._$nodes) === null || _a === void 0 ? void 0 : _a.forEach(($node) => {
            this.appendChild($node);
        });
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
        if (targets === null || targets === void 0 ? void 0 : targets.length)
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
    activate(force = false) {
        return __awaiter(this, void 0, void 0, function* () {
            // clear the unactivate timeout
            clearTimeout(this._unactivateTimeout);
            // protect from activating multiple times
            if (!force && this.isActive())
                return;
            setTimeout(() => {
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
                        if (this._component.props.activeClass) {
                            $target.classList.add(this._component.props.activeClass);
                        }
                        if (this._component.props.activeAttribute) {
                            $target.setAttribute(this._component.props.activeAttribute, 'true');
                        }
                    });
                }
            }, this._component.props.activateTimeout);
        });
    }
    unactivate() {
        return __awaiter(this, void 0, void 0, function* () {
            // protect from unactivating multiple times
            if (!this.isActive())
                return;
            this._unactivateTimeout = setTimeout(() => {
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
                        if (this._component.props.activeClass) {
                            $target.classList.remove(this._component.props.activeClass);
                        }
                        if (this._component.props.activeAttribute) {
                            $target.removeAttribute(this._component.props.activeAttribute);
                        }
                    });
                }
            }, this._component.props.unactivateTimeout);
        });
    }
    render() {
        return html ``;
    }
}
__decorate([
    property()
], SActivate.prototype, "_state", void 0);
export function webcomponent(props = {}, tagName = 's-activate', settings = {}) {
    __SComponentUtils.setDefaultProps(tagName, props);
    customElements.define(tagName, SActivate, settings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGl2YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0FjdGl2YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQTZCLE1BQU0sYUFBYSxDQUFDO0FBQ3hGLE9BQU8sNkJBQTZCLE1BQU0seUNBQXlDLENBQUM7QUFDcEYsT0FBTyxpQkFBaUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBZWpGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBVSxTQUFRLFdBQVc7SUEwQjlDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFsQlosV0FBTSxHQUFHLFNBQVMsQ0FBQztRQW1CZixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN2RixjQUFjLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLDZCQUE2QjtnQkFDeEMsWUFBWSxFQUFFLEVBQUU7YUFDbkI7U0FDSixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUF6QkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLDZCQUE2QixDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUM7Ozs7O1NBS2YsQ0FBQztTQUNELENBQUM7SUFDTixDQUFDO0lBYUQsZ0JBQWdCO1FBQ1osT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELFlBQVk7O1FBQ1IsTUFBQSxJQUFJLENBQUMsT0FB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