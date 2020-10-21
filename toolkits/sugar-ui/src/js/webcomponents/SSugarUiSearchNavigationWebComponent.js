import __deepMerge from '@coffeekraken/sugar/js/object/deepMerge';
import __SRequest from '@coffeekraken/sugar/js/http/SRequest';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import __SLitHtmlWebComponent from '@coffeekraken/sugar/js/webcomponent/SLitHtmlWebComponent';

import __SFiltrableInputWebComponent from '@coffeekraken/s-filtrable-input';
__SFiltrableInputWebComponent.define();

/**
 * @name                SSugarUiSearchNavigationWebComponent
 * @namespace           sugar-ui.js.webcomponents
 * @type                Webcomponent
 *
 * Represent the search based navigation in the sugar ui
 *
 * @prop        {String}            [docMapApiUrl='docMap']             Specify the docMap api url to reach
 *
 * @example             html
 * <input is="s-sugar-ui-search-navigation" />
 *
 * @since               2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SSugarUiSearchNavigationWebComponent extends __SLitHtmlWebComponent() {
  static componentName = 'SSugarUiSearchNavigation';

  /**
   * @name            props
   * @type            Object
   * @static
   *
   * Store all the properties definitions
   *
   * @since           2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static props = {
    docMapApiUrl: {
      type: 'String',
      description:
        'Specify the docMap api url to reach in order to get the docMap JSON',
      default: 'docMap'
    }
  };

  static template = (props, settings, lit) => lit.html`
    <div>
      <i class="icon-github"></i>
      <input type="text" is="s-filtrable-input" id="search" no-item-text="MOBILE" :on-select="onSelect" />
    </div>
    
  `;

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since           2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(__deepMerge({}, settings));

    this._navigationStack = [this._main];

    this.on('ready', (e) => {
      this.$search.setSettings({
        props: {
          closeOnSelect: false,
          closeOnEscape: false
        },
        template: {
          item: function (itemObj, settings, lit) {
            switch (itemObj.type) {
              case 'main':
                return lit.html`
                  <li class="search-navigation__item-main">
                    ${this.highlightFilter(itemObj.title)}
                  </li>
                `;
                break;
              case 'api':
                return lit.html`
                  <div class="seach-navigation__item-api">
                    <p>${this.highlightFilter(itemObj.title)}</p>
                    <p>${this.highlightFilter(itemObj.description)}</p>
                  </div>
                `;
                break;
              default:
                return settings.template.item;
                break;
            }
          }
        }
      });

      this._main();
      this._initShortcuts();
    });
  }

  _initShortcuts() {
    __hotkey('ctrl+p').on('press', (e) => {
      // put focus in the field
      this.$search.focus();
    });
    __hotkey('escape').on('press', (e) => {
      console.log('escape');
      if (this._navigationStack.length <= 1) return;
      // pop in the stack
      this._navigationStack.pop();
      // load the resulting navigation
      this._navigationStack[this._navigationStack.length - 1].call(this);
    });
  }

  _main() {
    const items = [
      {
        title: 'Get Started',
        type: 'main'
      },
      {
        title: 'Sugar Toolkit',
        type: 'main',
        onSelect: this._sugarToolkit.bind(this)
      },
      {
        title: 'Webcomponents',
        type: 'main',
        onSelect: this._webcomponents.bind(this)
      },
      {
        title: 'API References',
        type: 'main',
        onSelect: this._apiReferences.bind(this)
      },
      {
        title: 'Community',
        type: 'main',
        onSelect: this._community.bind(this)
      }
    ];
    this.$search.props.items = items;
  }

  async _sugarToolkit() {
    this._navigationStack.push(this._sugarToolkit);
    const items = [
      {
        title: 'What is Sugar?',
        type: 'main',
        href: '/sugar/what-is-sugar'
      },
      {
        title: 'Get Started',
        type: 'main',
        href: '/sugar/get-started'
      },
      {
        title: 'API References',
        type: 'main',
        href: '/sugar/api-references'
      }
    ];
    this.$search.props.items = items;
  }

  async _webcomponents() {
    this._navigationStack.push(this._webcomponents);
    const items = [
      {
        title: 'What are Webcomponents?',
        type: 'main',
        href: '/webcomponents/what-are-webcomponents'
      },
      {
        title: 'Build your own',
        type: 'main',
        href: '/webcomponents/build-your-own'
      },
      {
        title: 'API References',
        type: 'main',
        href: '/webcomponents/api-references'
      }
    ];
    this.$search.props.items = items;
  }

  async _apiReferences() {
    this._navigationStack.push(this._apiReferences);

    // cache
    if (this._apiReferencesItems) {
      this.$search.props.items = this._apiReferencesItems;
      return;
    }

    // put the input in loading mode
    this.$search.props.loading = true;
    const request = new __SRequest({
      url: this.props.docMapApiUrl,
      method: 'GET'
    });
    const json = await request.send();

    // add the items in the navigation
    let items = Object.keys(json.data).map((key) => {
      const itemObj = json.data[key];
      return {
        title: key,
        description: itemObj.description,
        type: 'api'
      };
    });
    this._apiReferencesItems = items;

    this.$search.props.loading = false;
    this.$search.props.items = items;
  }

  async _community() {
    this._navigationStack.push(this._community);

    const items = [
      {
        title: 'Github',
        type: 'main',
        href: 'https://github.com/coffeekraken'
      },
      {
        title: 'Facebook',
        type: 'main',
        href: 'https://facebook.com/coffeekraken'
      }
    ];
    this.$search.props.items = items;

    console.log('community');
  }
}
