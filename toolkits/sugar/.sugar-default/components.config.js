module.exports = {
  title: {
    h1: {
      'font-family': 'title',
      'font-size': 'bigger',
      'vr-margin-bottom': 'medium'
    },
    h2: {
      'font-family': 'title',
      'font-size': 'big',
      'vr-margin-bottom': 'medium'
    },
    h3: {
      'font-family': 'title',
      'font-size': 'medium',
      'vr-margin-bottom': 'default'
    },
    h4: {
      'font-family': 'title',
      'font-size': 'default',
      'vr-margin-bottom': 'default'
    },
    h5: {
      'font-family': 'title',
      'font-size': 'small',
      'vr-margin-bottom': 'small'
    },
    h6: {
      'font-family': 'title',
      'font-size': 'smaller',
      'vr-margin-bottom': 'small'
    }
  },
  paragraph: {
    default: {
      'font-family': 'default',
      'font-size': 'default',
      'vr-margin-bottom': 'small'
    },
    head: {
      'font-family': 'default',
      'font-size': 'medium',
      'vr-margin-bottom': 'small'
    }
  },

  button: {
    colors: {
      primary: '@config.colors.primary',
      secondary: '@config.colors.secondary',
      default: '@config.colors.primary'
    },
    sizes: {
      smaller: 0.6,
      small: 0.8,
      default: 1,
      medium: 1.1,
      big: 1.2,
      bigger: 1.3
    }
  },
  ul: {
    bullet: '\\2022'
  },
  ol: {
    separator: '\\.'
  }
};
