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

/**
 * Usage:
 *
 *  <s-code-example></s-code-example>
 *
 */
export default class SCodeExample extends HTMLElement {
  get _$container() {
    return this._root.querySelector("[data-ref='SCodeExample-$container']");
  }

  get _$content() {
    return this._root.querySelector("[data-ref='SCodeExample-$content']");
  }

  get _$code() {
    return this._root.querySelector("[data-ref='SCodeExample-$code']");
  }

  get _root() {
    return this.shadowRoot || this;
  }

  constructor() {
    super();
    const self = this;

    this.state = {
      status: "idle",
      id: null,
      noCode: false,
      activeTabId: null,
      activeCode: null,
      component: null,
      more: false,
      lines: null,
      codes: [],
      mount() {
        try {
          self.state.component.injectStyleInShadowRoot(
            self.props.cssDeps ?? [],
            self._$container
          );
        } catch (e) {}

        const $slot = self._$container.querySelector("slot");

        const $templates = $slot
          .assignedNodes()
          .filter((n) => n.tagName === "TEMPLATE");

        if (!$templates.length) {
          self.state.noCode = true;
          self.update();
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
          ...(self.props.languages ?? {}),
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
          self.state.codes = [...self.state.codes, codeObj];
          self.update();
        }); // set initial active tab

        setTimeout(() => {
          self.state.setActiveTabById(self.state.codes?.[0]?.id);
        });
      },
      setActiveTabById(codeId) {
        self.state.activeTabId = codeId;
        self.update();
        self.state.activeCode = self.state.codes.filter(
          (code) => code.id === codeId
        )[0];
        self.update();
        self.state.activeCode = self.state.prepareCode(self.state.activeCode);
        self.update();

        if (self._$code) {
          self._$code.innerHTML = self.state.activeCode.code;
        }
      },
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
            plugins: [
              __prettierCss,
              __prettierHtml,
              __prettierJs,
              __prettierPhp,
            ],
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
      },
    };
    if (!this.props) {
      this.props = {};
    }

    this.componentProps = [
      "cssDeps",
      "languages",
      "children",
      "more",
      "lines",
      "toolbarPosition",
    ];

    this.updateDeps = [[]];

    // used to keep track of all nodes created by show/for
    this.nodesToDestroy = [];
    // batch updates
    this.pendingUpdate = false;

    // Event handler for 'click' event on div-s-code-example-5
    this.onDivSCodeExample5Click = (event) => {
      const code = this.getScope(event.currentTarget, "code");
      this.state.setActiveTabById(code.id);
    };

    if (true) {
      this.attachShadow({ mode: "open" });
    }
  }

  destroyAnyNodes() {
    // destroy current view template refs before rendering again
    this.nodesToDestroy.forEach((el) => el.remove());
    this.nodesToDestroy = [];
  }

  connectedCallback() {
    this.getAttributeNames().forEach((attr) => {
      const jsVar = attr.replace(/-/g, "");
      const regexp = new RegExp(jsVar, "i");
      this.componentProps.forEach((prop) => {
        if (regexp.test(prop)) {
          const attrValue = this.getAttribute(attr);
          if (this.props[prop] !== attrValue) {
            this.props[prop] = attrValue;
          }
        }
      });
    });

    // default props
    const defaultProps = __SComponent.getDefaultProps(
      this.tagName.toLowerCase()
    );
    this.props.active =
      this.props.active ?? defaultProps.active ?? DEFAULT_PROPS.active;
    this.props.toolbar =
      this.props.toolbar ?? defaultProps.toolbar ?? DEFAULT_PROPS.toolbar;
    this.props.toolbarPosition =
      this.props.toolbarPosition ??
      defaultProps.toolbarPosition ??
      DEFAULT_PROPS.toolbarPosition;
    this.props.languages =
      this.props.languages ?? defaultProps.languages ?? DEFAULT_PROPS.languages;
    this.props.lines =
      this.props.lines ?? defaultProps.lines ?? DEFAULT_PROPS.lines;
    this.props.moreLabel =
      this.props.moreLabel ?? defaultProps.moreLabel ?? DEFAULT_PROPS.moreLabel;
    this.props.lessLabel =
      this.props.lessLabel ?? defaultProps.lessLabel ?? DEFAULT_PROPS.lessLabel;
    this.props.moreAction =
      this.props.moreAction ??
      defaultProps.moreAction ??
      DEFAULT_PROPS.moreAction;
    this.props.more =
      this.props.more ?? defaultProps.more ?? DEFAULT_PROPS.more;
    this.props.scrollOnMore =
      this.props.scrollOnMore ??
      defaultProps.scrollOnMore ??
      DEFAULT_PROPS.scrollOnMore;
    this.props.scrollToSettings =
      this.props.scrollToSettings ??
      defaultProps.scrollToSettings ??
      DEFAULT_PROPS.scrollToSettings;
    this.props.cssDeps =
      this.props.cssDeps ?? defaultProps.cssDeps ?? DEFAULT_PROPS.cssDeps;

    this._root.innerHTML = `
                        
      <div data-el="div-s-code-example-1" data-ref="SCodeExample-$container">
        <slot></slot>
      
        <template data-el="show-s-code-example">
          <p data-el="p-s-code-example-1">
            Sorry but no codes have been specified using the "template" tag...
          </p>
        </template>
      
        <template data-el="show-s-code-example-2">
          <div data-el="div-s-code-example-3">
            <header data-el="header-s-code-example-1">
              <div data-el="div-s-code-example-4">
                <template data-el="for-s-code-example">
                  <div data-el="div-s-code-example-5">
                    <template data-el="div-s-code-example-6">
                      <!-- code.lang -->
                    </template>
                  </div>
                </template>
              </div>
      
              <template data-el="show-s-code-example-3">
                <div data-el="div-s-code-example-7"></div>
              </template>
            </header>
      
            <div data-el="div-s-code-example-8" data-ref="SCodeExample-$content">
              <template data-el="show-s-code-example-4">
                <div data-el="div-s-code-example-9"></div>
              </template>
      
              <template data-el="show-s-code-example-5">
                <pre data-el="pre-s-code-example-1">
                                      
      <code  data-el="code-s-code-example-1"  data-ref="SCodeExample-$code" ></code>
      
                                  </pre>
              </template>
            </div>
          </div>
        </template>
      </div>
      <style>
        .pre {
        }
      </style>`;
    this.pendingUpdate = true;

    this.render();
    this.onMount();
    this.pendingUpdate = false;
    this.update();
  }

  showContent(el) {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement/content
    // grabs the content of a node that is between <template> tags
    // iterates through child nodes to register all content including text elements
    // attaches the content after the template

    const elementFragment = el.content.cloneNode(true);
    const children = Array.from(elementFragment.childNodes);
    children.forEach((child) => {
      if (el?.scope) {
        child.scope = el.scope;
      }
      if (el?.context) {
        child.context = el.context;
      }
      this.nodesToDestroy.push(child);
    });
    el.after(elementFragment);
  }

  onMount() {
    // onMount
    __SCodeExampleComponentInterface;
    this.state.component = new __SComponent("s-code-example", {
      bare: false,
    });
    this.update();
    this.state.id = `s-code-example-${__uniqid()}`;
    this.update();
    this.state.mount();
    this.state.status = "mounted";
    this.update();
  }

  onUpdate() {
    const self = this;

    // update max-lines property
    self._$content?.style.setProperty(
      "--max-lines",
      self.props.lines ?? 999999
    );
  }

  update() {
    if (this.pendingUpdate === true) {
      return;
    }
    this.pendingUpdate = true;
    this.render();
    this.onUpdate();
    this.pendingUpdate = false;
  }

  render() {
    // re-rendering needs to ensure that all nodes generated by for/show are refreshed
    this.destroyAnyNodes();
    this.updateBindings();
  }

  updateBindings() {
    this._root
      .querySelectorAll("[data-el='div-s-code-example-1']")
      .forEach((el) => {
        el.setAttribute("id", this.state.id);

        el.className = this.state.component?.className("", null, "bare");

        el.setAttribute("status", this.state.status);
      });

    this._root
      .querySelectorAll("[data-el='show-s-code-example']")
      .forEach((el) => {
        const whenCondition = this.state.noCode;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='p-s-code-example-1']")
      .forEach((el) => {
        el.className = this.state.component.className(
          "__no-code",
          "s-typo s-typo--p"
        );
      });

    this._root
      .querySelectorAll("[data-el='show-s-code-example-2']")
      .forEach((el) => {
        const whenCondition =
          this.state.component && this.state.activeTabId && !this.state.noCode;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-s-code-example-3']")
      .forEach((el) => {
        el.className = [
          this.state.component?.className("__root"),
          this.props.more ? this.state.component.className("more") : "",
        ].join(" ");

        el.setAttribute("lines", this.props.lines);

        el.setAttribute("toolbar-position", this.props.toolbarPosition);
      });

    this._root
      .querySelectorAll("[data-el='header-s-code-example-1']")
      .forEach((el) => {
        el.className = this.state.component.className("__nav");
      });

    this._root
      .querySelectorAll("[data-el='div-s-code-example-4']")
      .forEach((el) => {
        el.className = this.state.component.className("__tabs", "s-tabs");
      });

    this._root
      .querySelectorAll("[data-el='for-s-code-example']")
      .forEach((el) => {
        let array = this.state.codes;
        this.renderLoop(el, array, "code", "idx");
      });

    this._root
      .querySelectorAll("[data-el='div-s-code-example-5']")
      .forEach((el) => {
        const code = this.getScope(el, "code");

        el.className = [
          this.state.component.className("__tab"),
          this.state.activeTabId === code.id ? "active" : "",
        ].join(" ");

        el.setAttribute("id", code.id);

        el.removeEventListener("click", this.onDivSCodeExample5Click);
        el.addEventListener("click", this.onDivSCodeExample5Click);
      });

    this._root
      .querySelectorAll("[data-el='div-s-code-example-6']")
      .forEach((el) => {
        const code = this.getScope(el, "code");
        this.renderTextNode(el, code.lang);
      });

    this._root
      .querySelectorAll("[data-el='show-s-code-example-3']")
      .forEach((el) => {
        const whenCondition =
          this.props.toolbarPosition === "nav" && this.state.activeTabId;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-s-code-example-7']")
      .forEach((el) => {
        el.className = this.state.component.className("__toolbar");
      });

    this._root
      .querySelectorAll("[data-el='div-s-code-example-8']")
      .forEach((el) => {
        el.className = this.state.component.className("__content");
      });

    this._root
      .querySelectorAll("[data-el='show-s-code-example-4']")
      .forEach((el) => {
        const whenCondition =
          this.props.toolbarPosition !== "nav" && this.state.activeTabId;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-s-code-example-9']")
      .forEach((el) => {
        el.className = this.state.component.className("__toolbar");
      });

    this._root
      .querySelectorAll("[data-el='show-s-code-example-5']")
      .forEach((el) => {
        const whenCondition = this.state.activeCode;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='pre-s-code-example-1']")
      .forEach((el) => {
        el.className = this.state.component.className("__code") + " pre";

        el.setAttribute("id", this.state.activeCode.id);
      });

    this._root
      .querySelectorAll("[data-el='code-s-code-example-1']")
      .forEach((el) => {
        el.className = `language-${this.state.activeCode.lang} ${this.state.activeCode.lang} hljs`;
      });
  }

  // Helper to render content
  renderTextNode(el, text) {
    const textNode = document.createTextNode(text);
    if (el?.scope) {
      textNode.scope = el.scope;
    }
    if (el?.context) {
      textNode.context = el.context;
    }
    el.after(textNode);
    this.nodesToDestroy.push(el.nextSibling);
  }

  // scope helper
  getScope(el, name) {
    do {
      let value = el?.scope?.[name];
      if (value !== undefined) {
        return value;
      }
    } while ((el = el.parentNode));
  }

  // Helper to render loops
  renderLoop(template, array, itemName, itemIndex, collectionName) {
    const collection = [];
    for (let [index, value] of array.entries()) {
      const elementFragment = template.content.cloneNode(true);
      const children = Array.from(elementFragment.childNodes);
      const localScope = {};
      let scope = localScope;
      if (template?.scope) {
        const getParent = {
          get(target, prop, receiver) {
            if (prop in target) {
              return target[prop];
            }
            if (prop in template.scope) {
              return template.scope[prop];
            }
            return target[prop];
          },
        };
        scope = new Proxy(localScope, getParent);
      }
      children.forEach((child) => {
        if (itemName !== undefined) {
          scope[itemName] = value;
        }
        if (itemIndex !== undefined) {
          scope[itemIndex] = index;
        }
        if (collectionName !== undefined) {
          scope[collectionName] = array;
        }
        child.scope = scope;
        if (template.context) {
          child.context = context;
        }
        this.nodesToDestroy.push(child);
        collection.unshift(child);
      });
    }
    collection.forEach((child) => template.after(child));
  }
}


                            export function define(
                                props = {},
                                tagName = 's-code-example'
                            ) {
                                __SComponent.setDefaultProps(tagName, props);
                                customElements.define(tagName, class SCodeExampleComponent extends SCodeExample {});
                            }
                            
