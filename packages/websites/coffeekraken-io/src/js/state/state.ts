import __SRequest from '@coffeekraken/s-request';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

export async function loadState(): Promise<any> {
    const state = JSON.parse(window.localStorage.getItem('coffeekrakenio') ?? '{}');
    return state;
}

export async function getCurrentVersion(): string {
    const state = await loadState();
    const docmapJson = await loadDocmap();
    return state.version ?? docmapJson.snapshots[0];
}

export async function setState(stateObj) {
    const state = await loadState();
    const newState = __deepMerge(state, stateObj);
    window.localStorage.setItem('coffeekrakenio', JSON.stringify(newState));
}

let _docmap, _docmapPromise;
export async function loadDocmap(): Promise<any> {

    const state = await loadState();
  if (_docmap) return _docmap;
if (_docmapPromise) return (await _docmapPromise).data;  

  const request = new __SRequest({
      url: `/api/docmap?v=${state.version}`,
      method: 'GET'
  });

  const promise = request.send();
  _docmapPromise = promise;
  _docmap = (await promise).data;
  return _docmap;
}