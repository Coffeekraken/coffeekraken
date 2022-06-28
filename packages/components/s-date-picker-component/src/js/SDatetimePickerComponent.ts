// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import type {
    IFloatApi,
    IFloatSettings,
} from '@coffeekraken/sugar/js/dom/ui/makeFloat';
import __makeFloat from '@coffeekraken/sugar/js/dom/ui/makeFloat';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { css, html, unsafeCSS } from 'lit';
import __SDatetimePickerComponentInterface from './interface/SDatetimePickerComponentInterface';

// @ts-ignore
// import __css from '../../../../src/css/s-datetime-picker.css'; // relative to /dist/pkg/esm/js
import __css from '../css/s-datetime-picker.css'; // for dev

export interface ISDatetimePickerComponentProps {
    name: string;
    value: string;
    placeholder: string;
    updateInput: (
        | 'pointerdown'
        | 'pointerup'
        | 'pointermove'
        | 'input'
        | 'validate'
        | 'close'
    )[];
    format: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
    inline: boolean;
    input: boolean;
    button: boolean;
    clear: boolean;
    reset: boolean;
    validate: boolean;
    floatSettings: Partial<IFloatSettings>;
    copyIconClass: string;
    copiedIconClass: string;
    buttonIconClass: string;
    position: 'top' | 'bottom';
    disabled: boolean;
    fromYear: number;
    toYear: number;
}

