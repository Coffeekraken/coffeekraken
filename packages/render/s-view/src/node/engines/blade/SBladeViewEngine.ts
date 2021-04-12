// @ts-nocheck

import __SViewEngine from '../SViewEngine';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __sugarConfig from '@coffeekraken/sugar/shared/config/sugar';
import __fs from 'fs';
import __path from 'path';
import __execPhp from 'exec-php';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __childProcess from 'child_process';
import __unique from '@coffeekraken/sugar/shared/array/unique';

/**
 * @name          SBladeViewEngine
 * @namespace     s-view.engines
 * @type          Class
 * @status              wip
 *
 * This class represent the blade php template engine that you can use by itself through this class, or through the ```STemplate``` class
 * that take care of a lot of works for you...
 *
 * @param       {Object}      [settings={}]       A settings object to configure your template engine. Each template engines can have different settings but here's the default one:
 * - cacheDir (@config.views.cacheDir) {String}: Specify the directory where you want to store the cache render files
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import { SBladeViewEngine } from '@coffeekraken/s-view';
 * const engine = new SBladeViewEngine({});
 * await engine.render('/something/cool/myView.blade.php', {
 *    title: 'Hello'
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISBladeViewEngineCtorSettings {
  bladeViewEngine: Partial<ISBladeViewEngineSettings>;
}

export interface ISBladeViewEngineSettings {}

export default class SBladeViewEngine extends __SViewEngine {
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
  static input = 'string';

  /**
   * @name      names
   * @type      Array<String>
   * @default   ['blade.php','blade']
   * @static
   *
   * Store all the names under which this engine is available
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static names = ['blade.php', 'blade'];

  /**
   * @name      rootDirs
   * @type      string[]
   * @static
   *
   * This static property define some rootDirs that this engine can use
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static rootDirs = [__path.resolve(__dirname, '../../../php/views/blade')];

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
  static canRender(templateString: string): boolean {
    if (
      templateString.match(
        /@(section|show|yield|extends|endsection|parent|verbatim|endverbatim|if|elseif|endif|unless|endunless|isset|endisset|empty|endempty|hasSection|sectionMissing|switch|case|endswitch|for|endfor|foreach|endforeach|forelse|endforelse|while|endwhile)(\(.*\))?/gm
      )
    )
      return true;
    if (
      templateString.match(
        /\{\{\s?\$.*\}\}|\{\!\!\s?\$.*\!\!\}|\{\{\s?.*\(.*\)\s?\}\}/gm
      )
    )
      return true;

    return false;
  }

  /**
   * @name      bladeViewEngineSettings
   * @type      ISBladeViewEngineSettings
   * @get
   *
   * Access bladeViewEngineSettings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get bladeViewEngineSettings(): ISBladeViewEngineSettings {
    return (<any>this)._settings.bladeViewEngine;
  }

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
  constructor(settings?: Partial<ISBladeViewEngineCtorSettings>) {
    super(
      __deepMerge(
        {
          metas: {
            id: 'SBladeViewEngine'
          },
          bladeViewEngine: {}
        },
        settings ?? {}
      )
    );
  }

  /**
   * @name        render
   * @type        Function
   * @async
   *
   * Main render method
   *
   * @param       {String}      viewPath      The view path to render. Has to be an absolute file path
   * @param       {Object}      [data={}]     An object of data to use for the render
   * @param       {Object}      [settings={}]     An object of settings to override the default one passed in the contructor
   * @return      {SPromise}                  An SPromise instance that will be resolved once the render has finished
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  render(
    viewPath: string,
    data: any = {},
    settings?: Partial<ISBladeViewEngineSettings>
  ) {
    const set = <ISBladeViewEngineSettings>(
      __deepMerge(this.bladeViewEngineSettings, settings ?? {})
    );
    return new __SPromise(
      ({ resolve, reject }) => {
        if (!__fs.existsSync(viewPath)) {
          return reject(
            `It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`
          );
        }

        // preparing the php execution
        __execPhp(
          __dirname + '/compile.php',
          // __path.resolve(__dirname, '../../../bin/php'),
          (error, php, outprint) => {
            console.log(set);

            if (error) {
              return reject(error + ' ---- ' + outprint);
            }

            const viewDirPath = __folderPath(viewPath);
            const viewFilename = __getFilename(viewPath);
            // settings.rootDirs.push(viewDirPath);

            // execute the php engine and get back the result
            php.compile(
              __unique([...set.rootDirs]),
              viewFilename.replace('.blade.php', '').split('/').join('.'),
              data,
              set.cacheDir,
              async (error, result, output, printed) => {
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
              }
            );
          }
        );
      },
      {
        eventEmitter: {
          bind: this
        }
      }
    );
  }
}
