"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const is_1 = require("@coffeekraken/sugar/is");
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const SEventEmitter_1 = __importDefault(require("../shared/SEventEmitter"));
// export * from '../shared/SEventEmitter';
(() => __awaiter(void 0, void 0, void 0, function* () {
    const { default: __nodeIpc } = yield Promise.resolve().then(() => __importStar(require('node-ipc')));
    SEventEmitter_1.default._ipcInstance = new __nodeIpc.IPC();
    SEventEmitter_1.default._ipcInstance.config.id = `ipc-${process.pid}`;
    SEventEmitter_1.default._ipcInstance.config.retry = 1500;
    SEventEmitter_1.default._ipcInstance.config.silent = true;
    if ((0, is_1.__isChildProcess)()) {
        SEventEmitter_1.default._ipcInstance.connectTo(`ipc-${process.ppid}`, () => {
            SEventEmitter_1.default._ipcInstance.of[`ipc-${process.ppid}`].on('connect', () => { });
            SEventEmitter_1.default._ipcInstance.of[`ipc-${process.ppid}`].on('answer', (data) => {
                SEventEmitter_1.default._ipcInstance.log(data);
                SEventEmitter_1.default.global.emit(`answer.${data.metas.askId}`, data.value, data.metas);
            });
        });
    }
}))();
class SEventEmitter extends SEventEmitter_1.default {
    static ipcServer(ipcSettings, eventEmitterSettings) {
        if (this._ipcPromise)
            return this._ipcPromise;
        this._ipcPromise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const eventEmitter = new this({
                eventEmitter: eventEmitterSettings !== null && eventEmitterSettings !== void 0 ? eventEmitterSettings : {},
            });
            const { default: __nodeIpc } = yield Promise.resolve().then(() => __importStar(require('node-ipc')));
            const ipcInstance = new __nodeIpc.IPC();
            ipcInstance.config = (0, deepMerge_1.default)((_a = ipcInstance.config) !== null && _a !== void 0 ? _a : {}, {
                id: `ipc-${process.pid}`,
                retry: 1500,
                silent: true,
            }, ipcSettings !== null && ipcSettings !== void 0 ? ipcSettings : {});
            ipcInstance.serve(() => {
                ipcInstance.server.on('message', (data, socket) => __awaiter(this, void 0, void 0, function* () {
                    if (data.metas.event === 'ask') {
                        const res = yield eventEmitter.emit(data.metas.event, data.value, data.metas);
                        ipcInstance.server.emit(socket, `answer`, {
                            value: res,
                            metas: data.metas,
                        });
                    }
                    else {
                        eventEmitter.emit(data.metas.event, data.value, data.metas);
                    }
                }));
                resolve(eventEmitter);
            });
            ipcInstance.server.start();
        }));
        return this._ipcPromise;
    }
}
exports.default = SEventEmitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMEQ7QUFDMUQsNEZBQXNFO0FBQ3RFLDRFQUVpQztBQUVqQywyQ0FBMkM7QUFFM0MsQ0FBQyxHQUFTLEVBQUU7SUFDUixNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLHdEQUFhLFVBQVUsR0FBQyxDQUFDO0lBQ3hELHVCQUFtQixDQUFDLFlBQVksR0FBRyxJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN2RCx1QkFBbUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxPQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNsRSx1QkFBbUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDckQsdUJBQW1CLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBRXRELElBQUksSUFBQSxxQkFBZ0IsR0FBRSxFQUFFO1FBQ3BCLHVCQUFtQixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQ3RDLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxFQUNyQixHQUFHLEVBQUU7WUFDRCx1QkFBbUIsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUMvQixPQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FDeEIsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFCLHVCQUFtQixDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQ3pELFFBQVEsRUFDUixDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNMLHVCQUFtQixDQUFDLFlBQVksQ0FBQyxHQUFH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