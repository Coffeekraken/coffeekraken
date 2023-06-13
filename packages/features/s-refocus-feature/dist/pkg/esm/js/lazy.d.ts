import type { TWhenTrigger } from '@coffeekraken/sugar/dom';
interface ILazyDefineSettings {
    when: TWhenTrigger;
}
export declare function define(props: any, name?: string, settings?: Partial<ILazyDefineSettings>): void;
export {};
