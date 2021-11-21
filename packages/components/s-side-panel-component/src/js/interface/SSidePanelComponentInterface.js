import __SInterface from '@coffeekraken/s-interface';
export default class SSidePanelComponentInterface extends __SInterface {
    static get _definition() {
        return {
            side: {
                description: 'Specify the side where to display the panel. Can be "top","left","bottom" or "right"',
                type: 'String',
                values: ['top', 'left', 'bottom', 'right'],
                default: 'left',
            },
            active: {
                description: 'Specify the panel initial state',
                type: 'Boolean',
                default: false,
            },
            overlay: {
                description: 'Specify if you want an "overlay" between the panel and your content',
                type: 'Boolean',
                default: false,
            },
            triggerer: {
                description: 'Specify a css selector that targets the elements in your UI you want to open the panel on click',
                type: 'String',
            },
            closeOn: {
                description: 'Specify which "action(s)" close the panel. Valid values are "click" or/and "escape"',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: ['click', 'escape'],
                default: ['click', 'escape'],
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NpZGVQYW5lbENvbXBvbmVudEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTaWRlUGFuZWxDb21wb25lbnRJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxDQUFDLE9BQU8sT0FBTyw0QkFBNkIsU0FBUSxZQUFZO0lBQ2xFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLHNGQUFzRjtnQkFDMUYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO2dCQUMxQyxPQUFPLEVBQUUsTUFBTTthQUNsQjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsaUNBQWlDO2dCQUM5QyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AscUVBQXFFO2dCQUN6RSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQ1AsaUdBQWlHO2dCQUNyRyxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AscUZBQXFGO2dCQUN6RixJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQztpQkFDcEI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztnQkFDM0IsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQzthQUMvQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==