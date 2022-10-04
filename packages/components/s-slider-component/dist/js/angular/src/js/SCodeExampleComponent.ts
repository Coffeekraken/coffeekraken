import { Component, ViewChild, ElementRef, Input } from "@angular/core";

// // @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore

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
 * import { define } from '@coffeekraken/s-code-example-component/webcomponent';
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
 * import { define } from '@coffeekraken/s-code-example-component/webcomponent';
 * define();
 *
 * @see             https://highlightjs.org/
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
type Props = {
  active: string;
  toolbar: "copy"[];
  toolbarPosition: "content" | "top";
  languages: Record<string, any>;
  lines: number;
  moreLabel: string;
  lessLabel: string;
  moreAction: "toggle";
  more: boolean;
  scrollOnMore: boolean;
  scrollToSettings: any;
  cssDeps: string | string[];
};

import __prettier from "prettier/esm/standalone.mjs";
import __prettierJs from "prettier/esm/parser-babel.mjs";
import __prettierHtml from "prettier/esm/parser-html.mjs";
import __prettierPhp from "@prettier/plugin-php/standalone";
import __prettierCss from "prettier/esm/parser-postcss.mjs";
import __hljs from "highlight.js/lib/core";
import __langBash from "highlight.js/lib/languages/bash";
import __langJavascript from "highlight.js/lib/languages/javascript";
import __langPhp from "highlight.js/lib/languages/php";
import __langHtml from "highlight.js/lib/languages/xml";
import __langCss from "../../../../../src/js/languages/css";
import { __decodeHtmlEntities } from "@coffeekraken/sugar/string";
import __SComponent from "@coffeekraken/s-component";
import { __uniqid } from "@coffeekraken/sugar/string";
import "../../../../../src/css/s-inline.css";
import __SCodeExampleComponentInterface from "../../../../../src/js/interface/SCodeExampleComponentInterface";
const DEFAULT_PROPS = __SCodeExampleComponentInterface.defaults();

@Component({
  selector: "s-code-example",
  template: `
    <div
      [id]="id"
      #$container
      [class]="component?.className('', null, 'bare')"
      [status]="status"
    >
      <ng-content></ng-content>

      <ng-container *ngIf="noCode">
        <p [class]="component.className('__no-code', 's-typo s-typo--p')">
          Sorry but no codes have been specified using the "template" tag...
        </p>
      </ng-container>

      <ng-container *ngIf="component && activeTabId && !noCode">
        <div
          [class]="[component?.className('__root'), more ? component.className('more') : ''].join(' ')"
          [lines]="lines"
          [attr.toolbar-position]="toolbarPosition"
        >
          <header [class]="component.className('__nav')">
            <div [class]="component.className('__tabs', 's-tabs')">
              <ng-container *ngFor="let code of codes; let idx = index">
                <div
                  [class]="[component.className('__tab'), activeTabId === code.id ? 'active' : ''].join(' ')"
                  [id]="code.id"
                  (click)="setActiveTabById(code.id)"
                >
                  {{code.lang}}
                </div>
              </ng-container>
            </div>

            <ng-container *ngIf="toolbarPosition === 'nav' && activeTabId">
              <div [class]="component.className('__toolbar')"></div>
            </ng-container>
          </header>

          <div [class]="component.className('__content')" #$content>
            <ng-container *ngIf="toolbarPosition !== 'nav' && activeTabId">
              <div [class]="component.className('__toolbar')"></div>
            </ng-container>

            <ng-container *ngIf="activeCode">
              <pre
                [class]="component.className('__code') + ' pre'"
                [id]="activeCode.id"
              >
                                       
       <code  #$code  [class]="\`language-\${activeCode.lang} \${activeCode.lang} hljs\`" ></code>

                                   </pre>
            </ng-container>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .pre {
      }
    `,
  ],
})
export default class SCodeExample {
  @Input() cssDeps: Props["cssDeps"];
  @Input() languages: Props["languages"];
  @Input() more: Props["more"];
  @Input() lines: Props["lines"];
  @Input() toolbarPosition: Props["toolbarPosition"];

  @ViewChild("$container") $container: ElementRef;
  @ViewChild("$content") $content: ElementRef;
  @ViewChild("$code") $code: ElementRef;

  status = "idle";
  id = null;
  noCode = false;
  activeTabId = null;
  activeCode = null;
  component = null;
  more = false;
  lines = null;
  codes = [];
  mount() {
    try {
      this.component.injectStyleInShadowRoot(
        this.cssDeps ?? [],
        this.$container.nativeElement
      );
    } catch (e) {}

    const $slot = this.$container.nativeElement.querySelector("slot");
    const $templates = $slot
      .assignedNodes()
      .filter((n) => n.tagName === "TEMPLATE");

    if (!$templates.length) {
      this.noCode = true;
      return;
    }

    const languages = {
      html: __langHtml,
      javascript: __langJavascript,
      js: __langJavascript,
      php: __langPhp,
      bash: __langBash,
      shell: __langBash,
      css: __langCss,
      scss: __langCss,
      ...(this.languages ?? {}),
    };
    Object.keys(languages).forEach((lang) => {
      __hljs.registerLanguage(lang, languages[lang]);
    });
    $templates.forEach(($template, i) => {
      let lang = $template.getAttribute("lang"),
        codeId = `s-code-example-${__uniqid()}`,
        code = __decodeHtmlEntities($template.innerHTML);

      const codeObj = {
        id: codeId,
        lang,
        code,
      };
      this.codes = [...this.codes, codeObj];
    }); // set initial active tab

    setTimeout(() => {
      this.setActiveTabById(this.codes?.[0]?.id);
    });
  }
  setActiveTabById(codeId) {
    this.activeTabId = codeId;
    this.activeCode = this.codes.filter((code) => code.id === codeId)[0];
    this.activeCode = this.prepareCode(this.activeCode);

    if (this.$code.nativeElement) {
      this.$code.nativeElement.innerHTML = this.activeCode.code;
    }
  }
  prepareCode(code) {
    if (code._inited) {
      return code;
    }

    code._inited = true;
    let parser = "babel";

    switch (code.lang) {
      case "html":
      case "xml":
        parser = "html";
        break;

      case "css":
      case "scss":
      case "postcss":
        parser = "css";
        break;
    }

    try {
      code.code = __prettier.format(code.code, {
        parser,
        plugins: [__prettierCss, __prettierHtml, __prettierJs, __prettierPhp],
      });
    } catch (e) {
      console.log(e);
    }

    let highlightedCode;

    try {
      const codeToHighlight = __decodeHtmlEntities(
        code.code.replace(/(<|&lt;)!\s?--\?lit.*--\s?(>|&gt;)/, "")
      );

      highlightedCode = __hljs.highlight(codeToHighlight, {
        language: code.lang,
      })?.value;
      code.code = highlightedCode;
    } catch (e) {
      console.log(e);
    }

    return code;
  }

  ngOnInit() {
    __SCodeExampleComponentInterface;
    this.component = new __SComponent("s-code-example", {
      bare: false,
    });
    this.id = `s-code-example-${__uniqid()}`;
    this.mount();
    this.status = "mounted";
  }

  ngAfterContentChecked() {
    // update max-lines property
    this.$content.nativeElement?.style.setProperty(
      "--max-lines",
      this.lines ?? 999999
    );
  }
}
