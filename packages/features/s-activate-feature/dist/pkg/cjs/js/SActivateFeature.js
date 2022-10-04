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
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
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
        if (targets === null || targets === void 0 ? void 0 : targets.length)
            this._$targets = targets;
        else
            this._$targets = [this.node];
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
                            $triggerer.addEventListener('pointerup', (e) => {
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
                if (finalParams.preventSave) {
                    // @ts-ignore
                    this.state.preventSave();
                }
                // add the "active" attribute to the component
                // @ts-ignore
                this.state.active = true;
                this.props.active = true;
                // add the "active" class
                this.node.classList.add(this.props.activeClass);
                // loop on targets to activate them
                if (this._$targets) {
                    // @ts-ignore
                    this._$targets.forEach(($target) => {
                        console.log('ac', $target);
                        if (this.props.activeClass) {
                            $target.classList.add(this.props.activeClass);
                        }
                        if (this.props.activeAttribute) {
                            this.componentUtils.fastdom.mutate(() => {
                                $target.setAttribute(this.props.activeAttribute, 'true');
                            });
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
    unactivate(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalParams = Object.assign({ force: false, preventSave: false }, (params !== null && params !== void 0 ? params : {}));
            // protect from unactivating multiple times
            if (!finalParams.force && !this.isActive())
                return;
            this._unactivateTimeout = setTimeout(() => {
                this.state.active = false;
                this.props.active = false;
                // add the "active" class
                this.node.classList.remove(this.props.activeClass);
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
exports.default = SActivateFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxxREFBcUQ7QUFDckQsaURBQThEO0FBQzlELHVEQUF5RDtBQUN6RCxzR0FBZ0Y7QUFFaEYsc0RBQWdDO0FBb2FYLGlCQXBhZCxnQkFBUSxDQW9hWTtBQWpaM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcURHO0FBQ0gsTUFBcUIsZ0JBQWlCLFNBQVEsbUJBQVU7SUFjcEQsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUEsb0JBQVcsRUFDUDtZQUNJLFNBQVMsRUFBRSxtQ0FBMkI7U0FDekMsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQXBCTixvQkFBZSxHQUFtQixFQUFFLENBQUM7UUFHckMsVUFBSyxHQUFHO1lBQ0osTUFBTSxFQUFFLFNBQVM7U0FDcEIsQ0FBQztRQUNGLGVBQVUsR0FBRztZQUNULFFBQVEsRUFBRSxTQUFTO1NBQ3RCLENBQUM7UUFhRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckQsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztTQUM3QixDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQzdDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7Z0JBQzFCLEVBQUUsRUFBRSw0QkFBNEIsSUFBSSxD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