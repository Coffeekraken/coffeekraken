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
import __cursorToEnd from '@coffeekraken/sugar/js/dom/input/cursorToEnd';
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
        this._templatesFromHtml = {};
        this.state = {
            baseTemplates: {},
            preselectedItem: {},
            preselectedItemIdx: -1,
            selectedItemIdx: -1,
            selectedItem: {},
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
            // input
            this.$input = this.querySelector('input');
            this.$input.setAttribute('autocomplete', 'off');
            // @ts-ignore
            this.$form = this.$input.form;
            // prevent from sending form if search is opened
            this.$form.addEventListener('submit', e => {
                if (this.state.isActive) {
                    e.preventDefault();
                }
            });
            // grab templates
            this._grabTemplates();
            if (!this.props.bare) {
                // @ts-ignore
                (_a = this.$input.classList) === null || _a === void 0 ? void 0 : _a.add('s-input');
            }
            // @ts-ignore
            this.$input.addEventListener('keyup', (e) => {
                this.state.isActive = true;
                // @ts-ignore
                const value = e.target.value;
                this.state.value = value;
                this.state.displayedMaxItems = this.props.maxItems;
                this.filterItems();
            });
            this.$input.addEventListener('focus', (e) => {
                this.state.isActive = true;
                this.filterItems();
                this._updateListSizeAndPosition();
            });
            // @ts-ignore
            this.$input.classList.add(this.componentUtils.className('__input'));
            this.$container = this;
            this.$container.classList.add('s-filtrable-input');
            this.$container.classList.add(this.componentUtils.className());
            // @ts-ignore
            this.$list = this.querySelector('ul');
            // @ts-ignore
            this.$dropdown = this.querySelector(`.s-filtrable-input__dropdown`);
            this.prepend(this.$input);
            this.filterItems();
            document.addEventListener('scroll', () => {
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
            // open if a value exists
            if (this.$input.value) {
                this.state.value = this.$input.value;
                __cursorToEnd(this.$input);
                this.filterItems(true);
            }
        });
    }
    _grabTemplates() {
        this.querySelectorAll('template').forEach($template => {
            if (!$template.hasAttribute('type'))
                return;
            // @ts-ignore
            this._templatesFromHtml[$template.getAttribute('type')] = $template.innerHTML;
        });
    }
    _getTemplate(type) {
        if (this.props.templates) {
            const res = this.props.templates({
                type,
                html
            });
            if (res)
                return res;
        }
        // from template tags
        if (this._templatesFromHtml[type]) {
            return html `
                ${unsafeHTML(this._templatesFromHtml[type])}
            `;
        }
        // @ts-ignore
        return this.state.baseTemplates({
            type,
            html
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
        var _a, _b;
        // protect against not selected item
        if (this.state.preselectedItemIdx === -1)
            return;
        // set the value in the input
        if (this.preselectedItem) {
            const itemProps = __deepMerge(Object.assign({}, this.props), (_a = this.state.preselectedItem.props) !== null && _a !== void 0 ? _a : {});
            if (typeof itemProps.value === 'string' &&
                ((_b = this.preselectedItem) === null || _b === void 0 ? void 0 : _b[itemProps.value])) {
                this.$input.value = __stripTags(
                // @ts-ignore
                this.preselectedItem[itemProps.value]);
            }
            else if (typeof itemProps.value === 'function') {
                // @ts-ignore
                const v = itemProps.value({
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
        const event = new CustomEvent('selectItem', {
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
    resetSelected() {
        this.state.preselectedItemIdx = -1;
        this.state.preselectedItem = {};
        this.state.selectedItemIdx = -1;
        this.state.selectedItem = {};
    }
    reset() {
        this.resetSelected();
        this.$input.value = '';
    }
    close() {
        __cursorToEnd(this.$input);
        // this.$input.blur();
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
            // reset selected
            this.resetSelected();
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
    preselectAndValidate(idx) {
        // set the selected idx
        this._setPreselectedItemByIdx(idx);
        // validate
        this.validate();
    }
    preselectValidateAndClose(idx) {
        // set the selected idx
        this._setPreselectedItemByIdx(idx);
        // validate
        this.validateAndClose();
    }
    _setSelectedItemByIdx(idx) {
        // check if the component is in not selectable mode
        if (this.props.notSelectable)
            return;
        this.state.selectedItemIdx = idx;
        this.state.selectedItem = this.selectedItem;
        this.requestUpdate();
    }
    _setPreselectedItemByIdx(idx) {
        // check if the component is in not selectable mode
        if (this.props.notSelectable)
            return;
        this.state.preselectedItemIdx = idx;
        this.state.preselectedItem = this.preselectedItem;
        this.requestUpdate();
    }
    _updateListSizeAndPosition() {
        //   if (!__isFocus(this.$input)) return;
        if (!this.state.isActive)
            return;
        const marginTop = __getStyleProperty(this.$dropdown, 'marginTop'), marginLeft = __getStyleProperty(this.$dropdown, 'marginLeft'), marginRight = __getStyleProperty(this.$dropdown, 'marginRight'), marginBottom = __getStyleProperty(this.$dropdown, 'marginBottom');
        const distanceTop = __distanceFromElementTopToViewportTop(this.$input);
        const distanceBottom = __distanceFromElementTopToViewportBottom(this.$input) -
            this.$input.clientHeight;
        let maxHeight;
        if (distanceTop > distanceBottom) {
            this.$container.classList.add('s-filtrable-input--top');
            this.$dropdown.style.top = `auto`;
            this.$dropdown.style.bottom = `calc(100% - ${marginBottom})`;
            maxHeight = distanceTop - parseInt(marginTop);
        }
        else {
            this.$container.classList.remove('s-filtrable-input--top');
            this.$dropdown.style.bottom = `auto`;
            this.$dropdown.style.top = `calc(100% - ${marginTop})`;
            maxHeight = distanceBottom - parseInt(marginBottom);
        }
        this.$dropdown.style.maxHeight = `${maxHeight}px`;
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return html `
            <div class="s-filtrable-input__dropdown">
                <div class="s-filtrable-input__before" tabindex="0">
                    ${this._getTemplate('before')}
                </div>
                <ul class="s-filtrable-input__list">
                    ${this.state.isLoading
            ? html `
                            <li
                                class="s-filtrable-input__list-item s-filtrable-input__list-loading"
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
                                class="s-filtrable-input__list-item s-filtrable-input__list-no-item"
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
                                            @click=${() => this.preselectAndValidate(idx)}
                                            @dblclick=${() => this.preselectValidateAndClose(idx)}
                                            @focus=${() => this._setPreselectedItemByIdx(idx)}
                                            style="z-index: ${999999999 - idx}"
                                            tabindex="0"
                                            class="s-filtrable-input__list-item ${(this.state.selectedItemIdx === idx
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
                <div class="s-filtrable-input__after" tabindex="0">
                    ${(_h = (_g = this.props).templates) === null || _h === void 0 ? void 0 : _h.call(_g, {
            type: 'after',
            html,
        })}
                </div>
            </div>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbHRyYWJsZUlucHV0Q29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZpbHRyYWJsZUlucHV0Q29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFM0QsT0FBTyxtQ0FBbUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUNoRyxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUc1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUV4RSxPQUFPLGFBQWEsTUFBTSw4Q0FBOEMsQ0FBQztBQUV6RSxPQUFPLE9BQU8sTUFBTSx5Q0FBeUMsQ0FBQztBQUU5RCxPQUFPLHdDQUF3QyxNQUFNLG9FQUFvRSxDQUFDO0FBQzFILE9BQU8sa0JBQWtCLE1BQU0sbURBQW1ELENBQUM7QUFDbkYsT0FBTyxxQ0FBcUMsTUFBTSxpRUFBaUUsQ0FBQztBQUdwSCxPQUFPLFFBQVEsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RCxPQUFPLFdBQVcsTUFBTSxpREFBaUQsQ0FBQztBQUMxRSxPQUFPLGFBQWEsTUFBTSwrQ0FBK0MsQ0FBQztBQUUxRSxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sOEJBQThCLENBQUM7QUFnQ2pELE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxlQUFlO0lBbUN4RDtRQUNJLEtBQUssQ0FDRCxXQUFXLENBQUM7WUFDUixZQUFZLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLEtBQUs7YUFDbkI7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLG1DQUFtQzthQUNqRDtTQUNKLENBQUMsQ0FDTCxDQUFDO1FBM0JOLHVCQUFrQixHQUFRLEVBQUUsQ0FBQztR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