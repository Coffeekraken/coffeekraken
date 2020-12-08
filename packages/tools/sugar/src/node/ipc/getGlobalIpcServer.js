"use strict";
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
const SIpcServer_1 = __importDefault(require("./SIpcServer"));
/**
 * @name                getGlobalIpcServer
 * @namespace           sugar.node.ipc
 * @type                Function
 * @async
 *
 */
let _GlobalIpcServerInstance;
module.exports = function getGlobalIpcServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // if (SIpcServer.hasGlobalServer() === true) {
        //   return resolve(_GlobalIpcServerInstance);
        // }
        _GlobalIpcServerInstance = new SIpcServer_1.default();
        yield _GlobalIpcServerInstance.start();
        console.log('SER', _GlobalIpcServerInstance);
        return _GlobalIpcServerInstance;
    });
};
//# sourceMappingURL=getGlobalIpcServer.js.map