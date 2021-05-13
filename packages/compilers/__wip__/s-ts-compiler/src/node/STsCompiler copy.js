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
import __SCompiler from '@coffeekraken/s-compiler';
import __typescript from 'typescript';
import __SDuration from '@coffeekraken/s-duration';
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __removeSync from '@coffeekraken/sugar/node/fs/removeSync';
import __rootDir from '@coffeekraken/sugar/node/path/rootDir';
import __tmpDir from '@coffeekraken/sugar/node/path/tmpDir';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __availableColors from '@coffeekraken/sugar/shared/dev/color/availableColors';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
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
            settings = __deepMerge(this.tsCompilerSettings, {}, settings || {});
            let input = Array.isArray(params.input) ? params.input : [params.input];
            let config;
            const duration = new __SDuration();
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
                        config = require(configPath);
                    }
                    else {
                        const jsonFile = new __SFile(configPath);
                        config = jsonFile.content;
                    }
                }
            }
            else if (__isPlainObject(params.config)) {
                config = params.config;
            }
            const colors = __availableColors();
            // clear
            if (params.clear && params.outDir) {
                emit('log', {
                    group: 's-ts-compiler',
                    value: `Clearing the outDir "<yellow>${params.outDir}</yellow>" before compilation`
                });
                const outDirPath = __path.resolve(params.rootDir || process.cwd(), params.outDir);
                __removeSync(outDirPath);
            }
            // loop on inputs
            input.forEach((inputPath, i) => __awaiter(this, void 0, void 0, function* () {
                let tsconfigJson = {}, inputPathToDisplay, inputPathHash = __md5.encrypt(inputPath);
                const isTsConfigInput = inputPath.match(/.*\/tsconfig(\..*)?\.js(on)?$/);
                if (!isTsConfigInput && inputPath.match(/\.tsx?$/)) {
                    if (!config) {
                        throw new Error(`Sorry but to compile the passed "<cyan>${inputPath}</cyan>" input, you MUST specify a valid config to use like "js", "node", "shared", or a full tsconfig file path`);
                    }
                    inputPathToDisplay = __getFilename(inputPath);
                    tsconfigJson = config;
                }
                else if (isTsConfigInput) {
                    inputPathToDisplay = __getFilename(inputPath).replace(/\.js(on)?$/, '');
                    if (inputPath.match(/\.js$/)) {
                        tsconfigJson = require(inputPath);
                    }
                    else {
                        const jsonFile = new __SFile(inputPath);
                        tsconfigJson = jsonFile.content;
                    }
                }
                else {
                    throw new Error('Sorry but the input "<yellow>${input}</yellow> seems to be invalid...');
                }
                // extends
                if (tsconfigJson.extends) {
                    const extendsPath = __path.resolve(__folderPath(inputPath), tsconfigJson.extends);
                    let extendsJson = {};
                    // reading the file
                    if (extendsPath.match(/\.json$/)) {
                        const extendsFile = new __SFile(extendsPath);
                        extendsJson = extendsFile.content;
                    }
                    else if (extendsPath.match(/\.js$/)) {
                        extendsJson = require(extendsPath);
                    }
                    else {
                        emit('warn', {
                            value: `<bg${__upperFirst(this.metas.color)}><black> ${this.metas.id} </black></bg${__upperFirst(this.metas.color)}> THe tsconfig file "<cyan>${inputPath}</cyan>" extends property "<yellow>${tsconfigJson.extends}</yellow>" seems to be incorrect...`
                        });
                    }
                    delete tsconfigJson.extends;
                    // extends the config
                    tsconfigJson = __deepMerge(extendsJson, tsconfigJson);
                }
                // include (only for non tsconfig input)
                if (!isTsConfigInput) {
                    tsconfigJson.include = [inputPath];
                }
                else {
                    if (!tsconfigJson.include && tsconfigJson._include) {
                        tsconfigJson.include = tsconfigJson._include;
                    }
                }
                delete tsconfigJson._include;
                // make sure includes are absolute
                if (tsconfigJson.include) {
                    tsconfigJson.include = tsconfigJson.include.map((path) => {
                        if (__path.isAbsolute(path))
                            return path;
                        if (isTsConfigInput) {
                            return __path.resolve(__folderPath(inputPath), path);
                        }
                        else {
                            return __path.resolve(path);
                        }
                    });
                }
                // exclude
                if (!tsconfigJson.exclude && tsconfigJson._exclude) {
                    tsconfigJson.exclude = tsconfigJson._exclude;
                }
                delete tsconfigJson._exclude;
                // rootDir
                if (params.rootDir) {
                    if (!__path.isAbsolute(params.rootDir)) {
                        throw new Error(`Sorry but the parameter "<yellow>rootDir</yellow>" MUST be an absolute path. You've passed "<cyan>${params.rootDir}</cyan>"`);
                    }
                    tsconfigJson.compilerOptions.rootDir = params.rootDir;
                }
                // outDir
                if (params.outDir) {
                    tsconfigJson.compilerOptions.outDir = __path.resolve(params.rootDir || process.cwd(), params.outDir);
                    delete tsconfigJson.compilerOptions.rootDir;
                }
                // compilerOptions
                if (!tsconfigJson.compilerOptions)
                    tsconfigJson.compilerOptions = {};
                if (params.compilerOptions) {
                    tsconfigJson.compilerOptions = __deepMerge(tsconfigJson.compilerOptions || {}, params.compilerOptions);
                }
                // map
                if (params.map === false) {
                    delete tsconfigJson.compilerOptions.sourceMap;
                    delete tsconfigJson.compilerOptions.inlineSourceMap;
                }
                else if (params.map === true) {
                    tsconfigJson.compilerOptions.sourceMap = true;
                    delete tsconfigJson.compilerOptions.inlineSourceMap;
                }
                else if (params.map === 'inline') {
                    delete tsconfigJson.compilerOptions.sourceMap;
                    tsconfigJson.compilerOptions.inlineSourceMap = true;
                }
                tsconfigJson.compilerOptions.outDir = `${__tmpDir()}/STsCompiler/${Date.now()}-${inputPathHash}`;
                const tmpConfigPath = `${__tmpDir()}/STsCompiler/${__getFilename(inputPath)}.${__md5.encrypt(inputPath)}.json`;
                // writing the tsconfig file
                __ensureDirSync(__folderPath(tmpConfigPath));
                __fs.writeFileSync(tmpConfigPath, JSON.stringify(tsconfigJson, null, 4));
                // // build command line
                // const commandLineArray: string[] = [];
                // commandLineArray.push(`-p ${tmpConfigPath}`);
                // if (params.watch) commandLineArray.push('--watch');
                // setup resultObj
                const resultObj = {
                    tsconfig: tsconfigJson,
                    params
                };
                const compiledFilesByPath = {};
                let result = __typescript.transpileModule(source, tsconfigJson);
                try {
                    // const pro = __spawn(
                    //   `tsc ${commandLineArray.join(' ')} --listEmittedFiles`,
                    //   [],
                    //   {
                    //     cwd: params.rootDir || process.cwd()
                    //   }
                    // );
                    // pipeFrom(pro, {
                    //   processor: (value, metas) => {
                    //     let txtValue;
                    //     if (value.value && typeof value.value === 'string')
                    //       txtValue = value.value;
                    //     else if (typeof value === 'string') txtValue = value;
                    //     if (txtValue) {
                    //       txtValue = txtValue.replace(
                    //         /[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}\s[AP]M\s-\s/,
                    //         ''
                    //       );
                    //     }
                    //     if (
                    //       txtValue &&
                    //       txtValue.match(/No inputs were found in config file/g)
                    //     ) {
                    //       if (value.value) value.value = `No file found...`;
                    //       else value = 'No file found...';
                    //     } else if (txtValue) {
                    //       if (value.value) value.value = txtValue;
                    //       else value = txtValue;
                    //     }
                    //     return [value, metas];
                    //   },
                    //   filter: (value, metas) => {
                    //     console.log('CCC', metas.event, value);
                    //     if (
                    //       value &&
                    //       value.value &&
                    //       typeof value.value === 'string' &&
                    //       value.value.match(/TSFILE:\s.*/)
                    //     ) {
                    //       const filesPaths = value.value
                    //         .split('TSFILE:')
                    //         .map((f) => f.trim());
                    //       filesPaths.forEach((filePath) => {
                    //         const outFile = this._handleCompiledFile(
                    //           filePath,
                    //           tsconfigJson,
                    //           params,
                    //           pro.emit
                    //         );
                    //         if (outFile && !compiledFilesByPath[filePath]) {
                    //           compiledFilesByPath[filePath] = outFile;
                    //         }
                    //       });
                    //       return false;
                    //     }
                    //     if (!metas.event.match(/^close/)) return true;
                    //     if (
                    //       value.stdout &&
                    //       value.stdout
                    //         .join(' ')
                    //         .match(/No inputs were found in config file/g)
                    //     )
                    //       return false;
                    //     return true;
                    //   },
                    //   stripAnsi: true,
                    //   prefixValue: `<${
                    //     colors[i] || 'yellow'
                    //   }>[${inputPathToDisplay}]</${colors[i] || 'yellow'}> `
                    // });
                    // pro.on('close', async (value) => {
                    //   if (value.code === 0) {
                    //     resultObj.files = [];
                    //     Object.keys(compiledFilesByPath).forEach((filePath) => {
                    //       if (!filePath) return;
                    //       const file = compiledFilesByPath[filePath];
                    //       resultObj.files.push(file);
                    //     });
                    //     pro.emit('log', {
                    //       value: `<yellow>${resultObj.files.length}</yellow> File${
                    //         resultObj.files.length > 1 ? 's' : ''
                    //       } compiled`
                    //     });
                    //     pro.emit('log', {
                    //       value: `Compilation <green>successfull</green> in <yellow>${value.formatedDuration}</yellow>`
                    //     });
                    //     // resolve the promise
                    //     resolve({
                    //       ...resultObj,
                    //       ...duration.end()
                    //     });
                    //   } else {
                    //     // reject the promise
                    //     reject({
                    //       ...resultObj,
                    //       error: value.stderr.join('\n'),
                    //       ...duration.end()
                    //     });
                    //   }
                    //   // pool.cancel();
                    //   __onProcessExit(() => {
                    //     // delete the temp directory if needed
                    //     __removeSync(tsconfigJson.compilerOptions.outDir);
                    //     // delete the config file
                    //     __removeSync(tmpConfigPath);
                    //   });
                    // });
                    pro.emit('log', {
                        group: 's-ts-compiler',
                        value: `Starting compilation process`
                    });
                }
                catch (e) {
                    // pool.cancel();
                    // delete the temp directory if needed
                    __removeSync(tsconfigJson.compilerOptions.outDir);
                    // delete the config file
                    __removeSync(tmpConfigPath);
                    reject(Object.assign(Object.assign(Object.assign({}, resultObj), { error: e }), duration.end()));
                }
                // });
            }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXIgY29weS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNUc0NvbXBpbGVyIGNvcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUdkLE9BQU8sV0FHTixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sWUFBWSxNQUFNLFlBQVksQ0FBQztBQUV0QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLGFBQWEsTUFBTSxzQ0FBc0MsQ0FBQztBQUNqRSxPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUdsRSxPQUFPLFNBQVMsTUFBTSx1Q0FBdUMsQ0FBQztBQUU5RCxPQUFPLFFBQVEsTUFBTSxzQ0FBc0MsQ0FBQztBQUU1RCxPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RCxPQUFPLGlCQUFpQixNQUFNLHNEQUFzRCxDQUFDO0FBQ3JGLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyw0QkFBNEIsTUFBTSxrQ0FBa0MsQ0FBQztBQUU1RSxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUE2QjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sV0FBWSxTQUFRLFdBQVc7SUFzQm5DOzs7Ozs7Ozs7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