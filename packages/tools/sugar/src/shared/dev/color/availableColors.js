export default function availableColors(settings) {
    settings = Object.assign({ excludeBasics: false }, (settings !== null && settings !== void 0 ? settings : {}));
    const _colors = [
        'yellow',
        'cyan',
        'green',
        'magenta',
        'red',
        'blue',
        'grey',
        'gray'
    ];
    let colors = _colors;
    if (settings.excludeBasics) {
        colors = _colors.filter((c) => {
            return c !== 'white' && c !== 'black' && c !== 'grey' && c !== 'gray';
        });
    }
    return colors;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmxlQ29sb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXZhaWxhYmxlQ29sb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdCQSxNQUFNLENBQUMsT0FBTyxVQUFVLGVBQWUsQ0FDckMsUUFBNEM7SUFFNUMsUUFBUSxtQkFDTixhQUFhLEVBQUUsS0FBSyxJQUNqQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUc7UUFDZCxRQUFRO1FBQ1IsTUFBTTtRQUNOLE9BQU87UUFDUCxTQUFTO1FBQ1QsS0FBSztRQUNMLE1BQU07UUFDTixNQUFNO1FBQ04sTUFBTTtLQUNQLENBQUM7SUFFRixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUM7SUFDckIsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFO1FBQzFCLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsT0FBTyxDQUFDLEtBQUssT0FBTyxJQUFJLENBQUMsS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLE1BQU0sSUFBSSxDQUFDLEtBQUssTUFBTSxDQUFDO1FBQ3hFLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDIn0=