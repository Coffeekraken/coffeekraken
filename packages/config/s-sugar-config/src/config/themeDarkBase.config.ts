export default function (env, config) {
    return {
        extends: 'themeBase',

        colorStates: {
            default: {
                '0': {
                    lighten: 50,
                },
                '5': {
                    lighten: 45,
                },
                '10': {
                    lighten: 40,
                },
                '15': {
                    lighten: 35,
                },
                '20': {
                    lighten: 30,
                },
                '25': {
                    lighten: 25,
                },
                '30': {
                    lighten: 20,
                },
                '35': {
                    lighten: 15,
                },
                '40': {
                    lighten: 10,
                },
                '45': {
                    lighten: 5,
                },
                '50': {},
                '55': {
                    darken: 5,
                },
                '60': {
                    darken: 10,
                },
                '65': {
                    darken: 15,
                },
                '70': {
                    darken: 20,
                },
                '75': {
                    darken: 25,
                },
                '80': {
                    darken: 30,
                },
                '85': {
                    darken: 35,
                },
                '90': {
                    darken: 40,
                },
                '95': {
                    darken: 48,
                },
                '100': {
                    darken: 50,
                },
                text: {
                    lighten: 46,
                },
                placeholder: {
                    darken: 10,
                },
                foreground: {
                    lighten: 50,
                },
                background: {
                    darken: 30,
                },
                backgroundForeground: {
                    lighten: 50,
                },
                surface: {
                    darken: 25,
                },
                surfaceForeground: {
                    lighten: 50,
                },
                ui: {
                    darken: 15,
                },
                border: {
                    alpha: 0.2,
                },
            },
            ':hover': {
                '...': '[this.colorStates.default]',
                '0': {
                    lighten: 55,
                },
                '5': {
                    lighten: 50,
                },
                '10': {
                    lighten: 45,
                },
                '15': {
                    lighten: 40,
                },
                '20': {
                    lighten: 35,
                },
                '25': {
                    lighten: 30,
                },
                '30': {
                    lighten: 25,
                },
                '35': {
                    lighten: 20,
                },
                '40': {
                    lighten: 15,
                },
                '45': {
                    lighten: 10,
                },
                '50': {
                    lighten: 5,
                },
                '55': {
                    darken: 0,
                },
                '60': {
                    darken: 5,
                },
                '65': {
                    darken: 10,
                },
                '70': {
                    darken: 15,
                },
                '75': {
                    darken: 20,
                },
                '80': {
                    darken: 25,
                },
                '85': {
                    darken: 30,
                },
                '90': {
                    darken: 35,
                },
                '95': {
                    darken: 40,
                },
                '100': {
                    darken: 45,
                },
                background: {
                    darken: 30,
                },
                surface: {
                    darken: 23,
                },
                ui: {
                    darken: 14,
                },
                border: {
                    alpha: 0.3,
                },
            },
            ':focus': {
                '...': '[this.colorStates.default]',
                '0': {
                    lighten: 60,
                },
                '5': {
                    lighten: 55,
                },
                '10': {
                    lighten: 50,
                },
                '15': {
                    lighten: 45,
                },
                '20': {
                    lighten: 40,
                },
                '25': {
                    lighten: 35,
                },
                '30': {
                    lighten: 30,
                },
                '35': {
                    lighten: 25,
                },
                '40': {
                    lighten: 20,
                },
                '45': {
                    lighten: 15,
                },
                '50': {
                    lighten: 10,
                },
                '55': {
                    darken: 5,
                },
                '60': {},
                '65': {
                    darken: 5,
                },
                '70': {
                    darken: 10,
                },
                '75': {
                    darken: 15,
                },
                '80': {
                    darken: 20,
                },
                '85': {
                    darken: 25,
                },
                '90': {
                    darken: 30,
                },
                '95': {
                    darken: 35,
                },
                '100': {
                    darken: 40,
                },
                background: {
                    darken: 30,
                },
                surface: {
                    darken: 21,
                },
                ui: {
                    darken: 13,
                },
                border: {
                    alpha: 0.6,
                },
            },
            ':active': {
                '...': '[this.colorStates.default]',
                '0': {
                    lighten: 60,
                },
                '5': {
                    lighten: 55,
                },
                '10': {
                    lighten: 50,
                },
                '15': {
                    lighten: 45,
                },
                '20': {
                    lighten: 40,
                },
                '25': {
                    lighten: 35,
                },
                '30': {
                    lighten: 30,
                },
                '35': {
                    lighten: 25,
                },
                '40': {
                    lighten: 20,
                },
                '45': {
                    lighten: 15,
                },
                '50': {
                    lighten: 10,
                },
                '55': {
                    darken: 5,
                },
                '60': {},
                '65': {
                    darken: 5,
                },
                '70': {
                    darken: 10,
                },
                '75': {
                    darken: 15,
                },
                '80': {
                    darken: 20,
                },
                '85': {
                    darken: 25,
                },
                '90': {
                    darken: 30,
                },
                '95': {
                    darken: 35,
                },
                '100': {
                    darken: 40,
                },
                text: {},
                background: {
                    darken: 30,
                },
                surface: {
                    darken: 21,
                },
                ui: {
                    darken: 13,
                },
                border: {
                    alpha: 1,
                },
            },
        },
    };
}
