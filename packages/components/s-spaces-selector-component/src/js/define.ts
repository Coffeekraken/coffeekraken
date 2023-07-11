import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISSpacesSelectorComponentProps from './SSpacesSelectorComponent.js';
import __SSpacesSelectorComponent from './SSpacesSelectorComponent.js';

export default function define(
    props: Partial<ISSpacesSelectorComponentProps> = {},
    tagName = 's-spaces-selector',
    settings?: ISLitComponentDefineSettings,
) {
    __SSpacesSelectorComponent.define(
        tagName,
        __SSpacesSelectorComponent,
        props,
        settings,
    );
}
