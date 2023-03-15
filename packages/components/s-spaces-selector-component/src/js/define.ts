import type ISSpacesSelectorComponentProps from './SSpacesSelectorComponent';
import __SSpacesSelectorComponent from './SSpacesSelectorComponent';

export default function define(
    props: Partial<ISSpacesSelectorComponentProps> = {},
    tagName = 's-spaces-selector',
) {
    __SSpacesSelectorComponent.define(
        tagName,
        __SSpacesSelectorComponent,
        props,
    );
}
