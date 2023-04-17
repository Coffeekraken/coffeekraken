import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISRangeComponentProps from './SRangeComponent';
import __SRangeComponent from './SRangeComponent';

export default function define(
    props: Partial<ISRangeComponentProps> = {},
    tagName = 's-range',
    settings?: ISLitComponentDefineSettings,
) {
    __SRangeComponent.define(tagName, __SRangeComponent, props, settings);
}
