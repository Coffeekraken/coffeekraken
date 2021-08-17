export default function (env, config) {
    return {
        extends: 'themeBase',

        colorStates: {
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
                text: {},
                foreground: {
                    lighten: 50,
                },
                background: {
                    lighten: 50,
                },
                backgroundForeground: {},
                surface: {
                    lighten: 49,
                },
                surfaceForeground: {},
                ui: {
                    lighten: 49,
                },
                border: {
                    alpha: 0.2,
                },
                gradientStart: {},
                gradientEnd: {
                    darken: 20,
                },
            },
            ':hover': {
                // '...': '[this.colorStates.default]',
                '0': {
                    darken: 55,
                },
                '5': {
                    darken: 50,
                },
                '10': {
                    darken: 45,
                },
                '15': {
                    darken: 40,
                },
                '20': {
                    darken: 35,
                },
                '25': {
                    darken: 30,
                },
                '30': {
                    darken: 25,
                },
                '35': {
                    darken: 20,
                },
                '40': {
                    darken: 15,
                },
                '45': {
                    darken: 10,
                },
                '50': {
                    darken: 5,
                },
                '55': {
                    lighten: 0,
                },
                '60': {
                    lighten: 5,
                },
                '65': {
                    lighten: 10,
                },
                '70': {
                    lighten: 15,
                },
                '75': {
                    lighten: 20,
                },
                '80': {
                    lighten: 25,
                },
                '85': {
                    lighten: 30,
                },
                '90': {
                    lighten: 35,
                },
                '95': {
                    lighten: 40,
                },
                '100': {
                    lighten: 45,
                },
                text: {
                    darken: 20,
                },
                placeholder: {
                    lighten: 44,
                },
                foreground: {
                    lighten: 60,
                },
                background: {
                    lighten: 50,
                },
                backgroundForeground: {},
                surface: {
                    lighten: 48,
                },
                ui: {
                    lighten: 48,
                },
                surfaceForeground: {},
                border: {
                    alpha: 0.3,
                },
            },
            ':focus': {
                '...': '[this.colorStates.default]',
                '0': {
                    darken: 60,
                },
                '5': {
                    darken: 55,
                },
                '10': {
                    darken: 50,
                },
                '15': {
                    darken: 45,
                },
                '20': {
                    darken: 40,
                },
                '25': {
                    darken: 35,
                },
                '30': {
                    darken: 30,
                },
                '35': {
                    darken: 25,
                },
                '40': {
                    darken: 20,
                },
                '45': {
                    darken: 15,
                },
                '50': {
                    darken: 10,
                },
                '55': {
                    lighten: 5,
                },
                '60': {},
                '65': {
                    lighten: 5,
                },
                '70': {
                    lighten: 10,
                },
                '75': {
                    lighten: 15,
                },
                '80': {
                    lighten: 20,
                },
                '85': {
                    lighten: 25,
                },
                '90': {
                    lighten: 30,
                },
                '95': {
                    lighten: 35,
                },
                '100': {
                    lighten: 40,
                },
                text: {},
                surface: {
                    lighten: 47,
                },
                ui: {
                    lighten: 47,
                },
                border: {
                    alpha: 0.6,
                },
            },
            ':active': {
                '...': '[this.colorStates.default]',
                '0': {
                    darken: 60,
                },
                '5': {
                    darken: 55,
                },
                '10': {
                    darken: 50,
                },
                '15': {
                    darken: 45,
                },
                '20': {
                    darken: 40,
                },
                '25': {
                    darken: 35,
                },
                '30': {
                    darken: 30,
                },
                '35': {
                    darken: 25,
                },
                '40': {
                    darken: 20,
                },
                '45': {
                    darken: 15,
                },
                '50': {
                    darken: 10,
                },
                '55': {
                    lighten: 5,
                },
                '60': {},
                '65': {
                    lighten: 5,
                },
                '70': {
                    lighten: 10,
                },
                '75': {
                    lighten: 15,
                },
                '80': {
                    lighten: 20,
                },
                '85': {
                    lighten: 25,
                },
                '90': {
                    lighten: 30,
                },
                '95': {
                    lighten: 35,
                },
                '100': {
                    lighten: 40,
                },
                text: {},
                surface: {
                    lighten: 47,
                },
                ui: {
                    lighten: 47,
                },
                border: {
                    alpha: 1,
                },
            },
        },
    };
}
