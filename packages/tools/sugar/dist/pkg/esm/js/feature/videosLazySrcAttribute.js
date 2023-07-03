// @ts-nocheck
import __fastdom from 'fastdom';
import __whenInViewport from '../dom/detect/whenInViewport';
import __querySelectorLive from '../dom/query/querySelectorLive';
export default function __videoLazySrcAttribute(settings = {}) {
    settings = Object.assign({ offset: 50 }, settings);
    __querySelectorLive('video[lazy-src]:not([is])', ($videoElm) => {
        __whenInViewport($videoElm, settings.offset).then(() => {
            __fastdom.mutate(() => {
                $videoElm.setAttribute('src', $videoElm.getAttribute('lazy-src'));
            });
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxnQkFBZ0IsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RCxPQUFPLG1CQUFtQixNQUFNLGdDQUFnQyxDQUFDO0FBb0NqRSxNQUFNLENBQUMsT0FBTyxVQUFVLHVCQUF1QixDQUMzQyxXQUFvRCxFQUFFO0lBRXRELFFBQVEsbUJBQ0osTUFBTSxFQUFFLEVBQUUsSUFDUCxRQUFRLENBQ2QsQ0FBQztJQUNGLG1CQUFtQixDQUFDLDJCQUEyQixFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDM0QsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ25ELFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO2dCQUNsQixTQUFTLENBQUMsWUFBWSxDQUNsQixLQUFLLEVBQ0wsU0FBUyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FDckMsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==