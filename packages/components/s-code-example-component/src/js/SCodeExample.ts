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
                sComponentUtils: {
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
            this.setActiveTab(this._items[0].id);
        }

        await __wait(500);
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
    initPrismOnTab(id) {
        const $content = <HTMLElement>this.shadowRoot?.querySelector(`pre#${id} code`);
        if ($content.hasAttribute('inited')) return;
        $content.setAttribute('inited', 'true');
        __hljs.highlightElement($content);
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
                class="${this.componentUtils.className()}"
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
                <div class="${this.componentUtils.className('__content')}">
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
                </div>
            </div>
        `;
    }
}

export function webcomponent(props: Partial<ISCodeExampleComponentProps> = {}, tagName = 's-code-example') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SCodeExample);
}
