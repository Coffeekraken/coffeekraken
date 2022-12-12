import { define as __SClipboardCopy } from '@coffeekraken/s-clipboard-copy-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __hljs from 'highlight.js/lib/core';
import __langBash from 'highlight.js/lib/languages/bash';
import __langTwig from 'highlight.js/lib/languages/twig';
import __langCss from './languages/css';
// import __langCss from 'highlight.js/lib/languages/css';
import { __scrollTo } from '@coffeekraken/sugar/dom';
import type { IScrollToSettings } from '@coffeekraken/sugar/js/dom/scroll/scrollTo';
import { __decodeHtmlEntities } from '@coffeekraken/sugar/string';
import __langJavascript from 'highlight.js/lib/languages/javascript';
import __langPhp from 'highlight.js/lib/languages/php';
import __langHtml from 'highlight.js/lib/languages/xml';
import { css, html, unsafeCSS } from 'lit';
import { query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SCodeExampleComponentInterface from './interface/SCodeExampleComponentInterface';

// // @ts-ignore
import __prettier from 'prettier/esm/standalone.mjs';
// @ts-ignore
import __prettierJs from 'prettier/esm/parser-babel.mjs';
// @ts-ignore
import __prettierHtml from 'prettier/esm/parser-html.mjs';
// @ts-ignore
import __prettierPhp from '@prettier/plugin-php/standalone';
import __prettierCss from 'prettier/esm/parser-postcss.mjs';

import __define from './define';

// @ts-ignore
import __css from '../../../../src/css/s-code-example.css'; // relative to /dist/pkg/esm/js

__SClipboardCopy();

export interface ISCodeExampleComponentProps {
    theme: string;
    active: string;
    toolbar: 'copy'[];
    toolbarPosition: 'content' | 'nav';
    lines: number;
    items: any[];
    moreLabel: string;
    lessLabel: string;
    moreAction: 'toggle' | string;
    more: boolean;
    scrollOnMore: boolean;
    scrollToSettings: Partial<IScrollToSettings>;
}

/**
 * @name                SCodeExampleComponent
 * @as                  Code example
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SCodeExampleComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-code-example
 * @platform            html
 * @status              beta
 *
 * This component represent a code example that make sure your passed code(s) is displayed well using under the hood the AMAZING [highlightjs](https://highlightjs.org/) library.
 *
 * @feature           Can display out of the bos codes like `bash`, `shell`, `css`, `js`, `php` and `html`
 * @feature           Possibility to add some languages through the property `languages`
 * @feature           Full support for sugar theming system for easy integration
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install           shell
 * npm i @coffeekraken/s-code-example-component
 *
 * @install           js
 * import { define } from '@coffeekraken/s-code-example-component';
 * define();
 *
 * @example         html
 * <s-code-example>
 *      <template lang="js">
 * function $initHighlight(block, cls) {
 * try {
 *   if (cls.search(/\bno\-highlight\b/) != -1)
 *     return process(block, true, 0x0F) +
 *            ` class="${cls}"`;
 * } catch (e) {
 * }
 * for (var i = 0 / 2; i < classes.length; i++) {
 *   if (checkCondition(classes[i]) === undefined)
 *     console.log('undefined');
 * }
 *      </template>
 * </s-code-example>
 *
 * @example         js
 * import { define } from '@coffeekraken/s-code-example-component';
 * define();
 *
 * @see             https://highlightjs.org/
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SCodeExample extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            __SCodeExampleComponentInterface,
        );
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

    @query('s-clipboard-copy')
    $copy;

    @query('.templates')
    $templatesContainer;

    state = {
        activeTabId: undefined,
        more: false,
    };

    // @queryAssignedNodes()
    $templates;

    constructor() {
        super(
            __deepMerge({
                name: 's-code-example',
                interface: __SCodeExampleComponentInterface,
            }),
        );
    }
    async mount() {
        const languages = {
            html: __langHtml,
            twig: __langTwig,
            javascript: __langJavascript,
            js: __langJavascript,
            php: __langPhp,
            bash: __langBash,
            shell: __langBash,
            css: __langCss,
            scss: __langCss,
            ...(this.props.languages ?? {}),
        };

        Object.keys(languages).forEach((lang) => {
            __hljs.registerLanguage(lang, languages[lang]);
        });

        // @ts-ignore
        this.$templates = this.querySelectorAll('template,code');

        this.$templates.forEach(($template: HTMLElement) => {
            if (!$template.getAttribute) return;
            let parser = 'babel';
            switch (
                $template.getAttribute('id') ??
                $template.getAttribute('language') ??
                $template.getAttribute('lang')
            ) {
                case 'html':
                case 'xml':
                    parser = 'html';
                    break;
                case 'css':
                case 'scss':
                case 'postcss':
                    parser = 'css';
                    break;
            }
            let rawCode = __decodeHtmlEntities(
                $template.tagName.toLowerCase() === 'textarea' &&
                    // @ts-ignore
                    $template.value
                    ? // @ts-ignore
                      $template.value
                    : $template.innerHTML,
            );
            let formatedCode = rawCode;
            try {
                formatedCode = __prettier.format(rawCode, {
                    parser,
                    plugins: [
                        __prettierCss,
                        __prettierHtml,
                        __prettierJs,
                        __prettierPhp,
                    ],
                });
            } catch (e) {}
            this.props.items = [
                ...this.props.items,
                {
                    id:
                        $template.getAttribute('id') ??
                        $template.getAttribute('language') ??
                        $template.getAttribute('lang') ??
                        'html',
                    lang:
                        $template.getAttribute('language') ??
                        $template.getAttribute('lang') ??
                        'html',
                    // @ts-ignore
                    code: formatedCode,
                    lines: formatedCode.trim().split('\n').length,
                },
            ];
            $template.remove();
        });
    }
    async firstUpdated() {
        // active idx
        if (this.props.active) {
            this.setActiveTab(this.props.active);
        } else {
            if (this.props.items[0]) {
                this.setActiveTab(this.props.items[0].id);
            }
        }

        // await __wait(500);
        // this._$content = this.shadowRoot?.querySelector(
        //     '.s-code-example__content',
        // );
        this._$pre = this.querySelector('.s-code-example__code');
        this._$root = this.querySelector('.s-code-example__root');
        return true;
    }
    setActiveTabByTab(e) {
        this.setActiveTab(e.target.id);
    }
    get currentItem() {
        if (!this.state.activeTabId) return {};
        return this.props.items.find((i) => i.id === this.state.activeTabId);
    }
    async setActiveTab(id) {
        await __wait();
        this.state.activeTabId = id;
        this.highlight(id);
        this.requestUpdate();
    }
    async setMoreClass() {
        if (this.state.more) {
            this._$root.classList.add('s-code-example--more');
        } else {
            this._$root.classList.remove('s-code-example--more');
        }
    }
    toggleMore() {
        this.state.more = !this.state.more;
        this.setMoreClass();
        __scrollTo(this, {
            ...(this.props.scrollToSettings ?? {}),
        });
    }
    highlight(id) {
        const $content = <HTMLElement>this.querySelector(`pre#${id} code`);

        const item = this.props.items.find((i) => i.id === id);

        if ($content.hasAttribute('inited')) {
            this.setMoreClass();
            return;
        }
        $content.setAttribute('inited', 'true');
        let code;
        try {
            const codeToHighlight = __decodeHtmlEntities(
                $content.innerHTML.replace(
                    /(<|&lt;)!\s?--\?lit.*--\s?(>|&gt;)/,
                    '',
                ),
            );
            code = __hljs.highlight(codeToHighlight, {
                language: <string>$content.getAttribute('lang'),
            });
        } catch (e) {
            console.log(e);
        }
        // @ts-ignore
        item.highlightedCode = code?.value ?? '';
        this.setMoreClass();
    }
    copy() {
        const id = this.state.activeTabId;
        const item = this.props.items.filter((i) => i.id === id)[0];
        // @ts-ignore
        this.$copy.copy(item.code);
    }
    render() {
        const currentItem = this.currentItem;
        return html`
            <div
                class="${this.componentUtils.className('__root')} ${this.props
                    .more
                    ? this.componentUtils.className('more')
                    : ''}"
                ?lines="${
                    // @ts-ignore
                    this.props.lines
                }"
                ?bare="${
                    // @ts-ignore
                    this.props.bare
                }"
                toolbar-position="${
                    // @ts-ignore
                    this.props.toolbarPosition
                }"
            >
                <div class="templates"></div>

                <header class="${this.componentUtils.className('__nav')}">
                    <div
                        class="${this.componentUtils.className(
                            '__tabs',
                            's-tabs',
                        )}"
                    >
                        ${(this.props.items ?? []).map(
                            (item) => html`
                                <div
                                    class="${this.componentUtils.className(
                                        '__tab',
                                    )}"
                                    id="${item.id}"
                                    ?active="${this.state.activeTabId ===
                                    item.id}"
                                    @click="${this.setActiveTabByTab}"
                                >
                                    ${item.lang}
                                </div>
                            `,
                        )}
                    </div>
                    ${
                        // @ts-ignore
                        this.toolbarPosition === 'nav'
                            ? html`
                                  <div
                                      class="${this.componentUtils.className(
                                          '__toolbar',
                                      )}"
                                  >
                                      <s-clipboard-copy
                                          @click="${this.copy}"
                                      ></s-clipboard-copy>
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
                                  <div
                                      class="${this.componentUtils.className(
                                          '__toolbar',
                                      )}"
                                  >
                                      <s-clipboard-copy
                                          @click="${this.copy}"
                                      ></s-clipboard-copy>
                                  </div>
                              `
                            : ''
                    }
                    ${(this.props.items ?? []).map(
                        (item) => html`
                            <pre
                                class="${this.componentUtils.className(
                                    '__code',
                                )}"
                                style="line-height:0;"
                                id="${item.id ?? item.lang}"
                                ?active="${this.state.activeTabId ===
                                (item.id ?? item.lang)}"
                            >
                            <code lang="${item.lang ??
                            item.id}" class="language-${item.lang} ${item.lang} ${this
                                .props.bare
                                ? ''
                                : 'hljs'}">${
                                // @ts-ignore
                                item.highlightedCode
                                    ? unsafeHTML(item.highlightedCode)
                                    : item.code.trim()
                            }</code>
                        </pre>
                        `,
                    )}
                    ${this.props.lines && currentItem.lines > this.props.lines
                        ? html`
                        <div class="${this.componentUtils.className(
                            '__more-bar',
                        )}">
                            ${
                                // @ts-ignore
                                this.moreAction === 'toggle'
                                    ? html`
                                          <a
                                              class="${this.componentUtils.className(
                                                  '__more-button',
                                                  's-btn',
                                              )}"
                                              @click="${() =>
                                                  this.toggleMore()}"
                                          >
                                              ${
                                                  // @ts-ignore
                                                  this.state.more
                                                      ? html`
                                                            ${this.props
                                                                .lessLabel ??
                                                            'Show less'}
                                                        `
                                                      : html`
                                                            ${this.props
                                                                .moreLabel ??
                                                            'Show more'}
                                                        `
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
                                                  this.moreAction
                                              }"
                                          >
                                              ${
                                                  // @ts-ignore
                                                  this.state.more
                                                      ? html`
                                                            ${this.props
                                                                .lessLabel ??
                                                            'Show less'}
                                                        `
                                                      : html`
                                                            ${this.props
                                                                .moreLabel ??
                                                            'Show more'}
                                                        `
                                              }
                                          </a>
                                      `
                            }                        
                            </a>
                        </div>
                    `
                        : ''}
                </div>
            </div>
        `;
    }
}

export { __define as define };
