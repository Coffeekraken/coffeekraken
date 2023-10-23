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
            styleguideComponents: {
                title: 'Components',
                description: 'All the available components, etc...',
                filters: {
                    type: 'Styleguide',
                    id: '/.*.sugar.style.ui.*/',
                },
            },
            styleguideHelpers: {
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
                    id: '@coffeekraken.s-postcss-sugar-plugin.**',
                },
            },
            functions: {
                title: 'Functions',
                description: 'All the available functions',
                filters: {
                    type: 'PostcssFunction',
                    id: '@coffeekraken.s-postcss-sugar-plugin.**',
                },
            },
            // uiClasses: {
            //     title: 'UI classes',
            //     description: 'All the available UI classes',
            //     filters: {
            //         type: 'PostcssMixin',
            //         id: '/@coffeekraken.s-postcss-sugar-plugin..*.ui..*.classes$/',
            //     },
            // },
            // uiMixins: {
            //     title: 'UI mixins',
            //     description: 'All the available UI mixins',
            //     filters: {
            //         type: 'PostcssMixin',
            //         id: '/@coffeekraken.s-postcss-sugar-plugin..*.ui..*(?<!.classes)$/',
            //     },
            // },
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
                    id: '@coffeekraken.s-postcss-sugar-plugin.**',
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsVUFBVSxFQUFFO2dCQUNSLEtBQUssRUFBRSxhQUFhO2dCQUNwQixXQUFXLEVBQ1AsMERBQTBEO2dCQUM5RCxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLEVBQUUsRUFBRSwwQ0FBMEM7aUJBQ2pEO2FBQ0o7WUFDRCxvQkFBb0IsRUFBRTtnQkFDbEIsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLFdBQVcsRUFBRSxzQ0FBc0M7Z0JBQ25ELE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsWUFBWTtvQkFDbEIsRUFBRSxFQUFFLHVCQUF1QjtpQkFDOUI7YUFDSjtZQUNELGlCQUFpQixFQUFFO2dCQUNmLEtBQUssRUFBRSxTQUFTO2dCQUNoQixXQUFXLEVBQUUsbUNBQW1DO2dCQUNoRCxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLEVBQUUsRUFBRSw0QkFBNEI7aUJBQ25DO2FBQ0o7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsV0FBVyxFQUFFLDBCQUEwQjtnQkFDdkMsT0FBTyxFQUFFO29CQUNMLElBQUksRUFBRSxjQUFjO29CQUNwQixFQUFFLEVBQUUseUNBQXlDO2lCQUNoRDthQUNKO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLEtBQUssRUFBRSxXQUFXO2dCQUNsQixXQUFXLEVBQUUsNkJBQTZCO2dCQUMxQyxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLGlCQUFpQjtvQkFDdkIsRUFBRSxFQUFFLHlDQUF5QztpQkFDaEQ7YUFDSjtZQUNELGVBQWU7WUFDZiwyQkFBMkI7WUFDM0IsbURBQW1EO1lBQ25ELGlCQUFpQjtZQUNqQixnQ0FBZ0M7WUFDaEMsMEVBQTBFO1lBQzFFLFNBQVM7WUFDVCxLQUFLO1lBQ0wsY0FBYztZQUNkLDBCQUEwQjtZQUMxQixrREFBa0Q7WUFDbEQsaUJBQWlCO1lBQ2pCLGdDQUFnQztZQUNoQywrRUFBK0U7WUFDL0UsU0FBUztZQUNULEtBQUs7WUFDTCxPQUFPLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFdBQVcsRUFBRSxtQ0FBbUM7Z0JBQ2hELE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxFQUFFLEVBQUUsMEJBQTBCO2lCQUNqQzthQUNKO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLEtBQUssRUFBRSxTQUFTO2dCQUNoQixXQUFXLEVBQUUsMkJBQTJCO2dCQUN4QyxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsRUFBRSxFQUFFLHlDQUF5QztpQkFDaEQ7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==