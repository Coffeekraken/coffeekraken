export default function (api) {
    return {
        categories: {
            doc: {
                title: 'Doc',
                description: 'All the documentations like install, get started, etc...',
                filters: {
                    type: 'Markdown',
                    id: '@coffeekraken.s-postcss-sugar-plugin.**',
                },
            },
            helperClasses: {
                title: 'Helper classes',
                description: 'All the available helper classes',
                filters: {
                    type: 'PostcssMixin',
                    id: '/@coffeekraken.s-postcss-sugar-plugin.((?!ui).)*.classes$/',
                },
            },
            helperMixins: {
                title: 'Helper mixins',
                description: 'All the available helper mixins',
                filters: {
                    type: 'PostcssMixin',
                    id: '/@coffeekraken.s-postcss-sugar-plugin.((?!ui).)*(?<!.classes)$/',
                },
            },
            uiClasses: {
                title: 'UI classes',
                description: 'All the available UI classes',
                filters: {
                    type: 'PostcssMixin',
                    id: '/@coffeekraken.s-postcss-sugar-plugin..*.ui..*.classes$/',
                },
            },
            uiMixins: {
                title: 'UI mixins',
                description: 'All the available UI mixins',
                filters: {
                    type: 'PostcssMixin',
                    id: '/@coffeekraken.s-postcss-sugar-plugin..*.ui..*(?<!.classes)$/',
                },
            },
            theme: {
                title: 'Theme',
                description: 'All the available theme configs',
                filters: {
                    type: 'Config',
                    id: '@coffeekraken.s-theme.**',
                },
            },
            configs: {
                title: 'Configs',
                description: 'All the available configs',
                filters: {
                    type: 'Config',
                    id: '@coffeekraken.s-postcss-sugar-plugin.**',
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsR0FBRyxFQUFFO2dCQUNELEtBQUssRUFBRSxLQUFLO2dCQUNaLFdBQVcsRUFDUCwwREFBMEQ7Z0JBQzlELE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsVUFBVTtvQkFDaEIsRUFBRSxFQUFFLHlDQUF5QztpQkFDaEQ7YUFDSjtZQUNELGFBQWEsRUFBRTtnQkFDWCxLQUFLLEVBQUUsZ0JBQWdCO2dCQUN2QixXQUFXLEVBQUUsa0NBQWtDO2dCQUMvQyxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLEVBQUUsRUFBRSw0REFBNEQ7aUJBQ25FO2FBQ0o7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLFdBQVcsRUFBRSxpQ0FBaUM7Z0JBQzlDLE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsY0FBYztvQkFDcEIsRUFBRSxFQUFFLGlFQUFpRTtpQkFDeEU7YUFDSjtZQUNELFNBQVMsRUFBRTtnQkFDUCxLQUFLLEVBQUUsWUFBWTtnQkFDbkIsV0FBVyxFQUFFLDhCQUE4QjtnQkFDM0MsT0FBTyxFQUFFO29CQUNMLElBQUksRUFBRSxjQUFjO29CQUNwQixFQUFFLEVBQUUsMERBQTBEO2lCQUNqRTthQUNKO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRSxXQUFXO2dCQUNsQixXQUFXLEVBQUUsNkJBQTZCO2dCQUMxQyxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLEVBQUUsRUFBRSwrREFBK0Q7aUJBQ3RFO2FBQ0o7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsT0FBTyxFQUFFO29CQUNMLElBQUksRUFBRSxRQUFRO29CQUNkLEVBQUUsRUFBRSwwQkFBMEI7aUJBQ2pDO2FBQ0o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFdBQVcsRUFBRSwyQkFBMkI7Z0JBQ3hDLE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxFQUFFLEVBQUUseUNBQXlDO2lCQUNoRDthQUNKO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9