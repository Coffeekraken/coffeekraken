export default function (env, config) {
    return {
        extends: 'themeBase',

        colorSchemas: {
            default: {
                '0': {
                    darken: 50,
                },
                '5': {
                    darken: 45,
                },
                '10': {
                    darken: 40,
                },
                '15': {
                    darken: 35,
                },
                '20': {
                    darken: 30,
                },
                '25': {
                    darken: 25,
                },
                '30': {
                    darken: 20,
                },
                '35': {
                    darken: 15,
                },
                '40': {
                    darken: 10,
                },
                '45': {
                    darken: 5,
                },
                '50': {},
                '55': {
                    lighten: 5,
                },
                '60': {
                    lighten: 10,
                },
                '65': {
                    lighten: 15,
                },
                '70': {
                    lighten: 20,
                },
                '75': {
                    lighten: 25,
                },
                '80': {
                    lighten: 30,
                },
                '85': {
                    lighten: 35,
                },
                '90': {
                    lighten: 40,
                },
                '95': {
                    lighten: 48,
                },
                '100': {
                    lighten: 50,
                },
                text: {
                    darken: 15,
                    desaturate: 20,
                },
                placeholder: {
                    darken: 45,
                    alpha: 0.4,
                },
                foreground: {
                    lighten: 45,
                },
                ui: {
                    lighten: 50,
                },
                uiForeground: {
                    darken: 25,
                },
                background: {
                    lighten: 50,
                },
                backgroundForeground: {
                    darken: 45,
                },
                surface: {
                    lighten: 49,
                },
                surfaceForeground: {
                    darken: 45,
                },
                border: {
                    alpha: 0.2,
                },
                gradientStart: {},
                gradientEnd: {
                    lighten: 20,
                },
            },
        },
    };
}
