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
const SDuration_1 = __importDefault(require("../../../time/SDuration"));
const SJsCompiler_1 = __importDefault(require("../../../js/SJsCompiler"));
module.exports = function js(req, res, settings = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        let filePath = req.path.slice(0, 1) === '/' ? req.path.slice(1) : req.path;
        const duration = new SDuration_1.default();
        const compiler = new SJsCompiler_1.default({});
        const resultObj = yield compiler.compile(filePath);
        if (settings.log) {
            console.log(`<bgGreen><black> js </black></bgGreen> Js file "<yellow>${req.path}</yellow> served in <cyan>${duration.end()}s</cyan>"`);
        }
        res.type('text/javascript');
        res.status(200);
        res.send(resultObj.js);
    });
};
