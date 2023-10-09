import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default async function getDocmap() {
    // await __SSugarConfig.load();

    await __SSugarConfig.ready();

    // const docmap = new __SDocmap();
    // const docmapJson = await docmap.read();

    // console.log('ITEM', docmapJson);

    // return {
    //     docmapJson,
    // };

    return [__SSugarConfig.get('sugarJson')];
}
