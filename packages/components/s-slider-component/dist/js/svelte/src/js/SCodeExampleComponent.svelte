<script>
  import { afterUpdate, onMount } from "svelte";

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

  export let cssDeps;
  export let languages;

  export let more;
  export let lines;
  export let toolbarPosition;

  function mount() {
    try {
      component.injectStyleInShadowRoot(cssDeps ?? [], $container);
    } catch (e) {}

    const $slot = $container.querySelector("slot");
    const $templates = $slot
      .assignedNodes()
      .filter((n) => n.tagName === "TEMPLATE");

    if (!$templates.length) {
      noCode = true;
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
      ...(languages ?? {}),
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
      codes = [...codes, codeObj];
    }); // set initial active tab

    setTimeout(() => {
      setActiveTabById(codes?.[0]?.id);
    });
  }

  function setActiveTabById(codeId) {
    activeTabId = codeId;
    activeCode = codes.filter((code) => code.id === codeId)[0];
    activeCode = prepareCode(activeCode);

    if ($code) {
      $code.innerHTML = activeCode.code;
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

  let $container;
  let $content;
  let $code;

  let status = "idle";
  let id = null;
  let noCode = false;
  let activeTabId = null;
  let activeCode = null;
  let component = null;
  let more = false;
  let lines = null;
  let codes = [];

  onMount(() => {
    __SCodeExampleComponentInterface;
    component = new __SComponent("s-code-example", {
      bare: false,
    });
    id = `s-code-example-${__uniqid()}`;
    mount();
    status = "mounted";
  });

  afterUpdate(() => {
    // update max-lines property
    $content?.style.setProperty("--max-lines", lines ?? 999999);
  });
</script>

<div
  {id}
  bind:this={$container}
  class={component?.className("", null, "bare")}
  {status}
>
  <slot />

  {#if noCode}
    <p class={component.className("__no-code", "s-typo s-typo--p")}>
      Sorry but no codes have been specified using the "template" tag...
    </p>
  {/if}

  {#if component && activeTabId && !noCode}
    <div
      class={[
        component?.className("__root"),
        more ? component.className("more") : "",
      ].join(" ")}
      {lines}
      toolbar-position={toolbarPosition}
    >
      <header class={component.className("__nav")}>
        <div class={component.className("__tabs", "s-tabs")}>
          {#each codes as code, idx}
            <div
              class={[
                component.className("__tab"),
                activeTabId === code.id ? "active" : "",
              ].join(" ")}
              id={code.id}
              on:click={(event) => {
                setActiveTabById(code.id);
              }}
            >
              {code.lang}
            </div>
          {/each}
        </div>

        {#if toolbarPosition === "nav" && activeTabId}
          <div class={component.className("__toolbar")} />
        {/if}
      </header>
      <div class={component.className("__content")} bind:this={$content}>
        {#if toolbarPosition !== "nav" && activeTabId}
          <div class={component.className("__toolbar")} />
        {/if}

        {#if activeCode}
          <pre
            class={component.className("__code") + " pre"}
            id={activeCode.id}>
                              <code
              bind:this={$code}
              class={`language-${activeCode.lang} ${activeCode.lang} hljs`}
            />
                          </pre>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .pre {
  }
</style>
