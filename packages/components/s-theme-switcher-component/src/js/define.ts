import __SThemeSwitcherComponent from './SThemeSwitcherComponent';
import type ISThemeSwitcherComponentProps from './SThemeSwitcherComponent';

export default function define(
    props: Partial<ISThemeSwitcherComponentProps> = {},
    tagName = 's-theme-switcher',
) {
    __SThemeSwitcherComponent.define(__SThemeSwitcherComponent, props, tagName);
}
