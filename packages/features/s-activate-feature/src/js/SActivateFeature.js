var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SActivateFeatureInterface from './interface/SActivateFeatureInterface';
/**
 * @name            SActivateFeature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SActivateFeatureInterface.js
 * @menu            Styleguide / Features               /styleguide/features/s-activate-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to activate some elements depending on triggers like "click", "mouseover", "mouseout", "anchor", etc...
 * To be explicit, you can apply this feature on a link tag with the href attribute "#something", and on click,
 * the DOM element that has the id "something" will get the "active" class applied.
 *
 * @feature          Take the `href` attribute as target
 * @feature          Allows to "group" some element for tabs behavior, etc...
 * @feature         Support the `toggle` mode
 * @feature          Support the `history` mode
 * @feature         Allows you to save state to restore them on page load
 * @feature         Available trigger: `click`, `mouseover`, `mouseout`, `anchor` and more to come
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html
 * <a href="#my-element">Click me!</a>
 * <div id="my-element">I will be activated on click</a>
 *
 * <a href="#tab1" group="my-tabs">Tab 1</a>
 * <a href="#tab2" group="my-tabs">Tab 1</a>
 * <a href="#tab3" group="my-tabs">Tab 1</a>
 *
 * <div id="tab1">Tab 1 content</div>
 * <div id="tab2">Tab 1 content</div>
 * <div id="tab3">Tab 1 content</div>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SActivateFeature extends __SFeature {
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            componentUtils: {
                interface: __SActivateFeatureInterface,
            },
            feature: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
        // expose the api on node
        this.componentUtils.exposeApi({
            activate: this.activate,
            unactivate: this.unactivate,
            isActive: this.isActive,
        }, this);
    }
    mount() {
        // save state
        if (this.props.saveState) {
            // @ts-ignore
            if (!this.props.id)
                throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
            // @ts-ignore
            if (localStorage.getItem(`s-activate-state-${this.saveStateId}`) ===
                this.props.id) {
                this.props.active = true;
            }
            else {
                this.props.active = false;
            }
        }
        if (this.props.href) {
            this._hrefSelector = this.props.href;
        }
        let targets;
        if (this._hrefSelector)
            targets = Array.from(document.querySelectorAll(this._hrefSelector));
        if (targets === null || targets === void 0 ? void 0 : targets.length)
            this._$targets = targets;
        if (this.props.group) {
            this._$groupElements = Array.from(document.querySelectorAll(`[${this.name}][group="${this.props.group}"]`));
        }
        this.props.trigger.forEach((trigger) => {
            switch (trigger) {
                case 'click':
                    this.node.addEventListener('click', (e) => {
                        if (this.isActive() && this.props.toggle) {
                            this.unactivate();
                        }
                        else {
                            this.activate();
                        }
                    });
                    break;
                case 'mousenter':
                case 'mouseover':
                    this.node.addEventListener('mouseover', (e) => {
                        this.activate();
                    });
                    break;
                case 'mouseout':
                case 'mouseleave':
                    this.node.addEventListener('mouseleave', (e) => {
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
        if (this.props.active) {
            this.activate(true);
        }
    }
    get saveStateId() {
        // @ts-ignore
        return this.props.group ? `group-${this.props.group}` : this.props.id;
    }
    /**
     * @name        isActive
     * @type        Function
     *
     * This method allows you to know if this particular s-activate node is active or not
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    isActive() {
        return this.node.hasAttribute('active');
    }
    /**
     * @name            activate
     * @type            Function
     * @async
     *
     * This async method allows you to activate this particular s-activate node
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    activate(force = false) {
        return __awaiter(this, void 0, void 0, function* () {
            // clear the unactivate timeout
            clearTimeout(this._unactivateTimeout);
            // protect from activating multiple times
            if (!force && this.isActive())
                return;
            setTimeout(() => {
                // save state
                if (this.props.saveState) {
                    // @ts-ignore
                    if (!this.props.id)
                        throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
                    // @ts-ignore
                    localStorage.setItem(`s-activate-state-${this.saveStateId}`, this.props.id);
                }
                // history
                if (this.props.history && this._hrefSelector) {
                    document.location.hash = this._hrefSelector;
                }
                // check if we have some elements in the group
                if (this._$groupElements) {
                    // @ts-ignore
                    this._$groupElements.forEach(($element) => {
                        var _a;
                        if ($element === this.node)
                            return;
                        try {
                            // @ts-ignore
                            (_a = $element.unactivate) === null || _a === void 0 ? void 0 : _a.call($element);
                        }
                        catch (e) { }
                    });
                }
                // add the "active" attribute to the component
                // @ts-ignore
                this.props.active = true;
                // loop on targets to activate them
                if (this._$targets) {
                    // @ts-ignore
                    this._$targets.forEach(($target) => {
                        if (this.props.activeClass) {
                            $target.classList.add(this.props.activeClass);
                        }
                        if (this.props.activeAttribute) {
                            $target.setAttribute(this.props.activeAttribute, 'true');
                        }
                    });
                }
            }, this.props.activateTimeout);
        });
    }
    /**
     * @name            unactivate
     * @type            Function
     * @async
     *
     * This async method allows you to unactivate this particular s-activate node
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    unactivate() {
        return __awaiter(this, void 0, void 0, function* () {
            // protect from unactivating multiple times
            if (!this.isActive())
                return;
            this._unactivateTimeout = setTimeout(() => {
                // save state
                if (this.props.saveState) {
                    if (!this.props.id)
                        throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
                    localStorage.removeItem(`s-activate-state-${this.props.id}`);
                }
                // remove the "active" attribute to the component
                this.node.removeAttribute('active');
                // loop on targets to unactivate them
                if (this._$targets) {
                    // @ts-ignore
                    this._$targets.forEach(($target) => {
                        if (this.props.activeClass) {
                            $target.classList.remove(this.props.activeClass);
                        }
                        if (this.props.activeAttribute) {
                            $target.removeAttribute(this.props.activeAttribute);
                        }
                    });
                }
            }, this.props.unactivateTimeout);
        });
    }
}
export function define(props = {}, name = 's-activate') {
    __SFeature.defineFeature(name, SActivateFeature, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGl2YXRlRmVhdHVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNBY3RpdmF0ZUZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTywyQkFBMkIsTUFBTSx1Q0FBdUMsQ0FBQztBQWFoRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxnQkFBaUIsU0FBUSxVQUFVO0lBTXBELFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxjQUFjLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLDJCQUEyQjthQUN6QztZQUNELE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FDekI7WUFDSSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUMxQixFQUNELElBQUksQ0FDUCxDQUFDO0lBQ04sQ0FBQztJQUNELEtBQUs7UUFDRCxhQUFhO1FBQ2IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUN0QixhQUFhO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDZCxNQUFNLElBQUksS0FBSyxDQUNYLHVKQUF1SixDQUMxSixDQUFDO1lBQ04sYUFBYTtZQUNiLElBQ0ksWUFBWSxDQUFDLE9BQU8sQ0FBQyxvQkFB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