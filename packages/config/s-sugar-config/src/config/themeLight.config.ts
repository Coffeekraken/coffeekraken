export default {
  extends: 'themeLightBase',

  color: {
    /**
     * @name                main
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #776d91
     *
     * Specify the <s-color="main">main</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    main: {
      default: '#787987',
      '...': '[theme.colorStates]',
      text: '--darken 20',
      background: '--lighten 50'
    },

    /**
     * @name                ui
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #fff
     *
     * Specify the <s-color="ui">ui</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    ui: {
      default: '#787987',
      '...': '[theme.colorStates]'
    },

    /**
     * @name                accent
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #ffbb00
     *
     * Specify the <s-color="accent">accent</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    accent: {
      default: '#ffbb00',
      '...': '[theme.colorStates]'
    },

    /**
     * @name                complementary
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #5100ff
     *
     * Specify the <s-color="complementary">complementary</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    complementary: {
      default: '#5100ff',
      '...': '[theme.colorStates]'
    },

    /**
     * @name                success
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #91ff00
     *
     * Specify the <s-color="success">success</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    success: {
      default: '#91ff00',
      '...': '[theme.colorStates]'
    },

    /**
     * @name                warning
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #ffd500
     *
     * Specify the <s-color="warning">warning</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    warning: {
      default: '#ffd500',
      '...': '[theme.colorStates]'
    },

    /**
     * @name                error
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #ff003b
     *
     * Specify the <s-color="error">error</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    error: {
      default: '#ff003b',
      '...': '[theme.colorStates]'
    },

    /**
     * @name                info
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #00ffff
     *
     * Specify the <s-color="info">info</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    info: {
      default: '#00ffff',
      '...': '[theme.colorStates]',
      text: '--lighten 20'
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
      default: '[theme.color.accent.default]',
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
