"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function __setCookie(name, value, settings = {}) {
    settings = Object.assign({ path: '/' }, settings);
    try {
        value = JSON.stringify(value);
    }
    catch (e) { }
    // @ts-ignore
    if (settings.expires instanceof Date) {
        settings.expires = settings.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    for (let optionKey in settings) {
        updatedCookie += '; ' + optionKey;
        let optionValue = settings[optionKey];
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    }
    document.cookie = updatedCookie;
}
exports.default = __setCookie;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBc0NBLFNBQXdCLFdBQVcsQ0FDL0IsSUFBWSxFQUNaLEtBQVUsRUFDVixXQUF3QyxFQUFFO0lBRTFDLFFBQVEsbUJBQ0osSUFBSSxFQUFFLEdBQUcsSUFFTixRQUFRLENBQ2QsQ0FBQztJQUVGLElBQUk7UUFDQSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNqQztJQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7SUFFZCxhQUFhO0lBQ2IsSUFBSSxRQUFRLENBQUMsT0FBTyxZQUFZLElBQUksRUFBRTtRQUNsQyxRQUFRLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDckQ7SUFFRCxJQUFJLGFBQWEsR0FDYixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFL0QsS0FBSyxJQUFJLFNBQVMsSUFBSSxRQUFRLEVBQUU7UUFDNUIsYUFBYSxJQUFJLElBQUksR0FBRyxTQUFTLENBQUM7UUFDbEMsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksV0FBVyxLQUFLLElBQUksRUFBRTtZQUN0QixhQUFhLElBQUksR0FBRyxHQUFHLFdBQVcsQ0FBQztTQUN0QztLQUNKO0lBRUQsUUFBUSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7QUFDcEMsQ0FBQztBQWhDRCw4QkFnQ0MifQ==