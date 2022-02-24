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
 * @menu            Styleguide / Features               /styleguide/feature/s-activate-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to activate some elements depending on triggers like `click`, `mouseover`, `mouseout`, `anchor`, etc...
 * To be explicit, you can apply this feature on a link tag with the href attribute `#something`, and on click,
 * the DOM element that has the id "something" will get the "active" class applied.
 *
 * @feature          Take the `href` attribute as target
 * @feature          Allows to `group` some element for tabs behavior, etc...
 * @feature         Support the `toggle` mode
 * @feature          Support the `history` mode
 * @feature         Allows you to `save state` to `restore them` on page load
 * @feature         Available trigger: `click`, `mouseover`, `mouseout`, `anchor` and more to come
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html            Simple click activation
 * <a class="s-btn s-color:accent" href="#my-element" s-activate>Click me!</a>
 * <div id="my-element">I will be activated on click</div>
 * <style>
 *    #my-element.active { background: green; }
 * </style>
 *
 * @example         html              Grouping
 * <a href="#my-grouped-element-1" class="s-btn s-color:accent" s-activate group="my-tabs">Tab 1</a>
 * <a href="#my-grouped-element-2" class="s-btn s-color:accent" s-activate group="my-tabs">Tab 1</a>
 * <a href="#my-grouped-element-3" class="s-btn s-color:accent" s-activate group="my-tabs">Tab 1</a>
 * <div id="my-grouped-element-1">Content #1</div>
 * <div id="my-grouped-element-2">Content #2</div>
 * <div id="my-grouped-element-3">Content #3</div>
 * <style>
 *    [id^="my-grouped-element-"].active { background: green; }
 * </style>
 *
 * @example         html            Toggle mode
 * <a class="s-btn s-color:accent" href="#my-element-toggle" s-activate toggle>Click me!</a>
 * <div id="my-element-toggle">I will be toggled on click</div>
 * <style>
 *    #my-element-toggle.active { background: green; }
 * </style>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
        // handle `unactivateOn` events
        if (this.props.unactivateOn) {
            this.props.unactivateOn.forEach((event) => {
                document.body.addEventListener(event, (e) => {
                    this.unactivate();
                });
            });
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGl2YXRlRmVhdHVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNBY3RpdmF0ZUZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTywyQkFBMkIsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRixPQUFPLFFBQVEsTUFBTSx5Q0FBeUMsQ0FBQztBQWUvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9ERztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWlCLFNBQVEsVUFBVTtJQU9wRCxZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osV0FBVyxDQUNQO1lBQ0ksY0FBYyxFQUFFO2dCQUNaLFNBQVMsRUFBRSwyQkFBMkI7YUFDekM7WUFDRCxPQUFPLEVBQUUsRUFBRTtTQUNkLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQ25GO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25DO1FBRUQseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUN6QjtZQUNJLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7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