<template>

    <div :class="component?.className()" :toolbar-position="component?.props.toolbarPosition" ref="root">

        <div ref="templates">
          <slot></slot>
        </div>

        <header v-if="component" ref="header" :class="component.className('__nav')">
            <ol :class="component.className('__tabs', component.props.defaultStyleClasses.main)">
            <li :class="component.className('__tab')"
                :id="item.id"
                :active="activeTabId === item.id ? true : null"
                @click="setActiveTabByTab"
                v-for="(item, idx) in (items ?? [])">
                {{ item.lang }}
            </li>
            </ol>
        </header>
        <div v-if="component" :class="component.className('__content')">
            <div :class="component.className('__toolbar')">
              <s-clipboard-copy ref="copy" @click="copy"></s-clipboard-copy>
            </div>
            <pre :class="component.className('__code')"   
                :id="item.id ?? item.lang"
                :active="activeTabId === (item.id ?? item.lang) ? true : null"
                v-for="(item, idx) in (items ?? [])">
                <code :class="`language-${ item.lang }`">{{ item.code }}</code>
            </pre>
        </div>
    </div>

</template>

<style scoped>

    .s-code-example {  
        display: block;

            &[toolbar-position="nav"] {
              position: relative;
          }
      }

      .s-code-example__slot {
        display: none;
      }

      .s-code-example__nav {
      }

      .s-code-example__tabs {
        display: flex;
        list-style: none;
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
      }
      .s-code-example__tab {

      }

      .s-code-example__content {
        overflow: hidden;

        .s-code-example[toolbar-position="content"] & {
          position: relative;
        }
      }

      .s-code-example__code {
        display: none;
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
        line-height: 0;
        overflow: hidden;
        
        &[active] {
          display: block;
        }
      }

      .s-code-example__toolbar {
        
        position: absolute;
        top: sugar.space(20); right: sugar.space(20);
        z-index: 10;

        & > * {
          font-size: 20px;
          opacity: 0.5;

          &:hover {
            opacity: 1;
          }
        }

        s-code-example[toolbar-position="nav"] & {
          top: sugar.space(10);
          right: sugar.space(10);
        }
      }
</style>

<script>
    import prism from 'prismjs';
    import 'prismjs/components/prism-javascript';
    import 'prismjs/components/prism-css';
    import 'prismjs/components/prism-markup';
    import 'prismjs/components/prism-bash';
    import 'prismjs/components/prism-php';
    import 'prismjs/components/prism-markup-templating';
    import __SClipboardCopyComponent from '@coffeekraken/s-clipboard-copy-component';
    import __SCodeExampleComponentInterface from './interface/SCodeExampleComponentInterface.ts';
    import __SComponentUtils from '@coffeekraken/s-component-utils';
    import __whenInViewport from '@coffeekraken/sugar/js/dom/detect/whenInViewport';
    import __wait from '@coffeekraken/sugar/shared/time/wait';

    export default {
      components: {
        SClipboardCopy: __SClipboardCopyComponent
      },
      data() {
          return {
            activeTabId: undefined,
            items: [],
            component: null,
            props: null
          }
      },
        props: [...Object.keys(__SCodeExampleComponentInterface.definition)],
        async mounted() {

          this.component = new __SComponentUtils('s-code-example', this.$el, this.$props, {
            interface: __SCodeExampleComponentInterface,
            display: 'block'
          });

          await __wait();

          await __whenInViewport(this.component.node);

      this.props = this.component.props;

          // this.$copy = this.$('s-clipboard-copy');
          this.$copy = this.$refs.copy;
          this.$templates = Array.from(this.$refs.templates.querySelectorAll('textarea,template'));

          this.$templates.forEach($template => {
              this.items = [...this.items, {
                  id: $template.getAttribute('id') ?? this.component.getAttributeSafely($template, 'language') ?? this.component.getAttributeSafely($template, 'lang'),
                  lang: this.component.getAttributeSafely($template, 'language') ?? this.component.getAttributeSafely($template, 'lang'),
                  code: this.component.getDomPropertySafely($template, 'innerHTML')
              }];
              $template.remove();
          });

          // active idx
          if (this.component.props.active) {
            this.setActiveTab(this.component.props.active);
          } else {
           this.setActiveTab(this.items[0].id);
          }

        },
        methods: {
            setActiveTabByTab(e) {
                this.setActiveTab(e.target.id);
            },
            async setActiveTab(id) {
                await __wait();
                this.activeTabId = id;
                this.initPrismOnTab(id);
            },
            initPrismOnTab(id) {
                const $content = this.$refs.root.querySelector(`pre#${id} code`);

                if ($content.hasAttribute('inited')) return;
                $content.setAttribute('inited', true);
                prism.highlightElement($content);
            },
            copy() {
              const id = this.activeTabId;
                const item = this.items.filter(i => i.id === id)[0];
                this.$copy.copy(item.code);
            }
        }
    
    //     // const themeImport = `@import url('${this.component.props.theme}');`;
    //     // const $style = document.createElement('style');
    //     // $style.type = 'text/css';
    //     // $style.appendChild(document.createTextNode(themeImport));
    //     // this.root.appendChild($style);
    };
</script>
