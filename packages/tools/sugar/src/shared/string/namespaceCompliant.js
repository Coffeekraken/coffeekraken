import __simplifySpecialChars from './simplifySpecialChars';
export default function namespaceCompliant(str, settings) {
    settings = Object.assign({ exclude: [] }, (settings !== null && settings !== void 0 ? settings : {}));
    // spaces
    str = str.replace(' ', '-');
    // special characters
    str = __simplifySpecialChars(str);
    // replace characters like /, etc...
    const dict = {
        '\\': '-',
        '(': '-',
        ')': '-',
        '{': '-',
        '}': '-',
        '=': '-',
        '?': '-',
        '!': '-',
        '&': '-',
        '%': '-',
        '*': '-',
        '"': '-',
        "'": '-',
        '`': '-',
        '+': '-',
        '/': '.',
        '°': '-',
        $: '-',
        '<': '-',
        '>': '-',
        ',': '-',
        ':': '-',
        '#': '-',
    };
    settings.exclude.forEach((char) => {
        delete dict[char];
    });
    Object.keys(dict).forEach((char) => {
        str = str.split(char).join(dict[char]);
    });
    // first and last characters + multiple ---
    str = str.replace(/\.{2,999}/gm, '.');
    str = str.replace(/^-{1,999}/gm, '');
    str = str.replace(/-{1,999}$/gm, '');
    str = str.replace(/-{2,999}/gm, '-');
    str = str.replace(/[^a-zA-Z0-9@]{1,999}$/, '');
    str = str.replace(/^[^a-zA-Z0-9@]{1,999}/, '');
    return str;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZXNwYWNlQ29tcGxpYW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmFtZXNwYWNlQ29tcGxpYW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sc0JBQXNCLE1BQU0sd0JBQXdCLENBQUM7QUE2QjVELE1BQU0sQ0FBQyxPQUFPLFVBQVUsa0JBQWtCLENBQ3RDLEdBQVcsRUFDWCxRQUFzQztJQUV0QyxRQUFRLG1CQUNKLE9BQU8sRUFBRSxFQUFFLElBQ1IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLFNBQVM7SUFDVCxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDNUIscUJBQXFCO0lBQ3JCLEdBQUcsR0FBRyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxvQ0FBb0M7SUFDcEMsTUFBTSxJQUFJLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO0tBQ1gsQ0FBQztJQUVGLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQy9CLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNILDJDQUEyQztJQUMzQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0MsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFL0MsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDIn0=