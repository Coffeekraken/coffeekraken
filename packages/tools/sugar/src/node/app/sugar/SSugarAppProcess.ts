import __deepMerge from '../../../shared/object/deepMerge';
import __isClass from '../../../shared/is/class';
import __SError from '../../../shared/error/SError';
import __SPromise from '@coffeekraken/s-promise';
import __SProcess from '../../process/SProcess';
import __SSugarApp from './SSugarApp';
import __SSugarAppInterface from './interface/SSugarAppInterface';
import __sugarConfig from '../../config/sugar';
import __SSugarAppModuleObjInterface from './interface/SSugarAppModuleObjInterface';
import __SSugarAppModule, {
  ISSugarAppModuleShortcuts
} from './SSugarAppModule';

/**
 * @name            SSugarAppProcess
 * @namespace           sugar.node.ui.sugar
 * @type            Class
 * @extends         SProcess
 * @status              wip
 *
 * This class represent the process that expose every registered "modules"
 * through through a socket connection and handle the talk between
 * the backend parts with the frontend parts of each modules.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISSugarAppCtorSettings {
  app: Partial<ISSugarAppSettings>;
}
export interface ISSugarAppSettings {}

export interface ISSugarAppModulesDescriptor {
  [key: string]: ISSugarAppModuleDescriptor;
}
export interface ISSugarAppModuleDescriptor {
  id: string;
  name: string;
  description: string;
  autoRun?: boolean;
  processPath: string;
  modulePath?: string;
  params?: any;
  settings?: any;
  stdio?: any;
  shortcuts?: ISSugarAppModuleShortcuts;
  instance?: __SSugarAppModule;
}

// @ts-ignore
export default class SSugarAppProcess extends __SProcess {
  static interfaces = {
    this: {
      apply: true,
      class: __SSugarAppInterface
    }
  };

  /**
   * @name              modules
   * @type              ISSugarAppModulesDescriptor
   * @private
   *
   * Store the registered modules objects
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  modules?: ISSugarAppModulesDescriptor;

  /**
   * @name              loadedModules
   * @type              ISSugarAppModulesDescriptor
   *
   * Store the loaded modules objects
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  loadedModules: ISSugarAppModulesDescriptor = {};

  /**
   * @name              modulesInError
   * @type              Array<SSugarAppModule>
   * @private
   *
   * Store all the modules that are in error
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  modulesInError: any[] = [];

  /**
   * @name      sugarAppSettings
   * @type      ISSugarAppSettings
   * @get
   *
   * Access the sugar app settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get sugarAppSettings(): ISSugarAppSettings {
    return (<any>this)._settings.sugarApp;
  }

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings: ISSugarAppCtorSettings) {
    super(
      {},
      __deepMerge(
        {
          id: 'SSugarAppProcess',
          name: 'Sugar App Process',
          sugarApp: {}
        },
        settings
      )
    );

    // load and check each modules
    this.loadedModules = this._loadModules(this.modules);

    // console.log(this.modulesObjs);

    // Pipe all the modules "events"
    // Object.keys(this.modulesObjs).forEach((moduleIdx) => {
    //   const moduleObj = this.modulesObjs[moduleIdx];
    //   __SPromise.pipe(moduleObj.instance, this, {
    //     processor: (value, metas) => {
    //       if (typeof value === 'object') {
    //         value.module = {
    //           id: moduleObj.id,
    //           name: moduleObj.name,
    //           idx: moduleIdx
    //         };
    //       } else {
    //         value = {
    //           module: {
    //             id: moduleObj.id,
    //             name: moduleObj.name,
    //             idx: moduleIdx
    //           },
    //           value
    //         };
    //       }
    //       return [value, metas];
    //     }
    //   });
    // });
  }

  /**
   * @name              process
   * @type              Function
   *
   * Method that execute the frontend server code, listen for errors, etc...
   *
   * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
   * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
   * @return      {Süromise}                        An SPomise instance representing the build process
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  process(params: any, settings = {}) {
    const promise = new __SPromise();
    return promise;
  }

  /**
   * @name            _modulesReady
   * @type            Function
   * @private
   *
   * This method is called once all the modules are flagged as ready
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _modulesReady() {
    setTimeout(() => {
      this.state('ready');
    }, 20);
  }

  /**
   * @name            _modulesError
   * @type            Function
   * @private
   *
   * This method is called once a module is flagged as in error
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _modulesError() {
    this.state('error');
  }

  /**
   * @name            _loadModules
   * @type            Function
   * @private
   *
   * This method simply load and check all the registered modules
   * before being able to continue the process...
   *
   * @param       {ISSugarAppModulesDescriptor}      modules        An object of SSugarAppModuleInterface compatible modules
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _loadModules(modules) {
    // track how many modules are ready
    let readyModulesCount = 0;
    const returnedModulesObj = {};
    // loop on all registered modules
    Object.keys(modules).forEach((moduleIdx) => {
      const moduleObj: ISSugarAppModuleDescriptor = modules[moduleIdx];

      if (moduleObj.params === undefined) moduleObj.params = {};
      if (moduleObj.settings === undefined) moduleObj.settings = {};

      // stop here if a module has error...
      if (this.modulesInError.length) return;

      if (moduleObj.processPath && moduleObj.processPath.slice(-3) !== '.js') {
        moduleObj.processPath += '.js';
      }
      if (moduleObj.modulePath && moduleObj.modulePath.slice(-3) !== '.js') {
        moduleObj.modulePath += '.js';
      }

      // if we provide only a process
      if (!moduleObj.modulePath && moduleObj.processPath) {
        moduleObj.modulePath = `${__dirname}/SSugarAppProcessModule.js`;
        moduleObj.params.processPath = moduleObj.processPath;
      }

      // validate module interface
      // __SSugarAppModuleObjInterface.apply(moduleObj, {
      //   name: `${this.constructor.name}.SSugarAppModule.${moduleIdx}`,
      //   throw: true
      // });

      // require and instanciate the module class
      const moduleClass = require(<string>moduleObj.modulePath).default;
      if (!__isClass(moduleClass)) {
        throw new Error(
          `The passed module file "<cyan>${moduleObj.modulePath}</cyan>" does not export a <green>proper Class</green> for the module "<yellow>${moduleObj.name}</yellow>"...`
        );
      }

      const moduleInstance = new moduleClass(moduleObj);
      if (!(moduleInstance instanceof __SSugarAppModule)) {
        throw new Error(
          `It seems that the passed class for your module "<yellow>${moduleObj.name}</yellow>" does not extends the sugar "<green>SSugarAppModule</green>" one...`
        );
      }

      moduleInstance.on('state', (state, metas) => {
        if (state === 'ready') {
          if (this.modulesInError.indexOf(moduleObj) !== -1) return;
          // update module ready count
          readyModulesCount++;
          // when all the modules are loaded, call the _modulesReady method
          if (readyModulesCount >= Object.keys(modules).length) {
            this._modulesReady();
          }
        } else if (state === 'error') {
          // add the module in the error modules stack
          this.modulesInError.push(moduleObj);
          this._modulesError();
        }
      });

      // add the validated module in the _modulesObjArray property
      returnedModulesObj[moduleIdx] = moduleInstance;
    });

    return returnedModulesObj;
  }
}
