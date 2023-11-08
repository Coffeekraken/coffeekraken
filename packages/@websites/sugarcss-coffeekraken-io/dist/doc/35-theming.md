<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- body -->

<!--
/**
* @name            08. Theming
* @namespace       doc
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation           /doc/theming
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

> Make sure to be confortable with the [configuration systen](/doc/configuration) before reading this.

# Theming

Theming in Coffeekraken is a central part to help you decline your websites into themes like `dark`, `light`, and whatever you want.

## Existing themes

Some theme(s) are available out of the box. These themes (parts) are useful to avoid starting from scratch but you can of course override everything you want during your development process.

-   `theme.config.ts`: Main theme file where all the available themes are listed as well as which theme is active.
-   `themeBase.config.ts`: Main configuration file that can be used as a base for your theme to avoid rewriting everything.
-   `themeDefault.config.ts`: Define the `default` theme
-   `themeDefaultLight.config.ts`: Extends the `themeBase.config.ts` configuration and define some settings fot the default light theme.
-   `themeDefaultDark.config.ts`: Extends the `themeBase.config.ts` configuration and define some settings fot the default dark theme.

Here's the complete list of available theme configuration files:

- [`themeUi.config.ts`](/config/explorer/themeUi)
- [`theme.config.ts`](/config/explorer/theme)
- [`themeBase.config.ts`](/config/explorer/themeBase)
- [`themeBorder.config.ts`](/config/explorer/themeBorder)
- [`themeClassmap.config.ts`](/config/explorer/themeClassmap)
- [`themeCoffeekraken.config.ts`](/config/explorer/themeCoffeekraken)
- [`themeCoffeekrakenDark.config.ts`](/config/explorer/themeCoffeekrakenDark)
- [`themeCoffeekrakenLight.config.ts`](/config/explorer/themeCoffeekrakenLight)
- [`themeCoffeekrakenLight.js.config.ts`](/config/explorer/themeCoffeekrakenLight.js)
- [`themeColor.config.ts`](/config/explorer/themeColor)
- [`themeColorSchemaDark.config.ts`](/config/explorer/themeColorSchemaDark)
- [`themeColorSchemaLight.config.ts`](/config/explorer/themeColorSchemaLight)
- [`themeDefault.config.ts`](/config/explorer/themeDefault)
- [`themeDefaultDark.config.ts`](/config/explorer/themeDefaultDark)
- [`themeDefaultLight.config.ts`](/config/explorer/themeDefaultLight)
- [`themeDepth.config.ts`](/config/explorer/themeDepth)
- [`themeEasing.config.ts`](/config/explorer/themeEasing)
- [`themeFont.config.ts`](/config/explorer/themeFont)
- [`themeGradient.config.ts`](/config/explorer/themeGradient)
- [`themeHeight.config.ts`](/config/explorer/themeHeight)
- [`themeHelpers.config.ts`](/config/explorer/themeHelpers)
- [`themeLayout.config.ts`](/config/explorer/themeLayout)
- [`themeLod.config.ts`](/config/explorer/themeLod)
- [`themeMargin.config.ts`](/config/explorer/themeMargin)
- [`themeMedia.config.ts`](/config/explorer/themeMedia)
- [`themeOffsize.config.ts`](/config/explorer/themeOffsize)
- [`themeOpacity.config.ts`](/config/explorer/themeOpacity)
- [`themePadding.config.ts`](/config/explorer/themePadding)
- [`themePartytown.config.ts`](/config/explorer/themePartytown)
- [`themeRatio.config.ts`](/config/explorer/themeRatio)
- [`themeScalable.config.ts`](/config/explorer/themeScalable)
- [`themeScale.config.ts`](/config/explorer/themeScale)
- [`themeScroll.config.ts`](/config/explorer/themeScroll)
- [`themeShadesDark.config.ts`](/config/explorer/themeShadesDark)
- [`themeShadesLight.config.ts`](/config/explorer/themeShadesLight)
- [`themeSize.config.ts`](/config/explorer/themeSize)
- [`themeSpace.config.ts`](/config/explorer/themeSpace)
- [`themeTiming.config.ts`](/config/explorer/themeTiming)
- [`themeTransition.config.ts`](/config/explorer/themeTransition)
- [`themeTypo.config.ts`](/config/explorer/themeTypo)
- [`themeWidth.config.ts`](/config/explorer/themeWidth)
- [`themeWireframe.config.ts`](/config/explorer/themeWireframe)

## Main entry point

Everything about theming starts with some configuration files.

The main one is the `theme.config.ts` file that looks something like this:

```js
export default function () {
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

## Make your own

The simpliest way to theme your app/website, etc, is to update the `default-(light|dark)` theme by overriding configurations like so:

#### Updating the colors

Create a file called `.sugar/themeColor.config.ts` and update the colors like so:

```js
export default () => {
  return {
    // supported syntax: hex/hexa/hsl/hsla
    base: 'hsl(55,39,50)',
    main: '...',
    accent: '...',
    complementary: '...',
    success: '...',
    info: '...',
    warning: '...',
    error: '...',
  };
};

```

#### Updating the color shades

Create a file called `.sugar/themeShades(Light|Dark).config.ts` and update the schemas like so:

```js
export default () => {
  return {
    text: {
      darken: 20,
    },
    surface: {
      lighten: 40,
    },
  };
};

```

## Defining a new theme

To define a new theme, simply create a new configuration file under `.sugar/themeAwesome.config.ts` with a content like so:

```js
export default function (api) {
  return {
    // specify the theme name that you will use to active it for your website
    themeName: 'awesome',
    // specify some variants like dark, light, etc...
    variants: {
      dark: {
        // extends from the themeDefaultDark (optional)
        ...api.config.themeDefaultDark,

        // specify the transitions you want for your theme
        transition: {
          slow: 'all .6s easeInOut',
          default: 'all .3s easeInOut',
          fast: 'all .1s easeInOut',
        },
      },
      light: {
        // ...theme light configurations
      },
    },
  };
}

```

> Note that the theming system is based on the [@coffeekraken/s-sugar-config](/package/@coffeekraken/s-sugar-config/doc/readme) package used across the entire echosystem...

