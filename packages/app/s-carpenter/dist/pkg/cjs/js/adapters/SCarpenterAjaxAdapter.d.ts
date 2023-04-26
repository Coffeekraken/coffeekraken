import type { ISRenderableNode } from '@specimen/types';
import type { ISCarpenterAdapterDeps } from '../SCarpenterAdapter';
import __SCarpenterAdapter from '../SCarpenterAdapter';
export default class SCarpenterAjaxAdapter extends __SCarpenterAdapter {
    constructor(deps: ISCarpenterAdapterDeps);
    delete(): Promise<any>;
    getData(): Promise<any>;
    save(data: ISRenderableNode): Promise<void>;
    setData(data: any): Promise<HTMLElement>;
}
