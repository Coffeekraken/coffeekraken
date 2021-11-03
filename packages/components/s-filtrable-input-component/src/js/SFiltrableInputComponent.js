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
            itemTemplate: undefined,
            noItemTemplate: undefined,
            loadingTemplate: undefined,
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
        console.log(this.props);
        if (this.props.items) {
            const $itemsElm = document.querySelector(this.props.items);
            if ($itemsElm) {
                this.state.items = JSON.parse($itemsElm.innerHTML);
                this.requestUpdate();
            }
        }
        console.log(this.state);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    firstUpdated() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // try to get the item and no item template elm
            // @ts-ignore
            this.$itemTemplateElm = this.querySelector('template#item');
            // @ts-ignore
            this.$noItemTemplateElm = this.querySelector('template#no-item');
            // @ts-ignore
            this.$loadingTemplateElm = this.querySelector('template#loading');
            this.$input = this.querySelector('input');
            if (!this.props.bare) {
                // @ts-ignore
                (_a = this.$input.classList) === null || _a === void 0 ? void 0 : _a.add('s-input');
            }
            if (this.$loadingTemplateElm) {
                // @ts-ignore
                this.state.loadingTemplate = this.$loadingTemplateElm.innerHTML;
            }
            else {
                // @ts-ignore
                this.state.loadingTemplate = `
                <div class="${this.componentUtils.className('__loading')}">
                    {{value}}
                </div>
            `;
            }
            if (this.$itemTemplateElm) {
                // @ts-ignore
                this.state.itemTemplate = this.$itemTemplateElm.innerHTML;
            }
            else {
                // @ts-ignore
                this.state.itemTemplate = `
                <div class="${this.componentUtils.className('__item')}">
                    {value}}
                </div>
            `;
            }
            if (this.$noItemTemplateElm) {
                // @ts-ignore
                this.state.noItemTemplate = this.$noItemTemplateElm.innerHTML;
            }
            else {
                // @ts-ignore
                this.state.noItemTemplate = `
                <div class="${this.componentUtils.className('__no-item')}"> 
                    ${this.props.noItemText}
                </div>
            `;
            }
            if (!this.$input) {
                throw new Error(`<red>[s-filtrable-input]</red> In order to work you MUST have a valid input tag inside your s-filtrable-input component`);
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
            // @ts-ignore
            this.$list = this.querySelector('ul');
            this.prepend(this.$input);
            this.filterItems();
            document.addEventListener('scroll', this._updateListSizeAndPosition);
            this.$input.addEventListener('focus', (e) => {
                this.state.isActive = true;
                this.filterItems();
                this._updateListSizeAndPosition();
            });
            this._updateListSizeAndPosition();
            __onScrollEnd(this.$list, () => {
                var _a;
                this.state.displayedMaxItems =
                    ((_a = this.state.displayedMaxItems) !== null && _a !== void 0 ? _a : 0) +
                        this.componentUtils.props.maxItems;
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
                this._validateAndClose();
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
    _validateAndClose() {
        // protect against not selected item
        if (!this.state.preselectedItem)
            return;
        // set the value in the input
        if (this.state.preselectedItem &&
            !this.state.preselectedItem[this.props.value]) {
            throw new Error(`<red>[s-filtrable-input]</red> Sorry but the property "<yellow>${this.component.props.value}</yellow>" does not exists on your selected item`);
        }
        // @ts-ignore
        this.$input.value = __stripTags(this.state.preselectedItem[this.props.value]);
        this.state.selectedItemIdx = this.state.preselectedItemIdx;
        // @ts-ignore
        this.state.value = this.$input.value;
        this.requestUpdate();
        setTimeout(() => {
            this.close();
        }, this.props.closeTimeout);
    }
    close() {
        this.$input.focus();
        this.$input.blur();
        this.state.isActive = false;
    }
    filterItems(needUpdate = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let items = this.state.items;
            if (needUpdate) {
                // try {
                //     this.state.isLoading = true;
                //     // const res = await this.component.dispatchSyncEvent('update', {
                //     //     value: this.$input.value,
                //     // });
                //     // if (res && res.length) items = res;
                //     // this.update({
                //     //     items: res,
                //     //     isLoading: false,
                //     // });
                // } catch (e) {}
                this.state.isLoading = false;
            }
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
                        const reg = new RegExp(this.state.value, 'gi');
                        if (propValue.match(reg)) {
                            matchFilter = true;
                            if (this.state.value && this.state.value !== '') {
                                const reg = new RegExp(this.state.value, 'gi');
                                const finalString = propValue.replace(reg, (str) => {
                                    return `<span class="${this.componentUtils.className('__list-item-highlight')} s-highlight">${str}</span>`;
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
            this.requestUpdate();
            console.log('FI', this.state.filteredItems);
        });
    }
    _selectAndValidate(idx) {
        // set the selected idx
        this._setPreselectedItemIdx(idx);
        // validate and close
        this._validateAndClose();
    }
    _setPreselectedItemIdx(idx) {
        // check if the component is in not selectable mode
        if (this.props.notSelectable)
            return;
        this.state.preselectedItemIdx = idx;
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
        return html `
            <ul
                class="${this.componentUtils.className('__list', 's-list:interactive')}"
            >
                ${this.state.isLoading
            ? html `
                          <li
                              class="${this.componentUtils.className('__list-item __list-loading')}"
                          >
                              LOADING
                              <!-- <s-raw-html
          html={ component.compileMustache(state.loadingTemplate, {
            value: state.value
          }) }
        ></s-raw-html> -->
                          </li>
                      `
            : !this.state.isLoading &&
                this.state.filteredItems.length <= 0
                ? html `
                          <li
                              class="${this.componentUtils.className('__list-item __list-no-item')}"
                          >
                              <!-- <s-raw-html
          html={ component.compileMustache(state.noItemTemplate, {
            value: state.value
          }) }
        ></s-raw-html> -->
                          </li>
                      `
                : !this.state.isLoading && this.state.filteredItems.length
                    ? this.state.filteredItems.map((item, idx) => html `
                              <!-- onfocus={() => _setPreselectedItemIdx(idx) }
        ondblclick={() => _selectAndValidate(idx) } -->

                              <li
                                  style="z-index: ${999999999 - idx}"
                                  tabindex="${this.state.isActive ? idx : -1}"
                                  class="${this.componentUtils.className('__list-item') +
                        ' ' +
                        (this.state.selectedItemIdx === idx
                            ? 'active'
                            : '')}"
                                  hoverable
                              >
                                  ${unsafeHTML(this.state.itemTemplate)}
                                  <!-- <s-raw-html
                                    html={ component.renderHandlebars(state.itemTemplate, item) }
                                    ></s-raw-html> -->
                              </li>
                          `)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbHRyYWJsZUlucHV0Q29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZpbHRyYWJsZUlucHV0Q29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFM0QsT0FBTyxtQ0FBbUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUNoRyxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUc1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxPQUFPLE9BQU8sTUFBTSx5Q0FBeUMsQ0FBQztBQUU5RCxPQUFPLHdDQUF3QyxNQUFNLG9FQUFvRSxDQUFDO0FBQzFILE9BQU8sa0JBQWtCLE1BQU0sbURBQW1ELENBQUM7QUFDbkYsT0FBTyxxQ0FBcUMsTUFBTSxpRUFBaUUsQ0FBQztBQUdwSCxPQUFPLFFBQVEsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RCxPQUFPLFdBQVcsTUFBTSxpREFBaUQsQ0FBQztBQUMxRSxPQUFPLGFBQWEsTUFBTSwrQ0FBK0MsQ0FBQztBQUUxRSxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sOEJBQThCLENBQUM7QUFJakQsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLGVBQWU7SUFtQ3hEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtZQUNELGNBQWMsRUFBRTtnQkFDWixTQUFTLEVBQUUsbUNBQW1DO2FBQ2pEO1NBQ0osQ0FBQyxDQUNMLENBQUM7UUF6Qk4sVUFBSyxHQUFHO1lBQ0osWUFBWSxFQUFFLFNBQVM7WUFDdkIsY0FBYyxFQUFFLFNBQVM7WUFDekIsZUFBZSxFQUFFLFNBQVM7WUFDMUIsZUFBZSxFQUFFLFNB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