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
const object_1 = require("@coffeekraken/sugar/object");
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
            ipcInstance.config = (0, object_1.__deepMerge)((_a = ipcInstance.config) !== null && _a !== void 0 ? _a : {}, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMEQ7QUFDMUQsdURBQXlEO0FBQ3pELDRFQUVpQztBQUVqQywyQ0FBMkM7QUFFM0MsQ0FBQyxHQUFTLEVBQUU7SUFDUixNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLHdEQUFhLFVBQVUsR0FBQyxDQUFDO0lBQ3hELHVCQUFtQixDQUFDLFlBQVksR0FBRyxJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN2RCx1QkFBbUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxPQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNsRSx1QkFBbUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDckQsdUJBQW1CLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBRXRELElBQUksSUFBQSxxQkFBZ0IsR0FBRSxFQUFFO1FBQ3BCLHVCQUFtQixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQ3RDLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxFQUNyQixHQUFHLEVBQUU7WUFDRCx1QkFBbUIsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUN6RCxTQUFTLEVBQ1QsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUNYLENBQUM7WUFDRix1QkFBbUIsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUN6RCxRQUFRLEVBQ1IsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDTCx1QkFBbUIsQ0FBQyxZQUFZLENBQUMsR0FBRyxD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