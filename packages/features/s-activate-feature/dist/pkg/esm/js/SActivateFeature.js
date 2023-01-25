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
import { __deepMerge, __get } from '@coffeekraken/sugar/object';
import __SActivateFeatureInterface from './interface/SActivateFeatureInterface';
import { __getCookie } from '@coffeekraken/sugar/cookie';
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
        this.state = this.utils.handleState(this.state, {
            save: this.props.saveState,
        });
        if (this.props.group) {
            this.utils.handleState(this.groupState, {
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
        this.utils.exposeApi({
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
                if (trigger.match(/^\!?cookie:/)) {
                    const isNegative = trigger.startsWith('!'), cookiePath = trigger.replace(/^\!?cookie:/, ''), cookieName = cookiePath.split('.')[0], cookieDotPath = cookiePath
                        .split('.')
                        .slice(1)
                        .join('.');
                    let cookieValue = __getCookie(cookieName);
                    if (cookieValue && cookieDotPath) {
                        cookieValue = __get(cookieValue, cookieDotPath);
                    }
                    if (isNegative && !cookieValue) {
                        this.activate({
                            preventSave: true,
                        });
                    }
                    else if (!isNegative && cookieValue) {
                        this.activate({
                            preventSave: true,
                        });
                    }
                }
                else if (trigger.match(/^event:/)) {
                    const eventStr = trigger.replace(/^event:/, ''), eventName = eventStr.split(':')[0], listenerElm = eventStr.split(':').pop() === 'document'
                        ? document
                        : this.node;
                    listenerElm.addEventListener(eventName, (e) => {
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
                    const eventStr = what.replace(/^event:/, ''), eventName = eventStr.split(':')[0], listenerElm = eventStr.split(':').pop() === 'document'
                        ? document
                        : this.node;
                    listenerElm.addEventListener(eventName, (e) => {
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
        setTimeout(() => {
            if (this.props.saveState) {
                this._restoreState();
            }
            else if (this.props.active) {
                this.activate();
            }
            else if (this.props.group &&
                this._$groupElements[0] === this.node) {
                this.activate();
            }
        });
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
            const activateFn = () => {
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
                        this.utils.fastdom.mutate(() => {
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
            };
            if (this.props.activateTimeout) {
                setTimeout(activateFn, this.props.activateTimeout);
            }
            else {
                activateFn();
            }
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
            const unActivateFn = () => {
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
            };
            if (this.props.unactivateTimeout) {
                this._unactivateTimeout = setTimeout(unActivateFn, this.props.unactivateTimeout);
            }
            else {
                unActivateFn();
            }
        });
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRixPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sMkJBQTJCLE1BQU0sdUNBQXVDLENBQUM7QUFFaEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXpELE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQW1CaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlERztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWlCLFNBQVEsVUFBVTtJQWNwRCxZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osV0FBVyxDQUNQO1lBQ0ksU0FBUyxFQUFFLDJCQUEyQjtTQUN6QyxFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBcEJOLG9CQUFlLEdBQW1CLEVBQUUsQ0FBQztRQUdyQyxVQUFLLEdBQUc7WUFDSixNQUFNLEVBQUUsU0FBUztTQUNwQixDQUFDO1FBQ0YsZUFBVSxHQUFHO1lBQ1QsUUFBUSxFQUFFLFNBQVM7U0FDdEIsQ0FBQztRQWFFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUM1QyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtB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