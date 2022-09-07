// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { __isUserScrolling } from '@coffeekraken/sugar/dom';
import type {
    IFloatApi,
    IFloatSettings,
} from '@coffeekraken/sugar/js/dom/ui/makeFloat';
import __makeFloat from '@coffeekraken/sugar/js/dom/ui/makeFloat';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __dateFormat from 'dateformat';
import { css, html, unsafeCSS } from 'lit';
import __SDatetimePickerComponentInterface from './interface/SDatetimePickerComponentInterface';

// @ts-ignore
import __css from '../../../../src/css/s-datetime-picker.css'; // relative to /dist/pkg/esm/js
// import __css from '../css/s-datetime-picker.css'; // for dev

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
    calendar: boolean;
    floatSettings: Partial<IFloatSettings>;
    copyIconClass: string;
    copiedIconClass: string;
    buttonIconClass: string;
    backdropClass: string;
    actions: ('clear' | 'reset' | 'validate')[];
    position: 'top' | 'bottom';
    backdrop: boolean;
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
 * @event           s-datetime-picker.change                                  Dispatched when the datepicker change value
 * @event           s-datetime-picker                       Dispatched for every events of this component. Check the detail.eventType prop for event type
 *
 * @install         bash
 * npm i @coffeekraken/s-datetime-picker-component
 *
 * @install         js
 * import { define } from '@coffeekraken/s-datetime-picker-component';
 * define();
 *
 * @example         html            Simple input
 * <label class="s-label:responsive s-color:accent">
 *     <span>Choose a date</span>
 *      <s-datetime-picker calendar placeholder="Choose a date" input></s-datetime-picker>
 * </label>
 *
 * @example         html            With a calendar
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker calendar placeholder="Choose a date" input></s-datetime-picker>
 * </label>
 *
 * @example         html            With a backdrop
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker calendar backdrop placeholder="Choose a date" input></s-datetime-picker>
 * </label>
 *
 * @example         html            With an input and a button
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker placeholder="Choose a date" input button></s-datetime-picker>
 * </label>
 *
 * @example         html            With a different format and a calendar
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker calendar format="yyyy-mm-dd:HH:MM" placeholder="Choose a date" input button></s-datetime-picker>
 * </label>
 *
 * @example         html            Just a button with disabled weekend
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker calendar disable="weekend" button></s-datetime-picker>
 * </label>
 *
 * @example         html            With a custom input
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker>
 *          <input type="text" class="s-input" placeholder="Choose a date" />
 *      </s-datetime-picker>
 * </label>
 *
 * @example         html            With a custom button
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker>
 *          <button class="s-btn s-color:error">Choose a date</button>
 *      </s-datetime-picker>
 * </label>
 *
 * @example         html            With a custom input and button
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker>
 *          <div class="s-group">
 *              <input type="text" class="s-input" placeholder="Choose a date" />
 *              <button class="s-btn s-color:error">Choose a date</button>
 *          </div>
 *      </s-datetime-picker>
 * </label>
 *
 * @example         html            Disabled
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker disabled input button></s-datetime-picker>
 * </label>
 *
 * @example         html            RTL Support
 * <label class="s-label:responsive s-color:accent" dir="rtl">
 *      <span>Choose a date</span>
 *      <s-datetime-picker placeholder="Choose a date" input button dir="rtl"></s-datetime-picker>
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
        hour: 12,
        minutes: 0,
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
    _$hours;
    _$minutes;

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
            `.${this.componentUtils.className('__root')}`,
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
        this._$input.setAttribute('readonly', true);

        // selectors
        this._$days = this.querySelector('.s-datetime-picker__days');
        this._$months = this.querySelector('.s-datetime-picker__months');
        this._$years = this.querySelector('.s-datetime-picker__years');
        this._$hours = this.querySelector('.s-datetime-picker__hours');
        this._$minutes = this.querySelector('.s-datetime-picker__minutes');

        // update float on focus
        this.addEventListener('focusin', (e) => {
            this._floatApi?.update();
        });

        // first input update
        this._updateInput('init');

        // make the panel float
        if (!this.props.inline) {
            this._floatApi = __makeFloat(this._$picker, this._$root, {
                ...this.props.floatSettings,
            });
        }

        // scroll all the selectors to the best item
        this._scrollSelectorsToStateValues('initial');

        // init interactions
        this._initInteractions();
    }

    _isDateNeeded(): boolean {
        return this.props.format.match(/(d{1,4}|D{3,4}|m{1,4}|yy|yyyy)/);
    }
    _isTimeNeeded(): boolean {
        return this.props.format.match(/(h{1,2}|H{1,2}|M{1,2})/);
    }

    _isSelectedDatetimeValid(): boolean {
        return !this._isDateDisabled(
            this.state.day,
            this.state.month,
            this.state.year,
        );
    }

    _isDateDisabled(
        date: number,
        month: number = this.state.displayedMonth,
        year: number = this.state.displayedYear,
    ): boolean {
        if (year !== -1) {
            if (this.props.disable.includes(String(year))) {
                return true;
            }
        }

        if (month !== -1) {
            // month
            const months = [
                'january',
                'february',
                'march',
                'april',
                'may',
                'june',
                'july',
                'august',
                'september',
                'october',
                'november',
                'december',
            ];
            for (let i = 0; i < months.length; i++) {
                const currentMonth = months[i];
                if (this.props.disable.includes(currentMonth) && month === i) {
                    return true;
                }
            }
        }

        if (date === -1) {
            return false;
        }

        const dayInWeek = new Date(year, month, date).getDay();

        // days
        const days = [
            'sunday',
            'monday',
            'thuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
        ];
        for (let i = 0; i < days.length; i++) {
            const currentDay = days[i];
            if (this.props.disable.includes(currentDay) && dayInWeek === i) {
                return true;
            }
        }

        // specific dates
        if (this.props.disable.includes(this._getDisableDateFromDate(date))) {
            return true;
        }

        // week and weekend
        if (
            this.props.disable.includes('week') &&
            dayInWeek > 1 &&
            dayInWeek <= 5
        ) {
            return true;
        }
        if (
            this.props.disable.includes('weekend') &&
            (dayInWeek === 0 || dayInWeek === 6)
        ) {
            return true;
        }
    }

    _setDay(day: number, delay: getHourboolean = false): void {
        this.state.day = day;
        setTimeout(() => {
            this._scrollSelectorToActiveItem(this._$days, true, delay);
        });
        // update input on select
        this._updateInput('select');
    }
    _setMonth(month: number, delay: getHourboolean = false): void {
        this.state.month = month;
        this.state.displayedMonth = month;
        setTimeout(() => {
            this._scrollSelectorToActiveItem(this._$months, true, delay);
        });
        // update input on select
        this._updateInput('select');
    }
    _setYear(year: number, delay: getHourboolean = false): void {
        this.state.year = year;
        this.state.displayedYear = year;
        setTimeout(() => {
            this._scrollSelectorToActiveItem(this._$years, true, delay);
        });
        // update input on select
        this._updateInput('select');
    }
    _setHour(hour: number, delay: getHourboolean = false): void {
        this.state.hour = hour;
        setTimeout(() => {
            this._scrollSelectorToActiveItem(this._$hours, true, delay);
        });
        // update input on select
        this._updateInput('select');
    }
    _setMinutes(minutes: number, delay: getHourboolean = false): void {
        this.state.minutes = minutes;
        setTimeout(() => {
            this._scrollSelectorToActiveItem(this._$minutes, true, delay);
        });
        // update input on select
        this._updateInput('select');
    }

    _initInteractions() {
        let daysTimeout,
            monthsTimeout,
            yearsTimeout,
            hoursTimeout,
            minutesTimeout;

        // years
        this._$years.addEventListener('scroll', (e) => {
            if (!__isUserScrolling(this._$years)) {
                return;
            }
            clearTimeout(yearsTimeout);
            this._$years.classList.add('scrolling');
            yearsTimeout = setTimeout(() => {
                const idx = this._getSelectedIdxFromSelector(this._$years);
                this._setYear(
                    parseInt(this._$years.children[idx - 1].innerText),
                );
                this._$years.classList.remove('scrolling');
            }, 400);
        });

        // months
        this._$months.addEventListener('scroll', (e) => {
            if (!__isUserScrolling(this._$months)) {
                return;
            }
            clearTimeout(monthsTimeout);
            this._$months.classList.add('scrolling');
            monthsTimeout = setTimeout(() => {
                const idx = this._getSelectedIdxFromSelector(this._$months);
                this._setMonth(idx - 1);
                this._$months.classList.remove('scrolling');
            }, 400);
        });

        // days
        this._$days.addEventListener('scroll', (e) => {
            if (!__isUserScrolling(this._$days)) {
                return;
            }
            clearTimeout(daysTimeout);
            this._$days.classList.add('scrolling');
            daysTimeout = setTimeout(() => {
                const idx = this._getSelectedIdxFromSelector(this._$days);
                this._setDay(idx);
                this._$days.classList.remove('scrolling');
            }, 400);
        });

        // hour
        this._$hours.addEventListener('scroll', (e) => {
            if (!__isUserScrolling(this._$hours)) {
                return;
            }
            clearTimeout(hoursTimeout);
            this._$hours.classList.add('scrolling');
            hoursTimeout = setTimeout(() => {
                const idx = this._getSelectedIdxFromSelector(this._$hours);
                this._setHour(
                    parseInt(this._$hours.children[idx - 1].innerText),
                );
                this._$hours.classList.remove('scrolling');
            }, 400);
        });

        // minutes
        this._$minutes.addEventListener('scroll', (e) => {
            if (!__isUserScrolling(this._$minutes)) {
                return;
            }
            clearTimeout(minutesTimeout);
            this._$minutes.classList.add('scrolling');
            minutesTimeout = setTimeout(() => {
                const idx = this._getSelectedIdxFromSelector(this._$minutes);
                this._setMinutes(
                    parseInt(this._$minutes.children[idx - 1].innerText),
                );
                this._$minutes.classList.remove('scrolling');
            }, 400);
        });
    }

    _getSelectedIdxFromSelector($selector: HTMLElement): number {
        const bounds = $selector.getBoundingClientRect();
        const scrollTop = $selector.scrollTop + bounds.height / 2;
        const count = $selector.children.length;
        const itemsHeight = Array.from($selector.children).reduce(
            (current, $a) => {
                const bounds = $a.getBoundingClientRect();
                return current + bounds.height;
            },
            0,
        );
        return Math.round((count / itemsHeight) * scrollTop);
    }

    _scrollSelectorsToStateValues(step: 'initial' | string) {
        const smooth = step !== 'initial';
        this._scrollSelectorToActiveItem(this._$years, smooth);
        this._scrollSelectorToActiveItem(this._$months, smooth);
        this._scrollSelectorToActiveItem(this._$days, smooth);
        this._scrollSelectorToActiveItem(this._$hours, smooth);
        this._scrollSelectorToActiveItem(this._$minutes, smooth);
    }
    _scrollSelectorToActiveItem(
        $selector: HTMLElement,
        smooth: boolean = true,
        delay: boolean = false,
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

        this._$input.value = __dateFormat(
            new Date(
                this.state.year,
                this.state.month,
                this.state.day,
                this.state.hour,
                this.state.minutes,
                0,
            ),
            this.props.format,
        );

        // if (this._$input && this._$input.value !== this.state.value) {
        //     this._$input.value = this.state.value;
        // }

        // dispatch a "change" event
        if (step !== 'init') {
            this.componentUtils.dispatchEvent('change', {
                detail: {
                    // something...
                },
            });
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
            // this.state.hours = date.getUTCHours();
            // this.state.minutes = date.getMinutes();

            this.state.displayedYear = this.state.year;
            this.state.displayedMonth = this.state.month;
        }
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
        setTimeout(() => {
            this.props.copyIconClass = originalClass;
        }, 1000);
    }

    _getDisableDateFromDate(date: number): string {
        return `${this.state.displayedYear}-${String(
            this.state.displayedMonth + 1,
        ).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    }

    _getMinutes(): number[] {
        return this.props.minutes;
    }
    _getHours(): number[] {
        return this.props.hours;
    }
    _getDaysInMonth(year: number, month: number): number {
        return new Date(year, month + 1, 0).getDate();
    }
    _getDays(): number[] {
        const daysInMonth = this._getDaysInMonth(
            this.state.displayedYear,
            this.state.displayedMonth,
        );
        let days = Array.from(Array(daysInMonth).keys());
        return days;
    }
    _getMonths(): string[] {
        return this.props.i18n.months.filter((month, i) => {
            return true;
            return !this._isDateDisabled(10, i);
        });
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

        return html`
            <div
                class="${this.componentUtils.className(
                    '__root',
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
                ${this.props.backdrop
                    ? html`
                          <div
                              class="${this.componentUtils.className(
                                  '__backdrop',
                              )} ${this.props.backdropClass}"
                          ></div>
                      `
                    : ''}
                <div
                    class="${this.componentUtils.className('__picker')}"
                    tabindex="-1"
                >
                    <div
                        class="${this.componentUtils.className(
                            '__calendar',
                        )} ${this._isDateNeeded() && this.props.calendar
                            ? 'active'
                            : ''}"
                    >
                        <table>
                            <thead>
                                <tr>
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
                                    <th>
                                        <div
                                            class="${this.componentUtils.className(
                                                '__calendar-day',
                                            )}"
                                        >
                                            Sun
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            ${Array.from(Array(6).keys()).map(
                                (i) => html`
                                    <tr>
                                        ${Array.from(Array(7).keys()).map(
                                            (j) => {
                                                const day = date;
                                                const res = html`
                                                    ${i === 0 &&
                                                    j < firstDayOfTheMonth - 1
                                                        ? html` <td></td>`
                                                        : date > daysInMonth
                                                        ? html`<td></td>`
                                                        : html`
                                                              <td>
                                                                  <div
                                                                      @click=${(
                                                                          e,
                                                                      ) =>
                                                                          this._setDay(
                                                                              day,
                                                                          )}
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
                                                                          ? 'today'
                                                                          : ''} ${this.componentUtils.className(
                                                                          '__calendar-item',
                                                                      )} ${date ===
                                                                          this
                                                                              .state
                                                                              .day &&
                                                                      this.state
                                                                          .month ===
                                                                          this
                                                                              .state
                                                                              .displayedMonth &&
                                                                      this.state
                                                                          .year ===
                                                                          this
                                                                              .state
                                                                              .displayedYear
                                                                          ? 'active'
                                                                          : ''} ${this._isDateDisabled(
                                                                          date,
                                                                      )
                                                                          ? 'disabled'
                                                                          : ''}"
                                                                  >
                                                                      <span
                                                                          >${date}</span
                                                                      >
                                                                  </div>
                                                              </td>
                                                          `}
                                                `;
                                                if (
                                                    i === 0 &&
                                                    j < firstDayOfTheMonth - 1
                                                ) {
                                                } else {
                                                    date++;
                                                }
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
                        )} ${this._isDateNeeded() ? 'active' : ''}"
                    >
                        <div
                            class="${this.componentUtils.className(
                                '__selector',
                            )} ${this.componentUtils.className('__days')}"
                        >
                            ${this._getDays().map(
                                (i) => html`
                                    <div
                                        @click=${() => this._setDay(i + 1)}
                                        class="${this.componentUtils.className(
                                            '__selector-item',
                                        )} ${this.componentUtils.className(
                                            '__day',
                                        )} ${this.state.day === i + 1
                                            ? 'active'
                                            : ''} ${this._isDateDisabled(i + 1)
                                            ? 'disabled'
                                            : ''}"
                                    >
                                        <span>
                                            ${String(i + 1).padStart(2, '0')}
                                        </span>
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
                                        @click=${() => this._setMonth(i)}
                                        class="${this.componentUtils.className(
                                            '__selector-item',
                                        )} ${this.componentUtils.className(
                                            '__month',
                                        )} ${this.state.displayedMonth === i
                                            ? 'active'
                                            : ''} ${this._isDateDisabled(-1, i)
                                            ? 'disabled'
                                            : ''}"
                                    >
                                        <span> ${month} </span>
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
                                        @click=${() => this._setYear(year)}
                                        class="${this.componentUtils.className(
                                            '__selector-item',
                                        )} ${this.componentUtils.className(
                                            '__year',
                                        )} ${this.state.displayedYear === year
                                            ? 'active'
                                            : ''} ${this._isDateDisabled(
                                            -1,
                                            -1,
                                            year,
                                        )
                                            ? 'disabled'
                                            : ''}"
                                    >
                                        <span> ${year} </span>
                                    </div>
                                `,
                            )}
                        </div>
                    </div>
                    <div
                        class="${this.componentUtils.className(
                            '__time-selectors',
                        )} ${this._isTimeNeeded() ? 'active' : ''}"
                    >
                        <div
                            class="${this.componentUtils.className(
                                '__selector',
                            )} ${this.componentUtils.className('__hours')}"
                        >
                            ${this._getHours().map(
                                (hour) => html`
                                    <div
                                        @click=${() => this._setHour(hour)}
                                        class="${this.componentUtils.className(
                                            '__selector-item',
                                        )} ${this.componentUtils.className(
                                            '__hour',
                                        )} ${this.state.hour === hour
                                            ? 'active'
                                            : ''}"
                                    >
                                        <span>
                                            ${String(hour).padStart(2, '0')}
                                        </span>
                                    </div>
                                `,
                            )}
                        </div>
                        <div
                            class="${this.componentUtils.className(
                                '__selector',
                            )} ${this.componentUtils.className('__minutes')}"
                        >
                            ${this._getMinutes().map(
                                (minute, i) => html`
                                    <div
                                        @click=${() => this._setMinutes(minute)}
                                        class="${this.componentUtils.className(
                                            '__selector-item',
                                        )} ${this.componentUtils.className(
                                            '__minutes',
                                        )} ${this.state.minutes === minute
                                            ? 'active'
                                            : ''}"
                                    >
                                        <span>
                                            ${String(minute).padStart(2, '0')}
                                        </span>
                                    </div>
                                `,
                            )}
                        </div>
                    </div>
                    ${this.props.actions.length
                        ? html`
                              <div
                                  class="${this.componentUtils.className(
                                      '__actions',
                                  )}"
                              >
                                  ${this.props.actions.includes('clear')
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
                                                ${this.props.i18n.clear ??
                                                'Clear'}
                                            </button>
                                        `
                                      : ''}
                                  ${this.props.actions.includes('reset')
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
                                                ${this.props.i18n.reset ??
                                                'Reset'}
                                            </button>
                                        `
                                      : ''}
                                  ${this.props.actions.includes('validate')
                                      ? html`
                                            <button
                                                ?disabled=${!this._isSelectedDatetimeValid()}
                                                class="${this.componentUtils.className(
                                                    '__validate',
                                                    's-btn s-color--accent',
                                                )}"
                                                @click=${(e) => {
                                                    e.preventDefault();
                                                    this._validate();
                                                }}
                                            >
                                                ${this.props.i18n.validate ??
                                                'Validate'}
                                            </button>
                                        `
                                      : ''}
                              </div>
                          `
                        : ''}
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
