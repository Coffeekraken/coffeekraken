<template>
  <div
    :id="id"
    ref="$container"
    :class="_classStringToObject(component?.className('', null, 'bare'))"
    :status="status"
  >
    <slot />

    <template v-if="noCode">
      <p
        :class="
          _classStringToObject(
            component.className('__no-code', 's-typo s-typo--p')
          )
        "
      >
        Sorry but no codes have been specified using the "template" tag...
      </p>
    </template>

    <template v-if="component && activeTabId && !noCode">
      <div
        :class="
          _classStringToObject(
            [
              component?.className('__root'),
              more ? component.className('more') : '',
            ].join(' ')
          )
        "
        :lines="lines"
        :toolbar-position="toolbarPosition"
      >
        <header :class="_classStringToObject(component.className('__nav'))">
          <div
            :class="
              _classStringToObject(component.className('__tabs', 's-tabs'))
            "
          >
            <template :key="index" v-for="(code, index) in codes">
              <div
                :class="
                  _classStringToObject(
                    [
                      component.className('__tab'),
                      activeTabId === code.id ? 'active' : '',
                    ].join(' ')
                  )
                "
                :id="code.id"
                @click="setActiveTabById(code.id)"
              >
                {{ code.lang }}
              </div>
            </template>
          </div>

          <template v-if="toolbarPosition === 'nav' && activeTabId">
            <div
              :class="_classStringToObject(component.className('__toolbar'))"
            ></div>
          </template>
        </header>
        <div
          :class="_classStringToObject(component.className('__content'))"
          ref="$content"
        >
          <template v-if="toolbarPosition !== 'nav' && activeTabId">
            <div
              :class="_classStringToObject(component.className('__toolbar'))"
            ></div>
          </template>

          <template v-if="activeCode">
            <pre
              :class="
                _classStringToObject(component.className('__code') + ' pre')
              "
              :id="activeCode.id"
            >
                              <code  ref="$code"  :class="_classStringToObject(`language-${activeCode.lang} ${activeCode.lang} hljs`)" ></code>
                          </pre>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
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

export default {
  name: "s-code-example",

  props: ["cssDeps", "languages", "more", "lines", "toolbarPosition"],

  data: () => ({
    status: "idle",
    id: null,
    noCode: false,
    activeTabId: null,
    activeCode: null,
    component: null,
    more: false,
    lines: null,
    codes: [],
  }),

  mounted() {
    __SCodeExampleComponentInterface;
    this.component = new __SComponent("s-code-example", {
      bare: false,
    });
    this.id = `s-code-example-${__uniqid()}`;
    this.mount();
    this.status = "mounted";
  },
  updated() {
    // update max-lines property
    this.$refs.$content?.style.setProperty("--max-lines", this.lines ?? 999999);
  },

  methods: {
    mount() {
      try {
        this.component.injectStyleInShadowRoot(
          this.cssDeps ?? [],
          this.$refs.$container
        );
      } catch (e) {}

      const $slot = this.$refs.$container.querySelector("slot");
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
    },
    setActiveTabById(codeId) {
      this.activeTabId = codeId;
      this.activeCode = this.codes.filter((code) => code.id === codeId)[0];
      this.activeCode = this.prepareCode(this.activeCode);

      if (this.$refs.$code) {
        this.$refs.$code.innerHTML = this.activeCode.code;
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
    },
    _classStringToObject(str) {
      const obj = {};
      if (typeof str !== "string") {
        return obj;
      }
      const classNames = str.trim().split(/\s+/);
      for (const name of classNames) {
        obj[name] = true;
      }
      return obj;
    },
  },
};
</script>

<style scoped>
.pre {
}
</style>
