var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
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
            __SEventEmitterBase._ipcInstance.of[`ipc-${process.ppid}`].on('connect', () => {
            });
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
                eventEmitter: eventEmitterSettings !== null && eventEmitterSettings !== void 0 ? eventEmitterSettings : {}
            });
            const { default: __nodeIpc } = yield import('node-ipc');
            const ipcInstance = new __nodeIpc.IPC();
            ipcInstance.config = __deepMerge((_a = ipcInstance.config) !== null && _a !== void 0 ? _a : {}, {
                id: `ipc-${process.pid}`,
                retry: 1500,
                silent: true
            }, ipcSettings !== null && ipcSettings !== void 0 ? ipcSettings : {});
            ipcInstance.serve(() => {
                ipcInstance.server.on('message', (data, socket) => __awaiter(this, void 0, void 0, function* () {
                    if (data.metas.event === 'ask', data.metas) {
                        const res = yield eventEmitter.emit(data.metas.event, data.value, data.metas);
                        ipcInstance.server.emit(socket, `answer`, {
                            value: res,
                            metas: data.metas
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V2ZW50RW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFdmVudEVtaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxnQkFBZ0IsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLG1CQUErQyxNQUFNLHlCQUF5QixDQUFDO0FBR3RGLDJDQUEyQztBQUUzQyxDQUFDLEdBQVMsRUFBRTtJQUNSLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsTUFBTSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEQsbUJBQW1CLENBQUMsWUFBWSxHQUFHLElBQUksU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3ZELG1CQUFtQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLE9BQU8sT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2xFLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNyRCxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFFdEQsSUFBSSxnQkFBZ0IsRUFBRSxFQUFFO1FBQ3BCLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFO1lBQ25FLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUM5RSxDQUFDLENBQUMsQ0FBQztZQUNILG1CQUFtQixDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENB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