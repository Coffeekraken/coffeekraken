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
const STsCompileInterface_1 = __importDefault(require("../../../typescript/compile/interface/STsCompileInterface"));
module.exports = function ts(req, res, settings = {}) {
    const promise = new SPromise_1.default();
    (() => __awaiter(this, void 0, void 0, function* () {
        const defaultValuesObj = STsCompileInterface_1.default.getDefaultValues();
        const compiler = new STsCompiler_1.default(Object.assign({}, defaultValuesObj));
        const duration = new SDuration_1.default();
        const compilerPromise = compiler.compile(Object.assign(Object.assign({}, (req.query || {})), { input: req.path.slice(1), transpileOnly: true }));
        SPromise_1.default.pipe(compilerPromise, promise);
        compilerPromise.on('reject', (e) => {
            res.type('text/html');
            res.status(500);
            res.send(e);
            promise.reject(e);
        });
        const compileRes = yield compilerPromise;
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
//# sourceMappingURL=ts.js.map