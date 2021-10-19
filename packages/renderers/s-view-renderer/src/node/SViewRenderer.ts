import __SClass from '@coffeekraken/s-class';
import __SDuration, { ISDurationObject } from '@coffeekraken/s-duration';
import __SFile, { ISFileObject } from '@coffeekraken/s-file';
// import __page404 from './pages/404';
import __SPromise, { ISPromise } from '@coffeekraken/s-promise';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';

/**
 * @name          SViews
 * @namespace     sugar.node.template
 * @type          Class
 * @status              wip
 *
 * This class represent a template that can be rendered using all the supported render engines listed in the features bellow.
 *
 * @feature       2.0.0         Support for ```bladePhp``` render engine
 * @feature       2.0.0         Simply render your template using the ```render``` method that returns you back a nice SPromise instance resolved once the template has been rendered correctly
 *
 * @param       {String}        viewPath      The view doted file path relative to the ```rootDir``` setting, or directly a template string to render using the engine specify in ```engine``` setting...
 * @param       {Object}        [settings={}]           An object of settings to configure your template rendering process:
 * - rootDir (@config.views.rootDir) {String}: Specify either 1 rootDir in which to search for your view, or an Array of rootDir to search in
 * - engine (null) {String|SViewsEngine}: Specify the engine to use in order to render your template. By default it will try to automatically detect the engine but you can specify it yourself. Can be a string like "blade.php" that identify a registered template engine, or directly an SViewsEngine based template engine instance
 * - engineSettings ({}) {Object}: Specify some settings that will be passed to the corresponding engine
 * - defaultData ({}) {Object}: A data object to use by default when calling the ```render``` method. Can be overrided obviously in the ```render``` method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SViews from '@coffeekraken/sugar/node/template/SViews';
 * const myTemplate = new SViews('my.cool.view', {
 *    title: 'Hello'
 * }, {
 *    engine: 'blade'
 * });
 * const result = await myTemplate.render({
 *    title: 'World'
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface ISViewRendererSettings {
    rootDirs: string[];
    cacheDir: string;
    engine: string | ISViewRendererEngine;
    engineSettings?: any;
    defaultData?: any;
}
export interface ISViewCtorSettings {
    view?: Partial<ISViewRendererSettings>;
}

export interface ISViewViewMetas extends ISFileObject {}

export interface ISViewRendererEngines {
    [key: string]: ISViewRendererEngine;
}

export interface ISViewRendererDataHandler {
    (filePath: string): ISPromise;
}
export interface ISViewRendererDataHandlers {
    [key: string]: ISViewRendererDataHandler;
}

export interface ISViewRendererEngine {}

export interface ISViewRendererRenderResult extends ISDurationObject {
    view: ISViewViewMetas;
    value: string;
}

export interface ISViewRenderer {
    _viewPath?: string;
    _viewString?: string;
}

// @ts-ignore
class SView extends __SClass implements ISViewRenderer {
    /**
     * @name      _viewPath
     * @type      String
     * @default   undefined
     * @private
     *
     * Store the view doted path if the passed parameter is a valid path
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    private _viewPath = '';
    private _originalViewPath;

    /**
     * @name      _enginePath
     * @type      String
     * @default   undefined
     * @private
     *
     * Store the view engine path to use for the instanciated view
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    private _enginePath;

    /**
     * @name      _dataHandlerPath
     * @type      String
     * @default   undefined
     * @private
     *
     * Store the datahandler path to use with this view
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    private _dataHandlerPath;

    /**
     * @name      _dataFilePath
     * @type      String
     * @default   undefined
     * @private
     *
     * Store the data file path if one exists
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    private _dataFilePath;

    /**
     * @name       engines
     * @type      Object
     * @static
     *
     * Store the registered engines using the ```registerEngine``` static method
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static engines = {};

    /**
     * @name       dataHandlers
     * @type      Object
     * @static
     *
     * Store the registered dataHandlers using the ```registerDataHandler``` static method
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static dataHandlers = {};

    /**
     * @name      defaultRootDirs
     * @type      Array
     * @static
     *
     * This static property store the default root directories where the class
     * will search for views to render
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static get defaultRootDirs(): string[] {
        return [
            ...__SugarConfig.get('views.rootDirs'),
            __path.resolve(__dirname(), '../php/views/blade'),
        ];
    }

    /**
     * @name      getRootDirs
     * @type      Function
     * @static
     *
     * This function accept an array of root directories
     * and return the final array with the default root directories
     * added correctly
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static getRootDirs(rootDirs = []): string[] {
        return __unique([
            ...(Array.isArray(rootDirs) ? rootDirs : [rootDirs]),
            ...SView.defaultRootDirs,
        ]);
    }

    /**
     * @name      render
     * @type      Function
     * @static
     *
     * This static method allows you to render quickly a passed view
     *
     * @param     {String}    viewPath      The doted view path relative to the views.rootDir config
     * @param     {Any}         [data=null
     *
     * @since       2.0.0
     */
    static render(
        viewPath: string,
        data: any = null,
        settings: Partial<ISViewCtorSettings>,
    ) {
        return new __SPromise(async ({ resolve, reject }) => {
            const viewInstance = new SView(
                viewPath,
                __deepMerge(
                    {
                        view: {},
                    },
                    settings ?? {},
                ),
            );
            let resultObj;
            try {
                resultObj = await viewInstance.render(
                    data,
                    settings?.view ?? {},
                );
                resultObj.status = 200;
                return resolve({
                    ...resultObj,
                });
            } catch (e) {
                const errorViewInstance = new SView('pages.501', {
                    ...settings,
                });
                resultObj = await errorViewInstance.render(
                    {
                        ...data,
                        error: e,
                    },
                    settings?.view ?? {},
                );
                resultObj.status = 501;
                return reject({
                    ...resultObj,
                });
            }
        });
    }

    /**
     * @name      registerEngine
     * @type      Function
     * @static
     *
     * This static method can be used to register a compatible __SViewEngine engine class
     * into the available SViews engines.
     *
     * @param       {String}        extension       The file extension to detect the engine. For example "blade.php" will be used to render all the files names "%name.blade.php"
     * @param       {String}        enginePath      The absolute path to the engine class file
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerEngine(
        enginePath: string,
        extensions: string | string[],
    ): void {
        if (!enginePath.match(/\.js$/)) enginePath += '.js';

        // make sure the engine path exists
        if (!__fs.existsSync(enginePath)) {
            throw new Error(
                `Sorry but the engine "<yellow>${enginePath}</yellow>" that you want to register does not exists...`,
            );
        }
        // register the engine under each names
        const exts = Array.isArray(extensions)
            ? extensions
            : extensions.split(',').map((l) => l.trim());
        exts.forEach((ext) => {
            if (SView.engines[ext]) return;

            // register the engine in the stack
            SView.engines[ext] = {
                path: enginePath,
            };
        });
    }

    /**
     * @name      registerDataHandler
     * @type      Function
     * @static
     *
     * This static method can be used to register a compatible __SViewEngine engine class
     * into the available SViews engines.
     *
     * @param       {String}        handlerPath      The absolute path to the engine class file
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerDataHandler(
        handlerPath: string,
        extensions: string | string[],
    ): void {
        if (handlerPath.slice(-3) !== '.js') handlerPath += '.js';
        // make sure the engine path exists
        if (!__fs.existsSync(handlerPath)) {
            throw new Error(
                `Sorry but the data handler "<yellow>${handlerPath}</yellow>" that you want to register does not exists...`,
            );
        }
        // register the engine under each names
        const exts = Array.isArray(extensions)
            ? extensions
            : extensions.split(',').map((l) => l.trim());
        exts.forEach((extension) => {
            if (SView.dataHandlers[extension]) return;
            // register the engine in the stack
            SView.dataHandlers[extension] = {
                path: handlerPath,
            };
        });
    }

    /**
     * @name					getViewMetas
     * @type 					Function
     * @static
     *
     * This static method allows you to give a "potential" view path (with or without the extension) and get
     * back an object that describe the view with infos like "type", "path", "extension", etc...
     * If nothing is found, you will get ```false``` back.
     *
     * @param       {String}      viewPath        The view path to check. Either a relative path to the @config.frontend.viewsDir configuration, or an absolute path
     * @return      {Object|Boolean}              Return an object describing the view or ```false``` if not found
     *
     * @since
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static getViewMetas(viewPath: string): ISViewViewMetas | undefined {
        const viewsDirs = __SugarConfig.get('views.rootDirs');

        for (let i = 0; i < viewsDirs.length; i++) {
            const viewsDir = viewsDirs[i];

            let path = `${viewsDir}/${viewPath}`;
            if (__path.isAbsolute(viewPath)) {
                path = viewPath;
            }

            let finalViewPath, viewType;

            if (__fs.existsSync(path)) {
                finalViewPath = path;
                const fileName = path.split('/').slice(-1).join('');
                viewType = fileName.split('.').slice(1).join('.');
            } else {
                for (let i = 0; i < Object.keys(SView.engines).length; i++) {
                    const engineExt = Object.keys(SView.engines)[i];
                    if (__fs.existsSync(`${path}.${engineExt}`)) {
                        finalViewPath = `${path}.${engineExt}`;
                        viewType = engineExt;
                        break;
                    }
                }
            }

            // check if we have a view founded
            if (!finalViewPath) continue;

            // build the info object
            const infoObj = __SFile.new(finalViewPath);

            // return the infos
            return infoObj.toObject();
        }

        return undefined;
    }

    /**
     * @name      viewSettings
     * @type      ISViewRendererSettings
     * @get
     *
     * Access the template settings
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get viewSettings(): ISViewRendererSettings {
        return (<any>this)._settings.view;
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
    constructor(viewPath, settings?: ISViewCtorSettings) {
        // save the settings
        super(
            __deepMerge(
                {
                    view: {
                        rootDirs: __SugarConfig.get('views.rootDirs'),
                        cacheDir: __SugarConfig.get('views.cacheDir'),
                        engine: null,
                        engineSettings: {},
                        defaultData: {},
                    },
                },
                settings || {},
            ),
        );

        const defaultEngines = __SugarConfig.get('views.engines') || {};
        Object.keys(defaultEngines).forEach((ext) => {
            SView.registerEngine(defaultEngines[ext], ext);
        });

        const defaultDataHandlers =
            __SugarConfig.get('views.dataHandlers') || {};
        Object.keys(defaultDataHandlers).forEach((ext) => {
            SView.registerDataHandler(defaultDataHandlers[ext], ext);
        });

        this._originalViewPath = viewPath;

        this.viewSettings.rootDirs = (<any>this.constructor).getRootDirs(
            this.viewSettings.rootDirs || [],
        );

        Object.keys(SView.engines).forEach((ext) => {
            viewPath = viewPath.replace(`.${ext}`, '');
        });

        // detect and save the view doted path or the view template string
        if (viewPath.split(' ').length === 1 && viewPath.trim() === viewPath) {
            // check if we can find the view path passed
            if (__path.isAbsolute(viewPath)) {
                if (__fs.existsSync(viewPath)) {
                    // throw new Error(
                    //   `Sorry but the absolute path to the view "<cyan>${viewPath}</cyan>" does not exist...`
                    // );
                    this._viewPath = viewPath;
                }
            } else if (!viewPath.match(/\//gm)) {
                // doted path
                for (let i = 0; i < this.viewSettings.rootDirs.length; i++) {
                    const rootDir = this.viewSettings.rootDirs[i];
                    const potentialViewPath = `${rootDir}/${viewPath
                        .split('.')
                        .join('/')}.[!data]*`;
                    const matches = __glob.sync(potentialViewPath);
                    if (matches && matches.length) {
                        this._viewPath = matches[0];
                        const extension = this._viewPath
                            .split('.')
                            .slice(1)
                            .join('.');
                        if (!this.viewSettings.engine)
                            this.viewSettings.engine = extension;
                        break;
                    }
                }
            }
        } else {
            // throw new Error(
            //   `<red>[SView]</red> It seems that the passed viewPath "<yellow>${viewPath}</yellow>" argument is not a valid path`
            // );
        }

        let viewExt;

        // try to get an engine for this view
        if (this._viewPath) {
            for (let i = 0; i < Object.keys(SView.engines).length; i++) {
                const engineExt = Object.keys(SView.engines)[i];
                const reg = new RegExp(`${engineExt}$`);
                if (reg.test(this._viewPath)) {
                    viewExt = engineExt;
                    this._enginePath = SView.engines[engineExt].path;
                    break;
                }
            }
        }

        // get the datahandler path
        if (this._viewPath) {
            const viewPathWithoutExtension = this._viewPath.replace(
                `.${viewExt}`,
                '',
            );

            // loop on each dataHandlers available
            Object.keys(SView.dataHandlers).forEach((extension) => {
                if (this._dataHandlerPath) return;
                if (
                    __fs.existsSync(
                        `${viewPathWithoutExtension}.data.${extension}`,
                    )
                ) {
                    this._dataFilePath = `${viewPathWithoutExtension}.data.${extension}`;
                    this._dataHandlerPath = SView.dataHandlers[extension].path;
                }
            });
        }
    }

    /**
     * @name          render
     * @type          Function
     * @async
     *
     * Main method to render your view by passing it an object of data to use as well as an object of settings to override the default passed onces
     *
     * @param       {Object}        [data={}]       An object of data to use to render the view.
     * @param       {Object}        [settings={}]     An object of settings that will be passed to the render engine method to use to override the default onces passed in the constructor. Check the used engine render documentation
     * @return      {SPromise}                    An SPromise instance that will be resolved once the rendering process has correctly finished
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    render(
        data = {},
        settings?: Partial<ISViewRendererSettings>,
    ): Promise<ISViewRendererRenderResult> {
        // @ts-ignore
        // if (!this._viewPath) {
        //   return __page404({
        //     title: 'Passed view does not exists',
        //     body: `Sorry but the passed dot path "<cyan>${this._originalViewPath}</cyan>" does not resolve to any existing views...`
        //   });
        // }
        // // @ts-ignore
        // if (!this._enginePath) {
        //   return __page404({
        //     title: 'View not supported',
        //     body: `<red>[${this.constructor.name}.render]</red> It seems that no registered engines can handle your view`
        //   });
        // }

        return new __SPromise(async ({ resolve, reject }) => {
            const viewSettings = Object.assign(
                {},
                <ISViewRendererSettings>(
                    __deepMerge(this.viewSettings, settings || {})
                ),
            );
            data = __deepMerge(viewSettings.defaultData, data);

            const duration = new __SDuration();

            // load engine, datahandler, etc...
            const { default: engineObj } = await import(this._enginePath);

            let dataHandlerObj;
            if (this._dataHandlerPath && this._dataFilePath) {
                dataHandlerObj = (await import(this._dataHandlerPath)).default;
                const gettedData = await dataHandlerObj.handle(
                    this._dataFilePath,
                );
                if (gettedData) data = __deepMerge(gettedData, data);
            }

            const engineSettings = __deepMerge(
                engineObj.settings ?? {},
                viewSettings.engineSettings ?? {},
            );
            viewSettings.engineSettings = engineSettings;

            if (engineObj) {
                const renderFn = engineObj.render.bind(this);

                const renderPromise = renderFn(
                    this._viewPath,
                    data,
                    viewSettings,
                );
                const result = await renderPromise;

                if (renderPromise.isRejected()) {
                    const resObj: Partial<ISViewRendererRenderResult> = {
                        view: SView.getViewMetas(this._viewPath),
                        ...duration.end(),
                    };
                    return reject(resObj);
                }

                // resolve the render process
                const resObj: Partial<ISViewRendererRenderResult> = {
                    // engine: this._engineInstance.engineMetas,
                    view: SView.getViewMetas(this._viewPath),
                    ...duration.end(),
                    value: result,
                };
                resolve(resObj);
            }
        });
    }
}

export default SView;
