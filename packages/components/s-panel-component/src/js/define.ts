import __SPanelComponent from './SPanelComponent';
import type ISPanelComponentProps from './SPanelComponent';

export default function define(
    props: Partial<ISPanelComponentProps> = {},
    tagName = 's-panel',
) {
    __SPanelComponent.define(__SPanelComponent, props, tagName);
}
