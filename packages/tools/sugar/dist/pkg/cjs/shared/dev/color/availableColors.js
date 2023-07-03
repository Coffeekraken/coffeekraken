"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function availableColors(settings) {
    settings = Object.assign({ excludeBasics: false }, (settings !== null && settings !== void 0 ? settings : {}));
    const _colors = [
        'yellow',
        'cyan',
        'green',
        'magenta',
        'blue',
        'red',
        'grey',
        'gray',
    ];
    let colors = _colors;
    if (settings.excludeBasics) {
        colors = _colors.filter((c) => {
            return (c !== 'white' && c !== 'black' && c !== 'grey' && c !== 'gray');
        });
    }
    return colors;
}
exports.default = availableColors;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBc0JBLFNBQXdCLGVBQWUsQ0FDbkMsUUFBNEM7SUFFNUMsUUFBUSxtQkFDSixhQUFhLEVBQUUsS0FBSyxJQUNqQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUc7UUFDWixRQUFRO1FBQ1IsTUFBTTtRQUNOLE9BQU87UUFDUCxTQUFTO1FBQ1QsTUFBTTtRQUNOLEtBQUs7UUFDTCxNQUFNO1FBQ04sTUFBTTtLQUNULENBQUM7SUFFRixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUM7SUFDckIsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFO1FBQ3hCLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDMUIsT0FBTyxDQUNILENBQUMsS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLE9BQU8sSUFBSSxDQUFDLEtBQUssTUFBTSxJQUFJLENBQUMsS0FBSyxNQUFNLENBQ2pFLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztLQUNOO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQTdCRCxrQ0E2QkMifQ==