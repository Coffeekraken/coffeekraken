<svelte:options tag="s-docblock-to-html" />

<script lang="ts">
  import __SSvelteComponent from '@coffeekraken/s-svelte-component';
  import __SDocblockToHtmlComponentInterface from './interface/SDocblockToHtmlComponentInterface';
  import __SDocblock from '@coffeekraken/s-docblock';
  import { SDocblockHtmlRenderer } from '@coffeekraken/s-docblock-renderer';

  class MyCoolComponent extends __SSvelteComponent {
    static interface = __SDocblockToHtmlComponentInterface;
    constructor(params) {
      super(params, {
        svelteComponent: {}
      });
    }
  }

  const component = new __SSvelteComponent($$props, {
    svelteComponent: {
      classPrefix: 's-docblock-to-html',
      interface: __SDocblockToHtmlComponentInterface
    }
  });
  let {} = component.props;

  let container;

  component.beforeUpdate(() => {});
  component.onMount(async () => {
    const docblock = new __SDocblock(component.$elm.innerHTML);
    const docblockHtmlRenderer = new SDocblockHtmlRenderer(docblock);
    const html = await docblockHtmlRenderer.render();
    container.innerHTML = html;
  });
</script>

<div class={component.className('__container')} bind:this={container} />

<!-- <div class={component.className()} /> -->
<style>
  div {
    color: red;
  }
</style>
