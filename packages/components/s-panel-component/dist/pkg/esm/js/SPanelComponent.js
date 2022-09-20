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
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import { __deepMerge } from '@coffeekraken/sugar/object';
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
export default class SPanelComponent extends __SLitComponent {
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
        // this._$nodes = Array.from(this.children);
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
            const $tpl = this.querySelector('template');
            if ($tpl) {
                this._template = $tpl.content;
                // $tpl.remove();
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
        this._$container = this.querySelector(`.${this.componentUtils.uniqueClassName('__container')}`);
        this._$backdrop = this.querySelector(`.${this.componentUtils.uniqueClassName('__backdrop')}`);
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
        var _a;
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
                <div class="${this.componentUtils.className('__container')}">
                    ${(_a = this._template) !== null && _a !== void 0 ? _a : ''}
                </div>
            </div>
        `;
    }
}
SPanelComponent._activePanels = [];
export function define(props = {}, tagName = 's-panel') {
    __SLitComponent.define(tagName, SPanelComponent, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLHlCQUF5QixNQUFNLDBEQUEwRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sMEJBQTBCLE1BQU0sc0NBQXNDLENBQUM7QUFFOUUsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLGlDQUFpQyxDQUFDLENBQUMsK0JBQStCO0FBVXBGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3SEc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsZUFBZTtJQW9CeEQ7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLFNBQVM7WUFDZixTQUFTLEVBQUUsMEJBQTBCO1NBQ3hDLENBQUMsQ0FDTCxDQUFDO1FBRUYsOENBQThDO1FBQzlDLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNULE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2hFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFD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