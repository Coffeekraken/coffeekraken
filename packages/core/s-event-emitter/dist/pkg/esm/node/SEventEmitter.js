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
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SEventEmitterBase from '../shared/SEventEmitter.js';
// export * from '../shared/SEventEmitter.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLG1CQUVOLE1BQU0sNEJBQTRCLENBQUM7QUFFcEMsOENBQThDO0FBRTlDLENBQUMsR0FBUyxFQUFFO0lBQ1IsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCxtQkFBbUIsQ0FBQyxZQUFZLEdBQUcsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdkQsbUJBQW1CLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsT0FBTyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbEUsbUJBQW1CLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3JELG1CQUFtQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUV0RCxJQUFJLGdCQUFnQixFQUFFLEVBQUU7UUFDcEIsbUJBQW1CLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FDdEMsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQ3JCLEdBQUcsRUFBRTtZQUNELG1CQUFtQixDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQ3pELFNBQVMsRUFDVCxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQ1gsQ0FBQztZQUNGLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQ3pELFFBQVEs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