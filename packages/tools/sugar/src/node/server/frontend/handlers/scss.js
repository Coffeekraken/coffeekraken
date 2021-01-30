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
const SScssCompiler_1 = __importDefault(require("../../../scss/compile/SScssCompiler"));
const SDuration_1 = __importDefault(require("../../../time/SDuration"));
const SScssCompilerParamsInterface_1 = __importDefault(require("../../../scss/compile/interface/SScssCompilerParamsInterface"));
module.exports = function scss(req, res, settings = {}) {
    const promise = new SPromise_1.default();
    (() => __awaiter(this, void 0, void 0, function* () {
        const defaultValuesObj = SScssCompilerParamsInterface_1.default.defaults();
        const compiler = new SScssCompiler_1.default(defaultValuesObj);
        const duration = new SDuration_1.default();
        const compilerPromise = compiler.compile(req.path, Object.assign({}, (req.query || {})));
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNjc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7QUFFZCx5RUFBbUQ7QUFDbkQsd0ZBQWtFO0FBQ2xFLHdFQUFrRDtBQUNsRCxnSUFBMEc7QUFxQjFHLGlCQUFTLFNBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDNUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVSxFQUFFLENBQUM7SUFFakMsQ0FBQyxHQUFTLEVBQUU7UUFDVixNQUFNLGdCQUFnQixHQUFHLHNDQUE4QixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25FLE1BQU0sUUFBUSxHQUFHLElBQUksdUJBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sUUFBUSxHQUFHLElBQUksbUJBQVcsRUFBRSxDQUFDO1FBQ25DLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksb0JBQzVDLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsRUFDcEIsQ0FBQztRQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUIsZUFBZSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNaLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLFVBQVUsR0FBRyxNQUFNLGVBQWUsQ0FBQztRQUN6QyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLE9BQU8sQ0FDYiwwREFDRSxHQUFHLENBQUMsSUFDTiw2QkFBNkIsUUFBUSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQ3ZELENBQUM7SUFDSixDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7SUFFTCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUMifQ==