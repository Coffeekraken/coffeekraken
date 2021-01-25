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
const SPromise_1 = __importDefault(require("../../../promise/SPromise"));
const STsCompiler_1 = __importDefault(require("../../../typescript/compile/STsCompiler"));
const SDuration_1 = __importDefault(require("../../../time/SDuration"));
module.exports = function ts(req, res, settings = {}) {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7OztBQUVkLHlFQUFtRDtBQUNuRCwwRkFBb0U7QUFDcEUsd0VBQWtEO0FBc0JsRCxpQkFBUyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQzFDLE1BQU0sT0FBTyxHQUFHLElBQUksa0JBQVUsRUFBRSxDQUFDO0lBRWpDLENBQUMsR0FBUyxFQUFFO1FBQ1YsTUFBTSxRQUFRLEdBQUcsSUFBSSxxQkFBYSxFQUFFLENBQUM7UUFDckMsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQkFBVyxFQUFFLENBQUM7UUFDbkMsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsa0NBQ3JELENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsS0FDcEIsYUFBYSxFQUFFLElBQUksSUFDbkIsQ0FBQztRQUNILGtCQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxQyxlQUFlLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1osT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sVUFBVSxHQUFHLE1BQU0sZUFBZSxDQUFDO1FBQ3pDLE9BQU87UUFDUCxJQUFJLFVBQVUsQ0FBQyxLQUFLLEVBQUU7WUFDcEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2hDLE1BQU0sSUFBSSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1lBRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzVCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQ3BCLHdEQUNFLEdBQUcsQ0FBQyxJQUNOLDZCQUE2QixRQUFRLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FDdkQsQ0FBQztTQUNIO1FBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQUMsTUFBTSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO0lBRUwsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyxDQUFDIn0=