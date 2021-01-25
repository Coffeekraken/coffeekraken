"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSvelteCompilerParamsInterface = void 0;
const SInterface_1 = __importDefault(require("../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../config/sugar"));
const SCompiler_1 = __importDefault(require("../../compiler/SCompiler"));
const SSvelteFile_1 = __importDefault(require("../SSvelteFile"));
/**
 * @name                SSvelteCompilerParamsInterface
 * @namespace           sugar.node.svelte.compile.interface
 * @type                Class
 * @extends             SInterface
 * @wip
 *
 * This class represent the interface that describe parameters of the SSvelteCompiler
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSvelteCompilerParamsInterface extends SInterface_1.default {
}
exports.SSvelteCompilerParamsInterface = SSvelteCompilerParamsInterface;
SSvelteCompilerParamsInterface.definition = {
    input: {
        type: 'String|Array<String>',
        default: sugar_1.default('scss.compile.input'),
        alias: 'i'
    },
    outputDir: {
        type: 'String',
        default: sugar_1.default('scss.compile.outputDir'),
        alias: 'o'
    },
    rootDir: {
        type: 'String',
        default: sugar_1.default('scss.compile.rootDir')
    },
    save: {
        type: 'Boolean',
        default: false
    },
    watch: {
        type: 'Boolean',
        default: false
    },
    style: {
        type: 'String',
        alias: 's',
        description: 'Output style (nested,expanded,compact,compressed)',
        default: sugar_1.default('scss.compile.style') || 'expanded',
        level: 1
    },
    map: {
        type: 'Boolean',
        alias: 'm',
        description: 'Generate a sourcemap file',
        default: sugar_1.default('scss.compile.map') || true,
        level: 1
    },
    cache: {
        type: 'Boolean',
        default: sugar_1.default('scss.compile.cache')
    },
    clearCache: {
        type: 'Boolean',
        default: sugar_1.default('scss.compile.clearCache')
    },
    stripComments: {
        type: 'Boolean',
        default: sugar_1.default('scss.compile.stripComments')
    },
    minify: {
        type: 'Boolean',
        default: sugar_1.default('scss.compile.minify')
    },
    prod: {
        type: 'Boolean',
        default: sugar_1.default('scss.compile.prod')
    },
    sharedResources: {
        type: 'String|Array<String>',
        alias: 'r',
        description: 'Specify some files to load in every imported files using @use or @import',
        default: sugar_1.default('scss.compile.sharedResources'),
        level: 1
    },
    banner: {
        type: 'String',
        description: 'Specify a banner (usually a comment) that you want to put on top of your generated code',
        default: sugar_1.default('scss.compile.banner')
    },
    sass: {
        type: 'Object',
        description: 'Object passed to the sass compiler',
        default: sugar_1.default('scss.compile.sass') || {},
        level: 2
    }
};
class SSvelteCompiler extends SCompiler_1.default {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     *
     */
    constructor(initialParams, settings) {
        super(initialParams, __deepMerge({
            scssCompiler: {}
        }, settings || {}));
        // prod
        if (this.svelteCompilerSettings.prod) {
            this.svelteCompilerSettings.style = 'compressed';
            this.svelteCompilerSettings.minify = true;
            this.svelteCompilerSettings.stripComments = true;
        }
    }
    /**
     * @name              _compile
     * @type              Function
     * @async
     *
     * This method is the main one that allows you to actually compile the
     * code you pass either inline, either a file path.
     *
     * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
     * @param         {Object}            [settings={}]       An object of settings to override the instance ones
     * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
     *
     * @since             2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _compile(params, settings = {}) {
        return new __SPromise(({ resolve, reject, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
            settings = __deepMerge(this.svelteCompilerSettings, {}, settings);
            let input = Array.isArray(params.input) ? params.input : [params.input];
            const resultsObj = {};
            let filesPaths = [];
            // make input absolute
            input = __absolute(input);
            // process inputs
            input.forEach((inputStr) => {
                if (__isGlob(inputStr)) {
                    filesPaths = [...filesPaths, ...__glob.sync(inputStr)];
                }
                else {
                    filesPaths.push(inputStr);
                }
            });
            const startTime = Date.now();
            for (let i = 0; i < filesPaths.length; i++) {
                let filePath = filesPaths[i];
                let file = new SSvelteFile_1.default(filePath, {
                    svelteFile: {
                        compile: settings
                    }
                });
                pipe(file);
                const resPromise = file.compile(params, Object.assign({}, settings));
                const res = yield resPromise;
                resultsObj[file.path] = res;
            }
            // resolve with the compilation result
            if (!params.watch) {
                resolve({
                    files: resultsObj,
                    startTime: startTime,
                    endTime: Date.now(),
                    duration: Date.now() - startTime
                });
            }
            else {
                emit('files', {
                    files: resultsObj,
                    startTime: startTime,
                    endTime: Date.now(),
                    duration: Date.now() - startTime
                });
            }
        }));
    }
}
exports.default = SSvelteCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N2ZWx0ZUNvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw0RUFBc0Q7QUFDdEQsK0RBQStDO0FBQy9DLHlFQUFtRTtBQUNuRSxpRUFBMkM7QUFFM0M7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBYSw4QkFBK0IsU0FBUSxvQkFBWTs7QUFBaEUsd0VBK0VDO0FBOUVRLHlDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLHNCQUFzQjtRQUM1QixPQUFPLEVBQUUsZUFBYSxDQUFDLG9CQUFvQixDQUFDO1FBQzVDLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsd0JBQXdCLENBQUM7UUFDaEQsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGVBQWEsQ0FBQyxzQkFBc0IsQ0FBQztLQUMvQztJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsbURBQW1EO1FBQ2hFLE9BQU8sRUFBRSxlQUFhLENBQUMsb0JBQW9CLENBQUMsSUFBSSxVQUFVO1FBQzFELEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLDJCQUEyQjtR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