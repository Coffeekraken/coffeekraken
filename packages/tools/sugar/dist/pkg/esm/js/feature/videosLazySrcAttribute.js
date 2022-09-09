// @ts-nocheck
import { __querySelectorLive, __whenInViewport } from '@coffeekraken/sugar/dom';
export default function __videoLazySrcAttribute(settings = {}) {
    settings = Object.assign({ offset: 50 }, settings);
    __querySelectorLive('video[lazy-src]:not([is])', ($videoElm) => {
        __whenInViewport($videoElm, settings.offset).then(() => {
            $videoElm.setAttribute('src', $videoElm.getAttribute('lazy-src'));
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQWtDaEYsTUFBTSxDQUFDLE9BQU8sVUFBVSx1QkFBdUIsQ0FDM0MsV0FBb0QsRUFBRTtJQUV0RCxRQUFRLG1CQUNKLE1BQU0sRUFBRSxFQUFFLElBQ1AsUUFBUSxDQUNkLENBQUM7SUFDRixtQkFBbUIsQ0FBQywyQkFBMkIsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzNELGdCQUFnQixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNuRCxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==