import __STemplate from '../STemplate';

/**
 * @name           404
 * @namespace       sugar.node.template.pages
 * @type            Function
 * @async
 *
 * This function simply take a data object and render a clean 404 page
 *
 * @param       {data:I404Data}         data          An object of data to render the 404 page
 * @retuen      {String|undefined}                                The rendered 404 page
 *
 * @example         js
 * import page404 from '@coffeekraken/sugar/node/templates/pages/404';
 * const html = await page404({
 *      title: 'Not found',
 *      body: 'The page you want does not exists...'
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface I404Data {
  title: string;
  body: string;
}

export default async function page404(
  data: I404Data
): Promise<string | undefined> {
  const template = new __STemplate('pages.404', {
    template: {
      engine: 'blade'
    }
  });
  const result = await template.render(data);
  if (result.content) return result.content;
  return undefined;
}
