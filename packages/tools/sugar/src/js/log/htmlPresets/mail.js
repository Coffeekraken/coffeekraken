// @ts-nocheck
// @shared
import __replaceTags from '../../html/replaceTags';
/**
 * @name                              mail
 * @namespace           sugar.js.log.htmlPresets
 * @type                              Function
 * @status              wip
 *
 * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for mail formating
 *
 * @param                   {String}                      text                        The text to process
 * @return                  {String}                                                  The processed text ready for the terminal
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function mail(text) {
    return __replaceTags(text, {
        black: (tag, content) => `<span style="color: black">${content}</span>`,
        red: (tag, content) => `<span style="color: #FF0000">${content}</span>`,
        green: (tag, content) => `<span style="color: #008000">${content}</span>`,
        yellow: (tag, content) => `<span style="color: #F1C40F">${content}</span>`,
        blue: (tag, content) => `<span style="color: #0000FF">${content}</span>`,
        magenta: (tag, content) => `<span style="color: #800080">${content}</span>`,
        cyan: (tag, content) => `<span style="color: #5DADE2">${content}</span>`,
        white: (tag, content) => `<span style="color: white">${content}</span>`,
        bgBlack: (tag, content) => `<span style="background-color: black">${content}</span>`,
        bgRed: (tag, content) => `<span style="background-color: #FF0000">${content}</span>`,
        bgGreen: (tag, content) => `<span style="background-color: #008000">${content}</span>`,
        bgYellow: (tag, content) => `<span style="background-color: #F1C40F">${content}</span>`,
        bgBlue: (tag, content) => `<span style="background-color: #0000FF">${content}</span>`,
        bgMagenta: (tag, content) => `<span style="background-color: #800080">${content}</span>`,
        bgCyan: (tag, content) => `<span style="background-color: #5DADE2">${content}</span>`,
        bgWhite: (tag, content) => `<span style="background-color: white">${content}</span>`,
        bold: (tag, content) => `<span style="font-weight: bold;">${content}</span>`,
        dim: (tag, content) => `<span style="">${content}</span>`,
        italic: (tag, content) => `<span style="font-style: italic;">${content}</span>`,
        underline: (tag, content) => `<span style="font-style: underline;">${content}</span>`,
        strike: (tag, content) => `<span text-decoration="line-through;">${content}</span>`,
        br: (tag, content) => '<br />'
    });
}
export default mail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFFVixPQUFPLGFBQWEsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxTQUFTLElBQUksQ0FBQyxJQUFJO0lBQ2hCLE9BQU8sYUFBYSxDQUFDLElBQUksRUFBRTtRQUN6QixLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyw4QkFBOEIsT0FBTyxTQUFTO1FBQ3ZFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGdDQUFnQyxPQUFPLFNBQVM7UUFDdkUsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZ0NBQWdDLE9BQU8sU0FBUztRQUN6RSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxnQ0FBZ0MsT0FBTyxTQUFTO1FBQzFFLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGdDQUFnQyxPQUFPLFNBQVM7UUFDeEUsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZ0NBQWdDLE9BQU8sU0FBUztRQUMzRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxnQ0FBZ0MsT0FBTyxTQUFTO1FBQ3hFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLDhCQUE4QixPQUFPLFNBQVM7UUFFdkUsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQ3hCLHlDQUF5QyxPQUFPLFNBQVM7UUFDM0QsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQ3RCLDJDQUEyQyxPQUFPLFNBQVM7UUFDN0QsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQ3hCLDJDQUEyQyxPQUFPLFNBQVM7UUFDN0QsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQ3pCLDJDQUEyQyxPQUFPLFNBQVM7UUFDN0QsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQ3ZCLDJDQUEyQyxPQUFPLFNBQVM7UUFDN0QsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQzFCLDJDQUEyQyxPQUFPLFNBQVM7UUFDN0QsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQ3ZCLDJDQUEyQyxPQUFPLFNBQVM7UUFDN0QsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQ3hCLHlDQUF5QyxPQUFPLFNBQVM7UUFFM0QsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQ3JCLG9DQUFvQyxPQUFPLFNBQVM7UUFDdEQsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsa0JBQWtCLE9BQU8sU0FBUztRQUN6RCxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FDdkIscUNBQXFDLE9BQU8sU0FBUztRQUN2RCxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FDMUIsd0NBQXdDLE9BQU8sU0FBUztRQUMxRCxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FDdkIseUNBQXlDLE9BQU8sU0FBUztRQUUzRCxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxRQUFRO0tBQy9CLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRCxlQUFlLElBQUksQ0FBQyJ9