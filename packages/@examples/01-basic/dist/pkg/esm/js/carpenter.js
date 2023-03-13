import { __reloadStylesheets } from '@coffeekraken/sugar/dom';
import __SCarpenter from './SCarpenter';
if (import.meta.hot) {
    import.meta.hot.on('sugar.update.css', (data) => {
        // perform custom update
        __reloadStylesheets();
        // const $iframe = document.querySelector('iframe.s-carpenter_iframe');
        // console.log('IFF', $iframe);
    });
}
new __SCarpenter();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sWUFBWSxNQUFNLGNBQWMsQ0FBQztBQUV4QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO0lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzVDLHdCQUF3QjtRQUN4QixtQkFBbUIsRUFBRSxDQUFDO1FBQ3RCLHVFQUF1RTtRQUN2RSwrQkFBK0I7SUFDbkMsQ0FBQyxDQUFDLENBQUM7Q0FDTjtBQUVELElBQUksWUFBWSxFQUFFLENBQUMifQ==