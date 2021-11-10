var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { html, css, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SFiltrableInputComponentInterface from './interface/SFiltrableInputComponentInterface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __clone from '@coffeekraken/sugar/shared/object/clone';
import __distanceFromElementTopToViewportBottom from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportBottom';
import __getStyleProperty from '@coffeekraken/sugar/js/dom/style/getStyleProperty';
import __distanceFromElementTopToViewportTop from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportTop';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import __stripTags from '@coffeekraken/sugar/js/dom/manipulate/stripTags';
import __onScrollEnd from '@coffeekraken/sugar/js/dom/detect/onScrollEnd';
// @ts-ignore
import __css from '../css/s-filtrable-input.css';
export default class SFiltrableInput extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            litComponent: {
                shadowDom: false,
            },
            componentUtils: {
                interface: __SFiltrableInputComponentInterface,
            },
        }));
        this.state = {
            baseTemplates: undefined,
            preselectedItem: undefined,
            preselectedItemIdx: -1,
            selectedItemIdx: -1,
            displayedMaxItems: 0,
            value: '',
            isActive: false,
            isLoading: false,
            items: [],
            filteredItems: [],
        };
        this.state.displayedMaxItems = this.props.maxItems;
        if (this.props.items && typeof this.props.items === 'string') {
            const $itemsElm = document.querySelector(this.props.items);
            if ($itemsElm) {
                this.state.items = JSON.parse($itemsElm.innerHTML);
                this.requestUpdate();
            }
        }
        // @ts-ignore
        this.state.baseTemplates = ({ type, item, html }) => {
            switch (type) {
                case 'item':
                    return html `
                        <div class="${this.componentUtils.className('__item')}">
                            ${unsafeHTML(typeof this.props.label === 'function'
                        ? this.props.label(item)
                        : item[this.props.label])}
                        </div>
                    `;
                    break;
                case 'empty':
                    return html `
                        <div
                            class="${this.componentUtils.className('__empty')}"
                        >
                            ${this.props.emptyText}
                        </div>
                    `;
                    break;
                case 'loading':
                    return html `
                        <div
                            class="${this.componentUtils.className('__loading')}"
                        >
                            ${this.props.loadingText}
                        </div>
                    `;
                    break;
            }
        };
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    firstUpdated() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.$input = this.querySelector('input');
            this.$input.setAttribute('autocomplete', 'off');
            if (!this.props.bare) {
                // @ts-ignore
                (_a = this.$input.classList) === null || _a === void 0 ? void 0 : _a.add('s-input');
            }
            // @ts-ignore
            this.$input.addEventListener('keyup', (e) => {
                // @ts-ignore
                const value = e.target.value;
                this.state.value = value;
                this.state.displayedMaxItems = this.props.maxItems;
                this.filterItems();
            });
            // @ts-ignore
            this.$input.classList.add(this.componentUtils.className('__input'));
            this.$container = this;
            this.$container.classList.add('s-filtrable-input');
            this.$container.classList.add(this.componentUtils.className());
            // @ts-ignore
            this.$list = this.querySelector('ul');
            this.prepend(this.$input);
            this.filterItems();
            document.addEventListener('scroll', () => {
                this._updateListSizeAndPosition();
            });
            this.$input.addEventListener('focus', (e) => {
                this.state.isActive = true;
                this.filterItems();
                this._updateListSizeAndPosition();
            });
            this._updateListSizeAndPosition();
            __onScrollEnd(this.$list, () => {
                var _a;
                this.state.displayedMaxItems =
                    ((_a = this.state.displayedMaxItems) !== null && _a !== void 0 ? _a : 0) + this.props.maxItems;
                this.filterItems(false);
            });
            __hotkey('escape').on('press', (e) => {
                e.preventDefault();
                if (!this.state.isActive)
                    return;
                this.close();
            });
            __hotkey('up').on('press', (e) => {
                e.preventDefault();
                if (!this.state.isActive)
                    return;
                this.state.preselectedItemIdx =
                    this.state.preselectedItemIdx > 0
                        ? this.state.preselectedItemIdx - 1
                        : 0;
                this.requestUpdate();
                const $item = this.$list.children[this.state.preselectedItemIdx];
                // @ts-ignore
                $item.focus();
            });
            __hotkey('down').on('press', (e) => {
                e.preventDefault();
                if (!this.state.isActive)
                    return;
                this.state.preselectedItemIdx =
                    this.state.preselectedItemIdx >=
                        this.state.filteredItems.length - 1
                        ? this.state.filteredItems.length - 1
                        : this.state.preselectedItemIdx + 1;
                this.requestUpdate();
                const $item = this.$list.children[this.state.preselectedItemIdx];
                // @ts-ignore
                $item.focus();
            });
            __hotkey('return').on('press', (e) => {
                // protect agains actions when not focus
                if (!this.state.isActive)
                    return;
                this.validateAndClose();
            });
        });
    }
    get selectedItem() {
        if (this.state.selectedItemIdx === -1)
            return;
        return this.state.filteredItems[this.state.selectedItemIdx];
    }
    get preselectedItem() {
        if (this.state.preselectedItemIdx === -1)
            return;
        return this.state.filteredItems[this.state.preselectedItemIdx];
    }
    validate() {
        var _a;
        // protect against not selected item
        if (!this.state.preselectedItem)
            return;
        // set the value in the input
        if (this.state.preselectedItem) {
            if (typeof this.props.value === 'string' &&
                ((_a = this.state.preselectedItem) === null || _a === void 0 ? void 0 : _a[this.props.value])) {
                this.$input.value = __stripTags(
                // @ts-ignore
                this.state.preselectedItem[this.props.value]);
            }
            else if (typeof this.props.value === 'function') {
                const v = this.props.value({
                    item: this.state.filteredItems[this.state.preselectedItemIdx],
                });
                if (typeof v !== 'string') {
                    throw new Error(`<red>[s-filtrable-input]</red> Sorry but the returned value "<yellow>${v}</yellow>" has to be a string...`);
                }
                this.$input.value = __stripTags(v);
            }
        }
        this.state.selectedItemIdx = this.state.preselectedItemIdx;
        // @ts-ignore
        this.state.value = this.$input.value;
        this.requestUpdate();
        // dispatch an event
        const event = new CustomEvent('select', {
            bubbles: true,
            detail: this.selectedItem,
        });
        // @ts-ignore
        this.dispatchEvent(event);
    }
    validateAndClose() {
        this.validate();
        setTimeout(() => {
            this.close();
        }, this.props.closeTimeout);
    }
    close() {
        this.$input.focus();
        this.$input.blur();
        this.state.isActive = false;
    }
    refreshItems() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.props.items === 'function') {
                this.state.isLoading = true;
                this.requestUpdate();
                const items = yield this.props.items({
                    value: this.$input.value,
                });
                if (__isPlainObject(items)) {
                    this.state.items = Object.values(items);
                }
                else if (Array.isArray(items)) {
                    // @ts-ignore
                    this.state.items = items;
                }
                else {
                    throw new Error(`Sorry but the "items" MUST be an Array...`);
                }
            }
        });
    }
    filterItems(needUpdate = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (needUpdate)
                yield this.refreshItems();
            let items = this.state.items;
            let matchedItemsCount = 0;
            const filteredItems = items
                .map((item) => __clone(item))
                .filter((item) => {
                if (matchedItemsCount >= this.state.displayedMaxItems)
                    return false;
                if (!this.props.filtrable.length)
                    return true;
                let matchFilter = false;
                for (let i = 0; i < Object.keys(item).length; i++) {
                    const propName = Object.keys(item)[i], propValue = item[propName];
                    // prevent not string value
                    if (typeof propValue !== 'string')
                        continue;
                    // check if the current propName is specified in the filtrable list
                    if (this.props.filtrable.indexOf(propName) !== -1) {
                        const reg = new RegExp(this.state.value.split(' ').join('|'), 'gi');
                        if (propValue.match(reg)) {
                            matchFilter = true;
                            if (this.state.value && this.state.value !== '') {
                                const reg = new RegExp(this.state.value.split(' ').join('|'), 'gi');
                                const finalString = propValue.replace(reg, (str) => {
                                    return `<span class="${this.componentUtils.className('__list-item-highlight')} s-highlight"
                                                >${str}</span>`;
                                });
                                item[propName] = finalString;
                            }
                        }
                    }
                }
                if (matchFilter) {
                    matchedItemsCount++;
                }
                return matchFilter;
            });
            // @ts-ignore
            this.state.filteredItems = filteredItems;
            this.state.isLoading = false;
            this.requestUpdate();
        });
    }
    select(idx) {
        // set the selected idx
        this._setPreselectedItemByIdx(idx);
    }
    selectAndValidate(idx) {
        // set the selected idx
        this._setPreselectedItemByIdx(idx);
        // validate
        this.validate();
    }
    selectValidateAndClose(idx) {
        // set the selected idx
        this._setPreselectedItemByIdx(idx);
        // validate
        this.validateAndClose();
    }
    _setPreselectedItemByIdx(idx) {
        // check if the component is in not selectable mode
        if (this.props.notSelectable)
            return;
        this.state.preselectedItemIdx = idx;
        this.state.preselectedItem = this.state.items[idx];
        this.requestUpdate();
    }
    _updateListSizeAndPosition() {
        //   if (!__isFocus(this.$input)) return;
        if (!this.state.isActive)
            return;
        const marginTop = __getStyleProperty(this.$list, 'marginTop'), marginLeft = __getStyleProperty(this.$list, 'marginLeft'), marginRight = __getStyleProperty(this.$list, 'marginRight'), marginBottom = __getStyleProperty(this.$list, 'marginBottom');
        const distanceTop = __distanceFromElementTopToViewportTop(this.$input);
        const distanceBottom = __distanceFromElementTopToViewportBottom(this.$input) -
            this.$input.clientHeight;
        let maxHeight;
        if (distanceTop > distanceBottom) {
            this.$container.classList.add('s-filtrable-input--top');
            this.$list.style.top = `auto`;
            this.$list.style.bottom = `calc(100% - ${marginBottom})`;
            maxHeight = distanceTop - parseInt(marginTop);
        }
        else {
            this.$container.classList.remove('s-filtrable-input--top');
            this.$list.style.bottom = `auto`;
            this.$list.style.top = `calc(100% - ${marginTop})`;
            maxHeight = distanceBottom - parseInt(marginBottom);
        }
        this.$list.style.maxHeight = `${maxHeight}px`;
    }
    render() {
        var _a, _b, _c, _d, _e, _f;
        return html `
            <ul
                class="s-filtrable-input__list ${this.componentUtils.className('__list')}"
            >
                ${this.state.isLoading
            ? html `
                          <li
                              class="s-filtrable-input__list-item s-filtrable-input__list-loading ${this.componentUtils.className('__list-item __list-loading')}"
                          >
                              ${(_c = (_b = (_a = this.props).templates) === null || _b === void 0 ? void 0 : _b.call(_a, {
                type: 'loading',
                html,
            })) !== null && _c !== void 0 ? _c : 
            // @ts-ignore
            this.state.baseTemplates({
                type: 'loading',
                html,
            })}
                          </li>
                      `
            : !this.state.isLoading &&
                this.state.filteredItems.length <= 0
                ? html `
                          <li
                              class="s-filtrable-input__list-item s-filtrable-input__list-no-item  ${this.componentUtils.className('__list-item __list-no-item')}"
                          >
                              ${(_f = (_e = (_d = this.props).templates) === null || _e === void 0 ? void 0 : _e.call(_d, {
                    type: 'empty',
                    html,
                })) !== null && _f !== void 0 ? _f : 
                // @ts-ignore
                this.state.baseTemplates({
                    type: 'empty',
                    html,
                })}
                          </li>
                      `
                : !this.state.isLoading && this.state.filteredItems.length
                    ? this.state.filteredItems.map((item, idx) => {
                        var _a, _b, _c;
                        return idx < this.state.displayedMaxItems
                            ? html `
                                    <li
                                        @click=${() => this.selectAndValidate(idx)}
                                        @dblclick=${() => this.selectValidateAndClose(idx)}
                                        @focus=${() => this._setPreselectedItemByIdx(idx)}
                                        style="z-index: ${999999999 - idx}"
                                        tabindex="0"
                                        class="s-filtrable-input__list-item ${this.componentUtils.className('__list-item') +
                                ' ' +
                                (this.state.selectedItemIdx === idx
                                    ? 'active'
                                    : '')}"
                                        hoverable
                                    >
                                        ${(_c = (_b = (_a = this.props).templates) === null || _b === void 0 ? void 0 : _b.call(_a, {
                                type: 'item',
                                html,
                                unsafeHTML,
                                item,
                                idx,
                            })) !== null && _c !== void 0 ? _c : 
                            // @ts-ignore
                            this.state.baseTemplates({
                                type: 'item',
                                html,
                                unsafeHTML,
                                item,
                                idx,
                            })}
                                    </li>
                                `
                            : '';
                    })
                    : ''}
            </ul>
        `;
    }
}
/**
 * @name            define
 * @type            Function
 *
 * This function allows you to define (register) your custom element with some default
 * props if needed.
 *
 * @param           {any}           [props={}]              Some default props you want to set for your custom element
 * @param           {String}        [tagName='s-filtrable-input']       The tagName associated to this custom element
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export function define(props = {}, tagName = 's-filtrable-input') {
    __SLitComponent.setDefaultProps(tagName, props);
    // @ts-ignore
    customElements.define(tagName, SFiltrableInput);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbHRyYWJsZUlucHV0Q29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZpbHRyYWJsZUlucHV0Q29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFM0QsT0FBTyxtQ0FBbUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUNoRyxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUc1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUV4RSxPQUFPLE9BQU8sTUFBTSx5Q0FBeUMsQ0FBQztBQUU5RCxPQUFPLHdDQUF3QyxNQUFNLG9FQUFvRSxDQUFDO0FBQzFILE9BQU8sa0JBQWtCLE1BQU0sbURBQW1ELENBQUM7QUFDbkYsT0FBTyxxQ0FBcUMsTUFBTSxpRUFBaUUsQ0FBQztBQUdwSCxPQUFPLFFBQVEsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RCxPQUFPLFdBQVcsTUFBTSxpREFBaUQsQ0FBQztBQUMxRSxPQUFPLGFBQWEsTUFBTSwrQ0FBK0MsQ0FBQztBQUUxRSxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sOEJBQThCLENBQUM7QUFJakQsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLGVBQWU7SUFpQ3hEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtZQUNELGNBQWMsRUFBRTtnQkFDWixTQUFTLEVBQUUsbUNBQW1DO2FBQ2pEO1NBQ0osQ0FBQyxDQUNMLENBQUM7UUF2Qk4sVUFBSyxHQUFHO1lBQ0osYUFBYSxFQUFFLFNBQVM7WUFDeEIsZUFBZSxFQUFFLFNBQVM7WUFDMUIs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