var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __isChildProcess } from '@coffeekraken/sugar/is';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SEventEmitterBase from '../shared/SEventEmitter';
// export * from '../shared/SEventEmitter';
(() => __awaiter(void 0, void 0, void 0, function* () {
    const { default: __nodeIpc } = yield import('node-ipc');
    __SEventEmitterBase._ipcInstance = new __nodeIpc.IPC();
    __SEventEmitterBase._ipcInstance.config.id = `ipc-${process.pid}`;
    __SEventEmitterBase._ipcInstance.config.retry = 1500;
    __SEventEmitterBase._ipcInstance.config.silent = true;
    if (__isChildProcess()) {
        __SEventEmitterBase._ipcInstance.connectTo(`ipc-${process.ppid}`, () => {
            __SEventEmitterBase._ipcInstance.of[`ipc-${process.ppid}`].on('connect', () => { });
            __SEventEmitterBase._ipcInstance.of[`ipc-${process.ppid}`].on('answer', (data) => {
                __SEventEmitterBase._ipcInstance.log(data);
                __SEventEmitterBase.global.emit(`answer.${data.metas.askId}`, data.value, data.metas);
            });
        });
    }
}))();
export default class SEventEmitter extends __SEventEmitterBase {
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
            ipcInstance.config = __deepMerge((_a = ipcInstance.config) !== null && _a !== void 0 ? _a : {}, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sbUJBRU4sTUFBTSx5QkFBeUIsQ0FBQztBQUVqQywyQ0FBMkM7QUFFM0MsQ0FBQyxHQUFTLEVBQUU7SUFDUixNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hELG1CQUFtQixDQUFDLFlBQVksR0FBRyxJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN2RCxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxPQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNsRSxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDckQsbUJBQW1CLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBRXRELElBQUksZ0JBQWdCLEVBQUUsRUFBRTtRQUNwQixtQkFBbUIsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUN0QyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFDckIsR0FBRyxFQUFFO1lBQ0QsbUJBQW1CLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FDL0IsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQ3hCLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztZQUMxQixtQkFBbUIsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUN6RCxRQUFRLEVBQ1IsQ0FB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