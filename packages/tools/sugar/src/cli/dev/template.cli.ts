import page404 from '../../node/template/pages/404';

export default async function () {
  const html = await page404({
    title: 'YOP',
    body: 'coco'
  });
}
