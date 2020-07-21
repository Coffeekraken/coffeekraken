const __SSearchResultAction = require('../SSearchResultAction');

/**
 * @name              SSearchResultGotoAction
 * @namespace           node.search.actions
 * @type              Class
 * @extends           SSearchResultAction
 *
 * This class represent the action "goto" that allows you to redirect the user to a new page, etc...
 *
 * @param      {String}       url      The URL where to redirect the user
 * @param      {Object}       [settings={}]     A settings object with these properties availble:
 * - target {_self} (String): Specify the target the same way as the target property on an HTML link
 *
 * @example       js
 * const SSearchResultGotoAction = require('@coffeekraken/sugar/node/doc/actions/SSearchResultGotoAction');
 * const myAction = new SSearchResultGotoAction({
 *    target: '_blank'
 * });
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSearchResultGotoAction extends __SSearchResultAction {
  /**
   * @name        _url
   * @type        Object
   * @private
   *
   * Store the url where to send the user
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _url = null;

  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @param       {String}      url         THe url where to send the user
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(url, settings = {}) {
    super('goto', settings);
    this._url = url;
  }

  /**
   * @name        url
   * @url        String
   * @get
   *
   * Access the url property
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get url() {
    return this._url;
  }

  /**
   * @name            toJson
   * @type            Function
   *
   * This method return a JSON version of the docMap item
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toJson() {
    return {
      ...super.toJson(),
      target: this._settings.target || '_self',
      url: this.url
    };
  }
};
