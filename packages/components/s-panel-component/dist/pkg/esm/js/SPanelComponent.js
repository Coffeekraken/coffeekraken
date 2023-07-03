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
import { __getTransitionProperties, __querySelectorLive, } from '@coffeekraken/sugar/dom';
import { __escapeQueue } from '@coffeekraken/sugar/keyboard';
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
 * @import          import { define as __SPanelComponentDefine } from '@coffeekraken/s-panel-component';
 *
 * @snippet         __SPanelComponentDefine($1)
 *
 * @install          bash
 * npm i @coffeekraken/s-panel-component
 *
 * @install         js
 * import { __define as __SPanelComponentDefine } from '@coffeekraken/s-panel-component';
 * __SPanelComponentDefine();
 *
 * @example         html        Simple top panel
 * <s-panel position="top" id="simple-top-panel-open" backdrop>
 *  <template>
 *      <div class="s-p:50">
 *          <h1 class="s-typo:h1 s-mbe:30">Hello world</h1>
 *          <p class="s-typo:p s-mbe:30">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet lectus magna. Ut vehicula eros a sapien egestas, sed ultricies orci lacinia. In hac habitasse platea dictumst. Nulla metus elit, mollis at ante id, varius faucibus nulla. Praesent aliquam justo vel justo accumsan, non dictum lorem porta. Donec varius magna id semper pulvinar. Nunc ultrices pellentesque mollis. Mauris vestibulum justo in facilisis tempor. Nunc gravida dictum ex ut condimentum. Aenean sagittis dignissim semper.</p>
 *          <button class="s-btn s-color:accent s-mie:10" s-panel-close="simple-top-panel-open">Close panel</button> or click outside or use the escape key...
 *      </div>
 *  </template>
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
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SPanelComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
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
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // make sure it's in the body
            if (this.parentElement !== document.body) {
                document.body.appendChild(this);
            }
            // handle active state at start
            if (this.props.active) {
                this.constructor._activePanels.push(this);
            }
            const $tpl = this.querySelector('template');
            if ($tpl) {
                this._template = $tpl.content;
                $tpl.remove();
            }
            else {
                this._template = document.createElement('div');
                Array.from(this.children).forEach(($child) => {
                    this._template.appendChild($child);
                });
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
        this._$container = this.querySelector(`.${this.utils.uCls('_container')}`);
        this._$backdrop = this.querySelector(`.${this.utils.uCls('_backdrop')}`);
        this._containerTransitionProps = __getTransitionProperties(this._$container);
        if (this._$backdrop) {
            this._backdropTransitionProps = __getTransitionProperties(this._$backdrop);
        }
        // closeOn property
        this.props.closeOn.forEach((what) => {
            if (what === 'click') {
                this.addEventListener('click', (e) => {
                    if (!this._$container.contains(e.target) &&
                        this.isTopPanel()) {
                        this.close();
                    }
                });
            }
            else if (what.match(/^event\:/)) {
                const eventStr = what.replace(/^event:/, ''), eventName = eventStr.split(':')[0], listenerElm = eventStr.split(':').pop() === 'document'
                    ? document
                    : this;
                listenerElm.addEventListener(eventName, (e) => {
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
        // escape
        this._escapeQueue = __escapeQueue(() => {
            this.close();
        });
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
            this.utils.dispatchEvent('open');
        });
    }
    // s-activate support
    activate() {
        return this.open();
    }
    close() {
        var _a, _b, _c;
        if (!this.props.active)
            return;
        (_a = this._escapeQueue) === null || _a === void 0 ? void 0 : _a.cancel();
        const stackIdx = this.constructor._activePanels.indexOf(this);
        if (stackIdx !== -1) {
            delete this.constructor._activePanels[stackIdx];
        }
        this.props.active = false;
        this.requestUpdate();
        // dispatch a close event
        this.utils.dispatchEvent('close');
        let duration = 0;
        if (this._containerTransitionProps.totalDuration > duration)
            duration = this._containerTransitionProps.totalDuration;
        if (((_b = this._backdropTransitionProps) === null || _b === void 0 ? void 0 : _b.totalDuration) > duration)
            duration = (_c = this._backdropTransitionProps) === null || _c === void 0 ? void 0 : _c.totalDuration;
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
                class="${this.utils.cls('_root')} ${this.utils.cls(`--${this.props.position}`)}"
            >
                ${this.props.backdrop
            ? html ` <div class="${this.utils.cls('_backdrop')}"></div> `
            : ''}
                <div class="${this.utils.cls('_container')}">
                    ${(_a = this._template) !== null && _a !== void 0 ? _a : ''}
                </div>
            </div>
        `;
    }
}
SPanelComponent._activePanels = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQ0gseUJBQXlCLEVBQ3pCLG1CQUFtQixHQUN0QixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sMEJBQTBCLE1BQU0sc0NBQXNDLENBQUM7QUFFOUUsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLGlDQUFpQyxDQUFDLENBQUMsK0JBQStCO0FBVXBGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4SEc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsZUFBZTtJQUd4RCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLDBCQUEwQixDQUM3QixDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUMsS0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBVUQ7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLFNBQVM7WUFDZixTQUFTLEVBQUUsMEJBQTBCO1NBQ3hDLENBQUMsQ0FDTCxDQUFDO1FBRUYsOENB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