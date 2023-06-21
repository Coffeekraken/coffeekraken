import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISHotkeysListComponentProps from './SHotkeysListComponent';
import __SHotkeysListComponent from './SHotkeysListComponent';

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
