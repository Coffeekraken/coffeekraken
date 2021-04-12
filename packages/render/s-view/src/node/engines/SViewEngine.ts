// @ts-nocheck

import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __sugarConfig from '@coffeekraken/sugar/shared/config/sugar';
import __SClass from '@coffeekraken/s-class';
import __fs from 'fs';

import { ISPromise } from '@coffeekraken/s-promise';

/**
 * @name          SViewEngine
 * @namespace     sugar.node.template.engines
 * @type          Class
 * @extends       SClass
 * @status              wip
 *
 * This class represent the base for a compatible ```STemplate``` engine
 * A template engine class MUST have some basic methods like:
 * - ```input```: A simple static property that tells if your template engine work with a "path" as input, or with a "string" (templateString) either...
 * - ```canRender```: A simple static method that take the template string as parameter and must return true if it can handle it and false if not
 * - ```render```: The main method that take as parameter either the view path to render, either directly the template string depending on his exposed static property ```input``` that can be either ```path``` or ```string``` as well as a data object to use for rendering process
 * -
 *
 * @param       {Object}      [settings={}]       A settings object to configure your template engine. Each template engines can have different settings but here's the default one:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import SViewEngine from '@coffeekraken/sugar/node/template/engines/SViewEngine';
 * export default class MyviewEngine extends SViewEngine {
 *    static input = 'path';
 *    static canRender(templateString) {
 *      // ...
 *      return true;
 *    }
 *    constructor(settings = {}) {
 *      super(settings);
 *    }
 *    render(path, data = {}, settings = {}) {
 *      return new SPromise(({ resolve, reject, emit }) => {
 *        // ...
 *        resolve(compiledTemplateString);
 *      });
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISViewEngineSettings {
  cacheDir: string;
  rootDirs: string[];
}
export interface ISViewEngineCtorSettings {
  viewEngine: Partial<ISViewEngineSettings>;
}

export interface ISViewEngineMetas {}

export interface ISViewEngineRenderResult {}

export interface ISViewEngine extends __SClass {
  new (settings?: ISViewEngineCtorSettings);
  render(
    view: string,
    data: any,
    settings: Partial<ISViewEngineSettings>
  ): ISPromise<ISViewEngineRenderResult>;
}

class SViewEngine extends __SClass implements ISViewEngine {
  /**
   * @name      viewEngineSettings
   * @type      ISViewEngineSettings
   * @get
   *
   * Access ViewEngineSettings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get viewEngineSettings(): ISViewEngineSettings {
    return (<any>this)._settings.viewEngine;
  }

  /**
   * @name      engineMetas
   * @type      ISViewEngineMetas
   * @get
   *
   * Access the view engine metas
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get engineMetas(): ISViewEngineMetas {
    return {
      name: this.constructor.names
    };
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
  constructor(settings?: Partial<ISViewEngineCtorSettings>) {
    super(
      __deepMerge(
        {
          viewEngine: {
            rootDirs: __sugarConfig('views.rootDirs'),
            cacheDir: __sugarConfig('views.cacheDir')
          }
        },
        settings
      )
    );

    if (!__fs.existsSync(this.viewEngineSettings.cacheDir))
      __fs.mkdirSync(this.viewEngineSettings.cacheDir, {
        recursive: true
      });
  }
}

export default SViewEngine;
