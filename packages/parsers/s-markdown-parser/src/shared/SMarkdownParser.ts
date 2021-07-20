import __SClass from '@coffeekraken/s-class';
import __SPromise from '@coffeekraken/s-promise';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SMarkdownParserSettingsInterface from './interface/SMarkdownParserSettingsInterface';
import __marked from 'marked';




/**
 * @name            SMarkdownParser
 * @namespace       node
 * @type            Class
 * @extents         SClass
 * @status              wip
 *
 * This class represent an SMarkdown output like "markdown", "html", etc...
 *
 * @param       {Object}            [settings={}]           Some settings to configure your output class:
 * - ...
 *
 * @todo        interface
 * @todo        doc
 *
 * @example         js
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISMarkdownParserSettings {}
export interface ISMarkdownParserCtorSettings {
  markdownParser?: Partial<ISMarkdownParserSettings>;
}

export interface ISMarkdownParser {
}

// @ts-ignore
class SMarkdownParser extends __SClass implements ISMarkdownParser {

   /**
    * @name            registerExtension
    * @type             Function
    * @static
    * 
    * This static method allows you to register 
    */

  /**
   * @name        markdownParserSettings
   * @type        ISMarkdownParserSettings
   * @get
   *
   * Access the markdown parser settings
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get markdownParserSettings(): ISMarkdownParserSettings {
    return (<any>this)._settings.markdownParser;
  }

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
    settings?: ISMarkdownParserCtorSettings
  ) {
    // save the settings
    super(
      __deepMerge(
        {
          markdownParser: {
            ...__SMarkdownParserSettingsInterface.defaults()
          }
        },
        settings
      )
    );
  }

  /**
   * @name          parse
   * @type          Function
   *
   * This method takes a markdown string input and transform it into
   * 
   * @param         {String}            markdown            The markdown string you want to parse
   * @return      {MarkedTokens}                            A marked tokens result that include all the custom markdown features added by this parser
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  parse(markdown: string): any {
    const tokens = __marked.lexer(markdown);
    return tokens;
  }
}

export default SMarkdownParser;
