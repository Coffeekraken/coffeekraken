export default function (api) {
    return {
        categories: {
            getStarted: {
                title: 'Get Started',
                description: 'All the documentations like install, get started, etc...',
                filters: {
                    type: 'Markdown',
                    id: '@website.sugarcss-coffeekraken-io.doc.**',
                },
            },
            components: {
                title: 'Components',
                description: 'All the available components, etc...',
                filters: {
                    type: 'Styleguide',
                    id: '/.*.sugar.style.ui.*/',
                },
            },
            helpers: {
                title: 'Helpers',
                description: 'All the available helpers, etc...',
                filters: {
                    type: 'Styleguide',
                    id: '/.*.sugar.style.helpers.*/',
                },
            },
            mixins: {
                title: 'Mixins',
                description: 'All the available mixins',
                filters: {
                    type: 'PostcssMixin',
                    id: '@coffeekraken.s-sugarcss-plugin.**',
                },
            },
            functions: {
                title: 'Functions',
                description: 'All the available functions',
                filters: {
                    type: 'PostcssFunction',
                    id: '@coffeekraken.s-sugarcss-plugin.**',
                },
            },
            theming: {
                title: 'Theming',
                description: 'All the available theming configs',
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
                    id: '@coffeekraken.s-sugarcss-plugin.**',
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsVUFBVSxFQUFFO2dCQUNSLEtBQUssRUFBRSxhQUFhO2dCQUNwQixXQUFXLEVBQ1AsMERBQTBEO2dCQUM5RCxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLEVBQUUsRUFBRSwwQ0FBMEM7aUJBQ2pEO2FBQ0o7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLFdBQVcsRUFBRSxzQ0FBc0M7Z0JBQ25ELE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsWUFBWTtvQkFDbEIsRUFBRSxFQUFFLHVCQUF1QjtpQkFDOUI7YUFDSjtZQUNELE9BQU8sRUFBRTtnQkFDTCxLQUFLLEVBQUUsU0FBUztnQkFDaEIsV0FBVyxFQUFFLG1DQUFtQztnQkFDaEQsT0FBTyxFQUFFO29CQUNMLElBQUksRUFBRSxZQUFZO29CQUNsQixFQUFFLEVBQUUsNEJBQTRCO2lCQUNuQzthQUNKO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLEtBQUssRUFBRSxRQUFRO2dCQUNmLFdBQVcsRUFBRSwwQkFBMEI7Z0JBQ3ZDLE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsY0FBYztvQkFDcEIsRUFBRSxFQUFFLG9DQUFvQztpQkFDM0M7YUFDSjtZQUNELFNBQVMsRUFBRTtnQkFDUCxLQUFLLEVBQUUsV0FBVztnQkFDbEIsV0FBVyxFQUFFLDZCQUE2QjtnQkFDMUMsT0FBTyxFQUFFO29CQUNMLElBQUksRUFBRSxpQkFBaUI7b0JBQ3ZCLEVBQUUsRUFBRSxvQ0FBb0M7aUJBQzNDO2FBQ0o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFdBQVcsRUFBRSxtQ0FBbUM7Z0JBQ2hELE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxFQUFFLEVBQUUsMEJBQTBCO2lCQUNqQzthQUNKO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLEtBQUssRUFBRSxTQUFTO2dCQUNoQixXQUFXLEVBQUUsMkJBQTJCO2dCQUN4QyxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsRUFBRSxFQUFFLG9DQUFvQztpQkFDM0M7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==