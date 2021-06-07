export default {
  extends: 'themeBase',

  color: {
    /**
     * @name                neutral
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #776c94
     *
     * Specify the <s-color="neutral">neutral</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    neutral: {
      default: '#776c94',
      '...': '[theme.colorStates]',
      text: '--lighten 50',
      background: '--darken 42'
    },

    /**
     * @name                ui
     * @namespace           config.theme.themes.default.color
     * @type                Color
     * @default             #77708a
     *
     * Specify the <s-color="ui">ui</s-color> color value.
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    ui: {
      default: '#77708a',
      '...': '[theme.colorStates]'
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
      '...': '[theme.colorStates]'
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
      default: '#7F43FF',
      '...': '[theme.colorStates]'
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
      default: '#B5F168',
      '...': '[theme.colorStates]'
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
      default: '#FFD501',
      '...': '[theme.colorStates]'
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
      default: '#FF4370',
      '...': '[theme.colorStates]'
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
      default: '#FDA622',
      '...': '[theme.colorStates]'
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
