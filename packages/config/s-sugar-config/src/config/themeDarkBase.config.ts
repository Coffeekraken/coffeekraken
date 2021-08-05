export default {
    extends: 'themeBase',

    colorStates: {
        text: '--lighten 50',
        placeholder: '--lighten 20',
        foreground: '--lighten 50',
        surface: '--darken 20',
        surfaceForeground: '--darken 0',
        background: '--darken 40',
        backgroundForeground: '--darken 0',
        border: '--darken 25',
        gradientStart: '--lighten 0',
        gradientEnd: '--darken 20',
        ':hover': {
            text: '--lighten 50',
            placeholder: '--lighten 25',
            surface: '--darken 15',
            foreground: '--lighten 50',
            background: '--darken 40',
            border: '--darken 20'
        },
        ':focus': {
            text: '--lighten 50',
            placeholder: '--lighten 30',
            surface: '--darken 15',
            foreground: '--lighten 50',
            background: '--darken 40',
            border: '--darken 15'
        },
        ':active': {
            text: '--lighten 50',
            placeholder: '--lighten 30',
            surface: '--darken 15',
            foreground: '--lighten 50',
            background: '--darken 40',
            border: '--darken 15'
        },
        ':highlight': {
            text: '--lighten 50',
            placeholder: '--lighten 30',
            surface: '--darken 15',
            foreground: '--lighten 50',
            background: '--darken 40',
            border: '--darken 15'
        }
    }
}