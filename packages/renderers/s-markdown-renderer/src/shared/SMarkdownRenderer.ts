import __SClass from '@coffeekraken/s-class';
import __SPromise from '@coffeekraken/s-promise';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SMarkdownRendererSettingsInterface from './interface/SMarkdownRendererSettingsInterface';
import __marked from 'marked';

import __sCodeExampleMarkedExtension from './extensions/sCodeExampleMarkedExtension';
import __sRepoStateMarkedExtension from './extensions/sRepoStateMarkedExtension';

/**
 * @name            SMarkdownRenderer
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

export interface ISMarkdownRendererSettings {}
export interface ISMarkdownRendererCtorSettings {
  markdownRenderer?: Partial<ISMarkdownRendererSettings>;
}

export interface ISMarkdownRendererRegisteredEntries {
  [key: string]: string;
}
export interface ISMarkdownRendererRegisteredStacks {
  templates: ISMarkdownRendererRegisteredEntries;
  blocks: ISMarkdownRendererRegisteredEntries;
  partials: ISMarkdownRendererRegisteredEntries;
}

export interface ISMarkdownRendererPartialsTemplateObj {
  [key: string]: ISMarkdownRendererTemplateObj;
}
export interface ISMarkdownRendererTemplateObj {
  path: string;
  content: string;
  stats: any;
}

export interface ISMarkdownRendererHelper {
  id: string;
  args: Record<string, any>;
  process: Function;
}

export interface ISMarkdownRendererLayout {
  id: string;
  template: string;
}

export interface ISMarkdownRendererPartial {
  id: string;
  template: string;
}

export interface ISMarkdownRendererBlock {
  id: string;
  template: string;
}

export interface ISMarkdownRendererTag {
  id: string;
  template: string;
}

export interface ISMarkdownRenderer {
  _docblockInstance: ISMarkdown;
}

// @ts-ignore
class SMarkdownRenderer extends __SClass implements ISMarkdownRenderer {

  /**
   * @name        marked
   * @type        Any
   * @static
   * 
   * Access the marked object to register extensions, etc...
   * 
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static marked = __marked;

  /**
   * @name        markdownRendererSettings
   * @type        ISMarkdownRendererSettings
   * @get
   *
   * Access the markdown renderer settings
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get markdownRendererSettings(): ISMarkdownRendererSettings {
    return (<any>this)._settings.markdownRenderer;
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
    settings?: ISMarkdownRendererCtorSettings
  ) {
    // save the settings
    super(
      __deepMerge(
        {
          markdownRenderer: {
            ...__SMarkdownRendererSettingsInterface.defaults()
          }
        },
        settings
      )
    );

    __marked.use({
      extensions: [
        __sCodeExampleMarkedExtension(),
        __sRepoStateMarkedExtension()
      ]
    });

  }

  /**
   * @name          render
   * @type          Function
   * @async
   *
   * This method allows you to render your actual markdown into different output like html and more to come depending on needs
   *
   * @return      {SPromise}                          An SPromise instance that will be resolved with the rendered string once it has been fully rendered
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  render(markdown: string): Promise<string> {
    return new __SPromise(
      async ({ resolve, reject }) => {
        
        resolve(__marked(markdown));

      },
      {
        id: 'SMarkdownRendererRender'
      }
    );
  }
}

export default SMarkdownRenderer;
