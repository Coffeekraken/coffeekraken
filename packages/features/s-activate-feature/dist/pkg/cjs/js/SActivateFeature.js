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
 * @import          import { define as __SActivateFeatureDefine } from '@coffeekraken/s-activate-feature';
 *
 * @snippet         __SActivateFeatureDefine($1)
 *
 * @install         js
 * import { define as __SActivateFeatureDefine } from '@coffeekraken/s-activate-feature';
 * __SActivateFeatureDefine();
 *
 * @install         bash
 * npm i @coffeekraken/s-activate-feature
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
                var _a;
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
                else if (trigger.match(/^scrollspy/)) {
                    let parts = trigger.split(':'), selector = this.props.href, group = (_a = this.props.group) !== null && _a !== void 0 ? _a : 'scrollspy';
                    if (parts.length === 2) {
                        selector = parts[1];
                    }
                    _console.log('parts', parts, selector);
                    const $toSpyElm = document.querySelector(selector);
                    if (!$toSpyElm) {
                        throw new Error(`<red>[SActivate]</red> The s-activate trigger "${trigger}" with the selector "${selector}" does not resolve to any HTMLElement to spy on`);
                    }
                    // spy on the element in the page
                    (0, dom_1.__scrollSpy)($toSpyElm, {
                        group,
                    })
                        .on('activate', () => {
                        if (!this.isActive()) {
                            this.activate();
                        }
                    })
                        .on('unactivate', () => {
                        if (this.isActive()) {
                            this.unactivate();
                        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxxREFBcUQ7QUFDckQsaURBSWlDO0FBQ2pDLHVEQUFnRTtBQUNoRSxzR0FBZ0Y7QUFFaEYsMkRBQXNEO0FBRXRELHVEQUF5RDtBQUV6RCxzREFBZ0M7QUF3aUJYLGlCQXhpQmQsZ0JBQVEsQ0F3aUJZO0FBcmhCM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0VHO0FBQ0gsTUFBcUIsZ0JBQWlCLFNBQVEsbUJBQVU7SUFjcEQsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUEsb0JBQVcsRUFDUDtZQUNJLFNBQVMsRUFBRSxtQ0FBMkI7U0FDekMsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQXBCTixvQkFBZSxHQUFtQixFQUFFLENBQUM7UUFHckMsVUFBSyxHQUFHO1lBQ0osTUFBTSxFQUFFLFNBQVM7U0FDcEIsQ0FBQztRQUNGLGVBQVUsR0FBRztZQUNULFFBQVEsRUFBRSxTQUFTO1NBQ3RCLENBQUM7UUFhRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDNUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztTQUM3QixDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BDLElBQUksRUFBRSxJQUFJLENBQUMs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