import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISPanelComponentProps from './SPanelComponent.js';
import __SPanelComponent from './SPanelComponent.js';

export default function define(
    props: Partial<ISPanelComponentProps> = {},
    tagName = 's-panel',
    settings?: ISLitComponentDefineSettings,
) {
    __SPanelComponent.define(tagName, __SPanelComponent, props, settings);
}
