module.exports = {
  id: 'webcomponent.SFiltrableInput',
  type: 'webcomponent',
  name: 'SFiltrableInput',
  groups: {
    main: {
      title: 'Base info'
    },
    advanced: {
      title: 'Advanced'
    }
  },
  props: {
    items: {
      type: 'Array<Object>',
      required: true,
      default: [],
      watch: true
    },
    inputValueProp: {
      type: 'String',
      default: 'title'
    },
    noItemText: {
      type: 'String',
      default: 'No result sorry...',
      edition: {
        group: 'main',
        field: 'text'
      }
    },
    loadingText: {
      type: 'String',
      default: 'Loading please wait...',
      edition: {
        group: 'main',
        field: 'text'
      },
      validation: {
        min: 10,
        max: 30
      }
    },
    closeOnEscape: {
      type: 'Boolean',
      default: true,
      edition: {
        group: 'advanced',
        field: 'checkbox'
      }
    },
    closeOnSelect: {
      type: 'Boolean',
      default: true,
      edition: {
        group: 'advanced',
        field: 'checkbox'
      }
    },
    closeOnSelectTimeout: {
      type: 'Integer',
      default: 200,
      edition: {
        group: 'advanced',
        field: 'text'
      }
    },
    preselectFirst: {
      type: 'Boolean',
      default: true,
      edition: {
        group: 'advanced',
        field: 'checkbox'
      }
    },
    maxDisplayItems: {
      type: 'Integer',
      default: 50,
      edition: {
        group: 'advanced',
        field: 'text'
      }
    },
    inputThrottle: {
      type: 'Number',
      default: 0,
      edition: {
        group: 'advanced',
        field: 'text'
      },
      watch: true
    },
    ':onSelect': {
      type: 'String',
      required: false,
      default: null
    },
    loading: {
      type: 'Boolean',
      physical: true,
      default: false,
      watch: true
    }
  },
  src: {
    scss: {
      style: {
        path: 'src/scss/_style.scss',
        code:
          "@use '@coffeekraken/s-filtrable-input/[path]' as SFiltrableInput;\n@include SFiltrableInput.style();"
      }
    },
    js: {
      main: {
        path: 'src/js/index.js',
        code:
          "import __SFiltrableInput from '@coffeekraken/s-filtrable-input/[path]';\n__SFiltrableInput.define();"
      }
    }
  }
};
