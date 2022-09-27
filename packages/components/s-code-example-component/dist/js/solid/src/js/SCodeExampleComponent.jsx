import { Show, For, onMount, createSignal } from "solid-js";
import { css } from "solid-styled-components";
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

function SCodeExample(props) {
  const [status, setStatus] = createSignal("idle");
  const [id, setId] = createSignal(null);
  const [noCode, setNoCode] = createSignal(false);
  const [activeTabId, setActiveTabId] = createSignal(null);
  const [activeCode, setActiveCode] = createSignal(null);
  const [component, setComponent] = createSignal(null);
  const [more, setMore] = createSignal(false);
  const [lines, setLines] = createSignal(null);
  const [codes, setCodes] = createSignal([]);

  function mount() {
    try {
      component().injectStyleInShadowRoot(props.cssDeps ?? [], $container);
    } catch (e) {}

    const $slot = $container.querySelector("slot");
    const $templates = $slot.assignedNodes().filter(n => n.tagName === "TEMPLATE");

    if (!$templates.length) {
      setNoCode(true);
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
      ...(props.languages ?? {})
    };
    Object.keys(languages).forEach(lang => {
      __hljs.registerLanguage(lang, languages[lang]);
    });
    $templates.forEach(($template, i) => {
      let lang = $template.getAttribute("lang"),
          codeId = `s-code-example-${__uniqid()}`,
          code = __decodeHtmlEntities($template.innerHTML);

      const codeObj = {
        id: codeId,
        lang,
        code
      };
      setCodes([...codes(), codeObj]);
    }); // set initial active tab

    setTimeout(() => {
      setActiveTabById(codes()?.[0]?.id);
    });
  }

  function setActiveTabById(codeId) {
    setActiveTabId(codeId);
    setActiveCode(codes().filter(code => code.id === codeId)[0]);
    setActiveCode(prepareCode(activeCode()));

    if ($code) {
      $code.innerHTML = activeCode().code;
    }
  }

  function prepareCode(code) {
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
        plugins: [__prettierCss, __prettierHtml, __prettierJs, __prettierPhp]
      });
    } catch (e) {
      console.log(e);
    }

    let highlightedCode;

    try {
      const codeToHighlight = __decodeHtmlEntities(code.code.replace(/(<|&lt;)!\s?--\?lit.*--\s?(>|&gt;)/, ""));

      highlightedCode = __hljs.highlight(codeToHighlight, {
        language: code.lang
      })?.value;
      code.code = highlightedCode;
    } catch (e) {
      console.log(e);
    }

    return code;
  }

  let $container;
  let $content;
  let $code;
  onMount(() => {
    __SCodeExampleComponentInterface;
    setComponent(new __SComponent("s-code-example", {
      bare: false
    }));
    setId(`s-code-example-${__uniqid()}`);
    mount();
    setStatus("mounted");
  });
  return <div class={component()?.className("", null, "bare")} id={id()} ref={$container} status={status()}>
      {props.children}
      <Show when={noCode()}>
        <p class={component().className("__no-code", "s-typo s-typo--p")}>
          Sorry but no codes have been specified using the "template" tag...
        </p>
      </Show>
      <Show when={component() && activeTabId() && !noCode()}>
        <div class={[component()?.className("__root"), props.more ? component().className("more") : ""].join(" ")} lines={props.lines} toolbar-position={props.toolbarPosition}>
          <header class={component().className("__nav")}>
            <div class={component().className("__tabs", "s-tabs")}>
              <For each={codes()}>
                {(code, _index) => {
                const idx = _index();

                return <div class={[component().className("__tab"), activeTabId() === code.id ? "active" : ""].join(" ")} id={code.id} onclick={event => setActiveTabById(code.id)}>
                      {code.lang}
                    </div>;
              }}
              </For>
            </div>
            <Show when={props.toolbarPosition === "nav" && activeTabId()}>
              <div class={component().className("__toolbar")}></div>
            </Show>
          </header>
          <div class={component().className("__content")} ref={$content}>
            <Show when={props.toolbarPosition !== "nav" && activeTabId()}>
              <div class={component().className("__toolbar")}></div>
            </Show>
            <Show when={activeCode()}>
              <pre class={component().className("__code") + " " + css({
              lineHeight: 0
            })} id={activeCode().id}>
                <code class={`language-${activeCode().lang} ${activeCode().lang} hljs`} ref={$code}></code>
              </pre>
            </Show>
          </div>
        </div>
      </Show>
    </div>;
}

export default SCodeExample;