import type { ISLitComponentDefineSettings } from '@coffeekraken/s-lit-component';
import type ISThemeSwitcherComponentProps from './SThemeSwitcherComponent.js';
import __SThemeSwitcherComponent from './SThemeSwitcherComponent.js';

export default function define(
    props: Partial<ISThemeSwitcherComponentProps> = {},
    tagName = 's-theme-switcher',
    settings?: ISLitComponentDefineSettings,
) {
    __SThemeSwitcherComponent.define(
        tagName,
        __SThemeSwitcherComponent,
        props,
        settings,
    );
}
