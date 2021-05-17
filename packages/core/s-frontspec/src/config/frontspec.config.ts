import __unique from '@coffeekraken/sugar/shared/array/unique';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';

export default {
  /**
   * @name        default
   * @namespace       config.frontspec
   * @type          Object
   *
   * Specify the default frontspec file values that will be overrided by the user frontspec file ones
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  default: {
    /**
     * @name      assets
     * @namespace     config.frontspec.default
     * @type      Object
     * @default       [config.assets]
     *
     * Specify the default assets available in the current working directory like js, css, etc...
     *
     * @todo      Types
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    assets: '[config.assets]'
  },

  /**
   * @name        cache
   * @namespace    config.frontspec
   * @type        Boolean
   *
   * Specify if you want to use the cache when read the files, find them, etc...
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  cache: true,

  //   generate: {
  //     /**
  //      * @name            globs
  //      * @namespace       config.frontspec.generate
  //      * @type                Array<String>
  //      *
  //      * Specify the input globs to use in order to find files that will
  //      * be used for frontspec generation.
  //      * The syntax is standard glob with an additional feature which is:
  //      * - [glob]:[regex] -> This will search for files using the [glob] part, and search inside them using the [regex] part
  //      *
  //      * @since           2.0.0
  //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //      */
  //     globs: [`src/**{5}/*:/.*@namespace.*/gm`, `dist/css/*:/.*@namespace.*/gm`],

  //     /**
  //      * @name        exclude
  //      * @namespace   config.frontspec.generate
  //      * @type        Array<String>
  //      *
  //      * Specify some regex to apply on different docblock and path properties
  //      * to exclude some files from the generated frontspec json
  //      *
  //      * @since       2.0.0
  //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //      */
  //     exclude: ['**/__tests__/**/*', '**/__wip__/**/*'],

  //     /**
  //      * @name        filters
  //      * @namespace   config.frontspec.generate
  //      * @type        Object<String>
  //      *
  //      * Specify some regex to apply on different docblock properties
  //      * to exclude some files from the generated frontspec json
  //      *
  //      * @example     js
  //      * {
  //      *    namespace: /#\{.*\}/gm
  //      * }
  //      *
  //      * @since       2.0.0
  //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //      */
  //     filters: {
  //       namespace: /#\{.*\}/gm
  //     },

  //     /**
  //      * @name        fields
  //      * @namespace     config.frontspec.generate
  //      * @type        Array<String>
  //      * @default     ['name','type','description','namespace','status','static','since']
  //      *
  //      * Specify which docblock fields you want to integrate to your frontspec.json items
  //      *
  //      * @since     2.0.0
  //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //      */
  //     fields: [
  //       'name',
  //       'type',
  //       'description',
  //       'namespace',
  //       'status',
  //       'static',
  //       'since',
  //       'author'
  //     ],

  //     /**
  //      * @name        watch
  //      * @namespace     config.frontspec.generate
  //      * @type      Boolean
  //      * @default     false
  //      *
  //      * Specify if you want to re-generate the frontspec.json file when a source file has been updated
  //      *
  //      * @since       2.0.0
  //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //      */
  //     watch: false,

  //     /**
  //      * @name      save
  //      * @namespace       config.frontspec.generate
  //      * @type        Boolean
  //      * @default     true
  //      *
  //      * Specify if you want to save the generated frontspec.json file under the ```outPath``` path
  //      *
  //      * @since     2.0.0
  //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //      */
  //     save: true,

  //     /**
  //      * @name        outPath
  //      * @namespace   config.frontspec.generate
  //      * @type         String
  //      * @default       [config.storage.rootDir]/frontspec.json
  //      *
  //      * Specify where you want to outPath the file
  //      *
  //      * @since       2.0.0
  //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //      */
  //     outPath: `[config.storage.rootDir]/frontspec.json`
  //   },

  find: {
    /**
     * @name                globs
     * @namespace           config.frontspec.find
     * @type                    Array<String>
     *
     * Specify some globs to find the "frontspec.json"
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    globs: __unique([
      'frontspec.json',
      `node_modules/**{4}/frontspec.json`,
      `${__packageRoot(process.cwd(), true)}/node_modules/**{4}/frontspec.json`
    ]),

    /**
     * @name        exclude
     * @namespace   config.frontspec.find
     * @type        Array<String>
     *
     * Specify some regex to apply path properties
     * to exclude some files from the generated frontspec json
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exclude: ['**/__tests__/**/*', '**/__wip__/**/*']
  }
};
