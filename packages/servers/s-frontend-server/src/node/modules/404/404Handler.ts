import __SPromise from '@coffeekraken/s-promise';
import __SViewRenderer from '@coffeekraken/s-view-renderer';

export default function _404Handler({ req, res, pageConfig }) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        // rendering view using data
        const _404Instance = new __SViewRenderer('pages.error.404');

        const _404Res = await pipe(
            _404Instance.render({
                ...(res.templateData ?? {}),
            }),
        );

        res.status(200);
        res.type('text/html');
        res.send(_404Res.value);
        resolve(_404Res.value);
    });
}
