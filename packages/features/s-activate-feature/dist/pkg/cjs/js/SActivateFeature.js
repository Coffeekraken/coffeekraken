"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const array_1 = require("@coffeekraken/sugar/array");
const dom_1 = require("@coffeekraken/sugar/dom");
const object_1 = require("@coffeekraken/sugar/object");
const SActivateFeatureInterface_1 = __importDefault(require("./interface/SActivateFeatureInterface"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
const cookie_1 = require("@coffeekraken/sugar/cookie");
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
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
class SActivateFeature extends s_feature_1.default {
    constructor(name, node, settings) {
        super(name, node, (0, object_1.__deepMerge)({
            interface: SActivateFeatureInterface_1.default,
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
            (0, dom_1.__querySelectorLive)(`[${this.name}][group="${this.props.group}"]`, ($elm) => {
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
            const triggers = (0, array_1.__unique)([
                ...this.props.trigger,
                ...triggererTriggers,
            ]);
            triggers.forEach((trigger) => {
                if (trigger.match(/^\!?cookie:/)) {
                    const isNegative = trigger.startsWith('!'), cookiePath = trigger.replace(/^\!?cookie:/, ''), cookieName = cookiePath.split('.')[0], cookieDotPath = cookiePath
                        .split('.')
                        .slice(1)
                        .join('.');
                    let cookieValue = (0, cookie_1.__getCookie)(cookieName);
                    if (cookieValue && cookieDotPath) {
                        cookieValue = (0, object_1.__get)(cookieValue, cookieDotPath);
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
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            if (this.props.saveState) {
                this._restoreState();
            }
            else if (this.props.active) {
                this.activate();
            }
            else if (this.props.group &&
                this._$groupElements[0] === this.node) {
                // wait until the potential others group elements
                // are mounted
                yield (0, datetime_1.__wait)();
                // check if another element of the group
                // is activate
                let hasActiveElementInGroup = false;
                for (let i = 0; i < this._$groupElements.length; i++) {
                    const $elm = this._$groupElements[i];
                    // @ts-ignore
                    if ($elm.isActive()) {
                        hasActiveElementInGroup = true;
                        break;
                    }
                }
                // if no other element are activated
                // activate the first one (this)
                if (!hasActiveElementInGroup) {
                    this.activate();
                }
            }
        }));
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
                                (0, dom_1.__expandTemplate)($child);
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
exports.default = SActivateFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxxREFBcUQ7QUFDckQsaURBQWdGO0FBQ2hGLHVEQUFnRTtBQUNoRSxzR0FBZ0Y7QUFFaEYsMkRBQXNEO0FBRXRELHVEQUF5RDtBQUV6RCxzREFBZ0M7QUE0ZlgsaUJBNWZkLGdCQUFRLENBNGZZO0FBemUzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeURHO0FBQ0gsTUFBcUIsZ0JBQWlCLFNBQVEsbUJBQVU7SUFjcEQsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUEsb0JBQVcsRUFDUDtZQUNJLFNBQVMsRUFBRSxtQ0FBMkI7U0FDekMsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQXBCTixvQkFBZSxHQUFtQixFQUFFLENBQUM7UUFHckMsVUFBSyxHQUFHO1lBQ0osTUFBTSxFQUFFLFNBQVM7U0FDcEIsQ0FBQztRQUNGLGVBQVUsR0FBRztZQUNULFFBQVEsRUFBRSxTQUFTO1NBQ3RCLENBQUM7UUFhRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDNUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztTQUM3QixDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7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