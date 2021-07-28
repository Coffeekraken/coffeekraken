export default {
    extends: 'themeBase',

    colorStates: {
        text: '--darken 0',
        placeholder: '--alpha 0.4',
        surface: '--alpha 0.05',
        foreground: '--darken 0',
        background: '--darken 40',
        border: '--alpha 0.1',
        dark: '--darken 45',
        light: '--lighten 45',
        gradientStart: '--lighten 0',
        gradientEnd: '--darken 20',
        ':hover': {
          text: '--darken 0',
          placeholder: '--alpha 0.5',
          surface: '--alpha 0.1',
          foreground: '--darken 0',
          background: '--darken 40',
          border: '--alpha 0.2',
          dark: '--darken 45',
          light: '--lighten 45',
        },
        ':focus': {
          text: '--darken 0',
          placeholder: '--alpha 0.6',
          surface: '--alpha 0.2',
          foreground: '--darken 0',
          background: '--darken 40',
          border: '--alpha 0.3',
          dark: '--darken 45',
          light: '--lighten 45',
        },
        ':active': {
          text: '--darken 0',
          placeholder: '--alpha 0.6',
          surface: '--alpha 0.2',
          foreground: '--darken 0',
          background: '--darken 40',
          border: '--alpha 0.3',
          dark: '--darken 45',
          light: '--lighten 45',
        }
  }
}