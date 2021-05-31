export default {
  extends: 'base',

  color: {
    /**
     * @name                default
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #ffffff
     *
     * Specify the <s-color="default">default</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    default: {
      default: '#ffffff'
    },

    /**
     * @name                text
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #848e91
     *
     * Specify the <s-color="text">text</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    text: {
      default: '#848e91'
    },

    /**
     * @name                title
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #2b3438
     *
     * Specify the <s-color="title">title</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    title: {
      default: '#2b3438'
    },

    /**
     * @name                link
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             [config.theme.themes.dark.color.accent]
     *
     * Specify the <s-color="link">link</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    link: {
      default: '[config.theme.themes.dark.color.accent]'
    },

    /**
     * @name                ui
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #474059
     *
     * Specify the <s-color="ui">ui</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    ui: {
      default: '#474059',
      text: '--lighten 40',
      placeholder: '--lighten 20',
      surface: '--lighten 0',
      background: '--lighten 0',
      border: '--lighten 0',
      ':hover': {
        text: '--lighten 40',
        placeholder: '--lighten 30',
        surface: '--lighten 0',
        background: '--lighten 10',
        border: '--lighten 0'
      },
      ':focus': {
        text: '--lighten 40',
        placeholder: '--lighten 30',
        surface: '--lighten 10',
        background: '--lighten 10',
        border: '--lighten 0'
      }
    },

    /**
     * @name                accent
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #f2bc2b
     *
     * Specify the <s-color="accent">accent</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    accent: {
      default: '#FFD501',
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
     * @name                complementary
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #7F43FF
     *
     * Specify the <s-color="complementary">complementary</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    complementary: {
      default: '#7F43FF'
    },

    /**
     * @name                surface
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #1D1B23
     *
     * Specify the <s-color="surface">surface</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    surface: {
      default: '#1D1B23'
    },

    /**
     * @name                background
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #1D1B23
     *
     * Specify the <s-color="background">background</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    background: {
      default: '#1D1B23'
    },

    /**
     * @name                success
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #B5F168
     *
     * Specify the <s-color="success">success</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    success: {
      default: '#B5F168'
    },

    /**
     * @name                warning
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #FFD501
     *
     * Specify the <s-color="warning">warning</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    warning: {
      default: '#FFD501'
    },

    /**
     * @name                error
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #FF4370
     *
     * Specify the <s-color="error">error</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    error: {
      default: '#FF4370'
    },

    /**
     * @name                info
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #FDA622
     *
     * Specify the <s-color="info">info</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    info: {
      default: '#FDA622'
    },

    /**
     * @name                extension
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #2b3438
     *
     * Specify the <primary>extension</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    extension: {
      default: '[config.theme.themes.dark.color.primary.default]',
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
