// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import __getTransitionProperties from '@coffeekraken/sugar/js/dom/style/getTransitionProperties';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { css, html, unsafeCSS } from 'lit';
import __SPanelComponentInterface from './interface/SPanelComponentInterface';
// @ts-ignore
import __css from '../../../../src/css/s-panel.css'; // relative to /dist/pkg/esm/js
/**
 * @name                SPanelComponent
 * @as                Panel (modal)
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SPanelComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-panel
 * @platform            html
 * @status              beta
 *
 * This component specify a panel that can be opened and closed with positions like "top", "right", "bottom", "left" or "modal".
 * It has multiple systems to open and close panels depending on your needs and can be programatically manipulated.
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @feature         Exteremely customizable
 * @feature         Support multiple positions like "top", "right", "bottom", "left" or "modal"
 * @feature         Easy system to open the modal you want directly from a button, etc...
 * @feature         Set an id on your modal and use the "s-panel-open" and "s-panel-close" attribute on any HTMLElement to open/close it
 * @feature         Dispatch some events when the panel is opened or closed
 *
 * @event       s-panel.open          Dispatched when the panel is opened
 * @event       s-panel.close         Dispatched when the panel is closed
 *
 * @install          bash
 * npm i @coffeekraken/s-panel-component
 *
 * @install         js
 * import { define } from '@coffeekraken/s-panel-component';
 * define();
 *
 * @example         html        Simple top panel
 * <s-panel position="top" id="simple-top-panel-open" backdrop>
 *  <div class="s-p:50">
 *      <h1 class="s-typo:h1 s-mbe:30">Hello world</h1>
 *      <p class="s-typo:p s-mbe:30">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet lectus magna. Ut vehicula eros a sapien egestas, sed ultricies orci lacinia. In hac habitasse platea dictumst. Nulla metus elit, mollis at ante id, varius faucibus nulla. Praesent aliquam justo vel justo accumsan, non dictum lorem porta. Donec varius magna id semper pulvinar. Nunc ultrices pellentesque mollis. Mauris vestibulum justo in facilisis tempor. Nunc gravida dictum ex ut condimentum. Aenean sagittis dignissim semper.</p>
 *      <button class="s-btn s-color:accent s-mie:10" s-panel-close="simple-top-panel-open">Close panel</button> or click outside or use the escape key...
 *  </div>
 * </s-panel>
 * <button class="s-btn s-color:complementary" s-panel-open="simple-top-panel-open">Open top panel</button>
 *
 * @example         html        Simple right panel
 * <s-panel position="right" id="simple-right-panel-open" backdrop>
 *  <div class="s-p:50">
 *      <h1 class="s-typo:h1 s-mbe:30">Hello world</h1>
 *      <p class="s-typo:p s-mbe:30">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet lectus magna. Ut vehicula eros a sapien egestas, sed ultricies orci lacinia. In hac habitasse platea dictumst. Nulla metus elit, mollis at ante id, varius faucibus nulla. Praesent aliquam justo vel justo accumsan, non dictum lorem porta. Donec varius magna id semper pulvinar. Nunc ultrices pellentesque mollis. Mauris vestibulum justo in facilisis tempor. Nunc gravida dictum ex ut condimentum. Aenean sagittis dignissim semper.</p>
 *      <button class="s-btn s-color:accent s-mie:10" s-panel-close="simple-right-panel-open">Close panel</button> or click outside or use the escape key...
 *  </div>
 * </s-panel>
 * <button class="s-btn s-color:complementary" s-panel-open="simple-right-panel-open">Open right panel</button>
 *
 * @example         html        Simple bottom panel
 * <s-panel position="bottom" id="simple-bottom-panel-open" backdrop>
 *  <div class="s-p:50">
 *      <h1 class="s-typo:h1 s-mbe:30">Hello world</h1>
 *      <p class="s-typo:p s-mbe:30">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet lectus magna. Ut vehicula eros a sapien egestas, sed ultricies orci lacinia. In hac habitasse platea dictumst. Nulla metus elit, mollis at ante id, varius faucibus nulla. Praesent aliquam justo vel justo accumsan, non dictum lorem porta. Donec varius magna id semper pulvinar. Nunc ultrices pellentesque mollis. Mauris vestibulum justo in facilisis tempor. Nunc gravida dictum ex ut condimentum. Aenean sagittis dignissim semper.</p>
 *      <button class="s-btn s-color:accent s-mie:10" s-panel-close="simple-bottom-panel-open">Close panel</button> or click outside or use the escape key...
 *  </div>
 * </s-panel>
 * <button class="s-btn s-color:complementary" s-panel-open="simple-bottom-panel-open">Open bottom panel</button>
 *
 * @example         html        Simple left panel
 * <s-panel position="left" id="simple-left-panel-open" backdrop>
 *  <div class="s-p:50">
 *      <h1 class="s-typo:h1 s-mbe:30">Hello world</h1>
 *      <p class="s-typo:p s-mbe:30">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet lectus magna. Ut vehicula eros a sapien egestas, sed ultricies orci lacinia. In hac habitasse platea dictumst. Nulla metus elit, mollis at ante id, varius faucibus nulla. Praesent aliquam justo vel justo accumsan, non dictum lorem porta. Donec varius magna id semper pulvinar. Nunc ultrices pellentesque mollis. Mauris vestibulum justo in facilisis tempor. Nunc gravida dictum ex ut condimentum. Aenean sagittis dignissim semper.</p>
 *      <button class="s-btn s-color:accent s-mie:10" s-panel-close="simple-left-panel-open">Close panel</button> or click outside or use the escape key...
 *  </div>
 * </s-panel>
 * <button class="s-btn s-color:complementary" s-panel-open="simple-left-panel-open">Open left panel</button>
 *
 * @example         html        Simple modal panel
 * <s-panel position="modal" id="simple-modal-panel-open" backdrop>
 *  <div class="s-p:50">
 *      <h1 class="s-typo:h1 s-mbe:30">Hello world</h1>
 *      <p class="s-typo:p s-mbe:30">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet lectus magna. Ut vehicula eros a sapien egestas, sed ultricies orci lacinia. In hac habitasse platea dictumst. Nulla metus elit, mollis at ante id, varius faucibus nulla. Praesent aliquam justo vel justo accumsan, non dictum lorem porta. Donec varius magna id semper pulvinar. Nunc ultrices pellentesque mollis. Mauris vestibulum justo in facilisis tempor. Nunc gravida dictum ex ut condimentum. Aenean sagittis dignissim semper.</p>
 *      <button class="s-btn s-color:accent s-mie:10" s-panel-close="simple-modal-panel-open">Close panel</button> or click outside or use the escape key...
 *  </div>
 * </s-panel>
 * <button class="s-btn s-color:complementary" s-panel-open="simple-modal-panel-open">Open modal panel</button>
 *
 * @example         html        Modal panel closable only with button
 * <s-panel position="modal" id="simple-modal-panel-open-button" backdrop close-on="">
 *  <div class="s-p:50">
 *      <h1 class="s-typo:h1 s-mbe:30">Hello world</h1>
 *      <p class="s-typo:p s-mbe:30">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet lectus magna. Ut vehicula eros a sapien egestas, sed ultricies orci lacinia. In hac habitasse platea dictumst. Nulla metus elit, mollis at ante id, varius faucibus nulla. Praesent aliquam justo vel justo accumsan, non dictum lorem porta. Donec varius magna id semper pulvinar. Nunc ultrices pellentesque mollis. Mauris vestibulum justo in facilisis tempor. Nunc gravida dictum ex ut condimentum. Aenean sagittis dignissim semper.</p>
 *      <button class="s-btn s-color:accent s-mie:10" s-panel-close="simple-modal-panel-open-button">Close panel</button>
 *  </div>
 * </s-panel>
 * <button class="s-btn s-color:complementary" s-panel-open="simple-modal-panel-open-button">Open modal panel cloable by button</button>
 *
 * @example         html        Modal panel closable on event
 * <s-panel position="modal" id="simple-modal-panel-open-event" backdrop close-on="event:submit">
 *  <div class="s-p:50" style="width: 400px">
 *      <h1 class="s-typo:h3">Login</h1>
 *      <form>
 *          <label class="s-label:float s-color:accent s-mbs:30" s-form-validate>
 *              <input class="s-input" type="text" placeholder="John" required />
 *              <span>Firstname</span>
 *          </label>
 *          <label class="s-label:float s-color:accent s-mbs:30" s-form-validate>
 *              <input class="s-input" type="text" placeholder="Doe" required />
 *              <span>Lastname</span>
 *          </label>
 *          <div class="s-flex:align-center s-mbs:30">
 *              <span class="s-flex-item:grow">
 *                  <a href="#" class="s-typo:a">Forgot password?</a>
 *              </span>
 *              <input type="submit" class="s-btn s-color:accent" value="Submit" />
 *         </div>
 *     </form>
 *  </div>
 * </s-panel>
 * <button class="s-btn s-color:complementary" s-panel-open="simple-modal-panel-open-event">Open fake login modal</button>
 *
 * @since           2.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SPanel extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            name: 's-panel',
            interface: __SPanelComponentInterface,
        }));
        // remove all existing panels with the same id
        if (this.id) {
            const $panels = document.querySelectorAll(`s-panel#${this.id}`);
            $panels.forEach(($panel) => $panel !== this && $panel.remove());
        }
        // get the initial nodes inside the panel tag
        this._$nodes = Array.from(this.children);
    }
    static get properties() {
        return __SLitComponent.createProperties({}, __SPanelComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // handle active state at start
            if (this.props.active) {
                this.constructor._activePanels.push(this);
            }
        });
    }
    isTopPanel() {
        const stackIdx = this.constructor._activePanels.indexOf(this);
        return stackIdx === this.constructor._activePanels.length - 1;
    }
    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'active') {
                if (this.props.active) {
                    this.open();
                }
                else {
                    this.close();
                }
            }
        });
    }
    firstUpdated() {
        this._$container = this.querySelector(`.${this.componentUtils.className('__container')}`);
        this._$backdrop = this.querySelector(`.${this.componentUtils.className('__backdrop')}`);
        this._$nodes.forEach(($node) => {
            var _a;
            (_a = this._$container) === null || _a === void 0 ? void 0 : _a.appendChild($node);
        });
        this._containerTransitionProps = __getTransitionProperties(this._$container);
        if (this._$backdrop) {
            this._backdropTransitionProps = __getTransitionProperties(this._$backdrop);
        }
        // closeOn property
        this.props.closeOn.forEach((what) => {
            if (what === 'click') {
                this.addEventListener('click', (e) => {
                    !this._$container.contains(e.target) &&
                        this.isTopPanel() &&
                        this.close();
                });
            }
            else if (what === 'escape') {
                __hotkey('escape').on('press', () => {
                    this.isTopPanel() && this.close();
                });
            }
            else if (what.match(/^event\:/)) {
                const event = what.split(':').pop();
                this.addEventListener(event, (e) => {
                    this.close();
                });
            }
        });
        // open attribute
        if (this.id) {
            const $panels = document.querySelectorAll(`s-panel#${this.id}`);
            if ($panels.length > 1) {
                throw new Error(`[s-panel] Be careful. You have multiple panels with the same "${this.id}" id...`);
            }
            __querySelectorLive(`[href="#${this.id}"]`, ($elm) => {
                $elm.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.open();
                });
            }, {});
            __querySelectorLive(`[s-panel-open="${this.id}"]`, ($elm) => {
                $elm.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.open();
                });
            }, {});
            __querySelectorLive(`[s-panel-close="${this.id}"]`, ($elm) => {
                $elm.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.close();
                });
            }, {});
        }
        if (this.props.triggerer) {
            __querySelectorLive(this.props.triggerer, ($triggerer) => {
                $triggerer.addEventListener('click', (e) => {
                    this.open();
                });
            });
        }
    }
    open() {
        if (this.props.active)
            return;
        // create a ghost div to replace the panel after it's closed
        if (!this._$ghost) {
            this._$ghost = document.createElement('div');
            this._$ghost.setAttribute('s-panel-ghost', 'true');
            this.parentNode.insertBefore(this._$ghost, this);
        }
        // put the panel in the body
        if (this.parentNode !== document.body) {
            document.body.appendChild(this);
        }
        if (!this.constructor._activePanels.includes(this)) {
            this.constructor._activePanels.push(this);
        }
        setTimeout(() => {
            this.props.active = true;
            this.requestUpdate();
            // dispatch an open event
            this.componentUtils.dispatchEvent('open');
        });
    }
    // s-activate support
    activate() {
        return this.open();
    }
    close() {
        var _a, _b;
        if (!this.props.active)
            return;
        const stackIdx = this.constructor._activePanels.indexOf(this);
        if (stackIdx !== -1) {
            delete this.constructor._activePanels[stackIdx];
        }
        this.props.active = false;
        this.requestUpdate();
        // dispatch a close event
        this.componentUtils.dispatchEvent('close');
        let duration = 0;
        if (this._containerTransitionProps.totalDuration > duration)
            duration = this._containerTransitionProps.totalDuration;
        if (((_a = this._backdropTransitionProps) === null || _a === void 0 ? void 0 : _a.totalDuration) > duration)
            duration = (_b = this._backdropTransitionProps) === null || _b === void 0 ? void 0 : _b.totalDuration;
        setTimeout(() => {
            if (!this._$ghost)
                return;
            this._$ghost.parentNode.insertBefore(this, this._$ghost);
        }, duration);
    }
    // s-activate support
    unactivate() {
        return this.close();
    }
    render() {
        return html `
            <div
                class="${this.componentUtils.className('__root')} ${this.componentUtils.className(`--${this.props.position}`)}"
            >
                ${this.props.backdrop
            ? html `
                          <div
                              class="${this.componentUtils.className('__backdrop')}"
                          ></div>
                      `
            : ''}
                <div
                    class="${this.componentUtils.className('__container')}"
                ></div>
            </div>
        `;
    }
}
SPanel._activePanels = [];
export function define(props = {}, tagName = 's-panel') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SPanel);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLHlCQUF5QixNQUFNLDBEQUEwRCxDQUFDO0FBQ2pHLE9BQU8sUUFBUSxNQUFNLHdDQUF3QyxDQUFDO0FBQzlELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLDBCQUEwQixNQUFNLHNDQUFzQyxDQUFDO0FBRTlFLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSxpQ0FBaUMsQ0FBQyxDQUFDLCtCQUErQjtBQVVwRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0hHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsZUFBZTtJQW1CL0M7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLFNBQVM7WUFDZixTQUFTLEVBQUUsMEJBQTBCO1NBQ3hDLENBQUMsQ0FDTCxDQUFDO1FBRUYsOENBQThDO1FBQzlDLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNULE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2hFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUks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