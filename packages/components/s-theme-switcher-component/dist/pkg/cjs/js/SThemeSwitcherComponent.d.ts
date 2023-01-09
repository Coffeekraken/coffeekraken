import __SLitComponent from '@coffeekraken/s-lit-component';
import __define from './define';
export interface ISThemeSwitcherComponentProps {
    darkModeIcon: boolean;
    darkModeIconClass: string;
}

export default class SThemeSwitcherComponent extends __SLitComponent {
    static get properties(): any;
    static get styles(): import("lit").CSSResult;
    _themes: any;
    constructor();
    _toggleDarkMode(): void;
    _setTheme(theme: string): void;
    render(): import("lit-html").TemplateResult<1>;
}
export { __define as define };
