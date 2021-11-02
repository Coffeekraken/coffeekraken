import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SDocblockRenderer from './SDocblockRenderer';

import { ISDocblock } from '@coffeekraken/s-docblock';

import classnameHelper from './html/helpers/classname';
import gravatarHelper from './html/helpers/gravatar';
import sectionHelper from './html/helpers/section';

import headingPartial from './html/partials/heading';
import sharingsPartial from './html/partials/sharings';

import authorTag from './html/tags/author';
import descriptionTag from './html/tags/description';
import exampleTag from './html/tags/example';
import nameTag from './html/tags/name';
import namespaceTag from './html/tags/namespace';
import paramTag from './html/tags/param';
import sinceTag from './html/tags/since';

/**
 * @name            SDocblockHtmlRenderer
 * @namespace       node
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
 * import SDocblock from '@coffeekraken/s-docblock';
 * import { SDocblockHtmlRenderer } from '@coffeekraken/s-docblock-renderer';
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
          docblockRenderer: {},
          docblockHtmlRenderer: {}
        },
        settings || {}
      )
    );
  }
}

SDocblockHtmlRenderer.registerHelper(classnameHelper);
SDocblockHtmlRenderer.registerHelper(gravatarHelper);
SDocblockHtmlRenderer.registerHelper(sectionHelper);

SDocblockHtmlRenderer.registerPartial(headingPartial);
SDocblockHtmlRenderer.registerPartial(sharingsPartial);

SDocblockHtmlRenderer.registerTag(authorTag);
SDocblockHtmlRenderer.registerTag(descriptionTag);
SDocblockHtmlRenderer.registerTag(exampleTag);
SDocblockHtmlRenderer.registerTag(nameTag);
SDocblockHtmlRenderer.registerTag(namespaceTag);
SDocblockHtmlRenderer.registerTag(paramTag);
SDocblockHtmlRenderer.registerTag(sinceTag);

export default SDocblockHtmlRenderer;
