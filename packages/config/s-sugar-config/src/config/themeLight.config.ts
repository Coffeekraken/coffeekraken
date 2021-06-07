export default {
  extends: 'themeBase',

  color: {
    /**
     * @name                default
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #848e91
     *
     * Specify the <default>default</default> color value and modifiers.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    default: {
      default: '#848e91'
    },

    /**
     * @name                ui
     * @namespace           config.theme.themes.ui.color
     * @type                Color
     * @ui             #BDBDBD
     *
     * Specify the <ui>ui</ui> color value and modifiers.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    ui: {
      default: '#BDBDBD'
    },

    /**
     * @name                title
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #2b3438
     *
     * Specify the <title>title</title> color value and modifiers.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    title: {
      default: '#2b3438'
    },

    /**
     * @name                text
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #848e91
     *
     * Specify the <text>text</text> color value and modifiers.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    text: {
      default: '#848e91'
    },

    /**
     * @name                link
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             primary
     *
     * Specify the <link>link</link> color value and modifiers.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    link: {
      default: '#f2bc2b'
    },

    /**
     * @name                primary
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #f2bc2b
     *
     * Specify the <primary>primary</primary> color value and modifiers.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    primary: {
      default: '#f2d72b',
      text: '--darken 30',
      highlight: '--lighten 0',
      surface: '--lighten 45',
      foreground: '--darken 0',
      ':hover': {
        surface: '--lighten 35',
        foreground: '--darken 40'
      },
      ':focus': {
        surface: '--lighten 20',
        foreground: '--darken 40'
      },
      ':active': {
        surface: '--lighten 0',
        foreground: '--lighten 50'
      }
    },

    /**
     * @name                secondary
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #2b3438
     *
     * Specify the <secondary>secondary</secondary> color value and modifiers.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    secondary: {
      default: '#6d858f'
    },

    /**
     * @name                surface
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #ffffff
     *
     * Specify the <surface>surface</surface> color value and modifiers.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    surface: {
      default: '#ffffff'
    },

    /**
     * @name                background
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #FAFAFA
     *
     * Specify the <background>background</background> color value and modifiers.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    background: {
      default: '#FAFAFA'
    },

    /**
     * @name                success
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #5cb85c
     *
     * Specify the <success>success</success> color value and modifiers.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    success: {
      default: '#5cb85c'
    },

    /**
     * @name                warning
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #f0ad4e
     *
     * Specify the <warning>warning</warning> color value and modifiers.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    warning: {
      default: '#f0ad4e'
    },

    /**
     * @name                error
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #d9534f
     *
     * Specify the <error>error</error> color value and modifiers.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    error: {
      default: '#d9534f'
    },

    /**
     * @name                info
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #2199e8
     *
     * Specify the <info>info</info> color value and modifiers.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    info: {
      default: '#2199e8'
    },

    /**
     * @name                extension
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #2b3438
     *
     * Specify the <primary>extension</primary> color value and modifiers.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    extension: {
      default: '[config.theme.themes.default.color.primary.default]',
      blade: '#ff2d20',
      php: '#8892BF',
      js: '#f7df1e',
      node: '#68A063',
      css: '#498FE1',
      scss: '#CF649A',
      sass: '#CF649A',
      json: '#000000',
      jpg: '#B2C0E1',
      jpeg: '#B2C0E1',
      pdf: '#E7786E',
      doc: '#60D7FD',
      psd: '#F9D659',
      mp3: '#E98C61',
      png: '#C29DFB',
      aac: '#B1C5C9',
      zip: '#9CC04E',
      dmg: '#E36E4B'
    }
  }
};
