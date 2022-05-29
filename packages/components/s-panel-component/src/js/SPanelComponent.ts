// @ts-nocheck

import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import __SPanelComponentInterface from './interface/SPanelComponentInterface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
import __getTransitionProperties from '@coffeekraken/sugar/js/dom/style/getTransitionProperties';

// @ts-ignore
import __css from '../../../../src/css/s-panel.css'; // relative to /dist/pkg/esm/js

export interface SPanelComponentProps {
    position: 'top' | 'left' | 'bottom' | 'right' | 'modal';
    active: boolean;
    backdrop: boolean;
    triggerer: string;
    closeOn: ('click' | 'escape')[];
}

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
 * @event       panel.open          Dispatched when the panel is opened
 * @event       panel.close         Dispatched when the panel is closed
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
    static _activePanels: SPanel[] = [];

    static get properties() {
        return __SLitComponent.properties({}, __SPanelComponentInterface);
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    @property()
    backdrop;

    _$nodes;
    _$container;
    _containerTransitionProps;
    _$backdrop;
    _backdropTransitionProps;

    constructor() {
        super(
            __deepMerge({
                litComponent: {
                    shadowDom: false,
                },
                componentUtils: {
                    interface: __SPanelComponentInterface,
                },
            }),
        );

        // remove all existing panels with the same id
        if (this.id) {
            const $panels = document.querySelectorAll(`s-panel#${this.id}`);
            $panels.forEach(($panel) => $panel !== this && $panel.remove());
        }

        // make sure the panel is in the body tag
        // if (this.parentNode !== document.body) {
        //     // document.body.appendChild(this);
        // }

        // get the initial nodes inside the panel tag
        this._$nodes = Array.from(this.children);

        // handle active state at start
        if (this.props.active) {
            this.constructor._activePanels.push(this);
        }
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
                } else {
                    this.close();
                }
            }
        });
    }
    firstUpdated() {
        this._$container = this.querySelector(
            `.${this.componentUtils.className('__container')}`,
        );
        this._$backdrop = this.querySelector(
            `.${this.componentUtils.className('__backdrop')}`,
        );
        this._$nodes.forEach(($node) => {
            this._$container?.appendChild($node);
        });

        this._containerTransitionProps = __getTransitionProperties(
            this._$container,
        );
        if (this._$backdrop) {
            this._backdropTransitionProps = __getTransitionProperties(
                this._$backdrop,
            );
        }

        // closeOn property
        this.props.closeOn.forEach((what) => {
            if (what === 'click') {
                this.addEventListener('click', (e) => {
                    !this._$container.contains(e.target) &&
                        this.isTopPanel() &&
                        this.close();
                });
            } else if (what === 'escape') {
                __hotkey('escape').on('press', () => {
                    this.isTopPanel() && this.close();
                });
            } else if (what.match(/^event\:/)) {
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
                throw new Error(
                    `[s-panel] Be careful. You have multiple panels with the same "${this.id}" id...`,
                );
            }

            __querySelectorLive(
                `[s-panel-open="${this.id}"]`,
                ($elm) => {
                    $elm.addEventListener('click', (e) => {
                        this.open();
                    });
                },
                {},
            );
            __querySelectorLive(
                `[s-panel-close="${this.id}"]`,
                ($elm) => {
                    $elm.addEventListener('click', (e) => {
                        this.close();
                    });
                },
                {},
            );
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
        if (this.props.active) return;

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
        if (!this.props.active) return;

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
        if (this._backdropTransitionProps?.totalDuration > duration)
            duration = this._backdropTransitionProps?.totalDuration;

        setTimeout(() => {
            if (!this._$ghost) return;
            this._$ghost.parentNode.insertBefore(this, this._$ghost);
        }, duration);
    }
    // s-activate support
    unactivate() {
        return this.close();
    }
    render() {
        return html`
            <div
                class="${this.componentUtils.className(
                    '',
                )} ${this.componentUtils.className(`--${this.props.position}`)}"
            >
                ${this.props.backdrop
                    ? html`
                          <div
                              class="${this.componentUtils.className(
                                  '__backdrop',
                              )}"
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

export function define(
    props: Partial<SPanelComponentProps> = {},
    tagName = 's-panel',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SPanel);
}
