import __SRangeComponent from './SRangeComponent';
import type ISRangeComponentProps from './SRangeComponent';

export default function define(
    props: Partial<ISRangeComponentProps> = {},
    tagName = 's-range',
) {
    __SRangeComponent.define(__SRangeComponent, props, tagName);
}
