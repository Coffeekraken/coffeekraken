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
  }
}

export default SDocblockHtmlRenderer;
