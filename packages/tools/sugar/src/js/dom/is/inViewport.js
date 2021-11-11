// @ts-nocheck
function inViewport(elm, settings = {}) {
    return new Promise((resolve) => {
        settings = Object.assign({ offset: 10 }, settings);
        // // handle offset
        // let offsetTop = settings.offset;
        // let offsetRight = settings.offset;
        // let offsetBottom = settings.offset;
        // let offsetLeft = settings.offset;
        // if (typeof settings.offset === 'object') {
        //   offsetTop = settings.offset.top || 0;
        //   offsetRight = settings.offset.right || 0;
        //   offsetBottom = settings.offset.bottom || 0;
        //   offsetLeft = settings.offset.left || 0;
        // }
        // const containerHeight =
        //   window.innerHeight || document.documentElement.clientHeight;
        // const containerWidth =
        //   window.innerWidth || document.documentElement.clientWidth;
        // const rect = elm.getBoundingClientRect();
        // const isTopIn = rect.top - containerHeight - offsetBottom <= 0;
        // const isBottomIn = rect.bottom - offsetTop >= 0;
        // const isLeftIn = rect.left - containerWidth - offsetRight <= 0;
        // const isRightIn = rect.right - offsetLeft >= 0;
        // return isTopIn && isBottomIn && isLeftIn && isRightIn;
        const observer = new IntersectionObserver((entries, observer) => {
            if (!entries.length)
                return;
            const entry = entries[0];
            if (elm.tagName.toLowerCase() === 'ck-search') {
                console.log(entry.intersectionRatio);
            }
            if (entry.intersectionRatio > 0) {
                resolve(true);
            }
            else {
                resolve(false);
            }
            observer.disconnect();
        }, {
            root: null,
            rootMargin: `${settings.offset}px`,
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        });
        observer.observe(elm);
    });
}
export default inViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5WaWV3cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluVmlld3BvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQW1DZCxTQUFTLFVBQVUsQ0FDZixHQUFnQixFQUNoQixXQUFpQyxFQUFFO0lBRW5DLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUMzQixRQUFRLG1CQUNKLE1BQU0sRUFBRSxFQUFFLElBQ1AsUUFBUSxDQUNkLENBQUM7UUFFRixtQkFBbUI7UUFDbkIsbUNBQW1DO1FBQ25DLHFDQUFxQztRQUNyQyxzQ0FBc0M7UUFDdEMsb0NBQW9DO1FBQ3BDLDZDQUE2QztRQUM3QywwQ0FBMEM7UUFDMUMsOENBQThDO1FBQzlDLGdEQUFnRDtRQUNoRCw0Q0FBNEM7UUFDNUMsSUFBSTtRQUNKLDBCQUEwQjtRQUMxQixpRUFBaUU7UUFDakUseUJBQXlCO1FBQ3pCLCtEQUErRDtRQUMvRCw0Q0FBNEM7UUFDNUMsa0VBQWtFO1FBQ2xFLG1EQUFtRDtRQUNuRCxrRUFBa0U7UUFDbEUsa0RBQWtEO1FBQ2xELHlEQUF5RDtRQUV6RCxNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUNyQyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07Z0JBQUUsT0FBTztZQUM1QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLFdBQVcsRUFBRTtnQkFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUN4QztZQUNELElBQUksS0FBSyxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRTtnQkFDN0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pCO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQjtZQUNELFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMxQixDQUFDLEVBQ0Q7WUFDSSxJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUk7WUFDbEMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNqRSxDQUNKLENBQUM7UUFFRixRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGVBQWUsVUFBVSxDQUFDIn0=