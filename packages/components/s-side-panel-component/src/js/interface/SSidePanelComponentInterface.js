import __SInterface from '@coffeekraken/s-interface';
export default class SSidePanelComponentInterface extends __SInterface {
}
SSidePanelComponentInterface.definition = {
    side: {
        type: 'String',
        values: ['top', 'left', 'bottom', 'right'],
        default: 'left'
    },
    active: {
        type: 'Boolean',
        default: false
    },
    overlay: {
        type: 'Boolean',
        default: false
    },
    closeOn: {
        type: {
            type: "Array<String>",
            splitChars: [',']
        },
        values: ['click', 'escape'],
        default: ['click', 'escape']
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NpZGVQYW5lbENvbXBvbmVudEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTaWRlUGFuZWxDb21wb25lbnRJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxDQUFDLE9BQU8sT0FBTyw0QkFBNkIsU0FBUSxZQUFZOztBQUM3RCx1Q0FBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxDQUFDO1FBQ3ZDLE9BQU8sRUFBRSxNQUFNO0tBQ2xCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNmO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNmO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLGVBQWU7WUFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFBO1NBQ2pCO1FBQ0QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFDLFFBQVEsQ0FBQztRQUMxQixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUMsUUFBUSxDQUFDO0tBQzVCO0NBQ0YsQ0FBQyJ9