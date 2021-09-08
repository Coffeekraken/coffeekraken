import __SInterface from '@coffeekraken/s-interface';
export default class SActivateComponentInterface extends __SInterface {
}
SActivateComponentInterface.definition = {
    method: {
        type: 'String',
        values: ['get', 'post'],
        default: 'get'
    },
    url: {
        type: 'String',
        required: true
    },
    trigger: {
        type: 'String',
        values: ['event'],
        default: 'event'
    },
    on: {
        type: 'String'
    },
    cache: {
        type: 'String|Boolean',
        default: false
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVlc3RDb21wb25lbnRJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUmVxdWVzdENvbXBvbmVudEludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxNQUFNLENBQUMsT0FBTyxPQUFPLDJCQUE0QixTQUFRLFlBQVk7O0FBQzVELHNDQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUMsTUFBTSxDQUFDO1FBQ3RCLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNqQixPQUFPLEVBQUUsT0FBTztLQUNqQjtJQUNELEVBQUUsRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO0tBQ2Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7Q0FDRixDQUFDIn0=