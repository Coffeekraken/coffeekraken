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
import { transpileStyleSheet } from './engine.js';
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
        const newSrc = transpileStyleSheet(el.innerHTML);
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
            const newSrc = transpileStyleSheet(src, srcUrl.toString());
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
export { transpileStyleSheet };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztHQVdHOzs7Ozs7Ozs7O0FBRUgsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRWxELFNBQVMsSUFBSTtJQUNULE1BQU0sYUFBYSxHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNuRCxLQUFLLE1BQU0sS0FBSyxJQUFJLE9BQU8sRUFBRTtZQUN6QixLQUFLLE1BQU0sU0FBUyxJQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUU7Z0JBQ3RDLElBQUksU0FBUyxZQUFZLGdCQUFnQixFQUFFO29CQUN2QyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQzdCO2dCQUNELElBQUksU0FBUyxZQUFZLGVBQWUsRUFBRTtvQkFDdEMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3JDO2FBQ0o7U0FDSjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFO1FBQzVDLFNBQVMsRUFBRSxJQUFJO1FBQ2YsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxDQUFDO0lBRUgsU0FBUyxjQUFjLENBQUMsRUFBb0I7UUFDeEMsZ0NBQWdDO1FBQ2hDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUFFLE9BQU87UUFDN0MsTUFBTSxNQUFNLEdBQUcsbUJBQW1CLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELEVBQUUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFRCxTQUFlLHNCQUFzQixDQUFDLEVBQW1COztZQUNyRCxJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssWUFBWTtnQkFBRSxPQUFPO1lBQ3BDLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xELElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsTUFBTTtnQkFBRSxPQUFPO1lBQzlDLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDakUsTUFBTSxNQUFNLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzNELE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUN0RCxFQUFFLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUFBO0lBRUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDekUsUUFBUTtTQUNILGdCQUFnQixDQUFDLE1BQU0sQ0FBQztTQUN4QixPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUVELE1BQU0sd0JBQXdCLEdBQUcsV0FBVyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO0FBQy9FLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtJQUMzQixJQUFJLEVBQUUsQ0FBQztDQUNWO0FBRUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLENBQUMifQ==