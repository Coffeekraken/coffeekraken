<svelte:options tag="s-docblock-to-html" />

<script lang="ts">
  import __SSvelteComponent from '@coffeekraken/s-svelte-component';
  import __SDocblockToHtmlComponentInterface from './interface/SDocblockToHtmlComponentInterface';
  import __SDocblock from '@coffeekraken/s-docblock';
  import { SDocblockHtmlRenderer } from '@coffeekraken/s-docblock-renderer';
  import '@coffeekraken/s-highlight-js';

  let rootElm, renderedHtml;

  const component = new __SSvelteComponent($$props, {
    svelteComponent: {
      classPrefix: 's-docblock-to-html',
      interface: __SDocblockToHtmlComponentInterface
    }
  });
  let {} = component.props;

  // component.beforeUpdate(() => {});
  component.onMount(async () => {
    component.setRoot(rootElm);
    const docblock = new __SDocblock(component.$elm.innerHTML);
    const docblockHtmlRenderer = new SDocblockHtmlRenderer(docblock);
    const html = await docblockHtmlRenderer.render();
    // rootElm.innerHTML = html;
    renderedHtml = html;

    // const elm = document.createElement('s-highlight-js');
    // elm.innerHTML = 'Somethinf';
    // rootElm.appendChild(elm);
  });
</script>

<div class={component.className('__container')} bind:this={rootElm}>
  {#if renderedHtml}
    {@html renderedHtml}
  {/if}
</div>

<style>
  div {
    color: red;
  }
</style>
