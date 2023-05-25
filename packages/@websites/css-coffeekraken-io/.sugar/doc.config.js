export default function (api) {
    return {
        categories: {
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
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsYUFBYSxFQUFFO2dCQUNYLEtBQUssRUFBRSxnQkFBZ0I7Z0JBQ3ZCLFdBQVcsRUFBRSxrQ0FBa0M7Z0JBQy9DLE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsY0FBYztvQkFDcEIsRUFBRSxFQUFFLDREQUE0RDtpQkFDbkU7YUFDSjtZQUNELFlBQVksRUFBRTtnQkFDVixLQUFLLEVBQUUsZUFBZTtnQkFDdEIsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsT0FBTyxFQUFFO29CQUNMLElBQUksRUFBRSxjQUFjO29CQUNwQixFQUFFLEVBQUUsaUVBQWlFO2lCQUN4RTthQUNKO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLEtBQUssRUFBRSxZQUFZO2dCQUNuQixXQUFXLEVBQUUsOEJBQThCO2dCQUMzQyxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLEVBQUUsRUFBRSwwREFBMEQ7aUJBQ2pFO2FBQ0o7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLFdBQVcsRUFBRSw2QkFBNkI7Z0JBQzFDLE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsY0FBYztvQkFDcEIsRUFBRSxFQUFFLCtEQUErRDtpQkFDdEU7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==