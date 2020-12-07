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
const SDocMap_1 = __importDefault(require("../../../doc/SDocMap"));
module.exports = function docMap(req, res, settings = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const docMap = new SDocMap_1.default();
        const docMapJson = yield docMap.read();
        res.status(200);
        res.type('application/json');
        res.send(docMapJson);
    });
};
//# sourceMappingURL=docMap.js.map