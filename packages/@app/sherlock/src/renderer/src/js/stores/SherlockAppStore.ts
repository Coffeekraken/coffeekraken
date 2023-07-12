import __SState from '@coffeekraken/s-state';

import type { ISherlockService, ISherlockSpace, ISherlockUiClientStates } from '../../../../shared/SherlockTypes';

export interface ISherlockAppStore {
    title: string;
    spaces: ISherlockSpace[];
    currentSpace: ISherlockSpace;
    currentService: ISherlockService;
    clientStates: ISherlockUiClientStates;
}

const appState = new __SState({
    title: 'Sherlock',
    spaces: [],
    currentSpace: null,
    currentService: null,
    clientStates: {}
});

export default appState
