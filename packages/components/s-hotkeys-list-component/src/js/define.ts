import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISHotkeysListComponentProps from './SHotkeysListComponent.js';
import __SHotkeysListComponent from './SHotkeysListComponent.js';

export default function define(
    props: Partial<ISHotkeysListComponentProps> = {},
    tagName = 's-hotkeys-list',
    settings?: ISLitComponentDefineSettings,
) {
    __SHotkeysListComponent.define(
        tagName,
        __SHotkeysListComponent,
        props,
        settings,
    );
}
