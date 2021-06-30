import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SClass from '@coffeekraken/s-class';
import __mustache from 'mustache';
import __SInterface from '@coffeekraken/s-interface';
import __handlebars from 'handlebars';
import __striptags from '@coffeekraken/sugar/shared/html/striptags';

/**
 * @name                SComponentUtils
 * @namespace           shared
 * @type                Class
 * @extends             SClass
 * @status              beta
 *
 * This class allows you to access some component utils like ```className```, and more to come
 *
 * @param       {String}            name                    Specify the component name in dash-case
 * @param       {Object}            [settings={}]           Configure your instance as wanted
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import SComponentUtils from '@coffeekraken/s-component-utils';
 * const component = new SComponentUtils('my-cool-component');
 * component.className('__something'); // => my-cool-component__something
 * component.className('hello'); // => my-cool-component-hello
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface ISComponentUtilsDataProvider {
  getData(): Promise<any>
}

export interface ISComponentUtilsSettings {
  interface?: __SInterface;
}

export interface ISComponentUtilsCtorSettings {
  componentUtils: Partial<ISComponentUtilsSettings>;
}

export default class SComponentUtils extends __SClass {
  
  /**
   * @name            node
   * @type            HTMLElement
   *
   * Store the component node
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  node: HTMLElement;
  
  /**
   * @name            name
   * @type            String
   *
   * Store the component name
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  name: string;

  /**
   * @name            props
   * @type            Object
   *
   * Store the component props
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  props: any;

  /**
   * @name            $targets
   * @type            HTMLElement[]
   *
   * Store the target(s) getted using the "target" property
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  $targets: HTMLElement[] = [];

  _targetSelector?: string;

  /**
   * @name            setDefaultProps
   * @type            Function
   * @static
   * 
   * This static method allows you to set some default props for some particular
   * component(s). You can target components using simple css selectorl like "my-component#cool".
   * Once the component is instanciated, it will check if some defaults are specified and
   * extends them with the passed props.
   * 
   * @param     {String}      selector      The selector to use to target elements on which these props will be applied
   * @param     {Any}         props         An object of props you want to set defaults for
   * 
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static _defaultProps: any = {};
  static setDefaultProps(selector: string, props: any): void {
    this._defaultProps[selector] = props;
  }

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(
    node: HTMLElement,
    props: any,
    settings: Partial<ISComponentUtilsCtorSettings> = {}
  ) {
    super(__deepMerge({}, settings));
    this.node = node;
    this.name = node.tagName.toLowerCase();
    this.props = props ?? {};

    this.node.setAttribute('s-mounted', true);

    Object.keys((<any>this.constructor)._defaultProps).forEach(selector => {
      const defaultProps = (<any>this.constructor)._defaultProps[selector];
      if (selector === this.name || (this.node.id && selector === `#${this.node.id}`) || (this.node.id && selector === `${this.name}#${this.node.id}`)) {
        this.props = __deepMerge(defaultProps, this.props);
      }
    });

    if (this._settings.interface) {
      this._settings.interface.definition = {
        ...this._settings.interface.definition,
        target: {
          type: 'String'
        },
        defaultStyle: {
          type: {
            type: 'Boolean',
            nullishAsTrue: true
          },
          default: false
        }
      };
      Object.keys(this._settings.interface.definition).forEach(propName => {
        const obj = this._settings.interface.definition[propName];
        if (obj.type && (obj.type === 'Boolean' || obj.type === 'boolean')) {
          obj.type = {
            type: 'Boolean',
            nullishAsTrue: true
          }
          this._settings.interface.definition[propName] = obj;
        }
      });

      this.props = this._settings.interface.apply(this.props ?? {}).value;

      if (this.props.target) {
        if (!this.props.target.match(/^(\.|\[])/)) {
          this._targetSelector = `#${this.props.target}`;
        } else {
          this._targetSelector = this.props.target;
        }
        if (this._targetSelector) {
          const targets = Array.from(document.querySelectorAll(this._targetSelector));
          // @ts-ignore
          if (targets.length) this.$targets = targets;
        }
      }

    }

    __handlebars.registerHelper("striptags", function( txt ){
      // exit now if text is undefined 
      if(typeof txt == "undefined") return;
      // replacing the text
      return __striptags(txt);
      
    });

  }

  /**
   * @name          className
   * @type          Function
   *
   * This method allows you to get a component ready className like my-component__something, etc...
   *
   * @param         {String}        cls         The class you want to process. Can be multiple classes separated by a space
   * @return        {String}                    The generated class that you can apply
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  className(cls = '', style = '') {
    let clsString = cls
      .split(' ')
      .map(
        (clsName) =>
          `${this.name}${clsName && !clsName.match(/^__/) ? '-' : ''}${clsName}`
      )
      .join(' ');

    if (style && this.props.defaultStyle) {
      clsString += ` ${style}`;
    }

    return clsString;
  }

  decodeHtml(input) {
    const e = document.createElement('textarea');
    e.innerHTML = input;
    // handle case of empty input
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  }

  /**
   * @name          compileMustache
   * @type          Function
   *
   * This method allows you to compile some mustache template
   * directly from your component.
   *
   * @param         {String}        template        The template to compile
   * @param         {any}           data            The data with which you want to compile your template
   * @return        {String}                        The compiled template
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  compileMustache(template: string, data: any): string {
    const res = __mustache.render(template, data);
    return res;
  }

  /**
   * @name          renderHandlerbars
   * @type          Function
   *
   * This method allows you to compile some mustache template
   * directly from your component.
   *
   * @param         {String}        template        The template to compile
   * @param         {any}           data            The data with which you want to compile your template
   * @return        {String}                        The compiled template
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  renderHandlerbars(template: string, data: any): string {
    const renderFn = __handlebars.compile(template);
    const res = renderFn(data);
    return res;
  }

  /**
   * @name        dispatchSyncEvent
   * @type        Function
   * 
   * This method allows you to dispatch a sync event that will wait for an answer 
   * before passing to the next statements.
   * This mechanism work by sending a "ping" event to check if someone (another component) listen to us.
   * If their's no answer, we pass to the next statements whichout doing anything but
   * if we have an answer, we send the actual event and wait for an answer.
   * 
   * @param     {String}     name       The event name you want to send
   * @param     {Any}       details     Some details you want to attach to the event
   * @return    {SPromise}              An SPromise instance that will be resolved if we get an answer and rejected if not
   * 
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  dispatchSyncEvent(name: string, details: any): Promise<any> {
    return new Promise((resolve, reject) => {

      let hasListeners = false;

      this.node.dispatchEvent(new CustomEvent(name, {
        detail: {
          ...details,
          onPing() {
            hasListeners = true;
          },
          onResolve(data) {
            resolve(data);
          }
        }
      }));
      setTimeout(() => {
        if (!hasListeners) reject();
      });
    });
  }

  addSyncEventListener(name: string, handler: Function): void {
    this.node.addEventListener(name, async (e) => {
      // @ts-ignore
      if (!e.detail?.onPing) return handler(e);
      // @ts-ignore
      e.detail.onPing();
      const res = await handler(e);
      // @ts-ignore
      e.detail.onResolve(res);
    });
  }

  addSyncEventListenerOn($targets, name: string, handler: Function): void {
    $targets.forEach($target => {
      $target.addEventListener(name, async (e) => {
        // @ts-ignore
        if (!e.detail?.onPing) return handler(e);
        // @ts-ignore
        e.detail.onPing();
        const res = await handler(e);
        // @ts-ignore
        e.detail.onResolve(res);
      });
    })
  }

  addTargetsEventListener(name: string, handler: Function): void {
    this.$targets.forEach($target => {
      $target.addEventListener(name, async (e) => {
        // @ts-ignore
        if (!e.detail?.onPing) return handler(e);
        // @ts-ignore
        e.detail.onPing();
        const res = await handler(e);
        // @ts-ignore
        e.detail.onResolve(res);
      });
    })
  }

}
