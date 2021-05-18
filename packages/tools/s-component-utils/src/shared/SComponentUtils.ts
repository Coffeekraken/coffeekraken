import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SClass from '@coffeekraken/s-class';
import __mustache from 'mustache';
import __SInterface from '@coffeekraken/s-interface';

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

export interface ISComponentUtilsSettings {
  interface?: __SInterface;
}

export interface ISComponentUtilsCtorSettings {
  componentUtils: Partial<ISComponentUtilsSettings>;
}

export default class SComponentUtils extends __SClass {
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
    props: any,
    settings: Partial<ISComponentUtilsCtorSettings> = {}
  ) {
    super(__deepMerge({}, settings));
    this.name = name;
    this.props = props;

    if (this._settings.interface) {
      this._settings.interface.definition = {
        ...this._settings.interface.definition,
        defaultStyle: {
          type: {
            type: 'Boolean',
            nullishAsTrue: true
          },
          default: false
        }
      };

      this.props = this._settings.interface.apply(this.props ?? {}).value;
    }
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
    return __mustache.render(template, data);
  }
}
