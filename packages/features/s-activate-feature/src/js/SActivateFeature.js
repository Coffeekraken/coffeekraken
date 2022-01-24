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
import __unique from '@coffeekraken/sugar/shared/array/unique';
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
        if (this.props.triggerer) {
            this._$triggerers = Array.from(document.querySelectorAll(this.props.triggerer));
        }
        else {
            this._$triggerers = [this.node];
        }
        // expose the api on node
        this.componentUtils.exposeApi({
            activate: this.activate,
            unactivate: this.unactivate,
            isActive: this.isActive,
        }, this);
    }
    mount() {
        // restore the state
        this._restoreState();
        if (this.props.href) {
            this._hrefSelector = this.props.href;
        }
        let targets;
        if (this._hrefSelector)
            targets = Array.from(document.querySelectorAll(this._hrefSelector));
        if (targets === null || targets === void 0 ? void 0 : targets.length)
            this._$targets = targets;
        else
            this._$targets = [this.node];
        if (this.props.group) {
            this._$groupElements = Array.from(document.querySelectorAll(`[${this.name}][group="${this.props.group}"]`));
        }
        this._$triggerers.forEach($triggerer => {
            // @ts-ignore
            const triggererTriggers = $triggerer.hasAttribute('trigger') ? $triggerer.getAttribute('trigger').split(',').map(l => l.trim()) : [];
            const triggers = __unique([...this.props.trigger, ...triggererTriggers]);
            triggers.forEach((trigger) => {
                if (trigger.match(/^event:/)) {
                    this.node.addEventListener('actual', (e) => {
                        this.activate();
                    });
                }
                else {
                    switch (trigger) {
                        case 'click':
                            $triggerer.addEventListener('click', (e) => {
                                // only direct child(s) of the triggerer can trigger the activation
                                if (e.target !== $triggerer) {
                                    // @ts-ignore
                                    if (e.target.parentElement !== $triggerer)
                                        return;
                                    if (e.currentTarget !== $triggerer)
                                        return;
                                }
                                e.preventDefault();
                                e.stopPropagation();
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
                            $triggerer.addEventListener('mouseover', (e) => {
                                this.activate();
                            });
                            break;
                        case 'mouseout':
                        case 'mouseleave':
                            $triggerer.addEventListener('mouseleave', (e) => {
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
                }
            });
        });
        // activate if has the "active" attribute
        // if (this.props.active) {
        //     this.activate(true);
        // }
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
    _restoreState() {
        var _a;
        // save state
        if (this.props.saveState) {
            // @ts-ignore
            if (!this.props.id)
                throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
            // @ts-ignore
            if (this.props.group) {
                const groupState = JSON.parse((_a = localStorage.getItem(`s-activate-group-state-${this.props.group}`)) !== null && _a !== void 0 ? _a : '{}');
                if (groupState.activeId === this.props.id) {
                    this.activate(true);
                }
                else if (!groupState.activeId && this.props.active) {
                    this.activate(true);
                }
            }
            else if (localStorage.getItem(`s-activate-state-${this.saveStateId}`) ===
                this.props.id) {
                this.activate(true);
            }
            else {
                // this.props.active = false;
            }
        }
    }
    _saveState() {
        // save state
        if (this.props.saveState) {
            // @ts-ignore
            if (!this.props.id)
                throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
            // @ts-ignore
            if (this.props.group) {
                localStorage.setItem(`s-activate-group-state-${this.props.group}`, JSON.stringify({
                    activeId: this.props.id,
                }));
            }
            else {
                localStorage.setItem(`s-activate-state-${this.saveStateId}`, this.props.id);
            }
        }
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
                this._saveState();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGl2YXRlRmVhdHVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNBY3RpdmF0ZUZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTywyQkFBMkIsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRixPQUFPLFFBQVEsTUFBTSx5Q0FBeUMsQ0FBQztBQWMvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxnQkFBaUIsU0FBUSxVQUFVO0lBT3BELFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxjQUFjLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLDJCQUEyQjthQUN6QztZQUNELE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDbkY7YUFBTTtZQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7UUFFRCx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ3pCO1lBQ0ksUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixRQUFRLEVB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