// @ts-nocheck

import { define as __sFiltrableInputDefine } from '@coffeekraken/s-filtrable-input-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __SRequest from '@coffeekraken/s-request';
import __cursorToEnd from '@coffeekraken/sugar/js/dom/input/cursorToEnd';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import { html } from 'lit';

__sFiltrableInputDefine(
  {
    value: 'name',
    label: (item) => {
      return `${item.type} ${item.namespace}`;
    },
    closeOnSelect: true,
    resetOnSelect: false,
    showKeywords: true,
    saveState: true,
    filtrable: ['namespace', 'name', 'type'],
    searchValuePreprocess: (value) => {
      // "@" searches
      if (value.match(/^@[a-z_-]+\s.*/)) {
        return value.replace(/^@[a-z_-]+\s/, '').trim();
      }
      if (value.match(/^@[a-z_-]+/)) {
        return value.replace(/^@/, '').trim();
      }

      // "/" searches
      if (value.match(/^\/[a-z]+\s.*/)) {
        return value.replace(/^\/[a-z]+\s/, '').trim();
      }
      if (value.match(/^\/[a-z]+/)) {
        return value.replace(/^\//, '').trim();
      }

      // default
      return value;
    },
    templates: ({ type, item, html, unsafeHTML }) => {
      if (type === 'item') {
        switch (item.type) {
          case 'category':
          case 'package':
            return html`
              <div class="ck-search__list-item">
                <div class="s-flex s-mbe:10">
                  <h4
                    class="ck-search__list-item-title s-typo:bold s-tc:accent s-flex-item:grow"
                  >
                    ${unsafeHTML(item.name)}
                  </h4>
                </div>
                <p class="__description s-typo:p s-truncate:2">
                  ${unsafeHTML(item.description ?? '')}
                </p>
              </div>
            `;
            break;
          default:
            return html`
              <div class="ck-search__list-item">
                <div class="s-flex s-mbe:10">
                  <h4
                    class="ck-search__list-item-title s-typo:bold s-tc:accent s-flex-item:grow"
                  >
                    ${unsafeHTML(item.name)}
                  </h4>
                  <div>
                    ${item.platform?.map(
                      (platform) => html`
                        <i class="s-platform:${platform.name}"></i>
                      `
                    )}
                    &nbsp;
                    <span class="s-badge s-color:main"
                      >${unsafeHTML(item.type?.types?.[0].type ?? '')}</span
                    >
                  </div>
                </div>
                <p class="__namespace s-opacity:50 s-font:20 s-mbe:20">
                  ${unsafeHTML(item.namespace ?? '')}
                </p>
                <p class="__description s-typo:p s-truncate:2">
                  ${unsafeHTML(item.description ?? '')}
                </p>
              </div>
            `;
            break;
        }
      }
    },
    items: async ({ value }) => {
      async function fetchItems() {
        const request = new __SRequest({
          url: '/docmap.json',
        });
        const result = await request.send();
        const items = [];

        Object.keys(result.data.map).forEach((namespace) => {
          const item = result.data.map[namespace];
          item.fullNamespace = namespace;
          item.preventSet = true;
          items.push(item);
        });

        return items;
      }

      let items = await fetchItems();

      if (value.match(/^@([a-z_-]+)?$/)) {
        let packageName = value.replace(/^@/, '');

        let packages = {};
        items.forEach((item) => {
          if (item.package.name.includes(`@coffeekraken/${packageName}`)) {
            if (!packages[item.package.name]) {
              packages[item.package.name] = {
                value: `@${item.package.name.replace('@coffeekraken/', '')}`,
                namespace: item.package.name,
                type: 'package',
                name: item.package.name,
                description: item.package.description,
                preventClose: true,
                props: {
                  value: 'value',
                },
              };
            }
          }
        });
        return Object.values(packages);
      }

      if (value.match(/^\/([a-z]+)?$/)) {
        return [
          {
            value: '/doc',
            namespace: '/doc',
            type: 'category',
            name: 'Documentation',
            description: 'Search through the documentation',
            preventClose: true,
            props: {
              value: 'value',
            },
          },
          {
            value: '/styleguide',
            namespace: '/styleguide',
            type: 'category',
            name: 'Styleguide',
            description: 'Search through the styleguide',
            preventClose: true,
            props: {
              value: 'value',
            },
          },
          {
            value: '/api',
            namespace: '/api',
            type: 'category',
            name: 'API',
            description: 'Search through the API',
            preventClose: true,
            props: {
              value: 'value',
            },
          },
        ];
      }

      if (value.match(/^@[a-z_-]+\s.*?/)) {
        const packageName = `@coffeekraken/${value
          .replace(/^@/, '')
          .split(' ')[0]
          .trim()}`;
        return items.filter((item) => {
          return item.package.name.startsWith(packageName);
        });
      }

      if (value.match(/^\/[a-z]+.*?/)) {
        if (value.startsWith('/doc')) {
          return items.filter((item) => {
            return item.type === 'Markdown';
          });
        }
        if (value.startsWith('/styleguide')) {
          return items.filter((item) => {
            return item.type === 'Styleguide';
          });
        }
        if (value.startsWith('/api')) {
          return items.filter((item) => {
            return item.type !== 'Markdown' && item.type !== 'Styleguide';
          });
        }
      }

      return items;
    },
  },
  'ck-search-input'
);

export default class CKSearch extends __SLitComponent {
  static get properties() {
    return __SLitComponent.createProperties();
  }

  constructor() {
    super({
      shadowDom: false,
    });
  }
  $input;
  _search;
  firstUpdated() {
    this.$input = this.querySelector('input');

    // if (document.location.hash) {
    //     this._handleAnchor(document.location.hash.replace('#', ''));
    // }

    __hotkey('ctrl+f').on('press', () => {
      __cursorToEnd(this.$input);
    });

    this.addEventListener('s-filtrable-input.select', (e) => {
      const { item, $elm } = e.detail;

      if (item.type === 'category' || item.type === 'package') {
        this.$input.value = item.value + ' ';
        __cursorToEnd(this.$input);
      } else {
        if (item.menu?.slug) {
          if (item.package.name !== __SEnv.env.PACKAGE.name) {
            $elm.dispatchEvent(
              new CustomEvent('location.href', {
                detail: `/package/${item.package.name}${item.menu.slug}`,
                bubbles: true,
              })
            );
          } else {
            $elm.dispatchEvent(
              new CustomEvent('location.href', {
                detail: `${item.menu.slug}`,
                bubbles: true,
              })
            );
          }
        } else {
          $elm.dispatchEvent(
            new CustomEvent('location.href', {
              detail: `/api/${item.fullNamespace}`,
              bubbles: true,
            })
          );
        }
      }
    });
  }
  render() {
    return html`
      <div class="ck-search" s-deps css="ckSearch">
        <div class="ck-search__background"></div>
        <div class="ck-search__content">
          <ck-search-input id="ck-search-input">
            <input
              placeholder="Search ( Ctrl+F )..."
              type="text"
              name="search"
              value="${this._search}"
              class="s-input s-color:accent s-scale:08"
            />
            <template type="before">
              <div class="s-p:30" id="search-tips">
                <p class="s-mbe:20">
                  <span class="s-typo:p s-tc:current">Search tips</span>
                </p>
                <p class="s-typo:p s-color:accent">
                  <span class="s-badge:outline s-mie:10">/...</span>
                  Categories&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="s-badge:outline s-mie:10"
                    >@...</span
                  >
                  Packages&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="s-badge s-color:complementary s-mie:10"
                    >CTRL+F</span
                  >
                  Search
                </p>
              </div>
            </template>
          </ck-search-input>
        </div>
      </div>
    `;
  }
}

export function define(props: any = {}, tagName = 'ck-search') {
  __SLitComponent.define(CKSearch, props, tagName);
}
