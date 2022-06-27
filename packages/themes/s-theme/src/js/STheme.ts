import __SColor from '@coffeekraken/s-color';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __clearTransmations from '@coffeekraken/sugar/js/dom/transmation/clearTransmations';
import __SThemeBase from '../shared/SThemeBase';

/**
 * @name            STheme
 * @namespace       js
 * @type            Class
 * @extends         SThemeBase
 *
 * This class represent the sugar theme you've passed the name in the constructor.
 * Once you have an instance of this theme you will have access to a lot of utilities
 * methods like "loopOnColors", etc...
 *
 * @param       {String}        [theme=undefined]        The name of the theme you want to instanciate utilities for. If not specified, will take either the "default" theme, or the theme defined in the sugar.json file
 *
 * @example         js
 * import STheme from '@coffeekraken/s-theme';
 * const theme = new STheme();
 * theme.loopOnColors(({name, modifier, value}) => {
 *      // do something...
 * });
 *
 * @event       s-theme.change          Dispatched when the theme has been changed
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class STheme extends __SThemeBase {
    /**
     * @name            setTheme
     * @type            Function
     * @static
     *
     * This method allows you to set the current applied theme and get back an STheme instance
     *
     * @param               {String}            theme           The theme name to apply
     * @param               {String}            variant         The theme variant to apply
     * @param               {HTMLElement}       [$context=document.querySelector('html')]            The context element on which to apply the theme
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static setTheme(
        theme?: string,
        variant?: string,
        $context = document.querySelector('html'),
    ): STheme {
        __clearTransmations(document.querySelector('html'), {
            timeout: 100,
        });

        if (theme && variant) {
            $context.setAttribute('theme', `${theme}-${variant}`);
        } else if (theme) {
            $context.setAttribute('theme', `${theme}-light`);
        } else if (variant) {
            $context.setAttribute('theme', `default-${variant}`);
        }

        const currentTheme = this.getCurrentTheme($context);

        // dispatch a change event
        document.dispatchEvent(
            new CustomEvent('s-theme.change', {
                detail: {
                    theme: currentTheme,
                },
            }),
        );

        return currentTheme;
    }

    /**
     * @name            setThemeVariant
     * @type            Function
     * @static
     *
     * This method allows you to set the current applied theme variant and get back an STheme instance
     *
     * @param               {String}            variant         The theme variant to apply
     * @param               {HTMLElement}       [$context=document.querySelector('html')]            The context element on which to apply the theme
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static setThemeVariant(
        variant: string,
        $context = document.querySelector('html'),
    ): STheme {
        return this.setTheme(undefined, variant, $context);
    }

    /**
     * @name            init
     * @type            Function
     * @static
     *
     * This method allows you to init the your STheme instance, restore savec updated if their some, etc...
     *
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static init($context = document.querySelector('html')): STheme {
        const theme = this.getCurrentTheme($context);
        if (!document.env) document.env = {};
        if (!document.env.SUGAR) document.env.SUGAR = {};
        document.env.SUGAR.theme = theme;
        return theme;
    }

    /**
     * @name            getCurrentTheme
     * @type            Function
     * @static
     *
     * This method allows you to get the current applied theme STheme instance
     *
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getCurrentTheme($context = document.querySelector('html')): STheme {
        const theme = __SSugarConfig.get('theme.theme');
        const variant = __SSugarConfig.get('theme.variant');

        if (!$context.hasAttribute('theme')) {
            return <STheme>this.getTheme(theme, variant);
        }

        let attr = $context.getAttribute('theme') ?? '',
            parts = attr.split('-').map((l) => l.trim());

        if (parts.length === 2) {
            return <STheme>this.getTheme(parts[0], parts[1]);
        }

        const themes = __SSugarConfig.get('theme.themes');
        for (let [key, value] of Object.entries(themes)) {
            if (
                key === `${parts[0]}-${variant}` ||
                key === `${theme}-${parts[0]}`
            ) {
                const p = key.split('-').map((l) => l.trim()),
                    t = p[0],
                    v = p[1];
                return <STheme>this.getTheme(t, v);
            }
        }

        throw new Error(
            `The requested current theme with the "theme" attribute "${$context.getAttribute(
                'theme',
            )}" on the context "${$context}" does not exists...`,
        );
    }

    /**
     * @name            applyCurrentColor
     * @type            Function
     * @static
     *
     * This static method allows you to apply a color on a particular context
     *
     * @param       {String}        color               The color name/code you want to apply
     * @param       {HTMLElement}       [$context=document.querySelector('html')]        The context on which to apply the color
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static applyCurrentColor(
        color: string,
        $context = document.querySelector('html'),
    ): void {
        const vars = this.remapCssColor('current', color);
        for (let [key, value] of Object.entries(vars.properties)) {
            // @ts-ignore
            $context.style.setProperty(key, value);
        }
    }

    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(theme?: string, variant?: string) {
        super(theme, variant);
        // apply the theme on dom element
        // this.constructor.setTheme(this.theme, this.variant);
        // restore the theme
        this.restore();
    }

    /**
     * @name            setColor
     * @type            Function
     *
     * THis method allows you to set a color for the theme that represent this instance
     *
     * @param           {String}            color                   The color you want to set
     * @param           {String}            value                   The color value you want to set
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    setColor(color: string, value: string): void {
        // set color in config
        this.set(`color.${color}.color`, value);
    }

    /**
     * @name            set
     * @type            Function
     *
     * This method allows you to set a value of the current theme.
     * Specify the value you want to set using the dotPath syntax like "color.accent.color", etc...
     *
     * @param       {String}        dotPath           The dot path of the config you want to set
     * @param       {any}           value               The value you want to set
     * @return      {STheme}                        The current theme instance
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    set(dotPath: string, value: any): SThemeBase {
        // set in super class
        super.set(dotPath, value);
        // apply overrided configs
        this.applyOverridedConfigs();
        // save the config
        this.save();
        // maintain chainability
        return this;
    }

    /**
     * @name            getColor
     * @type            Function
     *
     * THis method allows you to access a particular theme color in a particular context
     *
     * @param           {String}            name            The color name you want to get
     * @param           {String}            [variant=null]     The color variant you want to get
     * @param           {HTMLElement}       [$context=document.querySelector('html')]        The context in which to get the color
     * @return          {SColor}                                    An SColor instance that you can make use of
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getColor(
        name: string,
        variant?: string,
        $context = document.querySelector('html'),
    ): __SColor {
        const $elm = document.createElement('p');
        $elm.classList.add(`s-bg--${name}${variant ? `-${variant}` : ''}`);
        const $wrapper = document.createElement('div');
        $wrapper.setAttribute('hidden', 'true');
        $wrapper.setAttribute('theme', this.theme);
        $wrapper.setAttribute('variant', this.variant);
        $wrapper.appendChild($elm);
        $context.appendChild($wrapper);
        const style = getComputedStyle($elm);
        const color = new __SColor(style.backgroundColor);
        $wrapper.remove();
        return color;
    }

    /**
     * @name            applyOverridedConfigs
     * @type            Function
     *
     * This method allows you to apply the overrided configs on your dom context.
     *
     * @param       {HTMLElement}       $context       The dom context on which to apply the overrided configs
     * @return      {STheme}              The current instance
     *
     * @since       2.0.0
     *
     */
    applyOverridedConfigs(
        $context: HTMLElement = document.querySelector('html'),
    ): STheme {
        const properties = __SThemeBase.jsConfigObjectToCssProperties(
            this.getOverridedConfig(),
        );

        if (!$context._sThemeOverridedConfigs) {
            $context._sThemeOverridedConfigs = {};
        }

        if (!$context._sThemeOverridedConfigs[this.id]) {
            $context._sThemeOverridedConfigs[this.id] = document.createElement(
                'style',
            );
            $context._sThemeOverridedConfigs[this.id].setAttribute(
                'id',
                this.id,
            );
            $context.appendChild($context._sThemeOverridedConfigs[this.id]);
        }

        $context._sThemeOverridedConfigs[this.id].innerHTML = `
            [theme="${this.theme}-${this.variant}"] {
                ${properties.join('\n')}
            }
        `;

        return this;
    }

    /**
     * @name            save
     * @type            Function
     *
     * This method allows you to save locally the current theme with the changes applied using the `set` method.
     * The theme will be savec in localStorage and restored on page load to apply updates correctly
     *
     * @return      {STheme}                                The current theme instance
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _saveTimeout;
    save(): STheme {
        clearTimeout(this._saveTimeout);
        this._saveTimeout = setTimeout(() => {
            // save in localStorage
            localStorage.setItem(
                `s-theme-${this.id}`,
                JSON.stringify(this.getOverridedConfig()),
            );
            // emit saved event
            this.emitSavedEvent();
        }, 500);
        // maintain chainability
        return this;
    }

    /**
     * @name            restore
     * @type            Function
     *
     * This method allows you to restore locally the current theme with the changes applied using the `set` method.
     *
     * @return      {STheme}                                The current theme instance
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    restore(): STheme {
        let savedConfigs = {};
        // get from localStorage
        try {
            savedConfigs = JSON.parse(
                // @ts-ignore
                localStorage.getItem(`s-theme-${this.id}`),
            );
        } catch (e) {}

        // restore configs
        super.restore(savedConfigs);
        // apply the configs
        this.applyOverridedConfigs();
        // maintain chainability
        return this;
    }

    /**
     * @name            clear
     * @type            Function
     *
     * This method allows you to clear locally the current theme with the changes applied using the `set` method.
     *
     * @return      {STheme}                                The current theme instance
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    clear(): STheme {
        // delete the local storage
        localStorage.removeItem(`s-theme-${this.id}`);
        // clear in super class
        super.clear();
        // apply the configs
        this.applyOverridedConfigs();
        // set theme again to dispatch event
        this.constructor.setTheme();
        // maintain chainability
        return this;
    }
}
