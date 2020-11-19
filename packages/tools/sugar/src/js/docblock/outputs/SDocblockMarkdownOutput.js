import __deepMerge from '../../object/deepMerge';
import __SDocblockOutput from '../SDocblockOutput';
import __toString from '../../string/toString';

import __defaultTemplate from './markdown/templates/default';
import __classTemplate from './markdown/templates/class';
import __functionTemplate from './markdown/templates/function';

import __defaultBlock from './markdown/blocks/default';
import __classBlock from './markdown/blocks/class';
import __functionBlock from './markdown/blocks/function';

/**
 * @name            SDocblockMarkdownOutput
 * @namespace       sugar.js.docblock.outputs
 * @type            Class
 *
 * This class represent an SDocblock output like "markdown", "html", etc...
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
 * @example         js
 * import SDocblock from '@coffeekraken/sugar/js/docblock/SDocblock';
 * import SDocblockMarkdownOutput from '@coffeekraken/sugar/js/docblock/SDocblockMarkdownOutput';
 * const docblock = new SDocblock('my/cool/file.js');
 * const docblockOutput = new SDocblockMarkdownOutput(docblock);
 * docblockOutput.render();
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SDocblockMarkdownOutput extends __SDocblockOutput {
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
            default: __defaultTemplate,
            class: __classTemplate,
            function: __functionTemplate
          },
          blocks: {
            default: __defaultBlock,
            class: __classBlock,
            function: __functionBlock
          }
        },
        settings
      )
    );
  }
};
