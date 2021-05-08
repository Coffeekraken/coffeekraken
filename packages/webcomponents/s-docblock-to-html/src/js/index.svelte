<svelte:options tag="s-docblock-to-html" />

<script type="text/ts">
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

  component.beforeUpdate(() => {});
  component.onMount(async () => {
    console.log('MOU');

    const docblock = new __SDocblock(component.$elm.innerHTML);
    const docblockHtmlRenderer = new SDocblockHtmlRenderer(docblock);
    const html = await docblockHtmlRenderer.render();

    console.log('HTML', html);
  });
</script>

<div class={component.className()} />

<style>
</style>
