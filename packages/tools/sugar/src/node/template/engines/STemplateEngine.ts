// @ts-nocheck

import __STemplateEngineInterface from './interface/STemplateEngineInterface';
import __deepMerge from '../../object/deepMerge';
import __sugarConfig from '../../config/sugar';
import __SClass from '../../class/SClass';

import { ISPromise } from '../../promise/SPromise';

/**
 * @name          STemplateEngine
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
 * import STemplateEngine from '@coffeekraken/sugar/node/template/engines/STemplateEngine';
 * export default class MyTemplateEngine extends STemplateEngine {
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

export interface ISTemplateEngineSettings {}
export interface ISTemplateEngineCtorSettings {
  templateEngine: Partial<ISTemplateEngineSettings>;
}

export interface ISTemplateEngineRenderResult {}

export interface ISTemplateEngine {
  new (settings?: ISTemplateEngineCtorSettings);
  render(
    view: string,
    data: any,
    settings: Partial<ISTemplateEngineSettings>
  ): ISPromise<ISTemplateEngineRenderResult>;
}

class STemplateEngine extends __SClass implements ISTemplateEngine {
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
  constructor(settings?: ISTemplateEngineCtorSettings) {
    super(
      __deepMerge(
        {
          templateEngine: {}
        },
        settings
      )
    );
  }
}

export default STemplateEngine;
