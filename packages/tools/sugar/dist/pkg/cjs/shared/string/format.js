"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function format(string, format) {
    var _a;
    let schema = [];
    switch (format) {
        case 'isoDate':
            schema = [
                '\\d',
                '\\d',
                '\\d',
                '\\d',
                '-',
                '\\d',
                '\\d',
                '-',
                '\\d',
                '\\d',
            ];
            break;
        case 'isoDateTime':
            schema = [
                '\\d',
                '\\d',
                '\\d',
                '\\d',
                '-',
                '\\d',
                '\\d',
                '-',
                '\\d',
                '\\d',
                ' ',
                '\\d',
                '\\d',
                ':',
                '\\d',
                '\\d',
                ':',
                '\\d',
                '\\d',
            ];
            break;
        case 'isoTime':
            schema = ['\\d', '\\d', ':', '\\d', '\\d', ':', '\\d', '\\d'];
            break;
        case 'hex':
            schema = ['#', '\\w', '\\w', '\\w', '\\w', '\\w', '\\w'];
            break;
        case 'hexa':
            schema = [
                '#',
                '\\w',
                '\\w',
                '\\w',
                '\\w',
                '\\w',
                '\\w',
                '\\w',
                '\\w',
            ];
            break;
        case 'integer':
            return string.replace(/^[0-9]+$/i, '');
            break;
        case 'number':
            return string.replace(/^[0-9\.]+$/i, '');
            break;
        case 'alphanum':
            return string.replace(/^[a-z0-9]+$/i, '');
            break;
        case 'creditCard':
            schema = [
                '\\d',
                '\\d',
                '\\d',
                '\\d',
                ' ',
                '\\d',
                '\\d',
                '\\d',
                '\\d',
                ' ',
                '\\d',
                '\\d',
                '\\d',
                '\\d',
                ' ',
                '\\d',
                '\\d',
                '\\d',
                '\\d',
            ];
            break;
        default:
            return string;
            break;
    }
    let newValue = '';
    const loopOn = string.length > schema.length ? string : schema;
    let schemaCharI = 0;
    for (let i = 0; i < loopOn.length; i++) {
        const schemaChar = schema[schemaCharI], char = (_a = string[i]) !== null && _a !== void 0 ? _a : '';
        // end of characters
        if (!schemaChar || !char || i >= string.length) {
            break;
        }
        if (schemaChar === char) {
            newValue += char;
            schemaCharI++;
        }
        else if (schemaChar.match(/^\\d/)) {
            if (char.match(/^\d$/)) {
                newValue += char;
                schemaCharI++;
            }
            else {
                // schemaCharI++;
            }
        }
        else if (schemaChar.match(/^\\w/)) {
            if (char.match(/^\w$/)) {
                newValue += char;
                schemaCharI++;
            }
            else {
                // schemaCharI++;
            }
        }
        else if (schemaChar !== char) {
            newValue += schemaChar;
            i--;
            schemaCharI++;
        }
        else {
        }
    }
    return newValue;
}
format.formats = [
    'isoDate',
    'isoDateTime',
    'isoTime',
    'integer',
    'number',
    'alphanum',
    'hex',
    'hexa',
    'creditCard',
];
exports.default = format;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBd0NBLFNBQVMsTUFBTSxDQUFDLE1BQWMsRUFBRSxNQUFlOztJQUMzQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFFaEIsUUFBUSxNQUFNLEVBQUU7UUFDWixLQUFLLFNBQVM7WUFDVixNQUFNLEdBQUc7Z0JBQ0wsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxHQUFHO2dCQUNILEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxHQUFHO2dCQUNILEtBQUs7Z0JBQ0wsS0FBSzthQUNSLENBQUM7WUFDRixNQUFNO1FBQ1YsS0FBSyxhQUFhO1lBQ2QsTUFBTSxHQUFHO2dCQUNMLEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsR0FBRztnQkFDSCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsR0FBRztnQkFDSCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsR0FBRztnQkFDSCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsR0FBRztnQkFDSCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsR0FBRztnQkFDSCxLQUFLO2dCQUNMLEtBQUs7YUFDUixDQUFDO1lBQ0YsTUFBTTtRQUNWLEtBQUssU0FBUztZQUNWLE1BQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5RCxNQUFNO1FBQ1YsS0FBSyxLQUFLO1lBQ04sTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDekQsTUFBTTtRQUNWLEtBQUssTUFBTTtZQUNQLE1BQU0sR0FBRztnQkFDTCxHQUFHO2dC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