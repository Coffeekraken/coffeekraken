import __SClass from '@coffeekraken/s-class';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __get from '@coffeekraken/sugar/shared/object/get';
import __SSugarJson from '@coffeekraken/s-sugar-json';

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

export interface ISThemeLayout {
  container: Record<string, any>;
}

export interface ISThemeConfig {
  layout: ISThemeLayout;
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

export default class STheme extends __SClass {
  /**
   * @name        name
   * @type        String
   *
   * Store the theme name that this instance represent
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  name: String;

  /**
   * @name        _config
   * @type        String
   *
   * Store the current theme configuration
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _config: any;

  /**
   * @name        themes
   * @type        String
   *
   * Store the themes configuration
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  themes: any;

  /**
   * @name      theme
   * @type      String
   * @static
   *
   * Store the current theme setted in the config.theme namespace
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static theme: string = __sugarConfig('theme.theme');

  /**
   * @name      themes
   * @type      String
   * @static
   *
   * Store the names of all the available themes
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static themes: string[] = Object.keys(__sugarConfig('theme.themes'));

  /**
   * @name        getTheme
   * @type        Function
   * @static
   *
   * This static method allows you to get quicky an STheme instance of the passed theme.
   * It will also check if an instance already exists for this theme and return it if so...
   *
   * @param     {String}    theme       The name of theme you want an STheme instance back for
   * @return    {STheme}              An instance of the STheme class representing the requested theme
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static _instanciatedThemes: Record<string, STheme> = {};
  static getTheme(theme: string): STheme {
    if (this._instanciatedThemes[theme]) return this._instanciatedThemes[theme];
    const themes = __sugarConfig('theme.themes');
    if (!themes[theme])
      throw new Error(
        `<red>[${
          this.name
        }]</red> Sorry but the requested theme "<yellow>${theme}</yellow>" does not exists. Here's the available themes: <green>${Object.keys(
          themes
        ).join(',')}</green>`
      );
    this._instanciatedThemes[theme] = new STheme(theme);
    return this._instanciatedThemes[theme];
  }

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

    this.themes = __sugarConfig('theme.themes');

    if (!theme) {
      const sugarJsonInstance = new __SSugarJson();
      const sugarJson = sugarJsonInstance.read();
      // @ts-ignore
      if (sugarJson.theme) theme = sugarJson.theme ?? 'default';
    }

    if (theme && Object.keys(this.themes).indexOf(theme) === -1) {
      throw new Error(
        `<red>[${
          this.constructor.name
        }]</red> Sorry but the theme "${theme}" you've passed in constructor does not exists... Here's the list of actual available themes: ${Object.keys(
          this.themes.themes
        ).join(',')}`
      );
    } else if (theme) {
      this.name = theme;
      this._config = this.themes[theme];
    } else {
      this.name = 'default';
      this._config = this.themes.default;
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
    const value = __get(this._config, dotPath);
    if (value === undefined) {
      throw new Error(
        `<red>[${this.constructor.name}]</red> Sorry but the requested "<yellow>${this.name}</yellow>" theme config "<cyan>${dotPath}</cyan>" does not exists...`
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
