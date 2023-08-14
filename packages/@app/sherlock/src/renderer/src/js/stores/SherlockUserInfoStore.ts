import __SStore from '@coffeekraken/s-store';

import { ISherlockPool, ISherlockUserInfo } from '../../../../shared/SherlockTypes.js';
import __sherlockApi from '../api/SherlockApi.js';
import __sherlockStores from './SherlockStores.js';

export interface ISherlockUserInfoStore {
    [key: string]: ISherlockPool;
}

class SherlockUserInfoStore extends __SStore {
    _userInfo: ISherlockUserInfo = {};
    _spaceUid: string;

    constructor(spaceUid: string) {
        super();
        this._spaceUid = spaceUid;
    }

    async mount() {}

    getInfo(): ISherlockUserInfo {
        const space = __sherlockStores.spaces.getSpace(this._spaceUid);
        if (!space.userInfo) {
            __sherlockStores.route.setRoute({
                popup: 'userInfo',
            });
        } else {
            Object.assign(this._userInfo, space.userInfo);
        }

        return this._userInfo;
    }

    setInfo(info: ISherlockUserInfo) {
        Object.assign(this._userInfo, info);
    }

    saveInfo(info?: ISherlockUserInfo) {
        __sherlockApi.saveUserInfo(this._spaceUid, info ?? this._userInfo, () => {
            console.log('SAVED!!!');
        });
    }
}

export default SherlockUserInfoStore;
