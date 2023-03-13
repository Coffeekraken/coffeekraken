"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const SCarpenter_1 = __importDefault(require("./SCarpenter"));
if (import.meta.hot) {
    import.meta.hot.on('sugar.update.css', (data) => {
        // perform custom update
        (0, dom_1.__reloadStylesheets)();
        // const $iframe = document.querySelector('iframe.s-carpenter_iframe');
        // console.log('IFF', $iframe);
    });
}
new SCarpenter_1.default();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBQThEO0FBQzlELDhEQUF3QztBQUV4QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO0lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzVDLHdCQUF3QjtRQUN4QixJQUFBLHlCQUFtQixHQUFFLENBQUM7UUFDdEIsdUVBQXVFO1FBQ3ZFLCtCQUErQjtJQUNuQyxDQUFDLENBQUMsQ0FBQztDQUNOO0FBRUQsSUFBSSxvQkFBWSxFQUFFLENBQUMifQ==