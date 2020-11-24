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
const SScssCompiler_1 = __importDefault(require("../../../scss/SScssCompiler"));
const SDuration_1 = __importDefault(require("../../../time/SDuration"));
const SBuildScssInterface_1 = __importDefault(require("../../../scss/build/interface/SBuildScssInterface"));
module.exports = function scss(req, res, settings = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const defaultValuesObj = SBuildScssInterface_1.default.getDefaultValues();
        const compiler = new SScssCompiler_1.default(defaultValuesObj);
        const duration = new SDuration_1.default();
        const compileRes = yield compiler.compile(req.path, Object.assign({}, (req.query || {})));
        if (settings.log) {
            console.log(`<bgGreen><black> scss </black></bgGreen> Scss file "<yellow>${req.path}</yellow> served in <cyan>${duration.end()}s</cyan>"`);
        }
        res.type('text/css');
        res.status(200);
        res.send(compileRes.css);
    });
};
