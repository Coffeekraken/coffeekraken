import __deepMerge from '../../../web_modules/@coffeekraken/sugar/js/object/deepMerge.js';
import __SRequest from '../../../web_modules/@coffeekraken/sugar/js/http/SRequest.js';
import __hotkey from '../../../web_modules/@coffeekraken/sugar/js/keyboard/hotkey.js';
import __SLitHtmlWebComponent from '../../../web_modules/@coffeekraken/sugar/js/webcomponent/SLitHtmlWebComponent.js';

import __SFiltrableInputWebComponent from '../../../web_modules/@coffeekraken/s-filtrable-input.js';
__SFiltrableInputWebComponent.define({
  name: 'SSugarUiInputNavigation'
});

/**
 * @name                SSugarUiWebComponent
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
export default class SSugarUiWebComponent extends __SLitHtmlWebComponent() {
  static componentName = 'SSugarUi';

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

  static template = function (props, settings, lit) {
    return lit.html`
      <div class="${this.selector('main')}">
        <a class="${this.selector(
          'logo'
        )}" href="https://coffeekraken.io" target="_blank">
          <i class="${this.selector('coffeekraken-logo')}"></i>
        </a>
        <div class="${this.selector('nav')}">
          <input type="text" is="s-sugar-ui-input-navigation" class="${this.selector(
            'nav-input'
          )}" placeholder="Search and navigation" id="nav" no-item-text="MOBILE" />
        </div>
        <div class="${this.selector('utils')}">
          <a href="https://github.com/coffeekraken" target="_blank">
            <i class="icon-github"></i>
          </a>
        </div>
      </div>`;
  };

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
      this.$nav.setSettings({
        props: {
          closeOnSelect: false,
          closeOnEscape: false
        },
        template: {
          item: function (itemObj, settings, lit) {
            switch (itemObj.type) {
              case 'main':
                return lit.html`
                    <i class="icon-${itemObj.icon}"></i> ${this.highlightFilter(
                  itemObj.title
                )}
                `;
                break;
              case 'api':
                return lit.html`
                  <div class="seach-navigation__item-api">
                    ${
                      itemObj.icon
                        ? lit.html`
                      <i class="icon-${itemObj.icon}"></i> 
                    `
                        : ''
                    }
                    <p class="${this.selector(
                      'list-item-title'
                    )}"><span class="${this.selector('list-item-extension')}">${
                  itemObj.extension
                }</span> ${this.highlightFilter(itemObj.title)}</p>
                    <p class="${this.selector(
                      'list-item-description'
                    )}">${this.highlightFilter(itemObj.description)}</p>
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
      this.$nav.focus();
    });
    console.log('INIT');
    __hotkey('escape').on('press', (e) => {
      console.log(this._navigationStack);
      if (this._navigationStack.length <= 1) {
        this.$nav.escape();
        return;
      }
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
        icon: 'start',
        type: 'main'
      },
      {
        title: 'Sugar Toolkit',
        icon: 'toolkit',
        type: 'main',
        onSelect: this._sugarToolkit.bind(this)
      },
      {
        title: 'Webcomponents',
        icon: 'component',
        type: 'main',
        onSelect: this._webcomponents.bind(this)
      },
      {
        title: 'API References',
        icon: 'api',
        type: 'main',
        onSelect: this._apiReferences.bind(this)
      },
      {
        title: 'Community',
        icon: 'community',
        type: 'main',
        onSelect: this._community.bind(this)
      }
    ];
    this.$nav.props.items = items;
  }

  async _sugarToolkit() {
    this._navigationStack.push(this._sugarToolkit);
    const items = [
      {
        title: 'What is Sugar?',
        icon: 'what',
        type: 'main',
        href: '/sugar/what-is-sugar'
      },
      {
        title: 'Get Started',
        icon: 'start',
        type: 'main',
        href: '/sugar/get-started'
      },
      {
        title: 'API References',
        icon: 'api',
        type: 'main',
        href: '/sugar/api-references'
      }
    ];
    this.$nav.props.items = items;
  }

  async _webcomponents() {
    this._navigationStack.push(this._webcomponents);
    const items = [
      {
        title: 'What are Webcomponents?',
        icon: 'what',
        type: 'main',
        href: '/webcomponents/what-are-webcomponents'
      },
      {
        title: 'Build your own',
        icon: 'build',
        type: 'main',
        href: '/webcomponents/build-your-own'
      },
      {
        title: 'API References',
        icon: 'api',
        type: 'main',
        href: '/webcomponents/api-references'
      }
    ];
    this.$nav.props.items = items;
  }

  async _apiReferences() {
    this._navigationStack.push(this._apiReferences);

    // cache
    if (this._apiReferencesItems) {
      this.$nav.props.items = this._apiReferencesItems;
      return;
    }

    // put the input in loading mode
    this.$nav.props.loading = true;
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
        type: 'api',
        extension: itemObj.extension
      };
    });
    this._apiReferencesItems = items;

    this.$nav.props.loading = false;
    this.$nav.props.items = items;
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
    this.$nav.props.items = items;
  }
}
