/* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module */
let process = {};var __commonJS = (callback, module) => () => {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2pzL3dlYmNvbXBvbmVudHMvU1N1Z2FyVWlXZWJDb21wb25lbnQuZnJvbnRzcGVjLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgaWQ6ICdTdWdhclVpLlNTdWdhclVpV2ViQ29tcG9uZW50JyxcbiAgbmFtZTogJ1NTdWdhclVpV2ViQ29tcG9uZW50JyxcbiAgZ3JvdXBzOiB7XG4gICAgbWFpbjoge1xuICAgICAgdGl0bGU6ICdCYXNlIGluZm8nXG4gICAgfSxcbiAgICBhZHZhbmNlZDoge1xuICAgICAgdGl0bGU6ICdBZHZhbmNlZCdcbiAgICB9XG4gIH0sXG4gIHByb3BzOiB7XG4gICAgaXRlbXM6IHtcbiAgICAgIHR5cGU6ICdBcnJheTxPYmplY3Q+JyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgZGVmYXVsdDogW10sXG4gICAgICB3YXRjaDogdHJ1ZVxuICAgIH0sXG4gICAgaW5wdXRWYWx1ZVByb3A6IHtcbiAgICAgIHR5cGU6ICdTdHJpbmcnLFxuICAgICAgZGVmYXVsdDogJ3RpdGxlJ1xuICAgIH0sXG4gICAgbm9JdGVtVGV4dDoge1xuICAgICAgdHlwZTogJ1N0cmluZycsXG4gICAgICBkZWZhdWx0OiAnTm8gcmVzdWx0IHNvcnJ5Li4uJyxcbiAgICAgIGVkaXRpb246IHtcbiAgICAgICAgZ3JvdXA6ICdtYWluJyxcbiAgICAgICAgZmllbGQ6ICd0ZXh0J1xuICAgICAgfVxuICAgIH0sXG4gICAgbG9hZGluZ1RleHQ6IHtcbiAgICAgIHR5cGU6ICdTdHJpbmcnLFxuICAgICAgZGVmYXVsdDogJ0xvYWRpbmcgcGxlYXNlIHdhaXQuLi4nLFxuICAgICAgZWRpdGlvbjoge1xuICAgICAgICBncm91cDogJ21haW4nLFxuICAgICAgICBmaWVsZDogJ3RleHQnXG4gICAgICB9XG4gICAgfSxcbiAgICBjbG9zZU9uRXNjYXBlOiB7XG4gICAgICB0eXBlOiAnQm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgZWRpdGlvbjoge1xuICAgICAgICBncm91cDogJ2FkdmFuY2VkJyxcbiAgICAgICAgZmllbGQ6ICdjaGVja2JveCdcbiAgICAgIH1cbiAgICB9LFxuICAgIGNsb3NlT25TZWxlY3Q6IHtcbiAgICAgIHR5cGU6ICdCb29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICBlZGl0aW9uOiB7XG4gICAgICAgIGdyb3VwOiAnYWR2YW5jZWQnLFxuICAgICAgICBmaWVsZDogJ2NoZWNrYm94J1xuICAgICAgfVxuICAgIH0sXG4gICAgY2xvc2VPblNlbGVjdFRpbWVvdXQ6IHtcbiAgICAgIHR5cGU6ICdJbnRlZ2VyJyxcbiAgICAgIGRlZmF1bHQ6IDIwMCxcbiAgICAgIGVkaXRpb246IHtcbiAgICAgICAgZ3JvdXA6ICdhZHZhbmNlZCcsXG4gICAgICAgIGZpZWxkOiAndGV4dCdcbiAgICAgIH1cbiAgICB9LFxuICAgIHByZXNlbGVjdEZpcnN0OiB7XG4gICAgICB0eXBlOiAnQm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgZWRpdGlvbjoge1xuICAgICAgICBncm91cDogJ2FkdmFuY2VkJyxcbiAgICAgICAgZmllbGQ6ICdjaGVja2JveCdcbiAgICAgIH1cbiAgICB9LFxuICAgIG1heERpc3BsYXlJdGVtczoge1xuICAgICAgdHlwZTogJ0ludGVnZXInLFxuICAgICAgZGVmYXVsdDogNTAsXG4gICAgICBlZGl0aW9uOiB7XG4gICAgICAgIGdyb3VwOiAnYWR2YW5jZWQnLFxuICAgICAgICBmaWVsZDogJ3RleHQnXG4gICAgICB9XG4gICAgfSxcbiAgICBpbnB1dFRocm90dGxlOiB7XG4gICAgICB0eXBlOiAnTnVtYmVyJyxcbiAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICBlZGl0aW9uOiB7XG4gICAgICAgIGdyb3VwOiAnYWR2YW5jZWQnLFxuICAgICAgICBmaWVsZDogJ3RleHQnXG4gICAgICB9LFxuICAgICAgd2F0Y2g6IHRydWVcbiAgICB9LFxuICAgICc6b25TZWxlY3QnOiB7XG4gICAgICB0eXBlOiAnU3RyaW5nJyxcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIGxvYWRpbmc6IHtcbiAgICAgIHR5cGU6ICdCb29sZWFuJyxcbiAgICAgIHBoeXNpY2FsOiB0cnVlLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICB3YXRjaDogdHJ1ZVxuICAgIH1cbiAgfVxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7QUFBQTtBQUFBLFNBQU8sVUFBVTtBQUFBLElBQ2YsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLFFBQ0osT0FBTztBQUFBO0FBQUEsTUFFVCxVQUFVO0FBQUEsUUFDUixPQUFPO0FBQUE7QUFBQTtBQUFBLElBR1gsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLFFBQ0wsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsU0FBUztBQUFBLFFBQ1QsT0FBTztBQUFBO0FBQUEsTUFFVCxnQkFBZ0I7QUFBQSxRQUNkLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQTtBQUFBLE1BRVgsWUFBWTtBQUFBLFFBQ1YsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLFVBQ1AsT0FBTztBQUFBLFVBQ1AsT0FBTztBQUFBO0FBQUE7QUFBQSxNQUdYLGFBQWE7QUFBQSxRQUNYLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLE9BQU87QUFBQTtBQUFBO0FBQUEsTUFHWCxlQUFlO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUE7QUFBQTtBQUFBLE1BR1gsZUFBZTtBQUFBLFFBQ2IsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLFVBQ1AsT0FBTztBQUFBLFVBQ1AsT0FBTztBQUFBO0FBQUE7QUFBQSxNQUdYLHNCQUFzQjtBQUFBLFFBQ3BCLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLE9BQU87QUFBQTtBQUFBO0FBQUEsTUFHWCxnQkFBZ0I7QUFBQSxRQUNkLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLE9BQU87QUFBQTtBQUFBO0FBQUEsTUFHWCxpQkFBaUI7QUFBQSxRQUNmLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLE9BQU87QUFBQTtBQUFBO0FBQUEsTUFHWCxlQUFlO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUE7QUFBQSxRQUVULE9BQU87QUFBQTtBQUFBLE1BRVQsYUFBYTtBQUFBLFFBQ1gsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsU0FBUztBQUFBO0FBQUEsTUFFWCxTQUFTO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==
