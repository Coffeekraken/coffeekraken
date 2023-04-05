"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
function __onDragEnter(callback, settings) {
    var _a;
    const from = (_a = settings === null || settings === void 0 ? void 0 : settings.$elm) !== null && _a !== void 0 ? _a : document.body;
    from.addEventListener('dragenter', (e) => {
        callback(e);
    });
}
exports.default = __onDragEnter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQXNDZCxTQUF3QixhQUFhLENBQ2pDLFFBQWtCLEVBQ2xCLFFBQXdDOztJQUV4QyxNQUFNLElBQUksR0FBRyxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxJQUFJLG1DQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFDN0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3JDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFSRCxnQ0FRQyJ9