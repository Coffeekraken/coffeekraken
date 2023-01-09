import __SEventEmitterBase, { ISEventEmitterSettings } from '../shared/SEventEmitter';
export default class SEventEmitter extends __SEventEmitterBase {
    static _ipcPromise: any;
    static ipcServer(ipcSettings?: any, eventEmitterSettings?: Partial<ISEventEmitterSettings>): any;
}
