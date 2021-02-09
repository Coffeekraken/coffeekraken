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
const SPromise_1 = __importDefault(require("../../../promise/SPromise"));
const STsCompiler_1 = __importDefault(require("../../../typescript/compile/STsCompiler"));
const SDuration_1 = __importDefault(require("../../../time/SDuration"));
/**
 * @name                ts
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
function ts(req, res, settings = {}) {
    const promise = new SPromise_1.default();
    (() => __awaiter(this, void 0, void 0, function* () {
        const compiler = new STsCompiler_1.default();
        const duration = new SDuration_1.default();
        const compilerPromise = compiler.compile(req.path.slice(1), Object.assign(Object.assign({}, (req.query || {})), { transpileOnly: true }));
        SPromise_1.default.pipe(compilerPromise, promise);
        compilerPromise.on('reject', (e) => {
            res.type('text/html');
            res.status(500);
            res.send(e);
            promise.reject(e);
        });
        const compileRes = yield compilerPromise;
        return;
        if (compileRes.files) {
            let string = '';
            compileRes.files.forEach((file) => {
                string += `\n${file.readSync()}`;
            });
            res.type('text/javascript');
            res.status(200);
            res.send(string);
            return promise.resolve(`<bgGreen><black> ts </black></bgGreen> file "<yellow>${req.path}</yellow> served in <cyan>${duration.end()}s</cyan>"`);
        }
        res.type('text/html');
        res.status(500);
        res.send(`requested file does not exist...`);
        promise.reject('requested file does not exist...');
    }))();
    return promise;
}
exports.default = ts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCx5RUFBbUQ7QUFDbkQsMEZBQW9FO0FBQ3BFLHdFQUFrRDtBQUdsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBd0IsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDaEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVSxFQUFFLENBQUM7SUFFakMsQ0FBQyxHQUFTLEVBQUU7UUFDVixNQUFNLFFBQVEsR0FBRyxJQUFJLHFCQUFhLEVBQUUsQ0FBQztRQUNyQyxNQUFNLFFBQVEsR0FBRyxJQUFJLG1CQUFXLEVBQUUsQ0FBQztRQUNuQyxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxrQ0FDckQsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUNwQixhQUFhLEVBQUUsSUFBSSxJQUNuQixDQUFDO1FBQ0gsa0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDakMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxVQUFVLEdBQUcsTUFBTSxlQUFlLENBQUM7UUFDekMsT0FBTztRQUNQLElBQUksVUFBVSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDaEIsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDaEMsTUFBTSxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7WUFFSCxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDNUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FDcEIsd0RBQ0UsR0FBRyxDQUFDLElBQ04sNkJBQTZCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUN2RCxDQUFDO1NBQ0g7UUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7SUFFTCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBekNELHFCQXlDQyJ9