import __SComponentUtils, { SLitElement, ISComponentUtilsDefaultProps } from '@coffeekraken/s-component-utils';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import { css, html, property, query, queryAssignedNodes, unsafeCSS } from 'lit-element';

import __hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
__hljs.registerLanguage('javascript', javascript);

import __css from '../css/s-code-example.css';
import { webcomponent as __SClipboardCopy } from '@coffeekraken/s-clipboard-copy-component';
import __SCodeExampleComponentInterface from './interface/SCodeExampleComponentInterface.ts';

__SClipboardCopy();

export interface ISCodeExampleComponentProps extends ISComponentUtilsDefaultProps {
    theme: string;
    active: string;
    toolbar: 'copy'[];
    toolbarPosition: 'content' | 'nav';
    defaultStyleClass: any;
}

export default class SCodeExample extends SLitElement {
    static get properties() {
        return __SComponentUtils.properties({}, __SCodeExampleComponentInterface);
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    _component = undefined;
    _$copy = undefined;

    @property()
    _items = [];

    @property()
    _activeTabId = undefined;

    @property({
        type: String,
    })
    active;

    @property()
    props;

    @query('s-clipboard-copy')
    $copy;

    @query('.templates')
    $templatesContainer;

    @queryAssignedNodes()
    $templates;

    constructor() {
        super();
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            interface: __SCodeExampleComponentInterface,
            defaultProps: {},
        });
    }
    firstUpdated() {
        this.$templates.forEach(($template) => {
            if (!$template.getAttribute) return;
            this._items = [
                ...this._items,
                {
                    id:
                        $template.getAttribute('id') ??
                        $template.getAttribute('language') ??
                        $template.getAttribute('lang'),
                    lang: $template.getAttribute('language') ?? $template.getAttribute('lang'),
                    code: $template.innerHTML,
                },
            ];
            $template.remove();
        });

        // active idx
        if (this.active) {
            this.setActiveTab(this.active);
        } else {
            this.setActiveTab(this._items[0].id);
        }
    }
    // createRenderRoot() {
    //     return this;
    // }
    render() {
        return html`
            <div class="${this._component?.className()}" toolbar-position="${this._component?.props.toolbarPosition}">
                <div class="templates">
                    <slot></slot>
                </div>

                ${this._component
                    ? html`<header class="${this._component.className('__nav')}">
                          <ol
                              class="${this._component.className(
                                  '__tabs',
                                  this._component.props.defaultStyleClasses.main,
                              )}"
                          >
                              ${(this._items ?? []).map(
                                  (item) => html`
                                      <li
                                          class="${this._component.className('__tab')}"
                                          id="${item.id}"
                                          ?active="${this._activeTabId === item.id}"
                                          @click="${this.setActiveTabByTab}"
                                      >
                                          ${item.lang}
                                      </li>
                                  `,
                              )}
                          </ol>
                          ${this._component.props.toolbarPosition === 'nav'
                              ? html`
                                    <div class="${this._component.className('__toolbar')}">
                                        <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                                    </div>
                                `
                              : ''}
                      </header>`
                    : ''}
                ${this._component
                    ? html`
                          <div class="${this._component.className('__content')}">
                              ${this._component.props.toolbarPosition !== 'nav'
                                  ? html`
                                        <div class="${this._component.className('__toolbar')}">
                                            <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                                        </div>
                                    `
                                  : ''}
                              ${(this._items ?? []).map(
                                  (item) => html`
                                      <pre
                                          class="${this._component.className('__code')}"
                                          style="line-height:0;"
                                          id="${item.id ?? item.lang}"
                                          ?active="${this._activeTabId === (item.id ?? item.lang)}"
                                      >
                            <code class="language-${item.lang} ${item.lang} ${this._component.props.defaultStyle
                                          ? 'hljs'
                                          : ''}">
                                ${item.code}
                            </code>
                        </pre>
                                  `,
                              )}
                          </div>
                      `
                    : ''}
            </div>
        `;
    }
    setActiveTabByTab(e) {
        this.setActiveTab(e.target.id);
    }
    async setActiveTab(id) {
        await __wait();
        this._activeTabId = id;
        this.initPrismOnTab(id);
    }
    initPrismOnTab(id) {
        const $content = this.shadowRoot.querySelector(`pre#${id} code`);
        if ($content.hasAttribute('inited')) return;
        $content.setAttribute('inited', true);

        const highlightedCode = __hljs.highlight($content?.innerHTML, { language: 'js' }).value.trim();
        $content?.innerHTML = highlightedCode;
    }
    copy() {
        const id = this._activeTabId;
        const item = this._items.filter((i) => i.id === id)[0];
        this.$copy.copy(item.code);
    }
}

export function webcomponent(props: Partial<ISCodeExampleComponentProps> = {}, tagName = 's-code-example') {
    __SComponentUtils.setDefaultProps(tagName, props);
    customElements.define(tagName, SCodeExample);
}
