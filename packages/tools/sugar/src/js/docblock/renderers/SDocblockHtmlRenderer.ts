// @shared

import __deepMerge from '../../object/deepMerge';
import __SDocblockRenderer from './SDocblockRenderer';
import __toString from '../../string/toString';

import __defaultTemplate from './html/templates/default';
import __classTemplate from './html/templates/class';
import __functionTemplate from './html/templates/function';

import __defaultBlock from './html/blocks/default';
import __classBlock from './html/blocks/class';
import __functionBlock from './html/blocks/function';

import __handlebars from 'handlebars';

import __headingPartial from './html/partials/heading';
import __paramsPartial from './html/partials/params';
import __examplePartial from './html/partials/example';
import __authorPartial from './html/partials/author';

import { ISDocblock } from '../SDocblock';

/**
 * @name            SDocblockHtmlRenderer
 * @namespace       sugar.js.docblock.renderers
 * @type            Class
 * @status              wip
 *
 * This class represent an SDocblock output like "html", "html", etc...
 * Supported docblock tags:
 * - @type
 * - @namespace
 * - @name
 * - @static
 * - @get
 * - @set
 * - @since
 * - @description
 * - @param
 * - @example
 * - @author
 *
 * @param       {SDocblock}         docblockInstance        The docblock instance you want to output using this class
 * @param       {Object}            [settings={}]           Some settings to configure your output class:
 * - ...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SDocblock from '@coffeekraken/sugar/js/docblock/SDocblock';
 * import SDocblockHtmlRenderer from '@coffeekraken/sugar/js/docblock/SDocblockHtmlRenderer';
 * const docblock = new SDocblock('my/cool/file.hbs');
 * const docblockOutput = new SDocblockHtmlRenderer(docblock);
 * docblockOutput.render();
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISDocblockHtmlRendererCtorSettings {
  docblockHtmlRenderer?: ISDocblockHtmlRendererOptionalSettings;
}
export interface ISDocblockHtmlRendererOptionalSettings {}
export interface ISDocblockHtmlRendererSettings {}

export interface ISDocblockHtmlRenderer {}

// @ts-ignore
class SDocblockHtmlRenderer
  extends __SDocblockRenderer
  implements ISDocblockHtmlRenderer {
  /**
   * @name        supportedTags
   * @type        Array<String>
   * @static
   *
   * Store the list of supported docblock tags
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static supportedTags = [
    '@type',
    '@namespace',
    '@name',
    '@static',
    '@get',
    '@set',
    '@since',
    '@description',
    '@param',
    '@example',
    '@author'
  ];

  /**
   * @name
   */

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    docblockInstance: ISDocblock,
    settings?: ISDocblockHtmlRendererCtorSettings
  ) {
    super(
      docblockInstance,
      __deepMerge(
        {
          docblockHtmlRenderer: {},
          docblockRenderer: {}
        },
        settings || {}
      )
    );

    // Templates
    this.registerTemplate(
      'default',
      '@coffeekraken/sugar/js/docblock/renderers/html/templates/default.hbs'
    );
    this.registerTemplate(
      'class',
      '@coffeekraken/sugar/js/docblock/renderers/html/templates/class.hbs'
    );
    this.registerTemplate(
      'function',
      '@coffeekraken/sugar/js/docblock/renderers/html/templates/function.hbs'
    );

    // Blocks
    this.registerBlock(
      'default',
      '@coffeekraken/sugar/js/docblock/renderers/html/blocks/default.hbs'
    );
    this.registerBlock(
      'class',
      '@coffeekraken/sugar/js/docblock/renderers/html/blocks/class.hbs'
    );
    this.registerBlock(
      'function',
      '@coffeekraken/sugar/js/docblock/renderers/html/blocks/function.hbs'
    );

    // Partials
    this.registerPartial(
      'author',
      '@coffeekraken/sugar/js/docblock/renderers/html/partials/author.hbs'
    );
    this.registerPartial(
      'heading',
      '@coffeekraken/sugar/js/docblock/renderers/html/partials/heading.hbs'
    );
    this.registerPartial(
      'example',
      '@coffeekraken/sugar/js/docblock/renderers/html/partials/example.hbs'
    );
    this.registerPartial(
      'params',
      '@coffeekraken/sugar/js/docblock/renderers/html/partials/params.hbs'
    );
    this.registerPartial(
      'sharings',
      '@coffeekraken/sugar/js/docblock/renderers/html/partials/sharings.hbs'
    );
  }
}

export default SDocblockHtmlRenderer;
