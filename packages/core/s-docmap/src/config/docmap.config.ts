import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __unique from '@coffeekraken/sugar/shared/array/unique';

export default {
  
  read: {
    /**
     * @name          input
     * @namespace     config.docmap.read
     * @type          String
     * 
     * Specify the path of the docmap.json source file to read
     * 
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: `${__packageRoot()}/docmap.json`
  },

  snapshot: {

    /**
     * @name          outDir
     * @namespace     config.docmap.snapshot
     * @type          String
     * @default       [config.storage.package.rootDir]/.docmap
     * 
     * Specify where to save the generated snapshot
     * 
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    outDir: `[config.storage.package.rootDir]/.docmap`,
    
  },

  installSnapshot: {

    /**
     * @name          glob
     * @namespace     config.docmap.installSnapshot
     * @type          String
     * @default       [config.storage.package.rootDir]/.docmap/* /
     * 
     * Specify where to find the snapshot(s) to install. It must refer
     * to folder(s) where a docmap.json and a package.json exists...
     * 
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    glob: `[config.storage.package.rootDir]/.docmap/*`,
    
  },

  build: {
    /**
     * @name            globs
     * @namespace       config.docmap.build
     * @type                Array<String>
     *
     * Specify the input globs to use in order to find files that will
     * be used for docmap generation.
     * The syntax is standard glob with an additional feature which is:
     * - [glob]:[regex] -> This will search for files using the [glob] part, and search inside them using the [regex] part
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    globs: [`src/**{5}/*:/.*@namespace.*/gm`, `dist/css/*:/.*@namespace.*/gm`],

    /**
     * @name        exclude
     * @namespace   config.docmap.build
     * @type        Array<String>
     *
     * Specify some regex to apply on different docblock and path properties
     * to exclude some files from the buildd docMap json
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exclude: ['**/__tests__/**/*', '**/__tests__.wip/**/*', '**/__wip__/**/*'],

    /**
     * @name        noExtends
     * @namespace   config.docmap.build
     * @type        Boolean
     * @default     false
     *
     * Specify if you want to disable the extends search process that will result in the "extends" array in the docmap.json file
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    noExtends: false,

    /**
     * @name        filters
     * @namespace   config.docmap.build
     * @type        Object<String>
     *
     * Specify some regex to apply on different docblock properties
     * to exclude some files from the buildd docmap json
     *
     * @example     js
     * {
     *    namespace: /#\{.*\}/gm
     * }
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    filters: {
      namespace: /#\{.*\}/gm
    },

    /**
     * @name        fields
     * @namespace     config.docmap.build
     * @type        Array<String>
     * @default     ['name','type','description','namespace','status','static','since']
     *
     * Specify which docblock fields you want to integrate to your docmap.json items
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    fields: [
      'name',
      'type',
      'platform',
      'description',
      'namespace',
      'status',
      'example',
      'static',
      'since',
      'author'
    ],

    /**
     * @name      save
     * @namespace       config.docmap.build
     * @type        Boolean
     * @default     true
     *
     * Specify if you want to save the buildd docmap.json file under the ```outPath``` path
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    save: true,

    /**
     * @name        outPath
     * @namespace   config.docmap.build
     * @type         String
     * @default       [config.storage.package.rootDir]/docmap.json
     *
     * Specify where you want to outPath the file
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    outPath: `[config.storage.package.rootDir]/docmap.json`
  }
};
