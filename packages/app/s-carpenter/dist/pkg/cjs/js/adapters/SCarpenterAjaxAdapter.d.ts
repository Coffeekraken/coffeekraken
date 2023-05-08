import type { ISCarpenterAdapterDeps } from '../SCarpenterAdapter';
import __SCarpenterAdapter from '../SCarpenterAdapter';
import type { ISCarpenterNode } from '../../types/_exports';
export default class SCarpenterAjaxAdapter extends __SCarpenterAdapter {
    constructor(deps: ISCarpenterAdapterDeps);
    delete(): Promise<any>;
    getData(): Promise<any>;
    save(data: ISCarpenterNode): Promise<void>;
    setData(data: any): Promise<HTMLElement>;
}
