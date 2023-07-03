"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
function __toBase(num, base, settings) {
    settings = Object.assign({ chars: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }, (settings !== null && settings !== void 0 ? settings : {}));
    const symbols = settings.chars.split('');
    let conversion = '';
    if (num <= 0) {
        return symbols[0];
    }
    if (base > symbols.length || base <= 1) {
        base = symbols.length;
    }
    while (num >= 1) {
        conversion = symbols[num - base * Math.floor(num / base)] + conversion;
        num = Math.floor(num / base);
    }
    return `${base < 11 ? parseInt(conversion) : conversion}`;
}
exports.default = __toBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQW9DZCxTQUF3QixRQUFRLENBQzVCLEdBQVcsRUFDWCxJQUFZLEVBQ1osUUFBMEI7SUFFMUIsUUFBUSxtQkFDSixLQUFLLEVBQUUsZ0VBQWdFLElBQ3BFLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6QyxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFFcEIsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFO1FBQ1YsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDckI7SUFFRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7UUFDcEMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7S0FDekI7SUFFRCxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUU7UUFDYixVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7UUFDdkUsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQ2hDO0lBRUQsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDOUQsQ0FBQztBQTNCRCwyQkEyQkMifQ==