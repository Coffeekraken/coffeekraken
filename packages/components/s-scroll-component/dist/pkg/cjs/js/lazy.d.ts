import type TWhenTrigger from '@coffeekraken/sugar/js/dom/detect/when';
interface ILazyDefineSettings {
    when: TWhenTrigger;
}
export declare function define(props: any, tagName?: string, settings?: Partial<ILazyDefineSettings>): void;
export {};
