import { html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import __SFiltrableInputComponentInterface from './interface/SFiltrableInputComponentInterface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __copy from '@coffeekraken/sugar/js/clipboard/copy';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

import __clone from '@coffeekraken/sugar/shared/object/clone';
import __SComponent from '@coffeekraken/s-lit-component';
import __distanceFromElementTopToViewportBottom from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportBottom';
import __getStyleProperty from '@coffeekraken/sugar/js/dom/style/getStyleProperty';
import __distanceFromElementTopToViewportTop from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportTop';
import __isFocus from '@coffeekraken/sugar/js/dom/is/focus';
import __isFocusWithin from '@coffeekraken/sugar/js/dom/is/focusWithin';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import __stripTags from '@coffeekraken/sugar/js/dom/manipulate/stripTags';
import __onScrollEnd from '@coffeekraken/sugar/js/dom/detect/onScrollEnd';

// @ts-ignore
import __css from '../css/s-filtrable-input.css';

export interface ISFiltrableInputComponentProps {}

export default class SFiltrableInput extends __SLitComponent {
    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    $container: HTMLElement;
    $list: HTMLElement;
    $input: HTMLElement;
    $itemTemplateElm: HTMLElement;
    $noItemTemplateElm: HTMLElement;
    $loadingTemplateElm: HTMLElement;

    state = {
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

    constructor() {
        super(
            __deepMerge({
                litComponent: {
                    shadowDom: false,
                },
                componentUtils: {
                    interface: __SFiltrableInputComponentInterface,
                },
            }),
        );

        this.state.displayedMaxItems = this.props.maxItems;
        console.log(this.props);
    }

    async firstUpdated() {
        // try to get the item and no item template elm
        this.$itemTemplateElm = this.querySelector('template#item');
        this.$noItemTemplateElm = this.querySelector('template#no-item');
        this.$loadingTemplateElm = this.querySelector('template#loading');
        this.$input = <any>this.querySelector('input');

        if (!this.props.bare) {
            // @ts-ignore
            this.$input.classList?.add('s-input');
        }

        if (this.$loadingTemplateElm) {
            // @ts-ignore
            this.state.loadingTemplate = this.$loadingTemplateElm.innerHTML;
        } else {
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
        } else {
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
        } else {
            // @ts-ignore
            this.state.noItemTemplate = `
                <div class="${this.componentUtils.className('__no-item')}"> 
                    ${this.props.noItemText}
                </div>
            `;
        }
        if (!this.$input) {
            throw new Error(
                `<red>[s-filtrable-input]</red> In order to work you MUST have a valid input tag inside your s-filtrable-input component`,
            );
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
    }

    async filterItems(needUpdate = true) {
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
            } catch (e) {}
        }

        let matchedItemsCount = 0;
        const filteredItems = items
            .map((item) => __clone(item))
            .filter((item) => {
                if (matchedItemsCount >= this.state.displayedMaxItems)
                    return false;

                if (!this.props.filtrable.length) return true;

                let matchFilter = false;
                for (let i = 0; i < Object.keys(item).length; i++) {
                    const propName = Object.keys(item)[i],
                        propValue = item[propName];

                    // prevent not string value
                    if (typeof propValue !== 'string') continue;

                    // check if the current propName is specified in the filtrable list
                    if (this.props.filtrable.indexOf(propName) !== -1) {
                        const reg = new RegExp(this.state.value, 'gi');
                        if (propValue.match(reg)) {
                            matchFilter = true;
                            if (this.state.value && this.state.value !== '') {
                                const reg = new RegExp(this.state.value, 'gi');
                                const finalString = propValue.replace(
                                    reg,
                                    (str) => {
                                        return `<span class="${this.componentUtils.className(
                                            '__list-item-highlight',
                                        )} s-highlight">${str}</span>`;
                                    },
                                );
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
    }

    _updateListSizeAndPosition() {
        //   if (!__isFocus(this.$input)) return;
        if (!this.state.isActive) return;

        const marginTop = __getStyleProperty(this.$list, 'marginTop'),
          marginLeft = __getStyleProperty(this.$list, 'marginLeft'),
          marginRight = __getStyleProperty(this.$list, 'marginRight'),
          marginBottom = __getStyleProperty(this.$list, 'marginBottom');
        const distanceTop = __distanceFromElementTopToViewportTop(this.$input);
        const distanceBottom =
          __distanceFromElementTopToViewportBottom(this.$input) -
          this.$input.clientHeight;
        let maxHeight;

        if (distanceTop > distanceBottom) {
          this.$container.classList.add('s-filtrable-input--top');
          this.$list.style.top = `auto`;
          this.$list.style.bottom = `calc(100% - ${marginBottom})`;
          maxHeight = distanceTop - parseInt(marginTop);
        } else {
          this.$container.classList.remove('s-filtrable-input--top');
          this.$list.style.bottom = `auto`;
          this.$list.style.top = `calc(100% - ${marginTop})`;
          maxHeight = distanceBottom - parseInt(marginBottom);
        }

        this.$list.style.maxHeight = `${maxHeight}px`;
      },

    render() {
        return html`
            <ul class={this.componentUtils.className('__list', 's-list:interactive')}>
                ${
                    this.state.isLoading
                        ? html`
                              <li
                                  class="${this.componentUtils.className(
                                      '__list-item __list-loading',
                                  )}"
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
                        ? html`
                              <li
                                  class="${this.componentUtils.className(
                                      '__list-item __list-no-item',
                                  )}"
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
                              return html`
                                  <!-- onfocus={() => _setPreselectedItemIdx(idx) }
        ondblclick={() => _selectAndValidate(idx) } -->

                                  <li
                                      style="z-index: ${999999999 - idx}"
                                      tabindex="${this.state.isActive
                                          ? idx
                                          : -1}"
                                      class="${this.componentUtils.className(
                                          '__list-item',
                                      ) +
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
                        : ''
                }
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
export function define(
    props: Partial<ISFiltrableInputComponentProps> = {},
    tagName = 's-filtrable-input',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    // @ts-ignore
    customElements.define(tagName, SFiltrableInput);
}
