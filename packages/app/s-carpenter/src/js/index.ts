import { __reloadStylesheets } from '@coffeekraken/sugar/dom';
import __SCarpenter from './SCarpenter';

if (import.meta.hot) {
    import.meta.hot.on('sugar.update.css', (data) => {
        console.log('RELOADASSS', data);
        // perform custom update

        console.log(window.document);

        __reloadStylesheets();
        const $iframe = document.querySelector('iframe.s-carpenter_iframe');
        console.log('IFF', $iframe);
    });
}

new __SCarpenter();
