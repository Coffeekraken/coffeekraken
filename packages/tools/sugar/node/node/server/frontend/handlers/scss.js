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
const s_promise_1 = __importDefault(require("../@coffeekraken/s-promise"));
const SScssCompiler_1 = __importDefault(require("../../../scss/compile/SScssCompiler"));
const SDuration_1 = __importDefault(require("../../../time/SDuration"));
const SScssCompilerParamsInterface_1 = __importDefault(require("../../../scss/compile/interface/SScssCompilerParamsInterface"));
/**
 * @name                scss
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the home page
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function scss(req, res, settings = {}) {
    const promise = new s_promise_1.default();
    (() => __awaiter(this, void 0, void 0, function* () {
        const defaultValuesObj = SScssCompilerParamsInterface_1.default.defaults();
        const compiler = new SScssCompiler_1.default(defaultValuesObj);
        const duration = new SDuration_1.default();
        const compilerPromise = compiler.compile(Object.assign(Object.assign({}, (req.query || {})), { save: true, input: req.path.slice(1) }));
        promise.pipe(compilerPromise);
        compilerPromise.on('reject', (e) => {
            res.type('text/html');
            res.status(500);
            res.send(e);
            promise.reject(e);
        });
        const compileRes = yield compilerPromise;
        res.type('text/css');
        res.status(200);
        res.send(compileRes.css);
        promise.resolve(`<bgGreen><black> scss </black></bgGreen> file "<yellow>${req.path}</yellow> served in <cyan>${duration.end()}s</cyan>"`);
    }))();
    return promise;
}
exports.default = scss;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9ub2RlL3NlcnZlci9mcm9udGVuZC9oYW5kbGVycy9zY3NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDJFQUFvRDtBQUNwRCx3RkFBa0U7QUFDbEUsd0VBQWtEO0FBQ2xELGdJQUEwRztBQUUxRzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBd0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDbEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBVSxFQUFFLENBQUM7SUFFakMsQ0FBQyxHQUFTLEVBQUU7UUFDVixNQUFNLGdCQUFnQixHQUFHLHNDQUE4QixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25FLE1BQU0sUUFBUSxHQUFHLElBQUksdUJBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sUUFBUSxHQUFHLElBQUksbUJBQVcsRUFBRSxDQUFDO1FBQ25DLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxPQUFPLGlDQUNuQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLEtBQ3BCLElBQUksRUFBRSxJQUFJLEVBQ1YsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUN4QixDQUFDO1FBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM5QixlQUFlLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1osT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sVUFBVSxHQUFHLE1BQU0sZUFBZSxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsT0FBTyxDQUNiLDBEQUNFLEdBQUcsQ0FBQyxJQUNOLDZCQUE2QixRQUFRLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FDdkQsQ0FBQztJQUNKLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztJQUVMLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUEvQkQsdUJBK0JDIn0=