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
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const SEventEmitter_js_1 = __importDefault(require("../shared/SEventEmitter.js"));
// export * from '../shared/SEventEmitter.js';
(() => __awaiter(void 0, void 0, void 0, function* () {
    const { default: __nodeIpc } = yield import('node-ipc');
    SEventEmitter_js_1.default._ipcInstance = new __nodeIpc.IPC();
    SEventEmitter_js_1.default._ipcInstance.config.id = `ipc-${process.pid}`;
    SEventEmitter_js_1.default._ipcInstance.config.retry = 1500;
    SEventEmitter_js_1.default._ipcInstance.config.silent = true;
    if ((0, is_1.__isChildProcess)()) {
        SEventEmitter_js_1.default._ipcInstance.connectTo(`ipc-${process.ppid}`, () => {
            SEventEmitter_js_1.default._ipcInstance.of[`ipc-${process.ppid}`].on('connect', () => { });
            SEventEmitter_js_1.default._ipcInstance.of[`ipc-${process.ppid}`].on('answer', (data) => {
                SEventEmitter_js_1.default._ipcInstance.log(data);
                SEventEmitter_js_1.default.global.emit(`answer.${data.metas.askId}`, data.value, data.metas);
            });
        });
    }
}))();
class SEventEmitter extends SEventEmitter_js_1.default {
    static ipcServer(ipcSettings, eventEmitterSettings) {
        if (this._ipcPromise)
            return this._ipcPromise;
        this._ipcPromise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const eventEmitter = new this({
                eventEmitter: eventEmitterSettings !== null && eventEmitterSettings !== void 0 ? eventEmitterSettings : {},
            });
            const { default: __nodeIpc } = yield import('node-ipc');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBEO0FBQzFELHVEQUF5RDtBQUN6RCxrRkFFb0M7QUFFcEMsOENBQThDO0FBRTlDLENBQUMsR0FBUyxFQUFFO0lBQ1IsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCwwQkFBbUIsQ0FBQyxZQUFZLEdBQUcsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdkQsMEJBQW1CLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsT0FBTyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbEUsMEJBQW1CLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3JELDBCQUFtQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUV0RCxJQUFJLElBQUEscUJBQWdCLEdBQUUsRUFBRTtRQUNwQiwwQkFBbUIsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUN0QyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFDckIsR0FBRyxFQUFFO1lBQ0QsMEJBQW1CLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FDekQsU0FBUyxFQUNULEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FDWCxDQUFDO1lBQ0YsMEJBQW1CLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FDekQsUUFBUSxFQUNSLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ0wsMEJBQW1CLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0MsMEJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDM0IsVUFBVSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUM1QixJQUFJLENBQUMsS0FBSyxFQUNWLElBQUksQ0FBQyxLQUFLLENBQ2IsQ0FBQztZQUNOLENBQUMsQ0FDSixDQUFDO1FBQ04sQ0FBQyxDQUNKLENBQUM7S0FDTDtBQUNMLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztBQUVMLE1BQXFCLGFBQWMsU0FBUSwwQkFBbUI7SUFFMUQsTUFBTSxDQUFDLFNBQVMsQ0FDWixXQUFpQixFQUNqQixvQkFBc0Q7UUFFdEQsSUFBSSxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUU5QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztZQUNyRCxNQUFNLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQztnQkFDMUIsWUFBWSxFQUFFLG9CQUFvQixhQUFwQixvQkFBb0IsY0FBcEIsb0JBQW9CLEdBQUksRUFBRTthQUMzQyxDQUFDLENBQUM7WUFFSCxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXhELE1BQU0sV0FBVyxHQUFHLElBQUksU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRXhDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBQSxvQkFBVyxFQUM1QixNQUFBLFdBQVcsQ0FBQyxNQUFNLG1DQUFJLEVBQUUsRUFDeEI7Z0JBQ0ksRUFBRSxFQUFFLE9BQU8sT0FBTyxDQUFDLEdBQUcsRUFBRTtnQkFDeEIsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsTUFBTSxFQUFFLElBQUk7YUFDZixFQUNELFdBQVcsYUFBWCxXQUFXLGNBQVgsV0FBVyxHQUFJLEVBQUUsQ0FDcEIsQ0FBQztZQUVGLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO2dCQUNuQixXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBTyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7b0JBQ3BELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO3dCQUM1QixNQUFNLEdBQUcsR0FBRyxNQUFNLFlBQVksQ0FBQyxJQUFJLENBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUNoQixJQUFJLENBQUMsS0FBSyxFQUNWLElBQUksQ0FBQyxLQUFLLENBQ2IsQ0FBQzt3QkFDRixXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFOzRCQUN0QyxLQUFLLEVBQUUsR0FBRzs0QkFDVixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7eUJBQ3BCLENBQUMsQ0FBQztxQkFDTjt5QkFBTTt3QkFDSCxZQUFZLENBQUMsSUFBSSxDQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUNoQixJQUFJLENBQUMsS0FBSyxFQUNWLElBQUksQ0FBQyxLQUFLLENBQ2IsQ0FBQztxQkFDTDtnQkFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztZQUNILFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDL0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0NBQ0o7QUF0REQsZ0NBc0RDIn0=