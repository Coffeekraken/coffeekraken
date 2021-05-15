<svelte:options tag="s-nested" />

<script lang="ts">
  import __SSvelteComponent from '@coffeekraken/s-svelte-component';

  class MyCoolComponent extends __SSvelteComponent {
    constructor(params) {
      super(params, {
        svelteComponent: {}
      });
    }
  }

  const component = new MyCoolComponent($$props);
  let {} = component.props;

  component.onMount(() => {
    console.log('COCOCOC');
  });
</script>

<h1>Hello nested!</h1>

<style>
  h1 {
    color: green;
  }
</style>
