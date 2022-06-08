import __SClass from '@coffeekraken/s-class';
import type { ISDurationObject } from '@coffeekraken/s-duration';
import __SDuration from '@coffeekraken/s-duration';
import type { ISFileObject } from '@coffeekraken/s-file';
import __SFile from '@coffeekraken/s-file';
// import __page404 from './pages/404';
import type { ISPromise } from '@coffeekraken/s-promise';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __extension from '@coffeekraken/sugar/node/fs/extension';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __SViewRendererSettingsInterface from './interface/SViewRendererSettingsInterface';
import __packageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';

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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface ISViewRendererSettings {
    rootDirs: string[];
    cacheDir: string;
    enginesSettings?: any;
    sharedData?: any;
    sharedDataFiles?: string[];
    sharedJsonDataFiles?: string[];
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
     * @name       engines
     * @type      Object
     * @static
     *
     * Store the registered engines using the ```registerEngine``` static method
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static engines = {};

    /**
     * @name       dataFiles
     * @type      Object
     * @static
     *
     * Store the registered dataFiles using the ```registerDataFiles``` static method
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static dataFiles = {};

    /**
     * @name      defaultRootDirs
     * @type      Array
     * @static
     *
     * This static property store the default root directories where the class
     * will search for views to render
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get defaultRootDirs(): string[] {
        return [
            ...__SSugarConfig.get('viewRenderer.rootDirs'),
            // @ts-ignore
            __path.resolve(__packageRoot(__dirname()), 'src/php/views/blade'),
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
        return new __SPromise(async ({ resolve, reject, pipe }) => {
            const viewInstance = new SViewRenderer(
                __deepMerge(
                    {
                        viewRenderer: {},
                    },
                    settings ?? {},
                ),
            );

            let resPromise;

            console.log('WWW', viewPath);

            resPromise = await viewInstance.render(
                viewPath,
                data,
                settings?.viewRenderer ?? {},
            );

            console.log('rr', resPromise);
            pipe(resPromise);

            // resPromise.catch(async (e) => {
            //     console.log('SOMEHTING', 'va');

            //     const errorViewInstance = new SViewRenderer({
            //         ...settings,
            //     });

            //     console.log('ERROR', e);

            //     const errorRes = await pipe(
            //         errorViewInstance.render(
            //             'pages.501',
            //             {
            //                 ...data,
            //                 error: e,
            //             },
            //             settings?.viewRenderer ?? {},
            //         ),
            //     );
            //     errorRes.status = 501;
            //     console.log('E', errorRes);
            //     reject(errorRes);
            // });

            // resPromise.then((res) => {
            //     res.status = 200;
            //     console.log('RES', res);
            //     resolve(res);
            // });
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
     * @param       {Class}        EngineClass      The class of the engine
     * @param       {String}        extension       The file extension to detect the engine. For example "blade.php" will be used to render all the files names "%name.blade.php"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerEngine(
        EngineClass: string,
        extensions?: string | string[],
    ): void {
        // register the engine under each names
        const exts = Array.isArray(extensions)
            ? extensions
            : extensions?.split(',').map((l) => l.trim());
        exts?.forEach((ext) => {
            if (SViewRenderer.engines[ext]) return;

            // register the engine in the stack
            SViewRenderer.engines[ext] = EngineClass;
        });
    }

    /**
     * @name      registerDataFiles
     * @type      Function
     * @static
     *
     * This static method can be used to register some SDataFiles classes
     *
     * @param       {Class}        DataFileClass      The data file class
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerDataFiles(
        DataFileClass: string,
        extensions: string | string[],
    ): void {
        // register the engine under each names
        const exts = Array.isArray(extensions)
            ? extensions
            : extensions.split(',').map((l) => l.trim());
        exts.forEach((extension) => {
            if (SViewRenderer.dataFiles[extension]) return;
            // register the engine in the stack
            SViewRenderer.dataFiles[extension] = DataFileClass;
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
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                for (
                    let i = 0;
                    i < Object.keys(SViewRenderer.engines).length;
                    i++
                ) {
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
     * @name        _sharedDataFilePath
     * @type        String
     * @private
     *
     * Store the shared data file path if some are specified
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private _sharedDataFilePath: string;

    /**
     * @name        _sharedData
     * @type        String
     * @private
     *
     * Store the shared data coming from the viewRendererSettings.sharedData as well as the loaded sharedDataFiles
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private _sharedData: any;

    /**
     * @name      viewRendererSettings
     * @type      ISViewRendererSettings
     * @get
     *
     * Access the template settings
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get viewRendererSettings(): ISViewRendererSettings {
        return (<any>this).settings.viewRenderer;
    }

    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: ISViewCtorSettings) {
        // save the settings
        super(
            __deepMerge(
                {
                    // @ts-ignore
                    viewRenderer: __SViewRendererSettingsInterface.defaults(),
                },
                settings || {},
            ),
        );

        this.viewRendererSettings.rootDirs = (<any>(
            this.constructor
        )).getRootDirs(this.viewRendererSettings.rootDirs || []);

        // create a shared data file path to store shared data
        this._sharedDataFilePath = `${__packageTmpDir()}/viewRenderer/sharedData-${__uniqid()}.json`;
    }

    _loaded = false;
    async _load() {
        if (this._loaded) return;
        const defaultEngines = __SSugarConfig.get('viewRenderer.engines') || [];
        for (let i = 0; i < defaultEngines.length; i++) {
            const path = defaultEngines[i];
            // @ts-ignore
            const { default: EngineClass } = await import(path);
            EngineClass.extensions.forEach((ext) => {
                SViewRenderer.registerEngine(EngineClass, ext);
            });
        }

        const defaultDataHandlers =
            __SSugarConfig.get('viewRenderer.dataFiles') || [];
        for (let i = 0; i < defaultDataHandlers.length; i++) {
            const path = defaultDataHandlers[i];
            // @ts-ignore
            const { default: DataFileClass } = await import(path);
            DataFileClass.extensions.forEach((ext) => {
                SViewRenderer.registerDataFiles(DataFileClass, ext);
            });
        }

        // track the shared data
        let sharedData = this.viewRendererSettings.sharedData ?? {};

        // shared data
        if (this.viewRendererSettings.sharedDataFiles) {
            for (
                let i = 0;
                i < this.viewRendererSettings.sharedDataFiles.length;
                i++
            ) {
                const dataFilePath = this.viewRendererSettings.sharedDataFiles[
                    i
                ];
                const extension = __extension(dataFilePath);
                if (!SViewRenderer.dataFiles[extension]) {
                    throw new Error(
                        `<red>[render]</red> The extension "${extension}" is not registered as a data file handler`,
                    );
                }
                const sharedDataFiles = await SViewRenderer.dataFiles[
                    extension
                ].load(dataFilePath);
                if (sharedDataFiles) {
                    sharedData = __deepMerge(sharedData, sharedDataFiles);
                }
            }
        }

        // save the shared data
        this._sharedData = sharedData;

        // save the shared data on the disk
        __writeJsonSync(this._sharedDataFilePath, sharedData);

        this._loaded = true;
    }

    _getRendererEngineClassForView(viewPath: string): any {
        // try to get an engine for this view
        for (let i = 0; i < Object.keys(SViewRenderer.engines).length; i++) {
            const engineExt = Object.keys(SViewRenderer.engines)[i];
            const reg = new RegExp(`${engineExt}$`);
            if (reg.test(viewPath)) {
                // this._viewExt = engineExt;
                return SViewRenderer.engines[engineExt];
                break;
            }
        }
    }

    _getDataFileClassForView(viewPathWithoutExtension: string): any {
        // loop on each dataFiles available
        for (let i = 0; i < Object.keys(SViewRenderer.dataFiles).length; i++) {
            const extension = Object.keys(SViewRenderer.dataFiles)[i];
            if (
                __fs.existsSync(`${viewPathWithoutExtension}.data.${extension}`)
            ) {
                return {
                    dataFilePath: `${viewPathWithoutExtension}.data.${extension}`,
                    DataFileClass: SViewRenderer.dataFiles[extension],
                };
            }
        }
    }

    _getFinalViewPath(viewDotPath: string): string {
        let finalViewPath: string;

        // remove all the engines extensions from the viewPath
        Object.keys(SViewRenderer.engines).forEach((ext) => {
            viewDotPath = viewDotPath.replace(`.${ext}`, '');
        });

        // detect and save the view doted path or the view template string
        if (
            viewDotPath.split(' ').length === 1 &&
            viewDotPath.trim() === viewDotPath
        ) {
            // check if we can find the view path passed
            if (__path.isAbsolute(viewDotPath)) {
                if (__fs.existsSync(viewDotPath)) {
                    // throw new Error(
                    //   `Sorry but the absolute path to the view "<cyan>${viewDotPath}</cyan>" does not exist...`
                    // );
                    finalViewPath = viewDotPath;
                }
            } else if (!viewDotPath.match(/\//gm)) {
                // doted path
                for (
                    let i = 0;
                    i < this.viewRendererSettings.rootDirs.length;
                    i++
                ) {
                    const rootDir = this.viewRendererSettings.rootDirs[i];
                    const potentialViewPath = `${rootDir}/${viewDotPath
                        .split('.')
                        .join('/')}.!(data)*`;
                    const matches = __glob.sync(potentialViewPath);
                    if (matches && matches.length) {
                        finalViewPath = matches[0];
                        break;
                    }
                }
            }
        } else {
            // throw new Error(
            //   `<red>[SView]</red> It seems that the passed viewPath "<yellow>${viewPath}</yellow>" argument is not a valid path`
            // );
        }

        // @ts-ignore
        return finalViewPath;
    }

    /**
     * @name          render
     * @type          Function
     * @async
     *
     * Main method to render your view by passing it an object of data to use as well as an object of settings to override the default passed onces
     *
     * @param       {String}        viewDotPath        The dotPath of the view you want to render
     * @param       {Object}        [data={}]       An object of data to use to render the view.
     * @param       {Object}        [settings={}]     An object of settings that will be passed to the render engine method to use to override the default onces passed in the constructor. Check the used engine render documentation
     * @return      {SPromise}                    An SPromise instance that will be resolved once the rendering process has correctly finished
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    render(
        viewDotPath: string,
        data = {},
        settings?: Partial<ISViewRendererSettings>,
    ): Promise<ISViewRendererRenderResult> {
        return new __SPromise(async ({ resolve, reject, pipe }) => {
            // ensure all is loaded
            await this._load();

            // get the final view path
            const finalViewPath = this._getFinalViewPath(viewDotPath);
            if (!finalViewPath) {
                throw new Error(
                    `<red>[render]</red> The passed viewDotPath "${viewDotPath}" does not exists...`,
                );
            }

            // get the view renderer engine class for the passed view
            const RendererEngineClass = this._getRendererEngineClassForView(
                finalViewPath,
            );
            if (!RendererEngineClass) {
                throw new Error(
                    `<red>[render]</red> No engine is registered for your dotPath "${viewDotPath}"...`,
                );
            }

            // data file class and path
            const dataFileClassAndPath = this._getDataFileClassForView(
                finalViewPath.replace(`.${__path.extname(finalViewPath)}`, ''),
            );

            const viewRendererSettings = Object.assign(
                {},
                <ISViewRendererSettings>(
                    __deepMerge(this.viewRendererSettings, settings || {})
                ),
            );

            const duration = new __SDuration();

            if (dataFileClassAndPath) {
                const gettedData = await dataFileClassAndPath.DataFileClass.load(
                    dataFileClassAndPath.dataFilePath,
                );
                if (gettedData) data = __deepMerge(gettedData, data);
            }

            const engineSettings = __deepMerge(
                RendererEngineClass.interface?.defaults() ?? {},
                viewRendererSettings.enginesSettings[RendererEngineClass.id] ??
                    {},
            );

            const rendererInstance = new RendererEngineClass(engineSettings);

            let renderPromise, result, error;

            renderPromise = rendererInstance.render(
                finalViewPath,
                Object.assign({}, data),
                this._sharedDataFilePath,
                viewRendererSettings,
            );
            pipe(renderPromise);
            result = await renderPromise;

            // resolve the render process
            const resObj: Partial<ISViewRendererRenderResult> = {
                // engine: this._engineInstance.engineMetas,
                view: SViewRenderer.getViewMetas(finalViewPath),
                ...duration.end(),
                value: result.value,
                error: result.error,
            };
            resolve(resObj);
        });
    }
}

export default SViewRenderer;
