// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __fsPool from '@coffeekraken/sugar/node/fs/pool';
import __SCompiler from '@coffeekraken/s-compiler';
import __typescript from 'typescript';
import __SDuration from '@coffeekraken/s-duration';
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __removeSync from '@coffeekraken/sugar/node/fs/removeSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __rootDir from '@coffeekraken/sugar/node/path/rootDir';
import __availableColors from '@coffeekraken/sugar/shared/dev/color/availableColors';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __path from 'path';
import __STsCompilerParamsInterface from './interface/STsCompilerInterface';
import __childProcess from 'child_process';
/**
 * @name                STsCompiler
 * @namespace           sugar.node.typescript
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "typescript" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param         {Partial<ISTsCompilerParams>}      [initialParams={}]      Some parameters to use for your compilation process
 * @param           {ISTsCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      support for compiling single file or glob targeted files
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import STsCompiler from '@coffeekraken/sugar/node/scss/compile/STsCompiler';
 * const compiler = new STsCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.ts');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STsCompiler extends __SCompiler {
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
    constructor(initialParams, settings) {
        super(initialParams || {}, __deepMerge({
            tsCompiler: {}
        }, settings || {}));
        /**
         * @name              _compile
         * @type              Function
         * @async
         *
         * This method is the main one that allows you to actually compile the
         * code you pass either inline, either a file path.
         *
         * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
         * @param         {Object}            [settings={}]       An object of settings to override the instance ones
         * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
         *
         * @since             2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._currentlyHandledFiles = {};
    }
    /**
     * @name      tsCompilerSettings
     * @type      ISTsCompilerSettings
     * @get
     *
     * Access to the ts compiler settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get tsCompilerSettings() {
        return this._settings.tsCompiler;
    }
    _compile(params, settings) {
        return new __SPromise(({ resolve, reject, pipe, pipeFrom, emit, on }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            settings = __deepMerge(this.tsCompilerSettings, {}, settings || {});
            let input = Array.isArray(params.input) ? params.input : [params.input];
            let tsconfigFromConfigParam = {};
            const duration = new __SDuration();
            if (params.config && params.stack) {
                throw new Error(`<red>[${this.constructor.name}]</red> Sorry but you cannot use both "<yellow>config</yellow>" and "<yellow>stack</yellow>" parameters together. <yellow>stack</yellow> is to compile some preset input with preset settings, <yellow>config</yellow> is to simply specify which config you want to use to compile some custom input(s)`);
            }
            let stacks = undefined;
            if (params.stack) {
                if (!Array.isArray(params.stack))
                    stacks = [params.stack];
                else
                    stacks = params.stack;
            }
            // override input if needed
            if (stacks) {
                input = [];
                stacks.forEach((stackName) => {
                    if (__fs.existsSync(`${__rootDir()}/tsconfig.${stackName}.json`)) {
                        input.push(`${__rootDir()}/tsconfig.${stackName}.json`);
                    }
                    else if (__fs.existsSync(`${__rootDir()}/tsconfig.${stackName}.js`)) {
                        input.push(`${__rootDir()}/tsconfig.${stackName}.js`);
                    }
                    else if (__fs.existsSync(`${__sugarConfig('ts.tsconfigStacksDir')}/tsconfig.${stackName}.js`)) {
                        input.push(`${__sugarConfig('ts.tsconfigStacksDir')}/tsconfig.${stackName}.js`);
                    }
                    else {
                        throw new Error(`Sorry but the tsconfig.{stack}.js(on) "<yellow>${stackName}</yellow>" does not exists...`);
                    }
                });
            }
            if (params.config && typeof params.config === 'string') {
                let configPath;
                if (__fs.existsSync(`${__rootDir()}/tsconfig.${params.config}.json`)) {
                    configPath = `${__rootDir()}/tsconfig.${params.config}.json`;
                }
                else if (__fs.existsSync(`${__rootDir()}/tsconfig.${params.config}.js`)) {
                    configPath = `${__rootDir()}/tsconfig.${params.config}.js`;
                }
                else if (__fs.existsSync(`${__sugarConfig('ts.tsconfigStacksDir')}/tsconfig.${params.config}.js`)) {
                    configPath = `${__sugarConfig('ts.tsconfigStacksDir')}/tsconfig.${params.config}.js`;
                }
                if (!configPath) {
                    throw new Error(`Sorry but the passed "<yellow>${params.config}</yellow>" config parameter does not resolve to any valid tsconfig file...`);
                }
                else {
                    if (configPath.match(/\.js$/)) {
                        tsconfigFromConfigParam = require(configPath);
                    }
                    else {
                        const jsonFile = new __SFile(configPath);
                        tsconfigFromConfigParam = jsonFile.content;
                    }
                }
            }
            else if (__isPlainObject(params.config)) {
                tsconfigFromConfigParam = params.config;
            }
            delete tsconfigFromConfigParam.include;
            const colors = __availableColors();
            let areAllTsconfigInput = true;
            for (let i = 0; i < input.length; i++) {
                if (!input[i].match(/tsconfig\.[a-zA-Z0-9]+\.js(on)?$/)) {
                    areAllTsconfigInput = false;
                }
            }
            // clear
            if (params.clear && params.outDir) {
                emit('log', {
                    group: 's-ts-compiler',
                    value: `Clearing the outDir "<yellow>${params.outDir}</yellow>" before compilation`
                });
                const outDirPath = __path.resolve(params.rootDir || process.cwd(), params.outDir);
                __removeSync(outDirPath);
            }
            const poolStacks = {};
            if (!areAllTsconfigInput) {
                let tsconfig = {};
                // search for config
                const potentialRootPath = `${__packageRoot()}/tsconfig.json`;
                if (__fs.existsSync(potentialRootPath)) {
                    tsconfig = require(potentialRootPath);
                }
                else {
                    tsconfig = require(`${__dirname}/../templates/tsconfig.js`);
                }
                poolStacks.default = __deepMerge(Object.assign(Object.assign({}, tsconfig), { include: [...((_a = tsconfig.include) !== null && _a !== void 0 ? _a : []), ...input] }), tsconfigFromConfigParam);
            }
            else {
                input.forEach((tsConfigPath) => {
                    const configJson = require(tsConfigPath);
                    const stackNameMatch = tsConfigPath.match(/tsconfig\.([a-zA-Z0-9]+)\.js(on)?$/);
                    const stackName = stackNameMatch ? stackNameMatch[1] : 'default';
                    poolStacks[stackName] = configJson;
                });
            }
            Object.keys(poolStacks).forEach((stackName) => {
                const tsconfig = poolStacks[stackName];
                const pool = __fsPool(tsconfig.include, {
                    watch: true
                });
                // map
                if (params.map === false) {
                    delete tsconfig.compilerOptions.sourceMap;
                    delete tsconfig.compilerOptions.inlineSourceMap;
                }
                else if (params.map === true) {
                    tsconfig.compilerOptions.sourceMap = true;
                    delete tsconfig.compilerOptions.inlineSourceMap;
                }
                else if (params.map === 'inline') {
                    delete tsconfig.compilerOptions.sourceMap;
                    tsconfig.compilerOptions.inlineSourceMap = true;
                }
                pool.on(params.watch ? 'update' : 'files', (files, m) => __awaiter(this, void 0, void 0, function* () {
                    if (!Array.isArray(files))
                        files = [files];
                    const duration = new __SDuration();
                    const resultFiles = [];
                    files.forEach((file) => {
                        emit('log', {
                            group: 's-ts-compiler',
                            value: `<yellow>[compile]</yellow> File "<cyan>${file.relPath}</cyan>"`
                        });
                        let result = __typescript.transpileModule(file.content, tsconfig);
                        if (!params.watch) {
                            resultFiles.push({
                                path: file.path,
                                relPath: file.relPath,
                                js: result.outputText,
                                map: result.sourceMapText
                            });
                        }
                        if (params.save) {
                            let outPath;
                            if (params.outDir) {
                                outPath = __path
                                    .resolve(`${params.outDir}`, __path.relative(params.inDir, file.path))
                                    .replace(/\.ts(x)?$/, '.js');
                            }
                            else {
                                outPath = file.path.replace(/\.ts(x)?$/, '.js');
                            }
                            emit('log', {
                                group: 's-ts-compiler',
                                value: `<green>[save]</green> File "<cyan>${file.relPath}</cyan>" under "<magenta>${__path.relative(__packageRoot(), outPath)}</magenta>"`
                            });
                            __writeFileSync(outPath, result.outputText);
                            if (result.sourceMapText) {
                                emit('log', {
                                    group: 's-ts-compiler',
                                    value: `<green>[save]</green> Map "<cyan>${file.relPath}</cyan>" under "<magenta>${__path.relative(__packageRoot(), outPath)}.map</magenta>"`
                                });
                                __writeFileSync(`${outPath}.map`, result.sourceMapText);
                            }
                        }
                    });
                    if (!params.watch) {
                        emit('log', {
                            group: 's-ts-compiler',
                            value: `<yellow>${files.length}</yellow> File${files.length > 1 ? 's' : ''} compiled`
                        });
                        emit('log', {
                            group: 's-ts-compiler',
                            value: `Compilation <green>successfull</green> in <yellow>${duration.end().formatedDuration}</yellow>`
                        });
                        resolve(Object.assign({ files: resultFiles }, duration.end()));
                    }
                }));
            });
            emit('log', {
                group: 's-ts-compiler',
                value: 'Starting <cyan>TS</cyan> file(s) compilation process...'
            });
            if (params.watch) {
                emit('log', {
                    group: 's-ts-compiler',
                    value: `<blue>[watch]</blue> Watching for changes...`
                });
            }
        }), {
            eventEmitter: {
                bind: this
            },
            metas: this.metas
        });
    }
    _handleCompiledFile(file, tsconfig, params, emit) {
        if (!file)
            return;
        if (typeof file === 'string') {
            file = new __SFile(file, {
                file: tsconfig.compilerOptions.rootDir
            });
        }
        const relPath = __path.relative(tsconfig.compilerOptions.outDir, file.path);
        const inPath = __path.resolve(tsconfig.compilerOptions.outDir, relPath);
        let outPath = __path.resolve(tsconfig.compilerOptions.rootDir, relPath);
        if (tsconfig.sTsCompiler && tsconfig.sTsCompiler.outExt) {
            outPath = outPath.replace(/\.[a-zA-Z0-9]+$/, `.${tsconfig.sTsCompiler.outExt}`);
        }
        if (emit) {
            emit('log', {
                group: 's-ts-compiler',
                // temp: true,
                value: `<yellow>[compile]</yellow> Compiling file "<cyan>${__path.relative(tsconfig.compilerOptions.outDir, file.path)}</cyan>"`
            });
        }
        let finalFile;
        if (outPath.match(/\.ts(x)?$/) && __fs.existsSync(outPath)) {
            if (emit) {
                emit('log', {
                    group: 's-ts-compiler',
                    value: `<yellow>[warning]</yellow> The output destination of the compiled file "<cyan>${outPath}</cyan>" is the same as the source file and override it... This file is not saved then.`
                });
            }
            return;
        }
        else {
            try {
                if (params.save) {
                    __fs.renameSync(inPath, outPath);
                    if (outPath.match(/\.cli\.js$/) && emit) {
                        emit('log', {
                            group: 's-ts-compiler',
                            temp: true,
                            value: `<yellow>[compile]</yellow> Adding execution permission to file "<cyan>${__path.relative(tsconfig.compilerOptions.outDir, file.path)}</cyan>"`
                        });
                        __childProcess.execSync(`chmod +x ${outPath}`);
                    }
                    finalFile = __SFile.new(outPath);
                }
                else {
                    finalFile = __SFile.new(inPath);
                }
            }
            catch (e) {
                return;
            }
        }
        return finalFile.toObject();
    }
    /**
     * @name        getStack
     * @type        Function
     *
     * Check if the passed string is the name of a defined stack or not
     *
     * @param     {String}      stack       The stack to check
     * @return    {Object}                 The stack object defined in the configuration
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    getStack(stack) {
        const definedStacks = __sugarConfig('ts.stacks');
        if (!definedStacks)
            return false;
        if (!definedStacks[stack])
            return false;
        return definedStacks[stack];
    }
}
STsCompiler.interfaces = {
    params: {
        apply: false,
        class: __STsCompilerParamsInterface
    }
};
export default STsCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxRQUFRLE1BQU0sa0NBQWtDLENBQUM7QUFDeEQsT0FBTyxXQUdOLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxZQUVOLE1BQU0sWUFBWSxDQUFDO0FBRXBCLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBSXpELE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBRWxFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sU0FBUyxNQUFNLHVDQUF1QyxDQUFDO0FBSzlELE9BQU8saUJBQWlCLE1BQU0sc0RBQXNELENBQUM7QUFDckYsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLDRCQUE0QixNQUFNLGtDQUFrQyxDQUFDO0FBRTVFLE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQTZCM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxXQUFZLFNBQVEsV0FBVztJQXNCbkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUEyQyxFQUMzQyxRQUFtQztRQUVuQyxLQUFLLENBQ0gsYUFBYSxJQUFJLEVBQUUsRUFDbkIsV0FBVyxDQUNUO1lBQ0UsVUFBVSxFQUFFLEVBQUU7U0FDZixFQUNE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