import __SClass from '@coffeekraken/s-class';
import __SDuration, { ISDurationObject } from '@coffeekraken/s-duration';
import __SFile, { ISFileObject } from '@coffeekraken/s-file';
// import __page404 from './pages/404';
import __SPromise, { ISPromise } from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __SViewRendererSettingsInterface from './interface/SViewRendererSettingsInterface';

/**
 * @name          SViewRenderer
 * @namespace     node
 * @type          Class
 * @extends       SClass
 * @plarform        node
 * @status              beta
 *
 * This class represent a template that can be rendered using all the supported render engines listed in the features bellow.
 *
 * @feature       2.0.0         Support for ```bladePhp``` render engine
 * @feature       2.0.0         Simply render your template using the ```render``` method that returns you back a nice SPromise instance resolved once the template has been rendered correctly
 *
 * @param       {String}        viewPath      The view doted file path relative to the ```rootDir``` setting, or directly a template string to render using the engine specify in ```engine``` setting...
 * @param       {Object}        [settings={}]           An object of settings to configure your template rendering process:
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
    enginesSettings?: any;
    defaultData?: any;
}
export interface ISViewCtorSettings {
    viewRenderer?: Partial<ISViewRendererSettings>;
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
class SViewRenderer extends __SClass implements ISViewRenderer {
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
            ...__SSugarConfig.get('viewRenderer.rootDirs'),
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
            ...SViewRenderer.defaultRootDirs,
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
            const viewInstance = new SViewRenderer(
                viewPath,
                __deepMerge(
                    {
                        viewRenderer: {},
                    },
                    settings ?? {},
                ),
            );
            let resultObj;
            try {
                resultObj = await viewInstance.render(
                    data,
                    settings?.viewRenderer ?? {},
                );
                resultObj.status = 200;
                return resolve({
                    ...resultObj,
                });
            } catch (e) {
                const errorViewInstance = new SViewRenderer('pages.501', {
                    ...settings,
                });
                resultObj = await errorViewInstance.render(
                    {
                        ...data,
                        error: e,
                    },
                    settings?.viewRenderer ?? {},
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
            if (SViewRenderer.engines[ext]) return;

            // register the engine in the stack
            SViewRenderer.engines[ext] = {
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
            if (SViewRenderer.dataHandlers[extension]) return;
            // register the engine in the stack
            SViewRenderer.dataHandlers[extension] = {
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
        const viewsDirs = __SSugarConfig.get('viewRenderer.rootDirs');

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
                for (let i = 0; i < Object.keys(SViewRenderer.engines).length; i++) {
                    const engineExt = Object.keys(SViewRenderer.engines)[i];
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
     * @name      viewRendererSettings
     * @type      ISViewRendererSettings
     * @get
     *
     * Access the template settings
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get viewRendererSettings(): ISViewRendererSettings {
        return (<any>this)._settings.viewRenderer;
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
                    viewRenderer: __SViewRendererSettingsInterface.defaults(),
                },
                settings || {},
            ),
        );

        const defaultEngines = __SSugarConfig.get('viewRenderer.engines') || {};
        Object.keys(defaultEngines).forEach((id) => {
            const engineObj = defaultEngines[id];
            engineObj.extensions.forEach((ext) => {
                SViewRenderer.registerEngine(engineObj.path, ext);
            });
        });

        const defaultDataHandlers =
            __SSugarConfig.get('viewRenderer.dataHandlers') || {};
        Object.keys(defaultDataHandlers).forEach((id) => {
            const handlerObj = defaultDataHandlers[id];
            handlerObj.extensions.forEach((ext) => {
                SViewRenderer.registerDataHandler(handlerObj.path, ext);
            });
        });

        this._originalViewPath = viewPath;

        this.viewRendererSettings.rootDirs = (<any>this.constructor).getRootDirs(
            this.viewRendererSettings.rootDirs || [],
        );

        Object.keys(SViewRenderer.engines).forEach((ext) => {
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
                for (let i = 0; i < this.viewRendererSettings.rootDirs.length; i++) {
                    const rootDir = this.viewRendererSettings.rootDirs[i];
                    const potentialViewPath = `${rootDir}/${viewPath
                        .split('.')
                        .join('/')}.[!data]*`;
                    const matches = __glob.sync(potentialViewPath);
                    if (matches && matches.length) {
                        this._viewPath = matches[0];
                        // const extension = this._viewPath
                        //     .split('.')
                        //     .slice(1)
                        //     .join('.');
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
            for (let i = 0; i < Object.keys(SViewRenderer.engines).length; i++) {
                const engineExt = Object.keys(SViewRenderer.engines)[i];
                const reg = new RegExp(`${engineExt}$`);
                if (reg.test(this._viewPath)) {
                    viewExt = engineExt;
                    this._enginePath = SViewRenderer.engines[engineExt].path;
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
            Object.keys(SViewRenderer.dataHandlers).forEach((extension) => {
                if (this._dataHandlerPath) return;
                if (
                    __fs.existsSync(
                        `${viewPathWithoutExtension}.data.${extension}`,
                    )
                ) {
                    this._dataFilePath = `${viewPathWithoutExtension}.data.${extension}`;
                    this._dataHandlerPath = SViewRenderer.dataHandlers[extension].path;
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
            const viewRendererSettings = Object.assign(
                {},
                <ISViewRendererSettings>(
                    __deepMerge(this.viewRendererSettings, settings || {})
                ),
            );
            data = __deepMerge(viewRendererSettings.defaultData, data);

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
                viewRendererSettings.enginesSettings[engineObj.id] ?? {},
            );
            viewRendererSettings.enginesSettings = engineSettings;

            if (engineObj) {
                const renderFn = engineObj.render.bind(this);

                const renderPromise = renderFn(
                    this._viewPath,
                    data,
                    viewRendererSettings,
                );
                const result = await renderPromise;

                if (renderPromise.isRejected()) {
                    const resObj: Partial<ISViewRendererRenderResult> = {
                        view: SViewRenderer.getViewMetas(this._viewPath),
                        ...duration.end(),
                    };
                    return reject(resObj);
                }

                // resolve the render process
                const resObj: Partial<ISViewRendererRenderResult> = {
                    // engine: this._engineInstance.engineMetas,
                    view: SViewRenderer.getViewMetas(this._viewPath),
                    ...duration.end(),
                    value: result,
                };
                resolve(resObj);
            }
        });
    }
}

export default SViewRenderer;
