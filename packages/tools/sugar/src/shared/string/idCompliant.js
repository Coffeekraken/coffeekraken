import __simplifySpecialChars from './simplifySpecialChars';
export default function idCompliant(str, settings) {
    settings = Object.assign({ exclude: [] }, (settings !== null && settings !== void 0 ? settings : {}));
    // spaces
    str = str.replace(' ', '-');
    // special characters
    str = __simplifySpecialChars(str);
    // replace characters like /, etc...
    const dict = {
        '/': '-',
        '\\': '-',
        '@': '',
        '(': '-',
        ')': '-',
        '.': '-',
        ',': '-',
        ':': '-',
        '#': '-',
        '!': '-',
        '?': '-',
    };
    settings.exclude.forEach((char) => {
        delete dict[char];
    });
    Object.keys(dict).forEach((char) => {
        str = str.replace(char, dict[char]);
    });
    // first and last characters + multiple ---
    str = str.replace(/^-{1,999}/gm, '');
    str = str.replace(/-{1,999}$/gm, '');
    str = str.replace(/-{2,999}/gm, '-');
    // lowercase
    str = str.toLowerCase();
    return str;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRDb21wbGlhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpZENvbXBsaWFudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNCQUFzQixNQUFNLHdCQUF3QixDQUFDO0FBOEI1RCxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FBQyxHQUFXLEVBQUUsUUFBK0I7SUFDNUUsUUFBUSxtQkFDSixPQUFPLEVBQUUsRUFBRSxJQUNSLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixTQUFTO0lBQ1QsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLHFCQUFxQjtJQUNyQixHQUFHLEdBQUcsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsb0NBQW9DO0lBQ3BDLE1BQU0sSUFBSSxHQUFHO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixJQUFJLEVBQUUsR0FBRztRQUNULEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztLQUNYLENBQUM7SUFFRixRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMvQixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDSCwyQ0FBMkM7SUFDM0MsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckMsWUFBWTtJQUNaLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFFeEIsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDIn0=