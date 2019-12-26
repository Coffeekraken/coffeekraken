import __goldenLayout from '../golden-layout';
import NotificationWebcomponent from '@coffeekraken/notification-webcomponent/js/class'
import SSocketDom from '../../../../../../util/sugar/dist/js/class/SSocketDom'
import SUrl from '../../../../../../util/sugar/dist/js/class/SUrl'
import aes from '../../../../../../util/sugar/dist/js/crypt/aes'
import __innerHtml from '../../../../../../util/sugar/dist/js/dom/innerHtml'
import __strToHtml from '../../../../../../util/sugar/dist/js/string/strToHtml'
import __style from '../../../../../../util/sugar/dist/js/dom/style'
import __lettersInReveal from '@coffeekraken/text-intro/js/lettersInReveal'
import __whenInViewport from '../../../../../../util/sugar/dist/js/dom/whenInViewport'


class CodePlayground {

  constructor() {
    // init socket
    this._socketDom = this._initSocket()

    // listen for compilation errors
    this._listenCompilationErrors();

    const _url = new SUrl();

    this._socketDom.init().then(() => {

      // register some events
      this._registerSocketEvents();

      // if we don't have any app specified, emit an error
      if (_url.pathname === '/encrypt-url') {
        this._socketDom.emit('encryptUrl');
        return;
      } else if (_url.pathname) {
        const appUrl = aes.decrypt(_url.pathname.slice(1));
        if (appUrl.indexOf('github.com') > -1) {
          this._socketDom.emit('githubApp', appUrl);
        } else {
          this._socketDom.emit('noAppSpecified');
          return;
        }
      }
    });

    // listen for some events
    document.addEventListener('encryptUrl', (e) => {
      const $input = document.querySelector(e.detail.target);
      const url = $input.value;
      const crypted = aes.encrypt(url);
      document.querySelector('#encrypt-url-result').innerHTML = crypted;
    });

  }

  /**
   * Init socket
   */
  _initSocket() {
    this._socketDom = new SSocketDom('http://localhost:3000', {

    });
    return this._socketDom;
  }

  /**
   * Register some socket events
   */
  _registerSocketEvents() {
    // loading event
    this._socketDom.registerEvent('loading', (data, settings) => {
      document.querySelector('.loading__meta').innerHTML = data;
    });
    this._socketDom.registerEvent('editors', (data, settings) => {
      const $content = document.getElementById('content');
      $content.innerHTML = `<div>${data}</div>`;
      const $nodes = $content.firstChild;
      const content = __goldenLayout($nodes);
    });
    this._socketDom.registerEvent('topLinks', (data, settings) => {
      __innerHtml(document.getElementById('top-links'), data, {
        animIn: 'fadeRight'
      });
    });
    this._socketDom.registerEvent('packageJson', (data, settings) => {
      document.getElementById('title').innerHTML = data.name;
      __lettersInReveal(0);
    });
  }

  /**
   * Listen for compilation errors
   */
  _listenCompilationErrors() {
    // listen for compilation error
    document.body.addEventListener('compileError', (e) => {
    	NotificationWebcomponent.notify({
    		type : 'error',
    		title : 'Woups...',
    		body : e.detail.error,
    		timeout : 20000
    	});
    });
  }

}

export default CodePlayground;
