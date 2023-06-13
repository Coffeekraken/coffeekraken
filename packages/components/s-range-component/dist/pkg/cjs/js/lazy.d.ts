import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type { TWhenTrigger } from '@coffeekraken/sugar/dom';
interface ILazyDefineSettings extends ISLitComponentDefineSettings {
    when: TWhenTrigger;
}
export declare function define(props: any, tagName?: string, settings?: Partial<ILazyDefineSettings>): void;
export {};
