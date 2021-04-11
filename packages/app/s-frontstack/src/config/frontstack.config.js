"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    receipes: {
        default: {
            title: 'Default',
            description: 'Default s-frontstack receipe ',
            actions: {
                js: '[config.frontstack.actions.js]',
                svelte: '[config.frontstack.actions.svelte]'
            }
        },
        react: {}
    },
    actions: {
        js: {
            id: 'js',
            title: 'Javascript compile action',
            description: 'Allow to compile .js and .ts files easily',
            process: 'sugar-dev js.compile -w',
            settings: {
                processManager: {
                    restart: true
                }
            }
        },
        svelte: {
            id: 'svelte',
            title: 'Svelte compile action',
            description: 'Allow to compile .svelte files easily',
            process: 'sugar-dev svelte.compile -w',
            settings: {
                processManager: {
                    restart: true
                }
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtCQUFlO0lBQ2IsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsS0FBSyxFQUFFLFNBQVM7WUFDaEIsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxPQUFPLEVBQUU7Z0JBQ1AsRUFBRSxFQUFFLGdDQUFnQztnQkFDcEMsTUFBTSxFQUFFLG9DQUFvQzthQUM3QztTQUNGO1FBRUQsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUVELE9BQU8sRUFBRTtRQUNQLEVBQUUsRUFBRTtZQUNGLEVBQUUsRUFBRSxJQUFJO1lBQ1IsS0FBSyxFQUFFLDJCQUEyQjtZQUNsQyxXQUFXLEVBQUUsMkNBQTJDO1lBQ3hELE9BQU8sRUFBRSx5QkFBeUI7WUFDbEMsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBQ0Y7UUFDRCxNQUFNLEVBQUU7WUFDTixFQUFFLEVBQUUsUUFBUTtZQUNaLEtBQUssRUFBRSx1QkFBdUI7WUFDOUIsV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxPQUFPLEVBQUUsNkJBQTZCO1lBQ3RDLFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIn0=