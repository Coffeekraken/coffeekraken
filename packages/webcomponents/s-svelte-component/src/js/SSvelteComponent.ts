import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SInterface from '@coffeekraken/s-interface';
import __mustache from 'mustache';
import __stylesheetToString from '@coffeekraken/sugar/js/css/stylesheetToString';

import {
  onMount as __onMount,
  beforeUpdate as __beforeUpdate,
  afterUpdate as __afterUpdate,
  onDestroy as __onDestroy,
  tick as __tick,
  setContext as __setContext,
  getContext as __getContext,
  hasContext as __hasContext,
  createEventDispatcher as __createEventDispatcher
} from 'svelte';
import { writable } from 'svelte/store';
import { get_current_component } from 'svelte/internal';
import __camelize from '@coffeekraken/sugar/shared/string/camelize';

export interface ISSvelteComponentCtorSettings {
  svelteComponent?: Partial<ISSvelteComponentSettings>;
}
export interface ISSvelteComponentSettings {
  classPrefix: string;
  interface: __SInterface;
}

export interface ISSvelteComponent {}

class SSVelteComponent extends __SClass implements ISSvelteComponent {
  props: Record<string, any> = {};

  /**
   * @name      svelteComponentSettings
   * @type      ISSvelteComponentSettings
   * @get
   *
   * Access the svelteComponent settings
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get svelteComponentSettings(): ISSvelteComponentSettings {
    return (<any>this)._settings.svelteComponent;
  }

  /**
   * @name      styleStr
   * @type      String
   * @get
   *
   * Access the document style string
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _styleStr: string = '';
  get styleStr(): string {
    if (!this._styleStr)
      this._styleStr = __stylesheetToString(document.styleSheets);
    return this._styleStr;
  }

  /**
   * @name      rootElm
   * @type      HTMLElement
   * @get
   *
   * Access the root HTMLElement inside the shadow dom
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _currentComponent;
  get rootElm(): HTMLElement {
    for (
      let i = 0;
      i < this._currentComponent.shadowRoot.children.length;
      i++
    ) {
      const elm = this._currentComponent.shadowRoot.children[i];
      if (elm.tagName !== 'STYLE') return elm;
    }
    return this._currentComponent;
  }

  /**
   * @name      styleElm
   * @type      HTMLElement
   * @get
   *
   * Access the root style HTMLElement inside the shadow dom
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get styleElm(): HTMLElement {
    for (
      let i = 0;
      i < this._currentComponent.shadowRoot.children.length;
      i++
    ) {
      const elm = this._currentComponent.shadowRoot.children[i];
      if (elm.tagName === 'STYLE') return elm;
    }
    return undefined;
  }

  constructor(params: any, settings?: Partial<ISSvelteComponentCtorSettings>) {
    super(
      __deepMerge(
        {
          svelteComponent: {
            classPrefix: 's-'
          }
        },
        settings || {}
      )
    );

    this._currentComponent = get_current_component();

    // disable mustache escaping
    __mustache.escape = function (text) {
      return text;
    };

    // @ts-ignore
    const interfaceClass =
      this.svelteComponentSettings.interface ?? this.constructor.interface;

    const processedParams = {};
    Object.keys(params).forEach((propName) => {
      processedParams[__camelize(propName)] = params[propName];
    });

    // @ts-ignore
    if (interfaceClass) {
      // add default props
      interfaceClass.definition = {
        ...interfaceClass.definition,
        noLnf: {
          type: {
            type: 'Boolean',
            nullishAsTrue: true
          },
          default: false
        },
        noBare: {
          type: {
            type: 'Boolean',
            nullishAsTrue: true
          },
          default: false
        },
        noStyle: {
          type: {
            type: 'Boolean',
            nullishAsTrue: true
          },
          default: false
        }
      };
      // @ts-ignore
      const paramsInterfaceResult = interfaceClass.apply(processedParams ?? {});
      if (paramsInterfaceResult.hasIssues()) {
        throw new Error(paramsInterfaceResult.toString());
      } else {
        Object.keys(paramsInterfaceResult.value).forEach((propName) => {
          let value = paramsInterfaceResult.value[propName];

          const proxy = writable(paramsInterfaceResult.value[propName], () => {
            return () => {};
          });

          proxy.subscribe((v) => {
            value = v;
          });

          Object.defineProperty(this.props, propName, {
            enumerable: true,
            get() {
              return value;
            },
            set(v) {
              // proxy.update((v) => v);
              proxy.set(v);
            }
          });
        });
      }
    }

    this.onMount(() => {
      if (this.props.noLnf) {
        this.rootElm.classList.add('s-no-lnf');
      }
      if (this.props.noBare) {
        this.rootElm.classList.add('s-no-bare');
      }
      if (!this.props.noStyle) {
        this._applyStyles();
      }
    });
  }

  /**
   * @name      _applyStyles
   * @type      Function
   *
   * This function simply check if a "@sugar.style.apply" directive has been applied
   * and apply it correctly using the stylesheets applied to the page
   *
   * @since     2.0.0
   *
   */
  _applyStyles(): void {
    const matches = this.styleElm.innerHTML.match(
      /[\.#]?[a-zA-Z0-9-_:>+*\s]+\{(.*\n?)content:"(s-style-[a-zA-Z0-9-_]+)"(.*\n?)\}/gm
    );
    if (matches) {
      let newStyleStr = this.styleElm.innerHTML;
      newStyleStr = newStyleStr.replace(
        /content:\?"s-style-[a-zA-Z0-9-_]+"/,
        ''
      );
      matches.forEach((match) => {
        const selector = match.split('{')[0];
        const styleName = match.match(/content:"(.*)"/)[1];
        const reg = new RegExp(`\.${styleName}.*\{[^\}]+\}`, 'gm');
        const styleCssMatches = this.styleStr.match(reg);
        if (styleCssMatches) {
          styleCssMatches.forEach((styleMatch) => {
            const newStyle = styleMatch.replace(`.${styleName}`, selector);
            newStyleStr += newStyle;
          });
        }
      });
      this.styleElm.innerHTML = newStyleStr;

      const styleElm = document.createElement('style');
      styleElm.innerHTML = this.styleStr.replace(
        /--[a-zA-Z0-9-_]+:[^;]+;/gm,
        ''
      );
      this._currentComponent.shadowRoot.prepend(styleElm);
    }
  }

  compileMustache(template: string, data: any): string {
    return __mustache.render(template, data);
  }

  className(name: string = '') {
    return name
      .split(' ')
      .map(
        (cls) =>
          `${this.svelteComponentSettings.classPrefix}${
            this.svelteComponentSettings.classPrefix && cls && !cls.match(/^__/)
              ? '-'
              : ''
          }${cls}`
      )
      .join(' ');
  }

  onMount(callback: Function): void {
    __onMount(callback);
  }

  beforeUpdate(callback: Function): void {
    __beforeUpdate(callback);
  }

  afterUpdate(callback: Function): void {
    __afterUpdate(callback);
  }

  onDestroy(callback: Function): void {
    __onDestroy(callback);
  }

  tick(callback: Function): void {
    __tick(callback);
  }

  getContext(callback: Function): void {
    __getContext(callback);
  }

  hasContext(callback: Function): void {
    __hasContext(callback);
  }

  setContext(callback: Function): void {
    __setContext(callback);
  }
}

export default SSVelteComponent;
