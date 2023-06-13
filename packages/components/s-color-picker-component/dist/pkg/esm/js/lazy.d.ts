import type { TWhenTrigger } from '@coffeekraken/sugar/dom';
interface ILazyDefineSettings {
    when: TWhenTrigger;
}
export declare function define(props: any, tagName?: string, settings?: Partial<ILazyDefineSettings>): void;
export {};
