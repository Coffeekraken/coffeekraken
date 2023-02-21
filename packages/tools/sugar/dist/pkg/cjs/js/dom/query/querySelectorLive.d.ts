import __SPromise from '@coffeekraken/s-promise';
import type { TWhenTrigger } from '../detect/when';

export interface IQuerySelectorLiveSettings {
    rootNode: HTMLElement;
    once: boolean;
    afterFirst: Function;
    scopes: boolean;
    firstOnly: boolean;
    when: TWhenTrigger;
    attributes: string[];
}
export default function __querySelectorLive(selector: string, cb?: Function<HTMLElement>, settings?: Partial<IQuerySelectorLiveSettings>, _isFirstLevel?: boolean): __SPromise<HTMLElement>;
