"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function default_1({ root, sharedData, settings, cacheDir }) {
    return __awaiter(this, void 0, void 0, function* () {
        // const duration = new __SDuration();
        // // partials only for production target
        // // if (!settings.partials) {
        // //     // console.log(`<yellow>[partial]</yellow> Exports <red>disabled</red>`);
        // //     return;
        // // }
        // const css = root.toString();
        // const partialMatches = [
        //     ...css.matchAll(
        //         /\/\*\!\sSPARTIAL:([a-zA-Z0-9_\/\.-]+)\s\*\/(((?!\/\*\!\sSENDPARTIAL:)[\s\S])*)/g,
        //     ),
        // ];
        // partialMatches.forEach((match) => {
        //     let partialId = match[1],
        //         partialContent = match[2];
        //     // generate the output path
        //     // if a / or a . is found in the partialId, use as a path and will be stored in the "partials" folder,
        //     // otherwise if it's just an "id" like "welcome", save it into the "partials" folder
        //     let finalPartialPath = partialId;
        //     if (!finalPartialPath.match(/\//)) {
        //         finalPartialPath = `partials/${finalPartialPath}`;
        //     }
        //     if (!finalPartialPath.match(/\.css$/)) {
        //         finalPartialPath += '.css';
        //     }
        //     console.log(
        //         `<yellow>[partial]</yellow> Saving "<cyan>${finalPartialPath}</cyan>" partial`,
        //     );
        //     if (settings.target === 'production') {
        //         partialContent = __minify(partialContent).css;
        //     }
        //     __writeFileSync(
        //         `${settings.outDir}/${finalPartialPath}`,
        //         partialContent,
        //     );
        // });
        // if (partialMatches.length) {
        //     console.log(
        //         `<yellow>[partial]</yellow> Purging partialed css from main one...`,
        //     );
        //     // removing all partialed css
        //     let inPartial = false;
        //     root.nodes = root.nodes.filter((node) => {
        //         if (
        //             node.type === 'comment' &&
        //             node.text.trim().match(/SPARTIAL:/)
        //         ) {
        //             inPartial = true;
        //             // node.remove();
        //             return false;
        //         } else if (
        //             node.type === 'comment' &&
        //             node.text.trim().match(/SENDPARTIAL:/)
        //         ) {
        //             inPartial = false;
        //             // node.remove();
        //             return false;
        //         } else if (inPartial) {
        //             // node.remove();
        //             return false;
        //         }
        //         return true;
        //     });
        // }
        // if (partialMatches.length) {
        //     console.log(
        //         `<green>[partial]</green> Partials saved <green>successfully</green> in <cyan>${
        //             duration.end().formatedDuration
        //         }</cyan>`,
        //     );
        // }
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbUJBQStCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFOztRQUNuRSxzQ0FBc0M7UUFDdEMseUNBQXlDO1FBQ3pDLCtCQUErQjtRQUMvQixtRkFBbUY7UUFDbkYsaUJBQWlCO1FBQ2pCLE9BQU87UUFDUCwrQkFBK0I7UUFDL0IsMkJBQTJCO1FBQzNCLHVCQUF1QjtRQUN2Qiw2RkFBNkY7UUFDN0YsU0FBUztRQUNULEtBQUs7UUFDTCxzQ0FBc0M7UUFDdEMsZ0NBQWdDO1FBQ2hDLHFDQUFxQztRQUNyQyxrQ0FBa0M7UUFDbEMsNkdBQTZHO1FBQzdHLDJGQUEyRjtRQUMzRix3Q0FBd0M7UUFDeEMsMkNBQTJDO1FBQzNDLDZEQUE2RDtRQUM3RCxRQUFRO1FBQ1IsK0NBQStDO1FBQy9DLHNDQUFzQztRQUN0QyxRQUFRO1FBQ1IsbUJBQW1CO1FBQ25CLDBGQUEwRjtRQUMxRixTQUFTO1FBQ1QsOENBQThDO1FBQzlDLHlEQUF5RDtRQUN6RCxRQUFRO1FBQ1IsdUJBQXVCO1FBQ3ZCLG9EQUFvRDtRQUNwRCwwQkFBMEI7UUFDMUIsU0FBUztRQUNULE1BQU07UUFDTiwrQkFBK0I7UUFDL0IsbUJBQW1CO1FBQ25CLCtFQUErRTtRQUMvRSxTQUFTO1FBQ1Qsb0NBQW9DO1FBQ3BDLDZCQUE2QjtRQUM3QixpREFBaUQ7UUFDakQsZUFBZTtRQUNmLHlDQUF5QztRQUN6QyxrREFBa0Q7UUFDbEQsY0FBYztRQUNkLGdDQUFnQztRQUNoQyxnQ0FBZ0M7UUFDaEMsNEJBQTRCO1FBQzVCLHNCQUFzQjtRQUN0Qix5Q0FBeUM7UUFDekMscURBQXFEO1FBQ3JELGNBQWM7UUFDZCxpQ0FBaUM7UUFDakMsZ0NBQWdDO1FBQ2hDLDRCQUE0QjtRQUM1QixrQ0FBa0M7UUFDbEMsZ0NBQWdDO1FBQ2hDLDRCQUE0QjtRQUM1QixZQUFZO1FBQ1osdUJBQXVCO1FBQ3ZCLFVBQVU7UUFDVixJQUFJO1FBQ0osK0JBQStCO1FBQy9CLG1CQUFtQjtRQUNuQiwyRkFBMkY7UUFDM0YsOENBQThDO1FBQzlDLHFCQUFxQjtRQUNyQixTQUFTO1FBQ1QsSUFBSTtJQUNSLENBQUM7Q0FBQTtBQXhFRCw0QkF3RUMifQ==