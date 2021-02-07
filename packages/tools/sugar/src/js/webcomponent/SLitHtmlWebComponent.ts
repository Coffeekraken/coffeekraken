// @ts-nocheck

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
import __canHaveChildren from '../dom/canHaveChildren';

/**
 * @name              SLitHtmlWebComponent
 * @namespace           sugar.js.webcomponent
 * @type              Class
 * @extends           SWebComponent
 * @status              wip
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
 * @todo      interface
 * @todo      doc
 * @todo      tests
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function SLitHtmlWebComponentGenerator(extendSettings = {}) {
  return class SLitHtmlWebComponent extends __SWebComponent(extendSettings) {
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static template = (props, settings, lit) => lit.html`
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
      super(__deepMerge({}, settings));
      // wait until mounted to render the component first time
      this.on('mounted', (e) => {
        // insert the container in the document
        if (__canHaveChildren(this)) {
          this.$container = this;
          this.addClass('', this);
        } else {
          this.$container = document.createElement('div');
          this.addClass('', this.$container);
          __insertAfter(this.$container, this);
        }
        this.update();
        // dispatch a ready event
        this.dispatch('ready', this, {
          bubbles: true
        });
        // listen for media query change to update the view
        this._mediaQuery.on('match', (media) => {
          this.render();
        });
      });
    }

    /**
     * @name          $root
     * @type          Function
     * @get
     *
     * Access the root element of the webcomponent from which the requests like ```$``` and ```$$``` will be executed
     *
     * @since         2.0.0
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get $root() {
      return this.$container || this;
    }

    /**
     * @name          update
     * @type          Function
     *
     * This method allows you to update your componment manually if needed.
     * - call the ```render``` method of this class
     * - call the ```update``` method of the SWebComponent parent class
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    update() {
      // render
      this._render();
      // update parent
      super.update();
    }

    /**
     * @name          render
     * @type          Function
     *
     * This method is called every time an update has been made in the state object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _render() {
      if (!this.$container) return;
      const tplFn = this.constructor.template.bind(this);
      const tpl = tplFn(this.props, this._settings, this.lit);
      render(tpl, this.$container);
    }
    render = __throttle(() => {
      this._render();
    }, 50);
  };
}

export = SLitHtmlWebComponentGenerator;
