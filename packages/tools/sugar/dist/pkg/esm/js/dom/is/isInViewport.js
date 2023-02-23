// @ts-nocheck
export default function __isInViewport(elm, settings = {}) {
    settings = Object.assign({}, settings);
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop, scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    const containerHeight = window.innerHeight || document.documentElement.clientHeight, containerWidth = window.innerWidth || document.documentElement.clientWidth, rect = elm.getBoundingClientRect();
    const top = rect.top - scrollTop, left = rect.left - scrollLeft, right = rect.right - scrollLeft, bottom = rect.bottom - scrollTop;
    const isTopIn = top - containerHeight <= 0, isBottomIn = bottom <= containerHeight, isLeftIn = left >= 0 && left <= containerWidth, isRightIn = right >= 0 && right <= containerWidth;
    // if at least top|bottom AND left|right
    if ((isTopIn || isBottomIn) && (isLeftIn || isRightIn)) {
        // if (elm.id === 'coco') {
        //     console.log('IN 1', rect, isTopIn, isRightIn, isBottomIn, isLeftIn);
        // }
        return true;
    }
    // is rect is bigger than viewport in all directions
    if (top <= 0 &&
        bottom >= containerHeight &&
        left <= 0 &&
        right >= containerWidth) {
        // if (elm.id === 'coco') {
        //     console.log('IN 2');
        // }
        return true;
    }
    if (top <= 0 && bottom >= containerHeight && left <= 0 && isRightIn) {
        // if (elm.id === 'coco') {
        //     console.log('IN 3');
        // }
        return true;
    }
    if (top <= 0 &&
        bottom >= containerHeight &&
        right >= containerWidth &&
        isLeftIn) {
        // if (elm.id === 'coco') {
        //     console.log('IN 4');
        // }
        return true;
    }
    if (left <= 0 && right >= containerWidth && top <= 0 && isBottomIn) {
        // if (elm.id === 'coco') {
        //     console.log('IN 5');
        // }
        return true;
    }
    if (left <= 0 &&
        right >= containerWidth &&
        bottom >= containerHeight &&
        isTopIn) {
        // if (elm.id === 'coco') {
        //     console.log('IN 6');
        // }
        return true;
    }
    return false;
    // const observer = new IntersectionObserver(
    //     (entries, observer) => {
    //         if (!entries.length) return;
    //         const entry = entries[0];
    // const isTopIn = entry.boundingClientRect.top - entry.rootBounds.height <= 0;
    // const isBottomIn = entry.boundingClientRect.bottom >= 0;
    // const isLeftIn = rect.left - containerWidth - offsetRight <= 0;
    // const isRightIn = rect.right - offsetLeft >= 0;
    //         if (entry.boundingClientRect.left >= entry.rootBounds.top && entry.boundingClientRect.left <= entry.rootBounds.right)
    //         if (
    //             entry.intersectionRatio > 0 &&
    //             (entry.intersectionRect.width ||
    //                 entry.intersectionRect.height)
    //         ) {
    //             resolve(true);
    //         } else {
    //             resolve(false);
    //         }
    //         observer.disconnect();
    //     },
    //     {
    //         root: null, // viewport
    //         rootMargin: settings.offset,
    //         threshold: 0,
    //     },
    // );
    // observer.observe(elm);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFpQ2QsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQ2xDLEdBQWdCLEVBQ2hCLFdBQWlDLEVBQUU7SUFFbkMsUUFBUSxxQkFDRCxRQUFRLENBQ2QsQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUNQLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUNqRSxVQUFVLEdBQ04sUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFFeEUsTUFBTSxlQUFlLEdBQ2IsTUFBTSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksRUFDL0QsY0FBYyxHQUNWLE1BQU0sQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQzdELElBQUksR0FBRyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUV2QyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsRUFDNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxFQUM3QixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLEVBQy9CLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztJQUVyQyxNQUFNLE9BQU8sR0FBRyxHQUFHLEdBQUcsZUFBZSxJQUFJLENBQUMsRUFDdEMsVUFBVSxHQUFHLE1BQU0sSUFBSSxlQUFlLEVBQ3RDLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxjQUFjLEVBQzlDLFNBQVMsR0FBRyxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxjQUFjLENBQUM7SUFFdEQsd0NBQXdDO0lBQ3hDLElBQUksQ0FBQyxPQUFPLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLEVBQUU7UUFDcEQsMkJBQTJCO1FBQzNCLDJFQUEyRTtRQUMzRSxJQUFJO1FBQ0osT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVELG9EQUFvRDtJQUNwRCxJQUNJLEdBQUcsSUFBSSxDQUFDO1FBQ1IsTUFBTSxJQUFJLGVBQWU7UUFDekIsSUFBSSxJQUFJLENBQUM7UUFDVCxLQUFLLElBQUksY0FBYyxFQUN6QjtRQUNFLDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IsSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksTUFBTSxJQUFJLGVBQWUsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLFNBQVMsRUFBRTtRQUNqRSwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsSUFDSSxHQUFHLElBQUksQ0FBQztRQUNSLE1BQU0sSUFBSSxlQUFlO1FBQ3pCLEtBQUssSUFBSSxjQUFjO1FBQ3ZCLFFBQVEsRUFDVjtRQUNFLDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IsSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLGNBQWMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLFVBQVUsRUFBRTtRQUNoRSwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsSUFDSSxJQUFJLElBQUksQ0FBQztRQUNULEtBQUssSUFBSSxjQUFjO1FBQ3ZCLE1BQU0sSUFBSSxlQUFlO1FBQ3pCLE9BQU8sRUFDVDtRQUNFLDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IsSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxPQUFPLEtBQUssQ0FBQztJQUViLDZDQUE2QztJQUM3QywrQkFBK0I7SUFDL0IsdUNBQXVDO0lBRXZDLG9DQUFvQztJQUVwQywrRUFBK0U7SUFDL0UsMkRBQTJEO0lBQzNELGtFQUFrRTtJQUNsRSxrREFBa0Q7SUFFbEQsZ0lBQWdJO0lBRWhJLGVBQWU7SUFDZiw2Q0FBNkM7SUFDN0MsK0NBQStDO0lBQy9DLGlEQUFpRDtJQUNqRCxjQUFjO0lBQ2QsNkJBQTZCO0lBQzdCLG1CQUFtQjtJQUNuQiw4QkFBOEI7SUFDOUIsWUFBWTtJQUNaLGlDQUFpQztJQUNqQyxTQUFTO0lBQ1QsUUFBUTtJQUNSLGtDQUFrQztJQUNsQyx1Q0FBdUM7SUFDdkMsd0JBQXdCO0lBQ3hCLFNBQVM7SUFDVCxLQUFLO0lBRUwseUJBQXlCO0FBQzdCLENBQUMifQ==