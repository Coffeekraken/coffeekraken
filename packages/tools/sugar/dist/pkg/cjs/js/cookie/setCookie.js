"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function __setCookie(name, value, options = {}) {
    options = Object.assign({ path: '/' }, options);
    try {
        value = JSON.stringify(value);
    }
    catch (e) { }
    // @ts-ignore
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += '; ' + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    }
    document.cookie = updatedCookie;
}
exports.default = __setCookie;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBNkJBLFNBQXdCLFdBQVcsQ0FDL0IsSUFBWSxFQUNaLEtBQVUsRUFDVixVQUFzQyxFQUFFO0lBRXhDLE9BQU8sbUJBQ0gsSUFBSSxFQUFFLEdBQUcsSUFFTixPQUFPLENBQ2IsQ0FBQztJQUVGLElBQUk7UUFDQSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNqQztJQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7SUFFZCxhQUFhO0lBQ2IsSUFBSSxPQUFPLENBQUMsT0FBTyxZQUFZLElBQUksRUFBRTtRQUNqQyxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDbkQ7SUFFRCxJQUFJLGFBQWEsR0FDYixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFL0QsS0FBSyxJQUFJLFNBQVMsSUFBSSxPQUFPLEVBQUU7UUFDM0IsYUFBYSxJQUFJLElBQUksR0FBRyxTQUFTLENBQUM7UUFDbEMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksV0FBVyxLQUFLLElBQUksRUFBRTtZQUN0QixhQUFhLElBQUksR0FBRyxHQUFHLFdBQVcsQ0FBQztTQUN0QztLQUNKO0lBRUQsUUFBUSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7QUFDcEMsQ0FBQztBQWhDRCw4QkFnQ0MifQ==