// @ts-nocheck

import __deepMerge from '../../object/deepMerge';
import __SDocblockOutput from '../SDocblockOutput';
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

/**
 * @name            SDocblockHtmlOutput
 * @namespace       sugar.js.docblock.outputs
 * @type            Class
 * @wip
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
 * import SDocblockHtmlOutput from '@coffeekraken/sugar/js/docblock/SDocblockHtmlOutput';
 * const docblock = new SDocblock('my/cool/file.js');
 * const docblockOutput = new SDocblockHtmlOutput(docblock);
 * docblockOutput.render();
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SDocblockHtmlOutput extends __SDocblockOutput {
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
  constructor(docblockInstance, settings = {}) {
    super(
      docblockInstance,
      __deepMerge(
        {
          templates: {
            default:
              '@coffeekraken/sugar/js/docblock/outputs/html/templates/default.js',
            class:
              '@coffeekraken/sugar/js/docblock/outputs/html/templates/class.js',
            function:
              '@coffeekraken/sugar/js/docblock/outputs/html/templates/function.js'
          },
          blocks: {
            default:
              '@coffeekraken/sugar/js/docblock/outputs/html/blocks/default.js',
            class:
              '@coffeekraken/sugar/js/docblock/outputs/html/blocks/class.js',
            function:
              '@coffeekraken/sugar/js/docblock/outputs/html/blocks/function.js'
          },
          partials: {
            author:
              '@coffeekraken/sugar/js/docblock/outputs/html/partials/author.js',
            heading:
              '@coffeekraken/sugar/js/docblock/outputs/html/partials/heading.js',
            example:
              '@coffeekraken/sugar/js/docblock/outputs/html/partials/example.js',
            params:
              '@coffeekraken/sugar/js/docblock/outputs/html/partials/params.js',
            sharings:
              '@coffeekraken/sugar/js/docblock/outputs/html/partials/sharings.js'
          }
        },
        settings
      )
    );
  }
}
