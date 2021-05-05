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
  let {
    value,
    template,
    noItemTemplate,
    filtrable,
    maxItems
  } = component.props;

  let input;

  const items = [
    {
      title: 'Hello',
      body: `Lorem Ipsum is simply dummy text of the printing`
    },
    {
      title: 'Coco',
      body: `Lorem Ipsum is simply dummy text of the printing`
    },
    {
      title: 'Plopfopof',
      body: `Lorem Ipsum is simply dummy text of the printing`
    }
  ];
  for (let i = 0; i < 1000; i++) {
    items.push({
      title: 'Coco ' + i,
      body: `Lorem Ipsum is simply dummy text of the printing`
    });
  }

  let filteredItems = items;

  function filterItems() {
    let matchedItemsCount = 0;
    filteredItems = items
      .map((item) => __clone(item))
      .filter((item) => {
        if (matchedItemsCount >= maxItems) return false;

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
              matchedItemsCount++;
              matchFilter = true;
              if (value && value !== '') {
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
    if (!inputStr) {
    }

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

  let inputStr;
  inputStr = component.rootElm.querySelector('input').outerHTML);
  if (inputStr.includes('class="')) {
	  inputStr = inputStr.replace('class="', `class="${component.className('__input')} `);
  }

  component.onMount(() => {
    filterItems();
  });
</script>

<div class={component.className()}>
  {@html inputStr}
  <ul class={component.className('__list')}>
    {#if !filteredItems.length}
      <li class={component.className('__list-item __list-no-item')}>
        {@html component.compileMustache(noItemTemplate, {})}
      </li>
    {:else}
      {#each filteredItems as item, idx}
        <li
          style="z-index: {999999999 - idx}"
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
    @sugar.scope.bare {
      display: inline-block;
      position: relative;

      .s-filtrable-input__list {
        position: absolute;
        top: 100%;
        left: 0;
        overflow-x: hidden;
        overflow-y: auto;
        opacity: 0;
        max-width: calc(100vw - 100px);
        pointer-events: none;
      }

      .s-filtrable-input__input:focus + .s-filtrable-input__list,
      .s-filtrable-input__list:focus {
        opacity: 1;
        pointer-events: all;
      }

      /* .s-filtrable-input--ontop & {
			bottom: 100%;
			top: initial;
			} */

      .s-filtrable-input__list-item {
        cursor: pointer;
        position: relative;

        * {
          pointer-events: none;
        }
      }
    }
  }

  .s-filtrable-input {
    @sugar.scope.lnf {
      .s-filtrable-input__list {
        /* width: 50vw;*/
        @sugar.style.apply (list);
      }

      /* .s-filtrable-input--ontop & {
		bottom: 100%;
		top: initial;
		} */

      /* .s-filtrable-input__list-item {
        background-color: sugar.color(surface, 50);
        padding: sugar.space(50);
        transition: all 0.2s ease-in-out;

        &:hover {
          background-color: sugar.color(surface, 55);
          @sugar.depth (2);
        }
      } */

      .s-filtrable-input__list-item-highlight {
        background-color: sugar.color(primary);
      }
    }
  }
</style>
