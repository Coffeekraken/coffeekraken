// @ts-nocheck

import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SRequest from '@coffeekraken/s-request';

export function getState(): any {
    const state = JSON.parse(
        window.localStorage.getItem('coffeekrakenio') ?? '{}',
    );
    return state;
}

export function setState(stateObj) {
    const state = getState();
    const newState = __deepMerge(state, stateObj);
    window.localStorage.setItem('coffeekrakenio', JSON.stringify(newState));
}

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
