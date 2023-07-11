import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISGoogleMapComponentProps from './SGoogleMapComponent.js';
import __SGoogleMapWebcomponent from './SGoogleMapComponent.js';

export default function define(
    props: Partial<ISGoogleMapComponentProps> = {},
    tagName = 's-google-map',
    settings?: ISLitComponentDefineSettings,
) {
    __SGoogleMapWebcomponent.define(
        tagName,
        __SGoogleMapWebcomponent,
        props,
        settings,
    );
}
