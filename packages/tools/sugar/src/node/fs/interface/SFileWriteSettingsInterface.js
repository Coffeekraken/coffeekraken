import __SInterface from '../../interface/SInterface';
/**
 * @name          SFileWriteSettingsInterface
 * @type          Class
 * @extends       SInterface
 * @status              beta
 *
 * Watch settings interface
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SFileWriteSettingsInterface extends __SInterface {
}
SFileWriteSettingsInterface.definition = {
    encoding: {
        type: 'String',
        values: [
            'utf8',
            'ascii',
            'utf-8',
            'utf16le',
            'ucs2',
            'ucs-2',
            'base64',
            'latin1',
            'binary',
            'hex'
        ],
        required: true,
        default: 'utf8'
    },
    flag: {
        type: 'String',
        required: false
    },
    mode: {
        type: 'Number',
        required: true,
        default: 0o666
    },
    cast: {
        type: 'Boolean',
        required: true,
        default: true
    },
    path: {
        type: 'String',
        required: true
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbGVXcml0ZVNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZpbGVXcml0ZVNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBRXREOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLDJCQUE0QixTQUFRLFlBQVk7O0FBQzVELHNDQUFVLEdBQUc7SUFDbEIsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUU7WUFDTixNQUFNO1lBQ04sT0FBTztZQUNQLE9BQU87WUFDUCxTQUFTO1lBQ1QsTUFBTTtZQUNOLE9BQU87WUFDUCxRQUFRO1lBQ1IsUUFBUTtZQUNSLFFBQVE7WUFDUixLQUFLO1NBQ047UUFDRCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxNQUFNO0tBQ2hCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsS0FBSztLQUNoQjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsS0FBSztLQUNmO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDIn0=