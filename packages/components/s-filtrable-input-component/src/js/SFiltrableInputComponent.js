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
                        ? this.props.label({ item })
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
            let searchValue = this.state.value;
            if (this.props.searchValuePreprocess) {
                searchValue = this.props.searchValuePreprocess(searchValue);
            }
            let filteredItems = items.map(item => __clone(item));
            // custom function
            if (this.props.filterItems) {
                filteredItems = yield this.props.filterItems(filteredItems, searchValue, this.state);
            }
            else {
                let matchedItemsCount = 0;
                filteredItems = filteredItems
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
                            const reg = new RegExp(searchValue.split(' ').join('|'), 'gi');
                            if (propValue.match(reg)) {
                                matchFilter = true;
                                if (searchValue && searchValue !== '') {
                                    const reg = new RegExp(searchValue.split(' ').join('|'), 'gi');
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
            }
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