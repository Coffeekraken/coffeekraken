import __SClass from '@coffeekraken/s-class';
import __sugarJson from '@coffeekraken/sugar/node/sugar/sugarJson';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __get from '@coffeekraken/sugar/shared/object/get';

/**
 * @name            STheme
 * @namespace       node
 * @type            Class
 * @extends         SClass
 *
 * This class represent the sugar theme you've passed the name in the constructor.
 * Once you have an instance of this theme you will have access to a lot of utilities
 * methods like "loopOnColors", etc...
 *
 * @param       {String}        [theme=undefined]        The name of the theme you want to instanciate utilities for. If not specified, will take either the "default" theme, or the theme defined in the sugar.json file
 *
 * @example         js
 * import STheme from '@coffeekraken/s-theme';
 * const theme = new STheme();
 * theme.loopOnColors(({name, modifier, value}) => {
 *      // do something...
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISThemeFontFamilyStack {
  [key: string]: ISThemeFontFamily;
}

export interface ISThemeFontFamily {
  import?: string;
  'font-family': string;
  'font-weight'?: string;
  'font-style'?: string;
  'font-display'?: string;
  'cap-height'?: number;
}

export interface ISThemeFont {
  family: ISThemeFontFamilyStack;
}

export interface ISThemeUi {
  [key: string]: any;
}

export interface ISThemeMediaQuery {
  'min-width'?: string | number;
  'max-width'?: string | number;
  'min-height'?: string | number;
  'max-height'?: string | number;
  width?: string | number;
  height?: string | number;
  orientation?: 'landscape' | 'portrait';
  'any-hover'?: any;
  'any-pointer'?: any;
  'aspect-ratio'?: number;
  color?: any;
  'color-gamut'?: any;
  'color-index'?: any;
  grid?: any;
  'inverted-colors'?: any;
  'light-level'?: any;
  'max-aspect-ratio'?: number;
  'max-color'?: any;
  'max-color-index'?: any;
  'max-monochrome'?: any;
  'max-resolution'?: any;
  'min-aspect-ratio'?: any;
  'min-color'?: any;
  'min-color-index'?: any;
  'min-monochrome'?: any;
  'min-resolution'?: any;
  monochrome?: any;
  'overflow-block'?: any;
  'overflow-inline'?: any;
  pointer?: any;
  resolution?: any;
  scan?: any;
  scripting?: any;
  update?: any;
}

export interface ISThemeMediaQueries {
  [key: string]: ISThemeMediaQuery;
}

export interface ISThemeMedia {
  defaultAction: '>' | '<' | '=' | '>=' | '<=';
  defaultQuery: string;
  queries: ISThemeMediaQueries;
}

export interface ISThemeLoopOnColorsColor {
  name: string;
  modifier: string;
  value: string;
  previous: ISThemeLoopOnColorsColor;
  next: ISThemeLoopOnColorsColor;
}

export interface ISThemeConfig {
  transition: Record<string | number, string>;
  ratio: Record<string, number>;
  depth: Record<string | number, string>;
  colorModifier: Record<string | number, string>;
  color: Record<string, Record<string | number, string>>;
  size: Record<string | number, string>;
  font: ISThemeFont;
  ui: ISThemeUi;
  media: ISThemeMedia;
}

export interface ISThemesConfig {
  baseTheme: string;
  themes: Record<string, ISThemeConfig>;
}

export default class STheme extends __SClass {
  /**
   * @name        themeName
   * @type        String
   *
   * Store the theme name that this instance represent
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  themeName: String;

  /**
   * @name        themeConfig
   * @type        String
   *
   * Store the current theme configuration
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  themeConfig: any;

  /**
   * @name        themesConfig
   * @type        String
   *
   * Store the themes configuration
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  themesConfig: any;

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(theme?: string) {
    super({});

    this.themesConfig = __sugarConfig('theme');

    if (!theme) {
      const sugarJson = __sugarJson();
      // @ts-ignore
      if (sugarJson.theme) theme = sugarJson.theme ?? 'default';
    }

    if (theme && Object.keys(this.themesConfig.themes).indexOf(theme) === -1) {
      throw new Error(
        `<red>[${
          this.constructor.name
        }]</red> Sorry but the theme "${theme}" you've passed in constructor does not exists... Here's the list of actual available themes: ${Object.keys(
          this.themesConfig.themes
        ).join(',')}`
      );
    } else if (theme) {
      this.themeName = theme;
      this.themeConfig = this.themesConfig.themes[theme];
    } else {
      this.themeName = 'default';
      this.themeConfig = this.themesConfig.themes.default;
    }
  }

  /**
   * @name          config
   * @type          Function
   *
   * This method allows you to access a value of the current theme
   * using a dot path like "color.primary.default", etc...
   *
   * @param         {String}        dotPath         The dot path of the config you want to get
   * @return        {Any}                           The value of the getted configuration
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  config(dotPath): any {
    const value = __get(this.themeConfig, dotPath);
    if (value === undefined) {
      throw new Error(
        `<red>[${this.constructor.name}]</red> Sorry but the requested "<yellow>${this.themeName}</yellow>" theme config "<cyan>${dotPath}</cyan>" does not exists...`
      );
    }
    return value;
  }

  /**
   * @name        loopOnThemeColors
   * @type        Function
   *
   * This utility function allows you to loop quickly and efficiently on
   * theme colors and their's modifiers defined
   *
   * @param       {Function}      callback            Specify the callback that will be called for each color with an object containing these properties:
   * - name       {String}        The name of the color like "primary", "secondary", etc...
   * - modifier   {String}        The name of the modifier like "default", "10", "20", etc...
   * - value      {String}        The actual color value
   * - previous   {ISThemeLoopOnColorsColor}        The previous color object. If the current color is the first one, the previous will be the last one.
   * - next       {ISThemeLoopOnColorsColor}        The next color object. If the current color is the last one, the next will be the first one.
   *
   * @since             2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  loopOnColors(callback): void {
    const colorsObj = this.config('color');
    let triggeredStop = false;

    Object.keys(colorsObj).forEach((colorName, i) => {
      if (triggeredStop) return;
      const colorObj = colorsObj[colorName];

      Object.keys(colorObj).forEach((modifierName, j) => {
        if (triggeredStop) return;

        const lastKey = Object.keys(colorObj).pop();
        const firstKey = Object.keys(colorObj)[0];
        const previousKey = j === 0 ? lastKey : Object.keys(colorObj)[j - 1];
        const nextKey =
          j >= Object.keys(colorObj).length - 1
            ? firstKey
            : Object.keys(colorObj)[j];

        let previous = {
          name: colorName,
          modifier: previousKey,
          // @ts-ignore
          value: colorObj[previousKey]
        };
        let next = {
          name: colorName,
          modifier: nextKey,
          value: colorObj[nextKey]
        };
        // console.log(modifierName, j);

        const res = callback(<ISThemeLoopOnColorsColor>{
          name: colorName,
          modifier: modifierName,
          value: colorObj[modifierName],
          previous,
          next
        });
        if (res === false || res === -1) {
          triggeredStop = true;
        }
      });
    });
  }
}
