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
var _a;
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
const SActionsStreamAction_1 = __importDefault(require("../../../stream/SActionsStreamAction"));
const SBuildJsInterface_1 = __importDefault(require("../interface/SBuildJsInterface"));
const SJsCompiler_1 = __importDefault(require("../../SJsCompiler"));
module.exports = (_a = class SCompileJsStreamAction extends SActionsStreamAction_1.default {
        /**
         * @name            constructor
         * @type            Function
         * @constructor
         *
         * Constructor
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
            super(deepMerge_1.default({
                id: 'SCompileJsStreamAction'
            }, settings));
        }
        /**
         * @name          run
         * @type          Function
         * @async
         *
         * Override the base class run method
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        run(streamObj, settings) {
            return super.run(streamObj, ({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
                const compiler = new SJsCompiler_1.default(streamObj);
                const compileRes = yield compiler.compile(streamObj.input);
                // otherwise, save the new data in the streamObj
                streamObj.data = compileRes.js;
                // set the map if has been generated
                if (compileRes.map)
                    streamObj.sourcemapData = compileRes.map;
                // resolve the new streamObj
                resolve(streamObj);
            }));
        }
    },
    /**
     * @name            interface
     * @type             Object
     * @static
     *
     * Store the definition object that specify the streamObj required properties, types, etc...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.interfaces = {
        this: SBuildJsInterface_1.default.extends({
            definition: {}
        })
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBpbGVKc1N0cmVhbUFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb21waWxlSnNTdHJlYW1BY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsMEVBQW9EO0FBQ3BELGdHQUEwRTtBQUMxRSx1RkFBaUU7QUFDakUsb0VBQThDO0FBcUI5Qyx1QkFBUyxNQUFNLHNCQUF1QixTQUFRLDhCQUFzQjtRQWdCbEU7Ozs7Ozs7O1dBUUc7UUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1lBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLEVBQUUsRUFBRSx3QkFBd0I7YUFDN0IsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBQ0osQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0gsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRO1lBQ3JCLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO2dCQUN4RCxNQUFNLFFBQVEsR0FBRyxJQUFJLHFCQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzlDLE1BQU0sVUFBVSxHQUFHLE1BQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRTNELGdEQUFnRDtnQkFDaEQsU0FBUyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUUvQixvQ0FBb0M7Z0JBQ3BDLElBQUksVUFBVSxDQUFDLEdBQUc7b0JBQUUsU0FBUyxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDO2dCQUU3RCw0QkFBNEI7Z0JBQzVCLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGO0lBM0RDOzs7Ozs7OztPQVFHO0lBQ0ksYUFBVSxHQUFHO1FBQ2xCLElBQUksRUFBRSwyQkFBbUIsQ0FBQyxPQUFPLENBQUM7WUFDaEMsVUFBVSxFQUFFLEVBQUU7U0FDZixDQUFDO0tBQ0Y7UUE4Q0YifQ==