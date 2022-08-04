var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { define as __SClipboardCopy } from '@coffeekraken/s-clipboard-copy-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __hljs from 'highlight.js/lib/core';
import __langBash from 'highlight.js/lib/languages/bash';
import __langCss from './languages/css';
import __scrollTo from '@coffeekraken/sugar/js/dom/scroll/scrollTo';
import __decodeHtmlEntities from '@coffeekraken/sugar/js/html/decodeHtmlEntities';
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
// @ts-ignore
import __css from '../../../../src/css/s-code-example.css'; // relative to /dist/pkg/esm/js
__SClipboardCopy();
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
    constructor() {
        super(__deepMerge({
            name: 's-code-example',
            interface: __SCodeExampleComponentInterface,
        }));
        this._$copy = undefined;
        this.state = {
            activeTabId: undefined,
            more: false,
        };
    }
    static get properties() {
        return __SLitComponent.createProperties({}, __SCodeExampleComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    mount() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const languages = Object.assign({ html: __langHtml, javascript: __langJavascript, js: __langJavascript, php: __langPhp, bash: __langBash, shell: __langBash, css: __langCss, scss: __langCss }, ((_a = this.props.languages) !== null && _a !== void 0 ? _a : {}));
            Object.keys(languages).forEach((lang) => {
                __hljs.registerLanguage(lang, languages[lang]);
            });
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            this.$templates = this.querySelectorAll('template,code');
            this.$templates.forEach(($template) => {
                var _a, _b, _c, _d, _e, _f, _g;
                if (!$template.getAttribute)
                    return;
                let parser = 'babel';
                switch ((_b = (_a = $template.getAttribute('id')) !== null && _a !== void 0 ? _a : $template.getAttribute('language')) !== null && _b !== void 0 ? _b : $template.getAttribute('lang')) {
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
                let rawCode = __decodeHtmlEntities($template.tagName.toLowerCase() === 'textarea' &&
                    // @ts-ignore
                    $template.value
                    ? // @ts-ignore
                        $template.value
                    : $template.innerHTML);
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
                }
                catch (e) { }
                this.props.items = [
                    ...this.props.items,
                    {
                        id: (_e = (_d = (_c = $template.getAttribute('id')) !== null && _c !== void 0 ? _c : $template.getAttribute('language')) !== null && _d !== void 0 ? _d : $template.getAttribute('lang')) !== null && _e !== void 0 ? _e : 'html',
                        lang: (_g = (_f = $template.getAttribute('language')) !== null && _f !== void 0 ? _f : $template.getAttribute('lang')) !== null && _g !== void 0 ? _g : 'html',
                        // @ts-ignore
                        code: formatedCode,
                        lines: formatedCode.trim().split('\n').length,
                    },
                ];
                $template.remove();
            });
            // active idx
            if (this.props.active) {
                this.setActiveTab(this.props.active);
            }
            else {
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
        });
    }
    setActiveTabByTab(e) {
        this.setActiveTab(e.target.id);
    }
    get currentItem() {
        if (!this.state.activeTabId)
            return {};
        return this.props.items.find((i) => i.id === this.state.activeTabId);
    }
    setActiveTab(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __wait();
            this.state.activeTabId = id;
            this.highlight(id);
            this.requestUpdate();
        });
    }
    setMoreClass() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state.more) {
                this._$root.classList.add('s-code-example--more');
            }
            else {
                this._$root.classList.remove('s-code-example--more');
            }
        });
    }
    toggleMore() {
        var _a;
        this.state.more = !this.state.more;
        this.setMoreClass();
        __scrollTo(this, Object.assign({}, ((_a = this.props.scrollToSettings) !== null && _a !== void 0 ? _a : {})));
    }
    highlight(id) {
        var _a;
        const $content = this.querySelector(`pre#${id} code`);
        const item = this.props.items.find((i) => i.id === id);
        if ($content.hasAttribute('inited')) {
            this.setMoreClass();
            return;
        }
        $content.setAttribute('inited', 'true');
        let code;
        try {
            const codeToHighlight = __decodeHtmlEntities($content.innerHTML.replace(/(<|&lt;)!\s?--\?lit.*--\s?(>|&gt;)/, ''));
            code = __hljs.highlight(codeToHighlight, {
                language: $content.getAttribute('lang'),
            });
        }
        catch (e) {
            console.log(e);
        }
        // @ts-ignore
        item.highlightedCode = (_a = code === null || code === void 0 ? void 0 : code.value) !== null && _a !== void 0 ? _a : '';
        this.setMoreClass();
    }
    copy() {
        const id = this.state.activeTabId;
        const item = this.props.items.filter((i) => i.id === id)[0];
        // @ts-ignore
        this.$copy.copy(item.code);
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        const currentItem = this.currentItem;
        return html `
            <div
                class="${this.componentUtils.className('__root')} ${this.props
            .more
            ? this.componentUtils.className('more')
            : ''}"
                ?lines="${
        // @ts-ignore
        this.props.lines}"
                ?mounted="${
        // @ts-ignore
        this.mounted}"
                ?bare="${
        // @ts-ignore
        this.props.bare}"
                toolbar-position="${
        // @ts-ignore
        this.props.toolbarPosition}"
            >
                <div class="templates"></div>

                <header class="${this.componentUtils.className('__nav')}">
                    <div
                        class="${this.componentUtils.className('__tabs', 's-tabs')}"
                    >
                        ${((_a = this.props.items) !== null && _a !== void 0 ? _a : []).map((item) => html `
                                <div
                                    class="${this.componentUtils.className('__tab')}"
                                    id="${item.id}"
                                    ?active="${this.state.activeTabId ===
            item.id}"
                                    @click="${this.setActiveTabByTab}"
                                >
                                    ${item.lang}
                                </div>
                            `)}
                    </div>
                    ${
        // @ts-ignore
        this.toolbarPosition === 'nav'
            ? html `
                                  <div
                                      class="${this.componentUtils.className('__toolbar')}"
                                  >
                                      <s-clipboard-copy
                                          @click="${this.copy}"
                                      ></s-clipboard-copy>
                                  </div>
                              `
            : ''}
                </header>
                <div
                    class="${this.componentUtils.className('__content')}"
                    style="--max-lines: ${(_b = this.props.lines) !== null && _b !== void 0 ? _b : 99999999};"
                >
                    ${
        // @ts-ignore
        this.toolbarPosition !== 'nav'
            ? html `
                                  <div
                                      class="${this.componentUtils.className('__toolbar')}"
                                  >
                                      <s-clipboard-copy
                                          @click="${this.copy}"
                                      ></s-clipboard-copy>
                                  </div>
                              `
            : ''}
                    ${((_c = this.props.items) !== null && _c !== void 0 ? _c : []).map((item) => {
            var _a, _b, _c;
            return html `
                            <pre
                                class="${this.componentUtils.className('__code')}"
                                style="line-height:0;"
                                id="${(_a = item.id) !== null && _a !== void 0 ? _a : item.lang}"
                                ?active="${this.state.activeTabId ===
                ((_b = item.id) !== null && _b !== void 0 ? _b : item.lang)}"
                            >
                            <code lang="${(_c = item.lang) !== null && _c !== void 0 ? _c : item.id}" class="language-${item.lang} ${item.lang} ${this
                .props.bare
                ? ''
                : 'hljs'}">${
            // @ts-ignore
            item.highlightedCode
                ? unsafeHTML(item.highlightedCode)
                : item.code.trim()}</code>
                        </pre>
                        `;
        })}
                    ${this.props.lines && currentItem.lines > this.props.lines
            ? html `
                        <div class="${this.componentUtils.className('__more-bar')}">
                            ${
            // @ts-ignore
            this.moreAction === 'toggle'
                ? html `
                                          <a
                                              class="${this.componentUtils.className('__more-button', 's-btn')}"
                                              @click="${() => this.toggleMore()}"
                                          >
                                              ${
                // @ts-ignore
                this.state.more
                    ? html `
                                                            ${(_d = this.props
                        .lessLabel) !== null && _d !== void 0 ? _d : 'Show less'}
                                                        `
                    : html `
                                                            ${(_e = this.props
                        .moreLabel) !== null && _e !== void 0 ? _e : 'Show more'}
                                                        `}
                                          </a>
                                      `
                : html `
                                          <a
                                              class="${this.componentUtils.className('__more-button', 's-btn s-color--accent')}"
                                              href="${
                // @ts-ignore
                this.moreAction}"
                                          >
                                              ${
                // @ts-ignore
                this.state.more
                    ? html `
                                                            ${(_f = this.props
                        .lessLabel) !== null && _f !== void 0 ? _f : 'Show less'}
                                                        `
                    : html `
                                                            ${(_g = this.props
                        .moreLabel) !== null && _g !== void 0 ? _g : 'Show more'}
                                                        `}
                                          </a>
                                      `}                        
                            </a>
                        </div>
                    `
            : ''}
                </div>
            </div>
        `;
    }
}
__decorate([
    query('s-clipboard-copy')
], SCodeExample.prototype, "$copy", void 0);
__decorate([
    query('.templates')
], SCodeExample.prototype, "$templatesContainer", void 0);
export function define(props = {}, tagName = 's-code-example') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SCodeExample);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLE1BQU0sTUFBTSx1QkFBdUIsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6RCxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUd4QyxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRSxPQUFPLG9CQUFvQixNQUFNLGdEQUFnRCxDQUFDO0FBQ2xGLE9BQU8sZ0JBQWdCLE1BQU0sdUNBQXVDLENBQUM7QUFDckUsT0FBTyxTQUFTLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkQsT0FBTyxVQUFVLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxnQ0FBZ0MsTUFBTSw0Q0FBNEMsQ0FBQztBQUUxRixnQkFBZ0I7QUFDaEIsT0FBTyxVQUFVLE1BQU0sNkJBQTZCLENBQUM7QUFDckQsYUFBYTtBQUNiLE9BQU8sWUFBWSxNQUFNLCtCQUErQixDQUFDO0FBQ3pELGFBQWE7QUFDYixPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxhQUFhO0FBQ2IsT0FBTyxhQUFhLE1BQU0saUNBQWlDLENBQUM7QUFDNUQsT0FBTyxhQUFhLE1BQU0saUNBQWlDLENBQUM7QUFFNUQsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLHdDQUF3QyxDQUFDLENBQUMsK0JBQStCO0FBRTNGLGdCQUFnQixFQUFFLENBQUM7QUFpQm5COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0RHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFhLFNBQVEsZUFBZTtJQWlDckQ7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixTQUFTLEVBQUUsZ0NBQWdDO1NBQzlDLENBQUMsQ0FDTCxDQUFDO1FBekJOLFdBQU0sR0FBRyxTQUFTLENBQUM7UUFXbkIsVUFBSyxHQUFHO1lBQ0osV0FBVyxFQUFFLFNBQVM7WUFDdEIsSUFBSSxFQUFFLEtBQUs7U0FDZCxDQUFDO0lBWUYsQ0FBQztJQXZDRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FDbkMsRUFBRSxFQUNGLGdDQUFnQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUMsS0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBNkJLLEtBQUs7OztZQUNQLE1BQU0sU0FBUyxtQkFDWCxJQUFJLEVBQUUsVUFBVSxFQUNoQixVQUFVLEVBQUUsZ0JBQWdCLEVBQzVCLEVBQUUsRUFBRSxnQkFBZ0IsRUFDcEIsR0FBRyxFQUFFLFNBQVMsRUFDZCxJQUFJLEVBQUUsVUFBVSxFQUNoQixLQUFLLEVBQUUsVUFBVSxFQUNqQixHQUFHLEVBQUUsU0FBUyxFQUNkLElBQUksRUFBRSxTQUFTLElBQ1osQ0FBQyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxtQ0FBSSxFQUFFLENBQUMsQ0FDbEMsQ0FBQztZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3BDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUM7O0tBQ047SUFDSyxZQUFZOztZQUNkLGFBQWE7WUFDYixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUV6RCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQXNCLEVBQUUsRUFBRTs7Z0JBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWTtvQkFBRSxPQUFPO2dCQUNwQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUM7Z0JBQ3JCLFFBQ0ksTUFBQSxNQUFBLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLG1DQUM1QixTQUFTLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxtQ0FDbEMsU0FBUyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFDaEM7b0JBQ0UsS0FBSyxNQUFNLENBQUM7b0JBQ1osS0FBSyxLQUFLO3dCQUNOLE1BQU0sR0FBRyxNQUFNLENBQUM7d0JBQ2hCLE1BQU07b0JBQ1YsS0FBSyxLQUFLLENBQUM7b0JBQ1gsS0FBSyxNQUFNLENBQUM7b0JBQ1osS0FBSyxTQUFTO3dCQUNWLE1BQU0sR0FBRyxLQUFLLENBQUM7d0JBQ2YsTUFBTTtpQkFDYjtnQkFDRCxJQUFJLE9BQU8sR0FBRyxvQkFBb0IsQ0FDOUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxVQUFVO29CQUMxQyxhQUFhO29CQUNiLFNBQVMsQ0FBQyxLQUFLO29CQUNmLENBQUMsQ0FBQyxhQUFhO3dCQUNiLFNBQVMsQ0FBQyxLQUFLO29CQUNqQixDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FDNUIsQ0FBQztnQkFDRixJQUFJLFlBQVksR0FBRyxPQUFPLENBQUM7Z0JBQzNCLElBQUk7b0JBQ0EsWUFBWSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO3dCQUN0QyxNQUFNO3dCQUNOLE9BQU8sRUFBRTs0QkFDTCxhQUFhOzRCQUNiLGNBQWM7NEJBQ2QsWUFBWTs0QkFDWixhQUFhO3lCQUNoQjtxQkFDSixDQUFDLENBQUM7aUJBQ047Z0JBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtnQkFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRztvQkFDZixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztvQkFDbkI7d0JBQ0ksRUFBRSxFQUNFLE1BQUEsTUFBQSxNQUFBLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLG1DQUM1QixTQUFTLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxtQ0FDbEMsU0FBUyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsbUNBQzlCLE1BQU07d0JBQ1YsSUFBSSxFQUNBLE1BQUEsTUFBQSxTQUFTLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxtQ0FDbEMsU0FBUyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsbUNBQzlCLE1BQU07d0JBQ1YsYUFBYTt3QkFDYixJQUFJLEVBQUUsWUFBWTt3QkFDbEIsS0FBSyxFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTTtxQkFDaEQ7aUJBQ0osQ0FBQztnQkFDRixTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7WUFFSCxhQUFhO1lBQ2IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3hDO2lCQUFNO2dCQUNILElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQzdDO2FBQ0o7WUFFRCxxQkFBcUI7WUFDckIsbURBQW1EO1lBQ25ELGtDQUFrQztZQUNsQyxLQUFLO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDMUQsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0lBQ0QsaUJBQWlCLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsSUFBSSxXQUFXO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUNLLFlBQVksQ0FBQyxFQUFFOztZQUNqQixNQUFNLE1BQU0sRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7S0FBQTtJQUNLLFlBQVk7O1lBQ2QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDckQ7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDeEQ7UUFDTCxDQUFDO0tBQUE7SUFDRCxVQUFVOztRQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLFVBQVUsQ0FBQyxJQUFJLG9CQUNSLENBQUMsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixtQ0FBSSxFQUFFLENBQUMsRUFDeEMsQ0FBQztJQUNQLENBQUM7SUFDRCxTQUFTLENBQUMsRUFBRTs7UUFDUixNQUFNLFFBQVEsR0FBZ0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFbkUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRXZELElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsT0FBTztTQUNWO1FBQ0QsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEMsSUFBSSxJQUFJLENBQUM7UUFDVCxJQUFJO1lBQ0EsTUFBTSxlQUFlLEdBQUcsb0JBQW9CLENBQ3hDLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUN0QixvQ0FBb0MsRUFDcEMsRUFBRSxDQUNMLENBQ0osQ0FBQztZQUNGLElBQUksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRTtnQkFDckMsUUFBUSxFQUFVLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO2FBQ2xELENBQUMsQ0FBQztTQUNOO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xCO1FBQ0QsYUFBYTtRQUNiLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsS0FBSyxtQ0FBSSxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJO1FBQ0EsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDbEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELGFBQWE7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELE1BQU07O1FBQ0YsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUVyQyxPQUFPLElBQUksQ0FBQTs7eUJBRU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUs7YUFDekQsSUFBSTtZQUNMLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDdkMsQ0FBQyxDQUFDLEVBQUU7MEJBQ0U7UUFDTixhQUFhO1FBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUNmOzRCQUNZO1FBQ1IsYUFBYTtRQUNiLElBQUksQ0FBQyxPQUNUO3lCQUNTO1FBQ0wsYUFBYTtRQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsSUFDZjtvQ0FDb0I7UUFDaEIsYUFBYTtRQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsZUFDZjs7OztpQ0FJaUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDOztpQ0FFdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLFFBQVEsRUFDUixRQUFRLENBQ1g7OzBCQUVDLENBQUMsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssbUNBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUMxQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOzs2Q0FFRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FDbEMsT0FBTyxDQUNWOzBDQUNLLElBQUksQ0FBQyxFQUFFOytDQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztZQUNqQyxJQUFJLENBQUMsRUFBRTs4Q0FDRyxJQUFJLENBQUMsaUJBQWlCOztzQ0FFOUIsSUFBSSxDQUFDLElBQUk7OzZCQUVsQixDQUNKOztzQkFFSDtRQUNFLGFBQWE7UUFDYixJQUFJLENBQUMsZUFBZSxLQUFLLEtBQUs7WUFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQTs7K0NBRWEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLFdBQVcsQ0FDZDs7O29EQUdhLElBQUksQ0FBQyxJQUFJOzs7K0JBRzlCO1lBQ0gsQ0FBQyxDQUFDLEVBQ1Y7Ozs2QkFHUyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7MENBQzdCLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLG1DQUFJLFFBQVE7O3NCQUVoRDtRQUNFLGFBQWE7UUFDYixJQUFJLENBQUMsZUFBZSxLQUFLLEtBQUs7WUFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQTs7K0NBRWEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLFdBQVcsQ0FDZDs7O29EQUdhLElBQUksQ0FBQyxJQUFJOzs7K0JBRzlCO1lBQ0gsQ0FBQyxDQUFDLEVBQ1Y7c0JBQ0UsQ0FBQyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQzFCLENBQUMsSUFBSSxFQUFFLEVBQUU7O1lBQUMsT0FBQSxJQUFJLENBQUE7O3lDQUVHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQyxRQUFRLENBQ1g7O3NDQUVLLE1BQUEsSUFBSSxDQUFDLEVBQUUsbUNBQUksSUFBSSxDQUFDLElBQUk7MkNBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXO2dCQUNqQyxDQUFDLE1BQUEsSUFBSSxDQUFDLEVBQUUsbUNBQUksSUFBSSxDQUFDLElBQUksQ0FBQzs7MENBRVosTUFBQSxJQUFJLENBQUMsSUFBSSxtQ0FDdkIsSUFBSSxDQUFDLEVBQUUscUJBQXFCLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJO2lCQUNyRCxLQUFLLENBQUMsSUFBSTtnQkFDWCxDQUFDLENBQUMsRUFBRTtnQkFDSixDQUFDLENBQUMsTUFBTSxLQUFLO1lBQ2IsYUFBYTtZQUNiLElBQUksQ0FBQyxlQUFlO2dCQUNoQixDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ2xDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFDeEI7O3lCQUVILENBQUE7U0FBQSxDQUNKO3NCQUNDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3RELENBQUMsQ0FBQyxJQUFJLENBQUE7c0NBQ1EsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ3ZDLFlBQVksQ0FDZjs4QkFDSztZQUNFLGFBQWE7WUFDYixJQUFJLENBQUMsVUFBVSxLQUFLLFFBQVE7Z0JBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUE7O3VEQUVhLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQyxlQUFlLEVBQ2YsT0FBTyxDQUNWO3dEQUNTLEdBQUcsRUFBRSxDQUNYLElBQUksQ0FBQyxVQUFVLEVBQUU7O2dEQUVuQjtnQkFDRSxhQUFhO2dCQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtvQkFDWCxDQUFDLENBQUMsSUFBSSxDQUFBOzhEQUNFLE1BQUEsSUFBSSxDQUFDLEtBQUs7eUJBQ1AsU0FBUyxtQ0FDZCxXQUFXO3lEQUNkO29CQUNILENBQUMsQ0FBQyxJQUFJLENBQUE7OERBQ0UsTUFBQSxJQUFJLENBQUMsS0FBSzt5QkFDUCxTQUFTLG1DQUNkLFdBQVc7eURBRXpCOzt1Q0FFUDtnQkFDSCxDQUFDLENBQUMsSUFBSSxDQUFBOzt1REFFYSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FDbEMsZUFBZSxFQUNmLHVCQUF1QixDQUMxQjtzREFDTztnQkFDSixhQUFhO2dCQUNiLElBQUksQ0FBQyxVQUNUOztnREFFRTtnQkFDRSxhQUFhO2dCQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtvQkFDWCxDQUFDLENBQUMsSUFBSSxDQUFBOzhEQUNFLE1BQUEsSUFBSSxDQUFDLEtBQUs7eUJBQ1AsU0FBUyxtQ0FDZCxXQUFXO3lEQUNkO29CQUNILENBQUMsQ0FBQyxJQUFJLENBQUE7OERBQ0UsTUFBQSxJQUFJLENBQUMsS0FBSzt5QkFDUCxTQUFTLG1DQUNkLFdBQVc7eURBRXpCOzt1Q0FHbEI7OztxQkFHUDtZQUNHLENBQUMsQ0FBQyxFQUFFOzs7U0FHbkIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXZXRztJQURDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQzsyQ0FDcEI7QUFHTjtJQURDLEtBQUssQ0FBQyxZQUFZLENBQUM7eURBQ0E7QUFzV3hCLE1BQU0sVUFBVSxNQUFNLENBQ2xCLFFBQThDLEVBQUUsRUFDaEQsT0FBTyxHQUFHLGdCQUFnQjtJQUUxQixlQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNqRCxDQUFDIn0=