/**
 * @name                SDatetimePickerComponent
 * @as                  Datetime Picker
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SDatetimePickerComponentInterface.ts
 * @menu                Styleguide / Forms              /styleguide/form/s-datetime-picker
 * @platform            html
 * @status              beta
 *
 * This component specify a datetime picker.
 *
 * @feature           Full support for sugar theming system for easy integration
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install         bash
 * npm i @coffeekraken/s-datetime-picker-component
 *
 * @install         js
 * import { define } from '@coffeekraken/s-datetime-picker-component';
 * define();
 *
 * @example         html            Simple input
 * <label class="s-label:responsive">
 *      Choose a date
 *      <s-datetime-picker value="#FABB03" placeholder="Choose a date" input></s-datetime-picker>
 * </label>
 *
 * @example         html            With an input and a button
 * <label class="s-label:responsive">
 *      Choose a date
 *      <s-datetime-picker value="#5101FF" placeholder="Choose a date" input button></s-datetime-picker>
 * </label>
 *
 * @example         html            With a different format (hsla)
 * <label class="s-label:responsive">
 *      Choose a date
 *      <s-datetime-picker value="#5101FF" format="hsla" placeholder="Choose a date" input button></s-datetime-picker>
 * </label>
 *
 * @example         html            Just a button
 * <label class="s-label:responsive">
 *      Choose a date
 *      <s-datetime-picker value="#55FFFF" button></s-datetime-picker>
 * </label>
 *
 * @example         html            With a custom input
 * <label class="s-label:responsive">
 *      Choose a date
 *      <s-datetime-picker>
 *          <input type="text" class="s-input" placeholder="Choose a date" value="#FABB03" />
 *      </s-datetime-picker>
 * </label>
 *
 * @example         html            With a custom button
 * <label class="s-label:responsive">
 *      Choose a date
 *      <s-datetime-picker>
 *          <button class="s-btn s-color:error">Choose a date</button>
 *      </s-datetime-picker>
 * </label>
 *
 * @example         html            With a custom input and button
 * <label class="s-label:responsive">
 *      Choose a date
 *      <s-datetime-picker>
 *          <div class="s-group">
 *              <input type="text" class="s-input" placeholder="Choose a date" value="#FABB03" />
 *              <button class="s-btn s-color:error">Choose a date</button>
 *          </div>
 *      </s-datetime-picker>
 * </label>
 *
 * @example         html            Disabled
 * <label class="s-label:responsive">
 *      Choose a date
 *      <s-datetime-picker disabled input button></s-datetime-picker>
 * </label>
 *
 * @example         html            RTL Support
 * <label class="s-label:responsive" dir="rtl">
 *      Choose a date
 *      <s-datetime-picker value="#FABB03" placeholder="Choose a date" input button dir="rtl"></s-datetime-picker>
 * </label>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDatetimePicker extends __SLitComponent {
    static get properties() {
        return __SLitComponent.createProperties(
            {},
            __SDatetimePickerComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }

    state = {
        year: 0,
        month: 0,
        day: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        displayedYear: 0,
        displayedMonth: 0,
        format: undefined,
    };
    _originalState = {};

    _floatApi: IFloatApi;

    _hasInput = false;
    _hasButton = false;
    _$input;
    _$button;
    _$root;
    _$picker;
    _$days;
    _$months;
    _$years;

    _date;

    _isInInteraction = false;

    constructor() {
        super(
            __deepMerge({
                name: 's-datetime-picker',
                interface: __SDatetimePickerComponentInterface,
            }),
        );
        this._$input = this.querySelector('input');
        this._hasInput = this._$input !== null;
        this._$button = this.querySelector('button');
        this._$button?.addEventListener('click', (e) => e.preventDefault());
        this._hasButton = this._$button !== null;

        // restore state
        this._restoreState();
    }
    async mount() {
        // save the original state
        Object.assign(this._originalState, this.state);
    }
    async firstUpdated() {
        this._$root = this.querySelector(
            `.${this.componentUtils.className('')}`,
        );

        this._$picker = this.querySelector(
            `.${this.componentUtils.className('__picker')}`,
        );

        // input
        if (!this._$input) {
            this._$input = this.querySelector('input');
        } else {
            // this._$root.append(this._$input);
        }
        if (!this._$input?.hasAttribute('name')) {
            this._$input?.setAttribute('name', this.props.name);
        }
        if (!this._$input?.hasAttribute('placeholder')) {
            this._$input?.setAttribute('placeholder', this.props.placeholder);
        }
        if (!this._$input?.hasAttribute('autocomplete')) {
            this._$input?.setAttribute('autocomplete', 'off');
        }

        // selectors
        this._$days = this.querySelector('.s-datetime-picker__days');
        this._$months = this.querySelector('.s-datetime-picker__months');
        this._$years = this.querySelector('.s-datetime-picker__years');

        // update float on focus
        this.addEventListener('focusin', (e) => {
            this._floatApi?.update();
        });

        // first input update
        this._updateInput('init');

        // make the panel float
        if (!this.props.inline) {
            this._floatApi = __makeFloat(
                this._$picker,
                this._$root,
                this.props.floatSettings,
            );
        }

        // scroll all the selectors to the best item
        this._scrollSelectorsToStateValues('initial');

        setTimeout(() => {
            // init interactions
            this._initInteractions();
        }, 2000);
    }

    _initInteractions() {
        let daysTimeout, monthsTimeout, yearsTimeout;

        const daysBounds = this._$days.getBoundingClientRect(),
            monthsBounds = this._$months.getBoundingClientRect();

        // years
        this._$years.addEventListener('scroll', (e) => {
            clearTimeout(yearsTimeout);
            yearsTimeout = setTimeout(() => {
                const scrollTop =
                    this._$years.scrollTop + daysBounds.height / 2;
                const scrollHeight = this._$years.scrollHeight;
                const count = this.props.toYear - this.props.fromYear;
                const idx = Math.round((count / scrollHeight) * scrollTop);
                this.state.displayedYear = parseInt(
                    this._$years.children[idx].innerText,
                );
            }, 500);
        });

        // months
        this._$months.addEventListener('scroll', (e) => {
            clearTimeout(monthsTimeout);
            monthsTimeout = setTimeout(() => {
                const scrollTop =
                    this._$months.scrollTop + monthsBounds.height / 2;
                const scrollHeight = this._$months.scrollHeight;
                const count = 12;
                const idx = Math.round((count / scrollHeight) * scrollTop);
                this.state.displayedMonth = idx + 1;
            }, 500);
        });
    }

    _scrollSelectorsToStateValues(step: 'initial' | string) {
        const smooth = step !== 'initial';
        this._scrollSelectorToActiveItem(this._$years, smooth);
        this._scrollSelectorToActiveItem(this._$months, smooth);
        this._scrollSelectorToActiveItem(this._$days, smooth);
    }
    _scrollSelectorToActiveItem(
        $selector: HTMLElement,
        smooth: boolean = true,
    ) {
        const $activeElement = $selector.querySelector('.active');
        if ($activeElement) {
            const bounds = $activeElement.getBoundingClientRect();
            $selector.scrollTo({
                top:
                    bounds.height *
                    Array.from($selector.children).indexOf($activeElement),
                left: 0,
                behavior: smooth ? 'smooth' : 'instant',
            });
        }
    }

    _updateInput(
        step:
            | 'init'
            | 'pointerdown'
            | 'pointerup'
            | 'pointermove'
            | 'validate'
            | 'reset'
            | 'clear'
            | 'close',
    ) {
        if (step !== 'init' && !this.props.updateInput.includes(step)) {
            return;
        }

        switch (this.props.format) {
            default:
                // this.state.value = 'coco';
                break;
        }

        if (this._$input && this._$input.value !== this.state.value) {
            this._$input.value = this.state.value;
        }

        // dispatch a "change" event
        if (step !== 'init') {
            this._$input.dispatchEvent(
                new CustomEvent('change', {
                    bubbles: true,
                    detail: {
                        hello: 'world',
                    },
                }),
            );
        }

        this.requestUpdate();
    }

    _restoreState() {
        if (
            false &&
            this.state.day !== undefined &&
            this.state.hours !== undefined
        ) {
        } else {
            this.state.value = undefined;

            let date = new Date();
            if (this._$input?.value) {
                date = new Date(this._$input.valud);
            }

            this.state.year = date.getFullYear();
            this.state.month = date.getMonth();
            this.state.day = date.getDate();
            this.state.hours = date.getUTCHours();
            this.state.minutes = date.getMinutes();
            this.state.seconds = date.getSeconds();

            this.state.displayedYear = this.state.year;
            this.state.displayedMonth = this.state.month;
        }

        console.log(this.state);
    }

    _validate() {
        this._updateInput('validate');
        document.activeElement?.blur?.();
    }
    _clear() {
        // if (this._inputColor) {
        //     this._setAlpha(this._inputColor.a);
        //     this._setHue(this._inputColor.h);
        //     this._setShade(this._inputColor.s, this._inputColor.l);
        // } else {
        //     this._setAlpha(1);
        //     this._setHue(0);
        //     this._setShade(0, 0);
        // }
        this._updateInput('clear');
    }
    _reset() {
        // this._setAlpha(this._originalState.a);
        // this._setHue(this._originalState.h);
        // this._setShade(this._originalState.s, this._originalState.l);
        this._updateInput('reset');
    }

    _copy() {
        const originalClass = this.props.copyIconClass;
        this.props.copyIconClass = this.props.copiedIconClass;

        // __copy(this._$colorInput.value);

        setTimeout(() => {
            this.props.copyIconClass = originalClass;
        }, 1000);
    }

    _getDaysInMonth(year: number, month: number): number {
        return new Date(year, month, 0).getDate();
    }
    _getMonths(): string[] {
        return this.props.i18n.months;
    }
    _getYears(): number[] {
        let i = this.props.fromYear;
        const years: number[] = [];
        for (let j = i; j <= this.props.toYear; j++) {
            years.push(j);
        }
        return years;
    }

    render() {
        let firstDayOfTheMonth = new Date(
            this.state.displayedYear,
            this.state.displayedMonth,
        ).getDay();
        let daysInMonth =
            32 -
            new Date(
                this.state.displayedYear,
                this.state.displayedMonth,
                32,
            ).getDate();
        const today = new Date();
        let date = 1;

        console.log(today.getMonth(), this.state.displayedMonth);

        return html`
            <div
                class="${this.componentUtils.className(
                    '',
                )} ${this.componentUtils.className('')}--${this.props
                    .floatSettings.position} ${this._isInInteraction
                    ? 'is-interacting'
                    : ''}"
            >
                ${!this._hasInput && !this.props.input
                    ? html`
                          <input
                              ?disabled=${this.props.disabled}
                              type="hidden"
                              name="${this.props.name}"
                              value="${this.state.value ?? this.props.value}"
                          />
                      `
                    : ''}

                <div
                    class="${this.componentUtils.className(
                        '__injected',
                        's-group',
                    )}"
                >
                    ${!this._hasInput && this.props.input
                        ? html`
                              <input
                                  ?disabled=${this.props.disabled}
                                  type="text"
                                  autocomplete="off"
                                  name="${this.props.name}"
                                  value="${this.state.value ??
                                  this.props.value}"
                                  placeholder="${this.props.placeholder}"
                                  class="${this.componentUtils.className(
                                      '__input',
                                      's-input',
                                  )}"
                              />
                          `
                        : !this._hasInput
                        ? ''
                        : ``}
                    ${!this._hasButton && this.props.button
                        ? html`
                              <button
                                  ?disabled=${this.props.disabled}
                                  onclick="return false"
                                  class="${this.componentUtils.className(
                                      '__button',
                                      's-btn',
                                  )}"
                              >
                                  ${this.props.buttonIconClass
                                      ? html`
                                            <i
                                                class="${this.props
                                                    .buttonIconClass}"
                                            ></i>
                                        `
                                      : ''}
                              </button>
                          `
                        : ''}
                </div>
                <div
                    class="${this.componentUtils.className('__picker')}"
                    tabindex="-1"
                >
                    <div class="${this.componentUtils.className('__calendar')}">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className(
                                                '__calendar-day',
                                            )}"
                                        >
                                            Sun
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className(
                                                '__calendar-day',
                                            )}"
                                        >
                                            Mon
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className(
                                                '__calendar-day',
                                            )}"
                                        >
                                            Tue
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className(
                                                '__calendar-day',
                                            )}"
                                        >
                                            Wed
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className(
                                                '__calendar-day',
                                            )}"
                                        >
                                            Thu
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className(
                                                '__calendar-day',
                                            )}"
                                        >
                                            Fri
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className(
                                                '__calendar-day',
                                            )}"
                                        >
                                            Sat
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            ${Array.from(Array(6).keys()).map(
                                (i) => html`
                                    <tr>
                                        ${Array.from(Array(7).keys()).map(
                                            (j) => {
                                                const res = html`
                                                    ${i === 0 &&
                                                    j < firstDayOfTheMonth
                                                        ? html` <td></td>`
                                                        : date > daysInMonth
                                                        ? html``
                                                        : html`
                                                              <td>
                                                                  <div
                                                                      class="${this.componentUtils.className(
                                                                          '__calendar-item',
                                                                      )} ${date ===
                                                                          today.getDate() &&
                                                                      today.getMonth() ===
                                                                          this
                                                                              .state
                                                                              .displayedMonth &&
                                                                      today.getFullYear() ===
                                                                          this
                                                                              .state
                                                                              .displayedYear
                                                                          ? 'active'
                                                                          : ''}"
                                                                  >
                                                                      ${date}
                                                                  </div>
                                                              </td>
                                                          `}
                                                `;
                                                date++;
                                                return res;
                                            },
                                        )}
                                    </tr>
                                `,
                            )}
                        </table>
                    </div>

                    <div
                        class="${this.componentUtils.className(
                            '__date-selectors',
                        )}"
                    >
                        <div
                            class="${this.componentUtils.className(
                                '__selector',
                            )} ${this.componentUtils.className('__days')}"
                        >
                            ${Array.from(
                                Array(
                                    this._getDaysInMonth(
                                        this.state.year,
                                        this.state.month,
                                    ),
                                ).keys(),
                            ).map(
                                (i) => html`
                                    <div
                                        class="${this.componentUtils.className(
                                            '__selector-item',
                                        )} ${this.componentUtils.className(
                                            '__day',
                                        )} ${this.state.day === i + 1
                                            ? 'active'
                                            : ''}"
                                    >
                                        ${String(i + 1).padStart(2, '0')}
                                    </div>
                                `,
                            )}
                        </div>
                        <div
                            class="${this.componentUtils.className(
                                '__selector',
                            )} ${this.componentUtils.className('__months')}"
                        >
                            ${this._getMonths().map(
                                (month, i) => html`
                                    <div
                                        class="${this.componentUtils.className(
                                            '__selector-item',
                                        )} ${this.componentUtils.className(
                                            '__month',
                                        )} ${this.state.displayedMonth === i
                                            ? 'active'
                                            : ''}"
                                    >
                                        ${month}
                                    </div>
                                `,
                            )}
                        </div>
                        <div
                            class="${this.componentUtils.className(
                                '__selector',
                            )} ${this.componentUtils.className('__years')}"
                        >
                            ${this._getYears().map(
                                (year, j) => html`
                                    <div
                                        class="${this.componentUtils.className(
                                            '__selector-item',
                                        )} ${this.componentUtils.className(
                                            '__year',
                                        )} ${this.state.year === year
                                            ? 'active'
                                            : ''}"
                                    >
                                        ${year}
                                    </div>
                                `,
                            )}
                        </div>
                    </div>

                    <div class="${this.componentUtils.className('__actions')}">
                        ${this.props.clear
                            ? html`
                                  <button
                                      class="${this.componentUtils.className(
                                          '__clear',
                                          's-btn s-color--error',
                                      )}"
                                      @click=${(e) => {
                                          e.preventDefault();
                                          this._clear();
                                      }}
                                  >
                                      ${this.props.i18n.clear ?? 'Clear'}
                                  </button>
                              `
                            : ''}
                        ${this.props.reset
                            ? html`
                                  <button
                                      class="${this.componentUtils.className(
                                          '__reset',
                                          's-btn s-color--complementary',
                                      )}"
                                      @click=${(e) => {
                                          e.preventDefault();
                                          this._reset();
                                      }}
                                  >
                                      ${this.props.i18n.reset ?? 'Reset'}
                                  </button>
                              `
                            : ''}
                        ${this.props.validate
                            ? html`
                                  <button
                                      class="${this.componentUtils.className(
                                          '__validate',
                                          's-btn s-color--accent',
                                      )}"
                                      @click=${(e) => {
                                          e.preventDefault();
                                          this._validate();
                                      }}
                                  >
                                      ${this.props.i18n.validate ?? 'Validate'}
                                  </button>
                              `
                            : ''}
                    </div>
                </div>
            </div>
        `;
    }
}

export function define(
    props: Partial<ISDatetimePickerComponentProps> = {},
    tagName = 's-datetime-picker',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDatetimePicker);
}
