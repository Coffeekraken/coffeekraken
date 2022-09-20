import type ISPanelComponentProps from './SPanelComponent';
import __SPanelComponent from './SPanelComponent';

export default function define(
    props: Partial<ISPanelComponentProps> = {},
    tagName = 's-panel',
) {
    __SPanelComponent.define(tagName, __SPanelComponent, props);
}
