import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISGaugeComponentProps from './SGaugeComponent.js';
import __SGaugeComponent from './SGaugeComponent.js';

export default function define(
    props: Partial<ISGaugeComponentProps> = {},
    tagName = 's-gauge',
    settings?: ISLitComponentDefineSettings,
) {
    __SGaugeComponent.define(tagName, __SGaugeComponent, props, settings);
}
