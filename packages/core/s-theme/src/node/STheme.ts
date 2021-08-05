import __SClass from '@coffeekraken/s-class';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __get from '@coffeekraken/sugar/shared/object/get';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __SColor from '@coffeekraken/s-color';

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

export interface ISThemeLayout {
  container: Record<string, any>;
}

export interface ISThemesConfig {
  theme: string;
  cssVariables: string[];
  themes: Record<string, ISThemeConfig>;
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

export interface ISThemeLoopOnColorsColor {
  name: string;
  variant: string;
  state?: string;
  value: ISThemeColor;
}

export interface ISThemeLoopOnColorsCallback {
  (color: ISThemeLoopOnColorsColor): boolean | void;
}

export interface ISThemeColorModifiers {
  saturate: number;
  desaturate: number;
  lighten: number;
  darken: number;
  spin: number;
  alpha: number;
  grayscale: boolean;
}

export interface ISThemeColor {
  original?: ISThemeColor,
  color: string;
  variable: string;
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;
  a: number;
  modifiers?: ISThemeColorModifiers;
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
  name: string;

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
  static get theme(): string {
    return __SSugarConfig.get('theme.theme');
  }

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
  static get themes(): string[] {
    return Object.keys(__SSugarConfig.get('theme.themes'));
  }

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
    const themes = __SSugarConfig.get('theme.themes');
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

    if (!theme) {
      const sugarJsonInstance = new __SSugarJson();
      const sugarJson = sugarJsonInstance.read();
      // @ts-ignore
      if (sugarJson.theme) theme = sugarJson.theme;
      else theme = (<any>this.constructor).theme;
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
    } else {
      this.name = 'default';
    }
  }

  /**
   * @name        themes
   * @type        String
   * @get
   *
   * Store the themes configuration
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get themes() {
    return __SSugarConfig.get('theme.themes');
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
  get _config() {
    // @ts-ignore
    return __SSugarConfig.get('theme.themes')[this.name];
  }
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
   * @name        themesConfig
   * @type        ISThemesConfig
   * 
   * Get access to the themes configuration
   * 
   * @return      ISThemesConfig        The themes configuration
   * 
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  themesConfig(): ISThemesConfig {
    return __SSugarConfig.get('theme');
  }

  /**
   * @name        baseColors
   * @type        Function
   * 
   * This function returns a simple object with the base colors and their value
   * from the theme config.
   * 
   * @return      {Record<string, ISThemeColor>}          The simple base colors map object
   * 
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  baseColors(): Record<string, ISThemeColor> {
    const map = {};
    Object.keys(this._config.color).forEach(color => {
      const colorObj = this._config.color[color];
      if (!colorObj.color) return;
      const c = new __SColor(colorObj.color);
      map[color] = {
        color: colorObj.color,
        variable: `--s-theme-color-${color}`,
        r: c.r,
        g: c.g,
        b: c.b,
        h: c.h,
        s: c.s,
        l: c.l,
        a: c.a
      };
    });
    return map;
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
   * - variant    {String}        The name of the variant like "background", "surface", etc...
   * - state      {String}        The name of the state like "hover", "active", etc...
   * - value      {ISThemeColor}        The actual color object that
   *
   * @since             2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  loopOnColors(callback: ISThemeLoopOnColorsCallback): void {
    const colorsObj = this.config('color');
    let triggeredStop = false;

    Object.keys(colorsObj).forEach((colorName, i) => {
      if (triggeredStop) return;
      const colorObj = colorsObj[colorName];

      Object.keys(colorObj).forEach((variantOrStateName, j) => {
        if (triggeredStop) return;
      
        let state: string = '', variant: string = '', res;
      
        const val = colorObj[variantOrStateName];

        if (variantOrStateName === 'color') {
          const c = new __SColor(val);
          res = callback({
            name: colorName,
            variant: '',
            state: '',
            value: {
              color: val,
              variable: `--s-theme-color-${colorName}`,
              r: c.r,
              g: c.g,
              b: c.b,
              h: c.h,
              s: c.s,
              l: c.l,
              a: c.a
            }
          });
        } else if (val.a !== undefined && val.r !== undefined && val.g !== undefined && val.b !== undefined) {
          variant = variantOrStateName;

          res = callback(<ISThemeLoopOnColorsColor>{
            name: colorName,
            variant,
            state,
            value: val
          });
          if (res === false || res === -1) {
            triggeredStop = true;
          }

        } else {
          Object.keys(val).forEach(stateName => {
            res = callback(<ISThemeLoopOnColorsColor>{
              name: colorName,
              variant: variantOrStateName,
              state: stateName,
              value: val[stateName]
            });
            if (res === false || res === -1) {
              triggeredStop = true;
            }
          });
        }
      });
    });
  }
}
