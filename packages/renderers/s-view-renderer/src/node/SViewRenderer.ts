import __SClass from '@coffeekraken/s-class';
import type { ISDurationObject } from '@coffeekraken/s-duration';
import __SDuration from '@coffeekraken/s-duration';
import type { ISFileObject } from '@coffeekraken/s-file';
// import __page404 from './pages/404';
import __SDataFileGeneric from '@coffeekraken/s-data-file-generic';
import type { ISPromise } from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __unique } from '@coffeekraken/sugar/array';
import { __writeJsonSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageTmpDir } from '@coffeekraken/sugar/path';
import { __uniqid } from '@coffeekraken/sugar/string';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __SViewRendererSettingsInterface from './interface/SViewRendererSettingsInterface';

/**
 * @name          SViewRenderer
 * @namespace     node
 * @type          Class
 * @extends       SClass
 * @platform        node
 * @status              beta
 *
 * This class represent a template that can be rendered using all the supported render engines listed in the features bellow.
 *
 * @feature       2.0.0         Support for ```bladePhp``` render engine
 * @feature       2.0.0         Support for ```twig``` render engine
 * @feature       2.0.0         Simply render your template using the ```render``` method that returns you back a nice SPromise instance resolved once the template has been rendered correctly
 *
 * @param       {String}        viewPath      The view doted file path relative to the ```rootDir``` setting, or directly a template string to render using the engine specify in ```engine``` setting...
 * @param       {Object}        [settings={}]           An object of settings to configure your template rendering process:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet          __SViewRenderer($1)
 * const viewRenderer = new __SViewRenderer($1);
 * const viewRendererResult = await viewRenderer.render($1, $2);
 *
 * @example       js
 * import __SViewRenderer from '@coffeekraken/s-view-renderer';
 * const myTemplate = new __SViewRenderer({
 *      rootDirs: ['/my/cool/folder/where/to/search/for/views']
 * });
 * const result = await myTemplate.render('my.view', {
 *    title: 'World'
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface ISViewRendererSettings {
    rootDirs: string[];
    cacheDir: string;
    defaultEngine: 'twig' | 'blade';
    enginesSettings?: any;
    dataFile?: boolean;
    sharedData?: any;
    sharedDataFiles?: string[];
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
    value?: string;
    error?: string;
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
        return __SSugarConfig.get('viewRenderer.rootDirs');
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
        settings: Partial<ISViewRendererSettings>,
    ) {
        return new Promise(async (resolve) => {
            const viewInstance = new SViewRenderer(__deepMerge(settings ?? {}));

            const finalData = __deepMerge(data ?? {}, {});

            const result = await viewInstance.render(
                viewPath,
                finalData,
                settings?.viewRenderer ?? {},
            );

            resolve(result);
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
     * @type        Object
     * @private
     *
     * Store the shared data coming from the viewRendererSettings.sharedData as well as the loaded sharedDataFiles
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private _sharedData: any;

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
    constructor(settings?: ISViewRendererSettings) {
        // save the settings
        super(
            __deepMerge(
                // @ts-ignore
                __SViewRendererSettingsInterface.defaults(),
                settings || {},
            ),
        );

        this.settings.rootDirs = (<any>this.constructor).getRootDirs(
            this.settings.rootDirs || [],
        );

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

        this._loaded = true;
    }

    /**
     * Try to get the render engine class from the finalViewPath.
     */
    _getRendererEngineClassFromFinalViewPath(finalViewPath: string): any {
        // try to get an engine for this view
        for (let i = 0; i < Object.keys(SViewRenderer.engines).length; i++) {
            const engineExt = Object.keys(SViewRenderer.engines)[i];
            const reg = new RegExp(`${engineExt}$`);
            if (reg.test(finalViewPath)) {
                // this._viewExt = engineExt;
                return SViewRenderer.engines[engineExt];
                break;
            }
        }
    }

    /**
     * Get the render engine class from the engine id
     */
    _getRendererEngineClassFromEngineId(engineId: string): any {
        // try to get an engine for this view
        for (let [ext, EngineClass] of Object.entries(SViewRenderer.engines)) {
            if (EngineClass.id === engineId) {
                return EngineClass;
            }
        }
    }

    _getFinalViewPath(viewDotPath: string): string {
        let finalViewPath: string;

        const handledViewsExtensions: string[] = Object.keys(
            SViewRenderer.engines,
        );

        // direct view path
        if (__fs.existsSync(viewDotPath)) {
            return viewDotPath;
        }

        // direct from the rootDirs
        for (let i = 0; i < this.settings.rootDirs.length; i++) {
            const rootDir = this.settings.rootDirs[i];
            if (__fs.existsSync(`${rootDir}/${viewDotPath}`)) {
                return `${rootDir}/${viewDotPath}`;
            }
        }

        // doted path
        for (let i = 0; i < this.settings.rootDirs.length; i++) {
            const rootDir = this.settings.rootDirs[i],
                viewName = viewDotPath.split('.').slice(-1)[0],
                viewPath = viewDotPath.replace(/\./gm, '/'),
                globPart = `@(${handledViewsExtensions.join('|')})`;

            const potentialViewGlob1 = `${rootDir}/${viewPath}.${globPart}`,
                potentialViewGlob2 = `${rootDir}/${viewPath}/${viewName}.${globPart}`;

            let potentialPath;
            let matches = __glob.sync(potentialViewGlob1);

            if (matches && matches.length) {
                for (let j = 0; j < matches.length; j++) {
                    potentialPath = matches[j];
                    // exclude .data files
                    if (potentialPath.match(/\.data\.[a-zA-Z0-9]+/)) {
                        continue;
                    }
                    if (__fs.existsSync(potentialPath)) {
                        finalViewPath = potentialPath;
                        break;
                    }
                }
            } else {
                // try to add the name of the view again like
                // if it is stored in a folder with the same name
                // retry again with new glob string
                matches = __glob.sync(potentialViewGlob2);
                if (matches && matches.length) {
                    for (let j = 0; j < matches.length; j++) {
                        potentialPath = matches[j];
                        // exclude .data files
                        if (potentialPath.match(/\.data\.[a-zA-Z0-9]+/)) {
                            continue;
                        }
                        if (__fs.existsSync(potentialPath)) {
                            finalViewPath = potentialPath;
                            break;
                        }
                    }
                }
            }

            // @ts-ignore
            if (finalViewPath) {
                break;
            }
        }

        // // remove all the engines extensions from the viewPath
        // Object.keys(SViewRenderer.engines).forEach((ext) => {
        //     viewDotPath = viewDotPath.replace(`.${ext}`, '');
        // });

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
            } else {
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
     * Load the shared data if exists
     */
    _needLoad = true;
    async _loadSharedData() {
        // quick and dirty thottle
        if (!this._needLoad) {
            return;
        }
        this._needLoad = false;
        setTimeout(() => {
            this._needLoad = true;
        }, 1000);

        // track the shared data
        let sharedData = this.settings.sharedData ?? {};

        // shared data
        if (this.settings.sharedDataFiles) {
            for (let i = 0; i < this.settings.sharedDataFiles.length; i++) {
                const dataFilePath = this.settings.sharedDataFiles[i];

                if (!__fs.existsSync(dataFilePath)) {
                    continue;
                }

                sharedData = __deepMerge(
                    sharedData,
                    await __SDataFileGeneric.load(dataFilePath),
                );
            }
        }

        // save the shared data
        this._sharedData = sharedData;

        // save the shared data on the disk
        __writeJsonSync(this._sharedDataFilePath, sharedData);
    }

    /**
     * @name          render
     * @type          Function
     * @async
     *
     * Main method to render your view by passing it an object of data to use as well as an object of settings to override the default passed onces
     *
     * @param       {String}        viewDotPath        The dotPath of the view you want to render
     * @param       {String|Object|Promise<Object>}        [data={}]       An object of data to use to render the view. If is a string, use the SDataGeneric class to resolve the data
     * @param       {Object}        [settings={}]     An object of settings that will be passed to the render engine method to use to override the default onces passed in the constructor. Check the used engine render documentation
     * @return      {SPromise}                    An SPromise instance that will be resolved once the rendering process has correctly finished
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    render(
        viewDotPath: string,
        data: string | Promise<any> | any = {},
        settings?: Partial<ISViewRendererSettings>,
    ): Promise<ISViewRendererRenderResult> {
        return new Promise(async (resolve, reject) => {
            let finalViewPath;

            // ensure all is loaded
            await this._load();

            // load shared data
            await this._loadSharedData();

            if (__fs.existsSync(viewDotPath)) {
                // absolute view path
                finalViewPath = viewDotPath;
                // add a rootDir to handle absolute path
                this.settings.rootDirs.unshift(__path.dirname(finalViewPath));
            }

            // ensure viewDotPath is a dotPath and not something line path/my/view.twig
            viewDotPath = viewDotPath
                .replace(/\.(twig|blade.php|hbs|php|tpl|volt)$/, '')
                .replace(/\//gm, '.');

            // get the final settings
            const viewRendererSettings: ISViewRendererSettings = {
                dataFile: false,
                ...__deepMerge(this.settings, settings ?? {}),
            };

            let RendererEngineClass,
                engine = viewRendererSettings.defaultEngine;

            if (viewDotPath.match(/^[a-z]+\:\/\//)) {
                const parts = viewDotPath.split('://');
                // @ts-ignore
                engine = parts[0];
                viewDotPath = parts[1];
            }

            // try to get the final view path
            if (!finalViewPath) {
                finalViewPath = this._getFinalViewPath(viewDotPath);
            }

            // make sure the view has been found
            if (!__fs.existsSync(finalViewPath)) {
                throw new Error(
                    `<red>[SViewRenderer]</red> Sorry but the requested view "<cyan>${viewDotPath}</cyan>" does not exists in any of these folders:\n${this.settings.rootDirs
                        .map((dir) => `- <cyan>${dir}</cyan>`)
                        .join('\n')}`,
                );
            }

            // get the view renderer engine class for the passed view
            // try to get the engine class from the final view part
            if (finalViewPath && !RendererEngineClass) {
                RendererEngineClass =
                    this._getRendererEngineClassFromFinalViewPath(
                        finalViewPath,
                    );
            }

            // if we don't have any RenderClass yet, get it from the passed engine of the default engine
            if (!RendererEngineClass) {
                RendererEngineClass =
                    this._getRendererEngineClassFromEngineId(engine);
            }

            if (!RendererEngineClass) {
                throw new Error(
                    `<red>[render]</red> No engine is registered for your dotPath "${viewDotPath}"...`,
                );
            }

            // use the generic data file class to load the data
            // if the passed data is a string
            if (typeof data === 'string') {
                data = await __SDataFileGeneric.load(data);
            } else {
                // resolve data if is a promise
                data = await data;
            }

            // load the .data.... view neighbour file
            data = __deepMerge(
                viewRendererSettings.dataFile
                    ? (await __SDataFileGeneric.load(finalViewPath)) ?? {}
                    : {},
                data ?? {},
            );

            const duration = new __SDuration();

            const engineSettings = __deepMerge(
                RendererEngineClass.interface?.defaults() ?? {},
                viewRendererSettings.enginesSettings[RendererEngineClass.id] ??
                    {},
            );

            let finalViewRelPath = finalViewPath;
            __unique([...viewRendererSettings.rootDirs]).forEach((path) => {
                finalViewRelPath = finalViewRelPath.replace(`${path}/`, '');
            });

            const rendererInstance = new RendererEngineClass(engineSettings);
            let renderPromise, result, error;

            renderPromise = rendererInstance.render({
                viewDotPath,
                viewPath: finalViewPath,
                viewRelPath: finalViewRelPath,
                data: Object.assign({}, data),
                sharedDataFilePath: this._sharedDataFilePath,
                viewRendererSettings,
            });
            result = await renderPromise;

            // stringify js errors
            if (result.error && result.error instanceof Error) {
                result.error = [
                    result.error.toString(),
                    ' ',
                    result.error.stack,
                ].join('\n');
            }

            // resolve the render process
            const resObj: Partial<ISViewRendererRenderResult> = {
                // engine: this._engineInstance.engineMetas,
                ...duration.end(),
                value: result.value,
                error: result.error,
            };

            resolve(resObj);
        });
    }
}

export default SViewRenderer;
