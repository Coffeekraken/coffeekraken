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
            styleguideComponents: {
                title: 'Styleguide components',
                description: 'All the available components, etc...',
                filters: {
                    type: 'Styleguide',
                    id: '/.*.sugar.style.ui.*/',
                },
            },
            styleguideHelpers: {
                title: 'Styleguide helpers',
                description: 'All the available helpers, etc...',
                filters: {
                    type: 'Styleguide',
                    id: '/.*.sugar.style.helpers.*/',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsR0FBRyxFQUFFO2dCQUNELEtBQUssRUFBRSxLQUFLO2dCQUNaLFdBQVcsRUFDUCwwREFBMEQ7Z0JBQzlELE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsVUFBVTtvQkFDaEIsRUFBRSxFQUFFLHlDQUF5QztpQkFDaEQ7YUFDSjtZQUNELG9CQUFvQixFQUFFO2dCQUNsQixLQUFLLEVBQUUsdUJBQXVCO2dCQUM5QixXQUFXLEVBQUUsc0NBQXNDO2dCQUNuRCxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLEVBQUUsRUFBRSx1QkFBdUI7aUJBQzlCO2FBQ0o7WUFDRCxpQkFBaUIsRUFBRTtnQkFDZixLQUFLLEVBQUUsb0JBQW9CO2dCQUMzQixXQUFXLEVBQUUsbUNBQW1DO2dCQUNoRCxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLEVBQUUsRUFBRSw0QkFBNEI7aUJBQ25DO2FBQ0o7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsS0FBSyxFQUFFLGdCQUFnQjtnQkFDdkIsV0FBVyxFQUFFLGtDQUFrQztnQkFDL0MsT0FBTyxFQUFFO29CQUNMLElBQUksRUFBRSxjQUFjO29CQUNwQixFQUFFLEVBQUUsNERBQTREO2lCQUNuRTthQUNKO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLEtBQUssRUFBRSxlQUFlO2dCQUN0QixXQUFXLEVBQUUsaUNBQWlDO2dCQUM5QyxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLEVBQUUsRUFBRSxpRUFBaUU7aUJBQ3hFO2FBQ0o7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLFdBQVcsRUFBRSw4QkFBOEI7Z0JBQzNDLE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsY0FBYztvQkFDcEIsRUFBRSxFQUFFLDBEQUEwRDtpQkFDakU7YUFDSjtZQUNELFFBQVEsRUFBRTtnQkFDTixLQUFLLEVBQUUsV0FBVztnQkFDbEIsV0FBVyxFQUFFLDZCQUE2QjtnQkFDMUMsT0FBTyxFQUFFO29CQUNMLElBQUksRUFBRSxjQUFjO29CQUNwQixFQUFFLEVBQUUsK0RBQStEO2lCQUN0RTthQUNKO1lBQ0QsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxPQUFPO2dCQUNkLFdBQVcsRUFBRSxpQ0FBaUM7Z0JBQzlDLE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxFQUFFLEVBQUUsMEJBQTBCO2lCQUNqQzthQUNKO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLEtBQUssRUFBRSxTQUFTO2dCQUNoQixXQUFXLEVBQUUsMkJBQTJCO2dCQUN4QyxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsRUFBRSxFQUFFLHlDQUF5QztpQkFDaEQ7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==