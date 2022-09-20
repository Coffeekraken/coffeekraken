import type ISRangeComponentProps from './SRangeComponent';
import __SRangeComponent from './SRangeComponent';

export default function define(
    props: Partial<ISRangeComponentProps> = {},
    tagName = 's-range',
) {
    __SRangeComponent.define(tagName, __SRangeComponent, props);
}
