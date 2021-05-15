<svelte:options tag="s-highlight-js" />

<script lang="ts">
  import prism from 'prismjs';
  import 'prismjs/components/prism-javascript';
  import 'prismjs/components/prism-css';
  import 'prismjs/components/prism-markup';
  import 'prismjs/components/prism-bash';
  import __SSvelteComponent from '@coffeekraken/s-svelte-component';
  import __SHighlightJsComponentInterface from './interface/SHighlightJsComponentInterface';

  import { onMount } from 'svelte';

  let rootElm;

  console.log('ELELELELE', 'efefe');

  class SHighlightJsComponent extends __SSvelteComponent {
    static interface = __SHighlightJsComponentInterface;
    constructor(params) {
      super(params, {
        svelteComponent: {}
      });
    }
  }
  const component = new SHighlightJsComponent($$props);
  let { theme, language } = component.props;

  // let codeElement, preHtmlElement, slotHtmlElement;
  // const text = document.querySelector('s-highlight-js').innerHTML;

  onMount(() => {
    console.log('MOUNT');

    component.setRoot(rootElm);

    const themeImport = `@import url('${theme}');`;
    const $style = document.createElement('style');
    $style.type = 'text/css';
    $style.appendChild(document.createTextNode(themeImport));

    console.log('ELM', component.$elm);
    console.lgo('INNEWR', component.$elm.innerHTML);
    console.log('ROOT', component.$root);

    const $code = component.$root.querySelector('code');
    const text = component.$elm.innerHTML;
    $code.innerHTML = text;
    prism.highlightElement($code);
    $code.appendChild($style);
  });
</script>

<div bind:this={rootElm}>
  <pre class="language-{language}">
    <code></code>
  </pre>
</div>

<style>
  code {
    color: sugar.color(primary) !important;
  }
</style>
