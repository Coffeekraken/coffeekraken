import { __isChildProcess } from '@coffeekraken/sugar/is';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SEventEmitterBase, {
    ISEventEmitterSettings,
} from '../shared/SEventEmitter';

// export * from '../shared/SEventEmitter';

(async () => {
    const { default: __nodeIpc } = await import('node-ipc');
    __SEventEmitterBase._ipcInstance = new __nodeIpc.IPC();
    __SEventEmitterBase._ipcInstance.config.id = `ipc-${process.pid}`;
    __SEventEmitterBase._ipcInstance.config.retry = 1500;
    __SEventEmitterBase._ipcInstance.config.silent = true;

    if (__isChildProcess()) {
        __SEventEmitterBase._ipcInstance.connectTo(
            `ipc-${process.ppid}`,
            () => {
                __SEventEmitterBase._ipcInstance.of[
                    `ipc-${process.ppid}`
                ].on('connect', () => {});
                __SEventEmitterBase._ipcInstance.of[`ipc-${process.ppid}`].on(
                    'answer',
                    (data) => {
                        __SEventEmitterBase._ipcInstance.log(data);
                        __SEventEmitterBase.global.emit(
                            `answer.${data.metas.askId}`,
                            data.value,
                            data.metas,
                        );
                    },
                );
            },
        );
    }
})();

export default class SEventEmitter extends __SEventEmitterBase {
    static _ipcPromise;
    static ipcServer(
        ipcSettings?: any,
        eventEmitterSettings?: Partial<ISEventEmitterSettings>,
    ) {
        if (this._ipcPromise) return this._ipcPromise;

        this._ipcPromise = new Promise(async (resolve, reject) => {
            const eventEmitter = new this({
                eventEmitter: eventEmitterSettings ?? {},
            });

            const { default: __nodeIpc } = await import('node-ipc');

            const ipcInstance = new __nodeIpc.IPC();

            ipcInstance.config = __deepMerge(
                ipcInstance.config ?? {},
                {
                    id: `ipc-${process.pid}`,
                    retry: 1500,
                    silent: true,
                },
                ipcSettings ?? {},
            );

            ipcInstance.serve(() => {
                ipcInstance.server.on('message', async (data, socket) => {
                    if (data.metas.event === 'ask') {
                        const res = await eventEmitter.emit(
                            data.metas.event,
                            data.value,
                            data.metas,
                        );
                        ipcInstance.server.emit(socket, `answer`, {
                            value: res,
                            metas: data.metas,
                        });
                    } else {
                        eventEmitter.emit(
                            data.metas.event,
                            data.value,
                            data.metas,
                        );
                    }
                });
                resolve(eventEmitter);
            });
            ipcInstance.server.start();
        });

        return this._ipcPromise;
    }
}
