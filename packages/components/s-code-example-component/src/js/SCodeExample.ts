import { define as __SClipboardCopy } from '@coffeekraken/s-clipboard-copy-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __hljs from 'highlight.js/lib/core';
import __langBash from 'highlight.js/lib/languages/bash';
import __langCss from 'highlight.js/lib/languages/css';
import __langJavascript from 'highlight.js/lib/languages/javascript';
import __langPhp from 'highlight.js/lib/languages/php';
import __langHtml from 'highlight.js/lib/languages/xml';
import { css, html, unsafeCSS } from 'lit';
import { property, query, queryAssignedNodes } from 'lit/decorators.js';
// @ts-ignore
import __css from '../css/s-code-example.css';
import __SCodeExampleComponentInterface from './interface/SCodeExampleComponentInterface';

__SClipboardCopy();

export interface ISCodeExampleComponentProps {
    theme: string;
    active: string;
    toolbar: 'copy'[];
    toolbarPosition: 'content' | 'nav';
    defaultStyleClass: any;
    lines: number;
    moreLabel: string;
    lessLabel: string;
    moreAction: 'toggle' | string;
    more: boolean;
}

export default class SCodeExample extends __SLitComponent {
    static get properties() {
        return __SLitComponent.properties({}, __SCodeExampleComponentInterface);
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    _$copy = undefined;
    _$root;
    _$pre;
    _$content;
    _more;

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
        super(
            __deepMerge({
                componentUtils: {
                    interface: __SCodeExampleComponentInterface,
                },
            }),
        );

        const languages = {
            html: __langHtml,
            javascript: __langJavascript,
            js: __langJavascript,
            php: __langPhp,
            bash: __langBash,
            shell: __langBash,
            css: __langCss,
            ...(this.props.languages ?? {}),
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
            if (this._items[0]) {
                this.setActiveTab(this._items[0].id);
            }
        }

        await __wait(500);

        this._$content = this.shadowRoot?.querySelector('.s-code-example__content');
        this._$pre = this.shadowRoot?.querySelector('.s-code-example__code');
        this._$root = this.shadowRoot?.querySelector('.s-code-example');

        return true;
    }
    setActiveTabByTab(e) {
        this.setActiveTab(e.target.id);
    }
    async setActiveTab(id) {
        await __wait();
        this._activeTabId = id;
        this.initPrismOnTab(id);
    }
    async setMoreClass() {
        await __wait(500);
        if (this._more) {
            this._$root.classList.add('s-code-example--more');
        } else {
            this._$root.classList.remove('s-code-example--more');
        }
    }
    toggleMore() {
        this._more = !this._more;
        this.setMoreClass();
    }
    initPrismOnTab(id) {
        const $content = <HTMLElement>this.shadowRoot?.querySelector(`pre#${id} code`);
        if ($content.hasAttribute('inited')) {
            this.setMoreClass();
            return;
        }
        $content.setAttribute('inited', 'true');
        __hljs.highlightElement($content);
        this.setMoreClass();
    }
    copy() {
        const id = this._activeTabId;
        const item = this._items.filter((i) => i.id === id)[0];
        // @ts-ignore
        this.$copy.copy(item.code);
    }
    render() {
        return html`
            <div
                class="${this.componentUtils.className()} ${
            this.props.more ? this.componentUtils.className('more') : ''
        }"
                ?lines="${
                    // @ts-ignore
                    this.lines
                }"
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

                <header class="${this.componentUtils.className('__nav')}">
                    <ol class="${this.componentUtils.className('__tabs', 's-tabs')}">
                        ${(this._items ?? []).map(
                            (item) => html`
                                <li
                                    class="${this.componentUtils.className('__tab')}"
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
                                  <div class="${this.componentUtils.className('__toolbar')}">
                                      <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                                  </div>
                              `
                            : ''
                    }
                </header>
                <div
                    class="${this.componentUtils.className('__content')}"
                    style="--max-lines: ${this.props.lines ?? 99999999};"
                >
                    ${
                        // @ts-ignore
                        this.toolbarPosition !== 'nav'
                            ? html`
                                  <div class="${this.componentUtils.className('__toolbar')}">
                                      <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                                  </div>
                              `
                            : ''
                    }
                    ${(this._items ?? []).map(
                        (item) => html`
                            <pre
                                class="${this.componentUtils.className('__code')}"
                                style="line-height:0;"
                                id="${item.id ?? item.lang}"
                                ?active="${this._activeTabId === (item.id ?? item.lang)}"
                            >
                            <code lang="${item.lang ?? item.id}" class="language-${item.lang} ${item.lang} ${this.props
                                .defaultStyle
                                ? 'hljs'
                                : ''}">${
                                // @ts-ignore
                                item.code.trim()
                            }</code>
                        </pre>
                        `,
                    )}
                    <div class="${this.componentUtils.className('__more-bar')}">
                        ${
                            // @ts-ignore
                            this._moreAction === 'toggle'
                                ? html`
                                      <a
                                          class="${this.componentUtils.className('__more-button', 's-btn')}"
                                          @click="${this.toggleMore}"
                                      >
                                          ${
                                              // @ts-ignore
                                              this._more
                                                  ? html` ${this.props.lessLabel ?? 'Show less'} `
                                                  : html` ${this.props.moreLabel ?? 'Show more'} `
                                          }
                                      </a>
                                  `
                                : html`
                                      <a
                                          class="${this.componentUtils.className(
                                              '__more-button',
                                              's-btn s-color--accent',
                                          )}"
                                          href="${
                                              // @ts-ignore
                                              this._moreAction
                                          }"
                                      >
                                          ${
                                              // @ts-ignore
                                              this._more
                                                  ? html` ${this.props.lessLabel ?? 'Show less'} `
                                                  : html` ${this.props.moreLabel ?? 'Show more'} `
                                          }
                                      </a>
                                  `
                        }                        
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

export function define(props: Partial<ISCodeExampleComponentProps> = {}, tagName = 's-code-example') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SCodeExample);
}
