// @ts-nocheck
import { __querySelectorLive, __whenInViewport } from '@coffeekraken/sugar/dom';
import __fastdom from 'fastdom';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRixPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFrQ2hDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsdUJBQXVCLENBQzNDLFdBQW9ELEVBQUU7SUFFdEQsUUFBUSxtQkFDSixNQUFNLEVBQUUsRUFBRSxJQUNQLFFBQVEsQ0FDZCxDQUFDO0lBQ0YsbUJBQW1CLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzRCxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDbkQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLFNBQVMsQ0FBQyxZQUFZLENBQ2xCLEtBQUssRUFDTCxTQUFTLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUNyQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9