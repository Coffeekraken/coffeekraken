import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SClass from '@coffeekraken/s-class';
// import __mustache from 'mustache';
import __SInterface from '@coffeekraken/s-interface';
// import __handlebars from 'handlebars';
import __striptags from '@coffeekraken/sugar/shared/html/striptags';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import __whenInViewport from '@coffeekraken/sugar/js/dom/detect/whenInViewport';
import __wait from '@coffeekraken/sugar/shared/time/wait';

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
  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'grid'
}

export interface ISComponentUtilsCtorSettings {
  componentUtils: Partial<ISComponentUtilsSettings>;
}

export class SComponentUtilsDefaultInterface extends __SInterface {
  static definition = {
    mountWhen: {
      type: 'String',
      values: ['directly', 'inViewport'],
      default: 'directly'
    },
    adoptStyles: {
      type: 'Boolean',
      default: true
    },
    defaultStyle: {
        type: 'Boolean',
      default: false
    }
  }
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

  shouldUpdate = false;

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
    name: string,
    node: HTMLElement,
    props: any,
    settings: Partial<ISComponentUtilsCtorSettings> = {}
  ) {
    super(__deepMerge({}, settings));

    // name
    this.name = name;

    // node
    this.node = node;
    if (!this.node.tagName) this.node = this.node.parentNode;
    if (this.node.parentNode?.tagName?.toLowerCase() === this.name) {
      this.node = node.parentNode;
    }

    // props
    const defaultProps = __deepMerge(
      this._settings.interface?.defaults() ?? {},
      this._settings.defaultProps ?? {},
      (<any>this.constructor)._defaultProps['*'] ?? {},
      (<any>this.constructor)._defaultProps[this.name] ?? {}
    );
    let passedProps = {};
    if (props.constructor.name === 'NamedNodeMap') {
      Object.keys(props).forEach(key => {
        let value;
        if (props[key]?.nodeValue !== undefined) {
          if (props[key].nodeValue === '') value = true;
          else value = props[key].nodeValue;
        }
        if (!value) return;
        passedProps[__camelCase(props[key]?.name ?? key)] = value;
      });
    } else {
      passedProps = props;
    }
    this.props = __deepMerge(defaultProps, passedProps);

    // litElement shouldUpdate
    if (!this.node.shouldUpdate) {
      this.node.shouldUpdate = () => {
        return this.shouldUpdate;
      }
    }

    // mount component when needed
    switch(this.props.mountWhen) {
      case 'inViewport':
        (async () => {
          await __whenInViewport(this.node);
          this.mount();
        })();
      break;
      case 'directly':
      default:
        this.mount();
      break;
    }
  }

  async mount() {
    this.shouldUpdate = true;
    this.node.requestUpdate?.(); // litelement update
    await __wait();
    // adopting parent styles
    if (this.props.adoptStyles) this._adoptStyles();
    await __wait();
    // @ts-ignore
    this.node.setAttribute('s-mounted', true);
  }

  static _styleNodes = [];
  _adoptStyles() {

      const $links = document.querySelectorAll('link[rel="stylesheet"]');
      if ($links && this.node.shadowRoot) {
        Array.from($links).forEach(async $link => {
          if (Array.isArray(this.props.adoptStyles) && this.props.adoptStyles.indexOf($link.id ?? '') === -1) {
            return; // this style is not wanted...
          }

          if ($link._stylesheet) {
            this.node.shadowRoot.adoptedStyleSheets = [...this.node.shadowRoot.adoptedStyleSheets, $link._stylesheet];
            return;
          }

          this.node.shadowRoot?.appendChild($link.cloneNode());

          // avoid processing multiple time same stylesheet
          if (this.constructor._styleNodes.indexOf($link) !== -1) return;
          this.constructor._styleNodes.push($link);

          // request stylesheet to store it in a unique CSSStylesheet instance
          const res = await fetch($link.href, {
            headers: {
              Accept: 'text/css,*/*;q=0.1'
            }
          });

          let cssStr = await res.text();
          const stylesheet = new CSSStyleSheet();
          stylesheet.replace(cssStr);
          $link._stylesheet = stylesheet;

        });
      }

      const $styles = document.querySelectorAll('style');
      if ($styles && this.node.shadowRoot) {
        Array.from($styles).forEach($style => {
          if (Array.isArray(this.props.adoptStyles) && this.props.adoptStyles.indexOf($style.id ?? '') === -1) {
            return; // this style is not wanted...
          }

          if ($style._stylesheet) {
            this.node.shadowRoot.adoptedStyleSheets = [...this.node.shadowRoot.adoptedStyleSheets, $style._stylesheet];
            return;
          }

          const stylesheet = new CSSStyleSheet();
          stylesheet.replace($style.innerHTML);
          $style._stylesheet = stylesheet;

          this.node.shadowRoot.adoptedStyleSheets = [...this.node.shadowRoot.adoptedStyleSheets, $style._stylesheet];

        });
      }
  }
  
  exposeApi(apiObj: any): void {
    setTimeout(() => {
      let $on = this.node;
      // @ts-ignore
      if (this.node.parentNode?._component) { // check if the parent a a vue3-component-wrapper
        // @ts-ignore
        $on = this.node.parentNode;
      }
      Object.keys(apiObj).forEach(apiFnName => {
        const apiFn = apiObj[apiFnName];
        $on[apiFnName] = apiFn;
      });
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

  // /**
  //  * @name          compileMustache
  //  * @type          Function
  //  *
  //  * This method allows you to compile some mustache template
  //  * directly from your component.
  //  *
  //  * @param         {String}        template        The template to compile
  //  * @param         {any}           data            The data with which you want to compile your template
  //  * @return        {String}                        The compiled template
  //  *
  //  * @since         2.0.0
  //  * @author 		Olivier Bossel<olivier.bossel@gmail.com>
  //  */
  // compileMustache(template: string, data: any): string {
  //   const res = __mustache.render(template, data);
  //   return res;
  // }

  // /**
  //  * @name          renderHandlerbars
  //  * @type          Function
  //  *
  //  * This method allows you to compile some mustache template
  //  * directly from your component.
  //  *
  //  * @param         {String}        template        The template to compile
  //  * @param         {any}           data            The data with which you want to compile your template
  //  * @return        {String}                        The compiled template
  //  *
  //  * @since         2.0.0
  //  * @author 		Olivier Bossel<olivier.bossel@gmail.com>
  //  */
  // renderHandlerbars(template: string, data: any): string {
  //   const renderFn = __handlebars.compile(template);
  //   const res = renderFn(data);
  //   return res;
  // }

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
