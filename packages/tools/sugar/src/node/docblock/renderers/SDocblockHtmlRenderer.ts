// @shared

import __deepMerge from '../../object/deepMerge';
import __SDocblockRenderer from './SDocblockRenderer';

import { ISDocblock } from '../SDocblock';

/**
 * @name            SDocblockHtmlRenderer
 * @namespace       sugar.node.docblock.renderers
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
  docblockHtmlRenderer?: Partial<ISDocblockHtmlRendererSettings>;
}
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
          docblockRenderer: {
            rootDir: `${__dirname}/html`
          },
          docblockHtmlRenderer: {}
        },
        settings || {}
      )
    );

    // Templates
    this.registerTemplate('default', `${__dirname}/html/templates/default.hbs`);
    this.registerTemplate('class', `${__dirname}/html/templates/class.hbs`);
    this.registerTemplate(
      'function',
      `${__dirname}/html/templates/function.hbs`
    );

    // Blocks
    this.registerBlock('default', `${__dirname}/html/blocks/default.hbs`);
    this.registerBlock('class', `${__dirname}/html/blocks/class.hbs`);
    this.registerBlock('function', `${__dirname}/html/blocks/function.hbs`);

    // Partials
    this.registerPartial('author', `${__dirname}/html/partials/author.hbs`);
    this.registerPartial('heading', `${__dirname}/html/partials/heading.hbs`);
    this.registerPartial('example', `${__dirname}/html/partials/example.hbs`);
    this.registerPartial('params', `${__dirname}/html/partials/params.hbs`);
    this.registerPartial('sharings', `${__dirname}/html/partials/sharings.hbs`);
  }
}

export default SDocblockHtmlRenderer;
