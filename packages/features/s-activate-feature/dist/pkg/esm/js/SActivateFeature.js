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
import { __unique } from '@coffeekraken/sugar/array';
import { __expandTemplate, __querySelectorLive } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SActivateFeatureInterface from './interface/SActivateFeatureInterface';
import __define from './define';
/**
 * @name            SActivateFeature
 * @as              Activate feature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SActivateFeatureInterface.ts
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
 * @feature         Expand the HTMLTemplateElement that stands as direct child of the dom feature itself AND of the targets
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @event           s-activate.activate             Dispatched from each targets when they are activated
 * @event           s-activate.unactivate           Dispatched from each targets when they are unactivated
 *
 * @example         html            Simple click activation
 * <a class="s-btn s-color:accent" href="#my-element" s-activate>Click me!</a>
 * <div id="my-element" class="s-radius s-p:30">I will be activated on click</div>
 * <style>
 *    #my-element.active { background: green; }
 * </style>
 *
 * @example         html              Grouping
 * <a href="#my-grouped-element-1" class="s-btn s-color:accent" s-activate active group="my-tabs">Tab 1</a>
 * <a href="#my-grouped-element-2" class="s-btn s-color:accent" s-activate group="my-tabs">Tab 1</a>
 * <a href="#my-grouped-element-3" class="s-btn s-color:accent" s-activate group="my-tabs">Tab 1</a>
 * <div id="my-grouped-element-1" class="s-radius s-p:30">Content #1</div>
 * <div id="my-grouped-element-2" class="s-radius s-p:30">Content #2</div>
 * <div id="my-grouped-element-3" class="s-radius s-p:30">Content #3</div>
 * <style>
 *    [id^="my-grouped-element-"].active { background: green; }
 * </style>
 *
 * @example         html            Toggle mode
 * <a class="s-btn s-color:accent" href="#my-element-toggle" s-activate toggle>Click me!</a>
 * <div id="my-element-toggle" class="s-radius s-p:30">I will be toggled on click</div>
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
            interface: __SActivateFeatureInterface,
        }, settings !== null && settings !== void 0 ? settings : {}));
        this._$groupElements = [];
        this.state = {
            active: undefined,
        };
        this.groupState = {
            activeId: undefined,
        };
        this.state = this.componentUtils.handleState(this.state, {
            save: this.props.saveState,
        });
        if (this.props.group) {
            this.componentUtils.handleState(this.groupState, {
                save: this.props.saveState,
                id: `s-activate-feature-group-${this.props.group}`,
            });
        }
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
        if (this.props.href) {
            this._hrefSelector = this.props.href;
        }
        let targets;
        if (this._hrefSelector)
            targets = Array.from(document.querySelectorAll(this._hrefSelector));
        // targets are the node itself AND the targeted ones through the "href" attribute
        this._$targets = [this.node, ...(targets !== null && targets !== void 0 ? targets : [])];
        if (this.props.group) {
            __querySelectorLive(`[${this.name}][group="${this.props.group}"]`, ($elm) => {
                var _a, _b;
                if ((_a = this._$groupElements) === null || _a === void 0 ? void 0 : _a.includes($elm))
                    return;
                (_b = this._$groupElements) === null || _b === void 0 ? void 0 : _b.push($elm);
            }, {});
        }
        this._$triggerers.forEach(($triggerer) => {
            // @ts-ignore
            const triggererTriggers = $triggerer.hasAttribute('trigger')
                ? $triggerer
                    .getAttribute('trigger')
                    .split(',')
                    .map((l) => l.trim())
                : [];
            const triggers = __unique([
                ...this.props.trigger,
                ...triggererTriggers,
            ]);
            triggers.forEach((trigger) => {
                if (trigger.match(/^event:/)) {
                    this.node.addEventListener('actual', (e) => {
                        this.activate({
                            preventSave: true,
                        });
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
                                if (document.location.hash ===
                                    this._hrefSelector) {
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
            this.props.unactivateOn.forEach((what) => {
                if (what.match(/^event:/)) {
                    document.body.addEventListener(what.replace(/^event:/, ''), (e) => {
                        this.unactivate();
                    });
                }
                else {
                    switch (what) {
                        case 'click':
                            document.addEventListener('click', (e) => {
                                this.unactivate();
                            });
                            break;
                    }
                }
            });
        }
        // restore the state
        if (this.props.saveState) {
            this._restoreState();
        }
        else if (this.props.active) {
            this.activate();
        }
        else if (this.props.group && this._$groupElements[0] === this.node) {
            this.activate();
        }
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
        return this.state.active;
    }
    _restoreState() {
        if (this.groupState.activeId &&
            this.groupState.activeId === this.node.id) {
            return this.activate({
                force: true,
            });
        }
        if (this.groupState.activeId &&
            this.groupState.activeId !== this.node.id) {
            return;
        }
        if (this.state.active) {
            return this.activate({
                force: true,
            });
        }
        if (this.state.active === undefined && this.props.active) {
            return this.activate({
                force: true,
            });
        }
        return this.unactivate({
            force: true,
        });
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
    activate(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalParams = Object.assign({ force: false, preventSave: false }, (params !== null && params !== void 0 ? params : {}));
            // clear the unactivate timeout
            clearTimeout(this._unactivateTimeout);
            // protect from activating multiple times
            if (!finalParams.force && this.isActive())
                return;
            setTimeout(() => {
                // history
                if (this.props.history && this._hrefSelector) {
                    document.location.hash = this._hrefSelector;
                }
                // check if we have some elements in the group
                if (this._$groupElements) {
                    // update the group state
                    this.groupState.activeId = this.node.id;
                    // @ts-ignore
                    this._$groupElements.forEach(($element) => {
                        if ($element === this.node) {
                            return;
                        }
                        // @ts-ignore
                        $element.unactivate();
                    });
                }
                // prevent save
                // if (finalParams.preventSave) {
                //     // @ts-ignore
                //     this.state.preventSave();
                // }
                // add the "active" attribute to the component
                // @ts-ignore
                this.state.active = true;
                this.props.active = true;
                // loop on targets to activate them
                // @ts-ignore
                this._$targets.forEach(($target) => {
                    if (this.props.activeClass) {
                        $target.classList.add(this.props.activeClass);
                    }
                    if (this.props.activeAttribute) {
                        this.componentUtils.fastdom.mutate(() => {
                            $target.setAttribute(this.props.activeAttribute, 'true');
                        });
                    }
                    // handle if a direct child is a template
                    if ($target.children.length) {
                        Array.from($target.children).forEach(($child) => {
                            if ($child instanceof HTMLTemplateElement) {
                                __expandTemplate($child);
                            }
                        });
                    }
                    // activate event
                    this.node.dispatchEvent(new CustomEvent('s-activate.activate', {
                        bubbles: true,
                    }));
                });
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
    unactivate(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalParams = Object.assign({ force: false, preventSave: false }, (params !== null && params !== void 0 ? params : {}));
            // protect from unactivating multiple times
            if (!finalParams.force && !this.isActive())
                return;
            this._unactivateTimeout = setTimeout(() => {
                this.state.active = false;
                this.props.active = false;
                // loop on targets to unactivate them
                // @ts-ignore
                this._$targets.forEach(($target) => {
                    if (this.props.activeClass) {
                        $target.classList.remove(this.props.activeClass);
                    }
                    if (this.props.activeAttribute) {
                        $target.removeAttribute(this.props.activeAttribute);
                    }
                    // unactivate event
                    this.node.dispatchEvent(new CustomEvent('s-activate.unactivate', {
                        bubbles: true,
                    }));
                });
            }, this.props.unactivateTimeout);
        });
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTywyQkFBMkIsTUFBTSx1Q0FBdUMsQ0FBQztBQUVoRixPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFtQmhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5REc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGdCQUFpQixTQUFRLFVBQVU7SUFjcEQsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLFdBQVcsQ0FDUDtZQUNJLFNBQVMsRUFBRSwyQkFBMkI7U0FDekMsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQXBCTixvQkFBZSxHQUFtQixFQUFFLENBQUM7UUFHckMsVUFBSyxHQUFHO1lBQ0osTUFBTSxFQUFFLFNBQVM7U0FDcEIsQ0FBQztRQUNGLGVBQVUsR0FBRztZQUNULFFBQVEsRUFBRSxTQUFTO1NBQ3RCLENBQUM7UUFhRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckQsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztTQUM3QixDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxLQUFL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