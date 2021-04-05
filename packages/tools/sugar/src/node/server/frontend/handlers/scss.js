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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const SScssCompiler_1 = __importDefault(require("../../../scss/compile/SScssCompiler"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const SScssCompilerParamsInterface_1 = __importDefault(require("../../../scss/compile/interface/SScssCompilerParamsInterface"));
/**
 * @name                scss
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the home page
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
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
        const duration = new s_duration_1.default();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNjc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsd0VBQWlEO0FBQ2pELHdGQUFrRTtBQUNsRSwwRUFBbUQ7QUFDbkQsZ0lBQTBHO0FBRTFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxTQUF3QixJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNsRCxNQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFVLEVBQUUsQ0FBQztJQUVqQyxDQUFDLEdBQVMsRUFBRTtRQUNWLE1BQU0sZ0JBQWdCLEdBQUcsc0NBQThCLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkUsTUFBTSxRQUFRLEdBQUcsSUFBSSx1QkFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7UUFDbkMsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLE9BQU8saUNBQ25DLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsS0FDcEIsSUFBSSxFQUFFLElBQUksRUFDVixLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQ3hCLENBQUM7UUFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzlCLGVBQWUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDakMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxVQUFVLEdBQUcsTUFBTSxlQUFlLENBQUM7UUFDekMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxPQUFPLENBQ2IsMERBQ0UsR0FBRyxDQUFDLElBQ04sNkJBQTZCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUN2RCxDQUFDO0lBQ0osQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO0lBRUwsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQS9CRCx1QkErQkMifQ==