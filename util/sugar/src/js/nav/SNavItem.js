import __SNav from './SNav';
import __deepMerge from '../object/deepMerge';

/**
 * @name              SNavItem
 * @namespace           js.nav
 * @type              Class
 *
 * This class represent a navigation item with some properties like the actions, the id, the text, etc...
 *
 * @param       {String}                id                  A uniqid for this nav item
 * @param       {String}                text                The text of the item
 * @param       {String}                action              THe action to do on click. Can be a one of these options:
 * - A standard link like "http://..."
 * - A mailto link like "mailto:olivier.bossel@gmail.com"
 * - A scroll link like "scroll:#something"
 * - Others options coming...
 * @param       {Object}                [settings={}]       A settings object to configure your nav tree
 *
 * @example         js
 * import SNavItem from '@coffeekraken/sugar/js/nav/SNavItem';
 * import SNavItem from '@coffeekraken/sugar/js/SNavItem';
 * const myNav = new SNav([
 *    new SNavItem('myCoolItem', 'Something cool', '#anchorLink')
 * ]);
 *
 * @since         2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SNavItem {
  /**
   * @name          _settings
   * @type          Object
   * @private
   *
   * Store the settings object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name          _id
   * @type          String
   * @private
   *
   * Store the id of the nav item
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _id = null;

  /**
   * @name          _text
   * @type          String
   * @private
   *
   * Store the text of the nav item
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _text = {};

  /**
   * @name          _action
   * @type          String
   * @private
   *
   * Store the action of the nav item
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _action = {};

  /**
   * @name          _sNav
   * @type          SNav
   * @private
   *
   * Store the SNav instance in which has been added this nav item
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _sNav = null;

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(id, text, action, settings = {}) {
    this._settings = __deepMerge(
      {
        markdown: {
          ordered: false
        },
        html: {
          li: {
            class: 's-nav__item'
          },
          a: {
            class: 's-nav__item-link'
          }
        }
      },
      settings
    );
    this._id = id;
    this._text = text;
    this._action = action;
  }

  /**
   * @name          id
   * @type          String
   * @get
   *
   * Access the navigation item id
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get id() {
    return this._id;
  }

  /**
   * @name          index
   * @type          String
   * @get
   *
   * Access the navigation item index in the navigation.
   * Return -1 if not in a navigation
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get index() {
    if (!this._sNav) return -1;
    return this._sNav.getItemIndex(this);
  }

  /**
   * @name          text
   * @type          String
   * @get
   *
   * Access the navigation item text
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get text() {
    return this._text;
  }

  /**
   * @name          action
   * @type          String
   * @get
   *
   * Access the navigation item action
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get action() {
    return this._action;
  }

  /**
   * @name          target
   * @type          String
   * @get
   *
   * Access the navigation item target
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get target() {
    return this._settings.target;
  }

  /**
   * @name          toMarkdown
   * @type          Function
   *
   * This method transform the navigation item to a markdown string
   *
   * @param         {Object}        [settings=settings.markdown]        An object of settings to use for the conversion. Here's are the available settings:
   * - ordered (false) {Boolean}: Specify if you want an ordered list
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toMarkdown(settings = {}) {
    settings = __deepMerge(this._settings.markdown, settings);

    if (settings.ordered && this.index === -1) {
      throw new Error(
        `You want an ordered SNavItem markdown list but this SNavItem "${this.id}" does not belong to any SNav instance...`
      );
    }

    const bullet = settings.ordered ? this.index : '-';

    let text = '';
    if (this.action) {
      text = `[${this.action}](${this.text || '...'})`;
    } else {
      text = this.text || '...';
    }

    return `${bullet} ${text}`;
  }

  /**
   * @name          toHtml
   * @type          Function
   *
   * This method transform the navigation item to an HTML string
   *
   * @param         {Object}        [settings=settings.html]        An object of settings to use for the conversion. Here's are the available settings:
   * - ordered (false) {Boolean}: Specify if you want an ordered list
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toHtml(settings = {}) {
    settings = __deepMerge(this._settings.html, settings);

    if (settings.ordered && this.index === -1) {
      throw new Error(
        `You want an ordered SNavItem HTML list but this SNavItem "${this.id}" does not belong to any SNav instance...`
      );
    }

    let text = '';
    if (this.action) {
      text = `<li id="${this.id}" class="${settings.li.class}"><a href="${
        this.action
      }" class="${settings.a.class}" target="${this.target || '__self'}">${
        this.text || '...'
      }</a></li>`;
    } else {
      text = `<li id="${this.id}" class="${settings.li.class}">${
        this.text || '...'
      }</li>`;
    }

    return `${text}`;
  }
}
