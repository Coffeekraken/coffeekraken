export default {
  file: {
    /**
     * @name        names
     * @namespace   sugar.config.importmap.file
     * @type            Array<String>
     * @default         ['importmap.json', 'package.importmap']
     *
     * Specify the names that can have importmap files
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    names: ['importmap.json', 'package.importmap'],

    /**
     * @name        dirs
     * @namespace   sugar.config.importmap.file
     * @type        Array<String>
     * @default         ['[config.storage.distDir]', '[config.storage.rootDir]']
     *
     * Specify the directories where importmap files can lives
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    dirs: ['[config.storage.distDir]', '[config.storage.rootDir]']
  }
};
