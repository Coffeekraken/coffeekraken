import { ISStateAdapter } from '../../shared/SState';

export default class SStateLsAdapter implements ISStateAdapter {
    async: boolean;
    _id: any;
    constructor(id: string);
    save(state: any): void;
    load(): any;
}
