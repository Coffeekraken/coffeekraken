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
import __SFiltrableInputComponentInterface from './interface/SFiltrableInputComponentInterface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __clone from '@coffeekraken/sugar/shared/object/clone';
import __distanceFromElementTopToViewportBottom from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportBottom';
import __getStyleProperty from '@coffeekraken/sugar/js/dom/style/getStyleProperty';
import __distanceFromElementTopToViewportTop from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportTop';
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
            this.$itemTemplateElm = this.querySelector('template#item');
            this.$noItemTemplateElm = this.querySelector('template#no-item');
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
                    {{value}}
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
                const value = e.target.value;
                this.state.value = value;
                this.state.displayedMaxItems = this.props.maxItems;
                this.filterItems();
            });
            // @ts-ignore
            this.$input.classList.add(this.componentUtils.className('__input'));
            this.$container = this;
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
        });
    }
    filterItems(needUpdate = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let items = this.state.items;
            if (needUpdate) {
                try {
                    this.state.isLoading = true;
                    // const res = await this.component.dispatchSyncEvent('update', {
                    //     value: this.$input.value,
                    // });
                    // if (res && res.length) items = res;
                    // this.update({
                    //     items: res,
                    //     isLoading: false,
                    // });
                }
                catch (e) { }
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
            this.state.filteredItems = filteredItems;
            this.requestUpdate();
        });
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
            <ul class={this.componentUtils.className('__list', 's-list:interactive')}>
                ${this.state.isLoading
            ? html `
                              <li
                                  class="${this.componentUtils.className('__list-item __list-loading')}"
                              >
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
                : this.state.isLoading &&
                    this.state.filteredItems.length
                    ? this.state.filteredItems.map((item, idx) => {
                        return html `
                                  <!-- onfocus={() => _setPreselectedItemIdx(idx) }
        ondblclick={() => _selectAndValidate(idx) } -->

                                  <li
                                      style="z-index: ${999999999 - idx}"
                                      tabindex="${this.state.isActive
                            ? idx
                            : -1}"
                                      class="${this.componentUtils.className('__list-item') +
                            ' ' +
                            (this.state.selectedItemIdx === idx
                                ? 'active'
                                : '')}"
                                      hoverable
                                  >
                                      <!-- <s-raw-html
                                    html={ component.renderHandlebars(state.itemTemplate, item) }
                                    ></s-raw-html> -->
                                  </li>
                              `;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbHRyYWJsZUlucHV0Q29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZpbHRyYWJsZUlucHV0Q29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUUzQyxPQUFPLG1DQUFtQyxNQUFNLCtDQUErQyxDQUFDO0FBQ2hHLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRzVELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLE9BQU8sT0FBTyxNQUFNLHlDQUF5QyxDQUFDO0FBRTlELE9BQU8sd0NBQXdDLE1BQU0sb0VBQW9FLENBQUM7QUFDMUgsT0FBTyxrQkFBa0IsTUFBTSxtREFBbUQsQ0FBQztBQUNuRixPQUFPLHFDQUFxQyxNQUFNLGlFQUFpRSxDQUFDO0FBT3BILGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSw4QkFBOEIsQ0FBQztBQUlqRCxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsZUFBZTtJQTRCeEQ7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsWUFBWSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFNBQVMsRUFBRSxtQ0FBbUM7YUFDakQ7U0FDSixDQUFDLENBQ0wsQ0FBQztRQXhCTixVQUFLLEdBQUc7WUFDSixZQUFZLEVBQUUsU0FBUztZQUN2QixjQUFjLEVBQUUsU0FBUztZQUN6QixlQUFlLEVBQUUsU0FBUztZQUMxQixrQkFBa0IsRUFBRSxDQUFDLENBQUM7WUFDdEIsZUFBZSxFQUFFLENBQUMsQ0FBQztZQUNuQixpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLEtBQUssRUFBRSxFQUFFO1lBQ1QsUUFBUSxFQUFFLEtBQUs7WUFDZixTQUFTLEVBQUUsS0FBSztZQUNoQixLQUFLLEVBQUUsRUFBRTtZ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