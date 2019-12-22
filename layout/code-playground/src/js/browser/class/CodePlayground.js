import NotificationWebcomponent from '@coffeekraken/notification-webcomponent/js/class'
import SSocketDom from '../../../../../../util/sugar/dist/js/class/SSocketDom'
import SUrl from '../../../../../../util/sugar/dist/js/class/SUrl'


class CodePlayground {

  constructor() {
    // init socket
    this._socketDom = this._initSocket()

    // listen for compilation errors
    this._listenCompilationErrors();

    const _url = new SUrl();
    // get the encrypted app string
    const _appString = _url.query.app;
    console.log(_url);

    this._socketDom.init().then(() => {
      // if we don't have any app specified, emit an error
      if (!_appString) {
        this._socketDom.emit('noAppSpecified');
        return;
      }
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
