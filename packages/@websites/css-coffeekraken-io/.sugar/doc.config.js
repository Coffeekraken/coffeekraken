export default function (api) {
    return {
        categories: {
            helpers: {
                title: 'Helpers',
                description: 'All the available helpers',
                children: {
                    mixins: {
                        title: 'Mixins',
                        description: 'All the available helper mixins',
                        filters: {
                            type: 'PostcssMixin',
                            id: '/@coffeekraken.s-postcss-sugar-plugin.((?!ui).)*(?<!.classes)$/',
                        },
                    },
                    classes: {
                        title: 'Classes',
                        description: 'All the available helper classes',
                        filters: {
                            type: 'PostcssMixin',
                            id: '/@coffeekraken.s-postcss-sugar-plugin.((?!ui).)*.classes$/',
                        },
                    },
                },
            },
            ui: {
                title: 'UI',
                description: 'All the available UI elements',
                children: {
                    mixins: {
                        title: 'Mixins',
                        description: 'All the available UI mixins',
                        filters: {
                            type: 'PostcssMixin',
                            id: '/@coffeekraken.s-postcss-sugar-plugin..*.ui..*(?<!.classes)$/',
                        },
                    },
                    classes: {
                        title: 'Classes',
                        description: 'All the available UI classes',
                        filters: {
                            type: 'PostcssMixin',
                            id: '/@coffeekraken.s-postcss-sugar-plugin..*.ui..*.classes$/',
                        },
                    },
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsT0FBTyxFQUFFO2dCQUNMLEtBQUssRUFBRSxTQUFTO2dCQUNoQixXQUFXLEVBQUUsMkJBQTJCO2dCQUN4QyxRQUFRLEVBQUU7b0JBQ04sTUFBTSxFQUFFO3dCQUNKLEtBQUssRUFBRSxRQUFRO3dCQUNmLFdBQVcsRUFBRSxpQ0FBaUM7d0JBQzlDLE9BQU8sRUFBRTs0QkFDTCxJQUFJLEVBQUUsY0FBYzs0QkFDcEIsRUFBRSxFQUFFLGlFQUFpRTt5QkFDeEU7cUJBQ0o7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLEtBQUssRUFBRSxTQUFTO3dCQUNoQixXQUFXLEVBQUUsa0NBQWtDO3dCQUMvQyxPQUFPLEVBQUU7NEJBQ0wsSUFBSSxFQUFFLGNBQWM7NEJBQ3BCLEVBQUUsRUFBRSw0REFBNEQ7eUJBQ25FO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxFQUFFLEVBQUU7Z0JBQ0EsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsV0FBVyxFQUFFLCtCQUErQjtnQkFDNUMsUUFBUSxFQUFFO29CQUNOLE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsUUFBUTt3QkFDZixXQUFXLEVBQUUsNkJBQTZCO3dCQUMxQyxPQUFPLEVBQUU7NEJBQ0wsSUFBSSxFQUFFLGNBQWM7NEJBQ3BCLEVBQUUsRUFBRSwrREFBK0Q7eUJBQ3RFO3FCQUNKO29CQUNELE9BQU8sRUFBRTt3QkFDTCxLQUFLLEVBQUUsU0FBUzt3QkFDaEIsV0FBVyxFQUFFLDhCQUE4Qjt3QkFDM0MsT0FBTyxFQUFFOzRCQUNMLElBQUksRUFBRSxjQUFjOzRCQUNwQixFQUFFLEVBQUUsMERBQTBEO3lCQUNqRTtxQkFDSjtpQkFDSjthQUNKO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9