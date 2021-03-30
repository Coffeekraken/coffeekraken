/* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module */
var __commonJS = (callback, module) => () => {
  if (!module) {
    module = {exports: {}};
    callback(module.exports, module);
  }
  return module.exports;
};
var require_SSugarUiWebComponent_frontspec = __commonJS((exports, module) => {
  module.exports = {
    id: "SugarUi.SSugarUiWebComponent",
    name: "SSugarUiWebComponent",
    groups: {
      main: {
        title: "Base info"
      },
      advanced: {
        title: "Advanced"
      }
    },
    props: {
      items: {
        type: "Array<Object>",
        required: true,
        default: [],
        watch: true
      },
      inputValueProp: {
        type: "String",
        default: "title"
      },
      noItemText: {
        type: "String",
        default: "No result sorry...",
        edition: {
          group: "main",
          field: "text"
        }
      },
      loadingText: {
        type: "String",
        default: "Loading please wait...",
        edition: {
          group: "main",
          field: "text"
        }
      },
      closeOnEscape: {
        type: "Boolean",
        default: true,
        edition: {
          group: "advanced",
          field: "checkbox"
        }
      },
      closeOnSelect: {
        type: "Boolean",
        default: true,
        edition: {
          group: "advanced",
          field: "checkbox"
        }
      },
      closeOnSelectTimeout: {
        type: "Integer",
        default: 200,
        edition: {
          group: "advanced",
          field: "text"
        }
      },
      preselectFirst: {
        type: "Boolean",
        default: true,
        edition: {
          group: "advanced",
          field: "checkbox"
        }
      },
      maxDisplayItems: {
        type: "Integer",
        default: 50,
        edition: {
          group: "advanced",
          field: "text"
        }
      },
      inputThrottle: {
        type: "Number",
        default: 0,
        edition: {
          group: "advanced",
          field: "text"
        },
        watch: true
      },
      ":onSelect": {
        type: "String",
        required: false,
        default: null
      },
      loading: {
        type: "Boolean",
        physical: true,
        default: false,
        watch: true
      }
    }
  };
});
export default require_SSugarUiWebComponent_frontspec();
//# sourceMappingURL=SSugarUiWebComponent.frontspec.js.map
