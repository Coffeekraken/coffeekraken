export default function availableColors(settings) {
    settings = Object.assign({ excludeBasics: false }, (settings !== null && settings !== void 0 ? settings : {}));
    const _colors = [
        'yellow',
        'cyan',
        'green',
        'magenta',
        'red',
        'blue',
        'primary',
        'secondary',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmxlQ29sb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC9kZXYvY29sb3IvYXZhaWxhYmxlQ29sb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9CQSxNQUFNLENBQUMsT0FBTyxVQUFVLGVBQWUsQ0FDckMsUUFBNEM7SUFFNUMsUUFBUSxtQkFDTixhQUFhLEVBQUUsS0FBSyxJQUNqQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUc7UUFDZCxRQUFRO1FBQ1IsTUFBTTtRQUNOLE9BQU87UUFDUCxTQUFTO1FBQ1QsS0FBSztRQUNMLE1BQU07UUFDTixTQUFTO1FBQ1QsV0FBVztRQUNYLE1BQU07UUFDTixNQUFNO0tBQ1AsQ0FBQztJQUVGLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQztJQUNyQixJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUU7UUFDMUIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM1QixPQUFPLENBQUMsS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLE9BQU8sSUFBSSxDQUFDLEtBQUssTUFBTSxJQUFJLENBQUMsS0FBSyxNQUFNLENBQUM7UUFDeEUsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMifQ==