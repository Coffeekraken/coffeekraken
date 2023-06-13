import type { ISViewRendererRenderResult } from '../SViewRenderer';

/**
 * @___name           404
 * @___namespace       s-view.pages
 * @___type            Function
 * @___platform        node
 * @___status              beta
 * @___async
 * @___private
 *
 * This function simply take a data object and render a clean 404 page
 *
 * @param       {data:I404Data}         data          An object of data to render the 404 page
 * @return      {ISViewResult}                                The rendered 404 page
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
    const result = renderer.render('pages.error.404', data, {
        dataFile: true,
    });
    return result;
}
