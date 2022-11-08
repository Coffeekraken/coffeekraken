import type ISGoogleMapComponentProps from './SGoogleMapComponent';
import __SGoogleMapWebcomponent from './SGoogleMapComponent';

export default function define(
    props: Partial<ISGoogleMapComponentProps> = {},
    tagName = 's-google-map',
) {
    __SGoogleMapWebcomponent.define(tagName, __SGoogleMapWebcomponent, props);
}
