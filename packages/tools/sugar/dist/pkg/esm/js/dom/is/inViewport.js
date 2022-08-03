// @ts-nocheck
function inViewport(elm, settings = {}) {
    return new Promise((resolve) => {
        settings = Object.assign({ offset: '10px' }, settings);
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
            if (entry.intersectionRatio > 0) {
                resolve(true);
            }
            else {
                resolve(false);
            }
            observer.disconnect();
        }, {
            root: null,
            rootMargin: settings.offset,
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        });
        observer.observe(elm);
    });
}
export default inViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFrQ2QsU0FBUyxVQUFVLENBQ2YsR0FBZ0IsRUFDaEIsV0FBaUMsRUFBRTtJQUVuQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDM0IsUUFBUSxtQkFDSixNQUFNLEVBQUUsTUFBTSxJQUNYLFFBQVEsQ0FDZCxDQUFDO1FBRUYsbUJBQW1CO1FBQ25CLG1DQUFtQztRQUNuQyxxQ0FBcUM7UUFDckMsc0NBQXNDO1FBQ3RDLG9DQUFvQztRQUNwQyw2Q0FBNkM7UUFDN0MsMENBQTBDO1FBQzFDLDhDQUE4QztRQUM5QyxnREFBZ0Q7UUFDaEQsNENBQTRDO1FBQzVDLElBQUk7UUFDSiwwQkFBMEI7UUFDMUIsaUVBQWlFO1FBQ2pFLHlCQUF5QjtRQUN6QiwrREFBK0Q7UUFDL0QsNENBQTRDO1FBQzVDLGtFQUFrRTtRQUNsRSxtREFBbUQ7UUFDbkQsa0VBQWtFO1FBQ2xFLGtEQUFrRDtRQUNsRCx5REFBeUQ7UUFFekQsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FDckMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO2dCQUFFLE9BQU87WUFDNUIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksS0FBSyxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRTtnQkFDN0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pCO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQjtZQUNELFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMxQixDQUFDLEVBQ0Q7WUFDSSxJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxRQUFRLENBQUMsTUFBTTtZQUMzQixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ2pFLENBQ0osQ0FBQztRQUVGLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsZUFBZSxVQUFVLENBQUMifQ==