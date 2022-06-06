import type { ISViewRendererRenderResult } from '../SViewRenderer';

/**
 * @name           404
 * @namespace       s-view.pages
 * @type            Function
 * @async
 *
 * This function simply take a data object and render a clean 404 page
 *
 * @param       {data:I404Data}         data          An object of data to render the 404 page
 * @retuen      {ISViewResult}                                The rendered 404 page
 *
 * @example         js
 * import page404 from '@coffeekraken/sugar/node/engines/pages/404';
 * const html = await page404(renderer, {
 *      title: 'Not found',
 *      body: 'The page you want does not exists...'
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface I404Data {
    title: string;
    body: string;
}

export default function page404(
    renderer: any,
    data: I404Data,
): Promise<ISViewRendererRenderResult> {
    const result = renderer.render('pages.error.404', data);
    return result;
}
