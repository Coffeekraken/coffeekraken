import __SWebComponent from './SWebComponent';
import { render, html } from 'lit-html';
import __throttle from '../function/throttle';
import __insertAfter from '../dom/insertAfter';
import __deepMerge from '../object/deepMerge';
import { asyncReplace } from 'lit-html/directives/async-replace.js';
import { asyncAppend } from 'lit-html/directives/async-append.js';
import { cache } from 'lit-html/directives/cache.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { guard } from 'lit-html/directives/guard';
import { repeat } from 'lit-html/directives/repeat';
import { styleMap } from 'lit-html/directives/style-map.js';
import { templateContent } from 'lit-html/directives/template-content';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { until } from 'lit-html/directives/until.js';

/**
 * @name              SLitHtmlWebComponent
 * @namespace           js.webcomponent
 * @type              Class
 * @extends           SWebComponent
 *
 * // TODO: example
 *
 * Base class that you can extends to create some SWebComponent with Lit Html rendering capabilities
 *
 * @param       {Object}        [settings={}]         A setting object to configure your webcomponent instance:
 * - defaultProps ({}) {Object}: Specify the default properties values
 * - physicalProps ([]) {Array<String>}: List all the properties that need to be ALWAYS on the html element (for styling purpose for example...)
 * - requiredProps ([]) {Array<String>}: List all the properties that MUST be passed to the component
 *
 * @example         js
 * import SLitHtmlWebComponent from '@coffeekraken/sugar/js/webcomponent/SLitHtmlWebComponent';
 * class MyCoolComponent extends SLitHtmlWebComponent {
 *
 *    constructor(settings = {}) {
 *      super(settings);
 *    }
 *
 * }
 *
 * @since       2.0.0
 * @see       https://lit-html.polymer-project.org/
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function SLitHtmlWebComponent(extend = HTMLElement) {
  return class SLitHtmlWebComponent extends __SWebComponent(extend) {
    /**
     * @name        template
     * @type        Function
     * @static
     *
     * This static variable store a function that has as parameter the state object
     * of your component and the lit-html ```html``` function that you can use in your template.
     * This function MUST return a template string representing your component HTML depending on the state
     * object at this point.
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static template = (props, component, html) => html`
      <p>
        You need to specify a static template property for your component...
      </p>
    `;

    /**
     * @name        lit
     * @type        Object
     *
     * Store all the litHtml functions that you may need
     *
     * @see       https://lit-html.polymer-project.org/guide/template-reference
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    lit = {
      html,
      render,
      asyncReplace,
      asyncAppend,
      cache,
      classMap,
      ifDefined,
      guard,
      repeat,
      styleMap,
      templateContent,
      unsafeHTML,
      unsafeSVG,
      until
    };

    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
      super(__deepMerge({}, settings));
      // generate a container for the component
      this.$container = document.createElement('div');
      this.$container.className = `${this.metas.dashName}`;
      // wait until mounted to render the component first time
      this.on('mounted{1}', () => {
        // insert the container in the document
        __insertAfter(this.$container, this);
        // render for the first time
        this.render();
        // dispatch a ready event
        this.dispatch('ready', this);
      });
    }

    /**
     * @name          render
     * @type          Function
     *
     * This method is called every time an update has been made in the state object
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    render = __throttle(function () {
      const tpl = this.constructor.template(
        this._props,
        this.metas,
        this._settings,
        this.lit
      );
      render(tpl, this.$container);
    }, 50);

    $(path) {
      let $result = this.$container.querySelector(path);
      if (!$result && !path.includes(`.${this.metas.dashName}__`)) {
        path = path.replace(/^\./, `.${this.metas.dashName}__`);
        $result = this.$container.querySelector(path);
      }
      return $result;
    }
    $$(path) {
      let $result = this.$container.querySelectorAll(path);
      if (!$result && !path.includes(`.${this.metas.dashName}__`)) {
        path = path.replace(/^\./, `.${this.metas.dashName}__`);
        $result = this.$container.querySelectorAll(path);
      }
      return $result;
    }
    className(cls) {
      const hasDot = cls.match(/^\./);
      cls = cls.replace('.', '');
      if (cls.match(/^(--)/))
        return `${hasDot ? '.' : ''}${this.metas.dashName}${cls}`;
      return `${hasDot ? '.' : ''}${this.metas.dashName}__${cls}`;
    }

    /**
     * @name          handleProp
     * @type          Function
     * @async
     *
     * This method is supposed to be overrided by your component integration
     * to handle the props updates and delete actions.
     * The passed description object has this format:
     * ```js
     * {
     *    action: 'set|delete',
     *    path: 'something.cool',
     *    oldValue: '...',
     *    value: '...'
     * }
     * ```
     *
     * @param     {String}      prop      The property name that has been updated or deleted
     * @param     {Object}      descriptionObj      The description object that describe the update or delete action
     * @return    {Promise}                A promise that has to be resolved once the update has been handled correctly. You have to pass the prop variable to the resolve function
     *
     * @since     2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    handleProp(prop, propObj) {
      return new Promise((resolve, reject) => {
        // this.render();
        setTimeout(() => {
          this.render();
        });
        resolve(prop);
      });
    }
  };
}
