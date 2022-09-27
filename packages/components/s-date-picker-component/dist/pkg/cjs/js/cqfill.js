"use strict";
/**
 * Copyright 2021 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
exports.transpileStyleSheet = void 0;
const engine_js_1 = require("./engine.js");
Object.defineProperty(exports, "transpileStyleSheet", { enumerable: true, get: function () { return engine_js_1.transpileStyleSheet; } });
function init() {
    const sheetObserver = new MutationObserver((entries) => {
        for (const entry of entries) {
            for (const addedNode of entry.addedNodes) {
                if (addedNode instanceof HTMLStyleElement) {
                    handleStyleTag(addedNode);
                }
                if (addedNode instanceof HTMLLinkElement) {
                    handleLinkedStylesheet(addedNode);
                }
            }
        }
    });
    sheetObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
    function handleStyleTag(el) {
        // Don’t touch empty style tags.
        if (el.innerHTML.trim().length === 0)
            return;
        const newSrc = (0, engine_js_1.transpileStyleSheet)(el.innerHTML);
        el.innerHTML = newSrc;
    }
    function handleLinkedStylesheet(el) {
        return __awaiter(this, void 0, void 0, function* () {
            if (el.rel !== 'stylesheet')
                return;
            const srcUrl = new URL(el.href, document.baseURI);
            if (srcUrl.origin !== location.origin)
                return;
            const src = yield fetch(srcUrl.toString()).then((r) => r.text());
            const newSrc = (0, engine_js_1.transpileStyleSheet)(src, srcUrl.toString());
            const blob = new Blob([newSrc], { type: 'text/css' });
            el.href = URL.createObjectURL(blob);
        });
    }
    document.querySelectorAll('style').forEach((tag) => handleStyleTag(tag));
    document
        .querySelectorAll('link')
        .forEach((tag) => handleLinkedStylesheet(tag));
}
const supportsContainerQueries = 'container' in document.documentElement.style;
if (!supportsContainerQueries) {
    init();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7R0FXRzs7Ozs7Ozs7Ozs7O0FBRUgsMkNBQWtEO0FBZ0R6QyxvR0FoREEsK0JBQW1CLE9BZ0RBO0FBOUM1QixTQUFTLElBQUk7SUFDVCxNQUFNLGFBQWEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDbkQsS0FBSyxNQUFNLEtBQUssSUFBSSxPQUFPLEVBQUU7WUFDekIsS0FBSyxNQUFNLFNBQVMsSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFO2dCQUN0QyxJQUFJLFNBQVMsWUFBWSxnQkFBZ0IsRUFBRTtvQkFDdkMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUM3QjtnQkFDRCxJQUFJLFNBQVMsWUFBWSxlQUFlLEVBQUU7b0JBQ3RDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUNyQzthQUNKO1NBQ0o7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRTtRQUM1QyxTQUFTLEVBQUUsSUFBSTtRQUNmLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUMsQ0FBQztJQUVILFNBQVMsY0FBYyxDQUFDLEVBQW9CO1FBQ3hDLGdDQUFnQztRQUNoQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPO1FBQzdDLE1BQU0sTUFBTSxHQUFHLElBQUEsK0JBQW1CLEVBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELEVBQUUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFRCxTQUFlLHNCQUFzQixDQUFDLEVBQW1COztZQUNyRCxJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssWUFBWTtnQkFBRSxPQUFPO1lBQ3BDLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xELElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsTUFBTTtnQkFBRSxPQUFPO1lBQzlDLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDakUsTUFBTSxNQUFNLEdBQUcsSUFBQSwrQkFBbUIsRUFBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDM0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELEVBQUUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQUE7SUFFRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN6RSxRQUFRO1NBQ0gsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1NBQ3hCLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRUQsTUFBTSx3QkFBd0IsR0FBRyxXQUFXLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7QUFDL0UsSUFBSSxDQUFDLHdCQUF3QixFQUFFO0lBQzNCLElBQUksRUFBRSxDQUFDO0NBQ1YifQ==