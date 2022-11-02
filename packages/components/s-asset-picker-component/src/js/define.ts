import type ISAssetPickerComponentProps from './SAssetPickerComponent';
import __SAssetPickerComponent from './SAssetPickerComponent';

export default function define(
    props: Partial<ISAssetPickerComponentProps> = {},
    tagName = 's-asset-picker',
) {
    __SAssetPickerComponent.define(tagName, __SAssetPickerComponent, props);
}
