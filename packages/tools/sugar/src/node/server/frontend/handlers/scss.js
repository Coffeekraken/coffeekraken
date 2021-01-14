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
const SScssCompiler_1 = __importDefault(require("../../../scss/SScssCompiler"));
const SDuration_1 = __importDefault(require("../../../time/SDuration"));
const SBuildScssInterface_1 = __importDefault(require("../../../scss/build/interface/SBuildScssInterface"));
module.exports = function scss(req, res, settings = {}) {
    const promise = new SPromise_1.default();
    (() => __awaiter(this, void 0, void 0, function* () {
        const defaul9tValuesObj = SBuildScssInterface_1.default.defaults();
        const compiler = new SScssCompiler_1.default(defaultValuesObj);
        const duration = new SDuration_1.default();
        const compilerPromise = compiler.compile(req.path, Object.assign({}, (req.query || {})));
        SPromise_1.default.pipe(compilerPromise, promise);
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
//# sourceMappingURL=scss.js.map