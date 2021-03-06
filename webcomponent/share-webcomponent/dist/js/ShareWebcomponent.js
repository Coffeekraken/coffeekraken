"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sNativeWebComponent = _interopRequireDefault(require("@coffeekraken/sugar/js/core/sNativeWebComponent"));

var _sharerNpm = _interopRequireDefault(require("sharer.npm.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name 	ShareWebcomponent
 * @namespace       share-webcomponent
 * @type      Class
 * @extends 	native(HTMLAnchorElement)
 *
 * Easily create some share buttons to target facebook, twitter, linkedin, google+, etc...
 *
 * @example 	html
 * <a is="ck-share" href="#" network="facebook" title="Share on facebook">
 * 	Share on facebook
 * </a>
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
class ShareWebcomponent extends (0, _sNativeWebComponent.default)(HTMLAnchorElement) {
  /**
   * Default props
   * @definition 		SWebComponent.defaultProps
   * @protected
    * @static
   */
  static get defaultProps() {
    return {
      /**
       * On which network to share the content
       * @prop
       * @type 		{String}
       * @values 		twitter, facebook, linkedin, googleplus, email, whatsapp, telegram, viber, pinterest, tumblr, hackernews, reddit, vk, buffer, xing, line, instapaper, pocket, digg, stumbleupon, flipboard, weibo, renren, myspace, blogger, baidu, okru
       */
      network: null,

      /**
       * Set the title to share
       * @prop
       * @type 		{String}
       * @default 	document.title
       */
      title: null,

      /**
       * Set the url to share
       * @prop
       * @type 		{String}
       * @default 	document.location.href
       */
      url: null,

      /**
       * Set a username to tweet through without @
       * @prop
       * @type 		{String}
       */
      via: null,

      /**
       * Set some hashtags to add to tweet comma separated without #
       * @prop
       * @type 		{String}
       */
      hashtags: null,

      /**
       * Set an email address to share to
       * @prop
       * @type 		{String}
       */
      to: null,

      /**
       * Set the email subject
       * @prop
       * @type 		{String}
       * @default 	document.title
       */
      subject: null,

      /**
       * Set the absolute image url to share through (pinterest,vk,weibo)
       * @prop
       * @type 		{String}
       */
      image: null,

      /**
       * Set the description to share (pinterest,instapaper,myspace,blogger,)
       * @prop
       * @type 		{String}
       * @default 	meta[description]
       */
      description: null,

      /**
       * Set the caption to share (tumblr,vk)
       * @prop
       * @type 		{String}
       * @default 	document.title
       */
      caption: null,

      /**
       * Set the tags to share comma separated (tumblr)
       * @prop
       * @type 		{String}
       */
      tags: null
    };
  }
  /**
   * Required props
   * @definition 		SWebComponent.requiredProps
   * @protected
    * @static
   */


  static get requiredProps() {
    return ['network'];
  }
  /**
   * Css
   * @protected
    * @static
   */


  static defaultCss(componentName, componentNameDash) {
    return `
			${componentNameDash} {
				cursor: pointer;
			}
		`;
  }
  /**
   * Component will mount
  	 * @definition 		SWebComponent.componentWillMount
   * @protected
   */


  componentWillMount() {
    super.componentWillMount();
  }
  /**
   * Mount component
   * @definition 		SWebComponent.componentMount
   * @protected
   */


  componentMount() {
    super.componentMount(); // list all attributes available for each networks

    this._networkAttrs = {
      twitter: ['title', 'url', 'hashtags', 'via'],
      facebook: ['url', 'hashtag'],
      linkedin: ['url'],
      googleplus: ['url'],
      email: ['title', 'url', 'to', 'subject'],
      whatsapp: ['title', 'url', 'web'],
      telegram: ['title', 'url', 'to'],
      viber: ['title', 'url'],
      pinterest: ['url', 'image', 'description'],
      tumblr: ['url', 'title', 'caption', 'tags'],
      hackernews: ['url', 'title'],
      reddit: ['url'],
      vk: ['url', 'title', 'image', 'caption'],
      buffer: ['url', 'title', 'via', 'picture'],
      xing: ['url', 'title'],
      line: ['url', 'title'],
      instapaper: ['url', 'title', 'description'],
      pocket: ['url'],
      digg: ['url'],
      stumbleupon: ['title', 'url'],
      flipboard: ['title', 'url'],
      weibo: ['url', 'title', 'image', 'apikey', 'relateui'],
      renren: ['url'],
      myspace: ['url', 'title', 'description'],
      blogger: ['url', 'title', 'description'],
      baidu: ['url', 'title'],
      okru: ['url', 'title'],
      evernote: ['url', 'title'],
      skype: ['url', 'title'],
      trello: ['url', 'title', 'description']
    }; // listen for click on the element

    this.addEventListener('click', this._onClick.bind(this));
  }
  /**
   * Component unmount
   * @definition 		SWebComponent.componentUnmount
   * @protected
   */


  componentUnmount() {
    super.componentUnmount();
  }
  /**
   * Component will receive prop
   * @definition 		SWebComponent.componentWillReceiveProp
   * @protected
   */


  componentWillReceiveProp(name, newVal, oldVal) {
    switch (name) {}
  }
  /**
   * Render the component
   * Here goes the code that reflect the this.props state on the actual html element
   * @definition 		SWebComponent.render
   * @protected
   */


  render() {
    super.render();
  }
  /**
   * Get default share attributes
   * @param 		{String} 		attr 		The attribute name to process
   * @return 		{String} 					The default attribute
   */


  _getDefaultShareAttriute(attr) {
    switch (attr) {
      case 'title':
      case 'subject':
      case 'caption':
        return document.title;
        break;

      case 'description':
        const descElm = document.querySelector('meta[name="description"]');
        if (descElm && descElm.content) return descElm.content;
        break;

      case 'url':
        let href = this.getAttribute('href');
        return href && href !== '#' ? href : document.location.href;
        break;
    }

    return null;
  }
  /**
   * Handle click
   * @param 		{Event} 		e 		The click event
   */


  _onClick(e) {
    e.preventDefault(); // loop on network attributes

    if (!this._networkAttrs[this.props.network]) return;
    this.setAttribute('data-sharer', this.props.network);

    this._networkAttrs[this.props.network].forEach(attr => {
      if (this.hasAttribute(`data-${attr}`)) return;
      let val = this.props[attr];

      if (!val) {
        val = this._getDefaultShareAttriute(attr);
      }

      if (val) {
        this.setAttribute(`data-${attr}`, val);
      }
    }); // create a new sharer


    const sharer = new _sharerNpm.default(this);
    sharer.share();
  }

}

exports.default = ShareWebcomponent;
module.exports = exports.default;