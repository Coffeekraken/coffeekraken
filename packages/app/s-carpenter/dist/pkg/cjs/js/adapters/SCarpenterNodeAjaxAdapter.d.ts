import type { ISCarpenterNodeAdapterDeps } from '../SCarpenterNodeAdapter';
import __SCarpenterNodeAdapter from '../SCarpenterNodeAdapter';
import type { ISCarpenterNode } from '../../types/_exports';
export default class SCarpenterNodeAjaxAdapter extends __SCarpenterNodeAdapter {
    constructor(deps: ISCarpenterNodeAdapterDeps);
    delete(): Promise<any>;
    getData(): Promise<any>;
    status(uid: string): Promise<void>;
    save(data: ISCarpenterNode): Promise<void>;
    setData(data: any): Promise<HTMLElement>;
}
