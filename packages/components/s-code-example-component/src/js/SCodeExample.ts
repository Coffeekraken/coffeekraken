import __SComponentUtils, { SLitElement, ISComponentUtilsDefaultProps } from '@coffeekraken/s-component-utils';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import { css, html, unsafeCSS } from 'lit';
import { html as __unsafeHTML } from 'lit/static-html.js';
import { property, query, queryAssignedNodes } from 'lit/decorators.js';

import __hljs from 'highlight.js/lib/core';
import __langJavascript from 'highlight.js/lib/languages/javascript';
import __langHtml from 'highlight.js/lib/languages/xml';
import __langBash from 'highlight.js/lib/languages/bash';
import __langPhp from 'highlight.js/lib/languages/php';
import __langCss from 'highlight.js/lib/languages/css';

// @ts-ignore
import __css from '../css/s-code-example.css';
import { webcomponent as __SClipboardCopy } from '@coffeekraken/s-clipboard-copy-component';
import __SCodeExampleComponentInterface from './interface/SCodeExampleComponentInterface';

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

    _component: __SComponentUtils;
    _$copy = undefined;

    @property()
    _items: HTMLElement[] = [];

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
            componentUtils: {
                interface: __SCodeExampleComponentInterface,
                defaultProps: {},
            },
        });

        const languages = {
            html: __langHtml,
            javascript: __langJavascript,
            js: __langJavascript,
            php: __langPhp,
            bash: __langBash,
            shell: __langBash,
            css: __langCss,
            ...(this._component.props.languages ?? {}),
        };

        Object.keys(languages).forEach((lang) => {
            __hljs.registerLanguage(lang, languages[lang]);
        });
    }
    async firstUpdated() {
        this.$templates.forEach(($template: HTMLElement) => {
            if (!$template.getAttribute) return;
            this._items = [
                ...this._items,
                {
                    id:
                        $template.getAttribute('id') ??
                        $template.getAttribute('language') ??
                        $template.getAttribute('lang') ??
                        'html',
                    lang: $template.getAttribute('language') ?? $template.getAttribute('lang') ?? 'html',
                    // @ts-ignore
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

        await __wait(500);
        return true;
    }
    // createRenderRoot() {
    //     return this;
    // }
    render() {
        return html`
            <div
                class="${this._component?.className()}"
                ?mounted="${
                    // @ts-ignore
                    this.mounted
                }"
                ?default-style="${
                    // @ts-ignore
                    this.defaultStyle
                }"
                toolbar-position="${
                    // @ts-ignore
                    this.toolbarPosition
                }"
            >
                <div class="templates">
                    <slot></slot>
                </div>

                ${this._component
                    ? html`<header class="${this._component.className('__nav')}">
                          <ol class="${this._component.className('__tabs', 's-tabs')}">
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
                          ${
                              // @ts-ignore
                              this.toolbarPosition === 'nav'
                                  ? html`
                                        <div class="${this._component.className('__toolbar')}">
                                            <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                                        </div>
                                    `
                                  : ''
                          }
                      </header>`
                    : ''}
                ${this._component
                    ? html`
                          <div class="${this._component.className('__content')}">
                              ${
                                  // @ts-ignore
                                  this.toolbarPosition !== 'nav'
                                      ? html`
                                            <div class="${this._component?.className('__toolbar')}">
                                                <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                                            </div>
                                        `
                                      : ''
                              }
                              ${(this._items ?? []).map(
                                  (item) => html`
                                      <pre
                                          class="${this._component.className('__code')}"
                                          style="line-height:0;"
                                          id="${item.id ?? item.lang}"
                                          ?active="${this._activeTabId === (item.id ?? item.lang)}"
                                      >
                            <code lang="${item.lang ?? item.id}" class="language-${item.lang} ${item.lang} ${this
                                          ._component.props.defaultStyle
                                          ? 'hljs'
                                          : ''}">
                                
                                ${
                                          // @ts-ignore
                                          __unsafeHTML([item.code])
                                      }
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
        const $content = <HTMLElement>this.shadowRoot?.querySelector(`pre#${id} code`);
        if ($content.hasAttribute('inited')) return;
        $content.setAttribute('inited', 'true');

        const highlightedCode = __hljs
            .highlight($content?.innerHTML.replace(/\<\!\-\-\?lit\$.*\$\-\-\>/g, ''), {
                language: <string>$content.getAttribute('lang'),
            })
            .value.trim();
        $content.innerHTML = highlightedCode;
    }
    copy() {
        const id = this._activeTabId;
        const item = this._items.filter((i) => i.id === id)[0];
        // @ts-ignore
        this.$copy.copy(item.code);
    }
}

export function webcomponent(props: Partial<ISCodeExampleComponentProps> = {}, tagName = 's-code-example') {
    __SComponentUtils.setDefaultProps(tagName, props);
    customElements.define(tagName, SCodeExample);
}
