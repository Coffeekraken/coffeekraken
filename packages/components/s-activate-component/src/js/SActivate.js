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
import { html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
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
        if (this.saveState) {
            if (!this.id)
                throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
            this.active = localStorage.getItem(`s-activate-state-${this.id}`) !== null;
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
                this.active = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGl2YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0FjdGl2YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyw2QkFBNkIsTUFBTSx5Q0FBeUMsQ0FBQztBQUNwRixPQUFPLGlCQUFpQixFQUFFLEVBQUUsV0FBVyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFlakYsTUFBTSxDQUFDLE9BQU8sT0FBTyxTQUFVLFNBQVEsV0FBVztJQTBCOUM7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQWxCWixXQUFNLEdBQUcsU0FBUyxDQUFDO1FBbUJmLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3ZGLGNBQWMsRUFBRTtnQkFDWixTQUFTLEVBQUUsNkJBQTZCO2dCQUN4QyxZQUFZLEVBQUUsRUFBRTthQUNuQjtTQUNKLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQXpCRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQzs7Ozs7U0FLZixDQUFDO1NBQ0QsQ0FBQztJQUNOLENBQUM7SUFhRCxnQkFBZ0I7UUFDWixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0QsWUFBWTs7UUFDUixNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxhQUFhO1FBQ2IsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDUixNQUFNLElBQUksS0FBSyxDQUNYLHVKQUF1SixDQUMxSixDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLG9CQUFvQixJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxJQUFJLENBQUM7U0FDOUU7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztTQUNuRDtRQUVELElBQUksT0FBTyxDQUFDO1FBQ1osSUFBSSxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUM1RixJQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxNQUFNO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFFOUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUM3QixRQUFRLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQ2xGLENBQUM7U0FDTDtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM5QyxRQUFRLE9BQU8sRUFBRTtnQkFDYixLQUFLLE9BQU87b0JBQ1IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUNqQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7NEJBQ2pELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzt5QkFDckI7NkJBQU07NEJBQ0gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3lCQUNuQjtvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNO2dCQUNWLEtBQUssV0FBVztvQkFDWixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7d0JBQ3JDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDcEIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTTtnQkFDVixLQUFLLFVBQVUsQ0FBQztnQkFDaEIsS0FBSyxZQUFZO29CQUNiLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTt3QkFDdEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUN0QixDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNO2dCQUNWLEtBQUssUUFBUTtvQkFDVCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxhQUFhLEVBQUU7d0JBQy9DLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDbkI7b0JBQ0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUN4QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxhQUFhLEVBQUU7NEJBQy9DLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt5QkFDbkI7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBRUgsTUFBTTthQUNiO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCx5Q0FBeUM7UUFDekMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFDRCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDSyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUs7O1lBQ3hCLCtCQUErQjtZQUMvQixZQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFdEMseUNBQXlDO1lBQ3pDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFBRSxPQUFPO1lBRXRDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osYUFBYTtnQkFDYixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtvQkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUNSLE1BQU0sSUFBSSxLQUFLLENBQ1gsdUpBQXVKLENBQzFKLENBQUM7b0JBQ04sWUFBWSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUMvRDtnQkFFRCxVQUFVO2dCQUNWLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQ3JELFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7aUJBQy9DO2dCQUVELDhDQUE4QztnQkFDOUMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO29CQUN0QixhQUFhO29CQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ3RDLElBQUksUUFBUSxLQUFLLElBQUk7NEJBQUUsT0FBTzt3QkFDOUIsSUFBSTs0QkFDQSxhQUFhOzRCQUNiLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQzt5QkFDekI7d0JBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtvQkFDbEIsQ0FBQyxDQUFDLENBQUM7aUJBQ047Z0JBRUQsOENBQThDO2dCQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFFbkIsbUNBQW1DO2dCQUNuQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ2hCLGFBQWE7b0JBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDL0IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7NEJBQ25DLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3lCQUM1RDt3QkFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRTs0QkFDdkMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7eUJBQ3ZFO29CQUNMLENBQUMsQ0FBQyxDQUFDO2lCQUNOO1lBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzlDLENBQUM7S0FBQTtJQUNLLFVBQVU7O1lBQ1osMkNBQTJDO1lBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUFFLE9BQU87WUFFN0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3RDLGFBQWE7Z0JBQ2IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7b0JBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDUixNQUFNLElBQUksS0FBSyxDQUNYLHVKQUF1SixDQUMxSixDQUFDO29CQUNOLFlBQVksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUMxRDtnQkFFRCxpREFBaUQ7Z0JBQ2pELElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRS9CLHFDQUFxQztnQkFDckMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNoQixhQUFhO29CQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7d0JBQy9CLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFOzRCQUNuQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzt5QkFDL0Q7d0JBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7NEJBQ3ZDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7eUJBQ2xFO29CQUNMLENBQUMsQ0FBQyxDQUFDO2lCQUNOO1lBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDaEQsQ0FBQztLQUFBO0lBQ0QsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFBLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBQ0o7QUE1TEc7SUFEQyxRQUFRLEVBQUU7eUNBQ1E7QUE4THZCLE1BQU0sVUFBVSxZQUFZLENBQUMsUUFBMkMsRUFBRSxFQUFFLE9BQU8sR0FBRyxZQUFZLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDN0csaUJBQWlCLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDeEQsQ0FBQyJ9