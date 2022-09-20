import type ISThemeSwitcherComponentProps from './SThemeSwitcherComponent';
import __SThemeSwitcherComponent from './SThemeSwitcherComponent';

export default function define(
    props: Partial<ISThemeSwitcherComponentProps> = {},
    tagName = 's-theme-switcher',
) {
    __SThemeSwitcherComponent.define(tagName, __SThemeSwitcherComponent, props);
}
