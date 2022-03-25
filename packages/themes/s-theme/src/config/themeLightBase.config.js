function themeLightBase_config_default(env, config) {
  return {
    extends: "themeBase",
    colorSchemas: {
      default: {
        "0": {
          darken: 50
        },
        "5": {
          darken: 45
        },
        "10": {
          darken: 40
        },
        "15": {
          darken: 35
        },
        "20": {
          darken: 30
        },
        "25": {
          darken: 25
        },
        "30": {
          darken: 20
        },
        "35": {
          darken: 15
        },
        "40": {
          darken: 10
        },
        "45": {
          darken: 5
        },
        "50": {
          darken: 0
        },
        "55": {
          lighten: 5
        },
        "60": {
          lighten: 10
        },
        "65": {
          lighten: 15
        },
        "70": {
          lighten: 20
        },
        "75": {
          lighten: 25
        },
        "80": {
          lighten: 30
        },
        "85": {
          lighten: 35
        },
        "90": {
          lighten: 40
        },
        "95": {
          lighten: 48
        },
        "100": {
          lighten: 50
        },
        text: {
          darken: 0
        },
        placeholder: {
          darken: 0,
          alpha: 0.2
        },
        foreground: {
          lighten: 50
        },
        background: {
          lighten: 50
        },
        backgroundForeground: {
          darken: 45
        },
        surface: {
          lighten: 35
        },
        surfaceForeground: {
          darken: 45
        },
        ui: {
          lighten: 50
        },
        uiForeground: {
          darken: 25
        },
        border: {
          alpha: 0.2
        },
        gradientStart: {
          lighten: 0
        },
        gradientEnd: {
          lighten: 20
        }
      }
    }
  };
}
export {
  themeLightBase_config_default as default
};
