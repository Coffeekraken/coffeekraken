import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SInterface from '@coffeekraken/s-interface';
import __mustache from 'mustache';

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

    // disable mustache escaping
    __mustache.escape = function (text) {
      return text;
    };

    // @ts-ignore
    const interfaceClass =
      this.svelteComponentSettings.interface ?? this.constructor.interface;

    // @ts-ignore
    if (interfaceClass) {
      // @ts-ignore
      const paramsInterfaceResult = interfaceClass.apply(params ?? {});
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
