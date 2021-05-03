<svelte:options tag="s-filtrable-input" />

<script type="text/ts">
  import __SSvelteComponent from '@coffeekraken/s-svelte-component';
  import __SFiltrableInputComponentInterface from './interface/SFiltrableInputComponentInterface';
  import __clone from '@coffeekraken/sugar/shared/object/clone';

  class MyCoolComponent extends __SSvelteComponent {
    static interface = __SFiltrableInputComponentInterface;
    constructor(params) {
      super(params, {
        svelteComponent: {}
      });
    }
  }

  const component = new __SSvelteComponent($$props, {
    svelteComponent: {
      classPrefix: 's-filtrable-input',
      interface: __SFiltrableInputComponentInterface
    }
  });
  let { value, template, noItemTemplate, filtrable } = component.props;

  const items = [
    {
      title: 'Hello',
      body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
    },
    {
      title: 'Coco',
      body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
    },
    {
      title: 'Plopfopof',
      body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
    }
  ];

  let filteredItems = items;

  function filterItems() {
    filteredItems = items
      .map((item) => __clone(item))
      .filter((item) => {
        let matchFilter = false;
        for (let i = 0; i < Object.keys(item).length; i++) {
          const propName = Object.keys(item)[i],
            propValue = item[propName];

          // prevent not string value
          if (typeof propValue !== 'string') continue;
          // check if the current propName is specified in the filtrable list
          if (filtrable.indexOf(propName) !== -1) {
            const reg = new RegExp(value, 'gi');
            if (propValue.match(reg)) {
              matchFilter = true;
              if (value && value !== '') {
                console.log('val', value);
                const reg = new RegExp(value, 'gi');
                const finalString = propValue.replace(reg, (str) => {
                  return `<span class="${component.className(
                    '__list-item-highlight'
                  )}">${str}</span>`;
                });
                item[propName] = finalString;
              }
            }
          }
        }
        return matchFilter;
      });
  }

  component.beforeUpdate(() => {
    if (!template) {
      const templateElm = document.querySelector(
        's-filtrable-input template#item'
      );
      if (templateElm) {
        template = templateElm.innerHTML;
      }
    }
    if (!noItemTemplate) {
      const templateElm = document.querySelector(
        's-filtrable-input template#no-item'
      );
      if (templateElm) {
        noItemTemplate = templateElm.innerHTML;
      }
    }
  });

  component.onMount(() => {});
</script>

<div class={component.className()}>
  <input
    class={component.className('__input')}
    type="text"
    bind:value
    on:keyup={filterItems}
  />
  <ul class={component.className('__list')}>
    {#if !filteredItems.length}
      <li class={component.className('__list-item __list-no-item')}>
        {@html component.compileMustache(noItemTemplate, {})}
      </li>
    {:else}
      {#each filteredItems as item, idx}
        <li
          style="z-index: {99999 - idx}"
          class={component.className('__list-item')}
        >
          {@html component.compileMustache(template, item)}
        </li>
      {/each}
    {/if}
  </ul>
</div>

<style>
  .s-filtrable-input {
    display: inline-block;
    position: relative;
  }

  .s-filtrable-input__list {
    position: absolute;
    top: 100%;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    opacity: 0;
    max-width: calc(100vw - 100px);
    pointer-events: none;
    /* min-width: 100%; */
    width: 50vw;

    padding: sugar.space(40);
    @sugar.depth (5);

    .s-filtrable-input__input:focus + &,
    &:focus {
      opacity: 1;
      pointer-events: all;
    }
  }

  /* .s-filtrable-input--ontop & {
      bottom: 100%;
      top: initial;
    } */

  .s-filtrable-input__list-item {
    cursor: pointer;
    background-color: sugar.color(surface, 50);
    padding: sugar.space(50);
    position: relative;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: sugar.color(surface, 55);
      @sugar.depth (2);
    }

    * {
      pointer-events: none;
    }
  }

  .s-filtrable-input__list-item-highlight {
    background-color: sugar.color(primary);
  }
</style>
