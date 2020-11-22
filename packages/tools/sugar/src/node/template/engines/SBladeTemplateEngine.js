"use strict";
var _a;
const __STemplateEngine = require('./STemplateEngine');
const __deepMerge = require('../../object/deepMerge');
const __SPromise = require('../../promise/SPromise');
const __sugarConfig = require('../../config/sugar');
const __fs = require('fs');
const __execPhp = require('exec-php');
const __SError = require('../../error/SError');
const __folderPath = require('../../fs/folderPath');
const __getFilename = require('../../fs/filename');
const __copy = require('../../clipboard/copy');
const __childProcess = require('child_process');
const __unique = require('../../array/unique');
/**
 * @name          SBladeTemplateEngine
 * @namespace     sugar.node.template.engines
 * @type          Class
 *
 * This class represent the blade php template engine that you can use by itself through this class, or through the ```STemplate``` class
 * that take care of a lot of works for you...
 *
 * @param       {Object}      [settings={}]       A settings object to configure your template engine. Each template engines can have different settings but here's the default one:
 * - cacheDir (@config.views.cacheDir) {String}: Specify the directory where you want to store the cache render files
 *
 * @Todo      documentation
 *
 * @example     js
 * const SBladeTemplateEngine = require('@coffeekraken/sugar/node/template/engines/SBladeTemplateEngine');
 * const engine = new SBladeTemplateEngine({});
 * await engine.render('/something/cool/myView.blade.php', {
 *    title: 'Hello'
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SBladeTemplateEngine extends __STemplateEngine {
        /**
         * @name      constructor
         * @type      Function
         * @constructor
         *
         * Constructor
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
            super(__deepMerge({
                id: 'SBladeTemplateEngine',
                cacheDir: __sugarConfig('views.cacheDir')
            }, settings));
        }
        /**
         * @name      canRender
         * @type      Function
         * @static
         *
         * Method that take as parameter the template string to analyze and send back true or false depending if the passed string is renderable by this engine
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        static canRender(templateString) {
            if (templateString.match(/@(section|show|yield|extends|endsection|parent|verbatim|endverbatim|if|elseif|endif|unless|endunless|isset|endisset|empty|endempty|hasSection|sectionMissing|switch|case|endswitch|for|endfor|foreach|endforeach|forelse|endforelse|while|endwhile)(\(.*\))?/gm))
                return true;
            if (templateString.match(/\{\{\s?\$.*\}\}|\{\!\!\s?\$.*\!\!\}|\{\{\s?.*\(.*\)\s?\}\}/gm))
                return true;
            return false;
        }
        /**
         * @name        render
         * @type        Function
         * @async
         *
         * Main render method
         *
         * @param       {String}      viewPath      The view path to render. Has to be an absolute file path
         * @param       {Object}      [data={}]     An object of data to use for the render
         * @param       {Object}      [settings={}]     An object of settings to override the default one passed in the contructor
         * @return      {SPromise}                  An SPromise instance that will be resolved once the render has finished
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        render(viewPath, data = {}, settings = {}) {
            settings = __deepMerge({
                rootDirs: []
            }, this._settings, settings);
            return new __SPromise((resolve, reject, trigger, cancel) => {
                if (!__fs.existsSync(settings.cacheDir))
                    __fs.mkdirSync(settings.cacheDir, {
                        recursive: true
                    });
                if (!__fs.existsSync(viewPath)) {
                    return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
                }
                // preparing the php execution
                __execPhp(__dirname + '/bladePhp/compile.php', __dirname + '/../../../bin/php', (error, php, outprint) => {
                    if (error) {
                        throw new __SError(error);
                    }
                    const viewDirPath = __folderPath(viewPath);
                    const viewFilename = __getFilename(viewPath);
                    settings.rootDirs.push(viewDirPath);
                    // execute the php engine and get back the result
                    php.compile(__unique([...settings.rootDirs]), viewFilename.replace('.blade.php', '').split('/').join('.'), data, settings.cacheDir, async (error, result, output, printed) => {
                        if (error) {
                            const cmd = error
                                .toString()
                                .replace('Error: Command failed: ', '');
                            const res = __childProcess.spawnSync(cmd, [], {
                                shell: true
                            });
                            if (res && res.stdout) {
                                return resolve(res.stdout.toString());
                            }
                        }
                        // get the best result possible
                        const ret = result || printed || output || error;
                        // resolve the promise with the best result possible
                        resolve(ret);
                    });
                });
            }, {
                id: this._settings.id + '.render'
            });
        }
    },
    /**
     * @name      input
     * @type      String
     * @static
     *
     * Specify the input type this template engine want
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.input = 'string',
    _a);
