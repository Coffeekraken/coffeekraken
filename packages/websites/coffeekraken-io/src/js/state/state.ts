// @ts-nocheck

import __SRequest from '@coffeekraken/s-request';
import { SStateManager } from '@coffeekraken/s-state';

const state = new SStateManager({
    id: 'ck-state',
    save: true,
});

export default state;

let _docmap, _docmapPromise;
export async function loadDocmap(): Promise<any> {
    if (_docmap) return _docmap;
    if (_docmapPromise) return (await _docmapPromise).data;

    const request = new __SRequest({
        url: `/docmap.json`,
        method: 'GET',
    });

    const promise = request.send();
    _docmapPromise = promise;
    _docmap = (await promise).data;

    return _docmap;
}
