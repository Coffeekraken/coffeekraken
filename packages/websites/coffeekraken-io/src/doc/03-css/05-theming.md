<!--
/**
 * @name            Theming
 * @namespace       doc.css
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / CSS           /doc/css/theming
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

> Make sure to be confortable with the [configuration systen](/doc/config/overview) before reading this.

# Theming

Theming in Coffeekraken is a central part to help you decline your websites into themes like `dark`, `light`, and whatever you want.

## Existing themes

Some theme(s) are available out of the box. These themes (parts) are useful to avoid starting from scratch but you can of course override everything you want during your development process.

-   `theme.config.ts`: Main theme file where all the available themes are listed as well as which theme is active.
-   `themeBase.config.ts`: Main configuration file that can be used as a base for your theme to avoid rewriting everything.
-   `themeLightBase.config.ts`: Extends `themeBase.config.ts` configuration and define some base settings for light themes.
-   `themeDarkBase.config.ts`: Extends `themeBase.config.ts` configuration and define some base settings for light themes.
-   `themeDefault.config.ts`: Define the `default` theme
-   `themeDefaultLight.config.ts`: Extends the `themeLightBase.config.ts` configuration and define some settings fot the default light theme.
-   `themeDefaultDark.config.ts`: Extends the `themeDarkBase.config.ts` configuration and define some settings fot the default dark theme.

## Main entry point

Everything about theming starts with some configuration files.

The main one is the `theme.config.ts` file that looks something like this:

```js
export default function (env, config) {
    return {
        // Specify the theme name to use by default
        theme: 'default',
        // Specify the theme variant to use by default
        variant: 'light',
    };
}
```

This configuration assume that the theme `default` exists and has a `light` variant defined.

> Note that this `default` theme is the one used out of the box.

## Defining a new theme

To define a new theme, simply create a new configuration file under `.sugar/myTheme.config.ts` with a content like so:

```js
export default function (env, config) {
    return {
        // specify the theme name that you will use to active it for your website
        themeName: 'mytheme',
        // specify some variants like dark, light, etc...
        variants: {
            dark: {
                // specify that your theme is based on the themeDarkBase (optional)
                extends: 'themeDarkBase'
                // specify the transitions you want for your theme
                transition: {
                    slow: 'all .6s easeInOut',
                    default: 'all .3s easeInOut',
                    fast: 'all .1s easeInOut',
                },
                // ...all the others configuration you want to override from themeDarkBase
            },
            light: {
                // ...theme light configurations
            }
        },
    };
}
```

## Overriding some settings

Let's admit that you use the `default` theme with the `light` variant and you want to update the `main` color. Here's how to do it:

1. Create a file `.sugar/themeDefaultLight.config.ts`
2. Fill you new file like so:

```js
export default (env, config) => {
    return {
        color: {
            main: {
                color: 'hsl(156,50,50)',
            },
        },
    };
};
```

{{/layout-doc }}
