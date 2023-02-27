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
export default format;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBDQSxTQUFTLE1BQU0sQ0FBQyxNQUFjLEVBQUUsTUFBZTs7SUFDM0MsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBRWhCLFFBQVEsTUFBTSxFQUFFO1FBQ1osS0FBSyxTQUFTO1lBQ1YsTUFBTSxHQUFHO2dCQUNMLEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsR0FBRztnQkFDSCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsR0FBRztnQkFDSCxLQUFLO2dCQUNMLEtBQUs7YUFDUixDQUFDO1lBQ0YsTUFBTTtRQUNWLEtBQUssYUFBYTtZQUNkLE1BQU0sR0FBRztnQkFDTCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEdBQUc7Z0JBQ0gsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEdBQUc7Z0JBQ0gsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEdBQUc7Z0JBQ0gsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEdBQUc7Z0JBQ0gsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEdBQUc7Z0JBQ0gsS0FBSztnQkFDTCxLQUFLO2FBQ1IsQ0FBQztZQUNGLE1BQU07UUFDVixLQUFLLFNBQVM7WUFDVixNQUFNLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDOUQsTUFBTTtRQUNWLEtBQUssS0FBSztZQUNOLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pELE1BQU07UUFDVixLQUFLLE1BQU07WUFDUCxNQUFNLEdBQUc7Z0JBQ0wsR0FBRztnQkFD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