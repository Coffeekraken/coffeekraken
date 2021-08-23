// @ts-nocheck

import __SRequest from '@coffeekraken/s-request';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

export function getState(): any {
    const state = JSON.parse(window.localStorage.getItem('coffeekrakenio') ?? '{}');
    return state;
}

export async function getCurrentVersion(): string {
    const docmapJson = await loadDocmap();

    let version;
    if (document.location.hostname.split('.').length >= 4) {
        version = document.location.hostname.split('.').slice(0, 3).join('.').replace(/^v/, '');
    }

    return version ?? docmapJson.snapshots.slice(-1)[0];
}

export function setState(stateObj) {
    const state = getState();
    const newState = __deepMerge(state, stateObj);
    window.localStorage.setItem('coffeekrakenio', JSON.stringify(newState));
}

let _docmap, _docmapPromise;
export async function loadDocmap(): Promise<any> {
    const state = getState();
    if (_docmap) return _docmap;
    if (_docmapPromise) return (await _docmapPromise).data;

    const request = new __SRequest({
        url: `/api/docmap?v=${state.version ?? ''}`,
        method: 'GET',
    });

    const promise = request.send();
    _docmapPromise = promise;
    _docmap = (await promise).data;
    return _docmap;
}
