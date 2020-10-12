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
    ...__SFiltrableInputWebComponent.props,
    docMapApiUrl: {
      type: 'String',
      description:
        'Specify the docMap api url to reach in order to get the docMap JSON',
      default: 'docMap'
    }
  };

  static template = (props, settings, lit) => lit.html`
    <input type="text" is="s-filtrable-input" id="search" no-item-text-mobile="MOBILE" />
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

    this.on('ready', () => {
      this._initShortcuts();
      if (this.props.docMapApiUrl) {
        this._loadDocMapJson();
      }
    });
  }

  _initShortcuts() {
    __hotkey('ctrl+p').on('press', (e) => {
      // put focus in the field
      this.$search.focus();
    });
  }

  async _loadDocMapJson() {
    const request = new __SRequest({
      url: this.props.docMapApiUrl,
      method: 'GET'
    });
    const json = await request.send();

    // add the items in the navigation
    let currentItems = this.$search.props.items;
    currentItems = [
      ...currentItems,
      ...Object.keys(json.data).map((key) => {
        const itemObj = json.data[key];
        return {
          title: key,
          description: itemObj.description
        };
      })
    ];
    this.$search.props.items = currentItems;
  }
}
